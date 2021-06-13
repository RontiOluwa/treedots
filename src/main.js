import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'
import Routes from './route'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$http = axios

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_API_KEY,
    libraries: 'places',
  }
});
new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
