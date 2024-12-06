from flask import Blueprint, request, jsonify
from app.models import Topic
from app.models import User
from flask_jwt_extended import jwt_required, get_jwt_identity

news_blueprint = Blueprint('news', __name__, url_prefix='/news')


@news_blueprint.route('/topics/all', methods=['GET'])
def get_topics():
    topics = Topic.query.all()
    return jsonify([topic.serialize for topic in topics])

# get my registered topics
@news_blueprint.route('/topics', methods=['GET'])
@jwt_required()
def get_my_topics():
    # JWT에서 사용자 ID 가져오기
    user_identity = get_jwt_identity()
    if not user_identity:
        return jsonify({"msg": "Unauthorized"}), 401

    # 데이터베이스에서 사용자 조회
    user = User.query.filter_by(id=user_identity['id']).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    # 사용자의 토픽 반환
    topics = user.topics  # `topics`는 User 모델의 관계로 정의되어야 함
    return jsonify([topic.serialize for topic in topics])

@news_blueprint.route('/topics', methods=['POST'])
@jwt_required()
def register_topics():
    user_identity = get_jwt_identity()
    if not user_identity:
        return jsonify({"msg": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_identity['id']).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    data = request.json
    topics = data.get('topics')
    if not topics:
        return jsonify({"msg": "No topics provided"}), 400
    
    # 사용자의 토픽을 모두 삭제
    user.topics = []
    for topic_id in topics:
        topic = Topic.query.filter_by(id=topic_id).first()
        if topic:
            user.topics.append(topic)
            
    return jsonify({"msg": "Successfully registered topics"}), 200