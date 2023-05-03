import React from "react";
import Avatar from "./avatar";
import Bookings from "./bookings";
import CreateVenue from "./create";
import UserVenues from "./venues";

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
