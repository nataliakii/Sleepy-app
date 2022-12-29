/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import {
  GoogleMap,
  LoadScript,
  useLoadScript,
  useJsApiLoader,
  Circle,
} from '@react-google-maps/api';
import Loading from './Loading';
import { fetchLocation } from '../actions';

const containerStyle = {
  width: '900px',
  height: '400px',
  marginLeft: '4%',
};

export default function FindPlayground() {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log(API_KEY);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAPFke-0DvZs8-Yw-IYnj8-Zr7M3G4d8l4',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(fetchLocation());
  };
  const loc = useSelector((state) => state.loc.location || null);
  const [map, setMap] = useState(null);
  return (
    <div
      className="h-100 p-5 text-white bg-dark main-container-center"
      style={{
        position: 'absolute',
        display: 'inline-block',
        width: '84%',
        marginTop: '5%',
      }}
    >
      <Button
        variant="primary"
        type="button"
        className="main-button personal display-block art-centered"
        onClick={handleClick}
      >
        Get Your Location
      </Button>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={loc}
          zoom={15}
          // onLoad={(map) => {
          //   const bounds = new window.google.maps.LatLngBounds(loc);
          //   map.fitBounds(bounds);
          // }}
          // onUnmount={() => {
          //   setMap(null);
          // }}
        >
          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      ) : (
        <Loading />
      )}
    </div>
  );
}
