import json

from lib.conf.templates import *
from lib.models.utils import merge
from lib.models.classGenerator import ClassGenerator


class APIGenerator():

    def __init__(self, config):
        self.apis = []
        self.imports = []
        self.endpoints = []

        self.config = config

    
    def createApi(self) -> str:

        if not isinstance(self.config, list):
            self.config = [self.config]
            
        for api in self.config:
            api_class = ClassGenerator(api)
            self.apis.append(api_class.flask_api)
            self.imports = merge(self.imports, api_class.imports)
            self.endpoints.append(api_class.api_endpoint)

        return self.createFile()
    

    def createFile(self) -> str:

        file = ''

        for imp in sorted(self.imports, key=len):
            file += imp +'\n'

        file += '\n\n\n' + API + '\n\n\n'

        for api in self.apis:
            file += api

        file += '\n\n\n'

        for ep in self.endpoints:
            file += ENDPOINT.format(ep[0], ep[1])

        file += '\n\n\n' + MAIN

        return file


if __name__ == '__main__':

    with open('test.json', 'r') as file:
        config = json.load(file)

    api = APIGenerator(config)
    #api = APIGenerator('./test.json')
    f = api.createApi()
    
    with open('api.py', 'w', encoding='utf-8') as file:
        file.write(f)

    
