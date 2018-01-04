import { Meteor } from 'meteor/meteor';
import Ideas from '../../ideas/ideas';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';


Meteor.publish('ideas.unreadComments', function () {
    if (!Meteor.isServer) return;
    const userId = Meteor.userId();
    console.log('userId', userId);
    ReactiveAggregate(this, Ideas, [
        { $match: { 'comments.viewers.userId': userId } },
        { $unwind: '$comments' },
        { $unwind: '$comments.viewers' },
        { $match: { 'comments.viewers.userId': userId } },
        { $match: { 'comments.viewers.viewedAt': { $exists: false } } },
        { $group: { _id: '', count: { $sum: 1 }, comments: { $push: "$$ROOT" } } },
        { $project: { _id: 0, count: 1, comments: { _id: 1, comments: 1 } } },
    ], { clientCollection: 'UnreadComments' })
});
