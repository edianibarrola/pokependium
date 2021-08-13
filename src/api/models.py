from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
            # do not serialize the password, its a security breach
        }

class CardSet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=True)
    series = db.Column(db.String(120), unique=False, nullable=True)
    printedTotal = db.Column(db.Integer, unique=False, nullable=True)
    total = db.Column(db.Integer, unique=False, nullable=True)
    # legalities = db.Column(db.JSON(120), unique=False, nullable=True)
    ptcgoCode = db.Column(db.String(120), unique=False, nullable=True)
    releaseDate = db.Column(db.String(120), unique=False, nullable=True)
    updatedAt = db.Column(db.String(120), unique=False, nullable=True)
    

    def __repr__(self):
        return '<CardSet %r>' % self.username

    def serialize(self):
        return {
            # do not serialize the password, its a security breach
            "id": self.id,
            "name": self.name,
            "series": self.series,
            "printedTotal": self.printedTotal,
            "total": self.total,
            "ptcgoCode": self.ptcgoCode,
            "releaseDate": self.releaseDate,
            "updatedAt": self.updatedAt
        }

    