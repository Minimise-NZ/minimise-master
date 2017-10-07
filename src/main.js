// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import Vuex from 'vuex'
import VueFire from 'vuefire'
import vSelect from 'vue-select'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueFire)
Vue.component('v-select', vSelect)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
