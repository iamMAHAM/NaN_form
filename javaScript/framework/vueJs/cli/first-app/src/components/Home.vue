<template>
    <div class="container">
        <div class="blog-card">
            <a class="blog-title" href>Title</a>
            <div class="content-overview">this is a small content overview</div>
            <small class="pub-date">Date : 01/01/2020</small>
            <div class="author">Author : iamMAHAM</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeVue"
}
</script>

<style>
    .blog-card{
        margin: 10px;
        border: .5px solid black;
        transition: box-shadow .5s;
        padding: 10px;
        text-align: center;
        width: 400px;
        height: 100px;
    }

    .blog-card:hover{
        box-shadow: -9px 13px 5px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: -9px 13px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -9px 13px 5px 0px rgba(0,0,0,0.75);
    }

    .blog-title{
        text-transform: uppercase;
        cursor: pointer;
        font-size: 20px;
        color: blue;
    }
    .content-overview{
        font-size: 18px;
    }
</style>