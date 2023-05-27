import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/profile.module.css";

function CreateVenue() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [animals, setAnimals] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [parking, setParking] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user.venueManager === false) {
      alert("Become a Venue Manager to create a new Venue");
      return;
    }

    const data = {
      name,
      description,
      price: parseInt(price),
      animals,
      breakfast,
      parking,
      wifi,
      dateTo,
      dateFrom,
      maxGuests: parseInt(maxGuests),
      city,
      address,
      continent,
      country,
      zip,
    };

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/venues",
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
      console.log(response.status);
      if (response.status === 403) {
        alert("Become a Venue Manager to create a new Venue");
        return;
      }

      const result = await response.json();

      console.log(result);
      if (response.status === 201) {
        alert("Venue created successfully!");
        setTimeout(() => {
          window.location.replace("/profile");
        }, 2000);
      }
    } catch (error) {
      console.error("There was a problem with the POST request:", error);
    }
  };
  if (user && user.venueManager) {
    return (
      <div>
        <div className={styles.createContainer}>
          <h3>Create a New Venue</h3>
          <p>
            As a VenueManager you have the ability to create and rent out your
            own venues. You will be able to manage your venues.
          </p>
          <button
            className={styles.createBtn}
            onClick={() => setShowModal(true)}
          >
            Create New Venue
          </button>
        </div>
        <Modal
          className={styles.modal}
          dialogClassName={styles.modalWide}
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>Create New Venue</Modal.Header>
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
                  className={styles.description}
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price per night</Form.Label>
                <Form.Control
                  className={styles.price}
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="guests">
                <Form.Label>Max Guests</Form.Label>
                <Form.Control
                  className={styles.price}
                  type="number"
                  placeholder="Enter Max Guests"
                  value={maxGuests}
                  onChange={(event) => setMaxGuests(event.target.value)}
                />
              </Form.Group>
              <h4>Choose Availability</h4>
              <div className={styles.dates}>
                <Form.Group>
                  <label>
                    Available from:
                    <input
                      type="date"
                      min={today}
                      value={dateFrom}
                      onChange={(event) => setDateFrom(event.target.value)}
                    />
                  </label>
                </Form.Group>
                <Form.Group>
                  <label>
                    Available To:
                    <input
                      type="date"
                      value={dateTo}
                      min={today}
                      onChange={(event) => setDateTo(event.target.value)}
                    />
                  </label>
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="continent">
                  <Form.Label>Continent</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Continent"
                    value={continent}
                    onChange={(event) => setContinent(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Country"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="zip">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Zip Code"
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                  />
                </Form.Group>
              </div>

              <Form.Group className={styles.checkbox} controlId="animals">
                <Form.Check
                  type="checkbox"
                  label="Pets allowed"
                  checked={animals}
                  onChange={(event) => setAnimals(event.target.checked)}
                />
              </Form.Group>

              <Form.Group className={styles.checkbox} controlId="breakfast">
                <Form.Check
                  type="checkbox"
                  label="Breakfast"
                  checked={breakfast}
                  onChange={(event) => setBreakfast(event.target.checked)}
                />
              </Form.Group>

              <Form.Group className={styles.checkbox} controlId="parking">
                <Form.Check
                  type="checkbox"
                  label="Parking"
                  checked={parking}
                  onChange={(event) => setParking(event.target.checked)}
                />
              </Form.Group>
              <Form.Group className={styles.checkbox} controlId="wifi">
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
  } else {
    return (
      <div>
        <div className={styles.createContainer}>
          <p>
            Become a VenueManager by registering as a new user. VenueManagers
            can create and manage venues!
          </p>
          <Link to="/register">
            <button className={styles.createBtn} onClick={showModal}>
              Register
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CreateVenue;
