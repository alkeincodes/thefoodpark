const Index = () => import(/* webpackChunkName: "cashier-index" */ '@/modules/Cashier/Index.vue')

export default [
  {
    path: '/',
    name: 'Index',
    component: Index
  }
]
