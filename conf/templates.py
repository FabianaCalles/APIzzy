
CLASS = 'class {}(Resource):\n'

GET = '\tdef get(self):\n'
POST = '\tdef post(self):\n'
PUT = '\tdef put(self):\n'
DELETE = '\tdef delete(self):\n'

RETURN = '\t\treturn jsonify({})\n'


"""class Hello(Resource):
  
    # corresponds to the GET request.
    # this function is called whenever there
    # is a GET request for this resource
    def get(self):
  
        return jsonify({'message': 'hello world'})
  
    # Corresponds to POST request
    def post(self):
          
        data = request.get_json()     # status code
        return jsonify({'data': data}), 201
  
  
# another resource to calculate the square of a number
class Square(Resource):
  
    def get(self, num):
  
        return jsonify({'square': num**2})"""