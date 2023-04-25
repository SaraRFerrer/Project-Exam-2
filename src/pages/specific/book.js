import React, { useState } from "react";

function HandleBooking({ id, checkinDate, checkoutDate, isAvailable }) {
  const [bookingStatus, setBookingStatus] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "/login";
    return;
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

  return handleBooking;
}

export default HandleBooking;