import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Vieweds = new Mongo.Collection('vieweds');
export default Vieweds

Vieweds.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

Vieweds.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

Vieweds.schema = new SimpleSchema(
    {
        _id: { type: String, optional: true },
        userId: { type: String },
        commentId: { type: String },
        ideaId: { type: String },
        viewedAt: { type: Date, optional: true }
    },
)

export const ViewedsSchema = Vieweds.schema;

Vieweds.attachSchema(Vieweds.schema);
