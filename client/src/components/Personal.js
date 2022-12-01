/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

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
      }}
    >
      <div className="container-fluid py-4">
        <h1 className="display-5 fw-bold">
          {name}'s and {kidName}'s personal page
        </h1>

        <Button
          variant="primary"
          className="main-button personal"
          type="button"
        >
          Edit personal info
        </Button>
        <p className="col-ms-4 fs">
          {' '}
          In order to get your personal recommendations, please, provide some
          info about {kidName}'s sleeping schedule.{' '}
        </p>
        <Link className="white" to="/all-docs-display">
          Check all sleepy docs with recommendations
        </Link>

        <Link className="white" to="/sleepy-form-post">
          <br />
          Check if {kidName} sleeps enough (so you do!)
        </Link>
      </div>
    </Container>
  );
}
