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
    return (
      <div className="login-box-container">
        <div className="login-box">
          <div className="modal-header">
            <h1 className="page-header">Sign Up</h1>
          </div>
          <hr />
         
            <form
              ref={form => (this.signupForm = form)}
              onSubmit={this.handleSubmit}
            >
              <FormGroup>
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  type="text"
                  ref="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  type="text"
                  ref="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Email Address</ControlLabel>
                <FormControl
                  type="text"
                  ref="emailAddress"
                  name="emailAddress"
                  placeholder="Email Address"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  ref="password"
                  name="password"
                  placeholder="Password"
                />
              </FormGroup>
              <Button type="submit" className="btn btn-success btn-lg btn-block">Sign Up</Button>
            </form>
            <p> <span> <Link to="/login"> Already have an account? Log In.</Link></span></p>
          
        </div>
      </div>
    );
  }
}
