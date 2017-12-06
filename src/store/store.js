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
    companyIndex: [],
    loading: false,
    error: null
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
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    newUser ({commit}, payload) {
      // create a new user in firebase and set the userkey
      commit('setLoading', true)
      commit('clearError')
      let promise = new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setLoading', false)
          commit('setUserKey', user.uid)
          console.log('User registered')
          resolve()
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
          reject()
        })
      })
      return promise
    },
    newCompany ({commit, getters}, payload) {
      // create new company in firebase, add user to users and then return companyKey
      commit('setLoading', true)
      commit('clearError')
      let promise = new Promise((resolve, reject) => {
        const companyName = payload.name
        commit('setCompany', payload)
        firestore.collection('companies').add(payload)
        .then((doc) => {
          commit('setCompanyKey', doc.id)
          firestore.collection('companyIndex').doc(doc.id).set({
            name: companyName
          })
          commit('setLoading', false)
          console.log('company created')
          resolve(doc.id)
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
          reject()
        })
      })
      return promise
    },
    newJob ({commit}, payload) {
      // create new job in firestore
      commit('setLoading', true)
      commit('clearError')
      let promise = new Promise((resolve, reject) => {
        const job = payload
        firestore.collection('jobSites').add(job)
        .then((doc) => {
          commit('setLoading', false)
          console.log('Job created' + doc.id)
          resolve()
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
          reject()
        })
      })
      return promise
    },
    updateUser ({commit, getters}, payload) {
      // add user info to firestore
      commit('setLoading', true)
      commit('clearError')
      commit('setUser', payload)
      let promise = new Promise((resolve, reject) => {
        firestore.collection('users').doc(getters.userKey).set(payload)
        .then(() => {
          commit('setLoading', false)
          console.log('User updated')
          resolve()
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
          reject()
        })
      })
      return promise
    },
    updateCompany ({commit, getters}, payload) {
      // add new user to company user collection
      commit('setLoading', true)
      commit('clearError')
      let promise = new Promise((resolve, reject) => {
        firestore.collection('companies').doc(getters.companyKey)
        .collection('users').doc(getters.userKey).set({name: payload.name})
        .then(() => {
          commit('setLoading', false)
          console.log('Company updated')
          resolve()
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
          reject()
        })
      })
      return promise
    },
    getCompany ({commit, state}, payload) {
      commit('setLoading', true)
      commit('clearError')
      commit('setCompanyKey', payload.key)
      let promise = new Promise((resolve, reject) => {
        firestore.collection('companies').doc(state.companyKey)
        .get()
        .then((doc) => {
          commit('setLoading', false)
          let company = doc.data()
          commit('setCompany', company)
          resolve(company)
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
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
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      let promise = new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            commit('setUserKey', user.uid)
            console.log('User key is set')
            resolve()
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            reject(error)
          }
        )
      })
      return promise
    },
    getUser ({commit, state}, payload) {
      commit('setLoading', true)
      commit('clearError')
      let promise = new Promise((resolve, reject) => {
        firestore.collection('users').doc(state.userKey)
        .get()
        .then((doc) => {
          commit('setLoading', false)
          let user = doc.data()
          commit('setUser', user)
          console.log('User profile set')
          resolve(user)
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
          reject()
        })
      })
      return promise
    }
  },
  getters: {
    userKey: (state) => state.userKey,
    user: (state) => state.user,
    companyKey: (state) => state.companyKey,
    companyIndex: (state) => state.companyIndex,
    company: (state) => state.company,
    loading: (state) => state.loading
  }
})
