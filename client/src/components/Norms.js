import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { Table } from "react-bootstrap";
import _ from "lodash";
import { fetchNorms } from "../actions";
import displayTime from "../hooks/displayTime";
import { calculateAge } from "../hooks/calculateAge";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  styled,
} from "@mui/material";

const StyledTable = styled(Table)({
  "& .row": {
    height: "10px",
  },
});

const StyledTableCell = styled(TableCell)({
  padding: "10px",
  color: "white",
  backgroundColor: "rgb(76, 125, 128)",
  textAlign: "center",
  whiteSpace: "nowrap",
});

const sorting = (arr) => {
  const sorted = _.sortBy(arr, [
    function (o) {
      return Number(o.name.slice(3));
    },
  ]);
  return sorted;
};

const Norms = () => {
  const dispatch = useDispatch();

  const n = useSelector((state) => state.norms);
  const kidBD = useSelector((state) => state.auth.kidBD);
  const age = useMemo(() => calculateAge(kidBD).ageInWeeks, [kidBD]);

  useEffect(() => {
    dispatch(fetchNorms());
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#ecebeb",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <div className="table-container">
        <StyledTable
          sx={{
            color: "text.light",
            overflowX: "auto",
            ml: "6%",
          }}
          // className="sleepy-table"
          id="table-width"
        >
          <TableHead
            sx={{
              textTransform: "uppercase",
              backgroundColor: "rgb(128, 60, 125)",
              color: "white",
              textAlign: "center",
              minWidth: "60rem",
            }}
          >
            <TableRow className="row">
              <StyledTableCell>Age</StyledTableCell>
              <StyledTableCell>
                <Link
                  sx={{ color: "text.light" }}
                  className="link-hover"
                  to="/tips-sleep"
                >
                  Wake Window
                </Link>
              </StyledTableCell>
              <StyledTableCell>Sum Nap</StyledTableCell>
              <StyledTableCell>Number of naps</StyledTableCell>
              <StyledTableCell>Last Nap</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {n
              ? n.map((norm) => (
                  <TableRow className="row" key={norm._id}>
                    <StyledTableCell>{norm.age}</StyledTableCell>
                    <StyledTableCell>
                      {displayTime(norm.content.wwMin)} -{" "}
                      {displayTime(norm.content.wwMax)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {displayTime(norm.content.napSumMin)} -{" "}
                      {displayTime(norm.content.napSumMax)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {norm.content.napMin == norm.content.napMax
                        ? ""
                        : norm.content.napMin + " - "}
                      {norm.content.napMax}
                    </StyledTableCell>
                    <StyledTableCell>{norm.content.lastNap}</StyledTableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </StyledTable>
      </div>
    </Container>
  );
};

export default React.memo(Norms);
