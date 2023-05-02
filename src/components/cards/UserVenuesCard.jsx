import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "../../styles/recent.module.css";
import EditVenue from "../../pages/profile/edit";

import Card from "react-bootstrap/Card";

function VenuesCard(props) {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const { id, media } = props;
  return (
    <Card className={styles.card}>
      <div>
        <img src={media} alt="" className={styles.gridImg} />
        <button className={styles.banner} onClick={handleEditClick}>
          Manage
        </button>
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Venue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditVenue venueId={id} handleClose={handleCloseEditModal} />
          </Modal.Body>
        </Modal>
      </div>
    </Card>
  );
}

export default VenuesCard;
