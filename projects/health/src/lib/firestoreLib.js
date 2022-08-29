
import { db } from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged,signOut } from "firebase/auth"
import { collection, doc, addDoc, getDoc, getDocs, where, query, deleteDoc, setDoc, onSnapshot } from "firebase/firestore"; 

export const auth = getAuth()

export const getOne = async (collect="", id="", callback=null)=>{
    const docRef = doc(db, collect, id)
    const docSnap = await getDoc(docRef)
	let toPush = docSnap.data()
	toPush.id = docSnap.id
	console.log(toPush)
	return callback(toPush)
}

export const getAll = async (collect, callback, origin="")=>{
    let result = []
    const querySnapshot = await getDocs(collection(db, collect))
    querySnapshot.forEach((doc) => {
        let toPush = doc.data()
        toPush.id = doc.id
        toPush.origin = origin
        result.push(toPush)
    })
    return callback(result)
}

export const matchFields = async (categories=[], value="", callback)=>{
    let result = []
    for (const cat of categories){
        const q = query(collection(db, `data/Ho21xA8W3774097vSXhU/${cat}`),
        where("title", ">=", value),
        where("title", "<=", value + "\uf8ff")
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            let toPush = doc.data()
            toPush.id = doc.id
            toPush.origin = cat
            result.push(toPush)
        })
    }
    return callback(result)
}

export const saveDoc = async (collect="", doc)=>{
    await addDoc(collection(db, collect), doc)
}

export const saveOrOverride = async(collect, id, doct, callback)=>{
	const docRef = await setDoc(doc(db, collect, id), doct)
	return callback()
}
export const saveDocs = (collect="", docs=[])=>{
    // Add a new document with a generated id.
    docs.forEach(async (doc) =>{
        const docRef = await addDoc(collection(db, collect), doc)
        console.log(docRef.id)
    })
}

export const unSaveDoc = async (collect="", doct)=>{
    await deleteDoc(doc(db, collect, doct))
	console.log("doc with", doct, "deleted")
}

export const signUp = (data, callback)=>{
    let result = {
        status: null,
        message: null
    }
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (u)=>{
        await sendEmailVerification(u.user)
        await saveDoc("users", data)
        result.status = true
        result.message = "register success"
        return callback(result)
    }).catch(e=> {
        result.status = false,
        result.message = e.code
        return callback(result)
    })
}

export const signIn = async (data, callback)=>{
    let result = {
        user: null,
        error: null
    }
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then(async (user)=>{
        const users = collection(db, "users")
        const q = query(users, where("email", "==", data.email))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc=>{
            let user = doc.data()
            user["id"] = doc.id
            result.user = user
        })
        return callback(result)
    })
    .catch(err=>{
        result.error = err.code
        return callback(result)
    })
}

export const signOutUser = async ()=>{
    const data = await signOut(auth)
    console.log(data)
}
export const isLoggedUser = async (callback)=>{
    onAuthStateChanged(auth, (user) => {
        const status = user ? true : false
        return callback(status)
    })
   
}

export const realTimeListener = (id, callback)=>{
	console.log("listening for changes ...")
	let messages = []
	const q = collection(db, `chat/${id}/messages`)
	onSnapshot(q, (querySnapshot) => {
		querySnapshot.forEach(docs=>{
			messages.push({...docs.data()})
		})
	})
	return callback(messages)

}

export const sendMessage = async (id, message)=>{
	await saveDoc(`chat/${id}/messages`, message)
	await saveDoc(`users/8F1bKGaOUOAZGV0blD74/messages`, message)
}

export const allCategories = [
	'health',
	'home',
	'medicalMaterials',
	'slimmingSport',
	'veterinary',
	'beautyHygiene',
	'babyPregnacy',
	'drugs'
]