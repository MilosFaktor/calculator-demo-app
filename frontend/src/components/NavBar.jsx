import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Calculator app: v2.0.0</Link>
      </div>
      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div className={`navbar-links${menuOpen ? " open" : ""}`}>
        <Link
          to="/"
          className={`nav-link${location.pathname === "/" ? " active" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/calculator"
          className={`nav-link${location.pathname === "/calculator" ? " active" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Calculator
        </Link>
        <Link
          to="/auth"
          className={`nav-link${location.pathname === "/auth" ? " active" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          AuthPanel
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;