from flask import Flask
from app.config import Config
from app.extensions import db, migrate, jwt
from app.main import main_blueprint
from app.api import api_blueprint
from app.api.auth import auth_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Register blueprints
    app.register_blueprint(api_blueprint)

    return app
