from app.extensions import db

class Topic(db.Model):
    __tablename__ = 'topics'

    id = db.Column(db.Integer, primary_key=True)
    positive = db.Column(db.String(255), nullable=True)
    negative = db.Column(db.String(255), nullable=True)
    title = db.Column(db.String(255), nullable=True)

    users = db.relationship('User', secondary='user_topics', back_populates='topics')
    articles = db.relationship('Article', back_populates='topic')
    perspectives = db.relationship('Perspective', back_populates='topic')
    
    @property
    def serialize(self):
        """Return object data in easily serializable format."""
        return {
            'id': self.id,
            'positive': self.positive,
            'negative': self.negative,
            'title': self.title
        }



class Article(db.Model):
    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    title = db.Column(db.String(255), nullable=True)
    content = db.Column(db.String(255), nullable=True)
    press_name = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    views = db.Column(db.Integer, nullable=True)
    comments = db.Column(db.Integer, nullable=True)
    thumbnail_url = db.Column(db.String(255), nullable=True)
    original_url = db.Column(db.String(255), nullable=True)
    
    topic = db.relationship('Topic', back_populates='articles')
    
    @property
    def serialize(self):
        """Return object data in easily serializable format."""
        return {
            'id': self.id,
            'topic_id': self.topic_id,
            'title': self.title,
            'content': self.content,
            'press_name': self.press_name,
            'created_at': self.created_at.strftime("%Y-%m-%d") if self.created_at else None,
            'views': self.views,
            'comments': self.comments,
            'thumbnail_url': self.thumbnail_url,
            'original_url': self.original_url
        }


class Perspective(db.Model):
    __tablename__ = 'perspectives'

    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    title = db.Column(db.String(255), nullable=True)
    # 'positive' is true or 'negative' is false boolean
    attitude = db.Column(db.Boolean, nullable=True)
    
    topic = db.relationship('Topic', back_populates='perspectives')