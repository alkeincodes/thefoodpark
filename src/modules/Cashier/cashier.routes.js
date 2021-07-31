const Index = () => import(/* webpackChunkName: "cashier-index" */ '@/modules/Cashier/Index')
const Home = () => import(/* webpackChunkName: "cashier-home" */ '@/modules/Cashier/Pages/Home')
const NewOrder = () => import(/* webpackChunkName: "cashier-order" */ '@/modules/Cashier/Pages/Order')

export default [
  {
    path: '/cashier',
    name: 'cashier',
    component: Index,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          icon: 'home',
          navName: 'Home'
        }
      },
      {
        path: 'new-order',
        name: 'NewOrder',
        component: NewOrder,
        meta: {
          isHidden: true
        }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Index,
        meta: {
          icon: 'gear',
          navName: 'Settings'
        }
      }
    ]
  }
]
