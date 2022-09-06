import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Details from "../views/Details.vue"
import Browse from "../views/Browse.vue"
import Streams from "../views/Streams.vue"
import Profile from "../views/Profile.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/browse',
    name: 'Browse',
    component: Browse
  },
  {
    path: '/details',
    name: 'Detail',
    component: Details
  },
  {
    path: '/streams',
    name: 'Stream',
    component: Streams
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
