import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

export default function Bar() {
  const navigate = useNavigate();
  return (
    <Nav
      // defaultActiveKey="/"
      className="bar flex-column "
      style={{
        position: 'sticky',
        marginTop: '11%',
        display: 'inline-block',
        height: '100%',
        fontWeight: '300',
      }}
    >
      <Nav.Link
        className="color-text"
        eventKey="link-1"
        onClick={() => navigate('/tips-sleep')}
      >
        Sleeping tips
      </Nav.Link>
      <Nav.Link
        className="color-text"
        eventKey="link-4"
        onClick={() => navigate('/map')}
      >
        Find playground
      </Nav.Link>
      <Nav.Link
        className="color-text"
        eventKey="link-4"
        onClick={() => navigate('/find-restaurant')}
      >
        Find restaurant with kidroom
      </Nav.Link>
    </Nav>
  );
}
