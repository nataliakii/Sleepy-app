import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  styled,
} from "@mui/material";
import { signin } from "../../actions";

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
        navigate("/personal");
      })
    );
  };

  const errorRender = () => {
    if (error) {
      return (
        <Typography color="error" variant="body2">
          It seems invalid login or password was provided. Please, try again or
          sign up.
        </Typography>
      );
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
          variant="h5"
          align="center"
          sx={{ textTransform: "uppercase" }}
        >
          Signin
        </Typography>
        <Box mt={2}>{errorRender()}</Box>
        <Box mt={2}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            margin="normal"
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
            type="password"
            variant="outlined"
            margin="normal"
            {...register("password", { required: true })}
            error={!!errors.password}
            helperText={errors.password && "Password is a required field"}
          />
        </Box>
        <Box mt={2}>
          <CustomButton
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </CustomButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
