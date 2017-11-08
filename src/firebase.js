import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyC_ronpzRJkeHj85l1O179b33UuLqjYoKk',
  authDomain: 'minimisedb.firebaseapp.com',
  databaseURL: 'https://minimisedb.firebaseio.com',
  projectId: 'minimisedb',
  storageBucket: 'minimisedb.appspot.com',
  messagingSenderId: '914768004690'
})

export const db = app.database()
