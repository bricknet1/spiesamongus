import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function Settings() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [passwordInput, setPasswordInput] = useState("");
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState("");
  const history = useHistory();

  const isLoggedIn = !!token;

  const allActors = [
    "Victoria",
    "James",
    "Annie",
    "Daria",
    "Jeff",
    "Alex",
    "Prescott",
  ];

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
          // Initialize actorRoles if it doesn't exist
          if (!data.actorRoles || typeof data.actorRoles !== "object") {
            data.actorRoles = {};
          }
          // Maintain backward compatibility: derive activeActors from actorRoles
          if (!Array.isArray(data.activeActors)) {
            data.activeActors = Object.keys(data.actorRoles).filter(
              (actor) =>
                data.actorRoles[actor] && data.actorRoles[actor] !== "Off"
            );
          }
          setSettings(data);
        });
    }
  }, [isLoggedIn]);

  const setActorRole = (actor, role) => {
    if (!settings) return;

    const actorRoles = settings.actorRoles || {};
    const newActorRoles = { ...actorRoles };

    if (role === "Off" || role === null || role === undefined) {
      // Remove actor from roles if set to Off
      delete newActorRoles[actor];
    } else {
      // Set actor role
      newActorRoles[actor] = role;
    }

    // Update activeActors for backward compatibility
    const newActiveActors = Object.keys(newActorRoles).filter(
      (a) => newActorRoles[a] && newActorRoles[a] !== "Off"
    );

    setSettings({
      ...settings,
      actorRoles: newActorRoles,
      activeActors: newActiveActors,
    });
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
            // Initialize actorRoles if it doesn't exist
            if (
              !updatedData.actorRoles ||
              typeof updatedData.actorRoles !== "object"
            ) {
              updatedData.actorRoles = {};
            }
            // Maintain backward compatibility
            if (!Array.isArray(updatedData.activeActors)) {
              updatedData.activeActors = Object.keys(
                updatedData.actorRoles
              ).filter(
                (actor) =>
                  updatedData.actorRoles[actor] &&
                  updatedData.actorRoles[actor] !== "Off"
              );
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
        <h2>Actor Roles:</h2>
        {allActors.map((actor) => {
          const currentRole = settings.actorRoles?.[actor] || "Off";
          return (
            <div
              key={actor}
              style={{
                display: "block",
                fontSize: "8vw",
                padding: "1vw",
                marginBottom: "2vw",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "0.5vw" }}>
                {actor}:
              </div>
              <label
                style={{
                  display: "inline-block",
                  fontSize: "8vw",
                  padding: "0.5vw",
                  marginRight: "2vw",
                }}
              >
                <input
                  type="radio"
                  name={`actor-${actor}`}
                  value="Marble"
                  checked={currentRole === "Marble"}
                  onChange={() => setActorRole(actor, "Marble")}
                  style={{ width: "8vw", height: "8vw", marginRight: "1vw" }}
                />
                Marble
              </label>
              <label
                style={{
                  display: "inline-block",
                  fontSize: "8vw",
                  padding: "0.5vw",
                  marginRight: "2vw",
                }}
              >
                <input
                  type="radio"
                  name={`actor-${actor}`}
                  value="Handler"
                  checked={currentRole === "Handler"}
                  onChange={() => setActorRole(actor, "Handler")}
                  style={{ width: "8vw", height: "8vw", marginRight: "1vw" }}
                />
                Handler
              </label>
              <label
                style={{
                  display: "inline-block",
                  fontSize: "8vw",
                  padding: "0.5vw",
                }}
              >
                <input
                  type="radio"
                  name={`actor-${actor}`}
                  value="Off"
                  checked={currentRole === "Off" || !currentRole}
                  onChange={() => setActorRole(actor, "Off")}
                  style={{ width: "8vw", height: "8vw", marginRight: "1vw" }}
                />
                Off
              </label>
            </div>
          );
        })}
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
      <br />
      <button
        className="settingsPageButton"
        onClick={() => history.push("/playerprogress")}
      >
        View Player Progress
      </button>
      <br />
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
