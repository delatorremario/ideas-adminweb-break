import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import '../validation.js';

let component;

const handleUpsert = () => {
    const { user } = component.state;

    Meteor.call('updateProfile', user, (error, response) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
            console.log(error);
        } else {
            Bert.alert('Datos actualizados correctamente', 'success');
            component.props.history.push('/profile');
            /// history.pushState(state, url, param)
        }
    });
};


const validate = () => {
    $(component.profileEditorForm).validate({
        rules: {
            rut: { required: true },
            firstName: { required: true },
            lastName: { required: true },
        },
        messages: {
            rut: { required: 'Ingrese su RUT' },
            firstName: { required: 'Ingrese el Primer Nombre' },
            lastName: { required: 'Ingrese el Apellido' },
        },
        submitHandler() { handleUpsert(); },
    });
};

export default function profileEditor(options) {
    component = options.component;
    validate();
}