/* eslint-disable no-undef */

import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const handleSend = () => {
    const { history } = component.props;
    component.setState({ loading: true });

    console.log('SEND INVITATION');
    // Client: Asynchronously send an email.
    Meteor.call(
        'sendEmail',
        document.querySelector('[name="emailAddress"]').value,
        'no-replay@ideas.e-captum.com',
        'Hello from Ideas 3.0!',
        'Hello!.. Click in follow link https://ideas.e-captum.com. Thanks!', (error) => {
            if (error) {
                Bert.alert(error.reason, 'warning');
            } else {
                Bert.alert('Email Sended!', 'success');
            }
            component.setState({ loading: false });
        }
    );
};

const validate = () => {
    $(component.sendInvitationForm).validate({
        rules: {
            emailAddress: {
                required: true,
                email: true,
            },
        },
        messages: {
            emailAddress: {
                required: 'Ingrese un correo',
                email: 'no tiene formato de correo',
            },
        },
        submitHandler() { handleSend(); },
    });
};

export default function handleSendInvitation(options) {
    component = options.component;
    validate();
}
