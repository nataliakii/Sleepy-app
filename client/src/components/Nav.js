/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
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
            <LinkButton href="#" onClick={handleSignOutClick}>
              Sign Out
            </LinkButton>
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
    <Container fluid className="nav-container">
      <div id="logo">
        <NavLink className="white" to="/">
          SleepyApp
        </NavLink>
      </div>

      <div className="nav-container-right">{renderLinks()}</div>
    </Container>
  );
};

export default Nav;

const LinkButton = styled.button`
  margin-top: -1em;
  background: none;
  border: none;
  // cursor: pointer;
  color: whitesmoke;
  // font-family: Oswald, sans-serif;
  // font-size: 20px;
`;
