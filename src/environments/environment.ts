// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAMSJCoYGrD_cNWzM5L2P2F08BpPZXSZzM',
    authDomain: 'crypto-simulator-404.firebaseapp.com',
    databaseURL: 'https://crypto-simulator-404.firebaseio.com',
    projectId: 'crypto-simulator-404',
    storageBucket: 'crypto-simulator-404.appspot.com',
    messagingSenderId: '845858549210'
  }
};
