"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, CardSet
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/set', methods=['GET']) #Returns all of the users in a list
def get_all_sets():
    all_sets = CardSet.query.all()
    all_sets = list(map(lambda x: x.serialize(), all_sets))
    response_body = {
        "msg": "Here are all of the users."
    }
    return jsonify(all_sets), 200

@api.route('/set', methods=['POST']) #Adds a new set to the list 
def add_set():
    set_info = request.get_json() 
    new_set= CardSet(name=set_info['name']) 
    db.session.add(new_set) 
    db.session.commit() 
    response = CardSet.query.all()
    response = list(map(lambda x: x.serialize(), response))
    
    return jsonify(response), 200 
