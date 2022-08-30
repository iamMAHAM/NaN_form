<template>
    <!-- <div class="loading" v-if="loaded">Loading ...</div> -->
	<img src="../assets/loading.gif" v-if="loaded" class="loading">
    <div class="cart" v-if="!loaded">
        <div class="cart-items" ref="cardItems">
			<div class="empty-cart" v-if="!loaded && !cartItems.length">
				<span class="material-icons">production_quantity_limits</span>
				<p>Panier vide :(</p>
				<button
					:onclick="()=>{$router.push('/')}"
				>
					Commencez vos Achats
				</button>
			</div>
			<div class="cart-item" v-for="cart in cartItems" :id="cart.id" :key="cart.id">
				<i
					class="material-icons delete"
					:onclick="removeToCart"
				>
					delete
				</i>
				<img src="../assets/loading.gif" v-if="cart.load" class="wait waitd" />
				<img class="item-image" :src=cart.image>
				<div class="infos">
					<span class="green">{{ cart.title }}</span>
					<small class="medoc-desc">{{ cart.description }}</small>
					<input
						type="number"
						min="1"
						max="10"
						v-model="cart.amount"
					>
					<p class="article-price"> <span>{{ cart.price }}</span> FCFA x <span>{{ cart.amount }}</span></p>
				</div>
			</div>
        </div>

        <div class="total-orders">
            <span>TOTAL ORDERS</span>
            <p>{{ total }} FCFA</p>
            <button>order</button>
        </div>
    </div>
</template>

<script>
import { unSaveDoc, getAll } from "@/lib/firestoreLib"

export default {
    name: 'Cart',
	props: ["searchResult", "isSearch", "load"],
    methods: {
        update(){
			let inter = 0
			this.cartItems.map(c=>{
				inter += c.amount * c.price
			})
			this.total = inter.toFixed(2)
        },
		async removeToCart(e){
			const user = JSON.parse(localStorage.getItem("user"))
			const parent = e.target.parentElement
			if (!user){
				this.cartItems = this.cartItems.filter(c => c.id !== parent.id)
				localStorage.setItem("cart", JSON.stringify(this.cartItems))
			} else{
				const matchingCart = this.cartItems.filter(cart=> cart.id === parent.id)[0]
				matchingCart.load = true
				await unSaveDoc(`users/${user.id}/cart`, parent.id)
				this.cartItems = this.cartItems.filter(c => c.id !== parent.id)
				matchingCart.load = false
			}
			this.update()
			this.$root.$forceUpdate()
		}
    },
    data(){
        return {
            total: 0,
            cartItems: [],
            loaded: true,
        }
    },
    async mounted(){
		const user = JSON.parse(localStorage.getItem("user"))
		if (user){
			await getAll(`users/${user.id}/cart`, carts=> {
				this.cartItems = carts
			})
		} else{ 
			this.cartItems = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : []
		}
		this.loaded = false
		setTimeout(()=>{
			this.update()
		}, 200)
    },
	updated(){
		this.update()
	}
}
</script>

<style scoped>

	.waitd{
		height: 2.4rem;
	}
    div.cart{
        position: relative;
        padding: 3rem;
        display: flex;
        flex-direction: row;
    }

    div.cart-items{
        margin: auto;
        display: flex;
        flex-direction: column;
    }

    div.cart-item{
		margin: 1rem;
		border-radius: 1rem;
		background: var(--white);
        position: relative;
        padding: 2rem;
        justify-content: space-around;
        display: flex;
        flex-direction: row;
    }


    .item-image{
        width: 30%;
    }

    div.infos input[type="number"]{
        align-self: center;
        width: 35%;
    }

    div.total-orders,
    div.infos{
        color: var(--white);
        background-color: var(--black);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    div.infos{
        padding: 1rem;
        width: 25rem;
    }

    div.infos *{
        margin: .3rem;
    }
    div.total-orders{
        margin: auto;
        height: 25rem;
        border-radius: .5rem;
        width: 25rem;
    }

    div.total-orders span{
        font-size: 2.2rem;
        padding: .3rem;
        border-bottom: .2rem solid var(--white);
    }

    div.total-orders button{
        cursor: pointer;
        background-color: var(--white);
        color: var(--black);
        margin: .3rem auto;
        font-size: 2.2rem;
        border-radius: .5rem;
        width: 30%;
    }

	.waitd,
    .delete{
        cursor: pointer;
        color: red;
        position: absolute;
        top: 1rem;
        left: 1rem; 
    }

    .delete:hover{
        background-color: var(--black);
    }

    .green{
        color: var(--green)
    }

	.loading{
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
	}

	.empty-cart{
		font-size: 2.2rem;
		text-align: center;
	}

	.empty-cart .material-icons{
		color: var(--black);
		font-size: 10rem;
	}

	.empty-cart button{
		margin: 2rem;
		cursor: pointer;
		border-radius: .5rem;
		color: var(--white);
		background-color: var(--black);
		padding: 1rem;
	}
</style>