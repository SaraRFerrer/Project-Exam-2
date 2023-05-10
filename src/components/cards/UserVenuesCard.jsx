import React, { useState } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import styles from "../../styles/recent.module.css";
import EditVenue from "../../pages/profile/edit";
import VenueBookings from "../../pages/profile/venueBookings";
import Card from "react-bootstrap/Card";

function VenuesCard(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBookingsDropdown, setShowBookingsDropdown] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleBookingsClick = () => {
    setShowBookingsDropdown(!showBookingsDropdown);
  };
  const { id, media } = props;
  return (
    <Card className={styles.card}>
      <div>
        <img src={media} alt="" className={styles.gridImg} />
        <button className={styles.banner} onClick={handleEditClick}>
          Manage
        </button>
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            id={`bookings-dropdown-${id}`}
            className={styles.bookingsBtn}
            onClick={handleBookingsClick}
          >
            Bookings
          </Dropdown.Toggle>
          <Dropdown.Menu show={showBookingsDropdown}>
            <Dropdown.Item>
              <VenueBookings venueId={id} />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

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
