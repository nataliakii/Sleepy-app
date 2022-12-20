/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions';

const Nav = ({ user }) => {
  const dispatch = useDispatch();
  const { name } = user;
  console.log('user from Nav', user);

  const handleSignOutClick = () => {
    dispatch(signout());
    window.location.href = '/';
  };

  const renderLinks = () => {
    if (name) {
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
              className="white"
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
          SleepyApp
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
