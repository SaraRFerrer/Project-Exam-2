import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/recent.module.css";

import Card from "react-bootstrap/Card";

function VenuesCard(props) {
  const { id, media } = props;
  return (
    <Card className={styles.card}>
      <div>
        <img src={media} alt="" className={styles.gridImg} />
        <Link to={`props/${id}`} className={styles.banner}>
          VIEW
        </Link>
      </div>
    </Card>
  );
}

export default VenuesCard;
