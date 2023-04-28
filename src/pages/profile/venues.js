import React, { useState, useEffect } from "react";
import styles from "../../styles/profile.module.css";
import UserVenuesCard from "../../components/cards/UserVenuesCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function UserVenues() {
  const [venues, setVenues] = useState([]);

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

  return (
    <div>
      <h2>Your Venues</h2>
      <Container fluid>
        <Row className={styles.grid}>
          {venues.map((venue) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={venue.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <UserVenuesCard media={venue.media} id={venue.id} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default UserVenues;
