import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {firestore} from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    companyDirectory: []
  },
  mutations: {
    setCompany (state, payload) {
      // rewrite this to get data from database
      state.company = payload
    },
    setUser (state, payload) {
      // rewrite this to get data from database
    },
    setUserKey (state, payload) {
      state.user.key = payload
    },
    setCompanyKey (state, payload) {
      state.company.key = payload
    }
  },
  actions: {
    newCompany ({commit}, payload) {
      // create a new Company in Firebase and return the key
    },
    userSignUp ({commit}, payload) {
    // create new user in firebase. Set the user key
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        firestore.collection('users').doc(user.uid).set({
          name: payload.name
        })
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    company (state) {
      return state.company
    }
  }
})
