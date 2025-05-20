import pymongo
import bcrypt
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

mongo_key = open("keys/key_mongo.txt").read().strip("\n")

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
db = client['database']
user_collection = db['users']

def check_user(username):
    if user_collection.find_one({"username": username}):
        return True
    else:
        return False

def add_user(username, password):
   salt = bcrypt.gensalt()
   hash = bcrypt.hashpw(password.encode('utf-8'), salt)

   user_dict = {
    'username' : username,
    'salt' : salt,
    'hash' : hash
   }
   insert = user_collection.insert_one(user_dict)

def verify_user(username, password):
    for doc in user_collection.find({'username' : username}):
        salt = doc['salt']
        hash = doc['hash']

        input_hash = bcrypt.hashpw(password.encode('utf-8'), salt)

    if hash == input_hash:
        print('Login Successful')
        return True
    else:
        print('Password incorrect')
        return False

    print('Username not found')
    return False

def clear_collection(collection_name):
    print("Deleting documents...")
    x = collection_name.delete_many({})
    print("Done!")
    print(x.deleted_count, " documents deleted.")

# clear_collection(user_collection)
