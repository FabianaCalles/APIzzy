import json

from lib.conf.templates import *
from lib.models.methodGenerator import MethodGenerator



class ClassGenerator():
    '''Class which given dict with API info creates FlaskRESTFul Class template'''

    def __init__(self, config:dict):

        # Imports needed for base API working
        self.imports = ['from flask import Flask, jsonify, make_response',
                        'from flask_restful import Resource, Api']
        
        # API ClassName and mounting endpoint definition with default case
        self.__classname = config['ClassName'] if config['ClassName'] != '' else 'ClassName'
        self.__endpoint = config['Endpoint'] if config['Endpoint'] != '' else '/'
        
        # Relate ClassName and endpoint in a tuple
        self.api_endpoint = (self.class_name, self.endpoint)
        self.flask_api = CLASS.format(self.class_name)

        # Methods to develop on the API
        self.methods = [m for m in config['Methods']]
        
        # Method generator instance to generate each of the methods
        self.method_generator = MethodGenerator()

        # Parse methods to be implemented
        self.parseMethods()

    
    @property
    def class_name(self):
        '''class_name getter'''

        return self.__classname
    

    @property
    def endpoint(self):
        '''endpoint getter'''

        return self.__endpoint


    def parseMethods(self):
        '''Function to start generating Flask methods'''

        # For each of the methods to be implemented
        for method in self.methods:
            # Generate the method with @class MethodGenerator
            content, imports = self.generateMethod(method)
            # Add the content generated to the body code
            self.flask_api += content
            self.imports += imports


    def generateMethod(self, method:dict):
        '''Function to filter type of method and create it'''

        match method['Type'].upper():

            case 'GET':
                return self.method_generator.generateGetMethod(method)

            case 'POST':
                return self.method_generator.generatePostMethod(method)

            case 'PUT':
                return self.method_generator.generatePutMethod(method)

            case 'DELETE':
                return self.method_generator.generateDeleteMethod(method)



