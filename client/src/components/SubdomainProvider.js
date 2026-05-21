import { createContext, useContext, useState, useEffect } from "react";

const SubdomainContext = createContext(undefined);

/** Resolve subdomain on first paint so consumers never briefly see "app" on Seattle hosts. */
export function detectSubdomain() {
  const hostname = window.location.hostname;
  const querySubdomain = new URLSearchParams(window.location.search)
    .get("subdomain")
    ?.trim();

  const withAppDefault = (value) =>
    !value || value === "app" ? "app" : value;

  // Production: seattle.spiesamong.us -> seattle; app.spiesamong.us -> app
  if (hostname.includes(".spiesamong.us")) {
    const parts = hostname.split(".spiesamong.us");
    const subdomainPart = parts[0];
    if (subdomainPart && subdomainPart !== "app") {
      return subdomainPart;
    }
    return "app";
  }

  // Local: http://seattle.localhost:3000 (RFC 6761; resolves to 127.0.0.1)
  if (hostname.endsWith(".localhost") && hostname.length > ".localhost".length) {
    const extracted = hostname
      .slice(0, -".localhost".length)
      .replace(/^\.+/, "");
    return withAppDefault(extracted);
  }

  // Local: http://localhost:3000?subdomain=seattle (or 127.0.0.1, ::1)
  if (querySubdomain) {
    return withAppDefault(querySubdomain);
  }

  return "app";
}

export const useSubdomain = () => {
  const context = useContext(SubdomainContext);
  if (context === undefined) {
    throw new Error("useSubdomain must be used within a SubdomainProvider");
  }
  return context;
};

export const SubdomainProvider = ({ children }) => {
  const [subdomain, setSubdomain] = useState(detectSubdomain);

  useEffect(() => {
    setSubdomain(detectSubdomain());
  }, []);

  useEffect(() => {
    console.log("Subdomain state updated:", subdomain);
  }, [subdomain]);

  return (
    <SubdomainContext.Provider value={subdomain}>
      {children}
    </SubdomainContext.Provider>
  );
};

