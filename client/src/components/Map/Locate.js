import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Loading from "../Loading";

export default function Locate({ panTo }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div>
      <Button
        variant="primary"
        type="button"
        className="main-button personal display-block art-centered"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null,
            setLoading(true)
          );
        }}
      >
        Locate me
      </Button>
    </div>
  );
}
