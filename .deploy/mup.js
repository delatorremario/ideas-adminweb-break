// nginx config https://gist.github.com/jamiewilson/4e1d28f9a200cb34ad59
// http://meteor-up.com/

module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: 'ideas.e-captum.com',
      username: 'ubuntu',
      pem: '~/DEVELOPS/HOLOS/pems/productionServer.pem'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  meteor: {
    // TODO: change app name and path
    name: 'ideas-webadmin',
    path: '../.',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://ideas.e-captum.com',
      MONGO_URL: 'mongodb://ideas:ideas@ds129053.mlab.com:29053/ideas-dev',
      PORT: 5001
    },

    docker: {
      // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
      image: 'abernix/meteord:base',
      // imagePort: 80, // (default: 80, some images EXPOSE different ports)
    },

    // This is the maximum time in seconds it will wait
    // for your app to start
    // Add 30 seconds if the server has 512mb of ram
    // And 30 more if you have binary npm dependencies.
    deployCheckWaitTime: 160,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  // mongo: {
  //   port: 27017,
  //   version: '3.4.1',mup d
  //   servers: {
  //     one: {}
  //   }
  // }
};
