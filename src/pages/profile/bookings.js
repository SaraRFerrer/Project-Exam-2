import React, { useState, useEffect } from "react";
import styles from "../../styles/profile.module.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  console.log(bookings);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}/bookings`;
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div className={styles.bookingsContainer}>
      <h2 className={styles.bookingsH2}>Your Bookings</h2>
      <ul className={styles.bookings}>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookings;
