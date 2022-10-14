<template>
  <Modal ref='modal'/>
  <div id="uploadFiles" v-if="!flagged">
  <p class="insUpload" v-if="!props">Téléverser vos Informations de vérification</p>
  <div class="user-files user-files1">
    <ul>
      <li>
        <div class="upld-list">
          <div class="upd-iconName">
            <span class="uploaded-icon">
              <svg viewBox="-448.5 266.5 28.9 29">
                <use xlink:href="#upload-svg"></use>
              </svg>
            </span>
            <div style="text-align:justify">
              <span class="docName">{{ props?.selfie || 'Selfie (photo de vous)'}} </span>
              <div class="docType"><span class="fileName"></span> <i class="mdot"></i><span class="fileSize"></span></div>
              <div class="msg"></div>
            </div>
          </div>
          <div>
            <input
              type="file"
              class="upload-img"
              id="userFile1"
              @change="addFile"
              accept=".jpeg, .png, .webp, .svg"
            >
            <label for="userFile1">Ajouter</label>
            <span class="closeStyle removeFile" @click="removeFile"></span>
          </div>
        </div>
      </li>
      <li>
        <div class="upld-list">
          <div class="upd-iconName">
            <span class="uploaded-icon">
              <svg viewBox="-448.5 266.5 28.9 29">
                <use xlink:href="#upload-svg"></use>
              </svg>
            </span>
            <div style="text-align:justify">
              <span class="docName">{{ props?.recto || 'Recto de la pièce d\'identité'}}</span>
              <div class="docType"><span class="fileName"></span> <i class="mdot"></i><span class="fileSize"></span></div>
              <div class="msg"></div>
            </div>
          </div>
          <div>
            <input 
              type="file"
              class="upload-img"
              id="userFile4"
              @change="addFile"
              accept=".jpeg, .png, .webp, .svg"
            >
            <label for="userFile4">Ajouter</label>
            <span class="closeStyle removeFile" @click="removeFile"></span>
          </div>
        </div>
      </li>
      <li>
        <div class="upld-list">
          <div class="upd-iconName">
            <span class="uploaded-icon">
              <svg viewBox="-448.5 266.5 28.9 29">
                <use xlink:href="#upload-svg"></use>
              </svg>
            </span>
            <div style="text-align:justify">
              <span class="docName">{{ props?.verso || 'Verso de la pièce d\'identité'}}</span>
              <div class="docType"><span class="fileName"></span> <i class="mdot"></i><span class="fileSize"></span></div>
              <div class="msg"></div>
            </div>
          </div>
          <div>
            <input 
              type="file"
              class="upload-img"
              id="userFile5"
              @change="addFile"
              accept=".jpeg, .png, .webp, .svg"
            >
            <label for="userFile5">Ajouter</label>
            <span class="closeStyle removeFile" @click="removeFile"></span>
          </div>
        </div>
      </li>
      <li>
        <div class="upld-list">
          <div class="upd-iconName">
            <span class="uploaded-icon">
              <svg viewBox="-448.5 266.5 28.9 29">
                <use xlink:href="#upload-svg"></use>
              </svg>
            </span>
            <div style="text-align:justify">
              <span class="docName">{{ props?.facture || 'Facture (CIE, SODECI, CANAL+)'}}</span>
              <div class="docType"><span class="fileName"></span> <i class="mdot"></i><span class="fileSize"></span></div>
              <div class="msg"></div>
            </div>
          </div>
          <div>
            <input 
              type="file"
              class="upload-img"
              id="userFile6"
              @change="addFile"
              accept=".jpeg, .png, .webp, .svg"
            >
            <label for="userFile6">Ajouter</label>
            <span class="closeStyle removeFile" @click="removeFile"></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="error" v-if="error" style="font-size: 1.6rem; padding: 1rem;"> Tous les documents sont obligatoires</div>
  <div class="previewImages">
    <img :src="selfie" alt="" :class="props?.company? 'uploadedImages company' : 'uploadedImages'" v-if="selfie">
    <img :src="recto" alt="" :class="props?.company? 'uploadedImages company' : 'uploadedImages'" v-if="recto">
    <img :src="verso" alt="" :class="props?.company? 'uploadedImages company' : 'uploadedImages'" v-if="verso">
    <img :src="facture" alt="" :class="props?.company? 'uploadedImages company' : 'uploadedImages'" v-if="facture">
  </div>

  <button
    v-if="!req && !props"
    type="button"
    class="submit-btn js-submit"
    @click="submitVerification"
  >
    Soumettre
  </button>
  <Loader :view="3" :height="30" :width="30" v-else-if="req && !props"/>
  <svg class="mainSvg" viewBox="-448.5 266.5 28.9 29" style="display:none">
    <g id="upload-svg">
      <path class="st0" d="M-434,295.5c-8,0-14.5-6.5-14.5-14.5s6.5-14.5,14.5-14.5c2.5,0,5,0.7,7.2,1.9c0.3,0.2,0.4,0.6,0.2,0.8c-0.1,0.2-0.3,0.3-0.5,0.3c-0.1,0-0.2,0-0.3-0.1c-2-1.2-4.3-1.8-6.6-1.8c-7.3,0.1-13.3,6.1-13.3,13.4s5.9,13.3,13.3,13.3s13.3-6,13.3-13.3c0-0.6,0-1.2-0.1-1.8c-0.1-1-0.4-2-0.8-3c-0.2-0.6-0.5-1.3-0.9-1.8c-0.1-0.1-0.1-0.3-0.1-0.5c0-0.2,0.1-0.3,0.3-0.4c0.1-0.1,0.2-0.1,0.3-0.1c0.2,0,0.4,0.1,0.5,0.3c0.4,0.6,0.7,1.3,1,2c0.4,1.1,0.7,2.2,0.8,3.3c0.1,0.6,0.1,1.3,0.1,1.9C-419.5,289-426,295.5-434,295.5"/>
      <path class="st0" d="M-435.9,286.2c-0.2,0-0.3-0.1-0.4-0.2l-3.7-3.6c-0.2-0.2-0.2-0.6,0-0.9c0.1-0.1,0.3-0.2,0.4-0.2c0.2,0,0.3,0.1,0.4,0.2l3,3c0.1,0.1,0.1,0.1,0.2,0.1s0.2,0,0.2-0.1l6.7-6.7c0.1-0.1,0.3-0.2,0.4-0.2c0.1,0,0.3,0.1,0.4,0.2c0.2,0.2,0.2,0.6,0,0.9l-7.4,7.4C-435.5,286.2-435.7,286.2-435.9,286.2"/>
    </g>
  </svg>
