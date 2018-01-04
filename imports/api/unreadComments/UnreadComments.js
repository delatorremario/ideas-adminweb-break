import { Mongo } from 'meteor/mongo';

const UnreadComments = new Mongo.Collection('UnreadComments');
export default UnreadComments;