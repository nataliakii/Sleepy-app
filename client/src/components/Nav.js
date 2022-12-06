/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions';

const Nav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const name = useSelector((state) => state.auth.name);

  const handleSignOutClick = () => {
    dispatch(
      signout(() => {
        history.push('/');
      })
    );
  };

  const renderLinks = () => {
    if (authenticated) {
      return (
        <>
          {' '}
          <li>
            <Link className="white" to="/personal">
              Hello, {name}
            </Link>
          </li>
          <li>
            <Link
              className="nav-linkbutton"
              type="button"
              to="#"
              onClick={handleSignOutClick}
            >
              Sign Out
            </Link>
          </li>
        </>
      );
    }
    return (
      <>
        <li>
          <Link className="white" to="/signup">
            Sign Up
          </Link>
        </li>
        <li>
          <Link className="white" to="/signin">
            Sign In
          </Link>
        </li>
      </>
    );
  };

  return (
    <Navbar className="nav-container">
      <Container>
        <Navbar.Brand className="white" href="/">
          SleepyAppt
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end none-list">
          {renderLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav;
