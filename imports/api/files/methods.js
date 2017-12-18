import { Meteor } from 'meteor/meteor';
import Files from './files';


Meteor.methods({
    removeFile: (_id) => {
        check(_id, String);
        Files.remove(_id);
    }
})