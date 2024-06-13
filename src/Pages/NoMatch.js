import React from "react";
import MainAppBar from "../Components/MainAppBar";

function NoMatch() {
  return (
    <>
      <MainAppBar />
      <img alt="page not found" src="/404.png" width={"100%"} />{" "}
    </>
  );
}

export default NoMatch;
