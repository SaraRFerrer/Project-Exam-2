import React, { useState } from "react";
import styles from "../../styles/venue.module.css";

function HandleBooking({ id, checkinDate, checkoutDate, isAvailable }) {
  const [bookingStatus, setBookingStatus] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "/login";
    return null;
  }

  async function handleBooking() {
    if (isAvailable) {
      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            venueId: id,
            startDate: checkinDate.toISOString(),
            endDate: checkoutDate.toISOString(),
          }),
        });
        if (response.ok) {
          setBookingStatus("success");
        } else {
          setBookingStatus("error");
        }
      } catch (error) {
        console.error(error);
        setBookingStatus("error");
      }
    } else {
      setBookingStatus("unavailable");
    }
  }

  return (
    <button className={styles.venueBtn} onClick={handleBooking}>
      Book Venue
    </button>
  );
}

export default HandleBooking;