import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchErrorPic } from "../actions";

export default function Error() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchErrorPic());
  }, []);
  const dog = useSelector((state) => state.error);
  console.log("dog from container", dog);
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <p className="error-message center">
            Ooops! Nothing to display, there's still something to show you
          </p>
          <img
            style={{
              maxWidth: "520px",
            }}
            src={dog}
            alt="dog"
          />
        </Col>
      </Row>
    </Container>
  );
}
