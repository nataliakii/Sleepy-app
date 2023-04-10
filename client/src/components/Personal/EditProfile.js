import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Form, Modal } from "react-bootstrap";
import { updateProfile } from "../../actions";
import { Container, Typography, Box, styled, Button } from "@mui/material";

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
  email: Yup.string().email(),
  name: Yup.string(),
  nameKid: Yup.string(),
  kidBD: Yup.date(),
});

export default function EditProfile({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { email } = user;
  const { name } = user;
  const { nameKid } = user;
  const { kidBD } = user;
  const [email1, setEmail] = useState(email);
  const [name1, setName] = useState(name);
  const [nameKid1, setNameKid] = useState(nameKid);
  const [kidBD1, setKidBD] = useState(kidBD);

  const data = { email1, name1, nameKid1, kidBD1 };
  console.log("data", data);
  const handleFormSubmit = () => {
    dispatch(
      updateProfile(data, () => {
        handleShow();
      })
    );
  };

  const handleUpdateButton = () => {
    window.location.href = "/personal";
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#ecebeb",
        height: "100vh",
        display: "flex",
        flexDirection: "flex-start",
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
          width: "20rem",
        }}
      >
        {/* <Form className="form-signup" onSubmit={handleSubmit(handleFormSubmit)}> */}
        <Typography
          sx={{ textTransform: "uppercase", letterSpacing: "2px" }}
          variant="h5"
          align="center"
        >
          Edit Profile
        </Typography>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label className="art-color">Update email</Form.Label>
          <Form.Control
            type="email"
            value={email1}
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicName">
          <Form.Label className="art-color">Update name</Form.Label>
          <Form.Control
            type="text"
            value={name1}
            placeholder={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicNameKid">
          <Form.Label className="art-color">Update kid's name</Form.Label>
          <Form.Control
            type="text"
            value={nameKid1}
            placeholder={nameKid}
            onChange={(e) => setNameKid(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicDate">
          <Form.Label className="art-color">Update kid's birthday</Form.Label>
          <Form.Control
            type="date"
            value={kidBD1}
            placeholder={kidBD}
            onChange={(e) => setKidBD(e.target.value)}
          />
        </Form.Group>

        <CustomButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Update
        </CustomButton>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body className="modal-title">
            {name1}, your profile was updated successfully.
          </Modal.Body>
          <Modal.Footer>
            <CustomButton
              className="modal-update"
              sx={{ backgroundColor: "primary.main" }}
              onClick={handleUpdateButton}
            >
              Woohoo! As much as anything, I love to sleep!
            </CustomButton>
          </Modal.Footer>
        </Modal>
      </Box>
    </Container>
  );
}
