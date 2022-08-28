import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

import { getDatabase, connectDatabaseEmulator } from "firebase/database";

//local firebase

// const db = getDatabase();
// if (location.hostname === "localhost") {
//   // Point to the RTDB emulator running on localhost.
//   connectDatabaseEmulator(db, "localhost", 9000);
// } 

// /************* ABK CONFIG **********/
// const firebaseConfig = {
//   apiKey: "AIzaSyAIpsPKlW3Xo3OlB1L3xHLCpMg_LCvhS3I",
//   authDomain: "health-3453b.firebaseapp.com",
//   projectId: "health-3453b",
//   storageBucket: "health-3453b.appspot.com",
//   messagingSenderId: "415990299626",
//   appId: "1:415990299626:web:9a3863b887b00db9135093",
//   measurementId: "G-CV4YYQP547"
// }

/************* AB.K CONFIG **********/
const firebaseConfig = {
	apiKey: "AIzaSyCNNGI19N9u6Tv3_KHdeJy3yXuRVB56Mlc",
	authDomain: "health-4d90f.firebaseapp.com",
	projectId: "health-4d90f",
	storageBucket: "health-4d90f.appspot.com",
	messagingSenderId: "679428405651",
	appId: "1:679428405651:web:f3194609735edf4debd066",
	measurementId: "G-LC4QDT4RSW"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
