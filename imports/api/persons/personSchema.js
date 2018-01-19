import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from '../base/baseSchema';

const PersonSchema = new SimpleSchema([
    //  BaseSchema,
    { _id: { type: String, optional: true } },
    { userId: { type: String, optional: true } },
    { createdAt: { type: Date, optional: true } },
    { updatedAt: { type: Date, optional: true } },

    { masterCode: { type: String, optional: true } },
    { lastName: { type: String, optional: true } },
    { secondLastName: { type: String, optional: true } },
    { firstName: { type: String, optional: true } },
    { secondName: { type: String, optional: true } },
    { rut: { type: String, optional: true } },
    { email: { type: String, optional: true } },
    { managerCode: { type: String, optional: true } },
    { areaCode: { type: String, optional: true } },
    { areaId: { type: String, } },
    { group: { type: String, optional: true } },
    { corporationId: { type: String, optional: true } },
    { origin: { type: String, optional: true } }, // MEL BHP Contratista
    // { oneUp: { type: String, optional: true } }, // TODO remover y generar script para quitar de la base de dats
]);

export default PersonSchema;
