<template>
  <Transition name="modal">
    <div class="modal-container" v-if="isVisible">
      <div class="modal">
        <h2 class="title" align="center" style="padding: 1rem">
          <i class="material-symbols-outlined" v-if="type === 'info'" style="color:lightblue">info</i>
          <i class="material-symbols-outlined" v-if="type === 'warning'" style="color: lightyellow">warning</i>
          <i class="material-symbols-outlined" v-if="type === 'confirm'" style="color: var(--greenfun)">check</i>
          <slot></slot>
        </h2>
        <div class="content" align="center" style="padding: 1rem; color: var(--navcolor);">
          <p v-if="!result">{{ message }}</p>
          <p v-if="result"> {{ resultMessage }}</p>
        </div>
        <div class="bottom-modal" align="center">
          <div
            v-if="!result && type ==='confirm'"
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
  props: {
    type: {
      type: String,
      required: true,
      default: 'confirm'
    },
    message:{
      type: String,
      required: false,
      default: 'Voulez vous continuer ?'
    },
    display:{
      type: Boolean,
      required: false,
      default: true
    }
  },
  data(){
    return {
      isVisible: false,
      resolvePromise: null,
      result: false,
      resultMessage: '',
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
    show(){
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
        ? 'Success' : 'Cancelled'
      : ''
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