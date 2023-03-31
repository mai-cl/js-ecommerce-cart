import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDG7nX1h31AMRvRrnROg5w8aSpaDVsq-vA',
  authDomain: 'auth-demo-1-7fb54.firebaseapp.com',
  projectId: 'auth-demo-1-7fb54',
  storageBucket: 'auth-demo-1-7fb54.appspot.com',
  messagingSenderId: '965679298573',
  appId: '1:965679298573:web:35885bfb420f5a5f1b3d44',
}

const app = initializeApp(firebaseConfig)

const googleAuthProvider = new GoogleAuthProvider()

const auth = getAuth(app)

export { auth, googleAuthProvider, signInWithPopup }
