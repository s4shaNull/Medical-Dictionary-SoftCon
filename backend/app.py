# import mariadb
# import os

# from dotenv import load_dotenv, find_dotenv
# from flask import Flask, request
# from flask_restful import Api, Resource
# from flask_cors import CORS
# from gtts import gTTS
# from os import path

# load_dotenv(find_dotenv())

# config = {
#     'host' : "127.0.0.1",
#     'port' : 3306,
#     'user' : "root",
#     'password' : "mariadb_Hanoi2",
#     'database' : "MeDict"
# }

# app = Flask(__name__, static_url_path='/static/', static_folder='static/')
# CORS(app)

# api = Api(app)

# def get_connection():
#     connection = mariadb.connect(**config)
#     cur = connection.cursor()
#     return cur

# class SearchBar(Resource):
#     def get(self):
#         # if (request.environ['REMOTE_ADDR'] != os.getenv("HOST_IP_ADDR")):
#         #    return 'This API can only be accessed by the local machine!'

#         word = request.args.get("word")
#         lang = request.args.get("lang")

#         if word == "" or lang == "":
#             return [{'h': 'hello'}]
#         else:
#             cur = get_connection()
#             if lang == "en":
#                 query = f"""SELECT * FROM dict WHERE eng LIKE \"{word}%\" LIMIT 20;"""
#             if lang == "vn":
#                 query = f"""SELECT * FROM dict WHERE vn LIKE \"{word}%\" LIMIT 20;"""
#             cur.execute(query)
#             row_headers = [x[0] for x in cur.description]
#             rv = cur.fetchall()
#             json_data = []
#             for result in rv:
#                 json_data.append(dict(zip(row_headers, result)))
#             return json_data

# class Audio(Resource):
#     def get(self):
#         # if (request.environ['REMOTE_ADDR'] != os.getenv("HOST_IP_ADDR")):
#         #    return 'This API can only be accessed by the local machine!'

#         en_word = request.args.get("en_word")
#         vi_word = request.args.get("vi_word")

#         if en_word == None or vi_word == None:
#             return False
#         else:
#             link_to_en_mp3 = "static/"+en_word+"1.mp3"
#             link_to_vi_mp3 = "static/"+vi_word+"2.mp3"
#             if not (path.exists(link_to_en_mp3) and path.exists(link_to_vi_mp3)):
#                 tts = gTTS(en_word, lang="en", slow=True)
#                 tts.save(link_to_en_mp3)
#                 tts = gTTS(vi_word, lang="vi", slow=True)
#                 tts.save(link_to_vi_mp3)
#                 return "File created!"
#             return "File already exists!"

# api.add_resource(SearchBar, "/search_bar")
# api.add_resource(Audio, "/audio")

# if __name__ == "__main__":
#     app.run(debug=True, host='0.0.0.0')

import mariadb
import MySQLdb
import os

from dotenv import load_dotenv, find_dotenv
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_cors import CORS
from gtts import gTTS
from os import path

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

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


engine_name = f"mariadb://{config['user']}:{config['password']}@{config['host']}:{config['port']}/{config['database']}"

engine = create_engine(engine_name) #'mariadb://username:password@localhost:3306/database'
Base = declarative_base()

class Dict(Base):
    __tablename__ = 'dict'
    idx = Column(Integer, primary_key=True)
    en = Column(String(length=255))
    vn = Column(String(length=255))
    word_type = Column(String(length=50))
    word_type_vn = Column(String(length=50))

Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

class SearchBar(Resource):
    def get(self):
        word = request.args.get("word")
        lang = request.args.get("lang")

        if word == "" or lang == "":
            return jsonify([])
        else:
            if lang == "en":
                query = session.query(Dict).filter(Dict.en.like(f"{word}%")).limit(20)
            if lang == "vn":
                query = session.query(Dict).filter(Dict.vn.like(f"{word}%")).limit(20)

            # Convert the query object to a list of dictionaries
            # result = [row.__dict__ for row in query]
            # return jsonify(result)
            # Convert the query object to a list of dictionaries
            # and remove the _sa_instance_state attribute from each dictionary
            result = [{k: v for k, v in row.__dict__.items() if k != '_sa_instance_state'} for row in query]
            return jsonify(result)


class Audio(Resource):
    def get(self):
        # if (request.environ['REMOTE_ADDR'] != os.getenv("HOST_IP_ADDR")):
        #    return 'This API can only be accessed by the local machine!'

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
api.add_resource(SearchBar, "/search_bar")
api.add_resource(Audio, "/audio")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
