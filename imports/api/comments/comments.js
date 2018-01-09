import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Comments = new Mongo.Collection('comments');
export default Comments

Comments.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

Comments.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

Comments.schema = new SimpleSchema(
    {
        _id: { type: String, optional: true },
        ideaId: { type: String },
        text: { type: String },
        createdAt: { type: Date },
        userId: { type: String },
    },
)

export const CommentsSchema = Comments.schema;

Comments.attachSchema(Comments.schema);
