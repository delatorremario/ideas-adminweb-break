import { Bert } from 'meteor/themeteorchef:bert';
import { upsertArea } from '../../api/areas/methods.js';
import '../validation.js';

let component;

const handleUpsert = () => {
    const { doc } = component.state;
    console.log("props ", component.props)
    const confirmation = doc && doc._id ? 'Datos actualizados correctamente' : 'Datos guardados con éxito';
    const upsert = {
        // name: doc.name.trim(),
        // adminsEmails: doc.adminsEmails,
    };

    if (doc && doc._id) upsert._id = doc._id;

    upsertArea.call(upsert, (error, response) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
        } else {
            component.areaEditorForm.reset();
            Bert.alert(confirmation, 'success');
            component.props.history.push('/areas');
            // component.props.history.push(`/corporations/${response.insertedId || doc._id}/edit`);
        }
    });
};


const validate = () => {
    $(component.areaEditorForm).validate({
        // rules: {
        //     name: {
        //         required: true,
        //     },
        //     adminsEmails: {
        //         required: true,
        //     },
        // },
        // messages: {
        //     name: {
        //         required: 'Ingrese el nombre de la compañía',
        //     },
        //     adminsEmails: {
        //         required: 'El campo email debe contener al menos una dirección válida',
        //     },
        },
        submitHandler() { handleUpsert(); },
    });
};

export default function areaEditor(options) {
    component = options.component;
    validate();
}