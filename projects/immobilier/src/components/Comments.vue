<template>
  <div class="comments">
    <h2 align=center>COMMENTAIRES</h2>
    <div class="add-comment" v-if="isLogged">
      <textarea placeholder="ajouter un commentaire" cols="50" rows="10" v-model="commentInfo.message"></textarea>
      <button @click="postComment">envoyer</button>
    </div>
    <div
      class="comment"
      v-for="comment in comments"
      :key="comment.id"
      :id="comment.id">
      <i
        class="material-symbols-outlined"
        @click="deleteC"
        v-if="comment.posterId === auth?.currentUser?.uid"
      >
        delete
      </i>
      <div class="comment-left">
          <img :src="comment.avatar" class="ctop" @click="$router.push(`/profile?id=${comment.posterId}`)">
          <p class="datess"><b>{{ comment.name }}</b></p>
          <p class="datess">{{ date(comment?.publishedAt) }}</p>
      </div>
      <div style="width: calc(80%); text-align: center">
        {{ comment.message }}
      </div>
    </div>

    <div class="nocomment" style="font-size: 2rem; color: var(--navcolor);" align=center v-if="!comments.length">
      Aucun commentaire pour l'instant
    </div>
    
  </div>
</template>

<script>
import { auth, commentPost, deleteComment } from '@/lib/firestoreLib'
import Modal from '@/components/partials/Modal.vue'
import { collection, onSnapshot } from '@firebase/firestore'
import { db } from '@/lib/firebaseConfig'
export default {
  name: 'Comment',
  props: ['postId', 'isLogged'],
  components:{
    Modal
  },
  data(){
    return {
      commentInfo: {},
      comments:[],
      auth: auth
    }
  },
  methods: {
    async deleteC(e){
      const id = e.target.closest('.comment').id
      await deleteComment(this.postId, id)
    },
    async postComment(){
      this.commentInfo.name = auth?.currentUser?.displayName
      this.commentInfo.posterId = auth?.currentUser?.uid
      this.commentInfo.avatar = auth?.currentUser?.photoURL,
      await commentPost(this.postId, this.commentInfo)
      this.commentInfo.message = ''
    },
    date(ts){
      try{
          const st = ts.toDate()
          return st.toUTCString().replace('GMT', '').trim()
      } catch (e){}
    }
  },
  mounted(){
    onSnapshot(collection(db, `comments/comments/${this.postId}`), (snap)=>{
      this.comments = [...snap.docs.map(s => {return {...s.data(), id: s.id}})]
    })
  }
}
</script>

<style scoped>

h2{
  padding: 2rem;
}

button{
  cursor: pointer;
  padding: 1rem;
  border-radius: 5px;
  background: var(--navcolor);
  color: var(--white)
}

textarea{
  margin: 1rem;
  text-align: center;
}
</style>
<style>
.comment{
  width: 100%;
  position: relative;
  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
  gap: 5px;
  background: var(--white);
  padding: 1rem;
  margin: .5rem;
  border-radius: 1rem;
}

.comment-left{
  padding-right: 1rem;
  text-align: center;
  justify-content: center;
  min-width: 100px;
  max-width: 120px;
  border-right: .5px solid var(--navcolor);
}

.comment img{
  border-radius: 50%;
  width: 50px;
  height: 50px
}

.comment .datess{
  font-size: 1rem;
  vertical-align: middle;
  justify-content: center;
}

.comment i{
  color: var(--red);
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 10px;
}

.comment i:hover{
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

.add-comment{
  gap: 20px;
  margin: 0 auto;
  justify-content: center;
  display: flex;
  align-items: center;
}
</style>