import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Group from '../views/Group.vue'
import User from '../views/User.vue'
import Signin from '../views/Signin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/group',
    name: 'Group',
    component: Group
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
