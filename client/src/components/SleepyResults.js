/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import displayAge from '../hooks/displayAge';
import {
  conditionalTableHead,
  conditionalTableRow1,
  conditionalTableRow2,
} from '../hooks/tableRenders';
import displayTime from '../hooks/displayTime';

export default function SleepyResults() {
  const sleepy = useSelector((state) => state.sleepy);
  console.log(sleepy);
  const convDate = (d) => new Date(d).toDateString();
  const { ww1R } = sleepy.result;
  const { ww2R } = sleepy.result;
  const { ww3R } = sleepy.result;
  const { ww4R } = sleepy.result;
  const { ww5R } = sleepy.result;
  const { sumNapR } = sleepy.result;
  const { lastNapR } = sleepy.result;
  const { numberOfNapsR } = sleepy.result;
  const { lastNap } = sleepy;
  const { numberOfNaps } = sleepy;
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
        minWidth: '81%',
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
            <th>Last nap</th>
            <th>Number of naps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table-head">{convDate(sleepy.date)}</td>
            <td className="table-head">{displayAge(sleepy.age)}</td>
            <td className="table-head">{sleepy.wakeUp}</td>
            <td className="table-head">{sleepy.bedTime}</td>
            {conditionalTableRow1(
              displayTime(ww1),
              displayTime(ww2),
              displayTime(ww3),
              displayTime(ww4),
              displayTime(ww5),
              displayTime(sumNap)
            )}
            <td className="table-head">{lastNap}</td>
            <td className="table-head">{numberOfNaps}</td>
          </tr>
          <tr className="table-result">
            <td colSpan={4} className="table-comments">
              Comments
            </td>
            {conditionalTableRow2(
              ww1R,
              ww2R,
              ww3R,
              ww4R,
              ww5R,
              sumNapR,
              lastNapR,
              numberOfNapsR
            )}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
