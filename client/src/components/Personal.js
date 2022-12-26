/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Container } from 'react-bootstrap';
import { deleteProfile, signout } from '../actions';

export default function Personal() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.name);
  const kidName = useSelector((state) => state.auth.nameKid);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleDeleteButton = () => {
    dispatch(deleteProfile());
    window.location.href = '/';
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
        minWidth: '89%',
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
          type="button"
          variant="primary"
          className="main-button personal display-block padding-button"
          onClick={() => navigate('/sleepy-form-post')}
        >
          Check if {kidName} sleeps enough (so you do!)
        </Button>
        <Button
          type="button"
          variant="primary"
          className="main-button personal display-block padding-button"
          onClick={() => navigate('/personal/all-docs-display')}
        >
          All your sleepy docs
        </Button>
        <Button
          type="button"
          variant="primary"
          className="main-button personal display-block padding-button"
          onClick={() => navigate('/personal/edit')}
        >
          Edit personal info
        </Button>
        <Button
          type="button"
          variant="primary"
          className="main-button personal display-block delete-btn"
          onClick={handleShow}
        >
          Delete Profile
        </Button>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body className="modal-title">
            {name}, do you really want to delete your profile?
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="modal-button"
              variant="primary"
              onClick={handleClose}
            >
              No, I just want to sleep more.
            </Button>
            <Button
              className="modal-button"
              variant="primary"
              onClick={handleDeleteButton}
            >
              Yes, delete it.
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
}
