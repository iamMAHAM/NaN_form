
import { db, storage, rtdb } from "./firebaseConfig"
import { ref, uploadBytes,getDownloadURL } from "firebase/storage"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged,signOut, updateProfile, deleteUser } from "firebase/auth"
import { collection, doc, addDoc, getDoc, getDocs, where, query, deleteDoc, setDoc, updateDoc, orderBy, serverTimestamp as sT } from "firebase/firestore"
import { set, ref as dbref, remove } from "firebase/database"
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

export const find = (col, order=false)=>{
    return new Promise(async (resolve)=>{
        const result = []
        let qs = null
        if (!order){
            qs = await getDocs(collection(db, col))
        } else{
            qs = await getDocs(query(collection(db, col), orderBy(order)))
        }
        qs.docs.map((doc) => {
            let toPush = doc.data()
            toPush.id = doc.id
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
    return new Promise(async (resolve)=>{
        d.publishedAt = Date.now()
       const q = await addDoc(collection(db, col), d)
       d.id = q.id
       resolve(d)
    })
}
export const setOne = async (col="", data={}, id='')=>{
    data.id = id
    await setDoc(doc(db, col, id), data)
}

export const save = async (col="", docs=[])=>{
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

export const updateOne = async(col="", id="", ...args)=>{
	await updateDoc(doc(db, col, id), ...args)
}

export const signUp = async (data)=>{
    return new Promise((resolve, reject)=>{
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (u)=>{
            await sendEmailVerification(u.user)
            await updateProfile(u.user,{
                displayName: data.fullName,
                photoURL: data.avatar,
            })
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

// export const sendMessage = async (senderId, receiverId, message, callback=()=>{})=>{
//     Promise.all([
//         saveOne(`messages/${senderId}/${receiverId}/`, message),
//         saveOne(`messages/${receiverId}/${senderId}`, message)
//     ]).catch(e=>{return callback(e.message)})
// }

export const deleteUsers = ()=>{
  return new Promise(async (resolve, rejecte)=>{
    const deleted = await deleteUser()
  })
}

const setData = (info, receiver, message)=>{
    const banned = ['email', 'password', 'birth']
    const inter = {}
    if (message){
      inter.lastMessage = {
          senderId: message.senderId,
          date: new Date(message.timestamp).toLocaleString().split(" ")[1].slice(0, 5),
          message: message.message
      }
    }
    for (const [k, v] of Object.entries(info)){
      banned.includes(k) ? '' : inter[k] = v
    }
    set(receiver, inter)
}

export const useRightRef = (path, from, to, id)=>{
    return [dbref(rtdb, `${path}/${from}/${to}/${id}`), dbref(rtdb, `${path}/${to}/${from}/${id}`)]
}

export const addConversation = async (senderId, receiverId)=>{
  const myRef = dbref(rtdb, `messages/${senderId}/${receiverId}/info`)
  findOne("users", receiverId) // find to person info
  .then(receiverInfo=>{
    setData(receiverInfo, myRef) // set his info to my ref
  })
}

export const sendMessage = async (senderId, receiverId, message)=>{
    return new Promise((resolve, reject)=>{
        const id = uuidv4()
        const [senderRef, receiverRef] = useRightRef("messages", senderId, receiverId, id)
        const [senderInfoRef, receiverInfoRef] = useRightRef("messages", receiverId, senderId, "info")
        // const senderInfoRef = rightRef(receiverId, senderId, "info")
        // const receiverInfoRef = rightRef(senderId, receiverId, "info")
        message.id = id
        message.senderId = senderId
        message.timestamp = Date.now()
        set(senderRef, message) // save message to sender collection
        set(receiverRef, message) // save message to receiver collection
        findOne("users", receiverId) // find receiver user info
        .then(receiverInfo=> {
            setData(receiverInfo, receiverInfoRef, message) // save receiver information to sender
        })
        .catch(e=>reject(e.message))
        findOne("users", senderId) // find sender user info
        .then(senderInfo=>{
            setData(senderInfo, senderInfoRef, message) // save sender information to reciver
            resolve(message)
        })
        .catch(e=>reject(e.message))
    })
}

export const deleteMessage = (senderId, receiverId, id)=>{
    return new Promise((resolve, reject)=>{
        const [senderRef, receiverRef] = useRightRef("messages", senderId, receiverId, id)
        remove(senderRef)
        .then(()=>{
            remove(receiverRef)
            resolve()
        })
        .catch(e=>reject(e?.message))
    })
}

export const uploadImage = (path, file)=>{
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
        const images = []
        const id = uuidv4()
        adInfo.images.map(async img=>{
            uploadImage(`images/${id + img.name}`, img).then(url=>{
                images.push(url)
            }).then(()=>{
              adInfo.images = images
              adInfo.status = "pending"
              adInfo.tempId = id
              saveOne(`users/${userId}/ads`, adInfo)
              .then((ad)=>{
                  const waitRef = dbref(rtdb, `waitingAds/${id}`)
                  ad.images = images
                  set(waitRef, ad)
                  resolve(ad)
              })
              .catch(e=>reject("failed to post ad : ", e.message))
            })
        })
    })
}

export const validateAd = (userId, adInfo)=>{
  return new Promise((resolve, reject)=>{
    const ref = dbref(rtdb, `waitingAds/${adInfo.tempId}`)
    remove(ref)
    .then(()=>{
      adInfo.status = "online"
      delete adInfo.tempId
      Promise.all([
        setOne(`users/${userId}/ads`, adInfo, adInfo.id),
        setOne(`ads/X1eA1Bk8tfnVXHqduiTg/${adInfo.type}`, adInfo, adInfo.id)
      ])
      .then(resolve()) // send mail to say ad is online
    })
    .catch(e=>reject(e.message))
  })
}

export const unValidateAd = (userId, adInfo)=>{
  return new Promise((resolve, reject)=>{
    const ref = dbref(rtdb, `waitingAds/${adInfo.tempId}`)
    remove(ref)
    .then(()=>{
      adInfo.status = "refused",
      setOne(`users/${userId}/ads`, adInfo, adInfo.id)
      .then(resolve()) //send mail to tell user add is refused
    }).catch(e=>reject(e.message))
  })
}

export const deleteFromDatabase = async (path)=>{
  const ref = dbref(rtdb, path)
  await remove(ref)
}
export const soldeAd = async (userId, adInfo)=>{
  adInfo.status = "solded"
  Promise.all([
    updateOne(`users/${userId}/ads`, adInfo.id, adInfo),
    saveOne(`admin/vAJXH3iQabt9AjGLAaej/solded`, adInfo),
    deleteOne(`ads/X1eA1Bk8tfnVXHqduiTg/${adInfo.type}`, adInfo.id)
  ])
}

export const abortPost = async (tempId)=>{
  const ref = dbref(rtdb, `waitingAds/${tempId}`)
  await remove(ref)
}
export const commentPost = (postId, message)=>{
    saveOne(`comments/${postId}`, message)
}

export const deleteComment = (postId, messageId)=>{
    deleteOne(`comments/${postId}`, messageId)
}

export const forbiden = (thiss)=>{
    if (!auth?.currentUser){
        thiss.$router.push("/")
    }
}
export const allCategories = [
	'terrain',
	'maison',
	'magasin'
]

export const messageTemplate = (type, proposition, price, link)=>{
    return ({
        message:{
            type: 'text',
            content:
            `
                Bonjour je suis intéressé(e) par la ${proposition} de votre ${type} au prix de ${price.toLocaleString("ci")} FCFA. J'aimerais avoir de plus amples informations. Merci d'avance.
                ${link}
            `.trim(),
        }
    })
}
