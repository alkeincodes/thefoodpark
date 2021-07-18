import Vue from 'vue'
import Vuex from 'vuex'

import cashier from '@/modules/Cashier/cashier.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cashier
  }
})
