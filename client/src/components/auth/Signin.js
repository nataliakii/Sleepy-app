import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { signin } from '../../actions';

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Signin = () => {
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

  const handleFormSubmit = (data) => {
    dispatch(
      signin(data, () => {
        navigate('/personal');
      })
    );
  };

  const errorRender = () => {
    if (error) {
      return (
        <p className="error-message">
          It seems invalid login or password was provided. Please, try again or
          sing up.
        </p>
      );
    }
  };

  return (
    <div
      className="h-100 p-5 text-white bg-dark"
      style={{
        position: 'absolute',
        display: 'inline-block',
        width: '100%',
        marginTop: '5%',
      }}
    >
      <Form className="form-signup" onSubmit={handleSubmit(handleFormSubmit)}>
        <h3 className="centered">Signin</h3>
        {errorRender()}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email', { required: true })}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          {errors.email && (
            <p className="error-message">Email is a required field</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <p className="error-message">Password is a required field</p>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" className="centered-button">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signin;
