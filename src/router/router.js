import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import OccupantManagement from '../views/OccupantManagement.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/toDashboard',
    name: 'toDashboard',
    component: Dashboard
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path:'/OccupantManagement',
    name:'OccupantManagement',
    component:OccupantManagement
  }
]

const router = new VueRouter({
  routes
})

export default router