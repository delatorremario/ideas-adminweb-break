import React from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleLogin from '../../../modules/login';
import IdeasLogo from '../../components/IdeasLogo';

class Login extends React.Component {

  state = {
    fontSize: '10em'
  }

  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { fontSize } = this.state;
    return (
      <div className="login-box-container">

        <div className="login-box">
          <div className="login-logo">
            <IdeasLogo fontSize={fontSize} />
          </div>
          <hr />
          <form
            ref={form => (this.loginForm = form)}
            className="login"
            onSubmit={this.handleSubmit}
          >
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <i className="fa fa-envelope-o"></i>
              <FormControl
                type="email"
                ref="emailAddress"
                name="emailAddress"
                placeholder="Email"
                autoComplete="off"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                <span>Contraseña</span>
              </ControlLabel>
              <i className="fa fa-key"></i>
              <FormControl
                type="password"
                ref="password"
                name="password"
                placeholder="Contraseña"
              />
            </FormGroup>
            <Button type="submit" bsStyle="primary" className="btn-lg btn-3d btn-block">Iniciar Sesión</Button>
            <p className="already-account">
              <a className="col-halfpad-right" href="/recover-password">Recuperar Contraseña</a> | <a className="col-halfpad-left" href="/signup">Crear una cuenta</a>
            </p>
          </form>
        </div>

      </div>
    );
  }
}

export default Login;
