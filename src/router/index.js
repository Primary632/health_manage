import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '@/App.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path:'/home',
    name:'Home',
    component:()=>import ('../views/Home.vue'),
    children:[]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/login/login.vue')
  },

]

const router = new VueRouter({
	mode: 'history',
	//   base: process.env.BASE_URL,
	routes,
	
})

export default router
