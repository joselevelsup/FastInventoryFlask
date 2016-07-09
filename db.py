import pymysql.cursors

connection = pymysql.connect(host="localhost", user="root", password="skipmaster12", db="flaskproject")
def start():
    try:
        with connection.cursor() as cursor:
            sqlStart = "create table `users`(`username` varchar(15), `password` varchar(20), `status` boolean);"
            cursor.execute(sqlStart)
    finally:
        connection.close()

def login_user(username, password):
    try:
        connection.cursor().execute("select * from users where username = %s and password = %s", (username, password))
        return True
    except:
        return False


# def isSignedIn():
#     sqlCheck = "select * from users where status = 1"
#     try:
#         with connection.cursor as cursor:
#             cursor.execute(sqlCheck)
#             return True
#     except:
#         return False

# def add_user(username, password, email):
