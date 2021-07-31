const namespaced = true

const state = {
  counter: 0,
  selectedMenu: {},
  orderedItems: [],
  orderItems: [],
  selectedOrder: {},
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
  SET_ORDERED_ITEMS (state, quantity) {
    const order = {
      ...state.selectedMenu,
      quantity
    }
    state.orderedItems.push(order)
  },
  CLEAR_ORDERED_ITEMS (state) {
    state.orderedItems = []
  },
  REMOVE_ORDERED_ITEM (state, itemId) {
    const index = state.orderedItems.findIndex(({ id }) => id === itemId)

    console.log('index', index)

    state.orderedItems.splice(index, 1)
  },
  SET_SELECTED_ORDER (state, payload) {
    state.selectedOrder = payload
  }
}

const actions = {}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  authenticated: state => state.authenticated,
  user: state => state.user,
  selectedMenu: state => state.selectedMenu,
  foodMenu: state => state.foodMenu,
  orderItems: state => state.orderItems,
  orderedItems: state => state.orderedItems,
  selectedOrder: state => state.selectedOrder
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
