import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

export default async function Error() {
  // const dog = await axios.get(https://dog.ceo/api/breeds/image/random);
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <p>Something get wrong. Meanwhile enjoy this dog.</p>
          <img
            style={{
              height: "420px",
              maxWidth: "420px",
              alignSelf: "center",
            }}
            src="https://images.dog.ceo/breeds/beagle/n02088364_4823.jpg"
            alt="dog"
          />
        </Col>
      </Row>
    </Container>
  );
}
