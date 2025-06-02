from flask import Flask, render_template, request, redirect, session, url_for, flash
import os
import json
from pathlib import Path
from db import *

app = Flask(__name__)
app.secret_key = os.urandom(32)

# GLOBAL VARIABLES
global username

# Define the base directory (where this file is located)
BASE_DIR = Path(__file__).resolve().parent

@app.route('/')
def home():
    return render_template('home.html')

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]

        if check_user(username):
            flash("Username already exists.")
            return redirect(url_for("register"))
        else:
            return redirect(url_for("game"))
    return render_template("register.html")

@app.route("/game", methods=["GET", "POST"])
def game():
    # Use relative path to the JSON rules file
    rules_path = BASE_DIR / 'static' / 'rules.json'
    with open(rules_path) as f:
        rules = json.load(f)
    return render_template("game.html", rules = rules)

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        if verify_user(username, password):
            session["user"] = username
            return redirect(url_for("home"))
        else:
            flash("Invalid login credentials.")
            # return render_template("login.html")

            return redirect(url_for("login"))

    return render_template("login.html")

@app.route("/logout")
def logout():
    session.pop("user", None)
    flash("Logged out.")
    return redirect(url_for("login"))

@app.route('/story')
def story():
    return render_template("story.html")

@app.route("/color-trap")
def color_trap():
    return render_template("color_trap.html")

if __name__ == '__main__':
    app.run(debug=False)
