import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSubdomain } from "./SubdomainProvider.js";
import AdminLogin from "./AdminLogin.js";

const API_URL = process.env.REACT_APP_API_URL;

function Settings() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [passwordInput, setPasswordInput] = useState("");
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState("");
  const history = useHistory();
  const subdomain = useSubdomain();

  const isLoggedIn = !!token;

  const allActorsApp = [
    "Victoria",
    "James",
    "Annie",
    "Daria",
    "Jeff",
    "Alex",
    "Prescott",
  ];

  const allActorsSeattle = [
    "SamplePrescott",
    "SampleJeff",
  ];

  // Get the appropriate actor list based on subdomain
  const allActors = subdomain === "seattle" ? allActorsSeattle : allActorsApp;

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
          // Determine which actorRoles key to use based on subdomain
          const actorRolesKey = subdomain === "seattle" ? "actorRolesSeattle" : "actorRolesApp";
          const activeActorsKey = subdomain === "seattle" ? "activeActorsSeattle" : "activeActorsApp";
          
          // Initialize subdomain-specific actorRoles if it doesn't exist
          if (!data[actorRolesKey] || typeof data[actorRolesKey] !== "object") {
            data[actorRolesKey] = {};
          }
          
          // Derive activeActors from actorRoles
          if (!Array.isArray(data[activeActorsKey])) {
            data[activeActorsKey] = Object.keys(data[actorRolesKey] || {}).filter(
              (actor) =>
                data[actorRolesKey][actor] && data[actorRolesKey][actor] !== "Off"
            );
          }
          
          // Initialize subdomain-specific wardrobe
          const wardrobeKey = subdomain === "seattle" ? "seattleWardrobe" : "appWardrobe";
          if (!data[wardrobeKey]) {
            data[wardrobeKey] = "Jeans"; // Default to Jeans if not set
          }
          
          setSettings(data);
        });
    }
  }, [isLoggedIn, subdomain]);

  const setActorRole = (actor, role) => {
    if (!settings) return;

    // Determine which actorRoles key to use based on subdomain
    const actorRolesKey = subdomain === "seattle" ? "actorRolesSeattle" : "actorRolesApp";
    const activeActorsKey = subdomain === "seattle" ? "activeActorsSeattle" : "activeActorsApp";
    
    const actorRoles = settings[actorRolesKey] || {};
    const newActorRoles = { ...actorRoles };

    if (role === "Off" || role === null || role === undefined) {
      // Remove actor from roles if set to Off
      delete newActorRoles[actor];
    } else {
      // Set actor role
      newActorRoles[actor] = role;
    }

    // Update activeActors for the current subdomain
    const newActiveActors = Object.keys(newActorRoles).filter(
      (a) => newActorRoles[a] && newActorRoles[a] !== "Off"
    );

    // Update settings with subdomain-specific data
    const updatedSettings = {
      ...settings,
      [actorRolesKey]: newActorRoles,
      [activeActorsKey]: newActiveActors,
    };

    setSettings(updatedSettings);
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
            // Determine which actorRoles key to use based on subdomain
            const actorRolesKey = subdomain === "seattle" ? "actorRolesSeattle" : "actorRolesApp";
            const activeActorsKey = subdomain === "seattle" ? "activeActorsSeattle" : "activeActorsApp";
            
            // Initialize subdomain-specific actorRoles if it doesn't exist
            if (!updatedData[actorRolesKey] || typeof updatedData[actorRolesKey] !== "object") {
              updatedData[actorRolesKey] = {};
            }
            
            // Derive activeActors from actorRoles
            if (!Array.isArray(updatedData[activeActorsKey])) {
              updatedData[activeActorsKey] = Object.keys(
                updatedData[actorRolesKey] || {}
              ).filter(
                (actor) =>
                  updatedData[actorRolesKey][actor] &&
                  updatedData[actorRolesKey][actor] !== "Off"
              );
            }
            
            // Initialize subdomain-specific wardrobe
            const wardrobeKey = subdomain === "seattle" ? "seattleWardrobe" : "appWardrobe";
            if (!updatedData[wardrobeKey]) {
              updatedData[wardrobeKey] = "Jeans";
            }
            
            setSettings(updatedData);
          });
      })
      .catch((err) => alert("Failed to save: " + err.message));
  };

  if (!isLoggedIn) {
    return (
      <AdminLogin
        pageTitle="Settings"
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        onLogin={handleLogin}
        error={error}
      />
    );
  }

  if (!settings) return <p>Loading settings...</p>;

  return (
    <div
      style={{ display: "inline-block", fontSize: "5vw", paddingLeft: "10vw" }}
    >
      <title>SETTINGS | Spies Among Us</title>
      <h1 style={{ fontSize: "8vw", marginBottom: "2vw", color: "#F9DF39" }}>
        {subdomain === "seattle" ? "SEATTLE" : "LOS ANGELES"}
      </h1>
      <h1>Admin Panel</h1>
      <div>
        <h2>Actor Roles ({subdomain}):</h2>
        {allActors.map((actor) => {
          // Get the appropriate actorRoles key based on subdomain
          const actorRolesKey = subdomain === "seattle" ? "actorRolesSeattle" : "actorRolesApp";
          const currentRole = settings[actorRolesKey]?.[actor] || "Off";
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
        <h2>Wardrobe ({subdomain}):</h2>
        <div>
          <label style={{ display: "block", fontSize: "10vw", padding: "1vw" }}>
            <input
              type="radio"
              name="wardrobe"
              value="Jeans"
              checked={(subdomain === "seattle" ? settings.seattleWardrobe : settings.appWardrobe) === "Jeans"}
              onChange={() => {
                const wardrobeKey = subdomain === "seattle" ? "seattleWardrobe" : "appWardrobe";
                const updatedSettings = {
                  ...settings,
                  [wardrobeKey]: "Jeans",
                };
                setSettings(updatedSettings);
              }}
              style={{ width: "10vw", height: "10vw" }}
            />
            Jeans
          </label>
          <label style={{ display: "block", fontSize: "10vw", padding: "1vw" }}>
            <input
              type="radio"
              name="wardrobe"
              value="Shorts"
              checked={(subdomain === "seattle" ? settings.seattleWardrobe : settings.appWardrobe) === "Shorts"}
              onChange={() => {
                const wardrobeKey = subdomain === "seattle" ? "seattleWardrobe" : "appWardrobe";
                const updatedSettings = {
                  ...settings,
                  [wardrobeKey]: "Shorts",
                };
                setSettings(updatedSettings);
              }}
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
        onClick={() => history.push("/completedmissions")}
      >
        View Completed Missions
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
