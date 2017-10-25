import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import handleRecoverPassword from '../../../modules/recover-password';

export default class RecoverPassword extends React.Component {

  state = {
    loading: false
  }

  componentDidMount() {
    handleRecoverPassword({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="login-box-container">
        <div className="login-box">
          <div className="modal-header">
            <h1 className="page-header">Recover Password</h1>
          </div>
          <hr />
              <Alert bsStyle="info">
                Enter your email address below to receive a link to reset your password.
              </Alert>

              {loading && <Alert bsStyle="warning">Sending email!</Alert>}

              <form
                ref={form => (this.recoverPasswordForm = form)}
                className="recover-password"
                onSubmit={this.handleSubmit}
              >
                <FormGroup>
                  <FormControl
                    type="email"
                    ref="emailAddress"
                    name="emailAddress"
                    placeholder="Email Address"
                  />
                </FormGroup>
                <Button type="submit" className="btn btn-success btn-lg btn-block">Recover Password</Button>
              </form>
              <p> <span> <Link to="/login"> Already have an account? Log In.</Link></span></p>
          
         </div>
      </div>
    );
  }
}
