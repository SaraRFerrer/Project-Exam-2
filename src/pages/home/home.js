import React from "react";
import RecentVenues from "./recent";
import styles from "../../styles/home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <RecentVenues />
      <div className={styles.container}>
        <h3>Explore new Destinations</h3>
        <p>
          Explore amongst thousands of holiday destinations. Holidaze offers a
          wide range of accommodations to fit your needs. Search through
          everything from Hotels, Apartments, Resorts to Houses.
        </p>
      </div>
      <div className={styles.bannerContainer}>
        <div className={styles.homeBanner}>
          <h2>FIND YOUR VENUE</h2>
          <Link to="/venues">
            <button className={styles.bannerBtn}>HERE</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
