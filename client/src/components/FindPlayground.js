/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocation } from '../actions';
import Map from './Map';

export default function FindPlayground() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loc = useSelector((state) => state.loc.location);
  const err = useSelector((state) => state.loc.error);
  const handleClick = () => {
    dispatch(fetchLocation(() => history.push('/find-playground')));
  };
  const LocErrorDisplay = () => {
    if (loc?.lat) {
      return (
        <div className="centered">
          Your location is: lat: {loc.lat} and lon: {loc.lon}{' '}
        </div>
      );
    }
    if (err) return <div className="error-message centered">{err}</div>;
  };

  const render = (status = Status) => <h1>{status}</h1>;

  return (
    <div
      className="h-100 p-5 text-white bg-dark main-container-center"
      style={{
        position: 'absolute',
        display: 'inline-block',
        width: '81%',
        marginTop: '5%',
      }}
    >
      <Button
        variant="primary"
        type="button"
        className="centered-button"
        onClick={handleClick}
      >
        Get Your Location
      </Button>
      {LocErrorDisplay()}

      <Wrapper apiKey="AIzaSyAPFke-0DvZs8-Yw-IYnj8-Zr7M3G4d8l4" render={render}>
        <Map loc={loc} />
      </Wrapper>
    </div>
  );
}
