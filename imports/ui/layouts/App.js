import React, { PropTypes } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Public from '../pages/Public';
import Authenticated from '../pages/Authenticated';
// import Index from '../pages/Index';
import Login from '../pages/Login';
// Layouts components pages

import MainWrapper from './MainWrapper';

const App = appProps => (
  <Router>
    <div>
       {/* <Route exact path="/" component={Index} /> */}
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
