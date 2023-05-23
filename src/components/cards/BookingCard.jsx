import React from "react";
import styles from "../../styles/profile.module.css";
import Card from "react-bootstrap/Card";

function BookingsCard(props) {
  const { id, media = [], dateFrom, dateTo } = props;
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
        {media.length > 0 && (
          <img src={media[0]} alt="" className={styles.bookingsImg} />
        )}
        <h4 className={styles.bookingsDate}>
          {formatDate(dateFrom)} - {formatDate(dateTo)}
        </h4>
      </div>
    </Card>
  );
}

export default BookingsCard;
