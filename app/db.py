import sqlite3
import bcrypt
from pathlib import Path

# Define base directory
BASE_DIR = Path(__file__).resolve().parent

# Path to SQLite database
DB_PATH = BASE_DIR / 'users.db'

# Initialize database connection
conn = sqlite3.connect(DB_PATH, check_same_thread=False)
cursor = conn.cursor()

# Create the users table if it doesn't exist
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    salt BLOB NOT NULL,
    hash BLOB NOT NULL
)
''')
conn.commit()

def check_user(username):
    cursor.execute("SELECT 1 FROM users WHERE username = ?", (username,))
    return cursor.fetchone() is not None

def add_user(username, password):
    if check_user(username):
        print("User already exists.")
        return

    salt = bcrypt.gensalt()
    hash_pw = bcrypt.hashpw(password.encode('utf-8'), salt)

    cursor.execute(
        "INSERT INTO users (username, salt, hash) VALUES (?, ?, ?)",
        (username, salt, hash_pw)
    )
    conn.commit()

def verify_user(username, password):
    print(username)
    print(password)
    cursor.execute("SELECT salt, hash FROM users WHERE username = ?", (username,))
    row = cursor.fetchone()
    if row is None:
        print("User not found.")
        return False

    salt, stored_hash = row
    input_hash = bcrypt.hashpw(password.encode('utf-8'), salt)

    if stored_hash == input_hash:
        print('Login Successful')
        return True
    else:
        print('Password incorrect')
        return False

def clear_users():
    print("Deleting users...")
    cursor.execute("DELETE FROM users")
    conn.commit()
    print("All users deleted.")
