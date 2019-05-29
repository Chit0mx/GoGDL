const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.fcmSend = functions.database.ref("/articulos/{articuloId}").onCreate((snapshot, context) => {
  const articuloData = snapshot.val();
  const lugarId = articuloData.atraccion;
  admin.database().ref(`/users`).once('value').then(snapshot => {
    snapshot.forEach(datos => {
      let usuarioId = datos.key;
      let usuario = datos.val();
      console.log(usuario);
      if (usuario[lugarId]){
        let lugar = usuario[lugarId]
        if (lugar.favorito) {
          admin.database().ref(`/lugares/${lugarId}`).once('value').then(snapshot => {
            let lugarNombre = snapshot.val().nombre;
            let payload = {
              notification : {
                title: `Hay un nuevo evento/promocion en ${lugarNombre}`,
                body: `Ve y hechale un vistaso en https://gogdl-1551633194886.firebaseapp.com/detalle/${lugarId}`,
                icon: 'https://www.armytimes.com/resizer/EMlsFi9L9EXZkrjnDO5GMwcpWHo=/1200x0/filters:quality(100)/arc-anglerfish-arc2-prod-mco.s3.amazonaws.com/public/5RAPSCITXBGULPO7VZSOXJGWI4.jpg'
              }
            };
            admin.database().ref(`/fcmTokens/${usuarioId}`).once('value')
            .then(token => token.val()).then(userFcmToken => {
              console.log(`Mensaje enviado`)
              return admin.messaging().sendToDevice(userFcmToken, payload);
            }).then(res => {
              console.log("Envio de notificacion exitoso", res);
            }).catch(error => {
              console.log("El envio no fue exitoso", error)
            });
          }).catch(error => {
              console.log(`${error} No se pudo traer al lugar en la funcion de firebase`)        
            });
        } else {
          console.log(`${usuario.Nombre} no tienen esta atracción como favorita`)
          return 0;
        }
      } else {
        console.log(`${usuario.Nombre} no a visto esta atracción`);
        return 0;
      }
    });
  }).catch(error => {
    console.log(`${error} No se pudo traer al usuario en la funcion de firebase`)
  });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
