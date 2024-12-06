from flask import Blueprint
from .auth import auth_blueprint
from .news import news_blueprint

api_blueprint = Blueprint('api', __name__, url_prefix='/api')
api_blueprint.register_blueprint(news_blueprint)
api_blueprint.register_blueprint(auth_blueprint)