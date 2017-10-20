import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';

const Public = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (loggingIn) return <div>LoggingIn !! show spinner</div>;
    return (!authenticated &&
    React.createElement(component, { ...props, loggingIn, authenticated })) ||
    <Redirect to="/dashboard" />;
  }} />
);

Public.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  component: PropTypes.func,
};

export default Public;
