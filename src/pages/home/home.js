import React from "react";
import RecentVenues from "./recent";
import styles from "../../styles/home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <RecentVenues />
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
