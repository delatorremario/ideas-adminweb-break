import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';
import _ from 'lodash';

const Authenticated = ({ loggingIn, authenticated, component, ...rest }) => (
  !_.includes(location.pathname, 'recover-password') && !_.includes(location.pathname, 'reset-password') &&
  <Route {...rest} render={(props) => {
    if (loggingIn) return <div>Logging In !!</div>;

    return (
      authenticated &&
      React.createElement(component, { ...props, loggingIn, authenticated }))
      || (location.pathname !== '/login' && <Redirect to="/login" />);
  }} />
);

Authenticated.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  component: PropTypes.func,
};

export default Authenticated;
