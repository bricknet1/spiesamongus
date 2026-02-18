import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSubdomain } from "./SubdomainProvider.js";

function PlayerProgress() {
  const subdomain = useSubdomain();
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [passwordInput, setPasswordInput] = useState("");
  const [progressData, setProgressData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [endingMission, setEndingMission] = useState(null);
  const history = useHistory();

  const isLoggedIn = !!token;

  const API_URL = process.env.REACT_APP_API_URL;

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

  const fetchProgressData = useCallback(() => {
    setLoading(true);
    fetch(`${API_URL}/api/player-progress`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("adminToken");
            setToken("");
            throw new Error("Unauthorized - Please login again");
          }
          throw new Error("Failed to fetch progress data");
        }
        return res.json();
      })
      .then((data) => {
        // Filter by subdomain first, then filter out completed missions (current_act === "end")
        const filteredBySubdomain = (data.data || []).filter(
          (progress) => progress.subdomain === subdomain
        );
        const activeMissions = filteredBySubdomain.filter(
          (progress) => progress.current_act !== "end"
        );
        // Sort by created_at: newest first (descending order)
        const sortedMissions = activeMissions.sort((a, b) => {
          // Handle null/undefined created_at values (put them at the end)
          if (!a.created_at && !b.created_at) return 0;
          if (!a.created_at) return 1;
          if (!b.created_at) return -1;
          // Compare dates (newest first = descending)
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setProgressData(sortedMissions);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_URL, token, subdomain]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProgressData();
    }
  }, [isLoggedIn, fetchProgressData]);

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  // Map act values to the format expected for display
  const mapActValue = (act) => {
    if (!act) return "Act 1 (Mission Start)";
    
    // If already in the correct format, return as-is
    if (typeof act === "string" && act.startsWith("Act ")) {
      return act;
    }
    
    // Map single digit or numeric strings to full act names
    const actMap = {
      "0": "Act 1 (Mission Start)",
      "2": "Act 2 (Papyrus Call)",
      "4": "Act 4 (Hashimoto)",
      "5": "Act 5 (Marble Search)",
      "6": "Act 6 (Friendship Knot)",
      "7a": "Act 7 (Obelisk)",
      "7h": "Act 7 (Sweat Yoga)", 
      "8": "Act 8 (Marble)",
      "10": "Act 10 (Papyrus)",
    };
    
    // Convert to string and check if it's a key in the map
    const actStr = String(act).trim();
    return actMap[actStr] || act; // Return mapped value or original if not found
  };

  const handleEndMission = (progress) => {
    if (!progress.player1_phone) {
      setError("Player 1 phone number is required");
      return;
    }

    // Show confirmation alert
    const player1Name = progress.player1_name || "this player";
    const confirmed = window.confirm(
      `Are you absolutely certain you want to end the mission for ${player1Name}?`
    );

    if (!confirmed) {
      return;
    }

    setEndingMission(progress.id);
    setError("");

    // Format phone with +1 prefix for API (remove +1 if present, then add it)
    const formatPhone = (phone) => {
      if (!phone) return "";
      const digits = phone.replace(/\D/g, "");
      return digits.length === 10 ? `+1${digits}` : phone;
    };

    // Extract 10-digit phone number for Make webhook
    const phoneDigits = progress.player1_phone.replace(/\D/g, "").slice(-10);
    const phoneForMake = phoneDigits.length === 10 ? phoneDigits : progress.player1_phone.replace(/\D/g, "");

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN || "";

    // Determine webhook URL based on subdomain
    const webhookUrl = subdomain === "seattle" 
      ? "https://hook.us2.make.com/4lb7x7sjcvbdinx48qh10myw4ejxc3r6"
      : "https://hook.us1.make.com/7v75ikxoeoo61lykx6776cv3au0fc5op";

    // Prepare data for DELETE endpoint
    const deleteData = {
      phone: formatPhone(progress.player1_phone),
    };

    // Call both endpoints (same as Cancel.js)
    const makeWebhookPromise = fetch(
      webhookUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { phone: phoneForMake } }),
      }
    );

    const deleteWebhookPromise = fetch(
      `${API_URL}/api/webhook/player-progress`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(AUTH_TOKEN && { Authorization: `Bearer ${AUTH_TOKEN}` }),
        },
        body: JSON.stringify(deleteData),
      }
    );

    // Wait for both requests
    Promise.allSettled([makeWebhookPromise, deleteWebhookPromise]).then(
      (results) => {
        const makeResult = results[0];
        const deleteResult = results[1];

        // Check if both are successful
        const makeSuccess = makeResult.status === "fulfilled" && makeResult.value.ok;
        const deleteSuccess = deleteResult.status === "fulfilled" && deleteResult.value.ok;

        if (makeSuccess && deleteSuccess) {
          // Prepare data for Bypass.js
          // Extract first and last name from player1_name
          const player1NameParts = (progress.player1_name || "").trim().split(" ");
          const firstName = player1NameParts[0] || "";
          const lastName = player1NameParts.slice(1).join(" ") || "";

          // Extract phone numbers (remove +1 prefix if present)
          const extractPhoneDigits = (phone) => {
            if (!phone) return "";
            return phone.replace(/\D/g, "").slice(-10);
          };

          // Map act values to the format expected by Bypass.js

          const bypassData = {
            firstName: firstName,
            lastName: lastName,
            phone1: extractPhoneDigits(progress.player1_phone),
            name2: progress.player2_name || "",
            phone2: extractPhoneDigits(progress.player2_phone),
            name3: progress.player3_name || "",
            phone3: extractPhoneDigits(progress.player3_phone),
            name4: progress.player4_name || "",
            phone4: extractPhoneDigits(progress.player4_phone),
            numberofplayers: String(progress.number_of_players || "1"),
            act: mapActValue(progress.current_act),
            nostairs: progress.nostairs || false, // Use stored value from database
            agreeToTerms: true, // Pre-checked since they already had a mission
          };

          // Navigate to Bypass with prepopulated data
          history.push("/bypass", { prepopulatedData: bypassData });
        } else {
          const errorMsg = !makeSuccess
            ? "Make webhook failed"
            : !deleteSuccess
            ? "Delete webhook failed"
            : "Unknown error";
          setError(`Failed to end mission: ${errorMsg}`);
          setEndingMission(null);
        }
      }
    );
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: "5vw" }}>
        <title>Player Progress | Spies Among Us</title>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
          style={{ fontSize: "10vw", width: "90vw", padding: "2vw" }}
        />
        <br />
        <br />
        <button onClick={handleLogin} className="settingsPageButton">
          Login
        </button>
        {error && <p style={{ color: "red", fontSize: "5vw" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "inline-block",
        fontSize: "5vw",
        paddingLeft: "10vw",
        paddingRight: "10vw",
        paddingTop: "5vw",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <title>Player Progress | Spies Among Us</title>
      <h1>Player Progress</h1>

      <div style={{ marginBottom: "3vw" }}>
        <button
          className="settingsPageButton"
          onClick={fetchProgressData}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh Data"}
        </button>
      </div>

      {error && (
        <p style={{ color: "red", fontSize: "4vw", marginBottom: "2vw" }}>
          {error}
        </p>
      )}

      {loading && !progressData && <p>Loading progress data...</p>}

      {progressData && progressData.length === 0 && (
        <div style={{ fontSize: "4vw", marginTop: "5vw" }}>
          No player progress data available.
        </div>
      )}

      {progressData && progressData.length > 0 && (
        <div style={{ marginTop: "5vw" }}>
          <h2 style={{ fontSize: "6vw", marginBottom: "3vw" }}>
            Active Teams: {progressData.length}
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3vw",
            }}
          >
            {progressData.map((progress, index) => {
              const isExpanded = expandedGroups.has(progress.id);
              return (
                <div
                  key={progress.id}
                  style={{
                    border: "2px solid #F9DF39",
                    padding: "3vw",
                    borderRadius: "1vw",
                    backgroundColor: "#1a1a1a",
                  }}
                >
                  <div
                    onClick={() => toggleGroup(progress.id)}
                    style={{
                      fontSize: "5vw",
                      fontWeight: "bold",
                      marginBottom: isExpanded ? "2vw" : "0",
                      color: "#F9DF39",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      {progress.player1_name || "N/A"} -{" "}
                      {progress.number_of_players || "N/A"} Players
                      {progress.current_act && (
                        <span style={{ fontSize: "4vw", marginLeft: "2vw" }}>
                          | {mapActValue(progress.current_act)}
                        </span>
                      )}
                    </span>
                    <span style={{ fontSize: "4vw" }}>
                      {isExpanded ? "▼" : "▶"}
                    </span>
                  </div>

                  {isExpanded && (
                    <>
                      <div
                        style={{
                          fontSize: "3.5vw",
                          marginBottom: "1vw",
                          color: "#888",
                        }}
                      >
                        <strong>Group ID:</strong> {progress.group_id || "N/A"}
                      </div>

                      {/* Players */}
                      <div style={{ marginTop: "2vw", marginBottom: "2vw" }}>
                        <div
                          style={{
                            fontSize: "4.5vw",
                            fontWeight: "bold",
                            marginBottom: "1vw",
                            color: "#F9DF39",
                          }}
                        >
                          Players:
                        </div>
                        {progress.player1_name && (
                          <div
                            style={{ fontSize: "4vw", marginBottom: "0.5vw" }}
                          >
                            <strong>Player 1:</strong> {progress.player1_name} (
                            {progress.player1_phone || "N/A"})
                          </div>
                        )}
                        {progress.player2_name && (
                          <div
                            style={{ fontSize: "4vw", marginBottom: "0.5vw" }}
                          >
                            <strong>Player 2:</strong> {progress.player2_name} (
                            {progress.player2_phone || "N/A"})
                          </div>
                        )}
                        {progress.player3_name && (
                          <div
                            style={{ fontSize: "4vw", marginBottom: "0.5vw" }}
                          >
                            <strong>Player 3:</strong> {progress.player3_name} (
                            {progress.player3_phone || "N/A"})
                          </div>
                        )}
                        {progress.player4_name && (
                          <div
                            style={{ fontSize: "4vw", marginBottom: "0.5vw" }}
                          >
                            <strong>Player 4:</strong> {progress.player4_name} (
                            {progress.player4_phone || "N/A"})
                          </div>
                        )}
                      </div>

                      {/* Game Progress */}
                      <div style={{ marginTop: "2vw", marginBottom: "2vw" }}>
                        <div
                          style={{
                            fontSize: "4.5vw",
                            fontWeight: "bold",
                            marginBottom: "1vw",
                            color: "#F9DF39",
                          }}
                        >
                          Game Progress:
                        </div>
                        {progress.start_time && (
                          <div
                            style={{ fontSize: "4vw", marginBottom: "0.5vw" }}
                          >
                            <strong>Start Time:</strong> {progress.start_time}
                          </div>
                        )}
                        {progress.current_act && (
                          <div
                            style={{ fontSize: "4vw", marginBottom: "0.5vw" }}
                          >
                            <strong>Current Act:</strong> {mapActValue(progress.current_act)}
                          </div>
                        )}
                        {progress.end_path && (
                          <div
                            style={{ fontSize: "4vw", marginBottom: "0.5vw" }}
                          >
                            <strong>End Path:</strong> {progress.end_path}
                          </div>
                        )}
                        {progress.special_event && (
                          <div
                            style={{ fontSize: "4vw", marginBottom: "0.5vw" }}
                          >
                            <strong>Special Event:</strong>{" "}
                            {progress.special_event}
                          </div>
                        )}
                        {progress.selfie_path && (
                          <div
                            style={{ fontSize: "4vw", marginBottom: "0.5vw" }}
                          >
                            <strong>Selfie Path:</strong>{" "}
                            <a
                              href={progress.selfie_path}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#4A9EFF",
                                wordBreak: "break-all",
                              }}
                            >
                              {progress.selfie_path}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Images */}
                      {(progress.selfie || progress.marbleselfie) && (
                        <div style={{ marginTop: "2vw", marginBottom: "2vw" }}>
                          <div
                            style={{
                              fontSize: "4.5vw",
                              fontWeight: "bold",
                              marginBottom: "1vw",
                              color: "#F9DF39",
                            }}
                          >
                            Images:
                          </div>
                          {progress.selfie && (
                            <div
                              style={{ fontSize: "4vw", marginBottom: "2vw" }}
                            >
                              <strong>Team Image:</strong>
                              <div style={{ marginTop: "1vw" }}>
                                <a
                                  href={progress.selfie}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src={progress.selfie}
                                    alt="Team Selfie"
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "50vw",
                                      borderRadius: "0.5vw",
                                      cursor: "pointer",
                                      border: "1px solid #444",
                                    }}
                                  />
                                </a>
                              </div>
                            </div>
                          )}
                          {progress.marbleselfie && (
                            <div
                              style={{ fontSize: "4vw", marginBottom: "0.5vw" }}
                            >
                              <strong>Marble Selfie:</strong>
                              <div style={{ marginTop: "1vw" }}>
                                <a
                                  href={progress.marbleselfie}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src={progress.marbleselfie}
                                    alt="Marble Selfie"
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "50vw",
                                      borderRadius: "0.5vw",
                                      cursor: "pointer",
                                      border: "1px solid #444",
                                    }}
                                  />
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Texts */}
                      {progress.texts &&
                        Array.isArray(progress.texts) &&
                        progress.texts.length > 0 && (
                          <div
                            style={{ marginTop: "2vw", marginBottom: "2vw" }}
                          >
                            <div
                              style={{
                                fontSize: "4.5vw",
                                fontWeight: "bold",
                                marginBottom: "1vw",
                                color: "#F9DF39",
                              }}
                            >
                              Texts ({progress.texts.length}):
                            </div>
                            <div
                              style={{
                                backgroundColor: "#2a2a2a",
                                padding: "2vw",
                                borderRadius: "0.5vw",
                                fontSize: "3.5vw",
                                overflowY: "auto",
                              }}
                            >
                              {progress.texts.map((text, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    marginBottom: "1vw",
                                    paddingBottom: "1vw",
                                    borderBottom:
                                      idx < progress.texts.length - 1
                                        ? "1px solid #444"
                                        : "none",
                                  }}
                                >
                                  {text}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Timestamps */}
                      <div
                        style={{
                          marginTop: "2vw",
                          fontSize: "3.5vw",
                          color: "#888",
                        }}
                      >
                        {progress.last_updated && (
                          <div style={{ marginBottom: "0.5vw" }}>
                            <strong>Last Updated:</strong>{" "}
                            {progress.last_updated}
                          </div>
                        )}
                        {progress.created_at && (
                          <div>
                            <strong>Created:</strong> {progress.created_at}
                          </div>
                        )}
                      </div>

                      {/* End Mission Button */}
                      <div style={{ marginTop: "3vw", marginBottom: "1vw" }}>
                        <button
                          className="settingsPageButton"
                          onClick={() => handleEndMission(progress)}
                          disabled={endingMission === progress.id}
                          style={{
                            backgroundColor: endingMission === progress.id ? "#666" : "#ff3700",
                            color: "white",
                            fontSize: "4vw",
                            padding: "2vw 4vw",
                            border: "none",
                            borderRadius: "0.5vw",
                            cursor: endingMission === progress.id ? "not-allowed" : "pointer",
                          }}
                        >
                          {endingMission === progress.id ? "Ending Mission..." : "End Mission"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <br />
      <br />
      <button
        className="settingsPageButton"
        onClick={() => history.push("/settings")}
        style={{ marginRight: "2vw" }}
      >
        Admin Settings
      </button>
      <button
        className="settingsPageButton"
        onClick={() => history.push("/completedmissions")}
        style={{ marginRight: "2vw" }}
      >
        Completed Missions
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

export default PlayerProgress;
