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
    if (user && isAvailable) {
      try {
        const response = await fetch("https://api.noroff.dev/api/v1/holidaze/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
              Authorization: "Bearer " + user.token,
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