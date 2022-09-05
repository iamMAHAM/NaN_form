<template>
    <div id="header">
        <div class="logo">
            <a href="#">
                <i class="material-symbols-outlined">home</i>
                Immo Soluce
            </a>
        </div>
        <div class="search"> 
                <input name="q" placeholder="recherche..." type="search" class="search-i">
                <i class="material-symbols-outlined">search</i>
        </div>
        <nav>
            <ul>
                <li>
                    <a href="">
                        <i class="material-symbols-outlined">person</i>
                        Connexion
                    </a>
                </li>
                <li>
                    <a href="">
                        <i class="material-symbols-outlined">favorite</i>
                        Favoris
                    </a>
                </li>
                <li>
                    <a href="">
                        <i class="material-symbols-outlined">mail</i>
                        Messages
                    </a>  
                </li>
                <li>
                    <a href="">
                        <i class="material-symbols-outlined">publish</i>
                        Publier
                    </a>
                </li>
                <li class="dropdown">
                    <a href="">
                        <i class="material-symbols-outlined">contact_support</i>
                        Support
                    </a>     
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style>
a{
    text-decoration:none;
    color:#fff
}
#header{
    display: flex;
    align-items: center;
    justify-content: space-around;
    background:#1E262D;
    width:100%;
    position:relative
}
 #header:after{
    content:"";
    clear:both;
    display:block
}
.search{
    border-radius: 1.5rem;
    width: 25%;
    height: max-content;
    background: var(--white);
    display: flex;
    float:left;
    align-self: center;
}
.search-i{
    outline: none;
    padding: 1.5rem;
    width: calc(100% - 2.5rem);
    border: none;
    border-radius: 2rem
}

.search i{
    border-left: .1rem solid var(--navcolor);
    font-size: 3rem;
    margin: auto 0;
    cursor: pointer;
}
.logo{
    padding: 2.6rem 0  2.6rem
}
.logo a{
    font-size: 2.5rem;
    display:block;
    padding:0 0 0  2rem
}
nav{
}
nav>ul{
    float:left;
    position:relative
}
nav li{
    list-style:none;
    float:left
}
nav .dropdown{
    position:relative
}
nav li a{
    float:left;
    padding: 2rem
}
nav li a:hover{
    background:#2C3E50
}
nav li ul{
    display:none
}
nav li:hover ul{
    display:inline
}

#menu-icon{
    position:absolute;
    right:0;
    top:50%;
    margin-top:-12px;
    margin-right:3rem;
    display:none
}
 #menu-icon span{
    border:2px solid #fff;
    width:3rem;
    margin-bottom:5px;
    display:block;
    -webkit-transition:all .2s;
    transition:all .1s
}

@media only screen and (max-width: 1346px){
    nav li a {
        padding: 1.5rem;
    }
}

@media only screen and (min-width: 960px) {
     nav{
        display:block!important
    }
}

@media only screen and (min-width: 1127px) {
     nav{
        display:block!important
    }
}
 /* @media only screen and (max-width: 959px) {
    nav{
        display:none;
        width:100%;
        clear:both;
        float:none;
        max-height:400px;
        overflow-y:scroll
    }
    #menu-icon{
        display:inline;
        top:45px;
        cursor:pointer
    }
    #menu-icon.active .first{
        transform:rotate(45deg);
        -webkit-transform:rotate(45deg);
        margin-top:1rem
    }
    #menu-icon.active .second{
        transform:rotate(135deg);
        -webkit-transform:rotate(135deg);
        position:relative;
        top:-9px;
    }
    #menu-icon.active .third{
        display:none
    }
    .search{
        float:none
    }
    .search input{
        width:100%
    }
    nav{
        padding:1rem
    }
    nav ul{
        float:none
    }
    nav li{
        float:none
    }
    nav ul li a{
        float:none;
        padding:8px;
        display:block
    }
    #header nav ul ul{
        display:block;
        position:static;
        background:none;
        border:none;
        padding:0
    }
    #header nav a{
        color:#fff;
        padding:8px
    }
    #header nav a:hover{
        background:#fff;
        color:#333;
        border-radius: .3rem
    }
    #header nav ul li li a:before{
        content:"- "
    }
    .mega-col{
        width:100%
    }
} */


</style>