import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/profile.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditVenue({ venueId }) {
  const [showAlert, setShowAlert] = useState(false);
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

  useEffect(() => {
    // Fetch the details of the venue using the venueId and update the state
    const fetchVenue = async () => {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setName(result.name);
        setImage(result.image);
        setDescription(result.description);
        setPrice(result.price);
        setMaxGuests(result.maxGuests);
        setDateFrom(result.dateFrom);
        setDateTo(result.dateTo);
        setAnimals(result.animals);
        setBreakfast(result.breakfast);
        setParking(result.parking);
        setWifi(result.wifi);
      } catch (error) {
        console.error("There was a problem fetching the venue:", error);
      }
    };
    fetchVenue();
  }, [venueId]);
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      const user = JSON.parse(localStorage.getItem("user"));

      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );

        if (response.ok) {
          setShowAlert(true);
          toast.success("The venue was deleted successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("There was a problem deleting the venue:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
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
    };

    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setShowAlert(true);
        toast.success("Edit was successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        const result = await response.json();
        console.log(result);
      } else {
        throw new Error("network response not ok");
      }
    } catch (error) {
      console.error("There was a problem with the PUT request:", error);
    }
  };

  return (
    <div>
      <h2>Create New Venue</h2>

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
            value={maxGuests}
            onChange={(event) => setMaxGuests(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <label>
            Available from:
            <input
              type="date"
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
              onChange={(event) => setDateTo(event.target.value)}
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
      <Button onClick={handleSubmit}>Save Changes</Button>
      <Button className={styles.deleteBtn} onClick={handleDelete}>
        Delete Venue
      </Button>
      <ToastContainer />
    </div>
  );
}

export default EditVenue;
