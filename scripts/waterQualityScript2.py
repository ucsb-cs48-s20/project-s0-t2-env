import time
import os
import pandas as pd
import numpy
from datetime import datetime
from datetime import timedelta
from pymongo import MongoClient
from geopy.distance import lonlat, distance


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


class station:
    def __init__(self, identifier, latitude, longitude, stateCode):
        self.identifier = identifier
        self.latitude = latitude
        self.longitude = longitude
        self.stateCode = stateCode

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


def getSiteData(file):
    df = pd.read_csv(file, usecols=[
                     'MonitoringLocationIdentifier', 'LatitudeMeasure', 'LongitudeMeasure','StateCode'])
    stations = []
    df = df.to_records()
    for dfStation in df:
        stationObject = station(dfStation.MonitoringLocationIdentifier,
                                dfStation.LatitudeMeasure, dfStation.LongitudeMeasure, dfStation.StateCode)
        stations.append(stationObject)
    return stations

def getStateCodes(file):
    df = pd.read_csv(file, usecols=['st','stusps'])
    stateCodes = {}
    df = df.to_records()
    for dfCode in df:
        stateCodes.update({dfCode.stusps: dfCode.st})
    return stateCodes

def uploadToMongoDB(city):
    # if the city is already in the database, then update the info
    query = {
        "city": {
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
            query,
            {
                "$set": {
                    "waterpH": city.pH,
                    "totalDissolvedSolids": city.totalDissolvedSolids,
                    "specificConductance": city.specificConductance
                }
            }
        )
        print("Updated " + city.name)
    # else add the city to the database
    else:
        data = {
            "city": city.name,
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


def readFile(city, stations, stateCodes, df, within):
    # finding stations within close distance to city and setting the most recent values for water data based on that proximity
    try:
        cityStations = []
        stateCode = stateCodes.get(city.state)
        for station in stations:
            if(station.stateCode < stateCode):
                continue
            elif(station.stateCode > stateCode):
                break
            distanceBtwn = distance(lonlat(station.longitude, station.latitude), lonlat(city.longitude, city.latitude)).miles
            if(distanceBtwn <= within):
                cityStations.append(station.identifier)
        pattern = '|'.join(cityStations)
        city.totalDissolvedSolids = float(df[(df.CharacteristicName == 'Total dissolved solids') & (
            df.MeasureUnitCode.str.contains("mg/l")) & (df.MonitoringLocationIdentifier.str.contains(pattern))].iloc[0].ResultMeasureValue)
        city.specificConductance = float(df[(df.CharacteristicName == 'Specific conductance') & (
            df.MeasureUnitCode.str.contains("uS/cm")) & (df.MonitoringLocationIdentifier.str.contains(pattern))].iloc[0].ResultMeasureValue)
        city.pH = float(df[(df.CharacteristicName == 'pH') & (
            df.MeasureUnitCode.str.contains("std units")) & (df.MonitoringLocationIdentifier.str.contains(pattern))].iloc[0].ResultMeasureValue)
    # if missing any or all data, accept null values for that city
    except:
       print("Missing data for " + city.name)
       return


def run(cities, stations, stateCodes, within, replace):
    # read file and give commands to upload each city 
    file = os.getcwd() + "/waterData/narrowresult.csv"
    df = pd.read_csv(file, usecols=[
        'MonitoringLocationIdentifier', 'CharacteristicName', 'ResultMeasureValue', 'ResultMeasure/MeasureUnitCode'])
    df.columns = ['MonitoringLocationIdentifier', 'CharacteristicName',
                  'ResultMeasureValue', 'MeasureUnitCode']
    for city in cities:
        query = {
            "city": {
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
        startTime = datetime.now()
        if(replace or (not count)):
            readFile(city, stations, stateCodes, df, within)
            uploadToMongoDB(city)
        print("Time for " + city.name + ": "+ str(datetime.now() - startTime))
        print("---")


# get lists of cities, stations, and state codes and set parameters for running the code
startTime = datetime.now()
citiesFile = os.getcwd() + "/simplemaps_uscities_basicv1/uscities.csv"
cities = getCities(citiesFile, "CA")
stationsFile = os.getcwd() + "/waterData/station.csv"
stations = getSiteData(stationsFile)
stateCodesFile = os.getcwd() + "/waterData/us-state-ansi-fips.csv"
stateCodes = getStateCodes(stateCodesFile)
#city1 = city(34.4358295, -119.82763890000001, 'Goleta', 'Santa Barbara', 'CA')
#city2 = city(33.9984235, -118.41173615, 'LOS ANGELES', 'LOS ANGELES', 'CA')
#cities = [city1, city2]
replace = True

# connect to MongoDB
client = MongoClient(
    'mongodb+srv://guestuser:RktBAzVKMFoI1N7c@cluster0-qbnoy.mongodb.net/test?retryWrites=true&w=majority')
envDataBase = client.environment
citiesCollection = envDataBase.citiesTest

# run
run(cities, stations, stateCodes, 15, replace)
print("Total time: "+ str(datetime.now() - startTime))
client.close()
