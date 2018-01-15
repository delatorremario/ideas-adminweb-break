Push.debug = true;

Push.allow({
    send: function (userId, notification) {
        return true; // Allow all users to send
    }
});

Meteor.methods({
    serverNotification: function (text, title) {
        console.log('--serverNotification--', text, title);
        check(text, String);
        check(title, String);
        var badge = 1
        Push.send({
            from: 'push',
            title: title,
            text: text,
            badge: badge,
            sound: 'airhorn.caf',
            payload: {
                title: title,
                text: text,
                // historyId: result
            },
            query: {
                // this will send to all users
            }
        });
        console.log('--sended--')
    },
    userNotification: function (text, title, userId) {
        var badge = 1
        Push.send({
            from: 'push',
            title: title,
            text: text,
            badge: badge,
            sound: 'airhorn.caf',
            payload: {
                title: title,
                // historyId: result
            },
            query: {
                // userId: userId //this will send to a specific Meteor.user()._id
            }
        });
    },
    removeHistory: function () {
        NotificationHistory.remove({}, function (error) {
            if (!error) {
                console.log("All history removed");
            }
        });
    },
});