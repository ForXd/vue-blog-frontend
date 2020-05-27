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
    path: '/home',
    component: () => import('../container/CategoryPage')
  }
]

const router = new VueRouter({
  routes
})

export default router
