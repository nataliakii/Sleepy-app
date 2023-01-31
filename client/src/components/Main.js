import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { fetchFunFact } from "../actions";
import { MdAccessibilityNew } from "react-icons/md";

export default function Main({ user }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFunFact());
  }, []);
  const funFact = useSelector((state) => state.funFact);
  const navigate = useNavigate();
  const { name } = user;

  let str = "";
  const renderStringName = () => {
    if (name) {
      return (str = name);
    }
    return (str = "this is SleepyApp");
  };

  return (
    <Container
      className="h-100 p-5 text-white bg-dark"
      style={{
        position: "absolute",
        display: "inline-block",
        marginTop: "5%",
        float: "left",
        fontWeight: "200",
        maxWidth: "89%",
      }}
    >
      <div className="container-fluid py-4">
        <h1 className="display-5 fw-bold">Hello, {renderStringName()}</h1>
        <p className="col-md-7 fs-5">
          Our goal is to help mothers sleep more. Is that possible? It's just a
          matter of figuring out how to organize your baby's sleep.
        </p>

        <Button
          variant="primary"
          className="main-button personal main"
          type="button"
          onClick={() => navigate("/sleepy-form-post")}
        >
          I love sleeping more than anything!
        </Button>
        <h6 className="col-md-7 margin-top">
          {" "}
          <em>
            {" "}
            <MdAccessibilityNew /> {funFact}{" "}
          </em>
        </h6>
      </div>
    </Container>
  );
}
