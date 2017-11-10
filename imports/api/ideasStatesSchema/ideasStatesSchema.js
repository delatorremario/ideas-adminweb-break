import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const IdeasStatesSchema = new SimpleSchema({
  userId: { type: String },
  createdAt: { type: Date },
  updatedAt: {
    type: Date,
    index: true,
    autoValue: function () {
      if (this.isUpdate) return new Date
    },
    denyInsert: true,
    optional: true,

  },
  code: { type: String },
  step: { type: String },
  state: { type: String },
  description: { type: String },
  color: { type: String },
});

export default IdeasStatesSchema;
