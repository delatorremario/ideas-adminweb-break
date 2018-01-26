import React, { Component, PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl, Button, Radio, Alert } from 'react-bootstrap'
import profileEditor from '../../../modules/profile/profile-editor';
import CSSTransitionGroup from 'react-addons-css-transition-group'
import MainList from '../MainList'
import _ from 'lodash'

import DatePicker from 'react-bootstrap-date-picker';
import FileUpload from '../files/FileUpload';
import Files from '../../../api/files/files';

import PersonSearchAndCardContainer from '../../containers/person/PersonSearchAndCardContainer';
import AreasSearch from '../../containers/areas/AreasSearch';

import AreasItemComponent from '../areas/AreasItemComponent';
import PersonsItemComponent from '../persons/PersonsItemComponent';
import { completedProfile } from '../../../api/profile/methods';

const companies = ['BHP', 'Contratista']

export default class ProfileEditor extends Component {
    state = {
        user: {
            profile: {
                masterCode: '',
                lastName: '',
                secondLastName: '',
                firstName: '',
                secondName: '',
                rut: '',
                email: '',
                managerCode: '',
                areaCode: '',
                areaId: '',
                group: '',
                origin: '',
                company: '',
                oneUp: {},
                area: {},
            },
        },
        person: {},
        searching: false,
    }

    componentDidMount() {
        profileEditor({ component: this });
        const { user, person } = this.props;
        this.setState({ person, user: { ...user, profile: { ...user.profile } } });
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

    onChangeInc = origin => {
        this.setState(prev => ({
            user: {
                ...prev.user,
                profile: {
                    ...prev.user.profile, origin
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
        this.setState(prev => ({ user: { ...prev.user, profile: { ...prev.user.profile, ...prev.person, origin: 'MEL' } } }))
        Bert.alert("Datos actualizados desde MEL. Guarde los cambios antes de salir para mantenerlos.", 'warning');
    }

    setProfileImage = (fileObj) => {
        // const imagePath = `/cdn/storage/Files/${fileObj._id}/original/${fileObj._id}.${fileObj.ext}`
        this.setState(prev => ({ user: { ...prev.user, profile: { ...prev.user.profile, imageId: fileObj._id } } }))
        this.props.imageIdVar.set(fileObj._id);
        Meteor.call('profile.setImage', fileObj._id, (err, data) => {
            if (err) { Bert.alert(err.message, 'danger') }
        })
    }
    onSelectPerson = oneUp => e => {
        e.preventDefault();
        const { user } = this.state;
        if (user.profile.oneUp === oneUp) oneUp = undefined

        Meteor.call('persons.view.email', oneUp && oneUp.email || '', (err, person) => {
            if (err) { Bert.alert(err.message, 'danger'); return; }
            const area = person && person.area;
            this.setState(prev => ({
                user: {
                    ...prev.user,
                    profile: {
                        ...prev.user.profile,
                        oneUp,
                        area,
                        areaId: area && area._id || undefined
                    }
                }
            }));
        })


    }
    onSelectArea = area => {
        this.setState(prev => ({
            user: {
                ...prev.user,
                profile: {
                    ...prev.user.profile,
                    area,
                    areaId: area && area._id || undefined,
                    oneUp: undefined
                }
            }
        }));
    }

    render() {

        const { user, person } = this.state;

        const { _id, emails, profile } = this.state.user;

        const MEL = profile && profile.origin === 'MEL'
        const BHP = profile && profile.origin === 'BHP'
        const Contratista = profile && profile.origin === 'Contratista'

        const rut = profile && profile.rut || '';
        const group = profile && profile.group || '';
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
        const origin = profile && profile.origin || '';
        const oneUp = profile && profile.oneUp || '';
        const managerCode = profile && profile.managerCode || '';
        const emailChief = profile && profile.emailChief || '';
        const area = profile && profile.area || '';
        const areaId = profile && profile.areaId || '';
        const areaCode = profile && profile.areaCode || '';
        const oneText = MEL && 'One Up' || BHP && 'Jefe Directo' || 'Contract Owner';
        const imageId = profile && profile.imageId || '';
        const image = Files.findOne({ _id: imageId });

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
                                    <div className="img-circle-container" style={{ backgroundImage: `url(${image && image.link()})` }} >
                                        <div className="fileupload-container">
                                            <FileUpload saveData={this.setProfileImage} />
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
                                    {group === 'EXECUT.' && <span className="text-muted">Ejecutivo</span>}

                                    {
                                        !completedProfile() &&
                                        <Alert bsStyle="warning">
                                            Debe completar su perfil para continuar
                                        </Alert>
                                    }
                                    {
                                        MEL &&
                                        <div className="connect">
                                            <button className="btn btn-primary btn-trans btn-xs" onClick={this.setDatosMel}>Copiar Datos de MEL</button>
                                        </div> ||
                                        <FormGroup>
                                            <div className="col-sm-12">
                                                {
                                                    _.map(companies, (inc, index) =>
                                                        <Radio key={index} name="origin" value={inc} checked={inc === origin}
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
                                </div>
                            </div>
                        </div>
                    </section>


                    <div className='row'>
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

                        {
                            Contratista &&
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
                                    />
                                </div>
                            </FormGroup>
                        }
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
                        {
                            !BHP &&
                            <FormGroup>
                                <div className="col-sm-4">
                                    <ControlLabel>Area de Trabajo</ControlLabel>
                                </div>
                                <div className="col-sm-6" style={{ borderColor: 'gray' }} >
                                    <div className='form-control' style={{ backgroundColor: '#eee' }}>{area && area.name}</div>
                                </div>
                            </FormGroup>
                        }
                        {
                            BHP &&
                            <FormGroup>
                                <div className="col-sm-4">
                                    <ControlLabel>Area de Trabajo</ControlLabel>
                                </div>
                                <div className="col-sm-6">
                                    <AreasSearch selectArea={this.onSelectArea} areaSelected={area} />
                                </div>
                            </FormGroup>
                        }
                    </div>


                    {
                        !BHP &&
                        <div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <ControlLabel>{oneText}</ControlLabel>
                                </div>
                                <div className='col-sm-6'>
                                    <PersonSearchAndCardContainer
                                        selectPerson={this.onSelectPerson}
                                        person={oneUp}
                                        onlyChief={false}
                                        myArea={false}
                                        parentArea={false}
                                    />
                                </div>
                            </div>
                        </div>
                    }

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
