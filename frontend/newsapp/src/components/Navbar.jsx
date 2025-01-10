import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(5); // Example: number of notifications
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMouseEnterMenu = () => {
    setIsMenuOpen(true);
  };

  const handleMouseEnterProfile = () => {
    setIsProfileOpen(true);
  };

  const handleMouseLeaveProfile = () => {
    setIsProfileOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">TrendTales</h1>
      </div>
      <div className="navbar-right">
        <div
          className="profile-icon"
          onMouseEnter={handleMouseEnterProfile}
          onMouseLeave={handleMouseLeaveProfile}
        >
          <i className="fas fa-user"></i>

          {isProfileOpen && (
            <div className="profile-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
