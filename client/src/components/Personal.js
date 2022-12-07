/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Container, Row } from 'react-bootstrap';

export default function Main() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.name);
  const kidName = useSelector((state) => state.auth.nameKid);

  return (
    <Container
      className="h-100 p-5 text-white bg-dark"
      style={{
        position: 'absolute',
        display: 'inline-block',
        marginTop: '5%',
        float: 'left',
        fontWeight: '200',
      }}
    >
      <div className="container-fluid py-4">
        <h1 className="display-5 fw-bold">
          {name}'s and {kidName}'s personal page
        </h1>
        <Row>
          <Button
            variant="primary"
            className="main-button personal"
            type="link"
            href="/edit"
          >
            Edit personal info
          </Button>
          <Button
            variant="primary"
            href="/all-docs-display"
            type="link"
            className="main-button personal"
          >
            All your sleepy docs
          </Button>
        </Row>
        <p className="col-ms-1 fs">
          {' '}
          In order to get your personal recommendations, please, provide some
          info about {kidName}'s sleeping schedule.{' '}
        </p>
        <Button
          type="link"
          className="main-button personal right"
          href="/sleepy-form-post"
        >
          Check if {kidName} sleeps enough (so you do!)
        </Button>
      </div>
    </Container>
  );
}
