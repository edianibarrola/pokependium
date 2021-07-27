from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Set(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    series = db.Column(db.String(120), unique=True, nullable=False)
    printedTotal = db.Column(db.Integer, unique=True, nullable=False)
    total = db.Column(db.Integer, unique=True, nullable=False)
    # legalities = db.Column(db.JSON(120), unique=True, nullable=False)
    ptcgoCode = db.Column(db.String(120), unique=True, nullable=False)
    releaseDate = db.Column(db.String(120), unique=True, nullable=False)
    updatedAt = db.Column(db.String(120), unique=True, nullable=False)
    

    def __repr__(self):
        return '<Set %r>' % self.username

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