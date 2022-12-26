// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react/destructuring-assignment */
// /* eslint-disable no-shadow */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { useRef, useState, useEffect } from 'react';
// import GoogleMapReact from 'google-map-react';

// export default function Map({ loc, zoom }) {
//   const ref = useRef({ loc, zoom });
//   const [map, setMap] = useState();
//   console.log(ref);

//   useEffect(() => {
//     if (ref.current && !map) {
//       setMap(new window.google.maps.Map(ref.current, {}));
//     }
//   }, []);
//   return (
//     <div
//       style={{
//         color: 'white',
//         marginTop: '3%',
//         padding: '15px 10px',
//         display: 'inline-flex',
//         textAlign: 'center',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100%',
//         height: '400px',
//       }}
//       ref={ref}
//     />
//   );
// }
