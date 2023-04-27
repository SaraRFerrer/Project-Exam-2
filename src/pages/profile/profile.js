import React from "react";
import Avatar from "./avatar";
import Bookings from "./bookings";
import CreateVenue from "./create";
import styles from "../../styles/profile.module.css";

function Profile() {
  return (
    <div>
      <h1>Profile Page </h1>
      <Avatar />
      <Bookings />
      <CreateVenue />
    </div>
  );
}

export default Profile;
