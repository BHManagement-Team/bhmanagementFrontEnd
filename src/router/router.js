import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Setting from '../views/Setting.vue'
import Occupant from '../views/OccupantManagement.vue'
import store from '../store/index'
Vue.use(VueRouter)
const routes = [
  { 
    path: '/dashboard', 
    name: 'Dashboard',
    component: ()=> import("@/views/Dashboard.vue"),
    meta: { 
      requiresAuth: true
    },
   

  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/settings',
    name: 'Setting',
    component: Setting,
    meta: { 
      requiresAuth: true
    },
   
  },
  {
    path: '/occupantmanagement',
    name: 'Occupant',
    component: Occupant,
    meta: { 
      requiresAuth: true
    },
   
  }
]

const router = new VueRouter({
  routes ,
  mode: "history",
  base: process.env.BASE_URL,
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})
export default router