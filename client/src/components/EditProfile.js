/* eslint-disable no-unused-vars */
import React, { UseState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { submitEditProfile } from '../actions';

const userSchema = Yup.object().shape({
  email: Yup.string().email(),
  name: Yup.string(),
  nameKid: Yup.string(),
  kidBD: Yup.date(),
});

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector((state) => state.auth.errorMessage);
  const email = useSelector((state) => state.auth.email);
  const name = useSelector((state) => state.auth.name);
  const nameKid = useSelector((state) => state.auth.nameKid);
  const kidBD = useSelector((state) => state.auth.nameKid);
  // const [email1, setEmail] = UseState(email);
  // const [name1, setName] = UseState(name);
  // const [nameKid1, setNameKid] = UseState(nameKid);
  // const [kidBD1, setKidBD] = UseState(kidBD);

  const handleFormSubmit = (data) => {
    dispatch(
      submitEditProfile(data, () => {
        history.push('/personal');
      })
    );
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
        position: 'absolute',
        display: 'inline-block',
        width: '100%',
        marginTop: '5%',
      }}
    >
      <Form className="form-signup" onSubmit={handleSubmit(handleFormSubmit)}>
        <h3 className="centered">Edit Profile</h3>
        {errorRender()}
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Update email</Form.Label>
          <Form.Control
            type="email"
            // value={email1}
            placeholder={email}
            // onChange={(event) => setEmail(event.target.value)}
            {...register('email')}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicName">
          <Form.Label>Update name</Form.Label>
          <Form.Control
            // value={name1}
            placeholder={name}
            // onChange={(event) => setName(event.target.value)}
            {...register('name')}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicNameKid">
          <Form.Label>Update kid's name</Form.Label>
          <Form.Control
            // value={nameKid1}
            placeholder={nameKid}
            // onChange={(event) => setNameKid(event.target.value)}
            {...register('nameKid')}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicDate">
          <Form.Label>Update kid's birthday</Form.Label>
          <Form.Control
            type="date"
            // value={kidBD1}
            placeholder={kidBD}
            // onChange={(event) => setKidBD(event.target.value)}
            {...register('kidBD')}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="centered-button">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditProfile;
