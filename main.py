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
    if db.isSignedIn():
        return render_template('index.html')
    else:
        return redirect(url_for("loginpage"))


@app.route("/post", methods=['POST'])
def login():
    # when using JSON posts
    # param = request.get_json()
    # username = param.get("username");
    # password = param.get("password");
    username = request.form["username"]
    password = request.form["password"]
    print username, password
    if db.login_user(username, password):
        return "pass"
        # return redirect(url_for("start"))
    else:
        return "failed"

@app.route("/login")
def loginpage():
    return render_template("login.html")


if __name__ == "__main__":
    # db.start()
    app.run(port=8080)
