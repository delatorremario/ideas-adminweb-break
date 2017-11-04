import { Bert } from 'meteor/themeteorchef:bert';
import { upsertIdea } from '../../api/ideas/methods.js';
import '../validation.js';

let component;

const handleUpsert = () => {
    const { doc } = component.state;
    console.log('DOC', doc);
    const confirmation = doc && doc._id ? 'Datos actualizados correctamente' : 'Datos guardados con éxito';
    const upsert = {
        origin: doc.origin.trim(),
        // adminsEmails: doc.adminsEmails,
    };

    if (doc && doc._id) upsert._id = doc._id;

    upsertIdea.call(upsert, (error, response) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
            console.log(error);
        } else {
            component.ideaEditorForm.reset();
            Bert.alert(confirmation, 'success');
            component.props.history.push('/ideas');
            // component.props.history.push(`/corporations/${response.insertedId || doc._id}/edit`);
        }
    });
};


const validate = () => {
    $(component.ideaEditorForm).validate({
        rules: {
            origin: {
                required: true,
            },
        },
        messages: {
            origin: {
                required: 'Ingrese el Origen',
            },
        },
        submitHandler() { handleUpsert(); },
    });
};

export default function ideaEditor(options) {
    component = options.component;
    validate();
}