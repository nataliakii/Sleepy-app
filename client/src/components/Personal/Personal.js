import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProfile } from "../../actions";
import {
  Container,
  Typography,
  styled,
  Button,
  Box,
  Dialog,
  DialogContent,
  Stack,
  Grid,
} from "@mui/material";

const CustomButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
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
    opacity: "0.2 ",
  },
}));

export default function Personal() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.name);
  const kidName = useSelector((state) => state.auth.nameKid);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleDeleteButton = () => {
    dispatch(deleteProfile());
    window.location.href = "/";
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
      <Typography variant="h6" marginBottom="36px">
        {name}'s and {kidName}'s personal page
      </Typography>

      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
          }}
        >
          <CustomButton
            sx={{ mt: 5, mb: 2, width: "20rem" }}
            type="button"
            variant="contained"
            size="large"
            className="main-button personal display-block padding-button"
            onClick={() => navigate("/sleepy-form-post")}
          >
            Check if {kidName} sleeps enough (so you do!)
          </CustomButton>
          <CustomButton
            sx={{ mb: 2, width: "20rem" }}
            type="button"
            variant="contained"
            size="large"
            className="main-button personal display-block padding-button"
            onClick={() => navigate("/personal/all-docs-display")}
          >
            All your sleepy docs
          </CustomButton>
          <CustomButton
            sx={{ mb: 2, width: "20rem" }}
            type="button"
            variant="contained"
            size="large"
            className="main-button personal display-block padding-button"
            onClick={() => navigate("/personal/edit")}
          >
            Edit personal info
          </CustomButton>
          <CustomButton
            sx={{ width: "20rem" }}
            variant="contained"
            size="large"
            className="main-button personal display-block delete-btn"
            onClick={handleShow}
          >
            Delete Profile
          </CustomButton>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <img
            src="/panda.jpg"
            alt="panda"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>

      <Dialog open={show} onClose={handleClose} centered>
        <DialogContent sx={{ p: 3, textAlign: "center" }}>
          <Typography
            variant="body1"
            component="p"
            color="error.dark"
            marginBottom={5}
          >
            {name}, do you really want to delete your profile?
          </Typography>
          <Stack direction="row" spacing={2}>
            <CustomButton
              variant="contained"
              size="large"
              onClick={handleClose}
            >
              No, it's just that I want to sleep more.
            </CustomButton>
            <CustomButton
              variant="contained"
              size="large"
              onClick={handleDeleteButton}
            >
              Yes, delete it.
            </CustomButton>
          </Stack>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
