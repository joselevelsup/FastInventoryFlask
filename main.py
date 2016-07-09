from flask import Flask, render_template, request, json, redirect, url_for
import db

app = Flask(__name__, static_url_path='/static')
jinja_options = app.jinja_options.copy()
jinja_options.update(dict(
    block_start_string='<%',
    block_end_string='%>',
    variable_start_string='%%',
    variable_end_string='%%',
    comment_start_string='<#',
    comment_end_string='#>',
))
app.jinja_options = jinja_options

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

@app.route("/login/try")
def try_again():
    return render_template("retry.html")

@app.route("/inventory")
def main():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(port=8080)
