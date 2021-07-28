const namespaced = true

const state = {
  counter: 0,
  selectedMenu: {},
  orderedItems: [],
  orderItems: [],
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
  },
  SET_ORDERED_ITEMS (state, quantity) {
    const order = {
      ...state.selectedMenu,
      quantity
    }

    state.orderedItems.push(order)
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
  orderedItems: state => state.orderedItems
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
