import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import '../../../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js';
import '../../../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js';
import App from '../../ui/layouts/App.js';

Bert.defaults.style = 'growl-top-right';

Meteor.startup(() => {
  render(<App />, document.getElementById('react-root'));
});
