import Meteor from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertIdea } from '../../api/ideas/methods.js';
import '../validation.js';

let component;

const handleUpsert = () => {
    const { doc } = component.state;
    const user = this.Meteor.user();

    doc.date = doc && doc.date && new Date(doc.date);

    _.extend(doc, {
        createdAt: new Date(),
    })

    const confirmation = doc && doc._id ? 'Datos actualizados correctamente' : 'Datos guardados con éxito';

    const upsert = doc;

    if (doc && doc._id) upsert._id = doc._id;

    upsertIdea.call(upsert, (error, response) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
            console.log(error);
        } else {
            component.ideaEditorForm.reset();
            Bert.alert(confirmation, 'success');
            component.props.history.push('/ideas/find');
            // history.pushState(state, url, param)
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
            states: {
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
            states: {
                required: 'Debe indicar el estado de la idea',
            },
        },
        submitHandler() { handleUpsert(); },
    });
};

export default function ideaEditor(options) {
    component = options.component;
    validate();
}