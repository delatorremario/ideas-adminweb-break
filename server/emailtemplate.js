// import { Accounts } from 'meteor/accounts-base';
// import _ from 'lodash';

// Accounts.emailTemplates.siteName = 'Ideas 3.0';
// Accounts.emailTemplates.from = 'Ideas 3.0 <no-reply@ideas.e-captum.com>';
// Accounts.emailTemplates.resetPassword = {
//   subject(user) {
//     return 'Reset your password on Ideas 3.0';
//   },
//   text(user, url) {
//     const newurl = _.replace(url, '/#/', '/');
//     // const username = user.username || user.emails[0].address;
//     return `Hola!
//             Click the link below to reset your password on Ideas 3.0
//             ${newurl}
//             If you didn't request this email, please ignore it.
//             Thanks,
//             The Ideas 3.0 team`;
//   },
//   html(user, url) {
//     // This is where HTML email content would go.
//     // See the section about html emails below.
//   }
// };