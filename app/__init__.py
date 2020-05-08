#Team Raduckal
#SoftDev pd1
#P04 -- Let the Data Speak
#2020-05-11

from flask import Flask , render_template,request, redirect, url_for, flash
import os, random
from utl import parser

app = Flask(__name__)
app.secret_key = os.urandom(32)

@app.route("/")
def home():
    return render_template('home.html', home='active')

@app.route("/country")
def country():
    data = parser.get_data_by_state()
    eth_data = parser.get_ethnicity_by_state()
    gender_data = parser.get_gender_by_state()
    print(gender_data);
    return render_template('country.html', data=data, eth_data=eth_data, gender_data=gender_data, country="active")

@app.route("/info")
def info():
    return render_template('info.html', info='active')

@app.route('/search')
def search():
    if request.args:
        if 'query' in request.args:
            states = parser.get_states()
            query = request.args['query']
            for state in states:
                if query.casefold() == state.casefold():
                    return redirect(url_for('state', state=state))
            flash("Please enter a valid US State.")
    return render_template('search.html', state='active')

@app.route('/<state>')
def state(state):
    data = parser.get_data_by_county(state)
    return render_template('state.html', data = data, state='active', name=state)

if __name__ == "__main__":
    app.debug = True
    app.run()
