import pymysql.cursors

connection = pymysql.connect(host="localhost", user="root", password="skipmaster12", db="flaskproject")
def start():
    try:
        with connection.cursor() as cursor:
            sqlStart = "create table `users`(`username` varchar(15), `password` varchar(20));"
            cursor.execute(sqlStart)
    finally:
        connection.close()

def login_user(username, password):
    usr = "'"+username+"'"
    sect = "'"+password+"'"
    sqlGetUser = "select * from users where username = "+usr+"and password = "+sect+" "
    with connection.cursor as cursor:
        try:
            cursor.execute(sqlGetUser)
        except:
            return "User not found"
        finally: connection.close()
