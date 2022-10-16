<template>
  <Transition name="modal">
    <div class="modal-container" v-if="isVisible">
      <div class="modal">
        <h2 class="title" align="center" style="padding: 1rem">
          <i class="material-symbols-outlined" v-if="type === 'info'" style="color:blue">info</i>
          <i class="material-symbols-outlined" v-else-if="type === 'error'" style="color: var(--red)">error</i>
          <i class="material-symbols-outlined" v-else style="color: var(--greenfun)">check</i>
          {{ title }}
        </h2>
        <div class="content" align="center" style="padding: 1rem; color: var(--navcolor);">
          <p v-if="!result && type !== 'error'">{{ message }}</p>
          <p v-if="result && !errorMessage"> {{ resultMessage }}</p>
          <p v-else> {{ errorMessage }}</p>
        </div>
        <div class="bottom-modal" align="center">
          <div
            v-if="!result && type ==='confirm' && display"
            :style="{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around'
  
            }"
          >
            <span style="color: var(--red)" @click="response">non</span>
            <span style="color: var(--greenfun)" @click="response">oui</span>
          </div>
          <span align="center" v-else style="color: var(--navcolor); cursor: pointer;" @click="close">
            ok
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'Modal',
  data(){
    return {
      isVisible: false,
      resolvePromise: null,
      result: false,
      resultMessage: 'Success',
      type: 'confirm',
      message : 'Voulez vous continuer ?',
      display: true,
      title: 'Confirmation',
      errorMessage: ''
    }
  },
  methods:{
    open(){
      this.isVisible = true
    },
    close(){
      this.isVisible = false
      this.result = false
    },
    show(options={}){
      this.title = options.title || this.title
      this.message = options.message || this.message
      this.type = options.type || this.type
      this.display = options.display || this.display
      this.errorMessage = options.errorMessage
      this.resultMessage = options.resultMessage || this.resultMessage
      this.open()
      return new Promise((resolve)=>{
        this.resolvePromise = resolve
      })
    },
    async response(e){
      this.resolvePromise(e.target.textContent === 'oui')
      this.display
      ?
      this.resultMessage = e.target.textContent === 'oui'
        ? this.resultMessage
        : 'Cancelled'
      :''
      this.result = true
    }
  },
}
</script>

<style scoped>
.modal-container{
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

.modal{
  padding: 1rem;
  background: var(--white);
  border-radius: 1rem;
  position: absolute;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

span{
  padding: 1rem;
  font-size: 2rem;
  cursor: pointer;
  border-radius: .5rem;
}

span:hover{
  background: var(--hovercolor);
}

.modal-enter-active {
  animation: bounce-in 0.5s;
}
.modal-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>