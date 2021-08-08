const namespaced = true

const state = {
  selectedMenu: null,
  selectedCategory: null
}

const mutations = {
  SET_SELECTED_MENU (state, payload) {
    state.selectedMenu = payload
  },
  SET_SELECTED_CATEGORY (state, payload) {
    state.selectedCategory = payload
  }
}

const actions = {}

const getters = {
  selectedMenu: (state) => state.selectedMenu,
  selectedCategory: (state) => state.selectedCategory
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
