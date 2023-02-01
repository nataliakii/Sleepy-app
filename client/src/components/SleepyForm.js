import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Form, Row } from "react-bootstrap";
import { postForm } from "../actions";

export default function SleepyForm({ user }) {
  const { kidBD } = user;
  const sleepySchema = Yup.object().shape({
    date: Yup.date().required().default(new Date(kidBD)),
    wakeUp: Yup.string().required(),
    nap1Start: Yup.string().required(),
    nap1End: Yup.string().required(),
    nap2Start: Yup.string(),
    nap2End: Yup.string(),
    nap3Start: Yup.string(),
    nap3End: Yup.string(),
    nap4Start: Yup.string(),
    nap4End: Yup.string(),
    bedTime: Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sleepySchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.sleepy?.errorMessage || "");
  const { nameKid } = user;

  const handleFormSubmit = (data) => {
    dispatch(postForm(data, () => navigate("/personal/sleepy-form-get")));
  };

  const renderFormDisplay = () => {
    if (nameKid) {
      return (
        <div
          className="h-auto p-5 text-white bg-dark"
          style={{
            position: "absolute",
            display: "inline-block",
            width: "89%",
            marginTop: "5%",
            float: "left",
            fontWeight: "200",
          }}
        >
          <Form
            className="form-signup"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <h3 className="centered">Submit Sleepy Form</h3>
            <p className="p-1 ">
              Please, provide some info about the time of {nameKid}'s wake up,
              having nap etc.{" "}
            </p>
            {error ? <p className="error-message">{error}</p> : null}
            <Form.Group className="mb-2" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                name="date"
                type="date"
                {...register("date", { required: true })}
              />
              {errors.date && (
                <p className="error-message">Date is a required field</p>
              )}
            </Form.Group>
            <Form.Group className="mb-2" controlId="formTime">
              <Form.Label>Wake up time</Form.Label>
              <Form.Control
                type="time"
                name="wakeUp"
                onChange={(e) => console.log(e)}
                {...register("wakeUp", { required: true })}
              />
              {errors.date && (
                <p className="error-message">
                  Wake up time is a required field
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-2" controlId="formNap1">
              <Form.Label>Nap #1 Start-End</Form.Label>
              <Row>
                <Form.Control
                  className="form-nap-start"
                  name="nap1Start"
                  type="time"
                  onChange={(e) => console.log(e)}
                  {...register("nap1Start", { required: true })}
                />
                <Form.Control
                  className="form-nap-end"
                  name="nap1End"
                  type="time"
                  onChange={(e) => console.log(e)}
                  {...register("nap1End", { required: true })}
                />
              </Row>
              {errors.date && (
                <p className="error-message">Nap#1 is a required field</p>
              )}
            </Form.Group>
            <Form.Group className="mb-2" controlId="formNap2">
              <Form.Label>Nap #2 Start-End</Form.Label>
              <Row>
                <Form.Control
                  className="form-nap-start"
                  name="nap2Start"
                  type="time"
                  {...register("nap2Start")}
                />
                <Form.Control
                  className="form-nap-end"
                  name="nap2End"
                  type="time"
                  {...register("nap2End")}
                />
              </Row>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formNap3">
              <Form.Label>Nap #3 Start-End</Form.Label>
              <Row>
                <Form.Control
                  className="form-nap-start"
                  name="nap3Start"
                  type="time"
                  {...register("nap3Start")}
                />
                <Form.Control
                  className="form-nap-end"
                  name="nap3End"
                  type="time"
                  {...register("nap3End")}
                />
              </Row>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formNap4">
              <Form.Label>Nap #4 Start-End</Form.Label>
              <Row>
                <Form.Control
                  className="form-nap-start"
                  name="nap4Start"
                  type="time"
                  {...register("nap4Start")}
                />
                <Form.Control
                  className="form-nap-end"
                  name="nap4End"
                  type="time"
                  {...register("nap4End")}
                />
              </Row>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBedTime">
              <Form.Label>Bed time</Form.Label>
              <Form.Control
                name="bedTime"
                type="time"
                {...register("bedTime", { required: true })}
              />
              {errors.date && (
                <p className="error-message">Bed time is a required field</p>
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="centered-button-form"
            >
              Send schedule
            </Button>
          </Form>
        </div>
      );
    }
    return (
      <div
        className="h-100 p-4 text-white bg-dark"
        style={{
          position: "absolute",
          display: "inline-block",
          marginTop: "5%",
          minWidth: "82%",
          minHeight: "100%",
        }}
      >
        <h6 className="art-color margin-top">
          Please, sign in for being able to get your personal recommendations on
          your baby's sleep schedule.
        </h6>
      </div>
    );
  };

  return <>{renderFormDisplay()}</>;
}
