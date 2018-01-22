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
            payload: {},
            gcm: {
                title: title,
                text: text,
                style: 'inbox',
                summaryText: '%n% notificacion/es'
            },
            apn: {
                title: title,
                text: text,
                style: 'inbox',
                summaryText: '%n% notificacion/es'
            },
            query: {
                // this will send to all users
            }
        });
        console.log('--sended--')
    },
    userNotification: function (text, title, viewers) {
        console.log('--serverNotification--', text, title, viewers.length);
        check(text, String);
        check(title, String);
        check(viewers, [String]);
        var badge = 1
        Push.send({
            from: 'push',
            title: title,
            text: text,
            badge: badge,
            sound: 'airhorn.caf',
            payload: {},
            gcm: {
                title: text,
                text: title,
                style: 'inbox',
                summaryText: '%n% notificacion/es'
            },
            apn: {
                title: text,
                text: title,
            },
            query: {
                userId: { $in: viewers } // "GrmDbWJTsWNDwB6o2"
            }
        });
        console.log('--sended--')
    },
    removeHistory: function () {
        NotificationHistory.remove({}, function (error) {
            if (!error) {
                console.log("All history removed");
            }
        });
    },
});