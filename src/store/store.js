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
    projectManagers: [],
    jobsInProgress: null,
    jobRequests: [],
    myIncidents: [],
    allHazards: [],
    myHazards: [],
    notMyHazards: [],
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
      state.jobRequests = []
      state.loading = false
      state.error = null
    },
    setUserKey (state, payload) {
      console.log('Userkey set')
      state.userKey = payload
    },
    setUser (state, payload) {
      console.log('User profile set')
      state.user = payload
    },
    setCompany (state, payload) {
      console.log('Company set')
      state.company = payload
    },
    setCompanyKey (state, payload) {
      console.log('CompanyKey set')
      state.companyKey = payload
    },
    setCompanyIndex (state, payload) {
      state.companyIndex = payload
    },
    setProjectManagers (state, payload) {
      state.projectManagers = payload
    },
    setRequests (state, payload) {
      state.jobRequests = payload
      console.log('Job requests set')
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
      console.log('Jobs in progress set', state.jobsInProgress)
    },
    setAllHazards (state, payload) {
      state.allHazards = payload
      console.log('All hazards set')
    },
    setMyHazards (state, payload) {
      console.log('My hazards set')
      state.myHazards = payload
    },
    setNotMyHazards (state, payload) {
      console.log('Mot my hazards set')
      state.notMyHazards = payload
    },
    setIncidents (state, payload) {
      console.log('Incidents set')
      state.myIncidents = payload
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
          commit('setCompanyKey', user.company)
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
    newCompany ({commit, getters}, payload) {
      // create new company in firebase, add company to index and then return companyKey
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
    updateCompany ({commit, getters}) {
      // add new user to company users
      commit('setLoading', true)
      commit('clearError')
      let promise = new Promise((resolve, reject) => {
        let user = {}
        let key = getters.userKey
        user[key] = true
        firestore.collection('companies').doc(getters.companyKey)
        .set({'users': user}, {merge: true})
        .then(() => {
          commit('setLoading', false)
          console.log('Company updated with user', user)
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
      let promise = new Promise((resolve, reject) => {
        commit('setCompanyKey', payload.key)
        firestore.collection('companies').doc(payload.key)
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
    getProjectManagers ({commit, state}) {
      let list = []
      firestore.collection('users').where('company', '==', state.companyKey).where('role', '==', 'Project Manager')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          list.push({value: doc.id, label: doc.data().name, phone: doc.data().phone})
        })
        commit('setProjectManagers', list)
        return list
      })
    },
    newJob ({commit, dispatch}, payload) {
      // create new job in firestore jobSites collection
      commit('setLoading', true)
      commit('clearError')
      let promise = new Promise((resolve, reject) => {
        let subcontractors = payload.subcontractors
        let approved = {}
        subcontractors.forEach((val) => {
          let key = val.key
          approved[key] = false
        })
        firestore.collection('jobSites').add({
          principalKey: payload.principalKey,
          principalName: payload.principalName,
          pm: payload.pm,
          pmPhone: payload.pmPhone,
          hse: payload.hse,
          hsePhone: payload.hsePhone,
          address: payload.address,
          notifiable: payload.notifiable,
          info: payload.info,
          approved: approved,
          open: true,
          date: new Date()
        })
        commit('setLoading', false)
        resolve()
      })
      return promise
    },
    updateJob ({dispatch}, payload) {
      // update contractor information
      let approved = {}
      for (let index in payload.contractors) {
        let key = payload.contractors[index].key
        approved[key] = false
      }
      console.log('approved', approved)
      firestore.collection('jobSites').doc(payload.id)
      .set({'approved': approved}, {merge: true})
      .then(() => {
        dispatch('getJobs')
      })
    },
    closeJob ({dispatch}, payload) {
      firestore.collection('jobSites').doc(payload)
      .update({'open': false, 'closedDate': new Date()})
      .then(() => {
        dispatch('getJobs')
      })
    },
    getJobs ({commit, state}) {
      // get all jobs in progress that are assigned to this company as principal
      let promise = new Promise((resolve, reject) => {
        firestore.collection('jobSites').where('principalKey', '==', state.companyKey).where('open', '==', true)
        .get()
        .then((snapshot) => {
          var jobSites = []
          snapshot.forEach((doc) => {
            let list = []
            let contractors = doc.data().approved
            console.log(contractors)
            // get the contractor name from companyIndex
            for (let key in contractors) {
              console.log(key)
              state.companyIndex.find((id) => {
                if (id.value === key) {
                  list.push({
                    approved: contractors[key],
                    name: id.label,
                    key: id.value
                  })
                }
              })
            }
            jobSites.push({
              id: doc.id,
              address: doc.data().address,
              date: doc.data().date,
              hse: doc.data().hse,
              hsePhone: doc.data().hsePhone,
              info: doc.data().info,
              notifiable: doc.data().notifiable,
              pm: doc.data().pm,
              pmPhone: doc.data().pmPhone,
              contractors: list
            })
          })
          commit('setJobs', jobSites)
          resolve(jobSites)
        })
        .catch((error) => {
          console.log('Error getting documents: ', error)
          commit('setLoading', false)
          reject(error)
        })
      })
      return promise
    },
    getJobRequests ({commit, state}, payload) {
      // get all jobs in progress that are assigned to this company as principal
      commit('setLoading', true)
      firestore.collection('companies').doc(state.companyKey)
      .collection('jobSites').where('status', '==', 'pending')
      .get()
      .then((snapshot) => {
        let jobRequests = []
        snapshot.forEach((doc) => {
          firestore.collection('jobSites').doc(doc.id).get()
          .then((doc) => {
            let job = doc.data()
            jobRequests.push({
              id: doc.id,
              address: job.address,
              principal: job.principalName,
              projectManager: job.pm,
              PMcontact: job.pmPhone,
              HSEManager: job.hse,
              HSEcontact: job.hsePhone,
              date: job.date,
              notifiable: job.notifiable,
              info: job.info,
              status: job.status
            })
          })
        })
        commit('setRequests', jobRequests)
        console.log(jobRequests)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log('Error getting documents: ', error)
        commit('setLoading', false)
      })
    },
    newIncident ({commit, dispatch, state}, payload) {
      // create new incident in firestore
      commit('setLoading', true)
      commit('clearError')
      let promise = new Promise((resolve, reject) => {
        let incident = payload.incident
        let incidents = state.myIncidents
        incidents.push(incident)
        firestore.collection('incidents').add({incident})
        .then(() => {
          commit('setLoading', false)
          dispatch('getIncidents')
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
    getIncidents ({commit, state}) {
      if (state.user.admin) {
        firestore.collection('incidents').where('incident.company', '==', state.companyKey)
        .get()
        .then((snapshot) => {
          let incidents = []
          snapshot.forEach((doc) => {
            let obj = doc.data()
            let key = doc.id
            incidents.push({
              id: key,
              address: obj.incident.address,
              date: obj.incident.date,
              reportedBy: obj.incident.reportedBy,
              type: obj.incident.type,
              description: obj.incident.description,
              injury: obj.incident.injury,
              injuryDescription: obj.incident.injuryDescription,
              plant: obj.incident.plant,
              plantDamage: obj.incident.plantDamage,
              cause: obj.incident.cause,
              corrective: obj.incident.corrective,
              escalate: obj.incident.escalate,
              open: obj.incident.open,
              loggedBy: obj.incident.loggedBy,
              actionOwner: obj.incident.actionOwner
            })
            commit('setIncidents', incidents)
          })
        })
      } else {
        firestore.collection('incidents').where('incident.actionOwner.key', '==', state.userKey)
        .get()
        .then((snapshot) => {
          let incidents = []
          snapshot.forEach((doc) => {
            let obj = doc.data()
            let key = doc.id
            incidents.push({
              id: key,
              address: obj.incident.address,
              date: obj.incident.date,
              reportedBy: obj.incident.reportedBy,
              type: obj.incident.type,
              description: obj.incident.description,
              injury: obj.incident.injury,
              injuryDescription: obj.incident.injuryDescription,
              plant: obj.incident.plant,
              plantDamage: obj.incident.plantDamage,
              cause: obj.incident.cause,
              corrective: obj.incident.corrective,
              escalate: obj.incident.escalate,
              open: obj.incident.open,
              loggedBy: obj.incident.loggedBy,
              actionOwner: obj.incident.actionOwner
            })
            commit('setIncidents', incidents)
          })
        })
      }
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
              id: doc.id,
              name: data.name,
              image: data.imageURL,
              IRA: data.IRA,
              RRA: data.RRA,
              controls: data.controls,
              risks: data.risks,
              taskAnalysis: data.taskAnalysis,
              worksafe: data.worksafeNotification
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
    getMyHazards ({commit, state}) {
      let hazards = state.company.hazards
      console.log(hazards)
      if (hazards <= 0 || hazards === undefined || hazards === null) {
        console.log('this company has no hazards')
        return
      } else {
        commit('setMyHazards', hazards)
      }
    },
    getNotMyHazards ({commit, state}) {
      let all = new Set(state.allHazards)
      let my = new Set(state.myHazards)
      console.log('this is my hazards', my)
      let difference = new Set(
        [...all].filter(x => !my.has(x)))
      let hazards = [...difference]
      commit('setNotMyHazards', hazards)
    },
    saveHazards ({commit, state}, payload) {
      let hazardUpdates = state.myHazards.concat(payload)
      firestore.collection('companies').doc(state.companyKey)
      .update({hazards: payload})
      commit('setMyHazards', hazardUpdates)
      console.log('My Hazards updates', state.myHazards)
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
    jobRequests: (state) => state.jobRequests,
    allHazards: (state) => state.allHazards,
    myHazards: (state) => state.myHazards,
    notMyHazards: (state) => state.notMyHazards,
    incidents: (state) => state.myIncidents,
    incident (state) {
      return (id) => {
        return state.myIncidents.find((incident) => {
          return incident.id === id
        })
      }
    },
    job (state) {
      return (id) => {
        return state.jobRequests.find((job) => {
          return job.id === id
        })
      }
    },
    jobSite (state) {
      return (id) => {
        return state.jobsInProgress.find((job) => {
          return job.id === id
        })
      }
    },
    projectManagers: (state) => state.projectManagers
  },
  plugins: [createPersistedState()]
})
