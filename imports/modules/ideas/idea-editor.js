import { Bert } from 'meteor/themeteorchef:bert';
import { upsertIdea } from '../../api/ideas/methods.js';
import '../validation.js';

let component;

const handleUpsert = () => {
    const { doc } = component.state;
    console.log('handleUpsert doc', doc);
    const confirmation = doc && doc._id ? 'Datos actualizados correctamente' : 'Datos guardados con éxito';
    // const upsert = {
    //     origin: doc.origin.trim(),
    //     description: doc.description.trim(),
    // };

    const upsert = doc;

    if (doc && doc._id) upsert._id = doc._id;
    console.log('UPSERT', upsert)
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
            person: {
                required: true,
            },
            chief: {
                required: true,
            },
            description: {
                required: true,
            },
            opportunity: {
                required: true,
            },
            drivers: {
                required: true,
            },
        },
        messages: {
            origin: {
                required: 'Ingrese el Origen desde donde se Captó la Idea',
            },
            person: {
                required: 'Seleccione la persona dueña de la Idea',
            },
            chief: {
                required: 'Seleccione la persona Encargada de Area',
            },
            description: {
                required: 'Ingrese una Descripción de la Idea',
            },
            description: {
                required: 'Ingrese la Oportunidad Detectada',
            },
            drivers: {
                required: 'Ingrese los Drivers de Valor',
            },
        },
        submitHandler() { handleUpsert(); },
    });
};

export default function ideaEditor(options) {
    component = options.component;
    validate();
}