import React, { useState } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import styles from "../../styles/recent.module.css";
import EditVenue from "../../pages/profile/edit";
import VenueBookings from "../../pages/profile/venueBookings";
import Card from "react-bootstrap/Card";

function VenuesCard(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBookings, setShowBookings] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleBookingsClick = () => {
    setShowBookings(true);
  };

  const handleBookingsClose = () => {
    setShowBookings(false);
  };

  const { id, media, bookings, dateFrom, dateTo } = props;

  return (
    <Card className={styles.card}>
      <div>
        <img src={media} alt="" className={styles.gridImg} />
        <button className={styles.manageBtn} onClick={handleEditClick}>
          Manage
        </button>
        <button className={styles.bookingsBtn} onClick={handleBookingsClick}>
          Bookings
        </button>
        <Modal show={showBookings} onHide={handleBookingsClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bookings on your venue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <VenueBookings
              venueId={id}
              bookings={bookings}
              dateFrom={dateFrom}
              dateTo={dateTo}
              handleClose={handleBookingsClose}
            />
          </Modal.Body>
        </Modal>

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
