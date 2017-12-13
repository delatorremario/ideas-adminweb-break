import React, { Component, PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl, Button, Radio, Alert } from 'react-bootstrap'
import profileEditor from '../../../modules/profile/profile-editor';
import CSSTransitionGroup from 'react-addons-css-transition-group'
import MainList from '../MainList'
import _ from 'lodash'

import DatePicker from 'react-bootstrap-date-picker';
import FileUpload from '../files/FileUpload';

const companies = ['MEL', 'BHP', 'Contratista']

const completedProfile = (user) => {
    return user && user.profile
        && user.profile.firstName
        && user.profile.lastName
        && user.profile.oneUp
        && user.profile.area
}
export default class ProfileEditor extends Component {
    state = {
        user: {
            profile: {
                group: '',
                personId: '',
                rut: '',
                firstName: '',
                secondName: '',
                lastName: '',
                secondLastName: '',
                nationality: '',
                company: '',
                oneUp: {
                    email: '',
                    name: '',
                },
                areaId: '',
            },

        },
        person: {},
        searching: false,
    }

    componentDidMount() {
        profileEditor({ component: this });
        const { user, person } = this.props;

        this.setState({ person, user: { ...user, profile: { ...user.profile, company: 'MEL' } } });

    }

    onChangeProfile = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prev => ({
            user: {
                ...prev.user,
                profile: {
                    ...prev.user.profile, [name]: value
                }
            }
        }));
    }

    onChangeInc = inc => {
        this.setState(prev => ({
            user: {
                ...prev.user,
                profile: {
                    ...prev.user.profile, company: inc
                }
            }
        }));
    }

    handleChangeDate = (birthdate, formattedValue) => {
        this.setState(prev => ({
            user: {
                ...prev.user,
                profile: {
                    ...prev.user.profile, birthdate
                }
            }
        }));
    }

    onChange = e => {
        this.setState(
            { ...this.state, [e.target.name]: e.target.value }
        );
    }

    setDatosMel = () => {
        this.setState(prev => ({ user: { ...prev.user, profile: { ...prev.profile, ...prev.person, company: 'MEL' } } }))
        Bert.alert("Datos actualizados desde MEL. Guarde los cambios antes de salir para mantenerlos.", 'warning');
    }

    render() {
        const { user, person } = this.state;
        const { _id, emails, profile } = this.state.user;
        const rut = profile && profile.rut || '';
        const firstName = profile && profile.firstName || '';
        const secondName = profile && profile.secondName || '';
        const lastName = profile && profile.lastName || '';
        const secondLastName = profile && profile.secondLastName || '';
        const birthdate = profile && profile.birthdate || '';
        const nationality = profile && profile.nationality || '';
        // const enterprise = profile && profile.enterprise || '';
        const contactPhone = profile && profile.contactPhone || '';
        const address = profile && profile.address || '';
        const company = profile && profile.company || '';
        const oneUp = profile && profile.oneUp || '';
        const emailChief = profile && profile.emailChief || '';
        const area = profile && profile.area || '';
        const oneText = company === "MEL" ? 'One Up' : 'Jefe Directo'
        return (
            <div>
                <form
                    className="label-left"
                    noValidate
                    ref={form => (this.profileEditorForm = form)}
                    onSubmit={event => event.preventDefault()}>

                    <section className="panel">
                        <div className="panel-body profile-wrapper">
                            <div className="col-md-3">
                                <div className="profile-pic text-center">
                                    <div className="img-circle-container">
                                        <img src="/img/avatar1.png" alt="" className="img-circle" />
                                        <div className="fileupload-container">
                                            <FileUpload saveData={(id, filename, err) => { console.log('id', id); console.log('filename', filename); console.log('err', err); }} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="profile-info">
                                    <h1>{firstName} {secondName} {lastName} {secondLastName}</h1>
                                    <span className="text-muted">
                                        {
                                            _.map(emails, (email, index) => (
                                                <p key={index}>{email.address}</p>
                                            ))
                                        }
                                    </span>
                                    {
                                        !completedProfile(user) &&
                                        <Alert bsStyle="warning">
                                            Debe completar su perfil para continuar
                                        </Alert>
                                    }
                                    {
                                        _.isEmpty(person) &&
                                        <FormGroup>
                                            <div className="col-sm-12">
                                                {
                                                    _.map(companies, (inc, index) =>
                                                        <Radio key={index} name="company" value={inc} checked={inc == company}
                                                            // onChange={this.onChangeProfile} 
                                                            onChange={(e) => this.onChangeInc(inc)}
                                                            inline>
                                                            {inc}
                                                        </Radio>
                                                    )
                                                }
                                            </div>
                                        </FormGroup>
                                    }

                                    {
                                        !_.isEmpty(person) &&
                                        // <div className="connect">
                                            <button className="btn btn-primary btn-trans btn-xs" onClick={this.setDatosMel}>Copiar Datos de MEL</button>
                                        // </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </section>



                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>RUT</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="rut"
                                value={rut}
                                onChange={this.onChangeProfile}
                                placeholder="RUT"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Primer Nombre</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={this.onChangeProfile}
                                placeholder="Primer Nombre"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Segundo Nombre</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="secondName"
                                value={secondName}
                                onChange={this.onChangeProfile}
                                placeholder="Segundo Nombre"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Primer Apellido</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={this.onChangeProfile}
                                placeholder="Primer Apellido"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Segundo Apellido</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="secondLastName"
                                value={secondLastName}
                                onChange={this.onChangeProfile}
                                placeholder="Segundo Apellido"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Fecha de Nacimiento</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <DatePicker
                                id="date"
                                value={birthdate}
                                onChange={this.handleChangeDate}
                                name="birthdate"
                                dateFormat={'DD MM YYYY'}
                                dayLabels={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
                                monthLabels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Nacionalidad</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="nationality"
                                value={nationality}
                                onChange={this.onChangeProfile}
                                placeholder="Nacionalidad"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Empresa</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="company"
                                value={company}
                                onChange={this.onChangeProfile}
                                placeholder="Empresa"
                                disabled={!_.isEmpty(person)}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>
                                {oneText}
                            </ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="oneUp"
                                value={oneUp}
                                onChange={this.onChangeProfile}
                                placeholder={oneText}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Email {oneText}</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="emailChief"
                                value={emailChief}
                                onChange={this.onChangeProfile}
                                placeholder={'Email ' + oneText}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Area de Trabajo</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="area"
                                value={area}
                                onChange={this.onChangeProfile}
                                placeholder="Area"
                                disabled={!_.isEmpty(person)}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Tel Contacto</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="contactPhone"
                                value={contactPhone}
                                onChange={this.onChangeProfile}
                                placeholder="Tel Contacto"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Dirección</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="address"
                                value={address}
                                onChange={this.onChangeProfile}
                                placeholder="Dirección"
                            />
                        </div>
                    </FormGroup>
                    <div className="row">
                        <div className="col-sm-12 col-sm-offset-4 col-sm-6 control-bottom">
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

ProfileEditor.propTypes = {
    user: PropTypes.shape().isRequired,
    person: PropTypes.shape(),
};
