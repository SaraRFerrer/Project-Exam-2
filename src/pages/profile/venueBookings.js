import React, { useState, useEffect } from "react";
import styles from "../../styles/profile.module.css";
import { useParams } from "react-router-dom";

function VenueBookings() {
  const [bookings, setBookings] = useState([]);
  const params = useParams();
  console.log(bookings);

  useEffect(() => {
    const url = `https://api.noroff.dev/api/v1/holidaze/bookings/${params.id}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`,
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
  }, [params.id]);

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
