import React, { useState, useEffect } from "react";
import styles from "../../styles/profile.module.css";
import UserVenuesCard from "../../components/cards/UserVenuesCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function UserVenues() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [venues, setVenues] = useState([]);
  console.log(venues);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const url = `https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}/venues`;
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
            setVenues(data);
          } else {
            setVenues([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching Venues:", error);
          setVenues([]);
        });
    }
  }, []);

  if (user && user.venueManager) {
    return (
      <div className={styles.venuesContainer}>
        <h2 className={styles.venuesHeader}>Your Venues</h2>
        <Container fluid>
          <Row className={styles.grid}>
            {venues.map((venue) => (
              <Col xs={12} sm={6} md={6} lg={4} key={venue.id}>
                <UserVenuesCard media={venue.media} id={venue.id} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  } else {
    return null;
  }
}

export default UserVenues;
