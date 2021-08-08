from enum import unique
from flask import Flask, render_template, session,request, flash, redirect, request, jsonify 

from tempfile import mkdtemp
from flask.wrappers import Response
from werkzeug.security import generate_password_hash as gen_hash
from werkzeug.security import check_password_hash as check_hash
import sqlite3
from flask_sqlalchemy import *
from datetime import datetime, timedelta, date
from flask_cors import CORS
import  json
app = Flask(__name__)
app.config['SECRET_KEY'] = 'super secret'
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
cors = CORS(app)
db = SQLAlchemy(app)



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(200), unique=False, nullable=False)
    last_name = db.Column(db.String(200), unique=False, nullable=False)
    isdoctor = db.Column(db.Boolean,unique=False, nullable=False)
    symptoms = db.relationship("Symptom_log", backref="user")
    doc_id = db.Column(db.Integer, db.ForeignKey('doctor.id'))
    def __repr__(self):
        return '<User %r>' % self.username
class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    patients = db.relationship("User", backref="doctor")
    rating = db.Column(db.Float(), unique=False, nullable=False)
    first_name = db.Column(db.String(200), unique=False, nullable=False)
    last_name = db.Column(db.String(200), unique=False, nullable=False)

class Symptom_log(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usr_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    username = db.Column(db.String(200), unique=False, nullable=False)
    sym_name = db.Column(db.String(200), unique=False, nullable=False)
    severity = db.Column(db.Integer, unique=False, nullable=False)
    date_of_rec = db.Column(db.DateTime, unique=False, nullable=False)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    doc_username = db.Column(db.String(200), unique=False, nullable=False)
    pt_username = db.Column(db.String(200), unique=False, nullable=False)
    note = db.Column(db.String(500), unique=False, nullable=False)
    date_of_rec = db.Column(db.DateTime, unique=False, nullable=False)
class Medication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    doc_username = db.Column(db.String(200), unique=False, nullable=False)
    pt_username = db.Column(db.String(200), unique=False, nullable=False)
    note = db.Column(db.String(500), unique=False, nullable=False)
    date_of_rec = db.Column(db.DateTime, unique=False, nullable=False)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), unique=True, nullable=False)
@app.route('/register', methods=['POST'])
def register():
    input_data = request.get_json()
    
    
    doctor_bool = bool(int(input_data['isdoctor']))
    new_user = User(username=input_data["username"], password=input_data["password"], email=input_data['email'], first_name=input_data['first_name'], last_name=input_data['last_name'], isdoctor=doctor_bool)
    db.session.add(new_user)
    db.session.commit()
    if doctor_bool:
        new_doc = Doctor(username=input_data['username'],email=input_data['email'],rating=1, first_name=input_data['first_name'],last_name=input_data['last_name'])
        db.session.add(new_doc)
        db.session.commit()
    resp = {"username" : input_data['username'], "isdoctor" : doctor_bool}
    return jsonify(resp)

@app.route('/login', methods=['POST'])
def login():
    input_data = request.get_json()
    result = User.query.filter_by(username=input_data['username']).first()
    if result:
        if result.password == input_data['password']:
            user_dict = {"username":result.username, "email":result.email, "first_name":result.first_name, "last_name":result.last_name, "isdoctor":result.isdoctor}
            user_info = json.dumps(user_dict)
            return Response(user_info, status=200, mimetype="application/json")
        else:
            abort(401)
    else:
        abort(400)

@app.route('/view_doc', methods=['POST'])
def view_doc():
    #to add patient check
    result = Doctor.query.all()
    doc_list = []
    for doc in result:
        doc_dict = {"username":doc.username, "email":doc.email, "first_name":doc.first_name, "last_name":doc.last_name, "rating":doc.rating}
        doc_list.append(doc_dict)
    doc_info = json.dumps(doc_list)
    return Response(doc_info, status=200, mimetype="application/json")

@app.route('/view_patients', methods=['POST'])
def view_patient():
    input_data = request.get_json()
    isdoctor = User.query.filter_by(username=input_data['username']).first().isdoctor
    if isdoctor:
        result = Doctor.query.filter_by(username=input_data["username"]).first().patients
        print(result)
        pt_list = []
        for pt in result:
            pt_dict = {"username":pt.username, "email":pt.email, "first_name":pt.first_name, "last_name":pt.last_name}
            pt_list.append(pt_dict)
        doc_info = json.dumps(pt_list)
        return Response(doc_info,status=200,mimetype="application/json")
    else:
        abort(403)
