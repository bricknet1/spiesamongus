import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSubdomain } from "./SubdomainProvider.js";
import AdminLogin from "./AdminLogin.js";
import AdminNavigation from "./AdminNavigation.js";

function CompletedMissions() {
  const subdomain = useSubdomain();
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [passwordInput, setPasswordInput] = useState("");
  const [progressData, setProgressData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [deletingTeam, setDeletingTeam] = useState(null);
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
        // Filter by subdomain first, then filter for completed missions (current_act === "end")
        const filteredBySubdomain = (data.data || []).filter(
          (progress) => progress.subdomain === subdomain
        );
        const completedMissions = filteredBySubdomain.filter(
          (progress) => progress.current_act === "end"
        );
        setProgressData(completedMissions);
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

  const handleDeleteTeam = (progress) => {
    if (!progress.player1_phone) {
      setError("Player 1 phone number is required");
      return;
    }

    // Show confirmation alert
    const player1Name = progress.player1_name || "this team";
    const confirmed = window.confirm(
      `Are you absolutely certain you want to delete the completed mission for ${player1Name}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingTeam(progress.id);
    setError("");

    // Format phone with +1 prefix for API (remove +1 if present, then add it)
    const formatPhone = (phone) => {
      if (!phone) return "";
      const digits = phone.replace(/\D/g, "");
      return digits.length === 10 ? `+1${digits}` : phone;
    };

    const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN || "";

    // Prepare data for DELETE endpoint
    const deleteData = {
      phone: formatPhone(progress.player1_phone),
    };

    // Call DELETE endpoint
    fetch(`${API_URL}/api/webhook/player-progress`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(AUTH_TOKEN && { Authorization: `Bearer ${AUTH_TOKEN}` }),
      },
      body: JSON.stringify(deleteData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete team");
        }
        return res.json();
      })
      .then(() => {
        // Refresh the data after successful deletion
        fetchProgressData();
        setDeletingTeam(null);
      })
      .catch((err) => {
        setError(`Failed to delete team: ${err.message}`);
        setDeletingTeam(null);
      });
  };

  if (!isLoggedIn) {
    return (
      <AdminLogin
        pageTitle="Completed Missions"
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        onLogin={handleLogin}
        error={error}
      />
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
      <title>Completed Missions | Spies Among Us</title>
      <h1 style={{ fontSize: "8vw", marginBottom: "2vw", color: "#F9DF39" }}>
        {subdomain === "seattle" ? "SEATTLE" : "LOS ANGELES"}
      </h1>
      <h1>Completed Missions</h1>

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
          No completed missions found.
        </div>
      )}

      {progressData && progressData.length > 0 && (
        <div style={{ marginTop: "5vw" }}>
          <h2 style={{ fontSize: "6vw", marginBottom: "3vw" }}>
            Completed Teams: {progressData.length}
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
                          | Act: {progress.current_act}
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
                            <strong>Current Act:</strong> {progress.current_act}
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
                              style={{ fontSize: "4vw", marginBottom: "0.5vw" }}
                            >
                              <strong>Team Image:</strong>{" "}
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
                              <strong>Marble Selfie:</strong>{" "}
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

                      {/* Delete Team Button */}
                      <div style={{ marginTop: "3vw", marginBottom: "1vw" }}>
                        <button
                          className="settingsPageButton"
                          onClick={() => handleDeleteTeam(progress)}
                          disabled={deletingTeam === progress.id}
                          style={{
                            backgroundColor: deletingTeam === progress.id ? "#666" : "#ff3700",
                            color: "white",
                            fontSize: "4vw",
                            padding: "2vw 4vw",
                            border: "none",
                            borderRadius: "0.5vw",
                            cursor: deletingTeam === progress.id ? "not-allowed" : "pointer",
                          }}
                        >
                          {deletingTeam === progress.id ? "Deleting..." : "Delete Team"}
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

      <AdminNavigation currentPage="completedmissions" />
    </div>
  );
}

export default CompletedMissions;

