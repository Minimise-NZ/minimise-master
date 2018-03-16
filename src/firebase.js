import Firebase from 'firebase'
import 'firebase/firestore'
import { store } from './store/store'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyAjyjXMLbCu6aCMgtZYnBKTftYBf00POlQ',
  authDomain: 'minimise-firestore.firebaseapp.com',
  databaseURL: 'https://minimise-firestore.firebaseio.com',
  projectId: 'minimise-firestore',
  storageBucket: 'minimise-firestore.appspot.com',
  messagingSenderId: '1095768903292'
})

Firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch('autoSignIn', user.uid)
  } else {
    console.log('user not signed in')
  }
})

export const firestore = firebaseApp.firestore()
