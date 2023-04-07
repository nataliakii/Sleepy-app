import { Row, Col } from "react-bootstrap";
import { CircleLoader } from "react-spinners";
import { Container, Grid } from "@mui/material";

export default function Loading({ children }) {
  return (
    // <Container
    //   maxWidth="xl"
    //   sx={{
    //     backgroundColor: "#ecebeb",
    //     height: "100vh",
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     py: 4,
    //     zIndex: 999,
    //   }}
    // >
    <>
      <Grid container justifyContent="center" sx={{ mt: 1, mb: 1 }}>
        <Grid item md={3} xs={12} sm={12} lg={3} xl={3} offset={5}>
          <Grid container justifyContent="center" spacing={2} wrap="nowrap">
            <Grid item>
              <CircleLoader color="#bf1650" size={50} speedMultiplier={2} />
            </Grid>
            <Grid item>
              <CircleLoader color="#bf1650" size={50} speedMultiplier={2} />
            </Grid>
            <Grid item>
              <CircleLoader color="#bf1650" size={50} speedMultiplier={2} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {children}
    </>
  );
}
