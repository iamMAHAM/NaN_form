import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAIpsPKlW3Xo3OlB1L3xHLCpMg_LCvhS3I",
  authDomain: "health-3453b.firebaseapp.com",
  projectId: "health-3453b",
  storageBucket: "health-3453b.appspot.com",
  messagingSenderId: "415990299626",
  appId: "1:415990299626:web:9a3863b887b00db9135093",
  measurementId: "G-CV4YYQP547"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
    db
}