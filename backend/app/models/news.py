from app.extensions import db

class Topic(db.Model):
    __tablename__ = 'topics'

    id = db.Column(db.Integer, primary_key=True)
    positive = db.Column(db.String(255), nullable=True)
    negative = db.Column(db.String(255), nullable=True)
    title = db.Column(db.String(255), nullable=True)

    users = db.relationship('User', secondary='user_topics', back_populates='topics')



class Article(db.Model):
    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    title = db.Column(db.String(255), nullable=True)
    content = db.Column(db.String(255), nullable=True)
    press_name = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    view = db.Column(db.Integer, nullable=True)
    thumbnail_url = db.Column(db.String(255), nullable=True)
