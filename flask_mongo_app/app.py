from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from bson.json_util import dumps
from bson.objectid import ObjectId
import json

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)


# MongoDB Atlas connection setup
client = MongoClient('mongodb+srv://veeratimonika:XyISa6Ico6oe4zDJ@cluster0.ae9kfbr.mongodb.net/Cluster0?retryWrites=true&w=majority')

db = client.Cluster0  # Using the 'CarpoolDB' database
users=db.users
appointments=db.appointments

@app.route('/')
def welcome():
    return "Welcome to the Veerati Application!"

@app.route('/test-connection')
def test_connection():
    try:
        # Attempt to connect to MongoDB Atlas
        client = MongoClient('mongodb+srv://veeratimonika:XyISa6Ico6oe4zDJ@cluster0.ae9kfbr.mongodb.net/Cluster0?retryWrites=true&w=majority')
        # The 'admin' database is used by default to check server status.
        client.admin.command('ismaster')
        return "MongoDB Atlas connection: Successful"
    except ConnectionFailure:
        return "MongoDB Atlas connection: Failed"

@app.route('/register', methods=['POST'])
def register_user():
    user_data = request.json
    if not user_data.get('username') or not user_data.get('email') or not user_data.get('password'):
        return jsonify({"error": "Username, email, and password are required"}), 400

    # Hash the password before storing it
    hashed_password = bcrypt.generate_password_hash(user_data['password']).decode('utf-8')
    user_data['password'] = hashed_password

    # Insert user data into the MongoDB collection
    users.insert_one(user_data)
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login_user():
    user_data = request.json
    if not user_data.get('username') or not user_data.get('password'):
        return jsonify({"error": "Email and password are required"}), 400

    # Find the user by email
    user = users.find_one({'username': user_data['username']})

    if user and bcrypt.check_password_hash(user['password'], user_data['password']):
        # Successfully authenticated
        # Convert MongoDB's _id to string to make it JSON serializable
        user['_id'] = str(user['_id'])
        return jsonify({"message": "Login successful", "user": json.loads(dumps(user))}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

@app.route('/make-appointment', methods=['POST'])
def make_appointment():
    appointment_data = request.json
    # Data validation
    required_fields = ['username', 'email', 'appointmentDate', 'reason']
    if not all(field in appointment_data for field in required_fields):
        return jsonify({"error": "Missing data for appointment"}), 400

    # Insert the appointment data into the MongoDB collection
    try:
        appointments.insert_one(appointment_data)
        return jsonify({"message": "Appointment scheduled successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/list-appointments', methods=['GET'])
def list_appointments():
    try:
        all_appointments = appointments.find()
        return jsonify([json.loads(dumps(appointment)) for appointment in all_appointments]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

from flask import request
from bson.regex import Regex

@app.route('/search-appointments', methods=['GET'])
def search_appointments():
    search_term = request.args.get('query', '')
    regex = Regex(f'.*{search_term}.*', 'i')  # 'i' for case-insensitive

    # Search in all fields
    query = {
        '$or': [
            {'username': regex},
            {'email': regex},
            {'appointmentDate': regex},
            {'reason': regex}
        ]
    }

    try:
        matching_appointments = appointments.find(query)
        return jsonify([json.loads(dumps(appointment)) for appointment in matching_appointments]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
