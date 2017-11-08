// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import { store } from './store/store'
import vSelect from 'vue-select'
import AnimatedVue from 'animated-vue'
import 'animate.css/animate.css'
import VueFire from 'vuefire'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component('v-select', vSelect)
Vue.use(AnimatedVue)
Vue.use(VueFire)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyC_ronpzRJkeHj85l1O179b33UuLqjYoKk',
      authDomain: 'minimisedb.firebaseapp.com',
      databaseURL: 'https://minimisedb.firebaseio.com',
      projectId: 'minimisedb',
      storageBucket: 'minimisedb.appspot.com',
      messagingSenderId: '914768004690'
    })
  }
})
