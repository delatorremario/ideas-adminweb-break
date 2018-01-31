// nginx config https://gist.github.com/jamiewilson/4e1d28f9a200cb34ad59
// http://meteor-up.com/
// https://medium.com/@grahamleslie/setting-up-meteor-meteor-up-letsencrypt-ssl-and-nginx-dddb3b5a4baa
// https://codearmy.co/como-crear-autenticaci%C3%B3n-y-permitir-acceso-remoto-a-mongodb-1b0231a6df44

const url = 'ideas.e-captum.com';

module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: url,
      username: 'ubuntu',
      pem: '~/DEVELOPS/HOLOS/pems/productionServer.pem'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  meteor: {
    // TODO: change app name and path
    name: 'ideas',
    path: '../.',
    
    volumes: {
      '/ideasfiles':'/ideasfiles'
    },
    
    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    // ssl: {
    //   autogenerate: {
    //     email: 'desarrollo@holos.cl',
    //     domains: `${url}, www.${url}`
    //   }
    // },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: `https://${url}`,
      // MONGO_URL: 'mongodb://ideas:ideas@ds129053.mlab.com:29053/ideas-dev',
      MONGO_URL: 'mongodb://ideas:1qaz2wsx@172.31.7.159:29053/ideas',
      PORT: 5010
    },

    

    docker: {
      // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
      // image: 'abernix/meteord:base',
      image: 'abernix/meteord:node-8.4.0-base',
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
