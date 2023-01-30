from flask import Flask, request, jsonify
from flask_restful import Api
from flask_cors import CORS
from controllers import SearchBar
from controllers import Audio

app = Flask(__name__, static_url_path='/static/', static_folder='static/')
CORS(app)

api = Api(app)

api.add_resource(SearchBar, "/search_bar")
api.add_resource(Audio, "/audio")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')