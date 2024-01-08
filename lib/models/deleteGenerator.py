from lib.conf.templates import *
from lib.models.utils import generate_conditions



class DeleteGenerator():

    def generateJsonBody(self, method_config:dict):
        body = DELETE + TRY

        dir = method_config['Dir'] if method_config['Dir'] else '/default.json'

        body += JSON.format(dir)
        body += REMOVEJSONRESOURCE
        body += JSON_WRITE.format(dir, 'jret')

        return body + RETURN.format('jret') + RETURN_ERROR, ['import json', 'from flask_restful import request']


    def generateSqlBody(self, method_config:dict):

        # Get method definition with 'try' clause
        body = DELETE + TRY

        # Get database config data, default values included to avoid errors
        database = method_config['DbName'] if method_config['DbName'].strip() else 'database'
        user = method_config['Username'] if method_config['Username'].strip() else 'username'
        pswd = method_config['Password'] if method_config['Password'].strip() else 'password'
        port = method_config['Port'] if method_config['Port'].strip() else '5432'
        ip = method_config['Ip'] if method_config['Ip'].strip() else 'host'

        # Format sqlalchemy connection with config data
        body += GETDATABSE_CONN.format(database, user, pswd, ip, port)

        table = method_config['Table'] if method_config['Table'].strip() else 'TableName'
        conditions = generate_conditions(method_config['Conditions'])

        body += DELETEEXECUTE.format(table, conditions)

        return body + RETURN.format('{"Status": "Success"}') + RETURN_ERROR, ['import psycopg2']

    
    def generateDefaultBody(self):
        
        body = DELETE + TRY
        body += DEFAULT_TEMPLATE_COMMENT

        return body + RETURN.format('return_data') + RETURN_ERROR, ['from flask_restful import request']

