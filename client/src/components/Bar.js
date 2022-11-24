import React from 'react';
import Nav from 'react-bootstrap/Nav';

function Bar() {
  return (
    <Nav
      // defaultActiveKey="/"
      className="flex-column"
      style={{
        position: 'sticky',
        marginTop: '11%',
        display: 'inline-block',
        heigh: '100%',
      }}
    >
      {/* <Nav.Link
        style={{
          color: 'rgb(60,125,128)',
        }}
        href="/"
      >
        Home
      </Nav.Link> */}
      <Nav.Link
        style={{
          color: 'rgb(60,125,128)',
        }}
        eventKey="link-1"
      >
        Sleeping tips
      </Nav.Link>
      <Nav.Link
        style={{
          color: 'rgb(60,125,128)',
        }}
        eventKey="link-2"
      >
        Playing tips
      </Nav.Link>
      <Nav.Link
        style={{
          color: 'rgb(60,125,128)',
        }}
        eventKey="link-3"
      >
        Find playground
      </Nav.Link>
      <Nav.Link
        style={{
          color: 'rgb(60,125,128)',
        }}
        eventKey="link-4"
      >
        Find restaurant with kidsroom
      </Nav.Link>
    </Nav>
  );
}

export default Bar;
