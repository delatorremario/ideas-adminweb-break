import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

const BaseSchema = new SimpleSchema({
  // _id: {
  //   type: String,
  //   regEx: SimpleSchema.RegEx.Id,
  //   autoValue: function () {
  //     if (this.isInsert)
  //       return this.value || Random.id()
  //     else
  //       this.unset()
  //   }
  // },

  _id: { type: String, optional: true },
  userId: {
    type: String,
    index: true,
    autoValue: function () {
      return this.isFromTrustedCode && this.value || Meteor.userId()
    }
  },
  corporationId: {
    type: String,
    index: true,
    autoValue: function () {
      const user = Meteor.user();
      return this.isFromTrustedCode && this.value || user && user.profile && user.profile && user.profile.selectedCorporationId
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

  }
})

export default BaseSchema;
