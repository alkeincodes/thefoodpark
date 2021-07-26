const Index = () => import(/* webpackChunkName: "cashier-index" */ '@/modules/Cashier/Index.vue')

export default [
  {
    path: '/home',
    name: 'Index',
    component: Index
  }
]
