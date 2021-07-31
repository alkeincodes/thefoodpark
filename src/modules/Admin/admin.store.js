const namespaced = true

const state = {
  selectedMenu: null
}

const mutations = {
  SET_SELECTED_MENU (state, payload) {
    state.selectedMenu = payload
  }
}

const actions = {}

const getters = {
  selectedMenu: state => state.selectedMenu
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
