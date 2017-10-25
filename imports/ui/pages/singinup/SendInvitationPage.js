import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import handleSendInvitation from '../../../modules/send-invitation';

export default class SendInvitationPage extends React.Component {

  state = {
    loading: false
  }

  componentDidMount() {
    handleSendInvitation({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <div className="pageheader">
          <h1>Enviar Invitación</h1>
          <div className="breadcrumb-wrapper hidden-xs">
            <span className="label">You are here:</span>
            <ol className="breadcrumb">
              <li className="active">Dashboard</li>
            </ol>
          </div>
        </div>


        <section id="main-content">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="panel panel-default">
                <div className="panel-body ng-binding">

                  {/* <Alert bsStyle="info">
                Enter your email address below to receive a link to reset your password.
              </Alert> */}

                  {loading && <Alert bsStyle="warning">Sending email!</Alert>}

                  <form
                    ref={form => (this.sendInvitationForm = form)}
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
                    <Button type="submit" className="btn btn-success btn-lg btn-block">Enviar Invitación</Button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </section>









      </div>



    );
  }
}
