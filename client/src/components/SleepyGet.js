/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import displayAge from '../hooks/displayAge';
import {
  conditionalTableHead,
  conditionalTableRow1,
  conditionalTableRow2,
} from '../hooks/tableRenders';

export default function SleepyGet() {
  const dispatch = useDispatch();
  const sleepy = useSelector((state) => state.sleepy);
  const convDate = (d) => new Date(d).toDateString();
  const generateId = () => Math.round(Math.random() * 100000000);
  const { ww1R } = sleepy.result;
  const { ww2R } = sleepy.result;
  const { ww3R } = sleepy.result;
  const { ww4R } = sleepy.result;
  const { ww5R } = sleepy.result;
  const { sumNapR } = sleepy.result;
  const { ww1 } = sleepy;
  const { ww2 } = sleepy;
  const { ww3 } = sleepy;
  const { ww4 } = sleepy;
  const { ww5 } = sleepy;
  const { sumNap } = sleepy;

  return (
    <div
      className="h-auto p-5 text-white bg-dark"
      style={{
        position: 'absolute',
        display: 'inline-block',
        width: 'auto',
        marginTop: '5%',
      }}
    >
      <Table bordered className="sleepy-table">
        <thead>
          <tr className="table-head">
            <th>Date</th>
            <th>Age</th>
            <th>Wake-up</th>
            <th>Bed-time</th>
            {conditionalTableHead(ww3, ww4, ww5)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{convDate(sleepy.date)}</td>
            <td>{displayAge(sleepy.age)}</td>
            <td>{sleepy.wakeUp}</td>
            <td>{sleepy.bedTime}</td>
            {conditionalTableRow1(ww1, ww2, ww3, ww4, ww5, sumNap)}
          </tr>
          <tr className="table-result">
            <td colSpan={4} className="table-comments">
              Comments
            </td>
            {conditionalTableRow2(
              ww3,
              ww4,
              ww5,
              ww1R,
              ww2R,
              ww3R,
              ww4R,
              ww5R,
              sumNapR
            )}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
