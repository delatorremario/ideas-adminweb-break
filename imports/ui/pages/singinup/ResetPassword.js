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
            <h1 className="page-header">Restablecer la contraseña</h1>
          </div>
          <hr />
          <Alert bsStyle="info">
            Para restablecer su contraseña, ingrese una nueva a continuación. Usted va a iniciar sesión con tu nueva contraseña
            </Alert>
          <form
            ref={form => (this.resetPasswordForm = form)}
            className="reset-password"
            onSubmit={this.handleSubmit}
          >
            <FormGroup>
              <ControlLabel>Nueva Contraseña</ControlLabel>
              <FormControl
                type="password"
                ref="newPassword"
                name="newPassword"
                placeholder="New Password"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Repetir Nueva Constraseña</ControlLabel>
              <FormControl
                type="password"
                ref="repeatNewPassword"
                name="repeatNewPassword"
                placeholder="Repeat New Password"
              />
            </FormGroup>
            <Button type="submit" className="btn btn-success btn-lg btn-block">Restablecer Contraseña &amp; Inicio de Sesión</Button>
          </form>
          <p> <span> <Link to="/login">¿Ya tienes una cuenta? Iniciar sesión.</Link></span></p>

        </div>
      </div>


    );
  }
}

ResetPassword.propTypes = {
  match: React.PropTypes.object,
};
