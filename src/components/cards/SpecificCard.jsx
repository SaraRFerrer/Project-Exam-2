import React, { useState } from "react";
import { FaWifi, FaParking, FaDog, FaUtensils } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/venue.module.css";
import HandleBooking from "../../pages/specific/book";

function SpecificCard(props) {
  const { media, name, description, price, meta, owner, bookings } = props;
  const [bookingStatus, setBookingStatus] = useState("");

  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);

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
          <span>{icon}</span>
        </div>
      );
    });
  }

  async function handleCheckAvailability() {
    if (!checkinDate || !checkoutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    if (!Array.isArray(bookings)) {
      alert("Bookings data is not available.");
      return;
    }

    const isAvailable = !bookings.some((booking) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      return (
        (checkinDate >= bookingStart && checkinDate <= bookingEnd) ||
        (checkoutDate >= bookingStart && checkoutDate <= bookingEnd)
      );
    });
    if (isAvailable) {
      const bookingStatus = await HandleBooking({
        startDate: checkinDate,
        endDate: checkoutDate,
      });
      setBookingStatus(bookingStatus);
    } else {
      alert("The venue is not available for the selected dates.");
    }
  }

  return (
    <div>
      <h2>{name}</h2>
      <div className={styles.imgContainer}>
        {media.map((img) => (
          <img src={img} className={styles.venueImg} />
        ))}
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
            />
          </div>
          <div>
            <h4>Check-Out</h4>
            <DatePicker
              selected={checkoutDate}
              onChange={(date) => setCheckoutDate(date)}
            />
          </div>
        </div>
        <button className={styles.venueBtn} onClick={handleCheckAvailability}>
          Check
        </button>
      </div>

      <div className={styles.bookContainer}>
        <button
          className={styles.venueBtn}
          onClick={async () => {
            const bookingStatus = await HandleBooking(false);
            setBookingStatus(bookingStatus);
          }}
        >
          Book Venue
        </button>
        {bookingStatus === "unavailable" && (
          <p className={styles.errorMsg}>
            This venue is not available for the selected dates.
          </p>
        )}
        {bookingStatus === "success" && (
          <p className={styles.successMsg}>Booking successful!</p>
        )}
        {bookingStatus === "error" && (
          <p className={styles.errorMsg}>
            There was an error processing your booking. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}

export default SpecificCard;
