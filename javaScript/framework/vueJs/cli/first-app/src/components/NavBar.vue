<template>
    <nav class="navbar">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/800px-Google_Photos_icon_%282020%29.svg.png" alt="" class="logo">
        <ul class="nav">
            <li class="nav-menu">
                <a href="youtube.com">Home</a>
            </li>
            <li class="nav-menu">
                <a href="youtube.com">Create Atricle</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "NavBar"
}

</script>

<style>
    .navbar{
        background-color: #b6b1b1;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .nav{
        display: flex;
        flex-direction: row;
    }

    .logo{
        margin: auto 0;
        width: 60px;
        height: 60px;
    }

    .nav-menu{
        padding: 10px;
        background-color: white;
        list-style-type: none;
        margin: 5px;
    }
    a{
        color: #1d1d1d;
        text-decoration: none;
    }

    .nav-menu:hover{
        background-color: aquamarine;
    }
</style>