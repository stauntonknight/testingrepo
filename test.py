import csv
import json
import subprocess
from bottle import Bottle, run, post, request, response, get, route
from json import dumps

 
 
# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(file):
    # create a dictionary
    with open(file, encoding='utf-8') as csvf:
        return json.dumps(json.load(csvf))
file = 'combined.json'

app = Bottle()

@app.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@app.route('/data', method=['OPTIONS', 'GET'])
def process():
    response.content_type = 'application/json'
    return make_json(file)

app.run(host='localhost', port=8080, debug=True, reloader=True)

