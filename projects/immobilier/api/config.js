import admin  from 'firebase-admin'
import serviceAccount from '/Users/iammaham/Documents/config/immobilier.json' assert {type: 'json'}

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://immobilier-0-default-rtdb.firebaseio.com"
});

// console.log(firebaseApp.auth().listUsers().then(users=>console.log(users)))

// firebaseApp.auth().updateUser()
