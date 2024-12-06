from flask import Blueprint, request, jsonify
from app.models import Topic, User, Article, Perspective
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.services.llm_service2 import GetTopic, getArticleBias, getSummary

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
    
    data = request.get_json()
    logging.debug(data)
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

@news_blueprint.route('/articles/<int:topic_id>', methods=['GET'])
def get_articles(topic_id):
    articles = Article.query.filter_by(topic_id=topic_id).all()
    return jsonify([article.serialize for article in articles])

@news_blueprint.route('/articles/<int:article_id>', methods=['GET'])
def get_article(article_id):
    article = Article.query.filter_by(id=article_id).first()

    return jsonify(article.serialize)

@news_blueprint.route('/perspectives/<int:topic_id>', methods=['GET'])
def get_perspectives(topic_id):
    """특정 토픽의 찬성/반대 관점들을 조회"""
    perspectives = Perspective.query.filter_by(topic_id=topic_id).all()
    
    # 찬성/반대 관점으로 분류
    result = {
        'positive': [],
        'negative': []
    }
    
    for perspective in perspectives:
        if perspective.attitude:  # True면 찬성
            result['positive'].append({
                'id': perspective.id,
                'title': perspective.title
            })
        else:  # False면 반대
            result['negative'].append({
                'id': perspective.id,
                'title': perspective.title
            })
    
    return jsonify(result)

# @news_blueprint.route('/articles/<int:article_id>/view', methods=['POST'])
# def increment_view(article_id):
#     """기사 조회수 증가"""
#     article = Article.query.get_or_404(article_id)
    
#     if article.views is None:
#         article.views = 0
#     article.views += 1
#     db.session.commit()
    
#     return jsonify({'msg': 'View count increased', 'views': article.views})

@news_blueprint.route('/articles/recent', methods=['GET'])
def get_recent_articles():
    """최신 기사 조회 (전체 토픽)"""
    limit = request.args.get('limit', 10, type=int)  # 기본값 10개
    
    articles = Article.query\
        .order_by(Article.created_at.desc())\
        .limit(limit)\
        .all()
    
    return jsonify([article.serialize for article in articles])

@news_blueprint.route('/articles/analyze', methods=['POST'])
def analyze_article():
    """기사 내용을 분석하여 토픽과 편향도를 반환"""
    data = request.json
    content = data.get('content')
    
    if not content:
        return jsonify({"error": "No content provided"}), 400
    
    try:
        # 토픽 분석
        topic = GetTopic(content)
        
        # 편향도 분석
        bias_result = getArticleBias(content, topic)
        
        return jsonify({
            "topic": topic,
            "bias_score": bias_result["편향성 평가"],
            "similar_sentences": bias_result["유사 문장"]
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@news_blueprint.route('/articles/<int:article_id>/analyze', methods=['GET'])
def analyze_existing_article(article_id):
    """기존 기사의 토픽과 편향도를 분석"""
    article = Article.query.get_or_404(article_id)
    
    try:
        # 토픽 분석
        topic = GetTopic(article.content)
        
        # 편향도 분석
        bias_result = getArticleBias(article.content, topic)
        
        return jsonify({
            "article_id": article_id,
            "title": article.title,
            "topic": topic,
            "bias_score": bias_result["편향성 평가"],
            "similar_sentences": bias_result["유사 문장"]
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@news_blueprint.route('/articles/summarize', methods=['POST'])
def summarize_article():
    """기사 내용을 요약"""
    data = request.json
    content = data.get('content')
    
    if not content:
        return jsonify({"error": "No content provided"}), 400
    
    try:
        summary = getSummary(content)
        return jsonify({
            "summary": summary
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@news_blueprint.route('/articles/<int:article_id>/summarize', methods=['GET'])
def summarize_existing_article(article_id):
    """기존 기사 요약"""
    article = Article.query.get_or_404(article_id)
    
    try:
        summary = getSummary(article.content)
        return jsonify({
            "article_id": article_id,
            "title": article.title,
            "summary": summary
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
