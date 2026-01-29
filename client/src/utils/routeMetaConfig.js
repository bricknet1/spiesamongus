/**
 * Configuration for meta tags based on routes
 * You can customize meta tags for each route here
 */
const BASE_URL = "https://app.spiesamong.us";
const DEFAULT_IMAGE = `${BASE_URL}/General.jpg`;

export const routeMetaConfig = {
  "/": {
    title: "Spies Among Us",
    description: "Spies Among Us - An immersive spy mission experience",
    ogTitle: "Spies Among Us",
    ogDescription: "An immersive spy mission experience",
    ogImage: DEFAULT_IMAGE,
    ogUrl: BASE_URL,
  },
  "/begin": {
    title: "Begin Your Mission | Spies Among Us",
    description: "Start your spy mission adventure",
    ogTitle: "Begin Your Mission | Spies Among Us",
    ogDescription: "Start your spy mission adventure",
    ogImage: DEFAULT_IMAGE,
    ogUrl: `${BASE_URL}/begin`,
  },
  "/debrief": {
    title: "Debrief | Spies Among Us",
    description: "Review your mission and meet the agents",
    ogTitle: "Debrief | Spies Among Us",
    ogDescription: "Review your mission and meet the agents",
    ogImage: DEFAULT_IMAGE,
    ogUrl: `${BASE_URL}/debrief`,
  },
  "/giftcards": {
    title: "Gift Cards | Spies Among Us",
    description: "Give the gift of espionage with a spy mission gift card",
    ogTitle: "Gift Cards | Spies Among Us",
    ogDescription: "Give the gift of espionage with a spy mission gift card",
    ogImage: DEFAULT_IMAGE,
    ogUrl: `${BASE_URL}/giftcards`,
  },
  "/mission": {
    title: "Mission | Spies Among Us",
    description: "Your mission details",
    ogTitle: "Mission | Spies Among Us",
    ogDescription: "Your mission details",
    ogImage: DEFAULT_IMAGE,
    ogUrl: `${BASE_URL}/mission`,
  },
  "/myprofile": {
    title: "My Profile | Spies Among Us",
    description: "Agent profile and mission history",
    ogTitle: "My Profile | Spies Among Us",
    ogDescription: "Agent profile and mission history",
    ogImage: DEFAULT_IMAGE,
    ogUrl: `${BASE_URL}/myprofile`,
  },
  "/privacy": {
    title: "Privacy Policy | Spies Among Us",
    description: "Privacy policy for Spies Among Us",
    ogTitle: "Privacy Policy | Spies Among Us",
    ogDescription: "Privacy policy for Spies Among Us",
    ogImage: DEFAULT_IMAGE,
    ogUrl: `${BASE_URL}/privacy`,
  },
  "/terms": {
    title: "Terms of Service | Spies Among Us",
    description: "Terms of service for Spies Among Us",
    ogTitle: "Terms of Service | Spies Among Us",
    ogDescription: "Terms of service for Spies Among Us",
    ogImage: DEFAULT_IMAGE,
    ogUrl: `${BASE_URL}/terms`,
  },
  // Add more routes as needed
};

/**
 * Get meta config for a given pathname
 */
export const getMetaForRoute = (pathname) => {
  return routeMetaConfig[pathname] || {
    title: "Spies Among Us",
    description: "Spies Among Us",
    ogTitle: "Spies Among Us",
    ogDescription: "Spies Among Us",
    ogImage: DEFAULT_IMAGE,
    ogUrl: `${BASE_URL}${pathname}`,
  };
};

