import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../container/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../container/Auth')
  },
  {
    path: '/edit/:id',
    component: () => import('../container/EditPage'),
    props: true
  },
  {
    path: '/post/:id',
    component: () => import('../container/PostPage'),
    props: true
  },
  {
    path: '/article',
    component: () => import('../container/Article')
  },
  {
    path: '/user/:id',
    component: () => import('../container/UserPage'),
    props: true,
    meta: {
      login: true
    },
    children: [
      {
        path: 'info',
        component: () => import('@/components/user/UserInfo'),
        props:true
      },
      {
        path: 'collect',
        component: () => import('@/components/user/UserCollect')
      },
      {
        path: 'activity',
        component: () => import('@/components/user/UserActivity')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
