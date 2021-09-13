from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


cards = db.Table('cards',
    db.Column('card_id', db.Integer, db.ForeignKey('card.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)    


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)
    cards = db.relationship('Card', secondary=cards, lazy='subquery',
        backref=db.backref('user', lazy=True))

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "cards": list(map(lambda x: x.serialize(), self.cards)),
            # do not serialize the password, its a security breach
        }

class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.String(120),unique=False,nullable=False)
    standard_art = db.Column(db.Boolean(), unique=False, nullable=True)
    standard_qty = db.Column(db.Integer, unique=False, nullable=True)
    alternate_art = db.Column(db.Boolean(), unique=False, nullable=True)
    alternate_qty = db.Column(db.Integer, unique=False, nullable=True)

    def __repr__(self):
        return '<Card %r>' % self.card_id

    def serialize(self):
        return {
            "id": self.id,
            "card_id": self.card_id,
            "standard_art": self.standard_art,
            "standard_qty": self.standard_qty,
            "alternate_art": self.alternate_art,
            "alternate_qty": self.alternate_qty
            # do not serialize the password, its a security breach
        }