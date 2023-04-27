import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/profile.module.css";

function CreateVenue() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [guests, setGuests] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [animals, setAnimals] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [parking, setParking] = useState(false);
  const [wifi, setWifi] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const data = {
      name,
      description,
      price,
      animals,
      breakfast,
      parking,
      wifi,
    };

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      // Do something with the result of the POST request
      console.log(result);
    } catch (error) {
      console.error("There was a problem with the POST request:", error);
    }
  };

  return (
    <div>
      <div className={styles.createContainer}>
        <button className={styles.createBtn} onClick={() => setShowModal(true)}>
          Create New Venue
        </button>
      </div>
      <Modal
        className={styles.modal}
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Venue Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Venue name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Venue Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Venue Image Url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price per night</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="guests">
              <Form.Label>Max Guests</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Max Guests"
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <label>
                Available from:
                <input
                  type="date"
                  value={availableFrom}
                  onChange={(event) => setAvailableFrom(event.target.value)}
                />
              </label>
            </Form.Group>

            <Form.Group controlId="animals">
              <Form.Check
                type="checkbox"
                label="Pets allowed"
                checked={animals}
                onChange={(event) => setAnimals(event.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="breakfast">
              <Form.Check
                type="checkbox"
                label="Breakfast"
                checked={breakfast}
                onChange={(event) => setBreakfast(event.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="parking">
              <Form.Check
                type="checkbox"
                label="Parking"
                checked={parking}
                onChange={(event) => setParking(event.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="wifi">
              <Form.Check
                type="checkbox"
                label="Wifi"
                checked={wifi}
                onChange={(event) => setWifi(event.target.checked)}
              />
            </Form.Group>
          </Form>
          <Button onClick={handleSubmit}>Create Venue</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateVenue;
