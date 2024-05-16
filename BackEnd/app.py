from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json

from sparknlpdemo import unique_person_graph
from questionanswer import format_paragraph, generate_question, generate_answer
from newWordTokenization import ner_chunk_generation
from questionanswerSagor import ner_chunk_generation_sagor_sarkar
from questionanswerIndicNER import ner_chunk_generation_indic_ner

# Create Flask app
app = Flask(__name__)
CORS(app, support_credentials=True)

# Define a route for the root URL
@app.route('/')
def index():
    return 'Hello, World! This is my Flask backend.'

# Define a route to return JSON data
@app.route('/data', methods=['GET'])
def get_data():
    data = {'message': 'This is a sample JSON response from Flask backend.'}
    return jsonify(data)

@app.route('/get_ner', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_ner():
    # Check if the request contains JSON data
    if request.is_json:
        data = request.get_json()
        message = data.get('text', '')
        ner = ner_chunk_generation(message)
        response = {'response': ner}
        return jsonify(response), 200
    else:
        return jsonify({'error': 'Request must be JSON'}), 400
####################################################################
@app.route('/get_question', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_question():
    # Check if the request contains JSON data
    if request.is_json:
        data = request.get_json()
        message = data.get('question', '')
        question = generate_question(message)
        response = {'response': question}
        return jsonify(response), 200
    else:
        return jsonify({'error': 'Request must be JSON'}), 400
####################################################################
@app.route('/get_answer', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_answer():
    # Check if the request contains JSON data
    if request.is_json:
        data = request.get_json()
        # message = data.get('answer', '')
        answer = generate_answer(data)
        response = {'response': answer}
        return jsonify(response), 200
    else:
        return jsonify({'error': 'Request must be JSON'}), 400
####################################################################    
@app.route('/get_ner_sagorsarkar', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_ner_sagorsarkar():
    # Check if the request contains JSON data
    if request.is_json:
        data = request.get_json()
        message = data.get('text', '')
        ner = ner_chunk_generation_sagor_sarkar(message)
        response = {'response': ner}
        return jsonify(response), 200
    else:
        return jsonify({'error': 'Request must be JSON'}), 400
####################################################################
@app.route('/get_ner_indic_ner', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_ner_indic_ner():
    # Check if the request contains JSON data
    if request.is_json:
        data = request.get_json()
        message = data.get('text', '')
        ner = ner_chunk_generation_indic_ner(message)
        response = {'response': ner}
        return jsonify(response), 200
    else:
        return jsonify({'error': 'Request must be JSON'}), 400
####################################################################
@app.route('/post_example', methods=['POST'])
@cross_origin(supports_credentials=True)
def post_example():
    # Check if the request contains JSON data
    if request.is_json:
        data = request.get_json()
        message = data.get('text', '')
        lemma = unique_person_graph(message)
        # print('lemma', lemma)
        qstn_ans = format_paragraph(lemma)
        response = {'response': qstn_ans}
        return jsonify(response), 200
    else:
        return jsonify({'error': 'Request must be JSON'}), 400

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, port=8000)  # Set debug=True for development mode
