// This section sets up some basic app metadata, the entire section is optional.

App.info({
    id: 'cl.holos.ideas',
    name: 'cl.holos.ideas',
    description: 'Relevamiento de Ideas',
    author: 'Holos Develops',
    email: 'desarrollo@holos.cl',
    website: 'http://holos.cl/'
});

// Set up resources such as icons and launch screens.
App.icons({
    // 'iphone_2x': 'icons/icon-60@2x.png',
    'iphone_2x': 'public/app/iPhone/ideas.appiconset/iphone-appicon@2x.png',
    'iphone_3x': 'public/app/iPhone/ideas.appiconset/iphone-appicon@3x.png',
    // More screen sizes and platforms...
});
App.launchScreens({
    'iphone_2x': 'public/app/iPhone/ideas.launchimage/iphone_portrait@2x.png', //  splash/Default@2x~iphone.png',
    'iphone5': 'public/app/iPhone/ideas.launchimage/iphone_portrait@2x.png', //  splash/Default@2x~iphone.png',
    // 'iphone5': 'splash/Default~iphone5.png',
    // More screen sizes and platforms...
});

// Set PhoneGap/Cordova preferences.
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
  // Pass preferences for a particular PhoneGap/Cordova plugin.

//   App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//     APP_ID: '1234567890',
//     API_KEY: 'supersecretapikey'
//   });

  // Add custom tags for a particular PhoneGap/Cordova plugin to the end of the
  // generated config.xml. 'Universal Links' is shown as an example here.

  //   App.appendToConfig(`
//     <universal-links>
//       <host name="localhost:3000" />
//     </universal-links>
//   `);


App.accessRule('*');
App.accessRule('http://*')
App.accessRule('https://*')