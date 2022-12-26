/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';
import { fetchArtwork } from '../actions';

export default function FindRestaurant() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const switchLoad = () => setLoading(!loading);
  const handleArtButton = (e) => {
    e.preventDefault();
    switchLoad();
    dispatch(fetchArtwork(() => switchLoad()));
  };
  const artwork = useSelector((state) => state.art);
  const conditional = () => {
    if (loading) {
      return (
        <ThreeCircles
          height="100"
          width="940"
          color="#bf1650"
          wrapperStyle={{}}
          wrapperClass="loading__center"
          visible
          ariaLabel="three-circles-rotating"
        />
      );
    }
    if (artwork.title) {
      return (
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <img
                style={{
                  height: '420px',
                  maxWidth: '420px',
                  alignSelf: 'center',
                }}
                src={artwork.imageURL}
                alt="artwork"
              />
            </Col>
            <Col>
              <p className="art-text">
                <strong className="art-text-strong">Title </strong>:{' '}
                {artwork.title}.
              </p>
              <p className="art-text">
                <strong className="art-text-strong">Description</strong>:{' '}
                {artwork.description}
              </p>
              <p className="art-text">
                <strong className="art-text-strong">Artist</strong>:{' '}
                {artwork.artist}.
              </p>
              <p className="art-text">
                <strong className="art-text-strong">Date</strong>:{' '}
                {artwork.date} y.
              </p>
            </Col>
          </Row>
        </Container>
      );
    }
  };

  return (
    <div
      className="h-100 p-5 text-white bg-dark main-container-center"
      style={{
        position: 'absolute',
        display: 'inline-block',
        minWidth: '84%',
        minHeight: '99%',
        marginTop: '5%',
      }}
    >
      <Container>
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
