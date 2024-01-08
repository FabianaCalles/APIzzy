import json
from flask_restful import Resource, Api
from flask import Flask, jsonify, make_response


app = Flask(__name__)
api = Api(app)


class HOLA(Resource):
    def get(self):
        try:
            with open("json1", "r") as jfile:
                ret = json.load(jfile)["key1"]

            return make_response(jsonify({"Content": ret}), 200)

        except Exception as exc:
            return make_response(jsonify({"Error": str(exc)}), 400)


api.add_resource(HOLA, "/get")


if __name__ == "__main__":
    app.run(debug=True)
