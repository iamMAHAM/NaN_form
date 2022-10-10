<template>
	<div class="container">
		<header class="header">
		</header>
		<div class="clear-backend">
			<div class="avatar ease">
				<div>
					<a href="#">
						<img class="ease" :src="auth?.currentUser?.photoURL">
					</a>
				</div>
			</div>

			<!-- tab-menu -->
      
			<input type="radio" class="tab-1" name="tab" checked="checked">
			<span>Home</span><i class="material-symbols-outlined">home</i>

			<input type="radio" class="tab-2" name="tab">
			<span>Users</span><i class="material-symbols-outlined">group</i>

      <input type="radio" class="tab-6" name="tab">
			<span>Ads</span><i class="material-symbols-outlined">ads_click</i>

			<input type="radio" class="tab-3" name="tab">
			<span>Pending <span class="alerte">{{ cards.length }}</span></span><i class="material-symbols-outlined">pending</i>
		
      <input type="radio" class="tab-4" name="tab" v-if="isOwner">
			<span v-if="isOwner">Company KYC <span class="alerte">{{ companies.length }}</span></span><i class="material-symbols-outlined">report</i>

      <input type="radio" class="tab-5" name="tab">
			<span>KYC <span class="alerte">{{ profiles.length }}</span></span><i class="material-symbols-outlined">badge</i>



			<!-- tab-top-bar -->
			<div class="top-bar">
				<ul>
          <a style="display: inline-block; pointer-events: none;">
            <div>{{'Admin : ' + auth?.currentUser?.displayName }}</div>
          </a>
					<li @click="signOutUser().then($router.push('/'))" >
						<a href="" title="Log Out" >
							<i class="material-symbols-outlined">logout</i>
						</a>
					</li>
					<li @click="$router.push('/messages')">
						<a href="#" title="Messages">
							<i class="material-symbols-outlined">message</i>
            </a>
					</li>
					<li @click="$router.push('/profile')">
						<a href="#" title="Edit">
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
                Total users
              </div>
              <div class="iright">{{ users.length }}</div>
            </div>
            <div class="item">
              <div class="ileft">
                Total Ads
              </div>
              <div class="iright">{{ totals_ads.length }}</div>
            </div>
            <div class="item">
              <div class="ileft">
                Solded Ads
              </div>
              <div class="iright">{{ totals_ads.filter(a=>a.status === 'solded').length }}</div>
            </div>
					</div>
          <div class="bottom">
            <Stats
              v-if="mounted"
              :data="data"
            />
          </div>

				</section>
				<section class="users">
          <Users @userUpdated="updatedUsers" :isOwner="isOwner"/>
				</section>
				<section class="pending">
          <CardContainer
            :load="load"
            :cards="cards"
            :message="'Aucune annonce en attente'"
          />
				</section>
				<section class="report" style="background: var(--hovercolor)">
          <div
            v-if="!companies.length"
            style="
              font-size: 3rem;
              text-align: center;
              color: var(--white);
            "
          >
            Aucune vérification en attente
          </div>
          <ProfileCard
            v-else
            v-for="company in companies"
            :key="company.id"
            :userProfile="company"
          />
				</section>
				<section class="kyc" style="background: var(--hovercolor)">
          <div
            v-if="!profiles.length"
            style="
              font-size: 3rem;
              text-align: center;
              color: var(--white);
            "
          >
            Aucune vérification en attente
          </div>
          <ProfileCard
            v-else
            v-for="profile in profiles"
            :key="profile.id"
            :userProfile="profile"
          />

				</section>
				<section class="adsD" style="overflow: scroll">
          <Ads
            :ads="ads"
            :load="load"
            @filterAds="filter"
          />
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import Stats from './Stats.vue';
import Users from '@/components/partials/user/Users.vue';
import CardContainer from '@/components/CardContainer.vue';
import ProfileCard from '@/components/partials/user/ProfileCard.vue';
import { onValue, ref as dbref } from '@firebase/database';
import { db, rtdb,  } from '@/lib/firebaseConfig';
import { auth, findOne, signOutUser } from '@/lib/firestoreLib';
import { collection, onSnapshot } from '@firebase/firestore';
import Ads from '../company/Ads.vue';

const compare = ( a, b )=>{
  if ( a.publishedAt > b.publishedAt ){
    return -1;
  }
  if ( a.publishedAt < b.publishedAt ){
    return 1;
  }
  return 0;
}

