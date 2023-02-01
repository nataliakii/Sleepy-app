import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchPlaygrounds, fetchLocation } from "../../actions";

export default function Locate({ panTo, setCoords }) {
  const dispatch = useDispatch();
  const playgrounds = useSelector((state) => state.playgrounds);
  const [string, setString] = useState(false);
  const getCoords = () => {
    function success(pos) {
      const coordinates = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setString(true);
      setCoords(coordinates);
      panTo({
        lat: coordinates.lat,
        lng: coordinates.lng,
      });
      dispatch(
        fetchPlaygrounds({
          lat: coordinates.lat,
          lng: coordinates.lng,
        })
      );
    }
    navigator.geolocation.getCurrentPosition(success);
  };

  return (
    <div>
      <Button
        variant="primary"
        type="button"
        className="main-button personal display-block art-centered"
        onClick={() => getCoords()}
      >
        Locate me
      </Button>
      {string ? (
        <h6 className="display-10">
          Here are {playgrounds.length} playgrounds we found nearby :
        </h6>
      ) : null}
    </div>
  );
}
