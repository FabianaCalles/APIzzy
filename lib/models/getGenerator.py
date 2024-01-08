from lib.conf.templates import *



class GetGenerator():
    '''Class made for generating get method with different templates'''
        
    def generateRawBody(self, method_config:dict):
        '''Raw body template'''
        
        # Get method definition with 'try' clause
        body = GET + TRY
        
        # Param to be returned
        param = method_config['Param'] if method_config["Param"] else 'Value'
        return_content = f'{{"Content": "{param}"}}'
        
        # Return of formatted body function and needed imports
        return body + RETURN.format(return_content) + RETURN_ERROR, []

    
    def generateJsonBody(self, method_config:dict):
        '''Json body template'''

        # Get method definition with 'try' clause
        body = GET + TRY

        # Json file to be attached
        dir = method_config['Dir'] if method_config['Dir'] else '/default.json'

        # In case param of json is requested, format body consequently
        if param := method_config['Param'].strip():
            body += JSONVALUE.format(dir, param)
            return_content = '{"Content": ret}'
        
        # Otherwise, return whole json content
        else:
            body += JSON.format(dir)
            return_content = 'jret'

        # Return of formatted body function and needed imports
        return body + RETURN.format(return_content) + RETURN_ERROR, ['import json']
    

    def generateSqlBody(self, method_config:dict):
        '''SQL body template'''

        # Get method definition with 'try' clause
        body = GET + TRY

        # Get database config data, default values included to avoid errors
        database = method_config['DbName'] if method_config['DbName'].strip() else 'database'
        user = method_config['Username'] if method_config['Username'].strip() else 'username'
        pswd = method_config['Password'] if method_config['Password'].strip() else 'password'
        port = method_config['Port'] if method_config['Port'].strip() else '5432'
        ip = method_config['Ip'] if method_config['Ip'].strip() else 'host'

        # Format sqlalchemy connection with config data
        body += GETDATABSE_CONN.format(database, user, pswd, ip, port)

        # Format columns to get requested and table name
        columns = ', '.join([col for col in method_config['Columns']]) if method_config['Columns'] else '*'
        table = method_config['Table'] if method_config['Table'].strip() else 'TableName'
        
        # Add to body sql command and return
        body += GETEXECUTE.format(columns, table)
        return_content = '{"Content": ret}'

        # Return of formatted body function and needed imports
        return body + RETURN.format(return_content) + RETURN_ERROR, ['import psycopg2']

    
    def generateDefaultBody(self):
        '''Default body function in case of empty fields recieved'''
        
        # Format body and return value
        body = GET + TRY
        return_content = '{{"Value": "Value"}}'
        
        # Return of formatted body function and needed imports
        return body + RETURN.format(return_content) + RETURN_ERROR, []