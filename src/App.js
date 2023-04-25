import React from "react";
import { Routes, Route } from "react-router-dom";

/* Pages */
import Layout from "./components/Layout";
import Home from "./pages/home/home";
import LogIn from "./pages/LogIn/login";
import Register from "./pages/register/register";
import Venue from "./pages/specific/specific";
import Venues from "./pages/venues/venues";
import Profile from "./pages/profile/profile";
import RouteNotFound from "./pages/notfound/notfound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="venues" element={<Venues />} />
        <Route path="specific/:id" element={<Venue />} />
        <Route path="*" element={<RouteNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
