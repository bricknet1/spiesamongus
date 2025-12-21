import { useEffect, useState } from "react";

function Settings() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [passwordInput, setPasswordInput] = useState("");
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState("");

  const isLoggedIn = !!token;

  const API_URL = process.env.REACT_APP_API_URL;

  const allActors = ["Victoria", "James", "Annie", "Daria", "Jeff", "Prescott"];

  const handleLogin = () => {
    fetch(`${API_URL}/api/login`, {
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
      fetch(`${API_URL}/api/settings`)
        .then((res) => res.json())
        .then((data) => {
          // Ensure activeActors is an array or default to empty
          if (!Array.isArray(data.activeActors)) {
            data.activeActors = [];
          }
          setSettings(data);
        });
    }
  }, [isLoggedIn]);

  const toggleActor = (actor) => {
    if (!settings) return;

    const activeActors = settings.activeActors || [];
    let newActiveActors;

    if (activeActors.includes(actor)) {
      // Remove actor if already active
      newActiveActors = activeActors.filter((a) => a !== actor);
    } else {
      // Add actor if not active
      newActiveActors = [...activeActors, actor];
    }

    setSettings({ ...settings, activeActors: newActiveActors });
  };

  const handleSave = () => {
    fetch(`${API_URL}/api/settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Save failed");
        if (res.ok) alert("Save successful");
        return res.json();
      })
      .then((data) => {
        // Refresh settings to get the updated timestamp
        fetch(`${API_URL}/api/settings`)
          .then((res) => res.json())
          .then((updatedData) => {
            if (!Array.isArray(updatedData.activeActors)) {
              updatedData.activeActors = [];
            }
            setSettings(updatedData);
          });
      })
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
          style={{ fontSize: "10vw", width: "90vw" }}
        />
        <button onClick={handleLogin} className="settingsPageButton">
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  if (!settings) return <p>Loading settings...</p>;

  return (
    <div
      style={{ display: "inline-block", fontSize: "5vw", paddingLeft: "10vw" }}
    >
      <title>SETTINGS | Spies Among Us</title>
      <h1>Admin Panel</h1>
      <div>
        <h2>Active Actors:</h2>
        {allActors.map((actor) => (
          <label
            key={actor}
            style={{ display: "block", fontSize: "10vw", padding: "1vw" }}
          >
            <input
              type="checkbox"
              style={{ display: "inline-block", width: "10vw", height: "10vw" }}
              checked={settings.activeActors.includes(actor)}
              onChange={() => toggleActor(actor)}
            />
            {actor}
          </label>
        ))}
      </div>
      <div>
        <h2>Wardrobe:</h2>
        <div>
          <label style={{ display: "block", fontSize: "10vw", padding: "1vw" }}>
            <input
              type="radio"
              name="wardrobe"
              value="Jeans"
              checked={settings.wardrobe === "Jeans"}
              onChange={() => setSettings({ ...settings, wardrobe: "Jeans" })}
              style={{ width: "10vw", height: "10vw" }}
            />
            Jeans
          </label>
          <label style={{ display: "block", fontSize: "10vw", padding: "1vw" }}>
            <input
              type="radio"
              name="wardrobe"
              value="Shorts"
              checked={settings.wardrobe === "Shorts"}
              onChange={() => setSettings({ ...settings, wardrobe: "Shorts" })}
              style={{ width: "10vw", height: "10vw" }}
            />
            Shorts
          </label>
        </div>
      </div>
      {settings.lastUpdated && (
        <div style={{ marginTop: "2vw", fontSize: "4vw", color: "#888" }}>
          <strong>Last Updated:</strong> {settings.lastUpdated}
        </div>
      )}
      <br />
      <button onClick={handleSave} className="settingsPageButton">
        Save Changes
      </button>
      <br />
      <button
        className="settingsPageButton"
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
