# Spies Among Us

A reproduction of [Prescott Gadd](https://spiesamong.us)'s **spiesamong.us** experience — a mobile-first React app backed by a small Flask API (SQLite for settings and player progress).

## Prerequisites

- **Node.js** (for the client; includes `npm`)
- **Python 3** with `pip` (for the API server)

## Setup

1. Clone this repository.

2. **Backend — Python**

   ```bash
   cd server
   python -m venv .venv
   source .venv/bin/activate   # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

   Create a `server/.env` file (not committed) with at least:

   ```env
   ADMIN_PASSWORD=your-admin-password
   AUTH_TOKEN=your-secret-api-token
   ```

   Optional:

   - `ADMIN_PASSWORD_SEATTLE` / `AUTH_TOKEN_SEATTLE` — separate Seattle admin credentials (defaults to the main values if unset)
   - `PORT` — API port (default `5000`)
   - `FLASK_DEBUG=true` — verbose logging

3. **Frontend — from the repo root, then `client`**

   ```bash
   cd client
   npm install
   ```

## Run (development)

From the `client` directory:

```bash
npm start
```

This runs the React dev server and the Flask app together (`react-scripts start` on port 3000 and `server/app.py` on the configured API port). The API must start successfully (valid `.env`) or the command will fail when the server exits.

Other useful scripts (from `client`):

- `npm run client` — React only
- `npm run server` — Flask only (expects to be launched from `client` via the script path)
- `npm run build` — production build of the client

## Notes

- The UI is intended for **mobile**; desktop layouts are not the primary target.
- The server creates `settings.db` in `server/` for local persistence (see `server/.gitignore`).
