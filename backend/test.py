import unittest
import requests
from flask_restful import Resource, reqparse


from flask import Flask
from flask_restful import Api

# from controllers import SearchBar
# from controllers import Audio

app = Flask(__name__)
api = Api(app)

class TestSearchBar(unittest.TestCase):
    def test_search_bar_with_word_length_one_and_language(self):
        response1 = requests.get("http://localhost:5000/search_bar?word=a&lang=en")
        response2 = requests.get("http://localhost:5000/search_bar?word=d&lang=vi")
        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertTrue(len(response1.json()) > 0)
        self.assertTrue(len(response2.json()) > 0)
    
    def test_search_bar_with_word_length_two_and_language(self):
        response1 = requests.get("http://localhost:5000/search_bar?word=ab&lang=en")
        response2 = requests.get("http://localhost:5000/search_bar?word=cu&lang=vi")
        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertTrue(len(response1.json()) > 0)
        self.assertTrue(len(response2.json()) > 0)  

    def test_search_bar_with_word_length_three_and_language(self):
        response1 = requests.get("http://localhost:5000/search_bar?word=abs&lang=en")
        response2 = requests.get("http://localhost:5000/search_bar?word=cun&lang=vi")
        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertTrue(len(response1.json()) > 0)
        self.assertTrue(len(response2.json()) > 0) 

    def test_search_bar_with_word_length_four_and_language(self):
        response1 = requests.get("http://localhost:5000/search_bar?word=assi&lang=en")
        response2 = requests.get("http://localhost:5000/search_bar?word=benh&lang=vi")
        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertTrue(len(response1.json()) > 0)
        self.assertTrue(len(response2.json()) > 0) 

    def test_search_bar_with_word_length_five_and_language(self):
        response1 = requests.get("http://localhost:5000/search_bar?word=assoc&lang=en")
        response2 = requests.get("http://localhost:5000/search_bar?word=xuong&lang=vi")
        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertTrue(len(response1.json()) > 0)
        self.assertTrue(len(response2.json()) > 0) 


    def test_search_bar_with_word_length_six_and_language(self):
        response1 = requests.get("http://localhost:5000/search_bar?word=astroc&lang=en")
        response2 = requests.get("http://localhost:5000/search_bar?word=nhân%20tạ&lang=vi")
        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertTrue(len(response1.json()) > 0)
        self.assertTrue(len(response2.json()) > 0) 

    def test_search_bar_with_word_length_seven_and_language(self):
        response1 = requests.get("http://localhost:5000/search_bar?word=astrocy&lang=en")
        response2 = requests.get("http://localhost:5000/search_bar?word=nhân%20tạo&lang=vi")
        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertTrue(len(response1.json()) > 0)
        self.assertTrue(len(response2.json()) > 0) 

    def test_search_bar_with_word_length_eight_and_language(self):
        response1 = requests.get("http://localhost:5000/search_bar?word=ateloche&lang=en")
        response2 = requests.get("http://localhost:5000/search_bar?word=gây%20ngạt%20t&lang=vi")
        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertTrue(len(response1.json()) > 0)
        self.assertTrue(len(response2.json()) > 0) 

    def test_search_bar_with_word_length_nine_and_language(self):
        response1 = requests.get("http://localhost:5000/search_bar?word=autointer&lang=en")
        response2 = requests.get("http://localhost:5000/search_bar?word=gây%20ngạt%20th&lang=vi")
        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertTrue(len(response1.json()) > 0)
        self.assertTrue(len(response2.json()) > 0) 

    def test_search_bar_with_invalid_word(self):
        response = requests.get("http://localhost:5000/search_bar?word=abcdefg&lang=en")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)
    
    def test_search_bar_without_word(self):
        response = requests.get("http://localhost:5000/search_bar?lang=en")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(len(response.json()), 0)

    def test_search_bar_without_language(self):
        response = requests.get("http://localhost:5000/search_bar?word=hello")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(len(response.json()), 0)

# class TestAudio(unittest.TestCase):
#     def test_en_and_vi_in_database_mp3_not_in_folder(self):
#         # arrange
#         api.add_resource(Audio, '/audio')
#         en_word = 'hello'
#         vi_word = 'xin chào'

#         # act
#         with app.test_client() as client:
#             response = client.get(f'/audio?en_word={en_word}&vi_word={vi_word}')
#             data = response.get_json()

#         # assert
#         self.assertEqual(response.status_code, 404)
#         self.assertEqual(data['message'], 'Mp3 file not found')

#     def test_en_in_database_vi_not_in_database_mp3_not_in_folder(self):
#         # arrange
#         api.add_resource(Audio, '/audio')
#         en_word = 'hello'
#         vi_word = 'xin chao'

#         # act
#         with app.test_client() as client:
#             response = client.get(f'/audio?en_word={en_word}&vi_word={vi_word}')
#             data = response.get_json()

#         # assert
#         self.assertEqual(response.status_code, 404)
#         self.assertEqual(data['message'], 'Vi word not found')

#     def test_en_not_in_database_vi_in_database_mp3_not_in_folder(self):
#         # arrange
#         api.add_resource(Audio, '/audio')
#         en_word = 'helloo'
#         vi_word = 'xin chào'

#         # act
#         with app.test_client() as client:
#             response = client.get(f'/audio?en_word={en_word}&vi_word={vi_word}')
#             data = response.get_json()

#         # assert
#         self.assertEqual(response.status_code, 404)
#         self.assertEqual(data['message'], 'En word not found')

#     def test_en_and_vi_not_in_database_mp3_not_in_folder(self):
#         # arrange
#         api.add_resource(Audio, '/audio')
#         en_word = 'helloo'
#         vi_word = 'xin chao'

#         # act
#         with app.test_client() as client:
#             response = client.get(f'/audio?en_word={en_word}&vi_word={vi_word}')
#             data = response.get_json()

#         # assert
#         self.assertEqual(response.status_code, 404)
#         self.assertEqual(data['message'], 'En and vi words not found')
        
if __name__ == '__main__':
    unittest.main()
