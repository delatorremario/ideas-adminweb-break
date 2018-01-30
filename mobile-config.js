// This section sets up some basic app metadata, the entire section is optional.

App.info({
    id: 'com.ecaptum.ideas',
    name: 'Ideas 3.0',
    description: 'Relevamiento de Ideas',
    author: 'Holos Develops',
    email: 'desarrollo@holos.cl',
    website: 'http://holos.cl/',
    version: "0.0.10",
});

// Set up resources such as icons and launch screens.
App.icons({
    // 'iphone_2x': 'icons/icon-60@2x.png',
    'iphone_2x': 'public/app/iPhone/ideas.appiconset/iphone-appicon@2x.png',
    'iphone_3x': 'public/app/iPhone/ideas.appiconset/iphone-appicon@3x.png',
    'ios_settings_2x': 'public/app/iPhone/ideas.appiconset/iphone-settings@2x.png',
    'ios_settings_3x': 'public/app/iPhone/ideas.appiconset/iphone-settings@3x.png',
    'ios_spotlight_2x': 'public/app/iPhone/ideas.appiconset/iphone-spotlight@2x.png',
    'ios_spotlight_3x': 'public/app/iPhone/ideas.appiconset/iphone-spotlight@3x.png',
    'notification_2x': 'public/app/iPhone/ideas.appiconset/iphone-notification@2x.png',
    'notification_3x': 'public/app/iPhone/ideas.appiconset/iphone-notification@3x.png',

    // More screen sizes and platforms...

    'android_mdpi': 'public/app/android/res/drawable-mdpi/appicon.png',
    'android_hdpi': 'public/app/android/res/drawable-hdpi/appicon.png',
    'android_xhdpi': 'public/app/android/res/drawable-xhdpi/appicon.png',
    'android_xxhdpi': 'public/app/android/res/drawable-xxhdpi/appicon.png',
    'android_xxxhdpi': 'public/app/android/res/drawable-xxxhdpi/appicon.png',

});
App.launchScreens({

    'iphoneX_portrait': 'public/app/iPhone/ideas.launchimage/iphone_portrait@2x.png',
    'iphone_2x': 'public/app/iPhone/ideas.launchimage/iphone_portrait@2x.png',
    'iphone5': 'public/app/iPhone/ideas.launchimage/iphone_portrait@2x.png',

    // More screen sizes and platforms...
    'android_mdpi_portrait': 'public/app/android/res/drawable-mdpi/background.9.png',
    'android_mdpi_landscape': 'public/app/android/res/drawable-mdpi/background.9.png',

    'android_hdpi_portrait': 'public/app/android/res/drawable-hdpi/background.9.png',
    'android_hdpi_landscape': 'public/app/android/res/drawable-hdpi/background.9.png',

    'android_xhdpi_portrait': 'public/app/android/res/drawable-xhdpi/background.9.png',
    'android_xhdpi_landscape': 'public/app/android/res/drawable-xhdpi/background.9.png',

    'android_xxhdpi_portrait': 'public/app/android/res/drawable-xxhdpi/background.9.png',
    'android_xxhdpi_landscape': 'public/app/android/res/drawable-xxhdpi/background.9.png',

    'android_xxxhdpi_portrait': 'public/app/android/res/drawable-xxxhdpi/background.9.png',
    'android_xxxhdpi_landscape': 'public/app/android/res/drawable-xxxhdpi/background.9.png',

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

App.configurePlugin('phonegap-plugin-push', {
    SENDER_ID: 341548539694
});

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

App.appendToConfig(`<platform name="ios">
    <config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryUsageDescription">
      <string>My app needs access to Photo Library for Upload new Idea Image</string>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription">
      <string>My app needs access to Camera for Upload new Idea Image</string>
    </config-file>
  </platform>`);
