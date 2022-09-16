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
			<input type="radio" class="tab-1" name="tab" checked="checked">
			<span>Home</span><i class="material-symbols-outlined">home</i>

			<input type="radio" class="tab-3" name="tab">
			<span>Users</span><i class="material-symbols-outlined">group</i>

			<input type="radio" class="tab-4" name="tab">
			<span>Pending</span><i class="material-symbols-outlined">pending</i>
			
      <input type="radio" class="tab-2" name="tab">
			<span>Reports</span><i class="material-symbols-outlined">report</i>

			<input type="radio" class="tab-10" name="tab">
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
          <!-- //all users here -->
        </section>
        <section class="user">
          <!-- //all users here -->
        </section>
        <section class="pending">
          <!-- //all users here -->
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
export default {
  name: 'DashBoard'
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
	background: #fff;
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
	height: auto;
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
	background: #fff;
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
	color: #1ABC9C;
}

.top-bar li:hover {
	background: #fff;
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
	position: absolute;
	width: 100%;
	height: 100%;
	padding: 20px;
	display: none;
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