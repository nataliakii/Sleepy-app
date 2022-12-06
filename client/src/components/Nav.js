/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions';

const Nav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const name = useSelector((state) => state.auth.name);
  const error = useSelector((state) => state.auth.errorMessage);

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
    if (error) {
      return <p>There was an error while auth {error}</p>;
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

      <div className="nav-container-inner">{renderLinks()}</div>
    </Container>
  );
};

export default Nav;
