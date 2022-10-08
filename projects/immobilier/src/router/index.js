import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"
import Auth from "../views/Auth.vue"
import Details from "../views/Details.vue"
import Messages from "../views/Messages.vue"
import Favoris from "../views/Favoris.vue"
import DashBoard from "@/views/admin/DashBoard.vue"
import Profile from "@/views/Profile.vue"
import NotFound from "@/views/404.vue"
import Vendor from "@/views/company/Vendor.vue"
import Comments from "@/components/Comments.vue"

const routes = [
  {
    path: '/',
    redirect: '/maison',
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '/:categories',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favoris
  },
  {
    path: '/details/:categorie/:id',
    name: 'Details',
    component: Details
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comments
  },
  {
    path: '/admin/dashboard',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '/pro/vendor/:id',
    name: 'Vendor',
    component: Vendor
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
