import psycopg2
from api_generator import APIGenerator
from flask_restful import Resource, Api
from flask_cors import CORS
from flask import Flask, jsonify, make_response, send_from_directory, request
from lib.models.utils import parse_json
import json, subprocess


app = Flask(__name__)
CORS(app)
api = Api(app)


class MakeAPI(Resource):
    
    def post(self):

        try:
            f = APIGenerator(parse_json(request.json)).createApi()

            with open('api.py', 'w', encoding='utf-8') as file:
                file.write(f)

            p = subprocess.Popen(['black', 'api.py'], stdout=subprocess.DEVNULL)
            p.communicate()

            return send_from_directory('./', 'api.py', as_attachment=True)
        
        except Exception as exc:
            raise exc
            return make_response(jsonify({"Error": str(exc)}), 400)


api.add_resource(MakeAPI, "/form")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port= 5001, debug=True)
