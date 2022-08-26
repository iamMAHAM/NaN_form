
const fs = require("fs")
const { addDoc, collection, getFirestore } = require("firebase/firestore")
const { initializeApp } = require("firebase/app")


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

const allCategories = [
	'health',
	'home',
	'medicalMaterials',
	'slimmingSport',
	'veterinary',
	'beautyHygiene',
	'babyPregnacy',
	// 'drugs'
]

allCategories.forEach(cat=>{
	saveFile(path.join(__dirname, `./${cat}.json`), cat)
})
