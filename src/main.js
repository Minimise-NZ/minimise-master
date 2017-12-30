// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import { store } from './store/store'
import vSelect from 'vue-select'
import AnimatedVue from 'animated-vue'
import 'animate.css/animate.css'
import VeeValidate from 'vee-validate'
import Vuebar from 'vuebar'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)
Vue.use(Vuebar)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component('v-select', vSelect)
Vue.use(AnimatedVue)
Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
