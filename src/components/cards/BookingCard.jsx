import React from "react";
import styles from "../../styles/profile.module.css";
import Card from "react-bootstrap/Card";

function BookingsCard(props) {
  const { id, venue, media, dateFrom, dateTo } = props;
  console.log(media);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };
  return (
    <Card className={styles.bookingsCard}>
      <div>
        <img src={media} alt="" className={styles.bookingsImg} />
        <h4 className={styles.bookingsDate}>
          {formatDate(dateFrom)} - {formatDate(dateTo)}
        </h4>
      </div>
    </Card>
  );
}

export default BookingsCard;
