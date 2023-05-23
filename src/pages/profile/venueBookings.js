import React, { useState, useEffect } from "react";
import styles from "../../styles/profile.module.css";

function VenueBookings({ venueId }) {
  const [bookings, setBookings] = useState([]);

  console.log(bookings);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const url = `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}/?_bookings_true`;
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
  }, [venueId]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div>
      {bookings.length === 0 ? (
        <p>No bookings</p>
      ) : (
        <ul className={styles.bookings}>
          {bookings.map((booking) => (
            <li key={booking.id}>
              {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VenueBookings;
