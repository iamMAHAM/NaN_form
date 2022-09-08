import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Auth from "../views/Auth.vue"
import Details from "../views/Details.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/detail/:categorie/:id',
    name: 'Details',
    component: Details
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
