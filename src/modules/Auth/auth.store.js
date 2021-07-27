
import axios from '@/api/axios'
import router from '@/router'

const namespaced = true

const state = {
  authenticated: false,
  user: null,
  isLoading: true
}

const mutations = {
  SET_USER (state, payload) {
    state.user = payload
  },
  SET_AUTHENTICATED (state, value) {
    state.authenticated = value
  }
}

const actions = {
  logout ({ dispatch }) {
    axios.post('/logout').then(async () => {
      localStorage.removeItem('token')
      await dispatch('authenticate')
      router.push('/')
    })
  },
  async authenticate ({ state, commit }) {
    return axios.get('/user').then(({ data }) => {
      commit('SET_AUTHENTICATED', true)
      commit('SET_USER', data)

      switch (state.user.role) {
        case 'cashier':
          router.push('/cashier-home')
          break
        default:
          router.push('/')
      }

      setTimeout(() => {
        state.isLoading = false
      }, 1000)
    }).catch(() => {
      commit('SET_AUTHENTICATED', false)
      commit('SET_USER', null)
      state.isLoading = false
    })
  }
}

const getters = {
  user: state => state.user,
  authenticated: state => state.authenticated,
  isLoading: state => state.isLoading
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
