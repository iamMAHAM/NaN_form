<template>
    <div class="discussion">
        <i class="material-icons">chat_bubble</i>
        <div class="discussion-main">
            <span>Health Chat Bot</span>
            <div class="messages">
                <p class="me">hello</p>
                <p class="you">how are u ?</p>
            </div>
            <div class="bottom">
                <input type="text" placeholder="entrez votre message"/>
                <i class="material-icons">send</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .discussion{
        position: absolute;
        display: flex;
        flex-direction: row;
        right: 3rem;
        bottom: 2.2rem;
    }

    .discussion> .material-icons{
        align-self: flex-end;
        cursor: pointer;
        color: var(--black);
        font-size: 5rem;
    }

    .discussion-main{
        position: relative;
        min-height: 35rem;
        border: 1px solid var(--black);
        text-align: center;
        width: 30rem;
    }

    span{
        padding: 1rem;
        display: block;
        color: var(--white);
        background: var(--black);
        font-size: 2rem;
        width: 100%;
    }

    .bottom{
        justify-content: center;
        display: flex;
        width: 100%;
        position: absolute;
        bottom: 0;
        align-items: center;
        left: 0;
        background: var(--black);
    }

    .bottom .material-icons{
        cursor: pointer;
        border: none;
        border-left: 1px solid var(--black);
        height: 100%;
        font-size: 3rem;
        color: var(--black);
        background: var(--white);
    }

    .bottom input{
        text-align: center;
        border: none;
        outline: none;
        display: block;
        width: calc(100% - 3rem);
        padding: .5rem;
        font-size: 1.7rem;
    }
    .me{
        color: aquamarine;
        text-align: end;
    }

    .you{
        text-align: start;
    }

</style>