// import * as firebase from 'firebase';
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  APP_ID
} from "@env"
import firebase from "firebase"
import "@firebase/auth"
import "@firebase/firestore"

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: "glow-in-the-blue.appspot.com",
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
