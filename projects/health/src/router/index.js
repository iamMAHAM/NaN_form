import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '@/views/Detail.vue'
import Cart from "@/views/Cart.vue"
import NotFound from "@/views/404.vue"
const routes = [
	{
		path: '/',
		name: 'home',
		redirect: '/home'
	},
	{
		path: '/cart',
		name: 'cart',
		component: Cart
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
	},
	{
		path: '/detail/:doc/:id',
		name: 'detail',
		component: Detail
	},
	{
	  path: '/:route',
	  name: 'root',
	  component: Home
	},
	{
		path: '/404',
		name: 'NotFound',
		component: NotFound
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
