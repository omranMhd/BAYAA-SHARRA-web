import React from "react";
import { Link } from "react-router-dom";

// this temporary navbar for test purposes
function NavBar() {
  return (
    <div>
      <Link style={{ margin: "12px" }} to="/">
        home
      </Link>
      <Link style={{ margin: "12px" }} to="/login">
        Login
      </Link>
      <Link style={{ margin: "12px" }} to="/register">
        Register
      </Link>
      <Link style={{ margin: "12px" }} to="/profile">
        profile
      </Link>
      <Link style={{ margin: "12px" }} to="/verevication-code">
        verevication-code
      </Link>
      <Link style={{ margin: "12px" }} to="/new-ad">
        new-ad
      </Link>
    </div>
  );
}

export default NavBar;
