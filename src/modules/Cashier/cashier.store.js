const namespaced = true

const state = {
  counter: 0,
  selectedMenu: {},
  orderedItems: [],
  orderItems: [],
  selectedOrder: {},
  searchMenu: ''
}

const mutations = {
  SET_SELECTED_MENU(state, payload) {
    state.selectedMenu = payload
  },
  SET_ORDERED_ITEMS(state, quantity) {
    const order = {
      ...state.selectedMenu,
      quantity
    }
    state.orderedItems.push(order)
  },
  CLEAR_ORDERED_ITEMS(state) {
    state.orderedItems = []
  },
  REMOVE_ORDERED_ITEM(state, itemId) {
    const index = state.orderedItems.findIndex(({ id }) => id === itemId)

    console.log('index', index)

    state.orderedItems.splice(index, 1)
  },
  SET_SELECTED_ORDER(state, payload) {
    state.selectedOrder = payload
  },
  SET_SEARCH_MENU(state, payload) {
    state.searchMenu = payload
  }
}

const actions = {}

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  authenticated: (state) => state.authenticated,
  user: (state) => state.user,
  selectedMenu: (state) => state.selectedMenu,
  foodMenu: (state) => state.foodMenu,
  orderItems: (state) => state.orderItems,
  orderedItems: (state) => state.orderedItems,
  selectedOrder: (state) => state.selectedOrder,
  searchMenu: (state) => state.searchMenu
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
