import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/recent.module.css";
import { FaBed } from "react-icons/fa";
import Card from "react-bootstrap/Card";

function VenuesCard(props) {
  const { id, media, maxGuests, price } = props;

  return (
    <Card className={styles.card}>
      <div>
        <img src={media} alt="" className={styles.gridImg} />
        <Link to={`/specific/${id}`} className={styles.banner}>
          VIEW
        </Link>
        <span className={`${styles.icon} ${styles.guests}`}>
          <FaBed /> {maxGuests}
        </span>
        <p>$Per Night: {price}</p>
      </div>
    </Card>
  );
}

export default VenuesCard;
