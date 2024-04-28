import React from "react";
// import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // ====================to delete====================================
  // const userState = useSelector((state) => {
  //   if (state.token === "" && Object.keys(state.user).length === 0) {
  //     return "userUnLogin"
  //   } else {
  //     if (
  //       state.user.email_verified_at == null &&
  //       state.user.phone_verified_at == null
  //     ) {
  //       return "acountUnverified"
  //     }
  //     return "userLogin"
  //   }
  // })
  // userState values should be : "userUnLogin" or "acountUnverified" or  "userLogin"

  const userState = "userLogin";

  let location = useLocation();

  if (userState === "userUnLogin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (userState === "acountUnverified") {
    return (
      <Navigate to="/verevication-code" state={{ from: location }} replace />
    );
  }
  return children;
};

export default ProtectedRoute;
