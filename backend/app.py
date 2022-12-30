import mariadb
import os

from dotenv import load_dotenv, find_dotenv
from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS
from gtts import gTTS
from os import path

load_dotenv(find_dotenv())

config = {
    'host' : 'db',
    'port' : 3306,
    'user' : os.getenv("MYSQL_FLASK_USER"),
    'password' : os.getenv("MYSQL_FLASK_PASSWORD"),
    'database' : os.getenv("MYSQL_DATABASE")
}

app = Flask(__name__, static_url_path='/static/', static_folder='static/')
CORS(app)

api = Api(app)

def get_connection():
    connection = mariadb.connect(**config)
    cur = connection.cursor()
    return cur

class SearchBar(Resource):
    def get(self):
        word = request.args.get("word")
        lang = request.args.get("lang")

        if word == "" or lang == "":
            return []
        else:
            cur = get_connection()
            if lang == "en":
                query = f"""SELECT * FROM dict WHERE en LIKE \"{word}%\" LIMIT 20;"""
            if lang == "vn":
                query = f"""SELECT * FROM dict WHERE vn LIKE \"{word}%\" LIMIT 20;"""
            cur.execute(query)
            row_headers = [x[0] for x in cur.description]
            rv = cur.fetchall()
            json_data = []
            for result in rv:
                json_data.append(dict(zip(row_headers, result)))
            return json_data

class Audio(Resource):
    def get(self):
        en_word = request.args.get("en_word")
        vi_word = request.args.get("vi_word")

        if en_word == None or vi_word == None:
            return False
        else:
            link_to_en_mp3 = "static/"+en_word+"1.mp3"
            link_to_vi_mp3 = "static/"+vi_word+"2.mp3"
            if not (path.exists(link_to_en_mp3) and path.exists(link_to_vi_mp3)):
                tts = gTTS(en_word, lang="en", slow=True)
                tts.save(link_to_en_mp3)
                tts = gTTS(vi_word, lang="vi", slow=True)
                tts.save(link_to_vi_mp3)
                return "File created!"
            return "File already exists!"

api.add_resource(SearchBar, "/search_bar")
api.add_resource(Audio, "/audio")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
