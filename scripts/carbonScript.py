import pandas as pd
from pymongo import MongoClient 

df = pd.read_excel("nameOfCarbonEmissionsFile.xlsx", "Data")
print(df.iloc[0, 0]) # prints first cell in file




try: 
	conn = MongoClient('mongodb+srv://guestuser:RktBAzVKMFoI1N7c@cluster0-qbnoy.mongodb.net/test?retryWrites=true&w=majority') 
	print("Connected successfully!!!") 
except: 
	print("Could not connect to MongoDB") 

# database 
db = conn.database 

# Created or Switched to collection names: my_gfg_collection 
collection = db.my_gfg_collection 

# update all the employee data whose eid is 24 
result = collection.update_many( 
		{"eid":24}, 
		{ 
				"$set":{ 
						"name":"Mr.Geeksforgeeks"
						}, 
				"$currentDate":{"lastModified":True} 
				
				} 
		) 



print("Data updated with id",result) 

# Print the new record 
cursor = collection.find() 
for record in cursor: 
	print(record) 




# Output:
# Connected successfully!!!
# Data updated with id 
# {'_id': ObjectId('5a02227b37b8552becf5ed2a'), 
# 'name': 'Mr.Geeksforgeeks', 'eid': 24, 'location': 
# 'delhi', 'lastModified': datetime.datetime(2017, 11, 7, 21, 19, 9, 698000)}
# {'_id': ObjectId('5a02227c37b8552becf5ed2b'), 'name': 
# 'Mr.Shaurya', 'eid': 14, 'location': 'delhi'}

# https://www.joe0.com/2019/04/20/python-tutorial-reading-writing-excel-files-data-gathering-by-web-scraping-google/
# https://www.geeksforgeeks.org/mongodb-python-insert-update-data/
# https://api.mongodb.com/python/current/tutorial.html