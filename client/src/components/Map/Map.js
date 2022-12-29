/* eslint-disable react/prop-types */
import React, { useState, useCallback, useRef } from 'react';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

import mapStyles from './mapStyles';
import Loading from '../Loading';
import Error from '../Error';
import Search from './Search';
import Locate from './Locate';

const libraries = ['places'];
const containerStyle = {
  width: '100%',
  maxWidth: '950px',
  height: '400px',
  Left: '4%',
  marginTop: '2%',
};
const center = {
  lat: 49,
  lng: 13,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPFke-0DvZs8-Yw-IYnj8-Zr7M3G4d8l4",
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);
  if (loadError) return <Error />;
  if (!isLoaded) return <Loading />;

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
      <p>Use map to find nearby playgrounds</p>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {' '}
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: '/icon.svg',
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <h6>Spot this playground! </h6>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
