<template>
    <div class="detail">
        <div class="left">
          <img src="https://www.pharma-gdd.com/media/cache/resolve/product_show/daflon-500-mg-120-comprimes-face.jpg" class="img">
        </div>

        <div class="right">
          <div class="top">
            <p class="green">DAFLON</p>
          </div>

          <div class="center">
            <p>Jambes lourdes, troubles hémorroidaires</p>
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
                v-model="nb"
                :onchange="updatePrice"
                >
            </div>
            <span class="rt-price">{{ total }} €</span>
            <button>add to cart</button>
          </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { getOne, getAll, signUp, signIn } from "@/lib/firestoreLib"

export default {
    name: 'Detail',
	methods:{
		addToCart(e){
			
		}
	},
    setup(){
        let ab = {
            state: "in stock",
            title: "",
            image: "https://www.pharma-gdd.com/media/cache/resolve/product_thumbnail/masque-tissu-pliant-logo.jpg",
            description: "Anti projections",
            price: "0,90 €"
        }
        // postData(ab)
        let price = 5
        let nb = ref(1)
        let total = ref(5)

        const updatePrice = ()=>{
            total.value = price * nb.value
        }

        return {
            total,
            nb,
            updatePrice
        }
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
</style>