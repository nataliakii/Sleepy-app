import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Form, Modal } from "react-bootstrap";
import { updateProfile } from "../actions";

const userSchema = Yup.object().shape({
  email: Yup.string().email(),
  name: Yup.string(),
  nameKid: Yup.string(),
  kidBD: Yup.date(),
});

export default function EditProfile({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { email } = user;
  const { name } = user;
  const { nameKid } = user;
  const { kidBD } = user;
  const [email1, setEmail] = useState(email);
  const [name1, setName] = useState(name);
  const [nameKid1, setNameKid] = useState(nameKid);
  const [kidBD1, setKidBD] = useState(kidBD);

  const data = { email1, name1, nameKid1, kidBD1 };
  console.log("data", data);
  const handleFormSubmit = () => {
    dispatch(
      updateProfile(data, () => {
        handleShow();
      })
    );
  };

  const handleUpdateButton = () => {
    window.location.href = "/personal";
  };

  return (
    <div
      className="h-100 p-5 text-white bg-dark main-container-center"
      style={{
        position: "absolute",
        display: "inline-block",
        width: "auto",
        marginTop: "5%",
        minWidth: "82%",
        minHeight: "100%",
      }}
    >
      <Form className="form-signup" onSubmit={handleSubmit(handleFormSubmit)}>
        <h3 className="centered">Edit Profile</h3>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Update email</Form.Label>
          <Form.Control
            type="email"
            value={email1}
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicName">
          <Form.Label>Update name</Form.Label>
          <Form.Control
            type="text"
            value={name1}
            placeholder={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicNameKid">
          <Form.Label>Update kid's name</Form.Label>
          <Form.Control
            type="text"
            value={nameKid1}
            placeholder={nameKid}
            onChange={(e) => setNameKid(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicDate">
          <Form.Label>Update kid's birthday</Form.Label>
          <Form.Control
            type="date"
            value={kidBD1}
            placeholder={kidBD}
            onChange={(e) => setKidBD(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="centered-button">
          Update
        </Button>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body className="modal-title">
            {name1}, your profile was updated successfully.
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="modal-update"
              variant="primary"
              onClick={handleUpdateButton}
            >
              Woohoo! As much as anything, I love to sleep!
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
}
