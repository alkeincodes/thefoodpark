import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

// plugins
import './register-global'
import './plugins/element-ui'

import axios from './api/axios'
Vue.prototype.axios = axios
Vue.prototype.moment = moment

Vue.config.productionTip = false

// store.dispatch('auth/authenticate').then(() => {
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// })
