import { useSubdomain } from "./SubdomainProvider.js";

/** Body for POST /api/login — server picks password + token by site. */
export function adminLoginPayload(password, subdomain) {
  return JSON.stringify({
    password,
    subdomain: subdomain === "seattle" ? "seattle" : "app",
  });
}

function AdminLogin({ pageTitle, passwordInput, setPasswordInput, onLogin, error }) {
  const subdomain = useSubdomain();
  const locationName = subdomain === "seattle" ? "Seattle" : "Los Angeles";
  
  return (
    <div style={{ padding: "5vw" }}>
      {pageTitle && <title>{pageTitle} | Spies Among Us</title>}
      <h2>{locationName} Admin Login</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onLogin();
        }}
        style={{ fontSize: "10vw", width: "90vw", padding: "2vw" }}
      />
      <br />
      <br />
      <button onClick={onLogin} className="settingsPageButton">
        Login
      </button>
      {error && <p style={{ color: "red", fontSize: "5vw" }}>{error}</p>}
    </div>
  );
}

export default AdminLogin;

