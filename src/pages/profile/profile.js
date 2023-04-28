import React from "react";
import Avatar from "./avatar";
import Bookings from "./bookings";
import CreateVenue from "./create";
import UserVenues from "./venues";
import styles from "../../styles/profile.module.css";

function Profile() {
  return (
    <div>
      <h1>Profile Page </h1>
      <Avatar />
      <Bookings />
      <CreateVenue />
      <UserVenues />
    </div>
  );
}

export default Profile;
