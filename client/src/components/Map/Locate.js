import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchPlaygrounds, fetchDistances } from "../../actions";
import { mapObjForDistances } from "../../hooks/mapObjForDistances";
import Distance from "./Distance";

export default function Locate({ panTo, loc, leg }) {
  const dispatch = useDispatch();
  const [string, setString] = useState(false);
  console.log("render Locate, loc is :", loc);

  const playgrounds = useSelector((state) => state.playgrounds);
  const setCoords = () => {
    const { lat } = loc;
    const { lng } = loc;
    setString(true);
    panTo({ lat, lng });
    dispatch(fetchPlaygrounds(loc));
  };

  return (
    <div>
      <Button
        variant="primary"
        type="button"
        className="main-button personal display-block art-centered"
        onClick={() => setCoords()}
      >
        Find nearby playgrounds
      </Button>
      {string ? (
        <h6 className="display-10">
          Here are {playgrounds.length} playgrounds we found nearby :
        </h6>
      ) : null}
    </div>
  );
}
