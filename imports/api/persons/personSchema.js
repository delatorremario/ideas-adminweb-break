import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from '../base/baseSchema';

const PersonSchema = new SimpleSchema([
    //  BaseSchema,
    { _id: { type: String, optional: true } },
    { userId: { type: String, optional: true } },
    { createdAt: { type: Date, optional: true } },
    { updatedAt: { type: Date, optional: true } },

    { masterId: { type: String, optional: true } },
    { lastName: { type: String, optional: true } },
    { secondLastName: { type: String, optional: true } },
    { firstName: { type: String, optional: true } },
    { secondName: { type: String, optional: true } },
    { rut: { type: String, optional: true } },
    { email: { type: String, optional: true } },
    { managerId: { type: String, optional: true } },
    { areaId: { type: String, } },
    { executive: { type: Boolean, optional: true } },
    { masterArea: { type: String, optional: true } },
    { corporationId: { type: String, optional: true } },
    { origin: { type: String, optional: true } }, // MEL BHP Contratista
]);

export default PersonSchema;
