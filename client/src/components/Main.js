/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import { Container, Button } from 'react-bootstrap';

export default function Main({ user }) {
  const { name } = user;

  let str = '';
  const renderStringName = () => {
    if (name) {
      return (str = name);
    }
    return (str = 'this is SleepyApp');
  };

  return (
    <Container
      className="h-100 p-5 text-white bg-dark"
      style={{
        position: 'absolute',
        display: 'inline-block',
        marginTop: '5%',
        float: 'left',
        fontWeight: '200',
        maxWidth: '81%',
      }}
    >
      <div className="container-fluid py-4">
        <h1 className="display-5 fw-bold">Hello, {renderStringName()}</h1>
        <p className="col-md-7 fs-5">
          We are here to help mothers to sleep more. Is it possible? Yes, you
          just need to know how to organize sleep for your baby.
        </p>
        <p className="col-md-7 fs-5">Btw, you're the best mom.</p>
        <p>
          <Button
            variant="primary"
            className="main-button personal main"
            type="link"
            href="/sleepy-form-post"
          >
            I want to sleep more!
          </Button>
        </p>
      </div>
    </Container>
  );
}
