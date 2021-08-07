from enum import unique
from flask import Flask, render_template, session,request, flash, redirect, request, jsonify 

from tempfile import mkdtemp
from flask.wrappers import Response
from werkzeug.security import generate_password_hash as gen_hash
from werkzeug.security import check_password_hash as check_hash
import sqlite3
from flask_sqlalchemy import *
from datetime import datetime, timedelta

import  json
app = Flask(__name__)
app.config['SECRET_KEY'] = 'super secret'
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(200), unique=False, nullable=False)
    last_name = db.Column(db.String(200), unique=False, nullable=False)
    isdoctor = db.Column(db.Boolean,unique=False, nullable=False)
    dob = db.Column(db.DateTime, unique=False, nullable=False)
    def __repr__(self):
        return '<User %r>' % self.username
class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    patients = db.relationship("User", backref="doctor")
    rating = db.Column(db.Float(), unique=False, nullable=False)
    usr_id = db.Column(db.Integer, db.ForeignKey('user.id'))
@app.route('/register', methods=['POST'])
def register():
    input_data = request.get_json()
    dob_date =  datetime.strptime(input_data['dob'], '%d/%m/%Y')
    print(dob_date)
    doctor_bool = bool(int(input_data['isdoctor']))
    new_user = User(username=input_data["username"], password=input_data["password"], email=input_data['email'], first_name=input_data['first_name'], last_name=input_data['last_name'], isdoctor=doctor_bool, dob=dob_date)
    db.session.add(new_user)
    db.session.commit()
    if doctor_bool:
        new_doc = Doctor(username=input_data['username'],email=input_data['email'],rating=1,usr_id=new_user.id)
        db.session.add(new_doc)
        db.session.commit()
    resp = {"usr_id" : new_user.id, "isdoctor" : doctor_bool}
    return jsonify(resp)
@app.route('/view_doc')
def view_doc():
    result = Doctor.query.all()
    print(result)
    return Response("ok", status=200, mimetype="text/plain")
if __name__ == "__main__":
    app.run()