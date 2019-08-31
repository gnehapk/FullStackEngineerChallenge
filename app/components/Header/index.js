/* eslint-disable no-unused-expressions */
import React, { useContext, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
// import A from './A';
// import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
import LoginModal from '../LoginModal';
import AuthContext from '../../containers/App/Auth';

function Header() {
  const auth = useContext(AuthContext);
  const logout = () => {
    auth.logout();
  };

  const login = async (email, password) => {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    });
    const json = await response.json();
    json.user != null ? auth.login(json.user) : null;
    return json;
  };

  return (
    <div>
      <NavBar>
        {auth.user != null ? (
          <Fragment>
            <HeaderLink to="/">
              <FormattedMessage {...messages.home} />
            </HeaderLink>
            <HeaderLink to="/admin">
              <FormattedMessage {...messages.admin} />
            </HeaderLink>
            <Button onClick={logout}>Log out</Button>
          </Fragment>
        ) : (
          <Fragment>
            <HeaderLink to="/">
              <FormattedMessage {...messages.home} />
            </HeaderLink>
            <HeaderLink to="/employee">
              <FormattedMessage {...messages.employee} />
            </HeaderLink>
            <LoginModal handleLogin={login} />
          </Fragment>
        )}
      </NavBar>
    </div>
  );
}

export default Header;
