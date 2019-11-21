import Vue from 'vue'
import VueRouter from 'vue-router'
// import Dashboard from '@/views/Dashboard.vue'
import Login from '../views/Login.vue'
import Setting from '../views/Setting.vue'
import Occupant from '../views/OccupantManagement.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard', 
    name: 'Dashboard',
    component: ()=> import("@/views/Dashboard.vue")
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/settings',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/occupantmanagement',
    name: 'Occupant',
    component: Occupant
  }
]

const router = new VueRouter({
  routes ,
  mode: "history",
  base: process.env.BASE_URL,
})

export default router