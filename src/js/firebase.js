import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  set,
  ref,
  update,
  get,
  onValue,
  child,
  remove,
} from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAdditionalUserInfo,
} from 'firebase/auth';
import {
  registrationForm,
  registrationFormName,
  registrationFormEmail,
  registrationFormPassword,
  loginForm,
  loginFormName,
  loginFormEmail,
  loginFormPassword,
  onCloseModal,
} from '/src/js/modal-registr.js';
const firebaseConfig = {
  apiKey: 'AIzaSyCI5JTbKtHIHNuS4WcbgMfz2S8WxJp_ehM',
  authDomain: 'filmoteka-proj-7.firebaseapp.com',
  databaseURL:
    'https://filmoteka-proj-7-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'filmoteka-proj-7',
  storageBucket: 'filmoteka-proj-7.appspot.com',
  messagingSenderId: '181528100082',
  appId: '1:181528100082:web:031dd9add36023a4e5e46b',
  measurementId: 'G-1X27T2N03L',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const logoutBtnEl = document.querySelector('#logout');
let userId;
let email;
let password;

// обсервер текущего пользователя
const welcome = document.querySelector('.welcome');
const login = document.querySelector('#login');

onAuthStateChanged(auth, user => {
  if (user) {
    userId = user.uid;
    userEmail = user.email;
    logoutBtnEl.classList.remove('visually-hidden');
    login.classList.add('visually-hidden');
    console.log('current user = ', userEmail);
    welcome.innerHTML = `Welcome, ${userEmail}!`;
  }
});

//регистрация новых пользователей
registrationForm.addEventListener('submit', onRegistrationSubmit);

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
  onCloseModal();
}

//авторизация существующих хользователей
loginForm.addEventListener('submit', onLoginSubmit);

function onLoginSubmit(event) {
  event.preventDefault();
  const email = loginFormEmail.value;
  const password = loginFormPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  loginForm.reset();
  onCloseModal();
}

//логаут

logoutBtnEl.addEventListener('click', logOut);

function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      userEmail = null;
      logoutBtnEl.classList.add('visually-hidden');
      login.classList.remove('visually-hidden');
    })
    .catch(error => {
      // An error happened.
    });
  window.location.reload();
  // window.location.replace('https://nilkad.github.io/js-project-7/index.html');
}
