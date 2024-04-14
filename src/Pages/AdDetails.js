import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";

function AdDetails() {
  let params = useParams();
  return (
    <>
      <NavBar />
      <h1>AdDetails</h1>
      <div>ad number: {params.adId}</div>
    </>
  );
}

export default AdDetails;
