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
import AOS from 'aos'
import 'aos/dist/aos.css'

Vue.use(Datetime)
Vue.use(AOS)
Vue.use(Vuebar)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component('v-select', vSelect)
Vue.use(AnimatedVue)

const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'inputs ', // Default is fields
  delay: 0,
  locale: 'en',
  dictionary: null,
  strict: true,
  enableAutoClasses: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true
}

Vue.use(VeeValidate, config)
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
