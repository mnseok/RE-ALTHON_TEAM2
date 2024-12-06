from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import User

auth_blueprint = Blueprint('auth', __name__, url_prefix='/auth')

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # 사용자 조회
    _user = User.query.filter_by(email=email).first()

    if _user and _user.check_password(password):  # 비밀번호 확인
        # JWT 생성
        access_token = create_access_token(identity={"id": _user.id, "email": _user.email})
        return jsonify({"access_token": access_token}), 200

    return jsonify({"msg": "Invalid email or password"}), 401

@auth_blueprint.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    user = get_jwt_identity()
    return jsonify({"logged_in_as": user})
