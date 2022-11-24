/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

export default function SleepyGet() {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const name = useSelector((state) => state.auth.name);
  const kidName = useSelector((state) => state.auth.nameKid);
  const sleepy = useSelector((state) => state.sleepy[0]);
  console.log(sleepy);

  if (authenticated) {
    return (
      <div
        className="h-auto p-5 text-white bg-light"
        style={{
          position: 'absolute',
          display: 'inline-block',
          width: '100%',
          marginTop: '5%',
          float: 'left',
        }}
      >
        <Table bordered hover className="sleepy-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Age</th>
              <th>Wake-up</th>
              <th>Bed-time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{sleepy.date}</td>
              <td>{sleepy.age}</td>
              <td>{sleepy.wakeUp}</td>
              <td>{sleepy.bedTime}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
  return null;
}
