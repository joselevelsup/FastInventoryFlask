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
    # db.start()
    return render_template('hello.html')


@app.route("/postdata", methods=['POST'])
def returnUser():
    return "Hello world"

if __name__ == "__main__":
    app.run()
