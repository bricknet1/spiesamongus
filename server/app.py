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
CORS(app, origins=["http://localhost:3000", "https://spiesamongus.onrender.com", "https://www.spiesamong.us", "https://app.spiesamong.us", "https://www.app.spiesamong.us", "https://nickjohnson.work", "https://www.nickjohnson.work", "https://seattle.spiesamong.us"])

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
AUTH_TOKEN = os.getenv("AUTH_TOKEN")

if not ADMIN_PASSWORD:
    raise ValueError("ADMIN_PASSWORD environment variable must be set")
if not AUTH_TOKEN:
    raise ValueError("AUTH_TOKEN environment variable must be set")

DB_PATH = 'settings.db'

def check_auth():
    """Check authentication from either Authorization header or token query parameter"""
    # Check Authorization header first
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.replace('Bearer ', '').strip()
    
    # If no token in header, check query parameter
    if not token:
        token = request.args.get('token', '').strip()
    
    # Debug logging
    if debug:
        print(f"DEBUG: Auth check - token received: '{token}', AUTH_TOKEN: '{AUTH_TOKEN}', match: {token == AUTH_TOKEN}")
        print(f"DEBUG: Query params: {dict(request.args)}")
        print(f"DEBUG: Auth header: '{auth_header}'")
    
    # Return True only if token matches and is not empty
    return bool(token) and token == AUTH_TOKEN

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
            selfie TEXT,
            marbleselfie TEXT,
            special_event TEXT,
            selfie_path TEXT,
            nostairs INTEGER DEFAULT 0,
            last_updated TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    # Add nostairs column if it doesn't exist (for existing databases)
    try:
        c.execute('ALTER TABLE player_progress ADD COLUMN nostairs INTEGER DEFAULT 0')
    except sqlite3.OperationalError:
        # Column already exists, ignore
        pass
    # Add subdomain column if it doesn't exist (for existing databases)
    try:
        c.execute('ALTER TABLE player_progress ADD COLUMN subdomain TEXT')
    except sqlite3.OperationalError:
        # Column already exists, ignore
        pass
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
    # Allow access without auth for backward compatibility, but check auth if token is provided
    # This allows browser access with ?token=xxx while maintaining existing functionality
    auth_header = request.headers.get('Authorization', '')
    header_token = auth_header.replace('Bearer ', '')
    query_token = request.args.get('token', '')
    
    # If a token is provided (either in header or query), validate it
    token = header_token or query_token
    if token and token != AUTH_TOKEN:
        return jsonify({"error": "Unauthorized"}), 401
    
    return jsonify(load_settings())

@app.route('/api/settings', methods=['POST'])
def update_settings():
    if not check_auth():
        return jsonify({"error": "Unauthorized"}), 401
    data = request.get_json()
    save_settings(data)
    return jsonify({"status": "success", "data": data})

def generate_group_id(data):
    """Generate a unique group identifier based on player 1's phone number"""
    # Try player1_phone, phone, and player1 formats (for form data compatibility)
    phone = data.get('player1_phone', '') or data.get('phone', '') or data.get('player1', '')
    return phone if phone else None

def get_pacific_timestamp():
    """Get current timestamp in Pacific Time"""
    pacific = pytz.timezone('America/Los_Angeles')
    pacific_time = datetime.now(pacific)
    return pacific_time.strftime('%Y-%m-%d %I:%M:%S %p %Z')

def parse_form_data():
    """Parse form URL-encoded data into the same structure as JSON"""
    form = request.form
    
    # Check if there's a JSON string in a 'data' field (common pattern)
    if 'data' in form:
        try:
            return json.loads(form['data'])
        except (json.JSONDecodeError, ValueError):
            pass
    
    # Check for bracket notation arrays (e.g., items[0][key]=value)
    # Look for patterns like items[0][...], items[1][...], etc.
    items_dict = {}
    for key in form.keys():
        if '[' in key and ']' in key:
            # Parse bracket notation: items[0][player1] -> items, 0, player1
            parts = key.split('[')
            if len(parts) >= 3:
                base_key = parts[0]  # e.g., 'items'
                index_str = parts[1].rstrip(']')  # e.g., '0'
                field_key = parts[2].rstrip(']')  # e.g., 'player1'
                
                try:
                    index = int(index_str)
                    if base_key not in items_dict:
                        items_dict[base_key] = {}
                    if index not in items_dict[base_key]:
                        items_dict[base_key][index] = {}
                    items_dict[base_key][index][field_key] = form[key]
                except (ValueError, IndexError):
                    pass
    
    # If we found bracket notation arrays, convert to list format
    if items_dict:
        result = []
        for base_key, indices in items_dict.items():
            for index in sorted(indices.keys()):
                result.append(indices[index])
        return result if result else None
    
    # Otherwise, convert flat form fields to a dict
    if form:
        return dict(form)
    
    return None

