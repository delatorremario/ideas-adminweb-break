import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleResetPassword from '../../../modules/reset-password';

export default class ResetPassword extends React.Component {
  componentDidMount() {
    handleResetPassword({ component: this, token: this.props.match.params.token });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="login-box-container">
        <div className="login-box">
          <div className="modal-header">
            <h1 className="page-header">Reset Password</h1>
          </div>
          <hr />
          <Alert bsStyle="info">
                To reset your password, enter a new one below. You will be logged in
    with your new password.
            </Alert>
              <form
                ref={form => (this.resetPasswordForm = form)}
                className="reset-password"
                onSubmit={this.handleSubmit}
              >
                <FormGroup>
                  <ControlLabel>New Password</ControlLabel>
                  <FormControl
                    type="password"
                    ref="newPassword"
                    name="newPassword"
                    placeholder="New Password"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Repeat New Password</ControlLabel>
                  <FormControl
                    type="password"
                    ref="repeatNewPassword"
                    name="repeatNewPassword"
                    placeholder="Repeat New Password"
                  />
                </FormGroup>
                <Button type="submit" className="btn btn-success btn-lg btn-block">Reset Password &amp; Login</Button>
              </form>
              <p> <span> <Link to="/login"> Already have an account? Log In.</Link></span></p>

        </div>
      </div>


    );
  }
}

ResetPassword.propTypes = {
  match: React.PropTypes.object,
};
