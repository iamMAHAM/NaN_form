
const fs = require("fs")
const { addDoc, collection, getFirestore } = require("firebase/firestore")
const { initializeApp } = require("firebase/app")

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

const path = require("path")

const saveDocs = (collect="", docs=[])=>{
    // Add a new document with a generated id.
    docs.forEach(async (doc) =>{
        const docRef = await addDoc(collection(db, collect), doc)
        console.log("successfully write", docRef.id)
    })
}

const saveFile = (file, collect)=>{
	fs.readFile(file, (err, data)=>{
		err ? console.log(err) : ''
		const loaded = JSON.parse(data.toString())
		saveDocs(`data/Ho21xA8W3774097vSXhU/${collect}`, loaded)
	})
}

saveFile(path.join(__dirname, "./drugs.json"), 'drugs')