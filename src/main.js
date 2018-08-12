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
import _ from 'lodash'
import VueLodash from 'vue-lodash'
import VeeValidate from 'vee-validate'
import vSelect from 'vue-select'
import VueScrollTo from 'vue-scrollto'
import VueCarousel from 'vue-carousel'
import * as Pdf from 'jspdf'
import * as Canvas from 'html2canvas'

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

Vue.component('v-select', vSelect)
Vue.use(VueCarousel)
Vue.use(VueLodash, _)
Vue.use(AOS)
Vue.use(Vuebar)
Vue.use(Pdf)
Vue.use(Canvas)
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(AnimatedVue)
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
