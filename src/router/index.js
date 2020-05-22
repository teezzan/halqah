import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GroupList from '../views/GroupList.vue'
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
