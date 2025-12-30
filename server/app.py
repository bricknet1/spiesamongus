from flask import Flask, request, jsonify
from flask_cors import CORS
from time import time
import sqlite3
import json
import os
from datetime import datetime
import pytz

from dotenv import load_dotenv
load_dotenv()

failed_attempts = {}
LOCKOUT_SECONDS = 30
MAX_ATTEMPTS = 5

debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
port = int(os.environ.get("PORT", 5000))

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://spiesamongus.onrender.com", "https://www.spiesamong.us", "https://app.spiesamong.us", "https://www.app.spiesamong.us", "https://nickjohnson.work", "https://www.nickjohnson.work"])

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
    c.execute('''
        CREATE TABLE IF NOT EXISTS player_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id TEXT UNIQUE NOT NULL,
            player1_name TEXT,
            player1_phone TEXT,
            player2_name TEXT,
            player2_phone TEXT,
            player3_name TEXT,
            player3_phone TEXT,
            player4_name TEXT,
            player4_phone TEXT,
            number_of_players TEXT,
            start_time TEXT,
            current_act TEXT,
            texts TEXT,
            end_path TEXT,
            team_image TEXT,
            marble_selfie TEXT,
            special_event TEXT,
            selfie_path TEXT,
            last_updated TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
    
    # Add timestamp in Pacific Time
    pacific = pytz.timezone('America/Los_Angeles')
    pacific_time = datetime.now(pacific)
    timestamp_str = pacific_time.strftime('%Y-%m-%d %I:%M:%S %p %Z')
    data['lastUpdated'] = timestamp_str
    
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

def generate_group_id(data):
    """Generate a unique group identifier based on player phones"""
    phones = []
    num_players = int(data.get('number_of_players', '1'))
    
    for i in range(1, num_players + 1):
        phone = data.get(f'player{i}_phone', '')
        if phone:
            phones.append(phone)
    
    # Sort phones to ensure consistent group_id regardless of order
    phones.sort()
    return '|'.join(phones) if phones else None

def get_pacific_timestamp():
    """Get current timestamp in Pacific Time"""
    pacific = pytz.timezone('America/Los_Angeles')
    pacific_time = datetime.now(pacific)
    return pacific_time.strftime('%Y-%m-%d %I:%M:%S %p %Z')

@app.route('/api/webhook/player-progress', methods=['POST'])
def webhook_player_progress():
    """Webhook endpoint to create a new player group (POST)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        if 'number_of_players' not in data:
            return jsonify({"error": "number_of_players is required"}), 400
        
        # Generate group_id from player phones
        group_id = generate_group_id(data)
        if not group_id:
            return jsonify({"error": "At least one player phone is required"}), 400
        
        # Check if group already exists
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute('SELECT id FROM player_progress WHERE group_id = ?', (group_id,))
        existing = c.fetchone()
        
        if existing:
            conn.close()
            return jsonify({"error": "Group already exists. Use PATCH to update."}), 400
        
        # Prepare data for insertion
        pacific = pytz.timezone('America/Los_Angeles')
        start_time = data.get('start_time')
        if not start_time:
            start_time = get_pacific_timestamp()
        
        # Convert texts array to JSON string
        texts = json.dumps(data.get('texts', [])) if isinstance(data.get('texts'), list) else json.dumps([])
        
        last_updated = get_pacific_timestamp()
        
        # Insert new group
        c.execute('''
            INSERT INTO player_progress (
                group_id, player1_name, player1_phone, player2_name, player2_phone,
                player3_name, player3_phone, player4_name, player4_phone,
                number_of_players, start_time, current_act, texts, end_path,
                team_image, marble_selfie, special_event, selfie_path, last_updated
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            group_id,
            data.get('player1_name', ''),
            data.get('player1_phone', ''),
            data.get('player2_name', ''),
            data.get('player2_phone', ''),
            data.get('player3_name', ''),
            data.get('player3_phone', ''),
            data.get('player4_name', ''),
            data.get('player4_phone', ''),
            data.get('number_of_players', ''),
            start_time,
            data.get('current_act', ''),
            texts,
            data.get('end_path', ''),
            data.get('team_image', ''),
            data.get('marble_selfie', ''),
            data.get('special_event', ''),
            data.get('selfie_path', ''),
            last_updated
        ))
        conn.commit()
        conn.close()
        
        return jsonify({"status": "success", "message": "Group created", "group_id": group_id}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Group already exists. Use PATCH to update."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/webhook/player-progress', methods=['PATCH'])
def update_player_progress():
    """Webhook endpoint to update an existing player group (PATCH)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        # Generate group_id from player phones
        group_id = generate_group_id(data)
        if not group_id:
            return jsonify({"error": "At least one player phone is required"}), 400
        
        # Check if group exists
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute('SELECT id FROM player_progress WHERE group_id = ?', (group_id,))
        existing = c.fetchone()
        
        if not existing:
            conn.close()
            return jsonify({"error": "Group not found. Use POST to create."}), 404
        
        # Build update query dynamically based on provided fields
        update_fields = []
        update_values = []
        
        # List of fields that can be updated
        updatable_fields = [
            'player1_name', 'player1_phone', 'player2_name', 'player2_phone',
            'player3_name', 'player3_phone', 'player4_name', 'player4_phone',
            'number_of_players', 'start_time', 'current_act', 'texts',
            'end_path', 'team_image', 'marble_selfie', 'special_event', 'selfie_path'
        ]
        
        for field in updatable_fields:
            if field in data:
                if field == 'texts' and isinstance(data[field], list):
                    update_fields.append(f"{field} = ?")
                    update_values.append(json.dumps(data[field]))
                else:
                    update_fields.append(f"{field} = ?")
                    update_values.append(data[field])
        
        # Always update last_updated
        update_fields.append("last_updated = ?")
        update_values.append(get_pacific_timestamp())
        
        # Add group_id for WHERE clause
        update_values.append(group_id)
        
        # Execute update
        update_query = f'''
            UPDATE player_progress
            SET {', '.join(update_fields)}
            WHERE group_id = ?
        '''
        
        c.execute(update_query, update_values)
        conn.commit()
        conn.close()
        
        return jsonify({"status": "success", "message": "Group updated", "group_id": group_id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/webhook/player-progress', methods=['DELETE'])
def delete_player_progress():
    """Webhook endpoint to delete a player group (DELETE)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        # Generate group_id from player phones
        group_id = generate_group_id(data)
        if not group_id:
            return jsonify({"error": "At least one player phone is required"}), 400
        
        # Check if group exists and delete
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute('SELECT id FROM player_progress WHERE group_id = ?', (group_id,))
        existing = c.fetchone()
        
        if not existing:
            conn.close()
            return jsonify({"error": "Group not found"}), 404
        
        # Delete the group
        c.execute('DELETE FROM player_progress WHERE group_id = ?', (group_id,))
        conn.commit()
        conn.close()
        
        return jsonify({"status": "success", "message": "Group deleted", "group_id": group_id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/player-progress', methods=['GET'])
def get_player_progress():
    """Get all player progress data (admin only)"""
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.replace('Bearer ', '')
    if token != AUTH_TOKEN:
        return jsonify({"error": "Unauthorized"}), 401
    
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute('''
            SELECT id, group_id, player1_name, player1_phone, player2_name, player2_phone,
                   player3_name, player3_phone, player4_name, player4_phone,
                   number_of_players, start_time, current_act, texts, end_path,
                   team_image, marble_selfie, special_event, selfie_path,
                   last_updated, created_at
            FROM player_progress
            ORDER BY last_updated DESC, created_at DESC
        ''')
        rows = c.fetchall()
        conn.close()
        
        progress_list = []
        for row in rows:
            # Parse texts JSON string back to array
            texts_data = []
            if row[13]:  # texts column
                try:
                    texts_data = json.loads(row[13])
                except:
                    texts_data = []
            
            progress_list.append({
                "id": row[0],
                "group_id": row[1],
                "player1_name": row[2],
                "player1_phone": row[3],
                "player2_name": row[4],
                "player2_phone": row[5],
                "player3_name": row[6],
                "player3_phone": row[7],
                "player4_name": row[8],
                "player4_phone": row[9],
                "number_of_players": row[10],
                "start_time": row[11],
                "current_act": row[12],
                "texts": texts_data,
                "end_path": row[14],
                "team_image": row[15],
                "marble_selfie": row[16],
                "special_event": row[17],
                "selfie_path": row[18],
                "last_updated": row[19],
                "created_at": row[20]
            })
        
        return jsonify({"status": "success", "data": progress_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=port, debug=debug)