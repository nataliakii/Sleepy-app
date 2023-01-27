import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchPlaygrounds, fetchLocation } from "../../actions";
import Playgrounds from "./Playgrounds";

export default function Locate({ panTo, onFindNearby }) {
  const dispatch = useDispatch();

  const getCoords = () => {
    function success(pos) {
      const coordinates = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
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
      <Playgrounds onFindNearby={onFindNearby} />
    </div>
  );
}
