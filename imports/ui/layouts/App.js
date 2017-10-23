import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Public from '../pages/routesLayout/Public';
import Authenticated from '../pages/routesLayout/Authenticated';

// import Index from '../pages/Index';

import Login from '../pages/singinup/Login';
import RecoverPassword from '../pages/singinup/RecoverPassword';
import ResetPassword from '../pages/singinup/ResetPassword';
import Signup from '../pages/singinup/Signup';

// Layouts components pages
import MainWrapper from '../containers/Main'

const App = appProps => (
  <Router>
    <div>
      {/* <Route exact path="/" component={Index} /> */}
      {/* <Route exact path="/" component={Login} {...appProps} /> */}

      <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
      <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
      <Route name="signup" path="/signup" component={Signup} />

      <Public path="/login" component={Login} {...appProps} />
      <Authenticated path="/" component={MainWrapper} {...appProps} />
    </div>
  </Router>
);

App.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
};

const composer = (props, onData) => {
  const loggingIn = Meteor.loggingIn();
  onData(null, {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
  });
};

export default composeWithTracker(composer)(App);
