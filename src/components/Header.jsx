import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/venues">Venues</Link>
        </li>
      </ul>
    </nav>
  );
}

function Header() {
  return (
    <header>
      <div>
        <h3>HOLIDAZE</h3>
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
