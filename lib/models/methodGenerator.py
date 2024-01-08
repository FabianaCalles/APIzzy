from lib.conf.templates import *
from lib.models.getGenerator import GetGenerator
from lib.models.postGenerator import PostGenerator
from lib.models.deleteGenerator import DeleteGenerator
from lib.models.putGenerator import PutGenerator


class MethodGenerator():

    def __init__(self):
        # Instantiate different method generators to use them
        self.get_generator = GetGenerator()
        self.post_generator = PostGenerator()
        self.delete_generator = DeleteGenerator()
        self.put_generator = PutGenerator()

    
    def generateGetMethod(self, method:dict) -> str:
        '''Depending on source, use a generator to make get API code'''

        match src := method['Source'].capitalize():

            case 'Raw':
                return self.get_generator.generateRawBody(method['MethodConfig'][src])

            case 'Json':
                return self.get_generator.generateJsonBody(method['MethodConfig'][src])

            case 'Sql':
                return self.get_generator.generateSqlBody(method['MethodConfig'][src])

            case other:
                return self.get_generator.generateDefaultBody()
            
    
    def generatePostMethod(self, method:dict) -> str:
        '''Depending on source, use a generator to make post API code'''

        match src := method['Source'].capitalize():

            case 'Json':
                return self.post_generator.generateJsonBody(method['MethodConfig'][src])

            case 'Sql':
                return self.post_generator.generateSqlBody(method['MethodConfig'][src])

            case other:
                return self.post_generator.generateDefaultBody()


    
    def generateDeleteMethod(self, method:dict) -> str:
        '''Depending on source, use a generator to make put API code'''
        
        match src := method['Source'].capitalize():

            case 'Json':
                return self.delete_generator.generateJsonBody(method['MethodConfig'][src])

            case 'Sql':
                return self.delete_generator.generateSqlBody(method['MethodConfig'][src])

            case other:
                return self.delete_generator.generateDefaultBody()

    
    
    def generatePutMethod(self, method:dict) -> str:
        '''Depending on source, use a generator to make delete API code'''

        match src := method['Source'].capitalize():

            case 'Json':
                return self.put_generator.generateJsonBody(method['MethodConfig'][src])

            case 'Sql':
                return self.put_generator.generateSqlBody(method['MethodConfig'][src])

            case other:
                return self.put_generator.generateDefaultBody()
            


