import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home.vue')
const GroupList = () => import('../views/GroupList.vue')
const Group = () => import('../views/Group.vue')
const User = () => import('../views/User.vue')
const Signin = () => import('../views/Signin.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'Me',
    component: User
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User
  },
  {
    path: '/channels',
    name: 'GroupList',
    component: GroupList
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/channel/:id',
    name: 'Channel',
    component: Group
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
