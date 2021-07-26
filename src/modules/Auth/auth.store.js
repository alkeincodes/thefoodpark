
import axios from '@/api/axios'
import router from '@/router'

const namespaced = true

const state = {
  authenticated: false,
  user: null
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
      await dispatch('authenticate')
      router.push('/')
    })
  },
  async authenticate ({ state, commit }) {
    return axios.get('/user').then(({ data }) => {
      commit('SET_AUTHENTICATED', true)
      commit('SET_USER', data)

      console.log(state.user)

      switch (state.user.role) {
        case 'cashier':
          router.push('/cashier-home')
          break
        default:
          router.push('/')
      }
    }).catch(() => {
      commit('SET_AUTHENTICATED', false)
      commit('SET_USER', null)
    })
  }
}

const getters = {
  user: state => state.user,
  authenticated: state => state.authenticated
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
