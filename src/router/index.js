import Vue from 'vue'
import VueRouter from 'vue-router'
import { addGuardstoRoutes, addAdminGuardToRoutes } from './guards'
// import store from '@/store'
import auth from '@/modules/Auth/auth.routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...auth,
    ...addGuardstoRoutes([]),
    ...addAdminGuardToRoutes([]),
    {
      path: '*',
      component: require('@/components/common/404.vue').default
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresVisitor)) {
//     if (store.getters['auth/authenticated']) {
//       next('/')
//     } else {
//       next()
//     }
//   } else {
//     next() // make sure to always call next()!
//   }
// })

export default router
