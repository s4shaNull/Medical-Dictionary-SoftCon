from flask_restful import Resource
from sqlalchemy.orm import sessionmaker
from flask import Flask, request, jsonify, session
from gtts import gTTS
from os import path
from models import *
from session_scope import session_scope
from sqlalchemy.exc import PendingRollbackError

Session = sessionmaker(bind=engine)

class SearchBar(Resource):
    def get(self):
        word = request.args.get("word")
        lang = request.args.get("lang")

        if word == "" or lang == "":
            return jsonify([])
        else:
            query = None
            with session_scope(Session) as session:
                if lang == "en":
                    query = session.query(Dict).filter(Dict.en.like(f"{word}%")).limit(20)
                if lang == "vn":
                    query = session.query(Dict).filter(Dict.vn.like(f"{word}%")).limit(20)

                try:
                    result = [{k: v for k, v in row.__dict__.items() if k != '_sa_instance_state'} for row in query]
                except PendingRollbackError:
                    return "Transaction has been rolled back", 400
                
                return jsonify(result)


class Audio(Resource):
    def get(self):
        en_word = request.args.get("en_word")
        vi_word = request.args.get("vi_word")

        if en_word == None or vi_word == None:
            return False
       
        else:
            query = None
            with session_scope(Session) as session:
                query = session.query(Dict).filter(Dict.en == en_word).first()
            
            if query is None:
                return "Word not found in the database."
            else:
                link_to_en_mp3 = "static/" + en_word + "1.mp3"
                link_to_vi_mp3 = "static/" + vi_word + "2.mp3"
                if not (path.exists(link_to_en_mp3) and path.exists(link_to_vi_mp3)):
                    tts = gTTS(en_word, lang="en", slow=True)
                    tts.save(link_to_en_mp3)
                    tts = gTTS(vi_word, lang="vi", slow=True)
                    tts.save(link_to_vi_mp3)
                    return "File created!"