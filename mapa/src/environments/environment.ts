// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
   apiKey: "AIzaSyAhqWM96BUbLD6_sKHJw0GiAut3Oep_BpY",
   authDomain: "webrtc-ccdfe.firebaseapp.com",
   databaseURL: "https://webrtc-ccdfe.firebaseio.com",
   projectId: "webrtc-ccdfe",
   storageBucket: "webrtc-ccdfe.appspot.com",
   messagingSenderId: "1098034135287"
 }
};
