import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

const IdeasStatesSchema = new SimpleSchema({
  userId: {
    type: String,
    index: true,
    autoValue: function () {
      return this.isFromTrustedCode && this.value || Meteor.userId()
    }
  },
  createdAt: {
    type: Date,
    index: true,
    autoValue: function () {
      if (this.isInsert)
        return new Date
      else if (this.isUpsert)
        return { $setOnInsert: new Date }
      else
        this.unset()
    },
    // denyUpdate: true
  },
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
})

export default IdeasStatesSchema;
