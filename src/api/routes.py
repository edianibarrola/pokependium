"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Card
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from argon2 import PasswordHasher

ph = PasswordHasher()
api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    content = request.get_json(silent=True)
    user = User(email = content["email"], password = ph.hash(content["password"]), is_active = True)

    db.session.add(user)
    db.session.commit()

    response_body = {
        "message": "User Created"
    }

    return jsonify(response_body), 204

@api.route('/login', methods=['POST'])
def login():

    content = request.get_json()
    print(content)
    user = User.query.filter(User.email == content["email"]).first()
    if user is None:
        return jsonify({"message": "invalid user"}), 403
    
    try:
        ph.verify(user.password, content["password"])
    except:
        return jsonify({"message": "invalid password"}), 403
        
    access_token = create_access_token(identity=user.id, additional_claims={"email":user.email})
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route('/userinfo', methods=['GET'])
@jwt_required()
def userinfo():
    current_user_id = get_jwt_identity()
    
    user = User.query.filter(User.id == current_user_id).first()
    
    response_body = {
        "message": f"Hello {user.email} ",
        "details": user.serialize()
    }

    return jsonify(user.serialize()), 200

@api.route('/allusers', methods=['GET'])
def getallusers():
    all_users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), all_users))
    response_body = {
        "msg": "Here are all of the users.",
        "details": all_users
    }

    return jsonify(response_body), 200

@api.route('/allcards', methods=['GET']) #gets all owned cards for current user
@jwt_required()
def allcards():
    current_user_id = get_jwt_identity()
    
    user = User.query.filter(User.id == current_user_id).first()
    
    all_cards= Card.query.all()
    all_cards= list(map(lambda x: x.serialize(), all_cards))
    response_body = {
        "message": f"Hello {user.email} ",
        "details": all_cards
    }

    return jsonify(response_body), 200

@api.route('/addownedcard', methods=['POST']) #Adds a new set to the list 
@jwt_required()
def addownedcard(): 
    owned_card = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.filter(User.id == current_user_id).first()
    
    if owned_card is None:
        raise APIException("Your JSON body is wrong", 400)
    new_card= Card(card_id=owned_card['card_id'], user_id=current_user_id, standard_art=owned_card['standard_art'],standard_qty=owned_card['standard_qty'],alternate_art=owned_card['alternate_art'], alternate_qty=owned_card['alternate_qty']) 
    user.cards.append(new_card)

    db.session.add(new_card) 
    db.session.commit()
    newDict = new_card.serialize()
    return jsonify(newDict), 200 



@api.route('/usercards', methods=['GET'])
@jwt_required()
def usercards():
    current_user_id = get_jwt_identity()
    
    user = User.query.filter(User.id == current_user_id).first()
    cards = list(map(lambda x: x.serialize(),user.cards))
    response_body = {
        "message": f"Cards owned by {user.email} ",
        "details": cards
    }

    return jsonify(response_body), 200

@api.route('updatecard', methods=['PUT'])
@jwt_required()
def updatecards():
    body = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    owned_card = Card.query.filter_by(user_id = current_user_id, card_id = body['card_id']).first()
    print(owned_card, "11")
    print(body, "1")
    if user is None:
        raise APIException('User not found', status_code=404)

    if owned_card is None:
        print(owned_card,"2")
        newcard= Card(card_id = body['card_id'], user_id = current_user_id, standard_art = body['standard_art'], standard_qty = body['standard_qty'], alternate_art = body['alternate_art'], alternate_qty = body['alternate_qty']) 
        
        db.session.add(newcard) 
        db.session.commit()
        
    
    elif body['card_id'] == owned_card.card_id:
        print(owned_card,'3')
        updatecard = Card.query.filter_by(user_id = current_user_id, card_id = body['card_id']).first()
        updatecard.standard_art = body['standard_art']
        updatecard.standard_qty = body['standard_qty']
        updatecard.alternate_art = body['alternate_art']
        updatecard.alternate_qty = body['alternate_qty']    
        db.session.commit()
    # else: 
    #     print(owned_card,'4')    
    #     newcard= Card(card_id=body['card_id'], user_id=current_user_id, standard_art=body['standard_art'],standard_qty=body['standard_qty'],alternate_art=body['alternate_art'], alternate_qty=body['alternate_qty']) 
    #     db.session.add(newcard) 
    #     db.session.commit()
    
    return jsonify('success'),200


@api.route("/reset", methods=["POST"])
@jwt_required()
def update_password():
    if request.method == "POST":
        # new_password = request.json.get("password")
        email = request.json.get("email")
        password = request.json.get("password")

        if not email:
            return jsonify({"msg": "Missing email in request."}), 400
        if not password:
            return jsonify({"msg":"Missing pw in request."}),400
        
        user = User.query.filter_by(email=email).first()
        
        # Create and set new password
        # result_str = ''.join(random.choice(string.ascii_letters) for i in range(12))
        # new_password_hashed = generate_password_hash(result_str)
        
        password = ph.hash(password)
        user.password = password
        db.session.commit()        

        payload = {
            "msg": "Success.",
            
        }

        return jsonify(payload), 200

# @api.route('/updateownedcards', methods=['PUT']) #Adds a new set to the list 
# @jwt_required()
# def updateownedcards(): 
#     all_owned_cards = request.get_json()
#     current_user_id = get_jwt_identity()
#     user = User.query.filter(User.id == current_user_id).first()
#     for owned_card in all_owned_cards:
#         if owned_card is None:
#             raise APIException("Your JSON body is wrong", 400)
#         if owned_card.id not in user.cards
#             new_card= Card(card_id=owned_card['card_id'],standard_art=owned_card['standard_art'],standard_qty=owned_card['standard_qty'],alternate_art=owned_card['alternate_art'], alternate_qty=owned_card['alternate_qty']) 
#             user.cards.append(new_card)
#             db.session.add(new_card) 
#             db.session.commit()
#     newDict = new_card.serialize()
#     return jsonify(newDict), 200 




# old unused routes

# @api.route('/cardset', methods=['GET']) #Returns all of the users in a list
# def get_all_sets():
#     all_sets = CardSet.query.all()
#     all_sets = list(map(lambda x: x.serialize(), all_sets))
#     response_body = {
#         "msg": "Here are all of the users."
#     }
#     return jsonify(all_sets), 200

# @api.route('/cardset', methods=['POST']) #Adds a new set to the list 
# def add_set():
#     set_info = request.get_json()
#     if set_info is None:
#         raise APIException("Your JSON body is wrong", 400)
#     new_set= CardSet(name=set_info['name']) 
#     db.session.add(new_set) 
#     db.session.commit()
#     newDict = new_set.serialize()
#     return jsonify(newDict), 200 

# @api.route('/signup', methods=['POST'])
# def add_user():
#     user_info = request.get_json()
#     if user_info is None:
#         raise APIException("Your JSON body is wrong", 400)
#     user = User()
#     user.username= user_info['username']
#     user.email= user_info['email']
#     user.password= user_info['password']
#     db.session.add(user)
#     db.session.commit()
#     newUser = user.serialize()
#     return jsonify(newUser),200

# @api.route('/signup')
# def get_users():
#     users = User.query.all()
#     users = list(map(lambda x: x.serialize(), users))
#     return jsonify(users),200