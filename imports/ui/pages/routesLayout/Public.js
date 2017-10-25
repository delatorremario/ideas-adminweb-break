import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loading from '../../components/Loading';

const Public = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (loggingIn) return <Loading style="loader-container-fixed"/>;
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
