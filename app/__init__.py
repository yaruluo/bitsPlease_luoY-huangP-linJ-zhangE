#Team Raduckal
#SoftDev pd1
#P04 -- Let the Data Speak
#2020-05-11

from flask import Flask , render_template,request, redirect, url_for, session, flash
import os, random
from utl import parser

app = Flask(__name__)
app.secret_key = os.urandom(32)

@app.route("/")
def root():
    '''def root(): TBD'''
    return "HELLO WORLD"

@app.route("/home")
def home():
    data = parser.get_data_by_state()
    dataset = parser.get_ethnicity_by_state()
    gender_data = parser.get_gender_by_state()
    print(gender_data);
    return render_template('home.html', data=data, dataset=dataset, gender_data=gender_data)

@app.route("/info")
def info():
    return "INFO"

@app.route('/<state>')
def state(state):
    data = parser.get_data_by_county(state)
    return render_template('state.html', data = data)

if __name__ == "__main__":
    app.debug = True
    app.run()
