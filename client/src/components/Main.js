import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography, styled } from "@mui/material";
import { fetchFunFact } from "../actions";
import { MdAccessibilityNew } from "react-icons/md";
import Footer from "./Footer";

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
    opacity: "0.8 ",
  },
}));

export default function Main({ user, companyData }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFunFact());
  }, []);
  const funFact = useSelector((state) => state.funFact);
  const navigate = useNavigate();
  const { name } = user;

  let str = "";
  const renderStringName = () => {
    if (name) {
      return (str = name);
    }
    return (str = "this is SleepyApp");
  };

  const renderButton = () => {
    if (name) {
      return (
        <CustomButton
          variant="contained"
          size="large"
          onClick={() => navigate("/sleepy-form-post")}
          sx={{ mt: 2 }}
        >
          I love sleeping more than anything! I want to submit a form.
        </CustomButton>
      );
    } else
      return (
        <CustomButton
          variant="contained"
          size="large"
          onClick={() => navigate("/form-non-auth")}
          sx={{ mt: 2 }}
        >
          I love sleeping more than anything! I want to submit a form.
        </CustomButton>
      );
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
      <Typography variant="h2" align="center" gutterBottom sx={{ mt: -10 }}>
        Hello, {renderStringName()}
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        We're on a mission to help new moms get the sleep they deserve. Let us
        help you create a peaceful and restful environment for you and your
        little one.
      </Typography>

      {renderButton()}
      <CustomButton
        variant="contained"
        size="large"
        onClick={() => navigate("/map")}
        sx={{ mt: 2 }}
      >
        Show me a map with nearby playgrounds!
      </CustomButton>
      <CustomButton
        variant="contained"
        size="large"
        onClick={() => navigate("/find-restaurant")}
        sx={{ mt: 2 }}
      >
        I want some entertainment!
      </CustomButton>
      <Typography variant="subtitle1" align="center" sx={{ mt: 4 }}>
        <em>
          <MdAccessibilityNew />
          {funFact}
        </em>
      </Typography>
      <Footer companyData={companyData} />
    </Container>
  );
}
