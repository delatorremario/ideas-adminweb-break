/* eslint-disable no-undef */
// import { browserHistory } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

import { selectByUser } from '../../imports/api/corporations/methods';

let component;

const login = () => {
  const email = document.querySelector('[name="emailAddress"]').value;
  const password = document.querySelector('[name="password"]').value;

  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      console.log('--login error--', error)
      const message = error.reason === "Incorrect password" && 'Contraseña Incorrecta' ||
        error.reason === "User not found" && 'Usuario no encontrado' ||
        error.reason;
      Bert.alert(message, 'warning');
      return false;
    }
    /* assign default selected corporarion */
    selectByUser.call({}, (err) => {
      if (err) {
        Bert.alert(err.message, 'danger')
      }
      // else {
      //    Bert.alert('Lgin', 'success')
      // }
    });
  });
};

const validate = () => {
  $(component.loginForm).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      emailAddress: {
        required: 'Ingrese un correo',
        email: 'no tiene formato de correo',
      },
      password: {
        required: 'Ingrese una contraseña',
      },
    },
    submitHandler() { login(); },
  });
};

export default function handleLogin(options) {
  component = options.component;
  validate();
}
