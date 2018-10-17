import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {firestore} from '../firebase'
import createPersistedState from 'vuex-persistedstate'
import moment from 'moment'
var storageRef = firebase.storage().ref()

const today = moment().format('DD-MM-YYYY')
// const now = moment().format('DD-MM-YYYY hh:mm')
const usersRef = firestore.collection('users')
const companiesRef = firestore.collection('companies')
const trainingRef = firestore.collection('training')
const jobSitesRef = firestore.collection('jobSites')
const toolboxRef = firestore.collection('toolbox')
const incidentsRef = firestore.collection('incidents')
const hazardsRef = firestore.collection('hazards')
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userKey: '',
    user: {},
    uid: '',
    workers: [],
    supervisors: [],
    company: {},
    companyKey: '',
    companyIndex: [],
    jobsInProgress: [],
    currentJob: {},
    safetyPlan: {},
    myIncidents: [],
    allHazards: [],
    myHazards: [],
    hazardList: [],
    notMyHazards: [],
    hazardousSubstances: [],
    taskChanged: '',
    taskAnalysis: [],
    trainingAlerts: [],
    trainingList: []
  },
  mutations: {
    clearStore (state) {
      state.userKey = ''
      state.uid = ''
      state.user = {}
      state.workers = []
      state.supervisors = []
      state.company = {}
      state.companyKey = ''
      state.companyIndex = []
      state.jobsInProgress = []
      state.safetyPlan = {}
      state.jobRequests = []
      state.currentJob = {}
      state.myIncidents = []
      state.allHazards = []
      state.hazardList = []
      state.myHazards = []
      state.taskChanged = ''
      state.taskAnalysis = []
      state.notMyHazards = []
      state.hazardousSubstances = []
      state.trainingAlerts = []
    },
    setUserKey (state, payload) {
      console.log('Userkey set')
      state.userKey = payload
    },
    setUID (state, payload) {
      console.log('UID set')
      state.uid = payload
    },
    setUser (state, payload) {
      console.log('User profile set')
      state.user = payload
    },
    setWorkers (state, payload) {
      console.log('Workers set')
      state.workers = payload
    },
    setSupervisors (state, payload) {
      console.log('Supervisors set')
      state.supervisors = payload
    },
    setTrainingAlerts (state, payload) {
      console.log('Training alerts set')
      state.trainingAlerts = payload
    },
    setTrainingList (state, payload) {
      console.log('Training set')
      state.trainingList = payload
    },
    setCompany (state, payload) {
      console.log('Company set')
      state.company = payload
    },
    setCompanyKey (state, payload) {
      console.log('CompanyKey set', payload)
      state.companyKey = payload
    },
    setCompanyIndex (state, payload) {
      state.companyIndex = payload
    },
    setJobs (state, payload) {
      state.jobsInProgress = payload
      console.log('Jobs in progress set')
    },
    setCurrentJob (state, payload) {
      console.log('setting current job', payload)
      state.currentJob = payload
    },
    setSafetyPlan (state, payload) {
      console.log('setting safety plan', payload)
      state.safetyPlan = payload
    },
    setAllHazards (state, payload) {
      state.allHazards = payload
      console.log('All hazards set')
    },
    setTaskChanged (state, payload) {
      state.taskChanged = payload
    },
    setTaskAnalysis (state, payload) {
      state.taskAnalysis = payload
      console.log('Task Analysis set')
    },
    addNewTask (state, payload) {
      state.taskAnalysis.push(payload)
    },
    setMyHazards (state, payload) {
      console.log('My hazards set', payload)
      state.myHazards = payload
    },
    setNotMyHazards (state, payload) {
      console.log('Not my hazards set', payload)
      state.notMyHazards = payload
    },
    setHazardList (state, payload) {
      console.log('Hazard List set', payload)
      state.hazardList = payload
    },
    setHazardousSubstances (state, payload) {
      console.log('Hazardous Substances set')
      state.hazardousSubstances = payload
    },
    setIncidents (state, payload) {
      console.log('Incidents set')
      state.myIncidents = payload
    }
  },
  actions: {
  // user functions
    signUp ({commit}, payload) {
      // create a new user in firebase
      let promise = new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setUID', user.uid)
          resolve(user.uid)
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    signIn ({commit}, payload) {
      let promise = new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            resolve()
          }
        )
        .catch(
          error => {
            reject(error)
          }
        )
      })
      return promise
    },
    autoSignIn ({commit}, payload) {
      commit('setUID', payload)
    },
    passwordReset ({state}, payload) {
      firebase.auth().sendPasswordResetEmail(payload)
        .then(() => {
        // Email sent.
          alert('A password reset email has been sent')
        })
        .catch(function (error) {
          alert('Oops something went wrong', error)
          console.log(error, error.message)
        })
    },
    newUserProfile ({commit, getters}, payload) {
      // add user profile to firestore after creating a user sign in
      let user = payload
      commit('setUser', user)
      let promise = new Promise((resolve, reject) => {
        usersRef.add(user)
        .then((doc) => {
          commit('setUserKey', doc.id)
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    getPendingUser ({commit, dispatch}, payload) {
      // get user doc with email = this.email
      let promise = new Promise((resolve, reject) => {
        usersRef.where('email', '==', payload)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            reject('This email has not been registered. Please contact your administrator')
          } else {
            snapshot.forEach((doc) => {
              let user = doc.data()
              if (user.uid) {
                reject('User already exists. Please log in with existing user details')
              } else {
                commit('setUserKey', doc.id)
                resolve(user)
              }
            })
          }
        })
        .catch((error) => {
          reject(error)
        })
      })
      return promise
    },
    getUser ({commit, dispatch, state}) {
      let promise = new Promise((resolve, reject) => {
        usersRef.where('uid', '==', state.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let user = doc.data()
            if (user.hasOwnProperty('currentJob')) {
              let now = Date.now().toString().slice(0, 10)
              console.log(user.currentJob.expiry.seconds)
              if (now > user.currentJob.expiry) {
                console.log('current job expired', now, user.currentJob.expiry.seconds)
                user.currentJob = {}
                dispatch('updateCurrentUser', user)
              } else {
                console.log('not expired', now, user.currentJob.expiry.seconds)
              }
            }
            commit('setUser', user)
            commit('setUserKey', doc.id)
            commit('setCompanyKey', user.companyKey)
            resolve(user)
          })
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    updateCurrentUser ({commit, state}, payload) {
      let promise = new Promise((resolve, reject) => {
        usersRef.doc(state.userKey)
        .get()
        .then((doc) => {
          usersRef.doc(doc.id).set(payload, {merge: true})
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
  // worker functions
    updateWorker ({dispatch}, payload) {
      // update worker training
      let promise = new Promise((resolve, reject) => {
        let workerId = payload.id
        let worker = payload.worker
        usersRef.doc(workerId).set(worker, {merge: true})
        .then(() => {
          dispatch('getWorkers')
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    inviteUser ({dispatch, state}, payload) {
      // check that user does not already exist
      usersRef.where('email', '==', payload.worker.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          // create a user doc in firestore and send an email invitation to user email
          let user = payload.worker
          user.companyKey = state.companyKey
          user.companyName = state.company.name
          if (user.role !== 'Worker') {
            window.emailjs.send('my_service', 'invitation', {
              name: user.name,
              email: user.email,
              from: state.user.name
            })
            .then(
              function (response) {
                console.log('Email SUCCESS', response)
              },
              function (error) {
                console.log('Email FAILED', error)
              }
            )
          }
          /*
          let promise = new Promise((resolve, reject) => {
            firestore.collection('users').add(user)
            .then((doc) => {
              dispatch('getWorkers')
              resolve()
            })
            .catch((error) => {
              console.log(error)
              reject()
            })
          })
          return promise
          */
        } else {
          // user already exists
          console.log('User already exists')
          return
        }
      })
    },
    getWorkers ({commit, dispatch, state}) {
      // get all workers with company = this companyKey
      let promise = new Promise((resolve, reject) => {
        let workers = []
        let supervisors = []
        usersRef.where('companyKey', '==', state.companyKey).orderBy('name')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let worker = doc.data()
            if (worker.addTraining !== false) {
              workers.push({
                id: doc.id,
                name: worker.name,
                admin: worker.admin,
                email: worker.email,
                companyKey: worker.companyKey,
                companyName: worker.companyName,
                phone: worker.phone,
                role: worker.role,
                training: worker.training,
                webUser: worker.webUser
              })
              if (worker.role === 'Supervisor') {
                supervisors.push({
                  key: doc.id,
                  name: worker.name,
                  phone: worker.phone
                })
              }
            }
          })
        })
        .then(() => {
          commit('setSupervisors', supervisors)
          commit('setWorkers', workers)
          dispatch('getTraining')
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
  // company functions
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
      let promise = new Promise((resolve, reject) => {
        const companyName = payload.name
        commit('setCompany', payload)
        companiesRef.add(payload)
        .then((doc) => {
          commit('setCompanyKey', doc.id)
          firestore.collection('companyIndex').doc(doc.id).set({
            name: companyName
          })
          resolve(doc.id)
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    getCompany ({commit, state}) {
      let promise = new Promise((resolve, reject) => {
        companiesRef.doc(state.companyKey)
        .get()
        .then((doc) => {
          let company = doc.data()
          commit('setCompany', company)
          resolve(company)
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
  // training functions
    getTraining ({commit, state}) {
      console.log('getting training')
      let trainingAlerts = []
      let workers = state.workers
      let alertDate = moment().add(14, 'days')
      console.log('alert date', alertDate)
      for (let worker of workers) {
        if (worker.addTraining === false) {
          continue
        }
        for (let training of worker.training) {
          if (training.expiry !== '') {
            if (moment().isAfter(training.expiry)) {
              training.name = worker.name
              training.status = 'Expired'
              trainingAlerts.push(training)
            } else if (moment(training.expiry).isBefore(alertDate)) {
              training.name = worker.name
              training.status = 'Due to expire'
              trainingAlerts.push(training)
            }
          } else {
            training.name = worker.name
            training.status = 'Incomplete'
            trainingAlerts.push(training)
          }
        }
      }
      commit('setTrainingAlerts', trainingAlerts)
    },
    getTrainingList ({commit, state}) {
      trainingRef.doc('z660voHfSYY7pN7zS4vy')
      .get()
      .then((doc) => {
        let data = doc.data().items.sort()
        let list = [
          {value: null, text: 'Please select training'},
          {value: 'custom', text: 'I dont see what I am looking for'}
        ]
        data.forEach((item) => {
          list.push({value: item, text: item.toString()})
        })
        commit('setTrainingList', list)
      })
    },
    updateTraining ({dispatch}, payload) {
      // update worker training
      let promise = new Promise((resolve, reject) => {
        let workers = payload
        workers.forEach((item, index, object) => {
          usersRef.doc(item.id).set({training: item.training}, {merge: true})
          .then(() => {
            dispatch('getWorkers')
            .then(() => {
              resolve()
            })
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
        })
      })
      return promise
    },
    newTraining ({dispatch, state}, payload) {
      let promise = new Promise((resolve, reject) => {
        var userRef = usersRef.doc(payload.worker)
        userRef.update({
          training: firebase.firestore.FieldValue.arrayUnion(payload.training)
        })
        .then(() => {
          dispatch('getWorkers')
          .then(() => {
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject()
          })
        })
      })
      return promise
    },
  // job site functions
    newJob ({state, commit, dispatch}, payload) {
      // create new job in firestore jobSites collection
      let promise = new Promise((resolve, reject) => {
        console.log('Creating new job', payload)
        jobSitesRef.add({
          address: payload.address,
          medical: payload.medical,
          companyKey: payload.companyKey,
          companyName: payload.companyName,
          supervisorKey: payload.supervisorKey,
          supervisorName: payload.supervisorName,
          supervisorPhone: payload.supervisorPhone,
          notifiable: payload.notifiable,
          notifiableurl: payload.notifiableurl,
          environmental: payload.environmental,
          environmentalurl: payload.environmentalurl,
          resource: payload.resource,
          resourceurl: payload.resourceurl,
          nzhpt: payload.nzhpt,
          nzhpturl: payload.nzhpturl,
          docs: payload.docs,
          firstAiders: payload.firstAiders,
          firstAidKit: payload.firstAidKit,
          fireExtinguisher: payload.fireExtinguisher,
          emergencyPlanURL: payload.emergencyPlanURL,
          emergencyInfo: payload.emergencyInfo,
          task: payload.task,
          toolboxFrequency: payload.toolboxFrequency,
          inspectionFrequency: payload.inspectionFrequency,
          additionalInfo: payload.additionalInfo,
          open: true,
          date: Date.now()
        })
        .then(() => {
          dispatch('getAllJobs')
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    uploadFile ({state}, payload) {
      console.log('uploading', payload)
      var promise = new Promise((resolve, reject) => {
        let type = payload.type
        let file = payload.file
        let filename = type + moment().unix()
        const task = storageRef.child('/docs/' + filename).put(file)
        task.then((snapshot) => {
          let URL = snapshot.downloadURL
          console.log(URL)
          resolve(URL)
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    updateJob ({dispatch}, payload) {
      let promise = new Promise((resolve, reject) => {
        jobSitesRef.doc(payload.id).set({
          address: payload.address,
          medical: payload.medical,
          companyKey: payload.companyKey,
          companyName: payload.companyName,
          supervisorKey: payload.supervisorKey,
          supervisorName: payload.supervisorName,
          supervisorPhone: payload.supervisorPhone,
          notifiable: payload.notifiable,
          notifiableurl: payload.notifiableurl,
          environmental: payload.environmental,
          environmentalurl: payload.environmentalurl,
          resource: payload.resource,
          resourceurl: payload.resourceurl,
          nzhpt: payload.nzhpt,
          nzhpturl: payload.nzhpturl,
          docs: payload.docs,
          firstAiders: payload.firstAiders,
          firstAidKit: payload.firstAidKit,
          fireExtinguisher: payload.fireExtinguisher,
          emergencyPlanURL: payload.emergencyPlanURL,
          emergencyInfo: payload.emergencyInfo,
          task: payload.task,
          toolboxFrequency: payload.toolboxFrequency,
          inspectionFrequency: payload.inspectionFrequency,
          additionalInfo: payload.additionalInfo,
          open: payload.open,
          date: payload.date,
          signInRegister: payload.signInRegister,
          inductionRegister: payload.inductionRegister
        })
        .then(() => {
          resolve()
        })
        .catch((err) => {
          console.log(err)
          reject()
        })
      })
      return promise
    },
    storeSafetyPlan ({commit}, payload) {
      commit('setSafetyPlan', payload)
    },
    newToolbox ({state, commit}, payload) {
      console.log(payload)
      let promise = new Promise((resolve, reject) => {
        toolboxRef.doc(today + payload.jobKey).set({
          supervisorName: state.user.name,
          date: today,
          jobKey: payload.jobKey,
          topics: payload.topics,
          issues: payload.issues,
          observations: payload.observations,
          jobsCompleted: payload.jobsCompleted,
          attendees: []
        })
        .then(() => {
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    getToolbox ({commit}, payload) {
      let promise = new Promise((resolve, reject) => {
        console.log('getting toolbox')
        toolboxRef.doc(today + payload)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log('toolbox found', doc.data())
            resolve(doc.data())
          } else {
            resolve(null)
          }
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    closeJob ({dispatch}, payload) {
      // close job in jobSites collection
      let promise = new Promise((resolve, reject) => {
        let jobId = payload
        let closedDate = today
        jobSitesRef.doc(jobId)
        .update({'open': false, 'closedDate': closedDate})
        .then(() => {
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    getAllJobs ({commit, dispatch, state}) {
      // get all jobs in progress that are assigned to this company
      let promise = new Promise((resolve, reject) => {
        console.log('getting jobs')
        jobSitesRef.where('companyKey', '==', state.companyKey).where('open', '==', true)
        .get()
        .then((snapshot) => {
          var jobSites = []
          snapshot.forEach((doc) => {
            let job = doc.data()
            job.id = doc.id
            jobSites.push({
              job
            })
          })
          commit('setJobs', jobSites)
          resolve()
        })
        .catch((error) => {
          console.log('Error getting documents: ', error)
          reject(error)
        })
        return promise
      })
    },
  // sign in and induction registers
    jobSignOn ({state, dispatch}, payload) {
      // sign user into job site
      let jobKey = payload
      if (Vue._.isEmpty(state.currentJob) === false) {
        dispatch('signOutCurrentJob', state.currentJob.id)
      }
      let promise = new Promise((resolve, reject) => {
        let docKey = today + state.userKey
        console.log(docKey)
        var signInRegisterRef = jobSitesRef.doc(jobKey).collection('signInRegister').doc(docKey)
        signInRegisterRef.set({
          id: state.userKey,
          name: state.user.name,
          date: today,
          signedIn: Date.now(),
          signedOut: null,
          companyName: state.user.companyName,
          companyKey: state.user.companyKey
        })
        .then(() => {
          dispatch('setCurrentJob', jobKey)
        })
        .then(() => {
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    setCurrentJob ({state, commit}, payload) {
      let promise = new Promise((resolve, reject) => {
        let currentJob = {}
        currentJob.id = payload
        var now = new Date()
        // set expiry for now + 12hours
        currentJob.expiry = new Date(now.getTime() + (12 * 1000 * 60 * 60))
        usersRef.doc(state.userKey).set({currentJob}, {merge: true})
        .then(() => {
          commit('setCurrentJob', currentJob)
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    signOutCurrentJob ({state, dispatch, commit}, payload) {
      // update Sign in register
      console.log('signing out')
      let promise = new Promise((resolve, reject) => {
        let docKey = today + state.userKey
        var signInRegisterRef = jobSitesRef.doc(payload).collection('signInRegister').doc(docKey)
        signInRegisterRef.set({signedOut: Date.now()}, {merge: true})
        .then(() => {
          commit('setCurrentJob', {})
          dispatch('getAllJobs')
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    getSignedIn ({state}, payload) {
      let promise = new Promise((resolve, reject) => {
        jobSitesRef.doc(payload).collection('signInRegister')
        .where('date', '==', today).where('signedOut', '==', null)
        .get()
        .then((snapshot) => {
          var signedIn = []
          if (snapshot.empty) {
            resolve(signedIn)
          } else {
            snapshot.forEach((doc) => {
              let worker = doc.data()
              signedIn.push({
                name: worker.name,
                time: worker.signedIn
              })
            })
            console.log(signedIn)
            resolve(signedIn)
          }
        })
        .catch((error) => {
          console.log('Error getting sign in register: ', error)
          reject(error)
        })
      })
      return promise
    },
    getSignInRegister ({state}, payload) {
      let promise = new Promise((resolve, reject) => {
        jobSitesRef.doc(payload).collection('signInRegister')
        .get()
        .then((snapshot) => {
          var register = []
          if (snapshot.empty) {
            resolve(null)
          } else {
            snapshot.forEach((doc) => {
              console.log(doc.data())
              let worker = doc.data()
              register.push({
                name: worker.name,
                company: worker.companyName,
                signedIn: worker.signedIn,
                signedOut: worker.signedOut
              })
            })
            resolve(register)
          }
        })
        .catch((error) => {
          console.log('Error getting sign in register: ', error)
          reject(error)
        })
      })
      return promise
    },
  // incident functions
    newIncident ({commit, dispatch, state}, payload) {
      // create new incident in firestore
      let promise = new Promise((resolve, reject) => {
        incidentsRef.add(payload)
        .then(() => {
          // if admin getAllIncidents, else getMyIncidents
          if (state.user.admin === true) {
            dispatch('getAllIncidents')
          } else {
            dispatch('getMyIncidents')
          }
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    updateIncident ({state, dispatch}, payload) {
      incidentsRef.doc(payload.id).set({
        address: payload.address,
        date: payload.date,
        reportedBy: payload.reportedBy,
        type: payload.type,
        description: payload.description,
        company: payload.company,
        injury: payload.injury,
        injuryDescription: payload.injuryDescription,
        plant: payload.plant,
        plantDamage: payload.plantDamage,
        cause: payload.cause,
        corrective: payload.corrective,
        open: payload.open,
        supervisorName: payload.supervisorName,
        supervisorKey: payload.supervisorKey
      })
      if (state.user.admin === true) {
        dispatch('getAllIncidents')
      } else {
        dispatch('getMyIncidents')
      }
    },
    getAllIncidents ({commit, state}) {
      let promise = new Promise((resolve, reject) => {
        let incidents = []
        incidentsRef.where('company', '==', state.companyKey)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let obj = doc.data()
            let key = doc.id
            incidents.push({
              id: key,
              address: obj.address,
              date: obj.date,
              company: obj.company,
              reportedBy: obj.reportedBy,
              type: obj.type,
              description: obj.description,
              injury: obj.injury,
              injuryDescription: obj.injuryDescription,
              plant: obj.plant,
              plantDamage: obj.plantDamage,
              cause: obj.cause,
              corrective: obj.corrective,
              open: obj.open,
              supervisorName: obj.supervisorName,
              supervisorKey: obj.supervisorKey
            })
          })
          commit('setIncidents', incidents)
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
    getMyIncidents ({commit, state}) {
      let promise = new Promise((resolve, reject) => {
        let incidents = []
        incidentsRef.where('supervisor.key', '==', state.userKey)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let obj = doc.data()
            let key = doc.id
            incidents.push({
              id: key,
              address: obj.address,
              date: obj.date,
              company: obj.company,
              reportedBy: obj.reportedBy,
              type: obj.type,
              description: obj.description,
              injury: obj.injury,
              injuryDescription: obj.injuryDescription,
              plant: obj.plant,
              plantDamage: obj.plantDamage,
              cause: obj.cause,
              corrective: obj.corrective,
              open: obj.open,
              supervisorName: obj.supervisorName,
              supervisorKey: obj.supervisorKey
            })
          })
          commit('setIncidents', incidents)
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
      })
      return promise
    },
  // hazard functions
    getAllHazards ({commit, state}, payload) {
      const allHazards = []
      let promise = new Promise((resolve, reject) => {
        hazardsRef.get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let data = doc.data()
            let hazard = {
              id: doc.id,
              name: data.name,
              imageURL: data.imageURL,
              thumb: data.thumb,
              IRA: data.IRA,
              RRA: data.RRA,
              controls: data.controls,
              risks: data.risks,
              controlLevel: data.controlLevel
            }
            allHazards.push(hazard)
          })
          commit('setAllHazards', allHazards)
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
      })
      return promise
    },
    getHazardList ({commit, state}) {
      let hazardList = [{value: null, text: 'Please select hazard'}]
      let list = state.myHazards
      list.forEach((item, index, object) => {
        hazardList.push({
          value: item.id, text: item.name
        })
      })
      commit('setHazardList', hazardList)
    },
    getMyHazards ({commit, dispatch, state}) {
      let promise = new Promise((resolve, reject) => {
        companiesRef.doc(state.companyKey).collection('hazards')
        .get()
        .then((snapshot) => {
          let hazards = []
          snapshot.forEach((doc) => {
            hazards.push(doc.data())
          })
          if (hazards <= 0 || hazards === undefined || hazards === null) {
            hazards = []
            commit('setMyHazards', hazards)
            commit('setNotMyHazards', state.allHazards)
            resolve
          } else {
            commit('setMyHazards', hazards)
            dispatch('getHazardList')
            dispatch('getNotMyHazards')
            resolve
          }
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
      })
      return promise
    },
    getNotMyHazards ({commit, state}) {
      let myHazards = state.myHazards.slice(0)
      let allHazards = state.allHazards.slice(0)
      if (myHazards.length !== 0) {
        for (var i = allHazards.length - 1; i > -1; i--) {
          for (var j = myHazards.length - 1; j > -1; j--) {
            if (allHazards[i].id === myHazards[j].id) {
              allHazards.splice(i, 1)
              break
            }
          }
        }
      }
      commit('setNotMyHazards', allHazards)
      return
    },
    addHazard ({dispatch, state}, payload) {
      let promise = new Promise((resolve, reject) => {
        let newHazard = companiesRef.doc(state.companyKey)
        .collection('hazards').doc(payload.id)
        newHazard.set({
          id: payload.id,
          name: payload.name,
          imageURL: payload.imageURL,
          thumb: payload.thumb,
          IRA: payload.IRA,
          RRA: payload.RRA,
          controls: payload.controls,
          risks: payload.risks,
          controlLevel: payload.controlLevel
        })
        .then(() => {
          dispatch('getMyHazards')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
      })
      return promise
    },
    removeHazard ({dispatch, state}, payload) {
      let promise = new Promise((resolve, reject) => {
        companiesRef.doc(state.companyKey)
        .collection('hazards').doc(payload.id).delete()
        .then(() => {
          dispatch('getMyHazards')
          .then(() => {
            resolve()
          })
        })
        .catch((error) => {
          reject(error)
        })
      })
      return promise
    },
  // hazardous Substance functions
    getHazSubs ({commit, state}) {
      // get taskAnalysis from company
      companiesRef.doc(state.companyKey).collection('hazardousSubstances')
      .get()
      .then((snapshot) => {
        let hazSubs = []
        snapshot.forEach((doc) => {
          hazSubs.push(doc.data())
        })
        commit('setHazardousSubstances', hazSubs)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    newHazardousSubstance ({commit, dispatch, state}, payload) {
      let promise = new Promise((resolve, reject) => {
        let newSubstance = companiesRef.doc(state.companyKey).collection('hazardousSubstances').doc()
        newSubstance.set({
          id: newSubstance.id,
          name: payload.name,
          hazTypes: payload.hazTypes,
          potentialHarm: payload.potentialHarm,
          storage: payload.storage,
          PPE: payload.PPE,
          actions: payload.actions,
          sds: payload.sds
        })
        .then(() => {
          dispatch('getHazSubs')
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
      })
      return promise
    },
    updateSubstance ({dispatch, state}, payload) {
      let promise = new Promise((resolve, reject) => {
        let key = payload.id
        companiesRef.doc(state.companyKey).collection('hazardousSubstances').doc(key).set({
          id: key,
          name: payload.name,
          hazTypes: payload.hazTypes,
          potentialHarm: payload.potentialHarm,
          storage: payload.storage,
          PPE: payload.PPE,
          actions: payload.actions,
          sds: payload.sds
        })
        .then(() => {
          dispatch('getHazSubs')
          resolve()
        })
        .catch((error) => {
          dispatch('getHazSubs')
          reject(error)
        })
      })
      return promise
    },
  // task analysis functions
    getTaskAnalysis ({commit, state}) {
      // get taskAnalysis from company
      companiesRef.doc(state.companyKey).collection('taskAnalysis')
      .get()
      .then((snapshot) => {
        let tasks = []
        snapshot.forEach((doc) => {
          tasks.push(doc.data())
        })
        commit('setTaskAnalysis', tasks)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    newTaskAnalysis ({commit, dispatch, state}, payload) {
      // create new Task Analysis in firestore
      let promise = new Promise((resolve, reject) => {
        let title = payload
        let newTask = companiesRef.doc(state.companyKey).collection('taskAnalysis').doc()
        newTask.set({
          title: title,
          id: newTask.id,
          ppe: '',
          plant: '',
          signage: '',
          steps: [{description: '', hazards: []}]
        })
        .then(() => {
          dispatch('getTaskAnalysis')
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
      })
      return promise
    },
    createTaskAnalysis ({commit, dispatch, state}, payload) {
      // create base Task Analysis in firestore
      let titles = ['Working at Heights > 5m', 'Work in confined spaces', 'Work in an excavation > 1.5m']
      for (let title of titles) {
        let newTask = companiesRef.doc(state.companyKey)
        .collection('taskAnalysis').doc()
        newTask.set({
          title: title,
          worksafe: false,
          signage: false,
          ppeRequired: false,
          ppe: '',
          plantRequired: false,
          plant: '',
          steps: [{
            description: '',
            hazards: '',
            controls: ''
          }],
          id: newTask.id
        })
      }
      dispatch('getTaskAnalysis')
    },
    updateTaskAnalysis ({commit, dispatch, state}, payload) {
      let promise = new Promise((resolve, reject) => {
        let taskKey = payload.task.id
        let task = payload.task
        companiesRef.doc(state.companyKey).collection('taskAnalysis').doc(taskKey)
        .set({
          id: task.id,
          plant: task.plant,
          ppe: task.ppe,
          signage: task.signage,
          steps: task.steps,
          title: task.title
        })
        .then(() => {
          dispatch('getTaskAnalysis')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
      })
      return promise
    },
    submitFeedback ({state}, payload) {
      // send an email to Minimse support
      let promise = new Promise((resolve, reject) => {
        let form = payload
        window.emailjs.send('my_service', 'support', {
          username: form.username,
          userEmail: form.userEmail,
          subject: form.subject,
          platform: form.platform,
          os: form.os,
          mobile: form.mobile,
          details: form.details
        })
        .then(
          function (response) {
            console.log('Email SUCCESS', response)
            resolve(response)
          },
          function (error) {
            console.log('Email FAILED', error)
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
    uid: (state) => state.uid,
    companyKey: (state) => state.companyKey,
    companyIndex: (state) => state.companyIndex,
    company: (state) => state.company,
    trainingList: (state) => state.trainingList,
    workers: (state) => state.workers,
    supervisors: (state) => state.supervisors,
    training: (state) => state.trainingAlerts,
    jobsInProgress: (state) => state.jobsInProgress,
    currentJob: (state) => state.currentJob,
    safetyPlan: (state) => state.safetyPlan,
    allHazards: (state) => state.allHazards,
    myHazards: (state) => state.myHazards,
    hazardList: (state) => state.hazardList,
    taskChanged: (state) => state.taskChanged,
    notMyHazards: (state) => state.notMyHazards,
    hazardousSubstances: (state) => state.hazardousSubstances,
    incidents (state) {
      let incidents = state.myIncidents
      incidents = Vue._.orderBy(incidents, ['open', 'actionOwner'], ['desc', 'asc'])
      return incidents
    },
    incident (state) {
      return (id) => {
        return state.myIncidents.find((incident) => {
          return incident.id === id
        })
      }
    },
    hazard (state) {
      return (id) => {
        return state.myHazards.find((hazard) => {
          return hazard.id === id
        })
      }
    },
    plan (state) {
      return (id) => {
        return state.safetyPlans.find((plan) => {
          return plan.id === id
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
    taskAnalysis: (state) => state.taskAnalysis
  },
  plugins: [createPersistedState()]
})
