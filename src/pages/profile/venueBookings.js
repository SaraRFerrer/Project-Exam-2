import React, { useState, useEffect } from "react";
import styles from "../../styles/profile.module.css";

function VenueBookings({ venueId }) {
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const url = `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}/?_bookings=true`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.bookings);
        if (Array.isArray(data.bookings)) {
          setBookings(data.bookings);
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
  console.log(bookings);
  return (
    <div>
      {bookings.length === 0 ? (
        <p>No bookings</p>
      ) : (
        <table className={styles.bookings}>
          <thead>
            <tr>
              <th>Guests</th>
              <th>Date From</th>
              <th>Date To</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <th>{booking.guests}</th>
                <td>{formatDate(booking.dateFrom)}</td>
                <td>{formatDate(booking.dateTo)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VenueBookings;
