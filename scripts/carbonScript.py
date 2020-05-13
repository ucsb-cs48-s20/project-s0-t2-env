import pandas as pd
from pymongo import MongoClient 
from openpyxl import load_workbook

try: 
	client = MongoClient('mongodb+srv://guestuser:RktBAzVKMFoI1N7c@cluster0-qbnoy.mongodb.net/test?retryWrites=true&w=majority') 
	envDb = client.environment
	collection = envDb.citiesTest
	print("Connected successfully!") 
except: 
	print("Could not connect to MongoDB") 
	

workbook = load_workbook(filename="Jones-Kammen-2014-Zip-City-County-Results.xlsx")
workbook.active = 2
sheet = workbook.active
idNum = 1

for row in sheet.iter_rows(min_row=2, max_row=26785, min_col=1, values_only=True):
	# state = row[0]
	# county = row[1]
	# city = row[2]
	# co2 = row[16]
	co2_household = row[14]

	# location = {
	# 	"_id":idNum, 
    #     "state":state, 
    #     "county":county,
	# 	"city":city,
	# 	"CO2_Emissions":co2,
	#	"CO2_Emissions_Per_Household": co2_household
    # }
	# collection.insert_one(location)
	collection.find_one_and_update({"_id": idNum}, 
                                 {"$set": {"CO2_Emissions_Per_Household": co2_household}})
	
	idNum+=1

print("Complete")

	









# https://www.joe0.com/2019/04/20/python-tutorial-reading-writing-excel-files-data-gathering-by-web-scraping-google/
# https://www.geeksforgeeks.org/mongodb-python-insert-update-data/
# https://api.mongodb.com/python/current/tutorial.html