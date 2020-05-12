from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from zipfile import ZipFile
import time
import os
import pandas as pd
import numpy
from datetime import datetime
from datetime import timedelta
from pymongo import MongoClient


class city:
    def __init__(self, latitude, longitude, name, county, state):
        self.name = name
        self.latitude = latitude
        self.longitude = longitude
        self.county = county
        self.state = state
        self.pH = None
        self.specificConductance = None
        self.totalDissolvedSolids = None


def download_wait(directory, timeout, nfiles=None):
    """
    Wait for downloads to finish with a specified timeout.

    Args
    ----
    directory : str
        The path to the folder where the files will be downloaded.
    timeout : int
        How many seconds to wait until timing out.
    nfiles : int, defaults to None
        If provided, also wait for the expected number of files.

    """
    seconds = 0
    dl_wait = True
    while dl_wait and seconds < timeout:
        time.sleep(1)
        dl_wait = False
        files = os.listdir(directory)
        if nfiles and len(files) < nfiles:
            dl_wait = True

        for fname in files:
            if fname.endswith('.crdownload'):
                dl_wait = True

        seconds += 1


def openBrowser():
  # opening headless chrome
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
    options = webdriver.ChromeOptions()
    directory = os.getcwd() + "/downloads"
    preferences = {"download.default_directory": directory}
    options.add_experimental_option("prefs", preferences)
    options.binary_location = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    options.add_argument("window-size=800x841")
    #options.add_argument("headless")
    options.add_argument(f'user-agent={user_agent}')
    driver = webdriver.Chrome(
        os.getcwd() + "/chromedriver", options=options)
    return driver

# input state id for specific state or "all" for all the states
def getCities(file, state):
    df = pd.read_csv(file, usecols=[
        'city_ascii', 'state_id', 'county_name', 'lat', 'lng'])
    cities = []
    if(not state == "all"):
        df = df.loc[df['state_id'] == state]
    df = df.to_records()
    for dfCity in df:
        cityObject = city(dfCity.lat, dfCity.lng, dfCity.city_ascii,
                          dfCity.county_name, dfCity.state_id)
        cities.append(cityObject)
    return cities


def uploadToMongoDB(city):
    # if the city is already in the database, then update the info
    query = {
        "name": {
            "$regex": city.name, 
            "$options": 'i'
        },
        "county": {
            "$regex": city.county, 
            "$options": 'i'
        },
        'state': 
        {"$regex": city.state, 
        "$options": 'i'}
    }
    if(citiesCollection.count_documents(query)):
        citiesCollection.update_many(
            {"name": city.name, "county": city.county, "state": city.state},
            {
                "$set": {
                    "waterpH": city.pH,
                    "totalDissolvedSolids": city.totalDissolvedSolids,
                    "specificConductance": city.specificConductance
                }
            }
        )
    # else add the city to the database
    else:
        data = {
            "name": city.name,
            "latitude": city.latitude,
            "longitude": city.longitude,
            "county": city.county,
            "state": city.state,
            "waterpH": city.pH,
            "totalDissolvedSolids": city.totalDissolvedSolids,
            "specificConductance": city.specificConductance
        }
        citiesCollection.insert_one(data)
    print("Uploaded " + city.name)


def readFile(city, directory, within, startDate, endDate, driver):
    # unzipping files and deleting .zip files
    files = os.listdir(directory)
    extension = ".zip"
    for file in files:
        if(file.endswith(extension)):
            with ZipFile(directory + "/" + file, 'r') as zip_ref:
                zip_ref.extractall(directory)
            os.remove(directory + "/" + file)

    # reading through values of file and adding values to city class member variables
    files = os.listdir(directory)
    try:
        for file in files:
            if(not file.startswith(".")):
                df = pd.read_csv(directory + "/" + file, usecols=[
                                 'ActivityStartDate', 'CharacteristicName', 'ResultMeasureValue', 'ResultMeasure/MeasureUnitCode'])
                df.columns = ['ActivityStartDate', 'CharacteristicName',
                              'ResultMeasureValue', 'MeasureUnitCode']
                df['ActivityStartDate'] = pd.to_datetime(
                    df["ActivityStartDate"])
                df = df.sort_values(by='ActivityStartDate', ascending=False)
                city.totalDissolvedSolids = df[(df.CharacteristicName == 'Total dissolved solids') & (
                    df.MeasureUnitCode.str.contains("mg/l"))].iloc[0].ResultMeasureValue
                city.specificConductance = df[(df.CharacteristicName == 'Specific conductance') & (
                    df.MeasureUnitCode.str.contains("uS/cm"))].iloc[0].ResultMeasureValue
                city.pH = df[(df.CharacteristicName == 'pH') & (
                    df.MeasureUnitCode.str.contains("std units"))].iloc[0].ResultMeasureValue
                os.remove(directory + "/" + file)
        return True
    # if missing any or all data, expand the radius and time scale allowed for data
    except:
        if(not (within + 5 > 20)):
            for file in files:
                if(not file.startswith(".")):
                    os.remove(directory + "/" + file)
            cities = [city]
            downloadFiles(cities, within + 5, startDate -
                          timedelta(days=365), endDate, True, driver)
            return False
        else:
            return True


def downloadFiles(cities, within, startDate, endDate, replace, driver):
    # downloading file and giving commands to read and upload it
    directory = os.getcwd() + "/downloads"
    for city in cities:
        startTime = datetime.now()
        query = {
            "name": {
                "$regex": city.name, 
                "$options": 'i'
            },
            "county": {
                "$regex": city.county, 
                "$options": 'i'
            },
            'state': 
            {"$regex": city.state, 
            "$options": 'i'}
        }
        count = citiesCollection.count_documents(query)
        if(replace or (not count)):
            driver.get("https://www.waterqualitydata.us/data/Result/search?within=" + str(within) + "&lat=" + str(city.latitude) + "&long=" + str(city.longitude) +
                       "&sampleMedia=water&sampleMedia=Water&characteristicName=pH&characteristicName=Total%20dissolved%20solids&characteristicName=Specific%20conductance&startDateLo=" + startDate.strftime("%m-%d-%Y") + "&startDateHi=" + endDate.strftime("%m-%d-%Y") + "&mimeType=csv&zip=yes&sorted=yes&dataProfile=narrowResult")
            download_wait(directory, 10, 1)
            upload = readFile(city, directory, within, startDate, endDate, driver)
            if(upload):
                uploadToMongoDB(city)
        print(datetime.now() - startTime)


# get lists of cities and set parameters for running the code
startTime = datetime.now()
citiesFile = os.getcwd() + "/simplemaps_uscities_basicv1/uscities.csv"
cities = getCities(citiesFile, "CA")
#city1 = city(34.4358295, -119.82763890000001, 'Goleta', 'Santa Barbara', 'CA')
#city2 = city(33.9984235, -118.41173615, 'Los Angeles', 'Los Angeles', 'CA')
#cities = [city1, city2]
startDate = datetime.now() - timedelta(days=365)
endDate = datetime.now()
replace = True

# connect to MongoDB
client = MongoClient(
    'mongodb+srv://guestuser:RktBAzVKMFoI1N7c@cluster0-qbnoy.mongodb.net/test?retryWrites=true&w=majority')
envDataBase = client.environment
citiesCollection = envDataBase.cities

# open chrome browser
driver = openBrowser()

# run
downloadFiles(cities, 15, startDate, endDate, replace, driver)
print(datetime.now() - startTime)
client.close()
driver.quit()