import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import styles from "../../styles/profile.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Avatar() {
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setAvatar(storedUser.avatar);
      setUserName(storedUser.name);
    }
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSave = () => {
    setAvatar(newAvatarUrl);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...localStorage.getItem("user"), avatar: newAvatarUrl })
    );
    handleClose();
  };

  return (
    <div>
      <div className={styles.avatarContainer}>
        <img src={avatar} alt="Avatar" className={styles.avatar} />
        <FiEdit className={styles.editIcon} onClick={handleShow} />
      </div>
      <div>
        <h4 className={styles.username}>{userName}</h4>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="avatarUrl">Avatar URL:</label>
          <input
            type="text"
            id="avatarUrl"
            value={newAvatarUrl}
            onChange={(e) => setNewAvatarUrl(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Avatar;
