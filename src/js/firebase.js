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
let userId;
let email;
let password;

//обсервер текущего пользователя
onAuthStateChanged(auth, user => {
  if (user) {
    userId = user.uid;
    userEmail = user.email;
    console.log('current user = ', userEmail);
    autorizeFormEl.insertAdjacentHTML('afterend', `welcome, ${userEmail}`);
  }
});

//регистрация новых пользователей
const registrationFormEl = document.querySelector('#registration-form');
const registrationNameEl = document.querySelector('#registration-form-name');
const registrationEmailEl = document.querySelector('#registration-form-email');
const registrationPasswordEl = document.querySelector(
  '#registration-form-password'
);

registrationFormEl.addEventListener('submit', onRegistrationSubmit);

function onRegistrationSubmit(event) {
  event.preventDefault();
  const name = registrationNameEl.value;
  const email = registrationEmailEl.value;
  const password = registrationPasswordEl.value;
  console.log(email);
  console.log(password);
  createUserWithEmailAndPassword(auth, email, password, name)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        email: email,
        displayName: name,
        online: true,
      });
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  registrationFormEl.reset();
}

//авторизация существующих хользователей
const autorizeFormEl = document.querySelector('#autorize-form');
const autorizeEmailEl = document.querySelector('#autorize-form-email');
const autorizePasswordEl = document.querySelector('#autorize-form-password');

autorizeFormEl.addEventListener('submit', onAutorizeSubmit);

function onAutorizeSubmit(event) {
  const email = autorizeEmailEl.value;
  const password = autorizePasswordEl.value;
  console.log(email);
  console.log(password);
  event.preventDefault();
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

  autorizeFormEl.reset();
}

//логаут
const logoutBtnEl = document.querySelector('#logout-btn');

logoutBtnEl.addEventListener('click', logOut);

function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      userEmail = null;
    })
    .catch(error => {
      // An error happened.
    });
  window.location.reload();
  // window.location.replace('https://nilkad.github.io/js-project-7/index.html');
}
