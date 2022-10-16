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
import {
  registrationForm,
  registrationFormName,
  registrationFormEmail,
  registrationFormPassword,
  registrationFormSubmit,
  loginForm,
  loginFormName,
  loginFormEmail,
  loginFormPassword,
  onCloseModal,
  closeOnSubmit,
} from '/src/js/modals/modal-auth.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const logoutMlBtnEl = document.querySelector('.logout');
const welcomeMl = document.querySelector('.welcome-ml');

let userId;
let userEmail;
let email;
let password;

console.log('firebase-ml is running');
// обсервер текущего пользователя
const welcome = document.querySelector('.welcome-ml');
const login = document.querySelector('.login');

onAuthStateChanged(auth, user => {
  if (user) {
    userId = user.uid;
    userEmail = user.email;
    console.log('current user = ', userEmail);
    logoutMlBtnEl.classList.remove('visually-hidden');
    login.classList.add('visually-hidden');
    welcomeMl.innerHTML = `Welcome, ${userEmail}!`;
  } else {
    login.classList.remove('visually-hidden');
  }
});

//регистрация новых пользователей
registrationFormSubmit.addEventListener('click', onRegistrationSubmit);

function onRegistrationSubmit(event) {
  event.preventDefault();
  // const name = registrationFormName.value;
  const email = registrationFormEmail.value;
  console.log(email);
  const password = registrationFormPassword.value;
  console.log(password);
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // set(ref(database, 'users/' + user.uid), {
      //   email: email,
      //   displayName: email,
      // });
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });
  registrationForm.reset();
  closeOnSubmit();
}

//авторизация существующих хользователей
loginForm.addEventListener('submit', onLoginSubmit);

function onLoginSubmit(event) {
  event.preventDefault();
  localStorage.removeItem('watched');
  localStorage.removeItem('queue');
  const email = loginFormEmail.value;
  const password = loginFormPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      window.location.reload();
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  loginForm.reset();
  closeOnSubmit();
}

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
