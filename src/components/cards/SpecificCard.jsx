import React, { useState } from "react";
import { FaWifi, FaParking, FaDog, FaUtensils } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/venue.module.css";
import handleBooking from "../../pages/specific/book";

function SpecificCard(props) {
  const { venueId, venue } = props;
  const { media, name, description, price, meta, owner, bookings } = venue;
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
      const shouldBook = window.confirm(
        "The venue is available for the selected dates. Do you want to book it now?"
      );
      if (shouldBook) {
        const bookingStatus = await handleBooking({
          venueId,
          dateFrom: checkinDate,
          dateTo: checkoutDate,
          guests: 1,
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
          <button className={styles.venueBtn} onClick={handleCheckAvailability}>
            Check Availability &amp; Book
          </button>
        </div>
      </div>
    );
  }
}

export default SpecificCard;
