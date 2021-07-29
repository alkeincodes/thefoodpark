
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
    console.log('logout')
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

      return true
    }).catch(() => {
      commit('SET_AUTHENTICATED', false)
      commit('SET_USER', null)
      return false
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
