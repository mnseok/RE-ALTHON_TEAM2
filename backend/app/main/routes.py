from flask import jsonify, request
from app.main import main_blueprint
from app.services.news_scraper import fetch_news
from app.services.llm_service import summarize_article, categorize_article
from app.models.news import News
from app.extensions import db

@main_blueprint.route('/fetch-news', methods=['GET'])
def fetch_news_route():
    news = fetch_news()
    return jsonify(news)

@main_blueprint.route('/summarize', methods=['POST'])
def summarize_route():
    data = request.json
    summary = summarize_article(data['content'])
    return jsonify({'summary': summary})

@main_blueprint.route('/categorize', methods=['POST'])
def categorize_route():
    data = request.json
    category = categorize_article(data['content'])
    return jsonify({'category': category})