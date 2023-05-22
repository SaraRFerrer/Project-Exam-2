import React, { useState, useEffect } from "react";
import styles from "../../styles/profile.module.css";
import BookingsCard from "../../components/cards/BookingCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  console.log(bookings);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}/bookings?_venue=true`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      });
  }, []);

  return (
    <div className={styles.bookingsContainer}>
      <h2 className={styles.bookingsH2}>Your Upcoming Bookings</h2>
      <Container fluid>
        <Row className={styles.grid}>
          {bookings.map((venue) => (
            <Col xs={12} sm={6} md={4} lg={3} key={venue.id}>
              <BookingsCard
                media={venue.media}
                id={venue.id}
                dateTo={venue.dateTo}
                dateFrom={venue.dateFrom}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Bookings;
