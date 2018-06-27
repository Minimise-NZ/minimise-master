import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {firestore} from '../firebase'
import createPersistedState from 'vuex-persistedstate'
import moment from 'moment'
var storageRef = firebase.storage().ref()

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
    myIncidents: [],
    allHazards: [],
    myHazards: [],
    notMyHazards: [],
    hazardousSubstances: [],
    taskChanged: '',
    taskAnalysis: [],
    trainingAlerts: []
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
      state.jobRequests = []
      state.myIncidents = []
      state.allHazards = []
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
      console.log('My hazards set')
      state.myHazards = payload
    },
    setNotMyHazards (state, payload) {
      console.log('Not my hazards set')
      state.notMyHazards = payload
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
        firestore.collection('users').add(user)
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
        firestore.collection('users').where('email', '==', payload)
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
    getUser ({commit, state}) {
      let promise = new Promise((resolve, reject) => {
        firestore.collection('users').where('uid', '==', state.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let user = doc.data()
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
        firestore.collection('users').doc(state.userKey)
        .get()
        .then((doc) => {
          firestore.collection('users').doc(doc.id).set(payload, {merge: true})
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
    updateTraining ({dispatch}, payload) {
      // update worker training
      let promise = new Promise((resolve, reject) => {
        let workerId = payload.id
        let training = payload.training
        firestore.collection('users').doc(workerId).set({training: training}, {merge: true})
        .then(() => {
          dispatch('getWorkers')
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
      })
      return promise
    },
    removeWorker ({dispatch}, payload) {
      // update worker training
      let promise = new Promise((resolve, reject) => {
        let workerId = payload.id
        let worker = payload.worker
        firestore.collection('users').doc(workerId).set(worker)
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
      firestore.collection('users').where('email', '==', payload.worker.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          // create a user doc in firestore and send an email invitation to user email
          let user = payload.worker
          user.companyKey = state.companyKey
          user.companyName = state.company.name
          console.log('inviting user', user)
          /*
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
          */
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
        } else {
          // user already exists
          console.log('User already exists')
          return
        }
      })
    },
    getWorkers ({commit, dispatch, state}) {
      // get all workers with company = this companyKey
      let workers = []
      let supervisors = []
      firestore.collection('users').where('companyKey', '==', state.companyKey)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let worker = doc.data()
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
        })
        commit('setSupervisors', supervisors)
        commit('setWorkers', workers)
        dispatch('getTraining')
      })
    },
    getTraining ({commit, state}) {
      let workers = state.workers
      console.log(workers)
      let trainingAlerts = []
      for (let worker of workers) {
        console.log('worker', worker)
        for (let training of worker.training) {
          console.log('training', training)
          if (training.expiry !== '') {
            let alertDate = moment(training.expiry).subtract(14, 'days').format('YYYY-MM-DD')
            if (moment().isAfter(training.expiry)) {
              training.name = worker.name
              training.status = 'Expired'
              trainingAlerts.push(training)
            } else if (moment().isAfter(alertDate)) {
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
        firestore.collection('companies').add(payload)
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
        firestore.collection('companies').doc(state.companyKey)
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

  // job site functions
    newJob ({state, commit, dispatch}, payload) {
      // create new job in firestore jobSites collection
      let promise = new Promise((resolve, reject) => {
        console.log('Creating new job', payload)
        let today = moment().format('DD-MM-YYYY')
        firestore.collection('jobSites').add({
          companyKey: payload.companyKey,
          companyName: payload.companyName,
          medical: payload.medical,
          supervisorName: payload.supervisorName,
          supervisorPhone: payload.supervisorPhone,
          supervisorKey: payload.supervisorKey,
          address: payload.address,
          notifiable: payload.notifiable,
          notifiableurl: payload.notifiableurl,
          environmental: payload.environmental,
          environmentalurl: payload.environmentalurl,
          resource: payload.resource,
          resourceurl: payload.resourceurl,
          open: true,
          date: today
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
        firestore.collection('jobSites').doc(payload.id).set({
          companyKey: payload.companyKey,
          companyName: payload.companyName,
          medical: payload.medical,
          supervisorName: payload.supervisorName,
          supervisorPhone: payload.supervisorPhone,
          supervisorKey: payload.supervisorKey,
          address: payload.address,
          notifiable: payload.notifiable,
          notifiableurl: payload.notifiableurl,
          environmental: payload.environmental,
          environmentalurl: payload.environmentalurl,
          resource: payload.resource,
          resourceurl: payload.resourceurl,
          open: true,
          date: payload.date
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
    closeJob ({dispatch}, payload) {
      // close job in jobSites collection
      let promise = new Promise((resolve, reject) => {
        let jobId = payload.id
        let closedDate = moment().format('DD-MM-YYYY')
        firestore.collection('jobSites').doc(jobId)
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
    getAllJobs ({commit, state}) {
      // get all jobs in progress that are assigned to this company
      let promise = new Promise((resolve, reject) => {
        console.log('getting jobs')
        firestore.collection('jobSites').where('companyKey', '==', state.companyKey).where('open', '==', true)
        .get()
        .then((snapshot) => {
          var jobSites = []
          snapshot.forEach((doc) => {
            // get the safety plans
            firestore.collection('jobSites').doc(doc.id).collection('safetyPlans')
            .get()
            .then((snapshot) => {
              let safetyPlans = []
              snapshot.forEach((doc) => {
                safetyPlans.push(doc.data())
              })
              jobSites.push({
                id: doc.id,
                companyKey: doc.data().companyKey,
                companyName: doc.data().companyName,
                medical: doc.data().medical,
                supervisorName: doc.data().supervisorName,
                supervisorPhone: doc.data().supervisorPhone,
                supervisorKey: doc.data().supervisorKey,
                address: doc.data().address,
                notifiable: doc.data().notifiable,
                notifiableurl: doc.data().notifiableurl,
                environmental: doc.data().environmental,
                environmentalurl: doc.data().environmentalurl,
                resource: doc.data().resource,
                resourceurl: doc.data().resourceurl,
                date: doc.data().date,
                safetyPlans: safetyPlans
              })
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
  // incident functions
    newIncident ({commit, dispatch, state}, payload) {
      // create new incident in firestore
      let promise = new Promise((resolve, reject) => {
        firestore.collection('incidents').add(payload)
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
      firestore.collection('incidents').doc(payload.id).set({
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
        firestore.collection('incidents').where('company', '==', state.companyKey)
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
        firestore.collection('incidents').where('supervisor.key', '==', state.userKey)
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
        firestore.collection('hazards')
        .get()
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
              taskAnalysis: data.taskAnalysis,
              worksafeNotification: data.worksafeNotification
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
    getMyHazards ({commit, dispatch, state}) {
      let promise = new Promise((resolve, reject) => {
        firestore.collection('companies').doc(state.companyKey)
        .collection('hazards')
        .get()
        .then((snapshot) => {
          let hazards = []
          snapshot.forEach((doc) => {
            hazards.push(doc.data())
          })
          if (hazards <= 0 || hazards === undefined || hazards === null) {
            console.log('this company has no hazards')
            hazards = []
            commit('setNotMyHazards', state.allHazards)
            resolve
          } else {
            commit('setMyHazards', hazards)
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
            }
          }
        }
      } else {
        console.log('myHazards length is 0')
      }
      commit('setNotMyHazards', allHazards)
      return
    },
    addHazard ({dispatch, state}, payload) {
      console.log('payload', payload)
      let promise = new Promise((resolve, reject) => {
        let newHazard = firestore.collection('companies').doc(state.companyKey)
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
          taskAnalysis: payload.taskAnalysis,
          worksafeNotification: payload.worksafeNotification
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
      console.log('payload', payload)
      let promise = new Promise((resolve, reject) => {
        firestore.collection('companies').doc(state.companyKey)
        .collection('hazards').doc(payload.id).delete()
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
  // hazardous Substance functions
    getHazSubs ({commit, state}) {
      // get taskAnalysis from company
      firestore.collection('companies').doc(state.companyKey)
      .collection('hazardousSubstances')
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
        let newSubstance = firestore.collection('companies').doc(state.companyKey)
        .collection('hazardousSubstances').doc()
        newSubstance.set({
          id: newSubstance.id,
          PPE: payload.PPE,
          SDS: payload.SDS,
          UN: payload.UN,
          group: payload.group,
          hazClassification: payload.hazClassification,
          hazStatements: payload.hazStatements,
          hazTypes: payload.hazTypes,
          location: payload.location,
          maxQuantity: payload.maxQuantity,
          name: payload.name,
          storageRequirements: payload.storageRequirements,
          subType: payload.subType
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
        firestore.collection('companies').doc(state.companyKey)
        .collection('hazardousSubstances').doc(key).set({
          id: key,
          PPE: payload.PPE,
          SDS: payload.SDS,
          UN: payload.UN,
          group: payload.group,
          hazClassification: payload.hazClassification,
          hazStatements: payload.hazStatements,
          hazTypes: payload.hazTypes,
          location: payload.location,
          maxQuantity: payload.maxQuantity,
          name: payload.name,
          storageRequirements: payload.storageRequirements,
          subType: payload.subType
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
      firestore.collection('companies').doc(state.companyKey)
      .collection('taskAnalysis')
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
        let newTask = firestore.collection('companies').doc(state.companyKey)
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
        let newTask = firestore.collection('companies').doc(state.companyKey)
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
        firestore.collection('companies').doc(state.companyKey)
        .collection('taskAnalysis').doc(taskKey).set({
          title: task.title,
          worksafe: task.worksafe,
          signage: task.signage,
          ppeRequired: task.ppeRequired,
          ppe: task.ppe,
          plantRequired: task.plantRequired,
          plant: task.plant,
          steps: task.steps,
          id: taskKey
        })
        .then(() => {
          console.log('TA saved')
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
    workers: (state) => state.workers,
    supervisors: (state) => state.supervisors,
    training: (state) => state.trainingAlerts,
    jobsInProgress: (state) => state.jobsInProgress,
    allHazards: (state) => state.allHazards,
    myHazards: (state) => state.myHazards,
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
    taskAnalysis: (state) => state.taskAnalysis
  },
  plugins: [createPersistedState()]
})
