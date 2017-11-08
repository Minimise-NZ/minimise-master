import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

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
      console.log('I am creating a new company')
      let newCompany = {
        type: payload.type,
        name: payload.name,
        address: payload.address,
        city: payload.city,
        postcode: payload.postcode,
        phone: payload.phone
      }
      firebase.database().ref('companies').push(newCompany)
      .then((data) => {
        newCompany.key = data.key
        commit('setCompany', {newCompany})
      })
      .catch((error) => {
        console.log(error.message)
      })
    },
    userSignUp ({commit}, payload) {
      // create new user in firebase. Set the user key
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        data => {
          commit('setUserKey', data.uid)
        }
      )
      .catch((error) => {
        console.log(error.message)
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
