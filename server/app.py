from flask import Flask, request, jsonify
from flask_cors import CORS
from time import time
import json
import os

from dotenv import load_dotenv
load_dotenv()

failed_attempts = {}
LOCKOUT_SECONDS = 30
MAX_ATTEMPTS = 5

debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
port = int(os.environ.get("PORT", 5000))

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://your-production-site.com"])

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")
AUTH_TOKEN = os.getenv("AUTH_TOKEN", "secure-token-123")  # Simple token

SETTINGS_FILE = 'settings.json'

def load_settings():
    if not os.path.exists(SETTINGS_FILE):
        return {}
    with open(SETTINGS_FILE, 'r') as f:
        return json.load(f)

def save_settings(data):
    with open(SETTINGS_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/api/login', methods=['POST'])
def login():
    ip = request.remote_addr
    now = time()

    # Clean old attempts
    failed_attempts[ip] = [t for t in failed_attempts.get(ip, []) if now - t < LOCKOUT_SECONDS]

    if len(failed_attempts[ip]) >= MAX_ATTEMPTS:
        return jsonify({"error": "Too many attempts. Try again later."}), 429

    data = request.get_json()
    if data.get('password') == ADMIN_PASSWORD:
        return jsonify({"token": AUTH_TOKEN})

    failed_attempts[ip].append(now)
    return jsonify({"error": "Invalid password"}), 401

@app.route('/api/settings', methods=['GET'])
def get_settings():
    return jsonify(load_settings())

@app.route('/api/settings', methods=['POST'])
def update_settings():
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.replace('Bearer ', '')
    if token != AUTH_TOKEN:
        return jsonify({"error": "Unauthorized"}), 401
    data = request.get_json()
    save_settings(data)
    return jsonify({"status": "success", "data": data})

if __name__ == '__main__':
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=debug)

