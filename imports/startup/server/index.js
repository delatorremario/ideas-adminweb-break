import './accounts/email-templates';
import './accounts/accounts';
import './api';
import './sendEmail';

Push.Configure({
    apn: {
        // certData: Assets.getText('apnDevCert.pem'),
        // keyData: Assets.getText('apnDevKey.pem'),
        passphrase: 'Holos123',
        production: true,
        //gateway: 'gateway.push.apple.com',
    },
    gcm: {
        apiKey: 'AAAAT4XhHy4:APA91bH7IldZN3enKa3mp_rGqH23BYjNG5NvwmxUXO2PI6Oslrupl1i24xiv07XdoYYYoNnm0Ht44PBIPCmwpPAVeiRvbQWC-C0GK6OAZwUidj2AXKvyrktWiTI6kKtGGVIOSByP7XUT',
        projectNumber: 341548539694
    }
    // production: true,
    // 'sound' true,
    // 'badge' true,
    // 'alert' true,
    // 'vibrate' true,
    // 'sendInterval': 15000, Configurable interval between sending
    // 'sendBatchSize': 1, Configurable number of notifications to send per batch
    // 'keepNotifications': false,
    //
});