from flask import Flask, request, jsonify
from flask_cors import CORS
from time import time
import sqlite3
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
CORS(app, origins=["http://localhost:3000", "https://spiesamongus.onrender.com", "https://www.spiesamong.us"])

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")
AUTH_TOKEN = os.getenv("AUTH_TOKEN", "secure-token-123")  # Simple token

DB_PATH = 'settings.db'

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

def load_settings():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT key, value FROM settings")
    rows = c.fetchall()
    conn.close()
    return {key: json.loads(value) for key, value in rows}

def save_settings(data):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    for key, value in data.items():
        c.execute('''
            INSERT INTO settings (key, value)
            VALUES (?, ?)
            ON CONFLICT(key) DO UPDATE SET value=excluded.value
        ''', (key, json.dumps(value)))
    conn.commit()
    conn.close()

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
    app.run(host="0.0.0.0", port=port, debug=debug)