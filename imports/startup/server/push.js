
Push.debug = true;

Push.Configure({
    apn: {
        certData: Assets.getText('meteorApp-cert-prod.pem'),
        keyData: Assets.getText('meteorApp-key-prod.pem'),
        passphrase: '',
        gateway: 'gateway.push.apple.com',
    },
    gcm: {
        apiKey: 'AAAAT4XhHy4:APA91bH7IldZN3enKa3mp_rGqH23BYjNG5NvwmxUXO2PI6Oslrupl1i24xiv07XdoYYYoNnm0Ht44PBIPCmwpPAVeiRvbQWC-C0GK6OAZwUidj2AXKvyrktWiTI6kKtGGVIOSByP7XUT',
        projectNumber: 341548539694
    },
    production: true,
    // production: true,
    // 'sound' true,
    // 'badge' true,
    // 'alert' true,
    // 'vibrate' true,
    // 'sendInterval': 15000, Configurable interval between sending
    // 'sendBatchSize': 1, Configurable number of notifications to send per batch
    'keepNotifications': true
});

Push.allow({
    send: (userId, notification) => {
        // allow all users to send notifications
        return true;
    }
});

