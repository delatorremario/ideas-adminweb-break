import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from '../base/baseSchema';

const PersonSchema = new SimpleSchema([
    //  BaseSchema,
    { _id: { type: String, optional: true } },
    { userId: { type: String, optional: true } },
    { createdAt: { type: Date, optional: true } },
    { updatedAt: { type: Date, optional: true } },
    
    { firstName: { type: String } },
    { secondName: { type: String, optional: true } },
    { lastName: { type: String } },
    { email: { type: String } },
    { rut: { type: String, optional: true } },
    { oneUp: { type: String, optional: true } },
    { areaId: { type: String, optional: true } },
    { masterArea: { type: String, optional: true } },
    { corporationId: { type: String } },
]);

export default PersonSchema;
