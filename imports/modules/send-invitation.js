/* eslint-disable no-undef */

import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const handleSend = () => {
    const { history } = component.props;

    component.setState({ loading: true });

    console.log('SEND INVITATION');
    // Accounts.forgotPassword({
    //     email: document.querySelector('[name="emailAddress"]').value,
    // }, (error) => {
    //     if (error) {
    //         Bert.alert(error.reason, 'warning');
    //     } else {
    //         Bert.alert('Check your inbox for a reset link!', 'success');
    //         history.push('/login');
    //     }
    //     component.setState({ loading: false });
    // });
    setTimeout(
        () => component.setState({ loading: false }),
        3000);
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
                required: 'Need an email address here.',
                email: 'Is this email address legit?',
            },
        },
        submitHandler() { handleSend(); },
    });
};

export default function handleSendInvitation(options) {
    component = options.component;
    validate();
}
