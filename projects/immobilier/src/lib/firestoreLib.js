
import { db, storage, rtdb } from "./firebaseConfig"
import { ref, uploadBytes,getDownloadURL } from "firebase/storage"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged,signOut } from "firebase/auth"
import { collection, doc, addDoc, getDoc, getDocs, where, query, deleteDoc, setDoc, updateDoc, orderBy, serverTimestamp as sT } from "firebase/firestore"
import { set, ref as dbref, serverTimestamp, onValue, query as dbquery } from "firebase/database"
import { uuidv4 } from "@firebase/util"

/**********CONST VARIABLES********************/
export const auth = getAuth()
const users = collection(db, "users")
const datas = collection(db, "datas")

Object.filter = (obj, predicate) => 
Object.keys(obj)
      .filter( key => predicate(obj[key]) )
      .reduce( (res, key) => (res[key] = obj[key], res), {}
);

/*************FUNCTIONS*********************/
export const findOne = (col="", id="")=>{
    return new Promise(async (resolve, reject)=>{
        const docRef = doc(db, col, id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()){
            let found = docSnap.data()
            found.id = docSnap.id
            resolve(found)
            return
        }
        reject("user not found")
    })
}

export const find = (col, origin="", order=false)=>{
    return new Promise(async (resolve)=>{
        const result = []
        let qs = null
        if (!order){
            qs = await getDocs(collection(db, col))
        } else{
            qs = await getDocs(query(collection(db, col), orderBy(order)))
        }
        console.log(qs)
        qs.empty ? reject("empty collection") : ''
        qs.docs.map((doc) => {
            let toPush = doc.data()
            toPush.id = doc.id
            origin ? toPush.origin = origin :  ''
            result.push(toPush)
        })
        resolve(result)
    })
}

export const search = (categories=[], value="")=>{
    return new Promise((resolve, reject)=>{
        const result = []
        categories.map(async cat=>{
            const q = query(collection(db, `data/Ho21xA8W3774097vSXhU/${cat}`),
            where("title", ">=", value),
            where("title", "<=", value + "\uf8ff")
            )
            const querySnapshot = await getDocs(q)
            querySnapshot.empty ? reject("aucun resultat trouvé") : ''
            querySnapshot.docs.map((doc) => {
                let toPush = doc.data()
                toPush.id = doc.id
                toPush.origin = cat
                result.push(toPush)
            })
            resolve(result)
        })
    })
}

export const saveOne = (col="", d)=>{
    return new Promise(async (resolve, reject)=>{
        d.publishedAt = Date.now()
        const q = await addDoc(collection(db, col), d)
        if (!d.hasOwnProperty("id")){
            await updateDoc(doc(db, col, q.id), {id: q.id})
        }
        resolve(d)
    })
}
export const setOne = async (col="", data={}, id='')=>{
    data.id = id
    await setDoc(doc(db, col, id), data)
}

export const save = (col="", docs=[])=>{
    docs.map(async (doc) =>{
        await addDoc(collection(db, col), doc)
    })
}

export const override = async (col="", id="", news={})=>{
	await setDoc(doc(db, col, id), news)
}


export const deleteOne = async (col="", id="")=>{
    await deleteDoc(doc(db, col, id))
}

export const updateUserInfo = async(id="", news={})=>{
	await updateDoc(doc(db, "users", id), news)
}

export const signUp = async (data)=>{
    return new Promise((resolve, reject)=>{
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (u)=>{
            await sendEmailVerification(u.user)
            delete data.password
            await setOne("users", data, u.user.uid)
            resolve(data)
        }).catch(e => reject(e.code ? e.code : e.message))
    })
}

export const signIn = async (form)=>{
    return new Promise((resolve, reject)=>{
        signInWithEmailAndPassword(auth, form.email, form.password)
        .then(async (userCredential)=>{
            if (userCredential.user.emailVerified){
                const q = query(users, where("id", "==", userCredential.user.uid))
                const qs = await getDocs(q)
                const user = qs.docs[0].exists() ? qs.docs[0].data() : null
                delete user.password
                resolve(user)
            }else{//not confirm mail
               reject("confirm your email first")
            }
        })
        .catch(e=>reject(e.code ? e.code : e.message))
    })
}

export const signOutUser = async ()=>{
    await signOut(auth)
}

export const monitorState = async (callback)=>{
    onAuthStateChanged(auth, (user) => {
        callback(user)
    })
}

// export const sendMessage = async (senderId, receiverID, message, callback=()=>{})=>{
//     Promise.all([
//         saveOne(`messages/${senderId}/${receiverID}/`, message),
//         saveOne(`messages/${receiverID}/${senderId}`, message)
//     ]).catch(e=>{return callback(e.message)})
// }

export const sendMessage = async (senderId, receiverID, message)=>{
    const id = uuidv4()
    const messagesRef = dbref(rtdb, `messages/${senderId}/${receiverID}/${id}`)
    const receiverInfo = dbref(rtdb, `messages/${senderId}/${receiverID}/info`)
    message.id = id
    message.timestamp = Date.now()
    set(messagesRef, message)
    findOne("users", receiverID)
    .then(info=> {
        const banned = ['email', 'password', 'birth']
        const inter = {}
        inter.lastMessage = {
            date: new Date(message.timestamp).toLocaleString().split(" ")[1].slice(1, 5),
            message: message.message
        }
        for (const [k, v] of Object.entries(info)){
            banned.includes(k) ? '' : inter[k] = v
        }
        set(receiverInfo, inter)
    })
}

export const uploadImage = (path, file,)=>{
    return new Promise(async (resolve, reject)=>{
        const Imagesref = ref(storage, path)
        await uploadBytes(Imagesref, file).then((snapshot) => {
            getDownloadURL(snapshot.ref)
            .then(url=>resolve(url))
          }).catch(e=>reject(e.message))
    }).catch(e=>reject(e.message))
}

export const postAd = (userId, adInfo={})=>{
    return new Promise((resolve, reject)=>{
        saveOne(`users/${userId}/ads`, adInfo)
        .then((ad)=>{
            const id = uuidv4()
            const waitRef = dbref(rtdb, `waitingAds/${userId}/${id}`)
            set(waitRef, ad)
            resolve(ad)
        })
        .catch(e=>reject("failed to post ad : ", e.message))
    })
}

export const deleteAd = (userId, adId="")=>{
    return new Promise((resolve, reject)=>{
        deleteOne(collection(db, `users/${userId}/ads`), adId)
        .then(resolve())
        .catch(e=>reject("failed to delete ad : ", e.message))
    })
}

export const commentPost = (postId, message)=>{
    saveOne(collection(db, `comments/${postId}`), message)
}

export const deleteComment = (postId, messageId)=>{
    deleteOne(collection(db, `comments/${postId}`), messageId)
}


export const allCategories = [
	'terrain',
	'maison',
	'magasin'
]