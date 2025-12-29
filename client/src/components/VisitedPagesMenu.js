import { useState, useEffect, useRef } from "react";
import useDeviceType from "./UseDeviceType.js";

// List of pages that should be tracked
const TRACKED_PAGES = [
  { path: "/myhistory", label: "Papyrus Mission History" },
  { path: "/myprofile", label: "Papyrus Profile / HR Search" },
  { path: "/notfound", label: "Not Found" },
  { path: "/opbc", label: "Bubonic Curtsy" },
];

const STORAGE_KEY = "visitedMissionPages";
const TOOLTIP_SHOWN_KEY = "visitedPagesTooltipShown";

function VisitedPagesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimerRef = useRef(null);
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
  const locationLower = location.toLowerCase();
  const isMobile = useDeviceType();

  // Check if current page is one of the tracked pages (case-insensitive)
  const isTrackedPage = TRACKED_PAGES.some(
    (page) => page.path.toLowerCase() === locationLower
  );

  // Track page visit on mount and when location changes
  useEffect(() => {
    if (isTrackedPage) {
      const stored = localStorage.getItem(STORAGE_KEY);
      const visited = stored ? JSON.parse(stored) : [];

      // Normalize visited paths to lowercase for comparison
      const visitedLower = visited.map((path) => path.toLowerCase());

      // Add current page if not already visited (case-insensitive check)
      if (!visitedLower.includes(locationLower)) {
        // Store the normalized lowercase path
        const updated = [...visited, locationLower];
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
  }, [location, locationLower, isTrackedPage]);

  // Show tooltip when menu button first appears (when visitedPages.length becomes > 1)
  // Only show once ever, tracked in localStorage
  useEffect(() => {
    if (isTrackedPage && visitedPages.length > 1) {
      // Check if tooltip has already been shown
      const tooltipShown = localStorage.getItem(TOOLTIP_SHOWN_KEY);
      if (!tooltipShown) {
        // Mark tooltip as shown in localStorage
        localStorage.setItem(TOOLTIP_SHOWN_KEY, "true");
        setShowTooltip(true);
        tooltipTimerRef.current = setTimeout(() => {
          setShowTooltip(false);
          tooltipTimerRef.current = null;
        }, 10000); // 10 seconds

        return () => {
          if (tooltipTimerRef.current) {
            clearTimeout(tooltipTimerRef.current);
            tooltipTimerRef.current = null;
          }
        };
      }
    }
  }, [isTrackedPage, visitedPages.length]);

  // Only show menu if on a tracked page and more than 1 page has been visited
  if (!isTrackedPage || visitedPages.length <= 1) {
    return null;
  }

  // Get visited page info, excluding /notfound from menu display (case-insensitive)
  const visitedPageInfo = TRACKED_PAGES.filter(
    (page) =>
      visitedPages.some(
        (visitedPath) => visitedPath.toLowerCase() === page.path.toLowerCase()
      ) && page.path.toLowerCase() !== "/notfound"
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Hide tooltip immediately when button is clicked
    if (showTooltip) {
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current);
        tooltipTimerRef.current = null;
      }
      setShowTooltip(false);
    }
  };

  let buttonClassName;

  // Use unique styling for VisitedPagesMenu
  buttonClassName = isMobile
    ? isOpen
      ? "visited-pages-icon-mobile visited-pages-icon-fixed-override"
      : "visited-pages-icon-mobile"
    : isOpen
    ? "visited-pages-icon-desktop visited-pages-icon-fixed-override"
    : "visited-pages-icon-desktop";

  return (
    <div>
      {/* Menu Button */}
      <button className={buttonClassName} onClick={toggleMenu}>
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div className="visited-pages-tooltip">
          Tap here to return to pages you've visited!
        </div>
      )}

      {/* Overlay Menu */}
      <div className={`visited-pages-overlay ${isOpen ? "open" : ""}`}>
        <nav className="visited-pages-menu">
          <ul>
            {visitedPageInfo.map((page) => (
              <li key={page.path}>
                <a
                  href={page.path}
                  className={
                    locationLower === page.path.toLowerCase()
                      ? "visited-pages-active"
                      : ""
                  }
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
