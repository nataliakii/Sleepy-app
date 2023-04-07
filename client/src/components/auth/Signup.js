import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Typography,
  Box,
  styled,
  TextField,
  Button,
  Modal,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { signup } from "../../actions";

const CustomButton = styled(Button)(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.text.light,
  fontWeight: 100,

  "&:hover": {
    color: "#bf1650",
    backgroundColor: "transparent",
  },
  "&:active": {
    transition: "0.3s all ",
    transform: "translateY(3px) ",
    border: "1px solid transparent",
    opacity: "0.01 ",
  },
}));

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
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#ecebeb",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Box
        component="form"
        className="form-signup"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          ml: 2,
          mt: -10,
        }}
      >
        <Typography
          sx={{ textTransform: "uppercase" }}
          variant="h5"
          align="center"
        >
          Signup
        </Typography>
        {errorRender()}
        <Box mt={2}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email && "Email is a required field"}
          />
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            {...register("password", { required: true })}
            error={!!errors.password}
            helperText={errors.password && "Password is a required field"}
          />
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            id="name"
            label="Your name"
            variant="outlined"
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name && "Name is a required field"}
          />
        </Box>

        <Box mt={2}>
          <TextField
            fullWidth
            id="nameKid"
            label="Kid's name"
            variant="outlined"
            {...register("nameKid", { required: true })}
            error={!!errors.nameKid}
            helperText={errors.nameKid && "Kid's name is a required field"}
          />
        </Box>

        <Box mt={2}>
          <TextField
            fullWidth
            id="kidBD"
            label="Kid's Birthday"
            variant="outlined"
            sx={{ mb: 2 }}
            {...register("kidBD", { required: true })}
            error={!!errors.kidBD}
            helperText={errors.kidBD && "Kid's BD is a required field"}
          />
        </Box>

        <CustomButton
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Sign me up
        </CustomButton>
      </Box>

      <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <div className="modal-title">
            {name}, welcome to SleepyApp! Thanks for signing up
          </div>
        </DialogContent>
        <DialogActions>
          <CustomButton
            sx={{ backgroundColor: "primary.main" }}
            onClick={handleSignUpButton}
          >
            Woohoo! The best thing that ever happened to me was sleeping more!
            Where is a sofa here?
          </CustomButton>
        </DialogActions>
      </Dialog>
      {/* <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="modal-title">
          {name}, welcome to SleepyApp! Thanks for signing up
        </Modal.Body>
        <Modal.Footer>
          <CustomButton className="modal-signup" onClick={handleSignUpButton}>
            Woohoo! The best thing that ever happened to me was sleeping more!
            Where is a sofa here ?
          </CustomButton>
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
};

export default Signup;
