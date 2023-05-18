import React from "react";
import Avatar from "./avatar";
import Bookings from "./bookings";
import CreateVenue from "./create";
import UserVenues from "./venues";
import styles from "../../styles/profile.module.css";

function Profile() {
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>Profile Page </h1>
        </div>
      </div>
      <Avatar />
      <Bookings />
      <CreateVenue />
      <UserVenues />
    </div>
  );
}

export default Profile;
