<template>
	<div class="container">
		<header class="header">
		</header>
		<div class="clear-backend">
			<div class="avatar ease">
				<div>
					<a href="#">
						<img class="ease" src="https://images.unsplash.com/photo-1661956601031-4cf09efadfce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2976&q=80" alt="">
					</a>
          <p>Abdul Kabore</p>
          <p>Admin</p>
				</div>
			</div>

			<!-- tab-menu -->
			<input type="radio" class="tab-1" name="tab">
			<span>Home</span><i class="material-symbols-outlined">home</i>

			<input type="radio" class="tab-2" name="tab">
			<span>Users</span><i class="material-symbols-outlined">group</i>

			<input type="radio" class="tab-3" name="tab" checked="checked">
			<span>Pending</span><i class="material-symbols-outlined">pending</i>
			
      <input type="radio" class="tab-4" name="tab">
			<span>Reports</span><i class="material-symbols-outlined">report</i>

			<input type="radio" class="tab-5" name="tab">
			<span>Settings</span><i class="material-symbols-outlined">settings</i>


			<!-- tab-top-bar -->
			<div class="top-bar">
				<ul>
					<li>
						<a href="" title="Log Out">
							<i class="material-symbols-outlined">logout</i>
						</a>
					</li>
					<li>
						<a href="" title="Messages">
							<i class="material-symbols-outlined">message</i>
            </a>
					</li>
					<li>
						<a href="" title="Edit">
							<i class="material-symbols-outlined">edit_square</i>
						</a>
					</li>
				</ul>
			</div>

			<!-- tab-content -->
			<div class="tab-content">
				<section class="home">
					<div class="home-top">
            <div class="item">
              <div class="ileft">
                Total Users
              </div>
              <div class="iright">30</div>
            </div>
            <div class="item">
              <div class="ileft">
                Partners
              </div>
              <div class="iright">30</div>
            </div>
            <div class="item">
              <div class="ileft">
                Total ads
              </div>
              <div class="iright">30</div>
            </div>
					</div>
          <div class="bottom">
            <Stats
              :width="1000"
              :height="600"
            />
          </div>

				</section>
				<section class="users">
          <Users />
				</section>
				<section class="pending">
          <CardContainer
            :load="load"
            :cards="cards"
            :message="'Aucune annonce en attente'"
          />
				</section>
				<section class="report">
				<!-- // report -->
				</section>
				<section class="settings">
				<!-- settings -->
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import Stats from './Stats.vue';
import Users from '@/components/partials/user/Users.vue';
import CardContainer from '@/components/CardContainer.vue';
import { onValue, ref as dbref } from '@firebase/database';
import { rtdb,  } from '@/lib/firebaseConfig';
export default {
  name: 'DashBoard',
  components:{
    Users,
    Stats,
    CardContainer
  },
  data(){
    return {
      load: true,
      cards: [],
    }
  },
  mounted(){
    const wads = dbref(rtdb, `waitingAds`);
    onValue(wads, (snapshot)=>{
      const all = snapshot.val()
      console.log(all)
      all ? this.cards = Object.values(all) : ''
      this.load = false
    })
  }
}
</script>

<style scoped>
  a {
	color: var(--navcolor);
	text-decoration: none;
}
p{
  color: var(--hovercolor);
  text-align: center;
}

</style>

<style>
.tab-content .pending .card-container{
  background: var(--hovercolor);
  margin: 0 auto !important;
  width: calc(90%);
  /* height: 100%; */
}

.tab-content .pending .card-container .box{
  margin: .5rem;
  width: 32%;
  height: max-content;
}
li{
  list-style-type: none;
}

.fl {
	float: left
}

.fr {
	float: right
}

.ease {
	-webkit-transition: all .5s;
  -moz-transition: all .5s;
  -ms-transition: all .5s;
  -o-transition: all .5s;
  transition: all .5s;
}

.container {
	width: 100%;
	max-width: 1200px;
	margin: 5rem auto;
}

/* Backend Panel Start */

.clear-backend {
  border: .1rem solid var(--white);
	background: var(--white);
	width: 100%;
	height: 800px;
	position: relative;
}

.avatar {
	background: #f0f0f0;
	width: 200px;
	height: 200px;
}

.avatar div {
	width: 150px;
	height: 150px;
	overflow: hidden;
	position: relative;
	top: 25px;
	left: 25px;
}

.avatar div img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

.avatar div img:hover  {
	transform: rotate(360deg);
}

.clear-backend > input {
	position: absolute;
	filter: alpha(opacity=0);
	opacity: 0;
}

.clear-backend > input:hover {
	cursor: pointer;
}

.clear-backend > input:hover + span,
.clear-backend > input:checked + span {
	background: var(--white);
	color: #1ABC9C;
}
.clear-backend > input:checked + span + i {
	color: #1ABC9C;
}

.clear-backend > i {
	position: absolute;
	margin-top: -40px;
	padding: 0 20px;
	font-size: 20px;
}

.clear-backend > span,
.clear-backend > i {
	-webkit-transition: all .5s;
	   -moz-transition: all .5s;
		 -o-transition: all .5s;
			transition: all .5s;
}

.clear-backend > input,
.clear-backend > span {
	background: #f0f0f0;
	display: block;
	width: 200px;
	height: 60px;
	line-height: 60px;
	text-align: center;
	z-index: 9;
}

.top-bar {
	background: #f0f0f0;
	color: #000;
	position: absolute;
	top: 0;
	right: 0;
	width: calc(100% - 200px);
	height: 60px;
	line-height: 60px;
	font-size: 20px;
	z-index: 9;
}

.top-bar li {
	float: right;
}

.top-bar a {
	display: block;
	padding: 0 20px;
	-webkit-transition: all .5s;
	   -moz-transition: all .5s;
		 -o-transition: all .5s;
			transition: all .5s;
}

.top-bar a:hover {
	color: var(--greenfun);
}

.top-bar li:hover {
	background: var(--white);
}

.tab-content {
	position: absolute;
	top: 0;
	right: 0;
	width: calc(100% - 200px);
	height: 100%;
	padding-top: 60px;
	overflow: hidden;
}

.tab-content section {
	position: relative;
	width: 100%;
	height: 100%;
	display: none;
  overflow: scroll;
}

.clear-backend > input.tab-1:checked ~ .tab-content .home {
	display: block;
}

.clear-backend > input.tab-2:checked ~ .tab-content .users {
	display: block;
}

.clear-backend > input.tab-3:checked ~ .tab-content .pending {
  background: var(--hovercolor);
	display: block;
}

.clear-backend > input.tab-4:checked ~ .tab-content .report {
	display: block;
}

.clear-backend > input.tab-4:checked ~ .tab-content .settings {
	display: block;
}

.tab-content .home{
  align-items: center;
}
.tab-content .home-top{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.tab-content .item{
	padding: 2rem;
	display: flex;
	justify-content: space-between;
	width: 28%;
	background: var(--hovercolor);
	color: var(--white);
}

.tab-content .home .bottom > div{
  height: 50%;
}

/* Responsive */
@media only screen and (max-width: 641px) {
	.avatar, 
	.clear-backend > input,
	.clear-backend > span {
		width: 60px;
		height: 60px;
	}
	.clear-backend > span {
		filter: alpha(opacity=0);
		opacity: 0;
	}
	.avatar div {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		top: 5px;
		left: 5px;
	}
	.top-bar,
	.tab-content {
	width: calc(100% - 60px);
	}
}
</style>