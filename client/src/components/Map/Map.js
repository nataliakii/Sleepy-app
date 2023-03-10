import React, { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import Loading from "../Loading";
import Distance from "./Distance";
import Error from "../Error";
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
const options = {
  styles: mapStyles,
  clickableIcons: false,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB0xtT-PgDUe0Q3-PFFMnBxCLjXoTWUY5Q",
    libraries,
  });
  const dispatch = useDispatch();
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    function success(pos) {
      const coordinates = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setCenter(coordinates);
    }
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  const [center, setCenter] = useState();
  const [directions, setDirections] = useState();
  const playgrounds = useSelector((state) => state.playgrounds);

  const fetchDirections = (marker) => {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: center,
        destination: { lat: marker.lat, lng: marker.lng },
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  // useEffect(() => {
  //   // dispatch(fetchLocation());
  //   function success(pos) {
  //     const coordinates = {
  //       lat: pos.coords.latitude,
  //       lng: pos.coords.longitude,
  //     };
  //     setCenter(coordinates);
  //   }
  //   navigator.geolocation.getCurrentPosition(success);
  // }, []);

  // const center = useMemo(() => ({ lat: loc.lat, lng: loc.lng }), [loc]);

  const [selected, setSelected] = useState(null);
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
      {directions ? (
        <Distance leg={directions.routes[0].legs[0]} />
      ) : (
        <p>Use map to find nearby playgrounds</p>
      )}
      {center ? <Locate panTo={panTo} loc={center} /> : <Loading />}

      {loadError ? (
        <Error />
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          options={options}
          onLoad={onMapLoad}
        >
          {directions ? (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "#bf1650",
                },
              }}
            />
          ) : null}
          {playgrounds.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
                fetchDirections(marker);
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
                setDirections(null);
              }}
            >
              <>
                {/* <p className="anchor">
                  <img src={fetchPhoto(selected.photoLink)} />{" "}
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
                <div id="info-window">
                  {" "}
                  {directions ? (
                    <Distance leg={directions.routes[0].legs[0]} />
                  ) : null}
                </div>
              </>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      )}
    </div>
  );
}
