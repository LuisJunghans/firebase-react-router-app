import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA7PtP1MHTHLG01QLDLx59ro1IQ0fsLgvk",
    authDomain: "guacamole-28a1d.firebaseapp.com",
    projectId: "guacamole-28a1d",
    storageBucket: "guacamole-28a1d.firebasestorage.app",
    messagingSenderId: "216997513676",
    appId: "1:216997513676:web:d9b3b2d58e703abfb43569"
  }
  

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db   = getFirestore(app)
