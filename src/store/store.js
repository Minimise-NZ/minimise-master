import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {firestore} from '../firebase'
import createPersistedState from 'vuex-persistedstate'
import moment from 'moment'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userKey: '',
    user: {},
    uid: '',
    workers: [],
    company: null,
    companyKey: '',
    companyIndex: [],
    projectManagers: [],
    jobsInProgress: null,
    jobRequests: [],
    myIncidents: [],
    allHazards: [],
    myHazards: [],
    notMyHazards: [],
    taskAnalysis: [],
    trainingAlerts: []
  },
  mutations: {
    clearStore (state) {
      state.userKey = ''
      state.uid = ''
      state.user = {}
      state.workers = []
      state.company = {}
      state.companyKey = ''
      state.companyIndex = []
      state.jobsInProgress = null
      state.jobRequests = []
      state.myIncidents = []
      state.allHazards = []
      state.myHazards = []
      state.notMyHazards = []
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
    setProjectManagers (state, payload) {
      state.projectManagers = payload
    },
    setRequests (state, payload) {
      state.jobRequests = payload
      console.log('Job requests set')
    },
    setJobs (state, payload) {
      state.jobsInProgress = payload
      console.log('Jobs in progress set')
    },
    setAllHazards (state, payload) {
      state.allHazards = payload
      console.log('All hazards set')
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
          console.log('User registered')
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
      console.log(payload)
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
          console.log('User updated')
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
            commit('setCompanyKey', user.company)
            console.log('User profile set')
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
          console.log('User updated')
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
        let training = payload.training
        firestore.collection('users').doc(workerId).set({training: training}, {merge: true})
        .then(() => {
          console.log('Worker training updated')
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
    removeWorker ({dispatch}, payload) {
      // update worker training
      let promise = new Promise((resolve, reject) => {
        console.log(payload)
        let workerId = payload.id
        let worker = payload.worker
        firestore.collection('users').doc(workerId).set(worker)
        .then(() => {
          console.log('Worker removed')
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
          user.company = state.companyKey
          user.companyName = state.company.name
          user.companyType = state.user.companyType
          console.log('inviting user', user)
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
          let promise = new Promise((resolve, reject) => {
            firestore.collection('users').add(user)
            .then((doc) => {
              console.log('User updated', doc.id)
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
      firestore.collection('users').where('company', '==', state.companyKey)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          workers.push({id: doc.id, worker: doc.data()})
        })
        commit('setWorkers', workers)
        if (state.user.admin === true) {
          dispatch('getTraining')
        }
      })
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
          console.log('company created')
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
    // job site functions
    newJob ({state, commit, dispatch}, payload) {
      // create new job in firestore jobSites collection
      let promise = new Promise((resolve, reject) => {
        let subcontractors = payload.subcontractors
        let approved = {}
        let today = moment().format('DD-MM-YYYY')
        subcontractors.forEach((val) => {
          let key = val.key
          approved[key] = false
        })
        firestore.collection('jobSites').add({
          principalKey: payload.principalKey,
          principalName: payload.principalName,
          medical: payload.medical,
          medPhone: payload.medPhone,
          pm: payload.pm,
          pmPhone: payload.pmPhone,
          pmKey: payload.pmKey,
          hse: payload.hse,
          hsePhone: payload.hsePhone,
          address: payload.address,
          notifiable: payload.notifiable,
          info: payload.info,
          approved: approved,
          open: true,
          date: today
        })
        .then((doc) => {
          let jobId = doc.id
          subcontractors.forEach((val) => {
            firestore.collection('companies').doc(val.key).collection('jobSites').doc(jobId)
            .set({
              approved: false,
              open: true
            })
          })
          if (state.user.admin === true) {
            dispatch('getAllJobs')
          } else {
            dispatch('getMyJobs')
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
    addSiteContractor ({dispatch}, payload) {
      // update contractor information
      let approved = {}
      for (let index in payload.contractors) {
        let key = payload.contractors[index].key
        approved[key] = false
      }
      firestore.collection('jobSites').doc(payload.id)
      .set({'approved': approved}, {merge: true})
      .then(() => {
        dispatch('getJobs')
      })
    },
    approveContractor ({state, dispatch}, payload) {
      // add agreement to job sites agreement collection
      let approved = {}
      let key = state.companyKey
      approved[key] = true
      firestore.collection('jobSites').doc(payload.job.id)
      .collection('agreements').doc(key).set(payload.form)
      // update job site contractorKey approved to true
      firestore.collection('jobSites').doc(payload.job.id).set({'approved': approved}, {merge: true})
      // update companies jobSites approved to true
      firestore.collection('companies').doc(key)
      .collection('jobSites').doc(payload.job.id).update({'approved': true})
      .then(() => {
        console.log('job updated')
        dispatch('getJobRequests')
      })
    },
    closeJob ({dispatch}, payload) {
      // close job in jobSites collection and close job in each comapnies jobSite list
      let promise = new Promise((resolve, reject) => {
        let contractors = payload.contractors
        let jobId = payload.id
        let closedDate = moment().format('DD-MM-YYYY')
        firestore.collection('jobSites').doc(jobId)
        .update({'open': false, 'closedDate': closedDate})
        .then(() => {
          contractors.forEach((val) => {
            firestore.collection('companies').doc(val.key).collection('jobSites').doc(jobId)
            .set({open: false}, {merge: true})
          })
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
      // get all jobs in progress that are assigned to this company as principal
      let promise = new Promise((resolve, reject) => {
        firestore.collection('jobSites').where('principalKey', '==', state.companyKey).where('open', '==', true)
        .get()
        .then((snapshot) => {
          var jobSites = []
          snapshot.forEach((doc) => {
            let list = []
            let contractors = doc.data().approved
            // get the contractor name from companyIndex
            for (let key in contractors) {
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
                address: doc.data().address,
                date: doc.data().date,
                hse: doc.data().hse,
                medical: doc.data().medical,
                hsePhone: doc.data().hsePhone,
                info: doc.data().info,
                notifiable: doc.data().notifiable,
                pm: doc.data().pm,
                pmPhone: doc.data().pmPhone,
                contractors: list,
                safetyPlans: safetyPlans
              })
            })
          })
          commit('setJobs', jobSites)
          console.log(jobSites)
          resolve()
        })
        .catch((error) => {
          console.log('Error getting documents: ', error)
          reject(error)
        })
        return promise
      })
    },
    getMyJobs ({commit, state}) {
      // get all jobs in progress that are assigned to this project manager
      let promise = new Promise((resolve, reject) => {
        firestore.collection('jobSites').where('pmKey', '==', state.userKey).where('open', '==', true)
        .get()
        .then((snapshot) => {
          var jobSites = []
          snapshot.forEach((doc) => {
            let list = []
            let contractors = doc.data().approved
            // get the contractor name from companyIndex
            for (let key in contractors) {
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
                address: doc.data().address,
                date: doc.data().date,
                hse: doc.data().hse,
                medical: doc.data().medical,
                hsePhone: doc.data().hsePhone,
                info: doc.data().info,
                notifiable: doc.data().notifiable,
                pm: doc.data().pm,
                pmPhone: doc.data().pmPhone,
                contractors: list,
                safetyPlans: safetyPlans
              })
            })
          })
          commit('setJobs', jobSites)
          resolve(jobSites)
        })
        .catch((error) => {
          console.log('Error getting documents: ', error)
          reject(error)
        })
        return promise
      })
    },
    getJobRequests ({commit, state}, payload) {
      // get all jobs in progress that are assigned to this company
      firestore.collection('companies').doc(state.companyKey).collection('jobSites').where('approved', '==', false).where('open', '==', true)
      .get()
      .then((snapshot) => {
        let jobRequests = []
        snapshot.forEach((doc) => {
          console.log(doc.data())
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
              status: job.status,
              medical: job.medical
            })
          })
        })
        commit('setRequests', jobRequests)
      })
      .catch((error) => {
        console.log('Error getting documents: ', error)
      })
    },
    getTraining ({commit, state}) {
      let workers = state.workers
      let trainingAlerts = []
      for (let i of workers) {
        for (let training of i.worker.training) {
          if (training.expiry !== '') {
            let alertDate = moment(training.expiry).subtract(14, 'days').format('YYYY-MM-DD')
            if (moment().isAfter(training.expiry)) {
              training.name = i.worker.name
              training.status = 'Expired'
              trainingAlerts.push(training)
            } else if (moment().isAfter(alertDate)) {
              training.name = i.worker.name
              training.status = 'Due to expire'
              trainingAlerts.push(training)
            }
          } else {
            training.name = i.worker.name
            training.status = 'Incomplete'
            trainingAlerts.push(training)
          }
        }
      }
      commit('setTrainingAlerts', trainingAlerts)
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
      console.log(payload)
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
        escalate: payload.escalate,
        open: payload.open,
        loggedBy: payload.loggedBy,
        actionOwner: payload.actionOwner
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
              escalate: obj.escalate,
              open: obj.open,
              loggedBy: obj.loggedBy,
              actionOwner: obj.actionOwner
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
        firestore.collection('incidents').where('actionOwner.key', '==', state.userKey)
        .get()
        .then((snapshot) => {
          console.log('incidents', snapshot)
          snapshot.forEach((doc) => {
            let obj = doc.data()
            let key = doc.id
            incidents.push({
              id: key,
              address: obj.address,
              date: obj.date,
              reportedBy: obj.reportedBy,
              type: obj.type,
              company: obj.company,
              description: obj.description,
              injury: obj.injury,
              injuryDescription: obj.injuryDescription,
              plant: obj.plant,
              plantDamage: obj.plantDamage,
              cause: obj.cause,
              corrective: obj.corrective,
              escalate: obj.escalate,
              open: obj.open,
              loggedBy: obj.loggedBy,
              actionOwner: obj.actionOwner
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
              image: data.imageURL,
              thumb: data.thumb,
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
        hazards = []
        return hazards
      } else {
        commit('setMyHazards', hazards)
        return hazards
      }
    },
    getNotMyHazards ({commit, state}, payload) {
      let myHazards = payload
      console.log('My Hazards', myHazards)
      let allHazards = state.allHazards.slice(0)
      if (myHazards.length !== 0) {
        for (var i = 0; i < allHazards.length; i++) {
          for (var j = 0; j < myHazards.length; j++) {
            if (allHazards[i].id === myHazards[j].id) {
              allHazards.splice(i, 1)
            }
          }
        }
      }
      commit('setNotMyHazards', allHazards)
      return
    },
    addNewHazards ({commit, state}, payload) {
      let hazardUpdates = state.myHazards.concat(payload)
      console.log('hazardUpdates', hazardUpdates)
      firestore.collection('companies').doc(state.companyKey)
      .set({hazards: hazardUpdates}, {merge: true})
      commit('setMyHazards', hazardUpdates)
      console.log('My Hazards updates', state.myHazards)
    },
    removeHazard ({commit, dispatch, state}, payload) {
      let myHazards = payload
      dispatch('getNotMyHazards', myHazards)
      firestore.collection('companies').doc(state.companyKey)
      .set({hazards: payload}, {merge: true})
      commit('setMyHazards', myHazards)
      return
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
        console.log('task Id is', newTask.id)
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
          reject(console.log('New task analysis error'))
        })
      })
      return promise
    },
    createTaskAnalysis ({commit, dispatch, state}, payload) {
      // create base Task Analysis in firestore
      let titles = ['Working at Heights > 5m', 'Work in confined spaces', 'Work in an excavation > 1.5m']
      for (let title of titles) {
        console.log(title)
        let newTask = firestore.collection('companies').doc(state.companyKey)
        .collection('taskAnalysis').doc()
        console.log('task Id is', newTask.id)
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
          dispatch('getTaskAnalysis')
          resolve()
        })
        .catch((error) => {
          reject(console.log('Update task analysis error', error))
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
    training: (state) => state.trainingAlerts,
    jobsInProgress: (state) => state.jobsInProgress,
    jobRequests: (state) => state.jobRequests,
    allHazards: (state) => state.allHazards,
    myHazards: (state) => state.myHazards,
    notMyHazards: (state) => state.notMyHazards,
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
    taskAnalysis: (state) => state.taskAnalysis,
    projectManagers: (state) => state.projectManagers
  },
  plugins: [createPersistedState()]
})
