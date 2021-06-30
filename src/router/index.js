import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    redirect: '/home',
    path:'',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
 
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ 'pages/About.vue')
  },
  {
    path: '/appointment',
    name: 'appointment',
    component:()=>import('pages/appointment'),
  },
  {
    path:'/appointmented',
    name: 'appointmented',
    component:()=>import('pages/appointmented')
  },
  {
    path: '/visit',
    name: 'visit',
    component:()=>import('pages/visit')
 
  },
  {
    path: '/shenpi',
    name: 'shenpi',
    component:()=>import('pages/shenpi')
 
  },
  {
    path: '/guide',
    name: 'guide',
    component:()=>import('pages/guide')
 
  },
  {
    path: '/shenpi_detail',
    name: 'shenpi_detail',
    component:()=>import('pages/shenpi_detail')
  },
  {
    path: '/invite',
    name: 'invite',
    component:()=>import('pages/invite')
 
  },
  {
    path: '/invite_detail',
    name: 'invite_detail',
    component:()=>import('pages/invite_detail')
 
  },
  {
    path: '/visit_detail',
    name: 'visit_detail',
    component:()=>import('pages/visit_detail')
 
  },
  {
    path: '/mine',
    name: 'mine',
    component:()=>import('pages/mine')
 
  },
  {
    path: '/bindPhone',
    name: 'bindPhone',
    component:()=>import('pages/bindPhone')
 
  },
  {
    path: '/information',
    name: 'information',
    component:()=>import('pages/information')
 
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
