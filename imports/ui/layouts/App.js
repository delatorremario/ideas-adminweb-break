import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Public from '../pages/Public';
import Authenticated from '../pages/Authenticated';

// import Index from '../pages/Index';

import Login from '../pages/Login';
import RecoverPassword from '../pages/RecoverPassword';
import ResetPassword from '../pages/ResetPassword';

// Layouts components pages

import MainWrapper from './MainWrapper';

const App = appProps => (
  <Router>
    <div>
       {/* <Route exact path="/" component={Index} /> */}
       <Route exact path="/" component={Login} {...appProps} />
       
       <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
       <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />

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
