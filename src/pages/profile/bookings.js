import React, { useState, useEffect } from "react";

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

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.date} - {booking.venue}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookings;
