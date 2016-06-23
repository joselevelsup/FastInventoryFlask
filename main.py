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
    return render_template('index.html')

@app.route("/pass")
def passed():
    return "<h1>Logged in</h1>"

@app.route("/fail")
def failed():
    return "<h1>Failed</h1>"

@app.route("/post", methods=['POST'])
def returnUser():
    param = request.get_json()
    username = param.get("username");
    password = param.get("password");
    print username, password
    if db.login_user(username, password):
        return "passed"
    else:
        return "failed"

if __name__ == "__main__":
    # db.start()
    app.run(port=8080)