export default {
  name: 'DashBoard',
  components:{
    Users,
    Stats,
    CardContainer,
    ProfileCard,
    Ads
  },
  methods:{
    updatedUsers(users){
      this.users = [ ...users]
      this.getDataArray(this.users, 'registratedAt', 'users')
    },
    getDataArray(array=[], property, type){
      const adsData = []
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      months.map(m=>{
        adsData.push(array.filter(t => t[property]?.toDate()?.toLocaleString('en', { month: 'long' }) === m).length)
      })
      this.data[type] = adsData
    },
    filter([filter, search]){
      if (!filter) this.ads = [...this.totals_ads]
      this.ads = this.totals_ads.filter(u=>
      u.status?.includes(filter)
      && u.title?.toLowerCase().includes(search.toLowerCase()))
    }
  },
  data(){
    return {
      load: true,
      cards: [],
      profiles: [],
      auth: auth,
      users: [],
      totals_ads: [],
      companies: [],
      data:{},
      ads: [],
      mounted:false,
      isOwner:false,
      signOutUser: signOutUser
    }
  },
  beforeCreate(){
    const uid = this.$route.query.uid
    if (!uid){
      this.$router.push('/404')
      return
    }
    findOne("users", uid)
    .then(user=>{
      this.isOwner = user.owner
      user.role === "admin" ? '' : this.$router.push("/404")
    })
  },
  mounted(){
    const wads = dbref(rtdb, `waitingAds`);
    onValue(wads, (snapshot)=>{
      const all = snapshot.val()
      const inter = []
      if (all){
        for (const [k, v] of Object.entries(all)){
          v.tempId = k
          inter.push(v)
        }
    }
    this.cards = inter
    this.load = false
    })
    onSnapshot(collection(db, "admin/vAJXH3iQabt9AjGLAaej/verification"), (snap)=>{
      this.profiles = [...snap.docs.map(s=>s.data())].filter(p => !p.isCompany)
      this.companies = [...snap.docs.map(s=>s.data())].filter(p => p.isCompany)
    })

    onSnapshot(collection(db, "totals_ads"), (snap)=>{
      this.totals_ads = [...snap.docs.map(s=>s.data()).sort(compare)]
      this.ads = [...this.totals_ads.filter(s => s.status !== 'solded'), ...this.totals_ads.filter(s => s.status === 'solded')]
      this.getDataArray(this.totals_ads, 'publishedAt', 'totalAds')
      const solded = this.totals_ads.filter(a => a.status === "solded")
      this.getDataArray(solded, 'publishedAt', 'soldedAds')
      this.mounted = true
    })
  },
  computed: {
    usersLength(){
      return this.users.filter(u => u.role === "acheteur").length
    },
    sellerLength(){
      return this.users.filter(u => u.role === "vendeur").length
    },
    adminLength(){
      return this.users.filter(u => u.role === "admin").length
    }
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
	max-width: 90vw;
  height: 100vh;
	margin: 5rem auto;
}

/* Backend Panel Start */

.clear-backend {
  border: .1rem solid var(--white);
	background: var(--white);
	width: 100%;
	height: 80vh;
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

/* .avatar div img:hover  {
	transform: rotate(360deg);
} */

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
}

.tab-content section {
	position: relative;
	width: 100%;
	height: 100%;
	display: none;
}

.clear-backend > input.tab-1:checked ~ .tab-content .home {
	display: block;
}

.clear-backend > input.tab-2:checked ~ .tab-content .users {
  overflow: scroll;
	display: block;
}

.clear-backend > input.tab-3:checked ~ .tab-content .pending {
  background: var(--hovercolor);
	display: block;
}

.clear-backend > input.tab-4:checked ~ .tab-content .report {
	display: block;
}

.clear-backend > input.tab-5:checked ~ .tab-content .kyc {
	display: block;
}

.clear-backend > input.tab-6:checked ~ .tab-content .adsD {
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
  margin: .5rem;
	padding: 2rem;
	display: flex;
	justify-content: space-between;
	width: 28%;
	background: var(--hovercolor);
	color: var(--white);
}

.bottom{
  height: calc(100% - 60px);
}

.tab-content .home .bottom > div{
  height: calc(100% - 62px);
}

span.alerte{
  float: right;
  transform: translateX(-20px);
  color: var(--red);
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