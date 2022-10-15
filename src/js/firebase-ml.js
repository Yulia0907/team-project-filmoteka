import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, update, get, onValue, child, remove } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAdditionalUserInfo,
} from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyCI5JTbKtHIHNuS4WcbgMfz2S8WxJp_ehM',
  authDomain: 'filmoteka-proj-7.firebaseapp.com',
  databaseURL: 'https://filmoteka-proj-7-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'filmoteka-proj-7',
  storageBucket: 'filmoteka-proj-7.appspot.com',
  messagingSenderId: '181528100082',
  appId: '1:181528100082:web:031dd9add36023a4e5e46b',
  measurementId: 'G-1X27T2N03L',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const logoutMlBtnEl = document.querySelector('#logout-ml');
const welcomeMl = document.querySelector('.welcome-ml');

let userId;
let userEmail;
let email;
let password;

// обсервер текущего пользователя

onAuthStateChanged(auth, user => {
  if (user) {
    userId = user.uid;
    userEmail = user.email;
    console.log('current user = ', userEmail);
    logoutMlBtnEl.classList.remove('visually-hidden');
    welcomeMl.innerHTML = `Welcome, ${userEmail}!`;
  } else {
    console.log('Не авторизован');
    logoutMlBtnEl.classList.add('visually-hidden');
  }
});

//логаут

logoutMlBtnEl.addEventListener('click', logOutMl);

function logOutMl() {
  signOut(auth)
    .then(() => {
      userEmail = null;
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
    });
}
