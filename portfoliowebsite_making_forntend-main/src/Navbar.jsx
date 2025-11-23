import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Navbar = ({ isAuthenticated, onLogout }) => (
  <nav className="navbar">
    <div className="nav-container">
      <div className="nav-logo">
        <h2>Portfolioweb</h2>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/" className="nav-link nav-home">
            <span role="img" aria-label="Home">🏠</span> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link nav-about">
            <span role="img" aria-label="About">ℹ️</span> About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/projects" className="nav-link nav-projects">
            <span role="img" aria-label="Projects">🗂️</span> Projects
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/blog" className="nav-link nav-blog">
            <span role="img" aria-label="Blog">📝</span> Blog
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link nav-contact">
            <span role="img" aria-label="Contact">✉️</span> Contact
          </Link>
        </li>
        {isAuthenticated && (
          <li className="nav-item">
            <Link to="/portfolio" className="nav-link nav-portfolio">
              <span role="img" aria-label="Portfolio">🗂️</span> Portfolio
            </Link>
          </li>
        )}
      </ul>
      <div className="nav-actions">
        {!isAuthenticated ? (
          <>
            <Link to="/signup" className="nav-action-btn signup-btn">
              <span role="img" aria-label="Sign Up">🔑</span> Sign Up
            </Link>
            <Link to="/signin" className="nav-action-btn signin-btn">
              <span role="img" aria-label="Sign In">🔐</span> Sign In
            </Link>
            {/* <Link to="/admin" className="nav-action-btn admin-btn">
              <span role="img" aria-label="Admin">🛠️</span> Admin
            </Link> */}
          </>
        ) : (
          <button className="nav-action-btn logout-btn" onClick={onLogout}>
            <span role="img" aria-label="Logout">🚪</span> Logout
          </button>
        )}
      </div>
    </div>
  </nav>
);

export default Navbar;
