import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAuthenticated, isMinister } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="flag-icon">🇵🇰</span>
          <span>E-Minister Portal</span>
        </Link>

        {/* Hamburger Menu Toggle */}
        <button
          className={`nav-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className={isActive("/")}>
              <span className="hide-mobile">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/submit-complaint"
              className={isActive("/submit-complaint")}
            >
              <span className="hide-mobile">Complaint</span>
            </Link>
          </li>
          <li>
            <Link
              to="/submit-suggestion"
              className={isActive("/submit-suggestion")}
            >
              <span className="hide-mobile">Suggestion</span>
            </Link>
          </li>
          {isAuthenticated && isMinister && (
            <li>
              <Link
                to="/minister-dashboard"
                className={isActive("/minister-dashboard")}
              >
                <span className="hide-mobile">Dashboard</span>
              </Link>
            </li>
          )}
          {isAuthenticated ? (
            <>
              <li>
                <span className="user-info">
                  👤 <span className="hide-mobile">{user?.name}</span>
                  <span className="show-mobile">
                    {user?.name?.split(" ")[0]}
                  </span>
                </span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm"
                >
                  <span className="hide-mobile">Logout</span>
                  <span className="show-mobile">🚪</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="btn btn-gold btn-sm"
                onClick={closeMenu}
              >
                <span className="hide-mobile">Login</span>
                <span className="show-mobile">Login</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
