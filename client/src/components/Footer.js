/* eslint-disable no-unused-vars */
import * as React from "react";
import { Box, Container, Typography, Link } from "@mui/material/";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function Copyright({ name, url }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const fontSize = isSmallScreen ? "0.8rem" : "1rem";

  return (
    <Typography
      variant="body2"
      color="text.light"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: fontSize, // Use the fontSize variable
      }}
    >
      <Box sx={{ mr: "1rem" }}>Copyright © </Box>
      <Link color="inherit" href={url}>
        {name}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer(props) {
  const { name, url } = props.companyData;
  return (
    <Box
      component="footer"
      bgcolor="primary.light"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "60px",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.light"
          component="p"
        >
          Made with{" "}
          <FavoriteIcon
            sx={{
              color: "#F5D72C",
            }}
          />
        </Typography>
        <Copyright name={name} url={url} />
      </Container>
    </Box>
  );
}

export default Footer;
