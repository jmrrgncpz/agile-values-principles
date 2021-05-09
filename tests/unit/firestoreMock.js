var firebasemock    = require('firebase-mock');

var mockfirestore = new firebasemock.MockFirestore();
var mocksdk = new firebasemock.MockFirebaseSdk(null, null,
  () => {
    return mockfirestore;
  },
  null, null
);

export default mocksdk;