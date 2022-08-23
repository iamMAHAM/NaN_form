<template>
    <div class="cart">
    <div class="cart-items">
        <div class="cart-item">
        <img class="item-image" src="/assets/med.png">
        <div class="infos">
            <span class="green">DOLIPRANE</span>
            <small class="medoc-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
            <input type="number" value="1">
            <span class="article-price">0</span>
        </div>
        </div>
    </div>

    <div class="total-orders">
        <span>TOTAL ORDERS</span>
        <p>100000 €</p>
        <button>order</button>
    </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
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
        border-bottom: .1rem solid var(--white);
    }

    div.total-orders button{
        margin: 0 auto;
        width: 30%;
    }
</style>