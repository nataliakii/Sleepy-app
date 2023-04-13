import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Button,
  Typography,
  styled,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import Loading from "./Loading";
import { fetchArtwork } from "../actions";

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

export default function FindRestaurant() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const artwork = useSelector((state) => state.art);
  const handleArtButton = (e) => {
    setLoading(true);
    dispatch(fetchArtwork());
  };
  useEffect(() => {
    setLoading(false);
  }, [artwork]);

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
      <Typography sx={{ color: "primary.main" }}>
        This page is under construction. In the meantime, check out some random
        art.
      </Typography>
      <CustomButton
        variant="contained"
        size="large"
        onClick={handleArtButton}
        sx={{ mt: 2 }}
      >
        Show me artwork
      </CustomButton>

      {loading && <Loading />}

      {artwork.title && (
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Grid item sx={{ maxWidth: 500 }}>
            <img
              style={{
                height: "420px",
                maxWidth: "420px",
                alignSelf: "left",
              }}
              src={artwork.imageURL}
              alt="artwork"
            />
          </Grid>
          <Grid item sx={{ ml: 4, maxWidth: 500 }}>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Title</strong>: {artwork.title}.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Description</strong>: {artwork.description}.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Artist</strong>: {artwork.artist}.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Date</strong>: {artwork.date}. y.
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
