from pymongo import MongoClient 
from openpyxl import load_workbook
from decouple import config

try: 
	client = MongoClient(config('MONGO_CONNECTION_STRING_FOR_TESTING')) 
	envDb = client.environment
	collection = envDb.citiesCarbonData
	print("Connected successfully!") 
except: 
	print("Could not connect to MongoDB") 
	

workbook = load_workbook(filename="Jones-Kammen-2014-Zip-City-County-Results.xlsx")
print("Spreadsheet sucessfully loaded!")
workbook.active = 2
sheet = workbook.active
idNum = 1


for row in sheet.iter_rows(min_row=2, max_row=4, min_col=1, values_only=True):
	state = row[0]
	county = row[1].title()
	city = row[2].title()
	co2 = row[16]
	co2_household = row[14]
	transport = row[9]
	housing = row[10]
	food = row [11]
	goods = row[12]
	services = row[13]
	electricity = row[5]
	natGas = row[6]
	oil = row[7]
	milesTraveled = row[8]

	location = {
		"_id":idNum, 
        "state":state, 
        "county":county,
		"name":city,
		"CO2":co2,
		"CO2_Emissions_Per_Household": co2_household,
		"Transport": transport,
		"Housing": housing,
		"Food": food,
		"Goods": goods,
		"Services": services,
		"Electricity": electricity,
		"Natural_Gas": natGas,
		"Fuel_Oil": oil,
		"Vehicle_Miles_Traveled": milesTraveled
    }
	collection.insert_one(location)
	idNum+=1

print("Complete")

	









# https://www.joe0.com/2019/04/20/python-tutorial-reading-writing-excel-files-data-gathering-by-web-scraping-google/
# https://www.geeksforgeeks.org/mongodb-python-insert-update-data/
# https://api.mongodb.com/python/current/tutorial.html