@app.route('/choose_doc', methods=["POST"])
def choose_doc():
    input_data = request.get_json()
    person = User.query.filter_by(username=input_data['username']).first()
    doctor = Doctor.query.filter_by(username=input_data['doc_username']).first()
    person.doctor = doctor
    db.session.commit()
    return Response("ok", status=200, mimetype="text/plain")

@app.route('/symptom_log', methods=['POST'])
def sym_log():
    input_data = request.get_json()
    symptoms = input_data["symptoms"]
    result = User.query.filter_by(username=input_data['username']).first()
    sym_name = list(symptoms.keys())
    severity = list(symptoms.values())
    for i in range(len(sym_name)):
        if severity[i] > 0:
            new_symptom = Symptom_log(username=input_data["username"], date_of_rec=date.today(), sym_name=sym_name[i], severity=severity[i])
            db.session.add(new_symptom)
    db.session.commit()
    user_dict = {"username":result.username, "email":result.email, "first_name":result.first_name, "last_name":result.last_name, "isdoctor":result.isdoctor}
    symptoms = Symptom_log.query.filter_by(username=input_data['username']).all()
    symptom_list=[]
    for symptom in symptoms:
        date_of_rec_str = symptom.date_of_rec.strftime("%m/%d/%Y")
        sympt_dict = {symptom.sym_name:symptom.severity}
        symptom_list.append(sympt_dict)
    user_dict['symptoms'] = symptom_list
    user_info = json.dumps(user_dict)
    return Response(user_info,status=200,mimetype="application/json")
@app.route('/view_symptoms', methods=['POST'])
def view_sym():
    input_data = request.get_json()
    isdoctor = User.query.filter_by(username=input_data['username']).first().isdoctor
    if isdoctor or input_data['username'] == input_data['username_query']:
        symptoms = Symptom_log.query.filter_by(username=input_data['username_query']).all()
        symptom_list=[]
        for symptom in symptoms:
            date_of_rec_str = symptom.date_of_rec.strftime("%m/%d/%Y")
            sympt_dict = {symptom.sym_name:symptom.severity}
            symptom_list.append(sympt_dict)
        sym_info = json.dumps(symptom_list)
        return Response(sym_info,status=200,mimetype="application/json")
    else:
        abort(403)
@app.route('/add_notes', methods=['POST'])
def add_notes():
    input_data = request.get_json()
    isdoctor = User.query.filter_by(username=input_data['username']).first().isdoctor
    if isdoctor:
        new_note = Note(doc_username=input_data['username'],pt_username=input_data['username_patient'], note=input_data['note'], date_of_rec=date.today())
        db.session.add(new_note)
        db.session.commit()
        return Response("ok",status=200)
    else:
        abort(403)

@app.route('/view_notes',methods=['POST'])
def view_notes():
    input_data = request.get_json()
    result = Note.query.filter_by(pt_username=input_data['username']).all()
    note_list = []
    for note in result:
        note_list.append([note.note, note.date_of_rec.strftime("%m/%d/%Y")])
    note_dict = {"notes":note_list}
    note_info = json.dumps(note_dict)
    return Response(note_info,status=200,mimetype="application/json")

@app.route('/add_meds', methods=['POST'])
def add_meds():
    input_data = request.get_json()
    isdoctor = User.query.filter_by(username=input_data['username']).first().isdoctor
    if isdoctor:
        new_med = Medication(doc_username=input_data['username'],pt_username=input_data['username_patient'], note=input_data['note'], date_of_rec=date.today())
        db.session.add(new_med)
        db.session.commit()
        return Response("ok",status=200)
    else:
        abort(403)

@app.route('/view_meds',methods=['POST'])
def view_meds():
    input_data = request.get_json()
    result = Medication.query.filter_by(pt_username=input_data['username']).all()
    med_list = []
    for med in result:
        med_list.append(med.note)
    med_dict = {"meds":med_list}
    med_info = json.dumps(med_dict)
    return Response(med_info,status=200,mimetype="application/json")

@app.route('/rate', methods=['POST'])
def rate():
    input_data = request.get_json()
    found = Review.query.filter_by(username=input_data['username']).first()
    if found:
        abort(400)
    else:
        result = User.query.filter_by(username=input_data['username']).first().doctor
        result.rating = result.rating + input_data['rating']
        new_review = Review(username=input_data['username'])
        db.session.add(new_review)
        db.session.commit()
        return Response("ok", status=200)


if __name__ == "__main__":
    app.run()