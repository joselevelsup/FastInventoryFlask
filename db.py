import pymysql.cursors

connection = pymysql.connect(host="localhost", user="root", password="skipmaster12", db="fastinventory")

def login_user(username, password):
    try:
        connection.cursor().execute("select username, passwd from users where username = %s and passwd = %s", (username, password))
        return True
    except:
        return False


def add_user(id, username, password):
    try:
        connection.cursor().execute("insert into users values(%s, %s, %s, 0)", (id, username, password))
        return True
    except:
        return False

def query():
    try:
        with connection.cursor() as cursor:
            cursor.execute("select * from inventory")
            query = cursor.fetchall()
            return query
    except:
        return False


def addToDatabase(iId, iType, iModNum):
    try:
        with connection.cursor() as cursor:
            cursor.execute("insert into inventory values(%s, %s, %s, 0, curdate())", (iId, iType, iModNum))
            connection.commit()
            return True
    except:
        return False