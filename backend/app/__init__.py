from flask import Flask
from app.config import Config
from app.extensions import db, migrate, jwt
from app.main import main_blueprint
from app.api import api_blueprint
from app.api.auth import auth_blueprint
from seeds import seed
from flask.cli import with_appcontext
import click

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Register blueprints
    app.register_blueprint(api_blueprint)

    # Flask CLI 명령 추가
    @app.cli.command("seed")
    @with_appcontext
    def seed_command():
        """Seed the database with initial data."""
        seed(db)
        click.echo("Database seeded successfully.")


    return app
