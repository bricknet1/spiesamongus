import { createContext, useContext, useState, useEffect } from "react";

const SubdomainContext = createContext(undefined);

export const useSubdomain = () => {
  const context = useContext(SubdomainContext);
  if (context === undefined) {
    throw new Error("useSubdomain must be used within a SubdomainProvider");
  }
  return context;
};

export const SubdomainProvider = ({ children }) => {
  const [subdomain, setSubdomain] = useState("app");

  useEffect(() => {
    const hostname = window.location.hostname;
    
    // Extract subdomain from hostname
    // For example: seattle.spiesamong.us -> seattle
    //              app.spiesamong.us -> app
    //              localhost -> app (default)
    
    if (hostname.includes(".spiesamong.us")) {
      const parts = hostname.split(".spiesamong.us");
      const subdomainPart = parts[0];
      // If subdomain exists and is not "app", use it; otherwise default to "app"
      if (subdomainPart && subdomainPart !== "app") {
        setSubdomain(subdomainPart);
      } else {
        setSubdomain("app");
      }
    } else {
      // For localhost or other domains, default to "app"
      setSubdomain("app");
    }
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

