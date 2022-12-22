import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@mui/material';
import { fetchArtwork } from '../actions';

export default function FindRestaurant() {
  const dispatch = useDispatch();
  const handleArtButton = () => {
    dispatch(fetchArtwork());
  };

  const artwork = useSelector((state) => state.art);

  const artRender = () => {
    if (!artwork.title) {
      return <Skeleton variant="circular" width={210} height={210} />;
    }
    return (
      <Container>
        <Row className="justify-content-md-center">
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
              <strong className="art-text-strong">Date</strong>: {artwork.date}{' '}
              y.
            </p>
          </Col>
          <Col>
            <img
              style={{ height: '420px' }}
              src={artwork.imageURL}
              alt="artwork"
            />
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <div
      className="h-100 p-5 text-white bg-dark main-container-center"
      style={{
        position: 'absolute',
        display: 'inline-block',
        minWidth: '89%',
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

        {artRender()}
      </Container>
    </div>
  );
}
