from flask import Flask, render_template, request, json
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


@app.route("/post", methods=['POST'])
def returnUser():
    param = request.get_json()
    username = param.get("username");
    password = param.get("password");
    print username, password
    if db.login_user(username, password):
        return render_template("<h1>Logged in</h1>")
    else:
        return render_template("index.html")

if __name__ == "__main__":
    # db.start()
    app.run()
