import { useState, useEffect } from "react";
import useDeviceType from "./UseDeviceType.js";

// List of pages that should be tracked
const TRACKED_PAGES = [
  { path: "/marble", label: "Marble" },
  { path: "/mission", label: "Mission" },
  { path: "/myhistory", label: "My History" },
  { path: "/myprofile", label: "My Profile" },
  { path: "/notfound", label: "Not Found" },
  { path: "/obeliskterms", label: "Obelisk Terms" },
  { path: "/opbc", label: "OPBC" },
  { path: "/themission", label: "The Mission" },
  { path: "/yourmission", label: "Your Mission" },
  { path: "/yourupdatedmission", label: "Your Updated Mission" },
];

const STORAGE_KEY = "visitedMissionPages";

function VisitedPagesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // Initialize from localStorage immediately
  const getInitialVisitedPages = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };
  const [visitedPages, setVisitedPages] = useState(getInitialVisitedPages);
  const location = window.location.pathname;
  const isMobile = useDeviceType();

  // Check if current page is one of the tracked pages
  const isTrackedPage = TRACKED_PAGES.some((page) => page.path === location);

  // Track page visit on mount and when location changes
  useEffect(() => {
    if (isTrackedPage) {
      const stored = localStorage.getItem(STORAGE_KEY);
      const visited = stored ? JSON.parse(stored) : [];

      // Add current page if not already visited
      if (!visited.includes(location)) {
        const updated = [...visited, location];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setVisitedPages(updated);
      } else {
        // Ensure state is in sync with localStorage
        setVisitedPages(visited);
      }
    } else {
      // Load visited pages even if not on a tracked page
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const visited = JSON.parse(stored);
        setVisitedPages(visited);
      }
    }
  }, [location, isTrackedPage]);

  // Only show menu if on a tracked page and more than 1 page has been visited
  if (!isTrackedPage || visitedPages.length <= 1) {
    return null;
  }

  // Get visited page info, excluding /notfound from menu display
  const visitedPageInfo = TRACKED_PAGES.filter(
    (page) => visitedPages.includes(page.path) && page.path !== "/notfound"
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let burgerClassName;

  // Use similar styling to HamburgerMenuHeader
  burgerClassName = isMobile
    ? isOpen
      ? "hamburger-icon-unfixed hamburger-icon-fixed-override"
      : "hamburger-icon-unfixed"
    : isOpen
    ? "hamburger-icon-desktop hamburger-icon-fixed-override"
    : "hamburger-icon-desktop";

  return (
    <div>
      {/* Hamburger Icon */}
      <button className={burgerClassName} onClick={toggleMenu}>
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Overlay Menu */}
      <div className={`menu-overlay ${isOpen ? "open" : ""}`}>
        <nav className="menu">
          <ul>
            {visitedPageInfo.map((page) => (
              <li key={page.path}>
                <a
                  href={page.path}
                  className={location === page.path ? "burger-menu-active" : ""}
                >
                  {page.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default VisitedPagesMenu;
