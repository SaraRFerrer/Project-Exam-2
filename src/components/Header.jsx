import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import LogIn from "../pages/LogIn/login";

function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button className="loginBtn" onClick={handleLoginClick}>
            Log In
          </button>
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
      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LogIn handleClose={handleCloseLoginModal} />
        </Modal.Body>
      </Modal>
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
