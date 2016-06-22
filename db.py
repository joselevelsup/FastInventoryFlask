import pymysql.cursors

connection = pymysql.connect(host="localhost", user="root", password="", db="flaskproject")
def start():
    try:
        with connection.cursor() as cursor:
            sqlStart = "create table `users`(`username` varchar(15), `password` varchar(20));"
            cursor.execute(sqlStart)
    finally:
        connection.close()

def login_user(username, password):
    usr = "'",username,"'"
    sect = "'",password,"'"
    sqlGetUser = "select * from users where username = ",usr,"and password = ",sect
    try:
        with connection.cursor as cursor:
            cursor.execute(sqlGetUser)
            return True
    except:
        return False
    finally:
        connection.close()

# def add_user(username, password, email):
