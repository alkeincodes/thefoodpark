import multiguard from 'vue-router-multiguard'
import store from '@/store'
// import axios from '@/api/axios'

export const authRouteGuard = async (to, from, next) => {
  const isLoggedIn = await store.dispatch('auth/authenticate')
  if (isLoggedIn) {
    next()
  } else {
    next('/')
  }
}

export const cashierRouteGuard = async (to, from, next) => {
  if (store.getters['auth/user'].role === 'cashier') {
    next()
  } else {
    next('/')
  }
}

export const adminRouteGuard = async (to, from, next) => {
  if (store.getters['auth/user'].role === 'admin') {
    next()
  } else {
    next('/')
  }
}

export const addGuardstoRoutes = (routes) =>
  routes.map((r) => {
    r.beforeEnter = multiguard([authRouteGuard])
    r.props = true
    return r
  })

export const addCashierGuardToRoutes = (routes) =>
  routes.map((r) => {
    r.beforeEnter = multiguard([authRouteGuard, cashierRouteGuard])
    r.props = true
    return r
  })

export const addAdminGuardToRoutes = (routes) =>
  routes.map((r) => {
    r.beforeEnter = multiguard([authRouteGuard, adminRouteGuard])
    r.props = true
    return r
  })
