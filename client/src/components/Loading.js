import { Container, Row, Col } from 'react-bootstrap';
import { CircleLoader } from 'react-spinners';

export default function Loading() {
  return (
    <Container className="middle-vertical">
      <Row className="justify-content-md-center">
        <Col xs={5}>
          <CircleLoader color="#bf1650" size={120} speedMultiplier={2} />
        </Col>
      </Row>
    </Container>
  );
}
