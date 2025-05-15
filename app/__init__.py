from flask import Flask, render_template, request, redirect, session, url_for, flash
import os
from db import *

app = Flask(__name__)
app.secret_key = os.urandom(32)

@app.route('/')
def home():
    return render_template('home.html')

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        # password = request.form["password"]
        # PASSWORD RETRIEVED FROM GAME

        if userCollection.find_one({"username": username}):
            flash("Username already exists.")
            return redirect(url_for("register"))

        #hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        userCollection.insert_one({"username": username})
        flash("Account created! Please log in.")
        return redirect(url_for("game"))

    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        user = users.find_one({"username": username})
        if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
            session["user"] = username
            return redirect(url_for("home"))
        else:
            flash("Invalid login credentials.")
            return redirect(url_for("login"))

    return render_template("login.html")

@app.route("/logout")
def logout():
    session.pop("user", None)
    flash("Logged out.")
    return redirect(url_for("login"))

@app.route("/game")
def game():
    return render_template("game.html", rules=[1,2,3,4,5])

@app.route('/story')
def story():
    return render_template("story.html")


if __name__ == '__main__':
    app.run(debug = True)
