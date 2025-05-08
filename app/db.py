import pymongo

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

mongo_key = open("keys/mongodb.txt").read().strip("\n")

uri = f"mongodb+srv://jasonc573:{mongo_key}@ynca.axg704f.mongodb.net/?retryWrites=true&w=majority&appName=ynca"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

# Create Mongo collections
