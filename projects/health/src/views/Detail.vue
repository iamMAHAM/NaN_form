<template>
	<img src="../assets/loading.gif" v-if="isLoading" class="loading" />
    <div class="detail" v-if="!isLoading" :id="data.id" ref="product">
        <div class="left">
          <img :src="data.image" class="img">
        </div>

        <div class="right">
          <div class="top">
            <p class="green"> {{ data.title }}</p>
          </div>

          <div class="center">
            <p>{{ data.description }}</p>
            <div class="row">
                <p class="bold">Pour qui : </p>
                <p>Adulte</p>
            </div>

            <div class="row">
                <p class="bold">Femme Enceinte : </p>
                <p>Non autorisé</p>
            </div>

            <div class="row">
                <p class="bold">Allaitement : </p>
                <p>Non autorisé</p>
            </div>

            <div class="row">
                <p class="bold">Forme : </p>
                <p>Comprimés</p>
            </div>
          </div>

          <div class="bottom-d">
            <div class="price">
              <input
                type="number"
                min="1"
                max="10"
                id="number"
                step="1"
                v-model="amount"
                >
            </div>
            <span class="rt-price">{{ data.price }} FCFA</span>
            <button
				:onclick="addToCart"
			>
				add to cart
			</button>
          </div>
        </div>
    </div>
</template>

<script>
import { getOne, saveDoc } from '@/lib/firestoreLib'

export default {
    name: 'Detail',
	data(){
		return {
			data: {
			},
			isLoading: true,
			amount: 1,
		}
	},
	methods:{
		addToCart(){
			const user = JSON.parse(localStorage.getItem("user"))
			if (!user){
				// display login bar
				return
			}
			console.log(user)
			this.data.amount = this.amount
			saveDoc(`users/${user.id}/cart`, this.data, (res)=>{
				this.$root.$forceUpdate()
			})
		}
	},

	mounted(){
		const route = this.$route.params
		console.log(route)
		console.log(`data/${route.doc}`)
		getOne(`data/Ho21xA8W3774097vSXhU/${route.doc}`, route.id, (data)=>{
			this.data = data
			this.isLoading = false
		})
	}
}

</script>

<style scoped>
    .detail{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: auto;
        display: flex;
        flex-direction: row;
    }

    .top,
    .center,
    .right{
        text-align: justify;
        display: flex;
        flex-direction: column;
    }

    .img{
        height: 35rem;
    }
    .right{
        color: var(--white);
        border: .1rem solid var(--green);
        background-color: var(--black);
        width: 45%;
        padding: 2rem;
    }

    .bottom-d{
        justify-content: space-between;
        padding: 2rem;
        display: flex;
        flex-direction: row;
    }

    .top{
        font-size: 3rem;
        border: none;
        border-bottom: .2rem solid var(--white);
    }

    .center{
        border: none;
        border-bottom: .2rem solid var(--white);
    }

    p.bold{
        font-weight: bold;
    }

    p{
        padding: 1rem;
    }

    .green{
        color: var(--green);
    }

    button{
        padding: .5rem;
        border-radius: .8rem;
        color: var(--black);
        font-size: 2rem;
        background-color: var(--white);
        cursor: pointer;
    }

    .price,
    .row{
        display: flex;
        flex-direction: row;
    }

    .price{
        justify-content: space-between;
    }

    #number{
        margin-right: .5rem;
        height: 2.5rem;
        width: 5rem;
    }

    .rt-price{
        display: flex;
        margin-top: .5rem;
    }

	.loading{
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
	}
</style>