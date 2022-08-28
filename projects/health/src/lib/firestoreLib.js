
import { db } from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth"
import { collection, doc, addDoc, getDoc, getDocs, where, query, deleteDoc, setDoc, collectionGroup } from "firebase/firestore"; 

export const auth = getAuth()

export const getOne = async (collect="", id="", callback=null)=>{
    const docRef = doc(db, collect, id)
    const docSnap = await getDoc(docRef)
	let toPush = docSnap.data()
	toPush.id = docSnap.id
	console.log(toPush)
	return callback(toPush)
}

export const getAll = async (collect, callback)=>{
    let result = []
    const querySnapshot = await getDocs(collection(db, collect))
    querySnapshot.forEach((doc) => {
        let toPush = doc.data()
        toPush.id = doc.id
        result.push(toPush)
    })
    return callback(result)
}

export const queryAll = async (id="", property, operator, value)=>{
    const ref = collection(db, id)
    const q = query(ref, where(property, operator, value))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data())
    })
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

export const handleUser = onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("user is connected")
        console.log(user)
      // ...
    } else {
        console.log("not login")
    }
})
