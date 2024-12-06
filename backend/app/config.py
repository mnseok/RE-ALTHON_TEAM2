import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    NEWS_API_KEY = os.getenv('NEWS_API_KEY', 'your_news_api_key')
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'your_gemini_api_key')  # 추가


config = Config()