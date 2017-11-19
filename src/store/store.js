import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {firestore} from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userKey: null,
    companyKey: null,
    companyIndex: null
  },
  mutations: {
    setUserKey (state, payload) {
      state.userKey = payload
    },
    setCompanyKey (state, payload) {
      state.companyKey = payload
    },
    setCompanyIndex (state, payload) {
      state.companyIndex = payload
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
    newCompany ({commit, getters}, payload) {
      // create new company in firebase, add user to users and then return companyKey
      let promise = new Promise((resolve, reject) => {
        const companyName = payload.name
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
          commit('setCompanyKey', doc.id)
          firestore.collection('companyIndex').doc(doc.id).set({
            name: companyName
          })
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
      // must already have key in state
      firestore.collection('companies').doc(state.companyKey)
      .get()
      .then((doc) => {
        let company = doc.data()
        commit('setCompany', company)
        return (company)
      })
    },
    getCompanyIndex ({commit}) {
      // must already have key in state
      let companies = []
      firestore.collection('companyIndex')
      .get()
      .then((dataSnapshot) => {
        dataSnapshot.forEach((doc) => {
          companies.push({id: doc.id, name: doc.data().name})
        })
        commit('setCompanyIndex', companies)
        console.log('Company Index created ' + companies)
      })
    }
  },
  getters: {
    userKey: (state) => state.userKey,
    companyKey: (state) => state.companyKey,
    companyIndex: (state) => state.companyIndex
  }
})
