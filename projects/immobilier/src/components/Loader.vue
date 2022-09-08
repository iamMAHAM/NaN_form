<template>
    <div class="wrapper">
        <span class="dot"></span>
        <div class="dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.wrapper {
    width: 14.2rem;
    height: 1.6rem;
    filter: contrast(20);
}

.dot {
    z-index: 5;
    position: absolute;
    width: 1.6rem;
    height: 1.6rem;
    top: 0;
    left: .5rem;
    background: var(--navcolor);
    border-radius: 50%;
    transform: translateX(0);
    animation: dot 1s infinite;
}

.dots {
    filter: blur(.01rem);
    z-index: 3;
    transform: translateX(0);
    margin-left: 3.1rem;
    animation: dots 1s infinite;
}

.dots span {
    display: block;
    float: left;
    width: 1.6rem;
    height: 1.6rem;
    margin-left: 1.6rem;
    background: var(--navcolor);
    border-radius: 50%;
}

@keyframes dot {
    50% {
        transform: translateX(96px);
    }
}

@keyframes dots {
    50% {
        transform: translateX(-31px);
    }
}
</style>