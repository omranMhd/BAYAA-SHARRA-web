import React from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "../Components/NavBar";

function Profile() {
  return (
    <>
      <NavBar />
      <h1>Profile</h1>
      <div>
        <Link to="my-info">my info</Link>
        <Link to="my-ads">my ads</Link>
        <Link to="favorates-ads">favorates-ads</Link>
      </div>
      <Outlet />
    </>
  );
}

export default Profile;
