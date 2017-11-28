import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {firestore} from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userKey: '',
    user: {},
    company: {},
    companyKey: '',
    companyIndex: []
  },
  mutations: {
    setUserKey (state, payload) {
      state.userKey = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setCompany (state, payload) {
      state.company = payload
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
        firebase.auth().createUserWithEmailAndPassword(payload)
        .then((user) => {
          commit('setUserKey', user.uid)
          console.log('User registered')
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
        commit('setCompany', payload)
        firestore.collection('companies').add(payload)
        .then((doc) => {
          commit('setCompanyKey', doc.id)
          firestore.collection('companyIndex').doc(doc.id).set({
            name: companyName
          })
          resolve(doc.id)
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
      commit('setUser', payload)
      let promise = new Promise((resolve, reject) => {
        firestore.collection('users').doc(getters.userKey).set(payload)
        .then(() => {
          commit('setCompanyKey', payload.company)
          console.log('User updated')
          resolve()
        })
        .catch((error) => {
          console.log('Error updating User ' + error.message)
          reject()
        })
      })
      return promise
    },
    updateCompany ({commit, getters}, payload) {
      // add new user to company user collection
      let promise = new Promise((resolve, reject) => {
        firestore.collection('companies').doc(getters.companyKey)
        .collection('users').doc(getters.userKey).set({payload})
        .then(() => {
          console.log('Company updated')
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
      let promise = new Promise((resolve, reject) => {
        firestore.collection('companies').doc(state.companyKey)
        .get()
        .then((doc) => {
          let company = doc.data()
          commit('setCompany', company)
          resolve(company)
        })
        .catch((error) => {
          console.log('Error getting company' + error.message)
          reject()
        })
      })
      return promise
    },
    getCompanyIndex ({commit}) {
      // must already have key in state
      let companies = []
      firestore.collection('companyIndex')
      .get()
      .then((dataSnapshot) => {
        dataSnapshot.forEach((doc) => {
          companies.push({value: doc.id, label: doc.data().name})
        })
        commit('setCompanyIndex', companies)
        return companies
      })
    }
  },
  getters: {
    userKey: (state) => state.userKey,
    companyKey: (state) => state.companyKey,
    companyIndex: (state) => state.companyIndex,
    company: (state) => state.company
  }
})
