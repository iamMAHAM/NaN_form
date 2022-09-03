import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '@/views/Detail.vue'
import Cart from "@/views/Cart.vue"
import NotFound from "@/views/404.vue"
import Profile from "@/views/Profile.vue"
import DashBoard from "@/components/admin/DashBoard"
import Deleted from "@/views/Deleted"

const routes = [
	{
		path: '/',
		name: 'home',
		redirect: '/home'
	},
	{
		path: '/deleted',
		name: 'deleted',
		component: Deleted
	},
	{
		path: '/cart',
		name: 'cart',
		component: Cart
	},
	{
		path: '/detail/:doc/:id',
		name: 'detail',
		component: Detail
	},
	{
	  path: '/:route',
	  name: 'root',
	  component: Home,
	  props: true
	},
	{
	  path: '/profile',
	  name: 'profile',
	  component: Profile
	},
	{
		path: '/404',
		name: 'NotFound',
		component: NotFound
	},
	{
		path: '/admin/dashboard',
		name: 'Dashboard',
		component: DashBoard
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		redirect: '/404'
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
