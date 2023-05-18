import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Nav, Navbar } from "react-bootstrap";
import LogIn from "../pages/LogIn/login";
import { UserContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

function CustomNavbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const localStoredUser = JSON.parse(localStorage.getItem("user"));
    setUser(
      localStoredUser
        ? { loggedIn: true, venueManager: localStoredUser.isVenueManager }
        : { loggedIn: false, venueManager: false }
    );
  }, [setUser]);

  function logout() {
    if (window.confirm("Are you sure you want to log out?")) {
      setUser({ loggedIn: false, venueManager: false });
      localStorage.clear();
      navigate("/");
    }
  }

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <Navbar bg="light" expand="md">
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Link to="/">Home</Link>
          {user.loggedIn && (
            <Nav.Link className="link">
              <Link to="/profile">Profile</Link>
            </Nav.Link>
          )}
          <Nav.Link className="link">
            <Link to="/venues">Venues</Link>
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {user.loggedIn ? (
            <>
              <Nav.Link className="link">
                <button className="loginBtn" onClick={logout}>
                  Log Out
                </button>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link className="link">
                <button className="loginBtn" onClick={handleLoginClick}>
                  Log In
                </button>
              </Nav.Link>
              <Nav.Link className="link">
                <Link to="/register">Register</Link>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LogIn handleClose={handleCloseLoginModal} />
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

function Header() {
  return (
    <header>
      <div>
        <h3>HOLIDAZE</h3>
      </div>
      <CustomNavbar />
    </header>
  );
}

export default Header;
