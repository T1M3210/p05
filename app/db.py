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

def makedb():
# Create the users table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        salt BLOB NOT NULL,
        hash BLOB NOT NULL,
        score INTEGER
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
    score = len(password)
    salt = bcrypt.gensalt()
    hash_pw = bcrypt.hashpw(password.strip().encode('utf-8'), salt)

    cursor.execute(
        "INSERT INTO users (username, salt, hash, score) VALUES (?, ?, ?, ?)",
        (username, salt, hash_pw, score)
    )
    conn.commit()

def verify_user(username, password):
    # print(username)
    # print(password)
    cursor.execute("SELECT salt, hash FROM users WHERE username = ?", (username,))
    row = cursor.fetchone()
    if row is None:
        print("User not found.")
        return False

    salt, stored_hash = row
    input_hash = bcrypt.hashpw(password.strip().encode('utf-8'), salt)
    if stored_hash == input_hash:
        print('Login Successful')
        return True
    else:
        print('Password incorrect')
        return False

def get_scores():
    cursor.execute("SELECT username, hash, score FROM users ORDER BY score ASC")
    scores = cursor.fetchall()
    return scores

def update_pass(username, new_password):
    if not check_user(username):
        print("User does not exist.")
        return
    new_salt = bcrypt.gensalt()
    new_hash = bcrypt.hashpw(new_password.strip().encode('utf-8'), new_salt)
    new_score = len(new_password)

    cursor.execute(
        "UPDATE users SET salt = ?, hash = ?, score = ? WHERE username = ?",
        (new_salt, new_hash, new_score, username)
    )
    conn.commit()
    print("Password updated.")

def clear_users():
    print("Deleting users...")
    cursor.execute("DELETE FROM users")
    conn.commit()
    print("All users deleted.")
