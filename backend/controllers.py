from flask_restful import Resource
from sqlalchemy.orm import sessionmaker

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
            result = [{k: v for k, v in row.__dict__.items() if k != '_sa_instance_state'} for row in query]
            return jsonify(result)

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