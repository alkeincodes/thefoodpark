const namespaced = true

const state = {
  counter: 0,
  selectedMenu: {},
  orderItems: [
    {
      id: 0,
      order_number: '#0001',
      total: 300,
      status: 'preparing',
      order_type: 'dine-in'
    },
    {
      id: 1,
      order_number: '#0002',
      total: 424,
      status: 'preparing',
      order_type: 'dine-in'
    },
    {
      id: 2,
      order_number: '#0003',
      total: 1256,
      status: 'preparing',
      order_type: 'takeout'
    },
    {
      id: 3,
      order_number: '#0004',
      total: 3642,
      status: 'preparing',
      order_type: 'delivery'
    },
    {
      id: 4,
      order_number: '#0005',
      total: 5623,
      status: 'preparing',
      order_type: 'delivery'
    },
    {
      id: 5,
      order_number: '#0006',
      total: 2,
      status: 'preparing',
      order_type: 'dine-in'
    },
    {
      id: 6,
      order_number: '#0007',
      total: 2,
      status: 'preparing',
      order_type: 'dine-in'
    },
    {
      id: 7,
      order_number: '#0008',
      total: 2,
      status: 'preparing',
      order_type: 'dine-in'
    },
    {
      id: 8,
      order_number: '#0009',
      total: 2,
      status: 'preparing',
      order_type: 'dine-in'
    },
    {
      id: 9,
      order_number: '#0010',
      total: 2,
      status: 'preparing',
      order_type: 'dine-in'
    }
  ],
  foodMenu: [
    {
      categoryName: 'Category',
      products: [
        {
          id: 1,
          name: 'Product Name',
          price: 30,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 2,
          name: 'Product Name',
          price: 10,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 3,
          name: 'Product Name',
          price: 40,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 4,
          name: 'Product Name',
          price: 20,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 5,
          name: 'Product Name',
          price: 20,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 6,
          name: 'Product Name',
          price: 70,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 7,
          name: 'Product Name',
          price: 60,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 8,
          name: 'Product Name',
          price: 30,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 9,
          name: 'Product Name',
          price: 70,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 10,
          name: 'Product Name',
          price: 60,
          image: 'https://source.unsplash.com/random/150x150'
        }
      ]
    },
    {
      categoryName: 'Category #2',
      products: [
        {
          id: 1,
          name: 'Product Name',
          price: 30,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 2,
          name: 'Product Name',
          price: 50,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 3,
          name: 'Product Name',
          price: 30,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 4,
          name: 'Product Name',
          price: 40,
          image: 'https://source.unsplash.com/random/150x150'
        },
        {
          id: 5,
          name: 'Product Name',
          price: 50,
          image: 'https://source.unsplash.com/random/150x150'
        }
      ]
    }
  ]
}

const mutations = {

  SET_SELECTED_MENU (state, payload) {
    state.selectedMenu = payload
  },
  SET_ORDER_STATUS (state, payload) {
    const index = state.orderItems.findIndex(i => i.id === payload.id)
    state.orderItems[index].status = payload.status
  }
}

const actions = {}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  authenticated: state => state.authenticated,
  user: state => state.user,
  selectedMenu: state => state.selectedMenu,
  foodMenu: state => state.foodMenu,
  orderItems: state => state.orderItems
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
