import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import mapStyles from "./mapStyles";
import Loading from "../Loading";
import Error from "../Error";
import Search from "./Search";
import Locate from "./Locate";

const libraries = ["marker"];
const containerStyle = {
  width: "100%",
  maxWidth: "1050px",
  minWidth: "400px",
  height: "400px",
  Left: "4%",
  marginTop: "2%",
};
const center = {
  lat: 35.787743,
  lng: -78.644257,
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
  // const [markers, setMarkers] = useState([{ lat: 3, lng: -10, id: "12312" }]);
  const playgrounds = useSelector((state) => state.playgrounds);
  // useEffect(() => {
  //   setMarkers(playgrounds);
  //   console.log(playgrounds);
  // }, []);

  const [selected, setSelected] = useState(null);
  // const onMapClick = useCallback((e) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       id: new Date().toISOString(),
  //     },
  //   ]);
  // }, []);
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);

  if (!isLoaded) return <Loading />;

  return (
    <div
      className="h-100 p-5 text-white bg-dark main-container-center"
      style={{
        position: "absolute",
        display: "inline-block",
        width: "84%",
        marginTop: "5%",
      }}
    >
      <p>Use map to find nearby playgrounds</p>
      <Locate panTo={panTo} />
      {/* <Search panTo={panTo} /> */}
      {!isLoaded ? <Loading /> : null}
      {loadError ? (
        <Error />
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          options={options}
          // onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {" "}
          {playgrounds.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
              animation={2}
              icon={{
                url: "/swingIcon.svg",
                scaledSize: new window.google.maps.Size(25, 25),
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
              <>
                {/* <p className="anchor">
                  <img src={selected.photo} />{" "}
                </p> */}
                {selected.address ? (
                  <p className="anchor">
                    <strong>Address :</strong>
                    {selected.address}
                  </p>
                ) : (
                  <p className="anchor">
                    <strong> Vicinity : </strong> {selected.vicinity}{" "}
                  </p>
                )}

                <p className="anchor">
                  <strong> Link : </strong>{" "}
                  <a href={selected.link} target="_blank">
                    Here
                  </a>{" "}
                </p>
              </>
            </InfoWindow>
          ) : null}
          {/* <Marker
            key={current.id}
            position={{ lat: current.lat, lng: current.lng }}
            icon={{
              url: "/slideIcon.svg",
              scaledSize: new window.google.maps.Size(25, 25),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
          <h6>You are here! </h6> */}
        </GoogleMap>
      )}
    </div>
  );
}
