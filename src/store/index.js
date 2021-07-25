import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import axios from 'axios'
import database from '@/store/database'

// install store files per module
import cashier from '@/modules/Cashier/cashier.store'

Vue.use(Vuex)

VuexORM.use(VuexORMAxios, {
  axios,
  baseURL: '/api/'
})

export default new Vuex.Store({
  modules: {
    cashier
  },
  plugins: [VuexORM.install(database)]
})
