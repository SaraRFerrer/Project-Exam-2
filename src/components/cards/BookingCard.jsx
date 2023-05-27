import React from "react";
import styles from "../../styles/profile.module.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function BookingsCard(props) {
  const { id, media, dateFrom, dateTo } = props;

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
        <Link to={`/specific/${id}`} className={styles.viewBtn}>
          VIEW
        </Link>
      </div>
    </Card>
  );
}

export default BookingsCard;
