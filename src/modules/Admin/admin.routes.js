const Index = () => import(/* webpackChunkName: "admin-index" */ '@/modules/Admin/Index')
const Home = () => import(/* webpackChunkName: "admin-home" */ '@/modules/Admin/Pages/Home')
const MenuIndex = () =>
  import(/* webpackChunkName: "menu-index" */ '@/modules/Admin/Pages/Menu/Index')
const CreateEdit = () =>
  import(/* webpackChunkName: "create-menu" */ '@/modules/Admin/Pages/Menu/CreateEdit')
const Category = () =>
  import(/* webpackChunkName: "create-menu" */ '@/modules/Admin/Pages/Category/Index')

export default [
  {
    path: '/admin',
    name: 'admin',
    component: Index,
    children: [
      {
        path: '/',
        name: 'admin',
        component: Home,
        meta: {
          icon: 'home',
          navName: 'Home'
        }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: MenuIndex,
        meta: {
          icon: 'menu',
          navName: 'Menu'
        },
        children: [
          {
            path: '/',
            name: 'index',
            component: MenuIndex,
            meta: {
              icon: 'order',
              navName: 'Create'
            }
          },
          {
            path: 'create',
            name: 'create',
            component: CreateEdit,
            meta: {
              icon: 'order',
              navName: 'Create'
            }
          },
          {
            path: 'edit',
            name: 'create',
            component: CreateEdit,
            meta: {
              icon: 'order',
              navName: 'Create'
            }
          }
        ]
      },
      {
        path: '/categories',
        name: 'Categories',
        component: Category,
        meta: {
          icon: 'menu',
          navName: 'Categories'
        }
      }
    ]
  }
]
