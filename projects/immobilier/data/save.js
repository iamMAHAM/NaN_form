
const fs = require("fs")
const { addDoc, collection, getFirestore } = require("firebase/firestore")
const { initializeApp } = require("firebase/app")

const firebaseConfig = {
	apiKey: "AIzaSyC7sSw3Zu2hA2E25Bim_GJ-6k5zkGdW6ro",
	authDomain: "immobilier-0.firebaseapp.com",
	databaseURL: "https://immobilier-0-default-rtdb.firebaseio.com",
	projectId: "immobilier-0",
	storageBucket: "immobilier-0.appspot.com",
	messagingSenderId: "18917991989",
	appId: "1:18917991989:web:bbca024364bd6d5ad0737c"
};
  
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

const path = require("path")

const saveDocs = (collect="", docs=[])=>{
    // Add a new document with a generated id.
    docs.forEach(async (doc) =>{
        const docRef = await addDoc(collection(db, collect), doc)
        console.log("successfully write", docRef.id)
    })
}

const saveFile = (file, collect)=>{
	fs.readFile(path.join(__dirname, file), (err, data)=>{
		err ? console.log(err) : ''
		const loaded = JSON.parse(data.toString())
		saveDocs(`ads/X1eA1Bk8tfnVXHqduiTg/${collect}`, loaded)
	})
}

// saveFile(path.join(__dirname, "./plan.json"), 'plan')

module.exports = saveFile
// const ok = (...args)=>{
//   console.log(args)
// }

// ok({ok: true, name: 'akoto'})