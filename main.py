from flask import Flask, render_template, request, json, redirect, url_for, jsonify
import db

app = Flask(__name__, static_url_path='/static')

@app.route("/")
def start():
    return redirect(url_for("templ"))

@app.route("/login")
def templ():
    return render_template("login.html")

@app.route("/post", methods=['POST'])
def login():
    username = request.form["username"]
    password = request.form["password"]
    print username, password
    print db.login_user(username, password)
    if db.login_user(username, password):
        return redirect(url_for("main"))
    else:
        return redirect(url_for("try_again"))

@app.route("/add", methods=['POST'])
def addItem():
    itemID = request.form["itemID"]
    itemType = request.form["itemType"]
    modNum = request.form["modNum"]
    print modNum, itemType, itemID
    if db.addToDatabase(itemID, itemType, modNum):
        return redirect(url_for("main"))
    else:
        return redirect(url_for("templ"))

@app.route("/logout", methods=['POST'])
def logout():
    return redirect(url_for("templ"))

@app.route("/login-retry")
def try_again():
    return render_template("retry.html")

@app.route("/inventory")
def main():
    return render_template("index.html")

@app.route("/query")
def query():
    inventory = db.query()
    return jsonify(inventory), 200

# Not working at the moment
@app.route("/filter", methods=['POST'])
def filterItems():
    itemID = request.form["itemID"]
    itemType = request.form["itemType"]
    modNum = request.form["modNum"]
    return redirect(url_for("main"))


if __name__ == "__main__":
    app.run(port=8080)
