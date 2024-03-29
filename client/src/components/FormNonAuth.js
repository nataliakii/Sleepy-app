import React, { useState } from "react";
import dayjs from "dayjs";
import { Container, Typography, Stack, Button, styled } from "@mui/material";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { postFormNoAuth } from "../actions";
import { useTheme } from "@mui/material/styles";
import {
  DatePicker,
  SingleInputTimeRangeField,
} from "@mui/x-date-pickers-pro/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers/";
import sleepyFormHelper from "../hooks/sleepyFormHelper";

const CustomButton = styled(Button)(({ theme }) => ({
  fontSize: "16px",
  padding: 15,
  color: theme.palette.text.light,
  fontWeight: 100,
  "&:hover": {
    color: "#bf1650",
    backgroundColor: "transparent",
  },
  "&:active": {
    transition: "0.3s all ",
    transform: "translateY(3px) ",
    opacity: "0.2",
  },
}));

const CustomError = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  color: theme.palette.error.main,
  m: "-100",
  padding: "0.5px",
  "&::before": {
    display: "inline",
    content: '"⚠ "',
  },
}));

export default function FormNonAuth() {
  const theme = useTheme();
  const startTime = dayjs("11:00", "HH:mm");
  const endTime = dayjs("11:45", "HH:mm");
  const [selectedNap1, setSelectedNap1] = useState([startTime, endTime]);
  const sleepySchema = Yup.object().shape({
    bd: Yup.date().required("Birthday of your kid is required"),
    date: Yup.date()
      .min(
        Yup.ref("bd"),
        "Kid's BD appeared to be after the date of sleepy doc, which is forbidden by the laws of physics, you need to revise the form and sleep more"
      )
      .required("Date is required"),
    wakeUp: Yup.string().required("Wake up time is required"),
    nap1TimeRange: Yup.mixed().test(
      "nap1TimeRange",
      "Nap1 should be after WakeUp, End should be after Start",
      function (value) {
        const nap1Start = value[0];
        const nap1End = value[1];
        const wakeUp = this.parent.wakeUp;
        if (
          nap1Start &&
          nap1End &&
          nap1End.isAfter(nap1Start) &&
          nap1Start.isAfter(wakeUp)
        ) {
          return true;
        } else {
          return false;
        }
      }
    ),
    nap2TimeRange: Yup.mixed().test(
      "nap2TimeRange",
      "Nap2 should be after Nap1",
      function (value) {
        if (!value) {
          return true;
        }
        const nap1End = this.parent.nap1TimeRange[1];
        if (value[1].isAfter(value[0]) && value[0].isAfter(nap1End)) {
          return true;
        } else {
          return false;
        }
      }
    ),
    nap3TimeRange: Yup.mixed().test(
      "nap3TimeRange",
      "Nap3 should be after Nap2",
      function (value) {
        if (!value) {
          return true;
        }
        const nap2End = this.parent?.nap2TimeRange[1] || null; // Replace with the actual field name for lastNap

        const valueDate = new Date(value[0]);
        const valueDateEnd = new Date(value[1]);
        const nap2EndValue = new Date(nap2End);

        return valueDate > nap2EndValue && valueDateEnd > valueDate;
      }
    ),
    nap4TimeRange: Yup.mixed().test(
      "nap4TimeRange",
      "Nap4 should be after Nap3",
      function (value) {
        if (!value) {
          return true;
        }
        const nap3End = this.parent?.nap3TimeRange[1] || null; // Replace with the actual field name for lastNap

        const valueDate = new Date(value[0]);
        const valueDateEnd = new Date(value[1]);
        const nap3EndValue = new Date(nap3End);

        return valueDate > nap3EndValue && valueDateEnd > valueDate;
      }
    ),
    bedTime: Yup.string()
      .required("Bed time is required")
      .test(
        "bedTime",
        "Bed time cannot be before all naps and wakeUp time",
        function (value) {
          let lastNap;
          const wakeUp = this.parent.wakeUp;
          if (this.parent?.nap4TimeRange) {
            lastNap = this.parent.nap4TimeRange[1];
          } else if (this.parent?.nap3TimeRange) {
            lastNap = this.parent.nap3TimeRange[1];
          } else if (this.parent?.nap2TimeRange) {
            lastNap = this.parent.nap2TimeRange[1];
          } else if (this.parent?.nap1TimeRange) {
            console.log(this.parent?.nap1TimeRange);
            lastNap = this.parent.nap1TimeRange[1];
          }

          if (value && lastNap && wakeUp) {
            return (
              new Date(value) >= new Date(lastNap) &&
              new Date(value) >= new Date(wakeUp)
            );
          } else {
            return false;
          }
        }
      ),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  const handleNap1 = (time) => {
    const timeNew = [dayjs(time[0], "HH:mm"), dayjs(time[1], "HH:mm")];
    formik.setFieldValue("nap1TimeRange", [timeNew[0], timeNew[1]]);
    setSelectedNap1(timeNew);
    console.log(formik);
  };
  const handleNap2 = (time) => {
    const timeNew = [dayjs(time[0], "HH:mm"), dayjs(time[1], "HH:mm")];
    formik.setFieldValue("nap2TimeRange", [timeNew[0], timeNew[1]]);
  };
  const handleNap3 = (time) => {
    const timeNew = [dayjs(time[0], "HH:mm"), dayjs(time[1], "HH:mm")];
    formik.setFieldValue("nap3TimeRange", [timeNew[0], timeNew[1]]);
  };
  const handleNap4 = (time) => {
    const timeNew = [dayjs(time[0], "HH:mm"), dayjs(time[1], "HH:mm")];
    formik.setFieldValue("nap4TimeRange", [timeNew[0], timeNew[1]]);
  };

  const formik = useFormik({
    initialValues: {
      date: "",
      wakeUp: "",
      nap1TimeRange: selectedNap1,
      nap2TimeRange: null,
      nap3TimeRange: null,
      nap4TimeRange: null,
      bedTime: "",
    },
    validationSchema: sleepySchema,
    onSubmit: (values) => {
      console.log(sleepyFormHelper(values));
      const newValues = sleepyFormHelper(values);
      dispatch(postFormNoAuth(newValues, () => navigate("/result-non-auth")));
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.noAuthForm?.errorMessage);

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#ecebeb",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        marginTop={1}
        align="center"
        sx={{
          [theme.breakpoints.down("md")]: {
            fontSize: "1.5rem",
          },
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.2rem",
          },
          [theme.breakpoints.down("xs")]: {
            fontSize: "1rem",
          },
          [theme.breakpoints.down("1024")]: {
            [theme.breakpoints.down("600")]: {
              fontSize: "1rem",
            },
          },
        }}
      >
        Submit Sleepy Form
      </Typography>
      <Typography variant="body1" paragraph sx={{ mt: 1 }}>
        Please provide some information about the time of your kid's wake up,
        naps, etc.
      </Typography>
      {error ? <CustomError>{error}</CustomError> : null}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit}>
          <Stack
            spacing={1}
            direction="column"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <DatePicker
              required
              sx={{ width: "20rem" }}
              label="Kid's Birthday"
              maxDate={dayjs()}
              value={formik.values.bd}
              onChange={(date) => formik.setFieldValue("bd", date)}
            />
            {formik.errors.bd && formik.touched.bd && (
              <CustomError>{formik.errors.bd} </CustomError>
            )}
            <DatePicker
              required
              sx={{ width: "20rem" }}
              label="Date"
              maxDate={dayjs()}
              value={formik.values.date}
              onChange={(date) => formik.setFieldValue("date", date)}
            />
            {formik.errors.date && formik.touched.date && (
              <CustomError>{formik.errors.date} </CustomError>
            )}
            <MobileTimePicker
              required
              sx={{ width: "20rem" }}
              label="Wake Up Time"
              name="wakeUp"
              value={formik.values.wakeUp}
              onChange={(time) => formik.setFieldValue("wakeUp", time)}
            />
            {formik.errors.wakeUp && formik.touched.wakeUp && (
              <CustomError>{formik.errors.wakeUp}</CustomError>
            )}
            <SingleInputTimeRangeField
              required
              sx={{ width: "20rem" }}
              label="Nap1 Start - End"
              value={formik.values.nap1TimeRange}
              onChange={handleNap1}
            />
            {formik.errors.nap1TimeRange && formik.touched.nap1TimeRange && (
              <CustomError>{formik.errors.nap1TimeRange}</CustomError>
            )}
            <SingleInputTimeRangeField
              label="Nap2 Start - End"
              sx={{ width: "20rem" }}
              value={formik.values.nap2TimeRange}
              onChange={handleNap2}
            />
            {formik.errors.nap2TimeRange && formik.touched.nap2TimeRange && (
              <CustomError>{formik.errors.nap2TimeRange}</CustomError>
            )}
            <SingleInputTimeRangeField
              label="Nap3 Start - End"
              sx={{ width: "20rem" }}
              value={formik.values.nap3TimeRange}
              onChange={handleNap3}
            />
            {formik.errors.nap3TimeRange && formik.touched.nap3TimeRange && (
              <CustomError>{formik.errors.nap3TimeRange}</CustomError>
            )}
            <SingleInputTimeRangeField
              label="Nap4 Start - End"
              sx={{ width: "20rem" }}
              value={formik.values.nap4TimeRange}
              onChange={handleNap4}
            />
            {formik.errors.nap4TimeRange && formik.touched.nap4TimeRange && (
              <CustomError>{formik.errors.nap4TimeRange}</CustomError>
            )}
            <MobileTimePicker
              required
              label="BedTime"
              name="bedTime"
              value={formik.values.bedTime}
              onChange={(date) => {
                formik.setFieldValue("bedTime", date);
              }}
              sx={{ mb: 2, width: "20rem" }}
            />
            {formik.errors.bedTime && formik.touched.bedTime && (
              <CustomError>{formik.errors.bedTime}</CustomError>
            )}
            <CustomButton
              variant="primary"
              type="submit"
              className="centered-button-form"
            >
              Send schedule
            </CustomButton>
          </Stack>
        </form>
      </LocalizationProvider>
    </Container>
  );
}
