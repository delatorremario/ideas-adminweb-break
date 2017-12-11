import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';
import _ from 'lodash';
import BlankPage from '../BlankPage';
import Loading from '../../components/Loading';
import EditProfile from '../../containers/profile/EditProfile';


const Authenticated = ({ loggingIn, authenticated, component, ...rest }) => {
  const pathname = location && location.pathname;
  const user = Meteor.user();
  const userRoles = (user && user.roles) || [];
  let roleAutherized;

  switch (pathname) {
    case '/corporations':
      roleAutherized = _.includes(userRoles, 'SuperAdminHolos');
      break;
    default:
      roleAutherized = true;
  }

  return (
    !_.includes(pathname, 'recover-password') &&
    !_.includes(pathname, 'reset-password') &&
    !_.includes(pathname, 'signup') &&
    <Route {...rest} render={(props) => {
      if (loggingIn) return <Loading style="loader-container-fixed" />;
      if (authenticated && !roleAutherized) return <BlankPage />;
      return (
        authenticated &&
        React.createElement(component, { ...props, loggingIn, authenticated }))
        || (location.pathname !== '/login' && <Redirect to="/login" />);
    }} />
  );
};

Authenticated.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  component: PropTypes.func,
};

export default Authenticated;
