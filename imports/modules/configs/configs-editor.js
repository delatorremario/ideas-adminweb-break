import { Bert } from 'meteor/themeteorchef:bert';
// import { upsertArea } from '../../api/areas/methods.js';
import { upsertSate } from '../../api/states/methods';
import '../validation.js';

let component;

const handleUpsert = () => {
    const { doc } = component.state;
    console.log('DOC***', doc);
    const confirmation = doc && doc._id ? 'Datos actualizados correctamente' : 'Datos guardados con éxito';
    const upsert = {
         config: doc.config,
    };

    if (doc && doc._id) upsert._id = doc._id;

    upsertConfig.call(upsert, (error, response) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
        } else {
            component.areaEditorForm.reset();
            Bert.alert(confirmation, 'success');
            // component.props.history.push('/areas');
            // component.props.history.push(`/config/${response.insertedId || doc._id}/edit`);
        }
    });
};


const validate = () => {
    $(component.areaEditorForm).validate({
        // rules: {
        //     name: {
        //         required: true,
        //     },
        // },
        // messages: {
        //     name: {
        //         required: 'Ingrese el nombre',
        //     },
        // },
        submitHandler() { handleUpsert(); },
    });
};

export default function configEditor(options) {
    component = options.component;
    validate();
}