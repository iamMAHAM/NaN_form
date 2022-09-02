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
            <span class="rt-price" ref="price">{{ data.price }} FCFA</span>
			<img src="../assets/loading.gif" class="wait" v-if="wait">
            <button
				v-if="!wait"
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
	props: ["searchResult", "isSearch", "load"],
	data(){
		return {
			data: {
			},
			isLoading: true,
			amount: 1,
			wait: false,
			price: 0
		}
	},
	methods:{
		async addToCart(){
			this.wait = true
			const user = JSON.parse(localStorage.getItem("user"))
			this.data.amount = this.amount
			if (!user){
				const cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : []
				cart.push(this.data)
				localStorage.setItem("cart", JSON.stringify(cart))
			} else {
				await saveDoc(`users/${user.id}/cart`, this.data)
			}
			this.$root.$forceUpdate()
			this.wait = false
		}
	},
	updated(){
		const price  = this.$refs.price
		this.price = this.data.price
		price.textContent = (this.amount * this.price).toFixed(2) + ' FCFA'
	},
	mounted(){
		const route = this.$route.params
		const user = JSON.parse(localStorage.getItem("user"))
		let fullPath = `data/Ho21xA8W3774097vSXhU/${route.doc}`
		if (route.doc === "favorites"){
			fullPath = `users/${user.id}/favorites`
		}
		getOne(fullPath, route.id, (data)=>{
			this.data = data
			this.isLoading = false
		})
	}
}

</script>

<style>
	.wait{
		width: 2.5rem;
	}
</style>
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
		justify-content: center;
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
        background-color: var(--black);
        width: 45%;
        padding: 2rem;
    }

	.left{
		background: var(--white);
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