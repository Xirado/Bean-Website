import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSessionStorage from "vue-sessionstorage"

Vue.config.productionTip = false



Vue.use(VueSessionStorage)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
