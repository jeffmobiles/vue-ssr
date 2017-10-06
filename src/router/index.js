import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = () => import('./../module/Home/home.vue')
const info = () => import('./../module/Info/info.vue')
const account = () => import('./../module/account/account.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: home
      },
      {
        path: '/info',
        name: 'info',
        component: info
      },
      {
        path: '/account',
        name: 'account',
        component: account
      }
    ]
  })
}
