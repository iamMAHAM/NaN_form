import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyC7sSw3Zu2hA2E25Bim_GJ-6k5zkGdW6ro",
	authDomain: "immobilier-0.firebaseapp.com",
	projectId: "immobilier-0",
	storageBucket: "immobilier-0.appspot.com",
	messagingSenderId: "18917991989",
	appId: "1:18917991989:web:bbca024364bd6d5ad0737c"
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
export const db = getFirestore(app)
