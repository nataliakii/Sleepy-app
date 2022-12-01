/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import displayAge from '../hooks/displayAge';
import { conditionalCellColor } from '../hooks/tableRenders';
import { fetchAllDocs } from '../actions';

export default function AllDocsDisplay() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllDocs());
  }, []);
  const allDocs = useSelector((state) => state.allDocs);
  const convDate = (d) => new Date(d).toDateString();
  const generateId = () => Math.round(Math.random() * 100000000);
  const allDocsMap = allDocs.map((doc) => {
    const { ww1R } = doc.result;
    const { ww2R } = doc.result;
    const { ww3R } = doc.result;
    const { ww4R } = doc.result;
    const { ww5R } = doc.result;
    const { sumNapR } = doc.result;
    const { ww1 } = doc;
    const { ww2 } = doc;
    const { ww3 } = doc;
    const { ww4 } = doc;
    const { ww5 } = doc;
    const { sumNap } = doc;
    return (
      <tbody key={generateId}>
        <tr>
          <td>{convDate(doc.date)}</td>
          <td>{displayAge(doc.age)}</td>
          <td>{doc.wakeUp}</td>
          <td>{doc.bedTime}</td>
          <td>{ww1}mins</td>
          <td>{ww2}mins</td>
          <td>{ww3}mins </td>
          <td>{ww4}mins</td>
          <td>{ww5}mins</td>
          <td>{sumNap}mins</td>
        </tr>
        <tr className="table-result">
          <td colSpan={4} className="table-comments">
            Comments
          </td>
          <td className={conditionalCellColor(ww1R)}>{ww1R}</td>
          <td className={conditionalCellColor(ww2R)}>{ww2R}</td>
          <td className={conditionalCellColor(ww3R)}>{ww3R} </td>
          <td className={conditionalCellColor(ww4R)}>{ww4R}</td>
          <td className={conditionalCellColor(ww5R)}>{ww5R}</td>
          <td className={conditionalCellColor(sumNapR)}>{sumNapR}</td>
        </tr>
      </tbody>
    );
  });

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
            <th>Wake window 1</th>
            <th>Wake window 2</th>
            <th>Wake window 3</th>
            <th>Wake window 4</th>
            <th>Wake window 5</th>
            <th>Sum Nap</th>
          </tr>
        </thead>
        {allDocsMap}
      </Table>
    </div>
  );
}
