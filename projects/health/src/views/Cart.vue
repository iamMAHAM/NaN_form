<template>
    <!-- <div class="loading" v-if="loaded">Loading ...</div> -->
	<img src="../assets/loading.gif" v-if="loaded" class="loading">
    <div class="cart" v-if="!loaded">
        <div class="cart-items" ref="cardItems">
            <!-- <div class="cart-item" id="5.83">
                 <i class="material-icons delete">delete</i>
                <img class="item-image" src="../assets/med.png">
                <div class="infos">
                    <span class="green">DOLIPRANE</span>
                    <small class="medoc-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        :onchange="updateTotal"
                    >
                    <p class="article-price"> <span>{{ price }}</span> € * <span>{{ nb }}</span></p>
                </div>
            </div> -->
        <div class="cart-item" v-for="cart in cartItems" :id="cart.id" :key="cart.id">
		
            <i
                class="material-icons delete"
                :onclick="removeToCart"
            >
                delete
            </i>
            <img class="item-image" :src=cart.image>
            <div class="infos">
                <span class="green">{{ cart.title }}</span>
                <small class="medoc-desc">{{ cart.description }}</small>
                <input
                    type="number"
                    min="1"
                    max="10"
					:value="cart.amount"
                    :onchange="updateTotal"
                >
                <p class="article-price"> <span>{{ cart.price }}</span> € * <span>{{ cart.amount }}</span></p>
        </div>
        </div>
        </div>

        <div class="total-orders">
            <span>TOTAL ORDERS</span>
            <p>{{ total }} €</p>
            <button>order</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { unSaveDoc, getAll } from "@/lib/firestoreLib"

export default {
    name: 'Cart',
    methods: {
        update(){
            const all = document.querySelectorAll(".article-price")
            this.total = 0
            Array.from(all).forEach(cmd=>{
                this.total += eval(cmd.textContent.replace("€", ''))
            })
            this.total = this.total.toFixed(2)
        },
        updateTotal(e){
            const target = e.target
            console.log(target.nextElementSibling.children[1].textContent)
            target.nextElementSibling.children[1].textContent = target.value
            this.update()
        },
		removeToCart(e){
			const id = JSON.parse(localStorage.getItem("user")).id
			const parent = e.target.parentElement
			unSaveDoc(`users/${id}/cart`, parent.id)
			parent.remove()
			this.update()
		}
    },
    data(){
        return {
            total: 0,
            cartItems: [],
            loaded: true
        }
    },
    mounted(){
        getAll("users/jhzGn5dE2kNLZOT4lUu2/cart", carts=> {
            this.cartItems = carts
            this.loaded = false
            setTimeout(()=>{
                this.update()
            }, 2000)
        })
    }
}
</script>

<style scoped>
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
        position: relative;
        padding: 2rem;
        justify-content: space-around;
        border-bottom: .1rem solid var(--black);
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
</style>