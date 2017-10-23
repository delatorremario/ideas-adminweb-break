import React, { Component, PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import corporationEditor from '../../../modules/corporations/corporation-editor.js'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import MainList from '../MainList'
import _ from 'lodash'

export default class CorporationEditor extends Component {
    state = {
        doc: {
            _id: '',
            adminsEmails: [],
            name: ''
        },
        email: ''
    }

    componentDidMount() {
        corporationEditor({ component: this });
        // setTimeout(() => { document.querySelector('[name="name"]').focus(); }, 0);
        if (this.props.doc) {
            this.setState({
                doc: this.props.doc
            });
        }

    }

    isValidEmail(mail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
    }

    addEmail = e => {
        e.preventDefault();
        if (this.state.doc.adminsEmails != [] && this.isValidEmail(this.state.email)) {
            this.setState(prevstate => {
                doc: { adminsEmails: prevstate.doc.adminsEmails.push(this.state.email) }
            });
            this.setState({
                email: ''
            });
        }
    }

    removeEmail = email => {
        this.setState(prevstate => {
            doc: { adminsEmails: _.pull(prevstate.doc.adminsEmails, email); }
        })
    }

    onChangeDoc = e => {
        this.setState({
            doc: { ...this.state.doc, [e.target.name]: e.target.value }
        });
    }
    onChange = e => {
        this.setState(
            { ...this.state, [e.target.name]: e.target.value }
        );
    }

    render() {
        const { adminsEmails, name, _id } = this.state.doc;
        const { email } = this.state;

        return (
            <div>
                <form
                    className="label-left"
                    noValidate
                    ref={form => (this.corporationEditorForm = form)}
                    onSubmit={event => event.preventDefault()}>

                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Nombre</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.onChangeDoc}
                                placeholder="Nombre de la corporación"
                            />
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Email del administrador</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <div className="input-group">
                                <input className="form-control"
                                    type="email"
                                    name="email"
                                    placeholder="ejemplo@corporacion.com"
                                    value={email}
                                    onChange={this.onChange}
                                />
                                <div className="input-group-btn">
                                    <button type="button" className="btn btn-primary" onClick={this.addEmail}><i className="fa fa-user-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    </FormGroup>

                    <div className="row">
                        <div className="col-sm-offset-4 col-sm-6 col-xs-offset-1 col-xs-9 emails-list-group">
                            {adminsEmails && <MainList adminsEmails={adminsEmails} removeEmail={this.removeEmail} />}
                        </div>

                        <div className="col-xs-12 col-sm-offset-4 col-sm-6 control-bottom">
                            <Button type="submit" className="reset-icon" bsStyle="success">
                                <i className="fa fa-plus"></i>{_id ? ' Guardar' : ' Crear'}
                            </Button>
                        </div>
                    </div>

                </form>


            </div>
        )
    }
}

CorporationEditor.propTypes = {
    doc: PropTypes.object,
};
