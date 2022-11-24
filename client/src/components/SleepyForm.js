/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { postForm } from '../actions';

const sleepySchema = Yup.object().shape({
  date: Yup.date().required(),
  wakeUp: Yup.string().required(),
  // nap1: { start: Yup.string().required(), end: Yup.string().required() },
  // nap2: { start: Yup.string(), end: Yup.string() },
  // nap3: { start: Yup.string(), end: Yup.string() },
  // nap4: { start: Yup.string(), end: Yup.string() },
  bedTime: Yup.string().required(),
});

export default function SleepyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sleepySchema),
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector((state) => state.auth.authenticated);

  const handleFormSubmit = (data) => {
    dispatch(
      postForm(data, () => {
        history.push('/sleepy-form-get');
      })
    );
  };

  if (authenticated) {
    return (
      <div
        className="h-auto p-5 text-white bg-dark"
        style={{
          position: 'absolute',
          display: 'inline-block',
          width: '100%',
          marginTop: '5%',
          float: 'left',
        }}
      >
        <Form className="form-signup" onSubmit={handleSubmit(handleFormSubmit)}>
          <h3 className="centered">Submit Sleepy Form</h3>
          <Form.Group className="mb-2" controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              {...register('date', { required: true })}
            />
            {errors.date && (
              <p className="error-message">Date is a required field</p>
            )}
          </Form.Group>
          <Form.Group className="mb-2" controlId="formTime">
            <Form.Label>Wake up time</Form.Label>
            <Form.Control
              type="time"
              {...register('wakeUp', { required: true })}
            />
            {errors.date && (
              <p className="error-message">Wake up time is a required field</p>
            )}
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBedTime">
            <Form.Label>Bed time</Form.Label>
            <Form.Control
              type="time"
              {...register('bedTime', { required: true })}
            />
            {errors.date && (
              <p className="error-message">Bed time is a required field</p>
            )}
          </Form.Group>
          <Button variant="primary" type="submit" className="centered-button">
            Send schedule
          </Button>
        </Form>
      </div>
    );
  }
}
