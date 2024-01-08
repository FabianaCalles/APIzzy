API = 'app = Flask(__name__)\napi = Api(app)\n'

CLASS = 'class {}(Resource):\n\n'

GET = '\tdef get(self):\n'
POST = '\tdef post(self):\n'
PUT = '\tdef put(self):\n'
DELETE = '\tdef delete(self):\n'


JSON = '\n\t\t\twith open("{}", "r") as jfile:\n\t\t\t\tjret = json.load(jfile)\n'
JSONVALUE = '\n\t\t\twith open("{}", "r") as jfile:\n\t\t\t\tret = json.load(jfile)["{}"]\n'
ADDJSONRESOURCE = '\n\t\t\tif isinstance(jret, dict):\n\t\t\t\tjret = [jret]\n\t\t\tjret.append(http_data)\n'
REMOVEJSONRESOURCE = '\n\t\t\tjret.pop(http_data[id])\n'
UPDATEJSONRESOURCE = '\n\t\t\tjret[int(http_data[id])] = http_data\n'

GETDATABSE_CONN = '\n\t\t\tconnection = psycopg2.connect(database="{}", user="{}", password="{}", host="{}", port="{}")\n\t\t\tcursor = connection.cursor()'
GETEXECUTE = '\n\t\t\tcursor.execute("Select {} from {};")\n\t\t\tret = cursor.fetchall()\n\t\t\tconnection.close()\n'
POSTEXECUTE = '\n\t\t\tcursor.execute("Insert into {}{} values ({});")\n\t\t\tconnection.commit()\n\t\t\tconnection.close()\n'
DELETEEXECUTE = '\n\t\t\tcursor.execute("Delete from {}{};")\n\t\t\tconnection.commit()\n\t\t\tconnection.close()\n'
UPDATEEXECUTE = '\n\t\t\tcursor.execute("Update {} {}{};")\n\t\t\tconnection.commit()\n\t\t\tconnection.close()\n'

ENDPOINT = 'api.add_resource({}, "{}")\n'

RETURN = '\n\t\t\treturn make_response(jsonify({}), 200)\n'
RETURN_ERROR = '\n\t\texcept Exception as exc:\n\t\t\treturn make_response(jsonify({"Error": str(exc)}), 400)\n'
TRY = '\n\t\ttry:\n'

MAIN = "if __name__ == '__main__':\n\n\tapp.run(debug = True)\n"

JSON_WRITE = '\n\t\t\twith open("{}", "w") as jfile:\n\t\t\t\tjson.dump({}, jfile, indent = 4)\n'

DEFAULT_TEMPLATE_COMMENT = "\t\t\t# Write here your code logic\n\t\t\treturn_data = 'Test'\n\t\t\t# ------------------------"