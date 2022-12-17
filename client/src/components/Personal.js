/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { deleteProfile } from '../actions';

export default function Main() {
  const dispatch = useDispatch();
  const history = useHistory();
  const name = useSelector((state) => state.auth.name);
  const kidName = useSelector((state) => state.auth.nameKid);

  const handleDeleteButton = () => {
    dispatch(
      deleteProfile(() => {
        history.push('/');
      })
    );
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
        <h1 className="display-5 fw-bold">
          {name}'s and {kidName}'s personal page
        </h1>
        <p className="col-ms-1 fs">
          {' '}
          In order to get your personal recommendations, please, provide some
          info about {kidName}'s sleeping schedule.{' '}
        </p>
        <Button
          type="link"
          variant="primary"
          className="main-button personal display-block"
          href="/sleepy-form-post"
        >
          Check if {kidName} sleeps enough (so you do!)
        </Button>
        <Button
          type="link"
          variant="primary"
          className="main-button personal display-block"
          href="/personal/all-docs-display"
        >
          All your sleepy docs
        </Button>
        <Button
          type="link"
          variant="primary"
          className="main-button personal display-block"
          href="/personal/edit"
        >
          Edit personal info
        </Button>
        <Button
          type="button"
          variant="primary"
          className="main-button personal display-block delete-btn"
          onClick={handleDeleteButton}
        >
          Delete Profile
        </Button>
      </div>
    </Container>
  );
}
