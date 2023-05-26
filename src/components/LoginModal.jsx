import React, { useState } from "react";
import Register from "../pages/register/register";
import CustomNavbar from "./Header";

function LoginModal() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginModalToggle = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <>
      <Register handleLoginModalToggle={handleLoginModalToggle} />
      <CustomNavbar
        showLoginModal={showLoginModal}
        handleLoginModalToggle={handleLoginModalToggle}
      />
    </>
  );
}

export default LoginModal;
