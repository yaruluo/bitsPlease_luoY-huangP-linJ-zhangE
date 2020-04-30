from flask import Flask , render_template,request, redirect, url_for, session, flash
from functools import wraps
import os, random
import parser

app = Flask(__name__)
app.secret_key = os.urandom(32)

@app.route("/")
def root():
    '''def root(): TBD'''
    return "HELLO WORLD"
