const Index = () => import(/* webpackChunkName: "cashier-index" */ '@/modules/Cashier/Index.vue')

export default [
  {
    path: '/cashier-home',
    name: 'CashierHome',
    component: Index
  }
]
