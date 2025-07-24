import { useState } from 'react';
import useDeviceType from "./UseDeviceType.js";

function HamburgerMenuHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = window.location.pathname; // Get the current URL path

  const isMobile = useDeviceType();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <button
        className={
          isMobile
            ? isOpen
              ? "hamburger-icon-unfixed hamburger-icon-fixed-override"
              : "hamburger-icon-unfixed"
            : isOpen
              ? "hamburger-icon-desktop hamburger-icon-fixed-override"
              : "hamburger-icon-desktop"
        }
        onClick={toggleMenu}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Overlay Menu */}
      <div className={`menu-overlay ${isOpen ? "open" : ""}`}>
        <nav className="menu">
          <ul>
            <li><a href="/" className={location === "/" ? "burger-menu-active" : ""}>Home</a></li>
            <li><a href="/tickets" className={location.startsWith("/tickets") ? "burger-menu-active" : ""}>Tickets</a></li>
            <li><a href="/giftcards" className={location.startsWith("/giftcards") ? "burger-menu-active" : ""}>Gift Cards</a></li>
            <li><a href="/reviews" className={location.startsWith("/reviews") ? "burger-menu-active" : ""}>Reviews</a></li>
            <li><a href="/private" className={location.startsWith("/private") ? "burger-menu-active" : ""}>Private Events</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HamburgerMenuHeader;
