const Index = () => import(/* webpackChunkName: "cashier-index" */ '@/modules/Cashier/Index')
const NewOrder = () => import(/* webpackChunkName: "cashier-order" */ '@/modules/Cashier/Pages/Order')

export default [
  {
    path: '/cashier-home',
    name: 'CashierHome',
    component: Index,
    meta: {
      icon: 'home',
      navName: 'Home'
    }
  },
  {
    path: '/new-order',
    name: 'NewOrder',
    component: NewOrder,
    meta: {
      isHidden: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Index,
    meta: {
      icon: 'gear',
      navName: 'Settings'
    }
  }
]
