import React from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleSignup from '../../../modules/signup';

export default class Signup extends React.Component {
  componentDidMount() {
    handleSignup({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    console.log('PROPS', this.props);
    return (
      <div className="login-box-container">
        <div className="login-box">
          <div className="modal-header">
            <h1 className="page-header">Crear Cuenta</h1>
          </div>
          <hr />
          <form
            className="signup"
            ref={form => (this.signupForm = form)}
            onSubmit={this.handleSubmit}
          >
            <FormGroup>
              <ControlLabel>Nombre</ControlLabel>
              <FormControl
                type="text"
                ref="firstName"
                name="firstName"
                placeholder="Nombre"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Apellido</ControlLabel>
              <FormControl
                type="text"
                ref="lastName"
                name="lastName"
                placeholder="Apellido"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                ref="emailAddress"
                name="emailAddress"
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Contraseña</ControlLabel>
              <FormControl
                type="password"
                ref="password"
                name="password"
                placeholder="Contraseña"
              />
            </FormGroup>
            <Button type="submit" className="btn btn-success btn-lg btn-block">Crear Cuenta</Button>
          </form>
          <p> <span> <Link to="/login">¿Ya tienes una cuenta? Iniciar sesión.</Link></span></p>
        </div>
      </div>
    );
  }
}
