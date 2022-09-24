<template>
  <div class="footer">
    <div class="inner-footer">
      <div class="footer-items">
        <h1>Immo Soluce</h1>
        <p>
          La solution aux problèmes immobiliers en Côte d'Ivoire
        </p>
        <img src="@/assets/logo.png">
      </div>
      <div class="footer-items">
        <h3>Nos Agences</h3>
        <div class="border1"></div>
        <ul>
          <a href="#">
            <li>Abidjan</li>
          </a>
          <a href="#">
            <li>Yamoussoukro</li>
          </a>
          <a href="#">
            <li>Korhogo</li>
          </a>
        </ul>
      </div>
      <div class="footer-items">
        <h3>Contactez Nous</h3>
        <div class="border1"></div>
        <ul>
          <li><i class="material-symbols-outlined">location_on</i>Abidjan, Angré 7ème tranche</li>
          <li><i class="material-symbols-outlined">call</i>+2250000000000</li>
          <li><i i class="material-symbols-outlined">mail</i>immosoluce@gmail.com</li>
        </ul>
        <div class="social-media">
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-google-plus-square"></i></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      Copyright &copy; Immo Soluce Team 2022.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
/* FOOTER */
.footer {
	width: 100%;
	background: var(--navcolor);
	display: block;
 }

 .inner-footer {
	 width: 95%;
	 margin: auto;
	 padding: 30px 10px;
	 display: flex;
	 flex-wrap: wrap;
	 box-sizing: border-box;
	 justify-content: center;
 }

.footer-items {
	width: 25%;
	padding: 10px 20px;
	box-sizing: border-box;
	color: #fff;
}

.footer-items p {
	font-size: 16px;
	text-align: justify;
	line-height: 25px;
	color: #fff;
}

.footer-items h1 {
	color: #fff;
}

.footer img{
  height: 10rem;
  width: 10rem;
  margin: 0 auto;
  border-radius: 50%;
}

.border1 {
	height: 3px;
	width: 40px;
	background: var(--hovercolor);
	color: var(--hovercolor);
	background-color: var(--hovercolor);
	border: 0px;
}

ul {
	list-style: none;
	color: #fff;
	font-size: 15px;
	letter-spacing: 0.5px;	
 }

ul a {
	text-decoration: none;
	outline: none;
	color: #fff;
	transition: 0.3s;
}

ul a:hover {
	color: var(--hovercolor);
}

ul li {
	margin: 10px 0;
	height: 25px;
}

li i {
	margin-right: 20px;
}

.social-media {
	width: 100%;
	color: #fff;
	text-align: center;
	font-size: 20px;
}

.social-media a {
	text-decoration: none;
}

.social-media i {
	height: 25px;
	width: 25px;
	margin: 20px 10px;
	padding: 4px;
	color: #fff;
	transition: 0.5s;
}

.social-media i:hover {
	transform: scale(1.5);
}

.footer-bottom {
	padding: 10px;
	background: var(--navcolor);
	color: #fff;
	font-size: 12px;
	text-align: center;
}

/* for tablet mode view */

@media screen and (max-width: 1275px) {
	.footer-items {
		width: 50%;
	}
}

/* for mobile screen view */

@media screen and (max-width: 660px) {
	.footer-items {
		width: 100%;
	}
}

/* you can toggle the media screen view accordingly by changing the (max-width: px) to your convenience */

/* Thanks to Computer Conversations */
</style>