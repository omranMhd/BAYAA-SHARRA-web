import Box from "@mui/material/Box";
import { useState, useEffect, useContext } from "react";

function PhotoSlide({ img }) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup listener on unmount
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
  return (
    <Box
      sx={{
        // height: "460px",
        height: width < 900 ? "260px" : "460px",
        // width: "930px",
        // backgroundImage:
        //   "url(https://source.unsplash.com/random?wallpapers)",
        backgroundImage: `url(${img})`, // Set the background image
        backgroundSize: "cover", // Cover the entire Box with the image
        backgroundPosition: "center",
        borderRadius: "10px",
        margin: "10px",
      }}
    ></Box>
  );
}

export default PhotoSlide;
