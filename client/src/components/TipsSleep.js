import React, { useEffect, useMemo } from "react";
import _ from "lodash";
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
    const checkExpertTip = (par) => {
      if (par.expertTip) {
        return (
          <>
            <code>Expert Tip : </code>
            {par.expertTip}
          </>
        );
      }
    };
    const loopText = (text) =>
      text.map((p, i) => <div key={`looptext${keyRand}${i}`}>{p}</div>);

    const contentTOreturn = content.map((p, i) => (
      <div key={`content${keyRand}${i}`}>
        {" "}
        {p.title ? <h5>{p.title}</h5> : null}
        <div>{loopText(p.text)}</div> {checkExpertTip(p)}{" "}
      </div>
    ));
    return contentTOreturn;
  };

  return (
    <div
      className="p-5 text-white bg-dark"
      style={{
        position: "absolute",
        display: "inline-block",
        marginTop: "5%",
        minWidth: "85%",
        minHeight: "100%",
      }}
    >
      {" "}
      {tips.length > 0 ? (
        <Accordion defaultActiveKey={["1"]} alwaysOpen>
          {tips.map((tip, i) => (
            <Accordion.Item style={{ width: "75%" }} eventKey={i} key={tip._id}>
              <Accordion.Header>{tip.name}</Accordion.Header>
              <Accordion.Body>{loopingTip(tip.content)}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <Loading />
      )}{" "}
    </div>
  );
}
