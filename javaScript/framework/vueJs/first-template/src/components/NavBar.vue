<template>
    <!-- ***** Header Area Start ***** -->
    <header class="header-area header-sticky">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <nav class="main-nav">
                        <!-- ***** Logo Start ***** -->
                        <a href="index.html" class="logo">
                            <img src="../../public/assets/images/logo.png" alt="">
                        </a>
                        <!-- ***** Logo End ***** -->
                        <!-- ***** Search End ***** -->
                        <div class="search-input">
                        <form id="search" action="#">
                            <input type="text" placeholder="Type Something" id='searchText' name="searchKeyword" onkeypress="handle" />
                            <i class="fa fa-search"></i>
                        </form>
                        </div>
                        <!-- ***** Search End ***** -->
                        <!-- ***** Menu Start ***** -->
                        <ul class="nav">
                            <li><router-link to="/" class="active">Home</router-link></li>
                            <li><router-link to="/browse">Browse</router-link></li>
                            <li><router-link to="/details">Details</router-link></li>
                            <li><router-link to="/streams">Streams</router-link></li>
                            <li><router-link to="/profile">Profile <img src="../../public/assets/images/profile-header.jpg" alt=""></router-link></li>
                        </ul>   
                        <a class='menu-trigger'>
                            <span>Menu</span>
                        </a>
                        <!-- ***** Menu End ***** -->
                    </nav>
                </div>
            </div>
        </div>
    </header>
  <!-- ***** Header Area End ***** -->
</template>

<script>
export default {

}
</script>

<style>

</style>