/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import displayAge from '../hooks/displayAge';
import { conditionalCellColor } from '../hooks/tableRenders';
import displayTime from '../hooks/displayTime';
import checkColForRender from '../hooks/checkColForRender';
import { fetchAllDocs, deleteDoc } from '../actions';
import Error from './Error';

export default function AllDocsDisplay() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const convDate = (d) => new Date(d).toDateString();
  useEffect(() => {
    dispatch(fetchAllDocs());
  }, []);
  const handleDeleteDoc = (docId) => {
    dispatch(deleteDoc(docId));
    // dispatch(fetchAllDocs());
    navigate('/personal/all-docs-display');
  };
  const allDocs = useSelector((state) => state.allDocs);

  const allDocsMap = allDocs.map((doc) => {
    const { ww1R } = doc.result;
    const { ww2R } = doc.result;
    const { ww3R } = doc.result;
    const { ww4R } = doc.result;
    const { ww5R } = doc.result;
    const { sumNapR } = doc.result;
    const { lastNapR } = doc.result;
    const { numberOfNapsR } = doc.result;
    const { ww1 } = doc;
    const { ww2 } = doc;
    const { ww3 } = doc;
    const { ww4 } = doc;
    const { ww5 } = doc;
    const { sumNap } = doc;
    const { lastNap } = doc;
    const { numberOfNaps } = doc;

    return (
      <tbody key={doc._id}>
        <tr>
          <td className="table-head">
            {' '}
            <Button
              id="hover-color"
              variant="primary"
              className="main-button sm-btn"
              type="button"
              onClick={() => navigate(`/personal/${doc._id}`)}
            >
              Details
            </Button>
            <Button
              id="hover-delete"
              variant="primary"
              className="main-button sm-btn "
              type="button"
              onClick={() => handleDeleteDoc(`${doc._id}`)}
            >
              Delete
            </Button>
          </td>
          <td className="table-head">{convDate(doc.date)}</td>
          <td className="table-head">{displayAge(doc.age)}</td>
          <td className="table-head">{doc.wakeUp}</td>
          <td className="table-head">{doc.bedTime}</td>
          <td>{displayTime(ww1)}</td>
          <td>{displayTime(ww2)}</td>
          {checkColForRender(allDocs).w3.length !== 0 ? (
            <td>{displayTime(ww3)} </td>
          ) : null}
          {checkColForRender(allDocs).w4.length !== 0 ? (
            <td>{displayTime(ww4)} </td>
          ) : null}
          {checkColForRender(allDocs).w5.length !== 0 ? (
            <td>{displayTime(ww5)} </td>
          ) : null}
          <td> {displayTime(sumNap)}</td>
          <td>{lastNap}</td>
          <td>{numberOfNaps}</td>
        </tr>
        <tr className="table-result">
          <td colSpan={5} className="table-comments">
            Comments
          </td>
          <td className={conditionalCellColor(ww1R)}>{ww1R}</td>
          <td className={conditionalCellColor(ww2R)}>{ww2R}</td>
          {checkColForRender(allDocs).w3.length !== 0 ? (
            <td className={conditionalCellColor(ww3R)}>{ww3R} </td>
          ) : null}
          {checkColForRender(allDocs).w4.length !== 0 ? (
            <td className={conditionalCellColor(ww4R)}>{ww4R}</td>
          ) : null}
          {checkColForRender(allDocs).w5.length !== 0 ? (
            <td className={conditionalCellColor(ww5R)}>{ww5R}</td>
          ) : null}
          <td className={conditionalCellColor(sumNapR)}>{sumNapR}</td>
          <td className={conditionalCellColor(lastNapR)}>{lastNapR}</td>
          <td className={conditionalCellColor(numberOfNapsR)}>
            {numberOfNapsR}
          </td>
        </tr>
      </tbody>
    );
  });
  const conditionalDisplay = () => {
    if (allDocs.length > 0) {
      return (
        <Table bordered className="sleepy-table">
          <thead>
            <tr className="table-head">
              <th>Actions</th>
              <th>Date</th>
              <th>Age</th>
              <th>Wake-up</th>
              <th>Bed-time</th>
              <th>Ww 1</th>
              <th>Ww 2</th>
              {checkColForRender(allDocs).w3.length !== 0 ? (
                <th>Ww 3</th>
              ) : null}
              {checkColForRender(allDocs).w4.length !== 0 ? (
                <th>Ww 4</th>
              ) : null}
              {checkColForRender(allDocs).w5.length !== 0 ? (
                <th>Ww 5</th>
              ) : null}
              <th>Sum Nap</th>
              <th>Last Nap</th>
              <th>Number of naps</th>
            </tr>
          </thead>
          {allDocsMap}
        </Table>
      );
    }
    return (
      <p className="error-message">You don't have any sleepy docs so far.</p>
    );
  };

  return (
    <div
      className="h-auto  p-5 text-white bg-dark"
      style={{
        position: 'absolute',
        display: 'inline-block',
        minHeight: '100%',
        minWidth: '85%',
        marginTop: '5%',
      }}
    >
      {conditionalDisplay()}
      <Button
        variant="primary"
        className="main-button personal padding-button"
        type="button"
        onClick={() => navigate('/sleepy-form-post')}
      >
        Fill in sleepy form
      </Button>
      <Button
        variant="primary"
        className="main-button personal padding-button"
        type="button"
        onClick={() => navigate('/personal')}
      >
        Back to profile
      </Button>
    </div>
  );
}
