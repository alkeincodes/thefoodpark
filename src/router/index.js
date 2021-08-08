import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  addGuardstoRoutes,
  addCashierGuardToRoutes,
  addAdminGuardToRoutes
} from './guards'
// import store from '@/store'
import cashier from '@/modules/Cashier/cashier.routes'
import admin from '@/modules/Admin/admin.routes'

Vue.use(VueRouter)

// function isLoggedIn () {
//   return localStorage.getItem('token')
// }

// if (isLoggedIn()) {

// }

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/modules/Auth/Login'),
      meta: {
        isHidden: true
      }
    },
    // global auth routes
    ...addGuardstoRoutes([]),
    // auth cashier routes
    ...addCashierGuardToRoutes([...cashier]),
    ...addAdminGuardToRoutes([...admin]),
    {
      path: '*',
      component: require('@/components/common/404.vue').default,
      meta: {
        isHidden: true
      }
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
})

// router.beforeEach(async (to, from, next) => {
// const isLoggedIn = await store.dispatch('auth/authenticate')

// console.log('isLoggedIn: ', isLoggedIn)

// if (isLoggedIn && to.name !== 'Login') {
//   next()
// } else if (isLoggedIn && to.name === 'Login') {
//   next('/cashier-home')
// } else if (!isLoggedIn) {
//   next('/')
// }
// })

export default router
