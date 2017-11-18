import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {firestore} from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userKey: null,
    company: null
  },
  mutations: {
    setUserKey (state, payload) {
      state.userKey = payload
    },
    setCompany (state, payload) {
      state.company = payload
    }
  },
  actions: {
    newUser ({commit}, payload) {
      // create a new user in firebase and set the userkey
      let promise = new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setUserKey', user.uid)
          resolve({userId: user.uid})
        })
        .catch((error) => {
          switch (error.code) {
            case 'EMAIL_TAKEN':
              console.log('The new user account cannot be created because the email is already in use.')
              reject()
              break
            case 'INVALID_EMAIL':
              console.log('The specified email is not a valid email.')
              reject()
              break
            default:
              console.log('Error creating user', error)
              reject()
          }
        })
      })
      return promise
    },
    newCompany ({commit}, payload) {
      // create new company in firebase, add user to users and then return companyKey
      let promise = new Promise((resolve, reject) => {
        firestore.collection('companies').add({
          name: payload.name,
          address: payload.address,
          city: payload.city,
          phone: payload.phone,
          postcode: payload.postcode,
          principal: payload.principal,
          contractor: payload.contractor,
          users: [payload.user]
        })
        .then((doc) => {
          commit('setCompany', doc.id)
          resolve({company: doc.id})
        })
        .catch((error) => {
          console.log('Error creating Company' + error.message)
          reject()
        })
      })
      return promise
    },
    updateUser ({commit, getters}, payload) {
      // add user info to firestore
      let promise = new Promise((resolve, reject) => {
        firestore.collection('users').doc(getters.userKey).set({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          role: payload.role,
          admin: payload.admin,
          webUser: payload.webUser,
          company: payload.company
        })
        .then((doc) => {
          resolve()
        })
        .catch((error) => {
          console.log('Error updating User ' + error.message)
          reject()
        })
      })
      return promise
    },
    getCompany ({commit, state}, payload) {
      firestore.collection('companies').doc(state.companyKey)
      .get()
      .then((doc) => {
        let company = doc.data()
        commit('setCompany', company)
        return (company)
      })
    }
  },
  getters: {
    userKey: (state) => state.userKey,
    company: (state) => state.company
  }
})
