/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import displayAge from '../hooks/displayAge';
import displayTime from '../hooks/displayTime';
import {
  conditionalTableHead,
  conditionalTableRow1,
  conditionalTableRow2,
} from '../hooks/tableRenders';

export default function OneDocDisplay() {
  const convDate = (d) => new Date(d).toDateString();
  const docs = useSelector((state) => state.allDocs);
  const { docId } = useParams();
  const doc = _.find(docs, { _id: docId });
  console.log(doc);
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
    <div
      className="h-auto p-5 text-white bg-dark"
      style={{
        position: 'absolute',
        display: 'inline-block',
        width: 'auto',
        marginTop: '5%',
        minWidth: '85%',
        minHeight: '100%',
      }}
    >
      <h5>Your sleepy doc from {convDate(doc.date)}</h5>
      <Table bordered className="sleepy-table" id="table-width">
        <thead className="table-head">
          <tr>
            <th>Action</th>
            <th>Input</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Age</td>
            <td>{displayAge(doc.age)}</td>
            <td>Great age! </td>
          </tr>
          <tr>
            <td>wakeUp</td>
            <td>{doc.wakeUp}</td>
            <td>Wow! Good enought for you, isn't?</td>
          </tr>
          <tr>
            <td>ww1</td>
            <td>{displayTime(ww1)}</td>
            <td>{ww1R}</td>
          </tr>
          <tr>
            <td>nap1</td>
            <td>
              {doc.nap1.start} - {doc.nap1.end}
            </td>
            <td>nap1</td>
          </tr>
          <tr>
            <td>ww2</td>
            <td>{displayTime(ww2)}</td>
            <td>{ww2R}</td>
          </tr>
          {ww3 !== null ? (
            <>
              <tr>
                <td>nap2</td>
                <td>
                  {doc.nap2.start} - {doc.nap2.end}
                </td>
                <td>@twitter</td>
              </tr>{' '}
              <tr>
                <td>ww3</td>
                <td>{displayTime(ww3)}</td>
                <td>{ww3R}</td>
              </tr>
            </>
          ) : null}

          {ww4 !== null ? (
            <>
              <tr>
                <td>nap3</td>
                <td>
                  {doc.nap3.start} - {doc.nap3.end}
                </td>
                <td>@twitter</td>
              </tr>
              <tr>
                <td>ww4</td>
                <td>{displayTime(ww4)}</td>
                <td>{ww4R}</td>
              </tr>
            </>
          ) : null}
          {ww5 !== null ? (
            <>
              <tr>
                <td>nap4</td>
                <td>
                  {doc.nap4.start} - {doc.nap4.end}
                </td>
                <td>@twitter</td>
              </tr>
              <tr>
                <td>ww5</td>
                <td>{ww5}</td>
                <td>{ww5R}</td>
              </tr>
            </>
          ) : null}

          <tr>
            <td>BedTime</td>
            <td>{doc.bedTime}</td>
            <td>Great Beadtime</td>
          </tr>
          <tr>
            <td>Number of Naps</td>
            <td>{numberOfNaps}</td>
            <td>{numberOfNapsR}</td>
          </tr>
          <tr>
            <td>Sum nap</td>
            <td>{displayTime(sumNap)}</td>
            <td>{sumNapR}</td>
          </tr>
          <tr>
            <td>Last nap</td>
            <td>{lastNap}</td>
            <td>{lastNapR}</td>
          </tr>
        </tbody>
      </Table>
      <Button
        type="link"
        variant="primary"
        className="main-button personal display-block"
        href="/personal/all-docs-display"
      >
        Back to all your sleepy docs
      </Button>
    </div>
  );
}
