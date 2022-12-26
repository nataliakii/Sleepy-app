/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, useLoadScript } from '@react-google-maps/api';
import { ThreeCircles } from 'react-loader-spinner';
import Map from './Map';
import { fetchLocation } from '../actions';

const containerStyle = {
  width: '900px',
  height: '400px',
  marginLeft: '4%',
};

export default function FindPlayground() {
  // const { isLoaded } = useLoadScript();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(fetchLocation());
  };
  const loc = useSelector((state) => state.loc.location);

  // if (!isLoaded)
  //   return (
  //     <ThreeCircles
  //       height="100"
  //       width="100"
  //       color="#cb4587"
  //       wrapperStyle={{}}
  //       wrapperClass="loading__center"
  //       visible
  //       ariaLabel="three-circles-rotating"
  //       outerCircleColor=""
  //       innerCircleColor=""
  //       middleCircleColor=""
  //     />
  //   );

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
      <LoadScript googleMapsApiKey="AIzaSyAPFke-0DvZs8-Yw-IYnj8-Zr7M3G4d8l4">
        <GoogleMap mapContainerStyle={containerStyle} center={loc} zoom={15}>
          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
