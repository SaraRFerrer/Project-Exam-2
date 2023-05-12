import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/profile.module.css";

function UpdateVenueManager({ onClose }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdate = async (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/users/me",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({ role: "venueManager" }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, role: "venueManager" })
      );

      onClose();
    } catch (error) {
      console.error("There was a problem with the PUT request:", error);
    }
  };

  return (
    <Modal
      className={styles.modal}
      show={showUpdateModal}
      onHide={() => setShowUpdateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Become a Venue Manager</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You need to be a venue manager to create a new venue.</p>
        <Button onClick={handleUpdate}>Update Role</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateVenueManager;
