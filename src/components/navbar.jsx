import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import SettingsIcon from "@mui/icons-material/Settings";
import profileIcon from "../assets/profile.png";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname === "/" ? "home" : location.pathname.slice(1);
  const [activeLink, setActiveLink] = useState(currentPath);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLinkClick = (link, path) => {
    setActiveLink(link);
    navigate(path);
  };

  const handleLogout = async () => {
    if (!user || !user.token) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      alert(data.msg || "Logged out successfully");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  const links = [
    { label: "Home", path: "/" },
    { label: "Course Selector", path: "/course-selector" },
    { label: "Courses", path: "/courses" },
    { label: "Pricing", path: "/pricing" },
    { label: "FAQ", path: "/faqs" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <div style={styles.navbarContainer}>
      <div style={styles.navbarBg}></div>

      {/* Logo */}
      <div style={styles.navbarLogo}>
        <a
          href="#"
          style={styles.logoLink}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("home", "/");
          }}
        >
          <img src={logo} alt="Logo" style={styles.logoImg} />
        </a>
      </div>

      {/* Links */}
      <nav style={styles.navbarLinks}>
        {links.map((link) => (
          <a
            key={link.path}
            href="#"
            style={{
              ...styles.link,
              ...(activeLink === link.label.toLowerCase().replace(" ", "-")
                ? styles.activeLink
                : {}),
            }}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(link.label.toLowerCase().replace(" ", "-"), link.path);
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Buttons / Profile */}
      {!user ? (
        <div style={styles.btnContainer}>
          <button
            style={styles.loginButton}
            onClick={() => {
              setActiveLink("login");
              navigate("/login");
            }}
          >
            Log In
          </button>
          <button
            style={styles.createButton}
            onClick={() => {
              setActiveLink("createaccount");
              navigate("/createaccount");
            }}
          >
            Create Account
          </button>
        </div>
      ) : (
        <div style={{ position: "relative", cursor: "pointer", display: "flex", alignItems: "center" }}>
          <img
            src={profileIcon}
            alt="Profile"
            style={styles.profileImg}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />


          <SettingsIcon
            style={{ verticalAlign: "middle", cursor: "pointer" }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div style={styles.dropdown}>
              <p style={styles.dropdownEmail}>{user.email}</p>

              {/* Registered Courses button for instructors only */}
              {user.role === "instructor" && (
                <button
                  onClick={() => {
                    navigate("/registered-courses");
                    setDropdownOpen(false);
                  }}
                  style={{
                    ...styles.logoutButton,
                    backgroundColor: "#F98149",
                    marginBottom: "6px",
                  }}
                >
                  Registered Courses
                </button>
              )}

              <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;

const styles = {
  navbarContainer: {
    position: "sticky",
    top: "10px",
    left: 0,
    right: 0,
    width: "100%",
    maxWidth: "1100px",
    background: "#FDFDFD",
    borderRadius: "20px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    zIndex: 1000,
    flexWrap: "wrap",
    boxSizing: "border-box",
  },
  navbarBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    background: "#FFFFFF",
    borderRadius: "20px",
    zIndex: -1,
  },
  navbarLogo: { width: "140px", height: "70px", cursor: "pointer", flexShrink: 0 },
  logoLink: { display: "block", width: "100%", height: "100%" },
  logoImg: { width: "100%", height: "100%", objectFit: "contain" },

  navbarLinks: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    flexGrow: 1,
    fontFamily: "Poppins, sans-serif",
    fontSize: "16px",
    color: "#8A948C",
    marginTop: 5,
  },
  link: { textDecoration: "none", cursor: "pointer", color: "#8A948C", transition: "color 0.3s ease" },
  activeLink: { color: "#F98149", fontWeight: "600" },

  btnContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: 5,
  },
  loginButton: {
    border: "2px solid #F98149",
    color: "#F98149",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    fontSize: "14px",
    borderRadius: "8px",
    width: "100px",
    height: "40px",
    background: "transparent",
    cursor: "pointer",
  },
  createButton: {
    backgroundColor: "#F98149",
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    fontSize: "14px",
    borderRadius: "8px",
    width: "130px",
    height: "40px",
    border: "none",
    cursor: "pointer",
  },

  profileImg: { width: 35, height: 35, borderRadius: "50%", marginRight: 6 },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 6px)",
    right: 0,
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    borderRadius: "8px",
    padding: "10px",
    width: "180px",
    zIndex: 1000,
  },
  dropdownEmail: { margin: 0, marginBottom: "6px", fontWeight: "bold", color: "#333" },
  logoutButton: { width: "100%", padding: "6px", backgroundColor: "#003F7D", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" },
};
