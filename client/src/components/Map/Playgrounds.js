import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Playgrounds({ onFindNearby }) {
  const playgrounds = useSelector((state) => state.playgrounds);
  return <div> {playgrounds ? onFindNearby(playgrounds) : null}</div>;
}
