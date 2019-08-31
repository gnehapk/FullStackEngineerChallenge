/* eslint-disable no-nested-ternary */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import AdminPage from 'containers/AdminPage/Loadable';
import EmployeeAdminPage from 'containers/EmployeeAdminPage/Loadable';
import EmployeePage from 'containers/EmployeePage/Loadable';
import GlobalStyle from '../../global-styles';
import AuthContext from './Auth';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  const [user, setUser] = useState(null);
  const authProps = {
    user: user || null,
    logout: () => setUser(null),
    login: data => {
      setUser(data);
    },
  };
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="Neha Assignment paypay"
        defaultTitle="React.js Neha Assignment paypay"
      >
        <meta name="description" content="Neha Assignment paypay" />
      </Helmet>

      <AuthContext.Provider value={authProps}>
        <Header />
        {authProps.user != null ? (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/employee-admin/:id" component={EmployeeAdminPage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/employee" component={EmployeePage} />
          </Switch>
        )}
      </AuthContext.Provider>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
