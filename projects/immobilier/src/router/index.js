import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Auth from "../views/Auth.vue"
import Card from "../components/Card.vue"

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
    path: '/card',
    name: 'Card',
    component: Card
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
