import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";

const MapContainer = ({ cityLocation, setLocationValues }) => {
  console.log("city :", cityLocation);

  const [center, setCenter] = useState({
    lat: 33.513805,
    lng: 36.276527,
  });

  useEffect(() => {
    if (cityLocation !== undefined) {
      setCenter({ lat: cityLocation?.lat, lng: cityLocation?.lng });
      setLocationValues(center);
    }
  }, [cityLocation]);

  const containerStyle = {
    width: "100%", // Fixed width in pixels
    height: "400px",
    borderRadius: "20px" /* Adjust this value to control the roundness */,
    overflow:
      "hidden" /* Ensures the map content is clipped to the rounded corners */,
  };

  const handleMapClick = (newPosition) => {
    console.log("ggggggggg :", newPosition.latLng.toJSON());

    setCenter(newPosition.latLng.toJSON());
    setLocationValues(center);
    console.log("ggggggggg1 :", center);
    // setMarkerPosition(newPosition.coords);
    // if (markerRef.current) {
    //   markerRef.current.setPosition(newPosition.coords);
    // }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyC3pAbk5F8mVSuzWNTukfOVfh3IGTi-chE">
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={8}
        center={center}
        onClick={handleMapClick}
      >
        <Marker
          key={`marker-${Math.random()}`}
          draggable={true}
          //   position={{ lat: 33.3851, lng: 36.1734 }}
          position={center}
          onDragEnd={(event) => {
            const newPosition = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            };
            console.log("location :", newPosition);
            setCenter(newPosition);
            setLocationValues(center);
          }}
          //   icon={'/BAYAASHARRA.ico'} // Use your custom icon here
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
