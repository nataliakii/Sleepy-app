import React, { useEffect, useRef } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Container, styled, Button, Stack } from "@mui/material";

import displayAge from "../../hooks/displayAge";
import { conditionalCellColor } from "../../hooks/tableRenders";
import displayTime from "../../hooks/displayTime";
import checkColForRender from "../../hooks/checkColForRender";
import { fetchAllDocs, deleteDoc } from "../../actions";
import Error from "../Error";

const CustomButton = styled(Button)(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.text.light,
  fontWeight: 100,
  "&:hover": {
    color: "#bf1650",
    backgroundColor: "transparent",
  },
  "&:active": {
    transition: "0.3s all ",
    transform: "translateY(3px) ",
    border: "1px solid transparent",
    opacity: "0.01 ",
  },
}));

export default function AllDocsDisplay() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const convDate = (d) => new Date(d).toDateString();
  useEffect(() => {
    dispatch(fetchAllDocs());
  }, []);
  const handleDeleteDoc = (docId) => {
    console.log("delete", docId);
    dispatch(deleteDoc(docId));
    navigate("/personal/all-docs-display");
  };
  const allDocs = useSelector((state) => state.allDocs);
  console.log(allDocs.length == 0);

  const allDocsMap = allDocs.map((doc) => {
    const ww1R = doc.result.ww1R.message;
    const ww2R = doc.result.ww2R.message;
    const ww3R = doc.result.ww3R?.message;
    const ww4R = doc.result.ww4R?.message;
    const ww5R = doc.result.ww5R?.message;
    const sumNapR = doc.result.sumNapR.message;
    const lastNapR = doc.result.lastNapR.message;
    const numberOfNapsR = doc.result.numberOfNapsR.message;
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
            {" "}
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
    if (!allDocs) {
      return (
        <div
          style={{
            position: "relative",
            display: "inline-block",
            width: "100%",
            height: "auto",
            overflow: "auto",
          }}
        >
          <Table
            bordered
            style={{
              width: "100%",
              fontSize: "11px",
              color: "white",
            }}
          >
            <thead>
              <tr className="table-head">
                <th>Actions</th>
                <th>Date</th>
                <th>Age</th>
                <th>Wake-up</th>
                <th>Bed-time</th>
                <th>
                  <Link className="link-tips" to="/tips-sleep">
                    Ww1
                  </Link>
                </th>
                <th>
                  {" "}
                  <Link className="link-tips" to="/tips-sleep">
                    {" "}
                    Ww 2{" "}
                  </Link>
                </th>
                {checkColForRender(allDocs).w3.length !== 0 ? (
                  <th>
                    {" "}
                    <Link className="link-tips" to="/tips-sleep">
                      Ww 3{" "}
                    </Link>
                  </th>
                ) : null}
                {checkColForRender(allDocs).w4.length !== 0 ? (
                  <th>
                    {" "}
                    <Link className="link-tips" to="/tips-sleep">
                      Ww 4
                    </Link>
                  </th>
                ) : null}
                {checkColForRender(allDocs).w5.length !== 0 ? (
                  <th>
                    {" "}
                    <Link className="link-tips" to="/tips-sleep">
                      Ww 5
                    </Link>
                  </th>
                ) : null}
                <th>Sum Nap</th>
                <th>Last Nap</th>
                <th>Number of naps</th>
              </tr>
            </thead>
            {allDocsMap}
          </Table>
        </div>
      );
    }
    return (
      <>
        {" "}
        <p>You don't have any sleepy docs so far.</p> <Error />
      </>
    );
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#ecebeb",
        minHeight: "50rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "32px",
        textAlign: "center",
      }}
    >
      {conditionalDisplay()}
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={() => navigate("/personal")}
        >
          Back to profile
        </CustomButton>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={() => navigate("/sleepy-form-post")}
        >
          Fill in sleepy form
        </CustomButton>
      </Stack>
    </Container>
  );
}
