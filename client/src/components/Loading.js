import { Container, Row, Col } from "react-bootstrap";
import { CircleLoader } from "react-spinners";

export default function Loading() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={{ span: 3, offset: -1 }}>
          <CircleLoader color="#bf1650" size={120} speedMultiplier={2} />
        </Col>
      </Row>
    </Container>
  );
}
