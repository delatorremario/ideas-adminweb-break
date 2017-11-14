import React from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleLogin from '../../../modules/login';

class Login extends React.Component {
  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="login-box-container">

        <div className="login-box">
          <div className="modal-header">
            <h1 className="page-header">Login</h1>
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
                placeholder="Email Address"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                <span>Password</span>
              </ControlLabel>
              <i className="fa fa-key"></i>
              <FormControl
                type="password"
                ref="password"
                name="password"
                placeholder="Password"
              />
            </FormGroup>
            <Button type="submit" bsStyle="primary" className="btn-lg btn-3d btn-block">Login</Button>
            <p className="already-account">
              <a className="col-halfpad-right" href="/recover-password">Fogot your password?</a> | <a class="col-halfpad-left" href="/signup">Create an account</a>
            </p>
          </form>
        </div>

      </div>
    );
  }
}

export default Login;
