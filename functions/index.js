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
      if (usuario[lugarId]){
        let lugar = usuario[lugarId]
        if (lugar.favorito) {
          admin.database().ref(`/lugares/${lugarId}`).once('value').then(snapshot => {
            let lugarNombre = snapshot.val().nombre;
            let payload = {
              notification : {
                title: `Hay un nuevo evento/promocion de ${articuloData.titulo}`,
                body: `Ve y hechale un vistaso a tu lugar favorito ${lugarNombre}`,
                icon: 'https://firebasestorage.googleapis.com/v0/b/gogdl-1551633194886.appspot.com/o/favicon.ico?alt=media&token=f2da3426-7f04-49cb-9a30-cdc4f17f48b5'
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

const SENDGRID_API_KEY = functions.config().sengrid.key;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.enviarMail = functions.database.ref("/users/{userId}/eviarEmail").onUpdate((event, context) => {
  let userId = context.params.userId;
  admin.database().ref(`/users/${userId}`).once('value').then(snapshot => {
      let usuarioId = snapshot.key;
      let usuario = snapshot.val();
      admin.database().ref(`/lugares`).once('value').then(snapshot => {
        snapshot.forEach(l => {
          let lugarId = l.key;
          let lugar = l.val();
          if (lugar.propietario == usuarioId) {
            let promedio = Math.round((5 * lugar.calificacion[5] + 4 * lugar.calificacion[4] + 3 * lugar.calificacion[3] + 2 * lugar.calificacion[2] + 1 * lugar.calificacion[1]) / (lugar.calificacion[5] + lugar.calificacion[4] + lugar.calificacion[3] + lugar.calificacion[2] + lugar.calificacion[1])*1000)/1000;
            const msg = {
              to: usuario.Email,
              from: 'biosh0KEd@gmail.com',
              
              templateId: 'd-29e3917a6a87433698c2c726f199b78c',
              setSubstitutionWrappers: ['{{' , '}}'],
              dynamic_template_data: {
                name: usuario.Nombre,
                idLugar: lugarId,
                apellido: usuario.Apellido,
                namelugar: lugar.nombre,
                subject: 'Estadisticas en GoGDL',
                body: `Cantidad de estoy aqui: ${lugar.estoyaqui}\nCantidad de vistas a la pagina de la atracción: ${lugar.visto}\nCalificacion del lugar: ${promedio}\n`,
              }
            };
            sgMail.send(msg).then(res => console.log("Mail enviado")).catch(erro => console.log("No se pudo enviar el mail"));
          } else {return;}
        });
      }).then(res => console.log("se pudo traer al lugar")).catch(err => console.log("no se pudo traer al lugar"));
  }).then(res => console.log("se pudo traer al usuario")).catch(err => console.log("no se pudo traer al usuario"));
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