</div>
</template>

<script>
import { auth, findOne, setOne, updateOne, uploadImage } from '@/lib/firestoreLib'
import Modal from '@/components/partials/Modal.vue'
import Loader from '../Loader.vue'
import { uuidv4 } from '@firebase/util'
export default {
  name: 'userVerification',
  props: ['props', 'flagged'],
  emits: ['fileAdd', 'fileRemove'],
  components: {
    Loader,
    Modal
  },
  data(){
    return {
      selfie: '',
      recto: '',
      verso: '',
      facture: '',
      error: false,
      req: false
    }
  },
  methods:{
    rightValue(url, id){
      this.selfie = id === "userFile1" ? url : this.selfie
      this.recto = id === "userFile4" ? url : this.recto
      this.verso = id === "userFile5" ? url : this.verso
      this.facture = id === "userFile6" ? url : this.facture
    },
    addFile(e){
      const parent = e.target.closest("li")
      const id = e.target.id
      const file = e.target.files[0]
      const docType = parent.querySelector(".docType")
      const name = file.name
      const nameE = parent.querySelector('.fileName')
      const url = window.URL.createObjectURL(file)

      this.rightValue(url, id)
      nameE.textContent = name
      docType.style.display = 'block'
      parent.classList.add("uploaded")
      this.$emit('fileAdd', file)
    },
    removeFile(e){
      const parent = e.target.closest("li")
      const input = parent.querySelector("input")
      const id = input.id
      const docType = parent.querySelector(".docType")
      this.$emit('fileRemove', e.target.previousElementSibling.previousElementSibling.files[0])
      input.value = ''
      docType.style.display = 'none'
      parent.classList.remove("uploaded")
      this.rightValue('', id)
    },
    async submitVerification(id){
      this.req = true
      const images = []
      this.error = true
      let flag = false
      const inputs = Array.from(document.querySelectorAll(".upload-img"))
      inputs.forEach(i=>!i.files[0] ? flag = true : '')
      if (!flag){
        this.error = false
        for (const i of inputs){
          const url = await uploadImage(`verif/${auth?.currentUser?.uid || id}/${i.files[0].name}`, i.files[0])
          images.push(url)
        }
        const user = await findOne("users", auth?.currentUser?.uid || id)
        user.verifInfoImages = images
        user.isCompany = this.props?.company === true
        Promise.all([
          setOne("admin/vAJXH3iQabt9AjGLAaej/verification", user, auth?.currentUser?.uid ||id),
          updateOne("users", auth?.currentUser?.uid || id, {isAwaitingVerification: true}),
        ]).then(()=>{
          this.$refs.modal.show({
            type: 'info',
            title: 'Verification d\'identité',
            message: 'informations soumises avec succès\n...'
          })
        })
        .then(()=>{
          setTimeout(()=>{
            this.$refs.modal.close()
          }, 3000)
        })
        this.req = false
        return
      }
      this.error = true
      this.req = false
    },
  }
}
</script>

