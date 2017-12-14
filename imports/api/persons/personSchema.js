import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from '../base/baseSchema';

const PersonSchema = new SimpleSchema([
    //  BaseSchema,
    { _id: { type: String, optional: true } },
    { userId: { type: String, optional: true } },
    { createdAt: { type: Date, optional: true } },
    { updatedAt: { type: Date, optional: true } },

    { lastName: { type: String, optional: true } },
    { firstName: { type: String, optional: true } },
    { secondName: { type: String, optional: true } },
    { rut: { type: String, optional: true } },
    { email: { type: String, optional: true } },
    { oneUp: { type: String, optional: true } },
    { areaId: { type: String } },
    { masterArea: { type: String, optional: true } },
    { corporationId: { type: String, optional: true } },
]);

export default PersonSchema;
