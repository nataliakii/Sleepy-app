import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { fetchArtwork } from "../actions";

export default function FindRestaurant() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const artwork = useSelector((state) => state.art);
  const handleArtButton = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(fetchArtwork());
  };
  useEffect(() => {
    setLoading(false);
  }, [artwork]);

  const conditional = () => {
    if (loading || !artwork.title) {
      return <Loading />;
    }
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <img
              style={{
                height: "420px",
                maxWidth: "420px",
                alignSelf: "center",
              }}
              src={artwork.imageURL}
              alt="artwork"
            />
          </Col>
          <Col>
            <p className="art-text">
              <strong className="art-text-strong">Title </strong>:{" "}
              {artwork.title}.
            </p>
            <p className="art-text">
              <strong className="art-text-strong">Description</strong>:{" "}
              {artwork.description}
            </p>
            <p className="art-text">
              <strong className="art-text-strong">Artist</strong>:{" "}
              {artwork.artist}.
            </p>
            <p className="art-text">
              <strong className="art-text-strong">Date</strong>: {artwork.date}{" "}
              y.
            </p>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <div
      className="h-100 p-5 text-white bg-dark main-container-center"
      style={{
        position: "absolute",
        display: "inline-block",
        minWidth: "84%",
        minHeight: "99%",
        marginTop: "5%",
      }}
    >
      <Container>
        <h6>
          This page is under construction. Meanwhile enjoy random artwork.
        </h6>
        <Button
          type="button"
          variant="primary"
          className="main-button personal display-block art-centered"
          onClick={handleArtButton}
        >
          Show me artwork
        </Button>
      </Container>
      {conditional()}
    </div>
  );
}
