import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import _ from "lodash";
import { fetchNorms } from "../actions";
import displayTime from "../hooks/displayTime";
import { calculateAge } from "../hooks/calculateAge";
import { Container } from "@mui/material";

const sorting = (arr) => {
  const sorted = _.sortBy(arr, [
    function (o) {
      return Number(o.name.slice(3));
    },
  ]);
  return sorted;
};

const Norms = () => {
  const dispatch = useDispatch();

  const n = useSelector((state) => state.norms);
  const kidBD = useSelector((state) => state.auth.kidBD);
  const age = useMemo(() => calculateAge(kidBD).ageInWeeks, [kidBD]);

  useEffect(() => {
    dispatch(fetchNorms());
  }, []);

  return useMemo(
    () => (
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#ecebeb",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <Table className="sleepy-table" id="table-width">
          <thead className="table-head">
            <tr>
              <th>Age</th>
              <th>
                <Link className="link-tips" to="/tips-sleep">
                  Wake Window
                </Link>
              </th>
              <th>Sum Nap</th>
              <th>Number of naps</th>
              <th>Last Nap</th>
            </tr>
          </thead>
          <tbody>
            {n
              ? sorting(n).map((norm) => (
                  <tr key={norm._id}>
                    <td>{norm.age}</td>
                    <td>
                      {displayTime(norm.content.wwMin)} -{" "}
                      {displayTime(norm.content.wwMax)}
                    </td>
                    <td>
                      {" "}
                      {displayTime(norm.content.napSumMin)} -{" "}
                      {displayTime(norm.content.napSumMax)}
                    </td>
                    <td>
                      {norm.content.napMin == norm.content.napMax
                        ? ""
                        : norm.content.napMin + " - "}
                      {norm.content.napMax}
                    </td>

                    <td>{norm.content.lastNap}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </Container>
    ),
    [n]
  );
};

export default React.memo(Norms);

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchNorms } from "../actions";
// import { Table } from "react-bootstrap";
// import displayTime from "../hooks/displayTime";
// import { calculateAge } from "../hooks/calculateAge";

// const Norms = React.memo(function () {
//   const dispatch = useDispatch();
//   const callback = useCallback(() => {
//     dispatch(fetchNorms()), [n];
//   });
//   useEffect(() => {
//     const unsubscribe = callback();
//     return unsubscribe;
//   }, []);
//   const n = useSelector((state) => state.norms);
//   let norms;
//   n ? (norms = Object.entries(n)) : null;

//   // if (!n) return <Error />;
//   return (
//     <div
//       className="h-auto p-5 text-white bg-dark"
//       style={{
//         position: "absolute",
//         display: "inline-block",
//         width: "auto",
//         marginTop: "5%",
//         minWidth: "85%",
//         minHeight: "100%",
//       }}
//     >
//       <Table bordered className="sleepy-table" id="table-width">
//         <thead className="table-head">
//           <tr>
//             <th>Age</th>
//             <th>Wake Window</th>
//             <th>Number of naps</th>
//             <th>Sum Nap</th>
//             <th>Last Nap</th>
//           </tr>
//         </thead>
//         <tbody>
//           {norms
//             ? norms.map((norm, i) => (
//                 <tr key={i}>
//                   <td>{norm[0]}</td>
//                   <td>
//                     {displayTime(norm[1].wwMin)} - {displayTime(norm[1].wwMax)}
//                   </td>
//                   <td>
//                     {norm[1].napMin == norm[1].napMax
//                       ? ""
//                       : norm[1].napMin + " - "}
//                     {norm[1].napMax}
//                   </td>
//                   <td>
//                     {" "}
//                     {displayTime(norm[1].napSumMin)} -{" "}
//                     {displayTime(norm[1].napSumMax)}
//                   </td>
//                   <td>{norm[1].lastNap}</td>
//                 </tr>
//               ))
//             : null}
//         </tbody>
//       </Table>
//     </div>
//   );
// });
// export default Norms;
