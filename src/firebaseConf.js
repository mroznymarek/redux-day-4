import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBHt-Q51PGKIHqxb6Hq6_u6nPGcVJpC9Zs",
  authDomain: "moj-nowy-projekt-62da2.firebaseapp.com",
  databaseURL: "https://moj-nowy-projekt-62da2.firebaseio.com",
  projectId: "moj-nowy-projekt-62da2",
  storageBucket: "moj-nowy-projekt-62da2.appspot.com",
  messagingSenderId: "862816477879"
  }

  firebase.initializeApp(config)

  export const database = firebase.database()
  export const auth = firebase.auth()
  export const googleProvider = new firebase.auth.GoogleAuthProvider()