<style>
body {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  line-height: 1.4;
}

#uploadFiles {
  margin: 20px auto;
}

#uploadFiles .insUpload {
  text-align: center;
  font-size: 2rem;
  margin: 0 0 10px;
}

.user-files {
  position: relative;
  background: #fff;
  margin-top: 10px;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
}

.user-files ul {
  margin: 0;
  padding: 0;
}

.user-files li {
  list-style: none;
  padding: 10px 0;
  border-bottom: 1px solid #f7f6f6;
  font-size: 14px;
  color: #000;
}

.user-files li:last-child {
  border-bottom: none;
}

.user-files .upld-list,
.user-files .upd-iconName {
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
}

.user-files .upld-list,
.user-files .upd-iconName {
  -webkit-align-items: center;
  align-items: center;
}

.user-files .upld-list {
  position: relative;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}

.user-files .uploaded-icon {
  position: relative;
  width: 26px;
  height: 26px;
  border-radius: 100%;
  background-size: 52px;
  margin-right: 15px;
}

.user-files .docName {
  font-weight: 400;
}

.user-files .docType {
  display: none;
  color: #b3b3b3;
  font-size: 12px;
}

.upld-list .msg {
  color: #ff0000;
  font-size: 11px;
  display: block;
  margin-top: 2px;
  display: none;
}

.user-files input {
  display: none;
}

.user-files label {
  position: relative;
  display: inline-block;
  color: #5e94c3;
  font-size: 15px;
  font-weight: 600;
  padding: 10px;
  right: -10px;
  cursor: pointer;
}

.user-files .mdot {
  width: 3px;
  height: 3px;
  border-radius: 100%;
  background: #b3b3b3;
  margin: 0 10px;
  display: inline-block;
  vertical-align: middle;
}

.user-files .error {
  color: #ff0000;
  font-size: 13px;
  position: absolute;
  left: 0;
  width: 100%;
  bottom: -24px;
  font-weight: 300;
  display: none;
}

.user-files .uploaded-icon svg {
  width: 100%;
  height: 100%;
}

#uploadFiles svg {
  fill: #5a5a5a;
}

#uploadFiles .uploaded svg {
  fill: #23D717;
}

.upld-list .closeStyle,
.uploaded .upld-list label {
  display: none;
}

.uploaded .upld-list .closeStyle {
  display: block;
}

.upld-list .closeStyle {
  top: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  right: -10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.upld-list .closeStyle:before,
.upld-list .closeStyle:after {
  content: '';
  position: absolute;
  width: 24px;
  height: 1.5px;
  background: #7b7b7b;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.upld-list .closeStyle:before {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.upld-list .closeStyle:after {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.submit-btn {
  cursor: pointer;
  background: var(--navcolor);
  color: #fff;
  padding: 1rem 2rem;
  font-size: 17px;
  border-radius: 30px;
  outline: 0;
}

.submit-btn:hover{
  background: var(--hovercolor);
}

.previewImages{
  text-align: center;
}

.previewImages .uploadedImages{
  margin: 0 .5rem;
  height: 20rem;
  width: 25rem;
}

.previewImages .uploadedImages.company{
  height: 10rem;
  width: 15rem;
}

</style>