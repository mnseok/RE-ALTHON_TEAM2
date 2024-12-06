from flask import jsonify, request
from app.main import main_blueprint
from app.services.news_scraper import fetch_news
from app.services.llm_service import summarize_article, categorize_article
# from app.models.news import News
from app.extensions import db
