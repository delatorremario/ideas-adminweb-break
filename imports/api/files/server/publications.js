import { Meteor } from 'meteor/meteor';
import Files from '../files';

Meteor.publish('files.list', () => {
    return Files.find().cursor;
});