from flask import Flask, render_template, request, redirect, url_for
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1>I work</h1>'

@app.route('/total')
def get_total():
    pass

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))