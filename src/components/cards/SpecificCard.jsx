import React, { useState } from "react";
import { FaWifi, FaParking, FaDog, FaUtensils, FaBed } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/venue.module.css";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

async function handleBooking({ venueId, dateFrom, dateTo, guests }) {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await fetch(
      "https://api.noroff.dev/api/v1/holidaze/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ venueId, dateFrom, dateTo, guests }),
      }
    );
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

function SpecificCard(props) {
  const { venueId, venue } = props;
  const {
    media,
    name,
    description,
    price,
    meta,
    owner,
    bookings,
    location,
    maxGuests,
  } = venue;
  const [bookingStatus, setBookingStatus] = useState("");
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const navigate = useNavigate();

  if (!Array.isArray(media)) {
    return null;
  }

  const metaIcons = {
    breakfast: <FaUtensils />,
    parking: <FaParking />,
    pets: <FaDog />,
    wifi: <FaWifi />,
  };

  let renderedMeta = null;

  if (meta && Object.keys(meta).length > 0) {
    renderedMeta = Object.entries(meta).map(([key, value]) => {
      const icon = metaIcons[key];
      return (
        <div key={key}>
          <span className={styles.icon}>{icon}</span>
        </div>
      );
    });
  }
  const unavailableDates = bookings
    .map((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);
      const dates = [];
      const currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    })
    .flat();

  function filterDate(date) {
    return !unavailableDates.some(
      (unavailableDate) =>
        date.getFullYear() === unavailableDate.getFullYear() &&
        date.getMonth() === unavailableDate.getMonth() &&
        date.getDate() === unavailableDate.getDate()
    );
  }

  async function handleCheckAvailability() {
    if (
      window.confirm(
        "Are you sure you want to book the venue for the selected dates?"
      )
    ) {
      if (!checkinDate || !checkoutDate) {
        alert("Please select both check-in and check-out dates.");
        return;
      }

      if (!Array.isArray(bookings)) {
        alert("Bookings data is not available.");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.accessToken) {
        alert("please create a user or log in to book the venue");
        navigate("/register");
        return;
      }

      const isAvailable = bookings.every((booking) => {
        const bookingStart = new Date(booking.dateFrom);
        const bookingEnd = new Date(booking.dateTo);
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        if (checkin >= bookingStart && checkin <= bookingEnd) {
          return false;
        }
        if (checkout >= bookingStart && checkout <= bookingEnd) {
          return false;
        }
        return true;
      });
      if (isAvailable) {
        const bookingStatus = await handleBooking({
          venueId,
          dateFrom: checkinDate,
          dateTo: checkoutDate,
          guests: 1,
        });
        setBookingStatus(bookingStatus);
        alert("Venue is Booked");
      } else {
        alert("The venue is not available for the selected dates.");
      }
    }
  }

  return (
    <div>
      <Carousel className={styles.carousel}>
        {media.map((img) => (
          <Carousel.Item key={img}>
            <img
              src={img}
              className={`${styles.venueImg} d-block w-100`}
              alt={name}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className={styles.heading}>
        <h2 className={styles.h2}>{name}</h2>
        <span className={`${styles.icon} ${styles.guests}`}>
          <FaBed /> {maxGuests}
        </span>
      </div>
      <div className={styles.desContainer}>
        <p className={styles.des}>{description}</p>
      </div>

      <div>
        <p className={styles.price}>
          Price per night: <span>${price}</span>
        </p>
      </div>
      <div className={styles.included}>
        <h4>Included</h4>
        <div className={styles.icons}>{renderedMeta}</div>
      </div>
      <div className={styles.availContainer}>
        <h4 className={styles.avilHeading}>Check Availability</h4>

        <div className={styles.availability}>
          <div>
            <h4>Check-In</h4>
            <DatePicker
              selected={checkinDate}
              onChange={(date) => setCheckinDate(date)}
              filterDate={filterDate}
            />
          </div>
          <div>
            <h4>Check-Out</h4>
            <DatePicker
              selected={checkoutDate}
              onChange={(date) => setCheckoutDate(date)}
              filterDate={filterDate}
            />
          </div>
        </div>
        <button className={styles.venueBtn} onClick={handleCheckAvailability}>
          Book Venue
        </button>
      </div>
      <div className={styles.locationContainer}>
        <h3>Location</h3>
        <p>Country: {location.country}</p>
        <p>City: {location.city}</p>
        <p>Address: {location.address}</p>
      </div>
    </div>
  );
}

export default SpecificCard;
