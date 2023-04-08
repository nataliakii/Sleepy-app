import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaygrounds, fetchDistances } from "../../actions";
import { mapObjForDistances } from "../../hooks/mapObjForDistances";
import Distance from "./Distance";
import { styled, Button, Typography } from "@mui/material/";

const CustomButton = styled(Button)(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.text.light,
  fontWeight: 100,
  "&:hover": {
    color: "#bf1650",
    backgroundColor: "transparent",
  },
  "&:active": {
    transition: "0.3s all ",
    transform: "translateY(3px) ",
    border: "1px solid transparent",
    opacity: "0.8 ",
  },
}));

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
      <CustomButton
        variant="contained"
        size="large"
        sx={{ ml: 1.8 }}
        onClick={() => setCoords()}
      >
        Find nearby playgrounds
      </CustomButton>
      {string ? (
        <Typography sx={{ mt: 4, color: "error.dark" }}>
          Here are {playgrounds.length} playgrounds we found nearby :
        </Typography>
      ) : null}
    </div>
  );
}
