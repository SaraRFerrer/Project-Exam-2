import { style } from "dom-helpers";
import React, { useState, useEffect } from "react";
import styles from "../../styles/profile.module.css";

function Avatar() {
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser.avatar);

    if (storedUser) {
      setAvatar(storedUser.avatar);
      setUserName(storedUser.name);
    }
  }, []);

  return (
    <div>
      <div className={styles.avatarContainer}>
        {avatar ? (
          <img src={avatar} alt="Avatar" className={styles.avatar} />
        ) : (
          <div>
            <img src="https://unsplash.com/photos/iMdsjoiftZo" />{" "}
          </div>
        )}
      </div>
      <div>
        <h4 className={styles.username}>{userName}</h4>
      </div>
    </div>
  );
}

export default Avatar;
