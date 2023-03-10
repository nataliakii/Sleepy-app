import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { fetchNorms } from "../actions";
import { Table } from "react-bootstrap";
import displayTime from "../hooks/displayTime";
import { calculateAge } from "../hooks/calculateAge";

const sorting = (arr) => {
  const sorted = _.sortBy(arr, [
    function (o) {
      console.log(o);
      return Number(o.name.slice(3));
    },
  ]);
  return sorted;
};

const Norms = () => {
  const dispatch = useDispatch();
  const callback = useCallback(() => {
    dispatch(fetchNorms()), [];
  });
  useEffect(() => {
    const unsubscribe = callback();
    return unsubscribe;
  }, []);
  const n = useSelector((state) => state.norms);
  const kidBD = useSelector((state) => state.auth.kidBD);
  const age = calculateAge(kidBD).ageInWeeks;

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
    </div>
  );
};
export default Norms;
