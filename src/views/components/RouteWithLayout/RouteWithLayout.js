import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from './../../../handlers/contexts/AuthStore'

const RouteWithLayout = ({ layout: Layout, component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ isAuthenticated}) => (
      <Route render={
        props => isAuthenticated()
        ? <Layout><Component {...props}/></Layout>
        : <Redirect to="/sign-in" />
      } {...rest} />
    )}
  </AuthContext.Consumer>
)

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
