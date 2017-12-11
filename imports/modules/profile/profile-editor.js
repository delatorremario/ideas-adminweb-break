import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import '../validation.js';

let component;

const handleUpsert = () => {
    const { user } = component.state;

    console.log('user', user)

    Meteor.call('updateProfile', user, (error, response) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
            console.log(error);
        } else {
            Bert.alert('Datos actualizados correctamente', 'success');
            // component.props.history.push('/');
            // history.pushState(state, url, param)
        }
    });
};


const validate = () => {
    $(component.profileEditorForm).validate({
        rules: {},
        messages: {},
        submitHandler() { handleUpsert(); },
    });
};

export default function profileEditor(options) {
    component = options.component;
    validate();
}