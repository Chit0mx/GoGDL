const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.fcmSend = functions.database
.ref("/articulos/{articuloId}")
.onCreate(event => {
  const message = event.data.val()
  const articuloId = event.params.articuloId;

  const payload = {
    notification: {
      title: message.titulo,
      body: message.descripcion,
      icon: "../favicon.ico",
      atraccion: message.atraccion
    }
  }

  admin.database()
  .ref(`/fmcTokens/${userId}`)
  .once('value')
  .the(token => token.val())
  .then(userFcmToken => {
    return admin.messaging(userFcmToken, payload);
  })
  .then(res => {
    console.log("Sent successfully", res);
  })
  .catch(err => {
    console.log(err);
  })
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
