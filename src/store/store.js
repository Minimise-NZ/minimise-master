import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {firestore} from '../firebase'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userKey: '',
    user: {},
    company: {},
    companyKey: '',
    companyIndex: [],
    jobsInProgress: [],
    myIncidents: [],
    allHazards: [],
    allRisks: [],
    loading: false,
    error: null
  },
  mutations: {
    clearStore (state) {
      state.userKey = ''
      state.user = {}
      state.company = {}
      state.companyKey = ''
      state.companyIndex = []
      state.jobsInProgress = []
      state.myIncidents = []
      state.allHazards = []
      state.allRisks = []
      state.loading = false
      state.error = null
    },
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
    },
    setJobs (state, payload) {
      state.jobsInProgress = payload
    },
    setAllHazards (state, payload) {
      state.allHazards = payload
    },
    setAllRisks (state, payload) {
      state.allRisks = payload
    },
    setMyHazards (state, payload) {
      state.myHazards = payload
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
    newIncident ({commit}, payload) {
      // create new incident in firestore
      commit('setLoading', true)
      commit('clearError')
      let promise = new Promise((resolve, reject) => {
        const incident = payload
        firestore.collection('incidents').add(incident)
        .then((doc) => {
          commit('setLoading', false)
          console.log('Incident created' + doc.id)
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
    },
    getJobs ({commit, state}, payload) {
      // get all jobs in progress that are assigned to this company as principal
      commit('setLoading', true)
      firestore.collection('jobSites').where('principalKey', '==', state.companyKey).where('status', '==', 'open')
      .get()
      .then((snapshot) => {
        const jobSites = []
        snapshot.forEach((doc) => {
          let job = doc.data()
          let approved = []
          let pending = []
          job.subcontractors.forEach((contractor) => {
            if (contractor.status === 'approved') {
              approved.push(contractor.name)
            } else {
              pending.push(contractor.name)
            }
          })
          jobSites.push({
            id: doc.id,
            address: job.address,
            pending,
            approved
          })
          console.log(doc.data())
        })
        commit('setJobs', jobSites)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log('Error getting documents: ', error)
        commit('setLoading', false)
      })
    },
    getAllHazards ({commit, state}, payload) {
      commit('setLoading', true)
      const allHazards = []
      let promise = new Promise((resolve, reject) => {
        firestore.collection('hazards')
        .get()
        .then((snapshot) => {
          commit('setLoading', false)
          snapshot.forEach((doc) => {
            let data = doc.data()
            let hazard = {
              name: data.name,
              image: data.imageURL,
              riskIds: data.risks,
              risks: []
            }
            allHazards.push(hazard)
          })
          commit('setAllHazards', allHazards)
          resolve()
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
          reject(console.log('All Hazard Error'))
        })
      })
      return promise
    },
    getAllRisks ({commit, state}, payload) {
      commit('setLoading', true)
      const allRisks = []
      let promise = new Promise((resolve, reject) => {
        firestore.collection('risks')
        .get()
        .then((snapshot) => {
          commit('setLoading', false)
          snapshot.forEach((doc) => {
            let data = doc.data()
            let risk = {
              id: doc.id,
              controls: [],
              IRA: data.IRA,
              RRA: data.RRA,
              name: data.name
            }
            for (let index in data.Controls) {
              risk.controls.push(data.Controls[index])
            }
            console.log(risk)
            allRisks.push(risk)
          })
          commit('setAllRisks', allRisks)
          resolve()
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
          reject(console.log('All risks error'))
        })
      })
      return promise
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
    logout ({commit}) {
      firebase.auth().signOut()
      commit('clearStore')
      localStorage.clear()
    }
  },
  getters: {
    userKey: (state) => state.userKey,
    user: (state) => state.user,
    companyKey: (state) => state.companyKey,
    companyIndex: (state) => state.companyIndex,
    company: (state) => state.company,
    loading: (state) => state.loading,
    jobsInProgress: (state) => state.jobsInProgress,
    allHazards: (state) => state.allHazards,
    allRisks: (state) => state.allRisks
  },
  plugins: [createPersistedState()]
})
