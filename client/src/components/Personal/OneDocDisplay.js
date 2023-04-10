import React from "react";
import _ from "lodash";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Container, Button, Typography, styled } from "@mui/material";
import displayAge from "../../hooks/displayAge";
import displayTime from "../../hooks/displayTime";
import { cellCol } from "../../hooks/tableRenders";
import icons from "../../hooks/renderResultIcons";

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
    opacity: "0.8 ",
  },
}));

export default function OneDocDisplay() {
  const navigate = useNavigate();
  const convDate = (d) => new Date(d).toDateString();
  const docs = useSelector((state) => state.allDocs);
  const { docId } = useParams();

  const doc = _.find(docs, { _id: docId });

  const ww1R = doc.result.ww1R.message;
  const ww2R = doc.result.ww2R.message;
  const ww3R = doc.result.ww3R?.message;
  const ww4R = doc.result.ww4R?.message;
  const ww5R = doc.result.ww5R?.message;
  const ww1Rcode = doc.result.ww1R.code;
  const ww2Rcode = doc.result.ww2R.code;
  const ww3Rcode = doc.result.ww3R?.code;
  const ww4Rcode = doc.result.ww4R?.code;
  const ww5Rcode = doc.result.ww5R?.code;
  const sumNapR = doc.result.sumNapR.message;
  const lastNapR = doc.result.lastNapR.message;
  const numberOfNapsR = doc.result.numberOfNapsR.message;
  const sumNapRcode = doc.result.sumNapR.code;
  const lastNapRcode = doc.result.lastNapR.code;
  const numberOfNapsRcode = doc.result.numberOfNapsR.code;
  const { ww1 } = doc;
  const { ww2 } = doc;
  const { ww3 } = doc;
  const { ww4 } = doc;
  const { ww5 } = doc;
  const { sumNap } = doc;
  const { lastNap } = doc;
  const { numberOfNaps } = doc;

  const rendNapMessage = (previousCode) => {
    if (!previousCode) return { message: "", rowColor: "" };
    if (previousCode === 500) {
      return {
        message: "Try to have this nap a bit earlier",
        rowColor: "no-ok-cell",
      };
    }
    if (previousCode === 400) {
      return {
        message: "Try to have this nap a bit later",
        rowColor: "no-ok-cell",
      };
    }
    if (previousCode === 200) {
      return { message: "Cool! ", rowColor: "" };
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#ecebeb",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        py: 4,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Your sleepy doc from {convDate(doc.date)}
      </Typography>
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
            <td>Wow! Cool! Soo early ?</td>
          </tr>
          <tr>
            <td>
              {" "}
              <Link className="link-tips" to="/tips-sleep">
                Wake window 1
              </Link>
            </td>
            <td>{displayTime(ww1)}</td>
            <td className={cellCol(ww1Rcode)}>
              {" "}
              {icons(ww1Rcode)} {ww1R}
            </td>
          </tr>
          <tr>
            <td>nap1</td>
            <td>
              {doc.nap1.start} - {doc.nap1.end}
            </td>
            <td className={rendNapMessage(ww1Rcode).rowColor}>
              {" "}
              {icons(ww1Rcode)} {rendNapMessage(ww1Rcode).message}{" "}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <Link className="link-tips" to="/tips-sleep">
                Wake window 2
              </Link>
            </td>
            <td>{displayTime(ww2)}</td>
            <td className={cellCol(ww2Rcode)}>
              {icons(ww2Rcode)}
              {ww2R}
            </td>
          </tr>
          {ww3 !== null ? (
            <>
              <tr>
                <td>nap2</td>
                <td>
                  {doc.nap2.start} - {doc.nap2.end}
                </td>
                <td className={rendNapMessage(ww2Rcode).rowColor}>
                  {" "}
                  {icons(ww2Rcode)}
                  {rendNapMessage(ww2Rcode).message}
                </td>
              </tr>{" "}
              <tr>
                <td>
                  {" "}
                  <Link className="link-tips" to="/tips-sleep">
                    Wake window 3
                  </Link>
                </td>
                <td>{displayTime(ww3)}</td>
                <td className={cellCol(ww3Rcode)}>
                  {icons(ww3Rcode)} {ww3R}
                </td>
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
                <td className={rendNapMessage(ww3Rcode).rowColor}>
                  {" "}
                  {icons(ww3Rcode)}
                  {rendNapMessage(ww3Rcode).message}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <Link className="link-tips" to="/tips-sleep">
                    Wake window 4
                  </Link>
                </td>
                <td>{displayTime(ww4)}</td>
                <td className={cellCol(ww4Rcode)}>
                  {icons(ww4Rcode)}
                  {ww4R}
                </td>
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
                <td className={rendNapMessage(ww4Rcode).rowColor}>
                  {" "}
                  {icons(ww4Rcode)}
                  {rendNapMessage(ww4Rcode).message}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <Link className="link-tips" to="/tips-sleep">
                    Wake window 5
                  </Link>
                </td>
                <td>{ww5}</td>
                <td className={cellCol(ww5Rcode)}>
                  {icons(ww5Rcode)}
                  {ww5R}
                </td>
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
            <td className={cellCol(numberOfNapsRcode)}>
              {icons(numberOfNapsRcode)}
              {numberOfNapsR}
            </td>
          </tr>
          <tr>
            <td>Sum nap</td>
            <td>{displayTime(sumNap)}</td>
            <td className={cellCol(sumNapRcode)}>
              {icons(sumNapRcode)}
              {sumNapR}
            </td>
          </tr>
          <tr>
            <td>Last nap</td>
            <td>{lastNap}</td>
            <td className={cellCol(lastNapRcode)}>
              {icons(lastNapRcode)}
              {lastNapR}
            </td>
          </tr>
        </tbody>
      </Table>
      <CustomButton
        variant="contained"
        size="large"
        onClick={() => navigate("/personal/all-docs-display")}
      >
        Back to all your sleepy docs
      </CustomButton>
    </Container>
  );
}
