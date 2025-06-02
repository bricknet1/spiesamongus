import { useEffect, useState } from "react";

function Settings() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [passwordInput, setPasswordInput] = useState("");
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState("");

  const isLoggedIn = !!token;

  const handleLogin = () => {
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: passwordInput }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Login failed");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
        setError("");
      })
      .catch(() => {
        setError("Incorrect password");
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetch("http://localhost:5000/api/settings")
        .then((res) => res.json())
        .then((data) => setSettings(data));
    }
  }, [isLoggedIn]);

  const handleSave = () => {
    fetch("http://localhost:5000/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Save failed");
        return res.json();
      })
      .then(console.log)
      .catch((err) => alert("Failed to save: " + err.message));
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  if (!settings) return <p>Loading settings...</p>;

  return (
    <div>
      <h2>Admin Panel</h2>
      <label>
        Homepage Message:
        <input
          value={settings.homepageMessage}
          onChange={(e) =>
            setSettings({ ...settings, homepageMessage: e.target.value })
          }
        />
      </label>
      <label>
        Show Banner:
        <input
          type="checkbox"
          checked={settings.showBanner}
          onChange={(e) =>
            setSettings({ ...settings, showBanner: e.target.checked })
          }
        />
      </label>
      <button onClick={handleSave}>Save Changes</button>
      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.reload();
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Settings;
