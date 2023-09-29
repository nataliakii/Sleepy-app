import React, { useEffect, useMemo } from "react";
import _ from "lodash";
import { Container, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Accordion } from "react-bootstrap/";
import { fetchTips } from "../actions";
import Loading from "./Loading";
import articles from "./data/articles";

export default function TipsSleep() {
  const keyRand = useMemo(() => _.random(9345329), []);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log('dispatching Tips')
  //   dispatch(fetchTips());
  // }, []);
  const tips = articles;
  console.log("articles", articles, "state", tips);

  const loopingTip = (content) => {
    const checkExpertTip = (par, index) => {
      if (par.expertTip) {
        return (
          <>
            <code>Expert Tip : </code>
            {par.expertTip}
          </>
        );
      }
    };
    const loopText = (text, contentIndex) =>
      text.map((p, i) => (
        <div key={`looptext${keyRand}-${contentIndex}-${i}`}>{p}</div>
      ));

    const contentTOreturn = content.map((p, i) => (
      <div key={`content${keyRand}-${i}`}>
        {p.title ? <h5>{p.title}</h5> : null}
        <div>{loopText(p.text, i)}</div> {checkExpertTip(p, i)}{" "}
      </div>
    ));
    return contentTOreturn;
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#ecebeb",
        height: "100%",
        minHeight: "50rem",
        alignItems: "center",
        py: 4,
      }}
    >
      {tips.length > 0 ? (
        <Accordion defaultActiveKey={["1"]} alwaysOpen>
          {tips.map((tip, i) => (
            <Accordion.Item style={{ width: "98%" }} eventKey={i} key={i}>
              <Accordion.Header>{tip.name}</Accordion.Header>
              <Accordion.Body>{loopingTip(tip.content)}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <Loading />
      )}{" "}
    </Container>
  );
}
