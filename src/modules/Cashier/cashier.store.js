import axios from '@/api/axios'
import router from '@/router'

const namespaced = true

const state = {
  authenticated: false,
  user: null,
  counter: 0,
  selectedMenu: {},
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
  SET_USER (state, payload) {
    state.user = payload
  },
  SET_AUTHENTICATED (state, value) {
    state.authenticated = value
  },
  SET_SELECTED_MENU (state, payload) {
    state.selectedMenu = payload
  }
}

const actions = {
  login ({ state, dispatch }, params) {
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/login', {
        email: params.email,
        password: params.password
      }).then(async () => {
        await dispatch('authenticate')

        console.log('user type: ', state.user.utype)

        if (state.user.utype === 'admin') {
          console.log('to admin')
          router.push('/admin')
        } else {
          console.log('to user')
          router.push('/home')
        }
      })
    })
  },
  logout ({ dispatch }) {
    axios.post('/logout').then(async () => {
      await dispatch('authenticate')
      router.push('/')
    })
  },
  async authenticate ({ commit }) {
    return axios.get('/api/user').then(({ data }) => {
      commit('SET_AUTHENTICATED', true)
      commit('SET_USER', data)
    }).catch((err) => {
      console.log(err.response.data)
      commit('SET_AUTHENTICATED', false)
      commit('SET_USER', null)
    })
  }
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  authenticated: state => state.authenticated,
  user: state => state.user,
  selectedMenu: state => state.selectedMenu,
  foodMenu: state => state.foodMenu
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
