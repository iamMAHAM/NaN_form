
import { db, storage, rtdb } from "./firebaseConfig"
import { ref, uploadBytes,getDownloadURL } from "firebase/storage"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged,signOut } from "firebase/auth"
import { collection, doc, addDoc, getDoc, getDocs, where, query, deleteDoc, setDoc, updateDoc, orderBy, se } from "firebase/firestore"
import { set, ref as dbref, serverTimestamp, onValue, query as dbquery } from "firebase/database"
import { uuidv4 } from "@firebase/util"

/**********CONST VARIABLES********************/
export const auth = getAuth()
const users = collection(db, "users")
const datas = collection(db, "datas")

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
        reject(new Error("user not found"))
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
        qs.empty ? reject(new Error("empty collection")) : ''
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
            querySnapshot.empty ? reject(new Error("aucun resultat trouvé")) : ''
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
    return new Promise(async (resolve)=>{
        const q = await addDoc(collection(db, col), d)
        if (!d.hasOwnProperty("id")){
            await updateDoc(doc(db, "users", q.id), {id: q.id})
        }
    })
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

export const signUp = (data)=>{
    return new Promise((resolve, reject)=>{
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (u)=>{
            await sendEmailVerification(u.user)
            await saveOne("users", data)
            resolve(true)
        }).catch(e => reject(e.code))
    })
}

export const signIn = async (form)=>{
    return new Promise((resolve, reject)=>{
        signInWithEmailAndPassword(auth, form.email, form.password)
        .then(async (user)=>{
            if (user.user.emailVerified){
                const q = query(users, where("email", "==", form.email), where("password", "==", form.password))
                const qs = await getDocs(q)
                const user = qs.docs[0].data()
                user.id = qs.docs[0].id
                resolve(user)
            }else{//not confirm mail
               reject(new Error("confirm your email first"))
            }
        })
        .catch(e=>reject(e.code))
    })
}

export const signOutUser = async ()=>{
    await signOut(auth)
}

export const isLoggedUser = async (callback)=>{
    onAuthStateChanged(auth, (user) => {
        const status = user ? true : false
        return callback(status, user)
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
    message.timestamp = serverTimestamp()
    set(messagesRef, message)
    findOne("users", receiverID)
    .then(info=> {
        console.log(info)
        const banned = ['email', 'password', 'birth']
        const inter = {} 
        for (const [k, v] of Object.entries(info)){
            banned.includes(k) ? '' : inter[k] = v
        }
        set(receiverInfo, inter)
    })
}
// 
export const getConversations = async (userId)=>{
    return new Promise((resolve)=>{
        const conversations = dbref(rtdb, `messages/${userId}/`);
        const q = dbquery(conversations)
        onValue(conversations, (snapshot) => {
        const data = snapshot.val();
        resolve(data)
    })
    // updateStarCount(postElement, data);
});

}
// export const writeUserData = async (userId, name, email, imageUrl)=>{
//     set(dbref(rtdb, 'users/' + userId), {
//       username: name,
//       email: email,
//       profile_picture : imageUrl
// });
// }

export const uploadImage = async (path, file, callback)=>{
	const Imagesref = ref(storage, path)
	await uploadBytes(Imagesref, file).then((snapshot) => {
		getDownloadURL(snapshot.ref)
		.then(url=>{return callback(url)})
	  })
}

export const postAd = (userId, adInfo={})=>{
    return new Promise((resolve, reject)=>{
        saveOne(collection(db, `users/${userId}/ads`), adInfo)
        .then(()=>resolve("success"))
        .catch(e=>reject(new Error("failed to post ad : ", e.message)))
    })
}

export const deleteAd = (userId, adId="")=>{
    return new Promise((resolve, reject)=>{
        deleteOne(collection(db, `users/${userId}/ads`), adId)
        .then(()=>resolve("success"))
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