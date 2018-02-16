// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import { store } from './store/store'
import AnimatedVue from 'animated-vue'
import 'animate.css/animate.css'
import Vuebar from 'vuebar'
import AOS from 'aos'
import 'aos/dist/aos.css'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import VeeValidate from 'vee-validate'
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)
Vue.use(VueLodash, lodash)
Vue.use(AOS)
Vue.use(Vuebar)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(AnimatedVue)
Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    AOS.init()
  }
})