@app.route('/api/webhook/player-progress', methods=['POST'])
def webhook_player_progress():
    """Webhook endpoint to create a new player group (POST)"""
    if not check_auth():
        return jsonify({"error": "Unauthorized"}), 401
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
        created_at = get_pacific_timestamp()
        
        # Get nostairs boolean (SQLite will store as integer internally)
        nostairs = bool(data.get('nostairs', False))
        
        # Insert new group
        c.execute('''
            INSERT INTO player_progress (
                group_id, player1_name, player1_phone, player2_name, player2_phone,
                player3_name, player3_phone, player4_name, player4_phone,
                number_of_players, start_time, current_act, texts, end_path,
                selfie, marbleselfie, special_event, selfie_path, nostairs, subdomain, last_updated, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            data.get('selfie', ''),
            data.get('marbleselfie', ''),
            data.get('special_event', ''),
            data.get('selfie_path', ''),
            nostairs,
            data.get('subdomain', ''),
            last_updated,
            created_at
        ))
        conn.commit()
        conn.close()
        
        return jsonify({"status": "success", "message": "Group created", "group_id": group_id}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Group already exists. Use PATCH to update."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/webhook/update-player-progress', methods=['POST'])
def update_player_progress():
    """Webhook endpoint to update an existing player group (POST)"""
    try:
        # Try JSON first (for backward compatibility)
        # Use silent=True to avoid 415 error when Content-Type is not application/json
        data = request.get_json(silent=True)
        
        # If no JSON, try form URL-encoded data
        if data is None:
            data = parse_form_data()
        
        # Validate required fields
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        # Handle array format
        if isinstance(data, list):
            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            updated_groups = []
            
            for item in data:
                if not isinstance(item, dict):
                    continue
                
                # Handle format: [{"phone": "+1234567890", "selfie": "https://..."}]
                player1_phone = item.get('phone') or item.get('player1')
                selfie_url = item.get('selfie')
                
                if player1_phone and selfie_url:
                    # Find group by player1_phone
                    c.execute('SELECT group_id FROM player_progress WHERE player1_phone = ?', (player1_phone,))
                    group = c.fetchone()
                    
                    if group:
                        group_id = group[0]
                        # Update selfie_path for this group
                        c.execute('''
                            UPDATE player_progress
                            SET selfie_path = ?, last_updated = ?
                            WHERE group_id = ?
                        ''', (selfie_url, get_pacific_timestamp(), group_id))
                        updated_groups.append(group_id)
                    continue
                
                # Handle format: [{"act": "8", "phone": "+1234567890", "text": "message"}]
                phone = item.get('phone')
                act = item.get('act')
                text = item.get('text')
                
                if phone:
                    # Find group by matching phone against any player phone field
                    c.execute('''
                        SELECT group_id, texts FROM player_progress
                        WHERE player1_phone = ? OR player2_phone = ? OR player3_phone = ? OR player4_phone = ?
                    ''', (phone, phone, phone, phone))
                    group = c.fetchone()
                    
                    if group:
                        group_id = group[0]
                        existing_texts_json = group[1]
                        
                        # Parse existing texts array
                        existing_texts = []
                        if existing_texts_json:
                            try:
                                existing_texts = json.loads(existing_texts_json)
                            except:
                                existing_texts = []
                        
                        # Append new text if provided
                        if text:
                            existing_texts.append(text)
                        
                        # Build update query
                        update_fields = []
                        update_values = []
                        
                        if act:
                            update_fields.append("current_act = ?")
                            update_values.append(act)
                        
                        if text:
                            update_fields.append("texts = ?")
                            update_values.append(json.dumps(existing_texts))
                        
                        # Always update last_updated
                        update_fields.append("last_updated = ?")
                        update_values.append(get_pacific_timestamp())
                        
                        # Add group_id for WHERE clause
                        update_values.append(group_id)
                        
                        # Execute update
                        if update_fields:
                            update_query = f'''
                                UPDATE player_progress
                                SET {', '.join(update_fields)}
                                WHERE group_id = ?
                            '''
                            c.execute(update_query, update_values)
                            updated_groups.append(group_id)
            
            conn.commit()
            conn.close()
            
            if updated_groups:
                return jsonify({
                    "status": "success",
                    "message": f"Updated {len(updated_groups)} group(s)",
                    "group_ids": updated_groups
                }), 200
            else:
                return jsonify({"error": "No groups found or no valid updates"}), 404
        
        # Handle object format (existing behavior for backward compatibility)
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
            'end_path', 'selfie', 'marbleselfie', 'special_event', 'selfie_path', 'nostairs', 'subdomain'
        ]
        
        # Map short form field names to full field names (for form data compatibility)
        field_mapping = {}
        # Map 'phone' to 'player1_phone' (preferred format)
        if 'phone' in data and 'player1_phone' not in data:
            field_mapping['player1_phone'] = data['phone']
        for i in range(1, 5):
            if f'player{i}' in data and f'player{i}_phone' not in data:
                field_mapping[f'player{i}_phone'] = data[f'player{i}']
        
        # Map 'act' to 'current_act' (common in form data)
        if 'act' in data and 'current_act' not in data:
            field_mapping['current_act'] = data['act']
        
        # Handle 'text' field specially - append to existing texts array (like array format does)
        # Only do this if 'texts' is not already provided (texts takes precedence)
        if 'text' in data and 'texts' not in data:
            # Get existing texts from database
            c.execute('SELECT texts FROM player_progress WHERE group_id = ?', (group_id,))
            existing_texts_row = c.fetchone()
            existing_texts_json = existing_texts_row[0] if existing_texts_row else None
            
            # Parse existing texts array
            existing_texts = []
            if existing_texts_json:
                try:
                    existing_texts = json.loads(existing_texts_json)
                except:
                    existing_texts = []
            
            # Append new text
            new_text = data['text']
            if new_text:
                existing_texts.append(new_text)
            
            # Add to update fields
            update_fields.append("texts = ?")
            update_values.append(json.dumps(existing_texts))
        
        # Merge mapped fields into data (after handling text)
        data = {**data, **field_mapping}
        
        for field in updatable_fields:
            if field in data:
                if field == 'texts':
                    # Handle texts field - could be list, JSON string, or other
                    texts_value = data[field]
                    if isinstance(texts_value, list):
                        update_fields.append(f"{field} = ?")
                        update_values.append(json.dumps(texts_value))
                    elif isinstance(texts_value, str):
                        # Try to parse as JSON string (common in form data)
                        try:
                            parsed_texts = json.loads(texts_value)
                            if isinstance(parsed_texts, list):
                                update_fields.append(f"{field} = ?")
                                update_values.append(json.dumps(parsed_texts))
                            else:
                                update_fields.append(f"{field} = ?")
                                update_values.append(texts_value)
                        except (json.JSONDecodeError, ValueError):
                            # Not valid JSON, treat as plain string
                            update_fields.append(f"{field} = ?")
                            update_values.append(texts_value)
                    else:
                        update_fields.append(f"{field} = ?")
                        update_values.append(texts_value)
                elif field == 'nostairs':
                    # Store nostairs as boolean (SQLite will handle conversion)
                    update_fields.append(f"{field} = ?")
                    update_values.append(bool(data[field]))
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
    if not check_auth():
        return jsonify({"error": "Unauthorized"}), 401
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        
        # Try to generate group_id from player phones (for full group data)
        group_id = generate_group_id(data)
        
        if group_id:
            # Standard path: use generated group_id
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
        else:
            # Fallback: find group by single phone number (for cancel operations)
            # Check if we have a single phone field
            single_phone = None
            if 'phone' in data:
                # Format phone with +1 if it's 10 digits
                phone_str = str(data['phone'])
                phone_digits = ''.join(filter(str.isdigit, phone_str))
                if len(phone_digits) == 10:
                    single_phone = f"+1{phone_digits}"
                else:
                    single_phone = data['phone']
            elif 'player1_phone' in data:
                single_phone = data['player1_phone']
            
            if single_phone:
                # Find group where any player phone matches
                c.execute('''
                    SELECT group_id FROM player_progress
                    WHERE player1_phone = ? OR player2_phone = ? OR player3_phone = ? OR player4_phone = ?
                ''', (single_phone, single_phone, single_phone, single_phone))
                group = c.fetchone()
                
                if group:
                    found_group_id = group[0]
                    # Delete the group
                    c.execute('DELETE FROM player_progress WHERE group_id = ?', (found_group_id,))
                    conn.commit()
                    conn.close()
                    
                    return jsonify({"status": "success", "message": "Group deleted", "group_id": found_group_id}), 200
                else:
                    conn.close()
                    return jsonify({"error": "Group not found"}), 404
            else:
                conn.close()
                return jsonify({"error": "At least one player phone is required"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/player-progress', methods=['GET'])
def get_player_progress():
    """Get all player progress data (admin only)"""
    auth_result = check_auth()
    if not auth_result:
        return jsonify({
            "error": "Unauthorized",
            "message": "Authentication required. Provide token via Authorization header (Bearer <token>) or query parameter (?token=<token>)"
        }), 401
    
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute('''
            SELECT id, group_id, player1_name, player1_phone, player2_name, player2_phone,
                   player3_name, player3_phone, player4_name, player4_phone,
                   number_of_players, start_time, current_act, texts, end_path,
                   selfie, marbleselfie, special_event, selfie_path, nostairs, subdomain,
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
            
            # Convert nostairs from SQLite integer (0/1) to boolean
            nostairs_value = bool(row[19]) if row[19] is not None else False
            
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
                "selfie": row[15],
                "marbleselfie": row[16],
                "special_event": row[17],
                "selfie_path": row[18],
                "nostairs": nostairs_value,
                "subdomain": row[20],
                "last_updated": row[21],
                "created_at": row[22]
            })
        
        # Always return JSON
        return jsonify({"status": "success", "data": progress_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=port, debug=debug)