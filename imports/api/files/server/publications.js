import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Files from '../files';

Meteor.publish('files.list', (imageList) => {
    console.log('publish files.list');
    check(imageList, [String]);  
    const filter = { _id: { $in: imageList } };
    return Files.find(filter).cursor;
});