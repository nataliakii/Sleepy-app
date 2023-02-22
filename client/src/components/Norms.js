import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNorms } from "../actions";
import { Table } from "react-bootstrap";
import displayTime from "../hooks/displayTime";

const Norms = React.memo(function () {
  const dispatch = useDispatch();
  const callback = useCallback(() => {
    dispatch(fetchNorms()), [n];
  });
  useEffect(() => {
    const unsubscribe = callback();
    return unsubscribe;
  }, []);
  const n = useSelector((state) => state.norms);
  let norms;
  n ? (norms = Object.entries(n)) : null;
  // if (!n) return <Error />;
  return (
    <div
      className="h-auto p-5 text-white bg-dark"
      style={{
        position: "absolute",
        display: "inline-block",
        width: "auto",
        marginTop: "5%",
        minWidth: "85%",
        minHeight: "100%",
      }}
    >
      <Table bordered className="sleepy-table" id="table-width">
        <thead className="table-head">
          <tr>
            <th>Age</th>
            <th>Wake Window</th>
            <th>Number of naps</th>
            <th>Sum Nap</th>
            <th>Last Nap</th>
          </tr>
        </thead>
        <tbody>
          {norms
            ? norms.map((norm, i) => (
                <tr key={i}>
                  <td>{norm[0]}</td>
                  <td>
                    {displayTime(norm[1].wwMin)} - {displayTime(norm[1].wwMax)}
                  </td>
                  <td>
                    {norm[1].napMin == norm[1].napMax
                      ? ""
                      : norm[1].napMin + " - "}
                    {norm[1].napMax}
                  </td>
                  <td>
                    {" "}
                    {displayTime(norm[1].napSumMin)} -{" "}
                    {displayTime(norm[1].napSumMax)}
                  </td>
                  <td>{norm[1].lastNap}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </div>
  );
});
export default Norms;
