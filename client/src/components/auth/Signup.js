import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Form, Modal } from "react-bootstrap";
import { signup } from "../../actions";

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  name: Yup.string().required(),
  nameKid: Yup.string().required(),
  kidBD: Yup.date().required(),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.errorMessage);
  const name = useSelector((state) => state.auth.name);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormSubmit = (data) => {
    dispatch(
      signup(data, () => {
        handleShow();
      })
    );
  };

  const handleSignUpButton = () => {
    window.location.href = "/personal";
  };

  const errorRender = () => {
    if (error) {
      return <p className="error-message">{error}</p>;
    }
  };

  return (
    <div
      className="h-auto p-5 text-white bg-dark"
      style={{
        position: "absolute",
        display: "inline-block",
        width: "100%",
        marginTop: "5%",
      }}
    >
      <Form className="form-signup" onSubmit={handleSubmit(handleFormSubmit)}>
        <h3 className="centered">Signup</h3>
        {errorRender()}
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="error-message">Email is a required field</p>
          )}
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="error-message">Password is a required field</p>
          )}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="your name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="error-message">Name is a required field</p>
          )}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicNameKid">
          <Form.Label>Your kid's name</Form.Label>
          <Form.Control
            placeholder="kid's name"
            {...register("nameKid", { required: true })}
          />
          {errors.nameKid && (
            <p className="error-message">Please, provide your kid's name</p>
          )}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicDate">
          <Form.Label>Your kid's birthday</Form.Label>
          <Form.Control
            type="date"
            {...register("kidBD", { required: true })}
          />
          {errors.kidBD && (
            <p className="error-message">Please, provide your kid's birthday</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="centered-button">
          Sign me up
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="modal-title">
          {name}, welcome to SleepyApp! Thanks for signing up
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="modal-signup"
            variant="primary"
            onClick={handleSignUpButton}
          >
            Woohoo! The best thing that ever happened to me was sleeping more!
            Where is a sofa here ?
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Signup;
