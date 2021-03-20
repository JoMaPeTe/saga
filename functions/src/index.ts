
const functions = require('firebase-functions');
const admin = require('firebase-admin');


//const serviceAccount = require('./service-account.json');
admin.initializeApp();

exports.addAdminRole = functions
  .region('europe-west6')
  .https.onCall((data: any, context: any) => {
    //Doble seguridad:  comprueba que la petición está hecha por un admin.
    //Si no es admin, se sale mandando nuestro error como data, result en auth.js
    //Puesto que esta pantalla está protegida por el Guard onlyAdmins, no debería darse
    if (context.auth.token.admin !== true) {
      return { error: 'Solo admins pueden añadir otros admins' };
    }
    console.log('DATA add CLAIM ' + JSON.stringify(data));
    //obtener user y añadirle custom claim (convertirlo en admin)
    //para obtener el valor se hace return de toda la promise
    return admin
      .auth()
      .getUserByEmail(data.email)
      .then((user: any) => {
        //ya podemos sacar el user.uid correspondiente a ese email
        //con el uid le añadimos el custom claim
        return admin.auth().setCustomUserClaims(user.uid, {
          admin: true, //aquí un objeto con la claim
        });
      })
      .then(() => {
        return {
          message: `Exito! ${data.email} ha sido hecho admin`,
        };
      })
      .catch((err: any) => {
        return err;
      });
  });

exports.removeAdminRole = functions
  .region('europe-west6')
  .https.onCall((data: any, context: any) => {
    //Doble seguridad: comprueba que la petición está hecha por un admin.
    //Si no es admin, se sale mandando nuestro error como data, result en auth.js
    //Puesto que esta pantalla está protegida por el Guard onlyAdmins, no debería darse

    if (context.auth.token.admin !== true) {
      return { error: 'Solo admins pueden quitar admins' };
    }

    console.log('DATA remove CLAIM ' + JSON.stringify(data));
    //obtener user y añadirle custom claim (convertirlo en admin)
    //para obtener el valor se hace return de toda la promise
    return admin
      .auth()
      .getUserByEmail(data.email)
      .then((user: any) => {
        //ya podemos sacar el user.uid correspondiente a ese email
        //con el uid le añadimos el custom claim
        return admin.auth().setCustomUserClaims(user.uid, {
          admin: false, //aquí un objeto con la claim
        });
      })
      .then(() => {
        return {
          message: `Exito! ${data.email} ya no es admin`,
        };
      })
      .catch((err: any) => {
        return err;
      });
  });


