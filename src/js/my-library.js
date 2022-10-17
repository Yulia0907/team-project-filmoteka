import { createMovieCards } from './moviesMarkup';
// import { onMovieCardClick } from './moviesGallery';
import { modalBasicLightbox } from './modalBasicLightbox';
import { localStorageAPI } from './localStorageAPI';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import nothingHereIMG from '../img/thereNothingHere.jpg';
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
// Заглушка, когда пусто в MyLibrary
const DefaultMarcup = `<li class="default-img"><img src="${nothingHereIMG}" 
  alt="nothing-here" width="400px"></img></li>`;

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(getDatabase());
const auth = getAuth();
let userId;
let userEmail;
let getWatched = [];
let getQueue = [];
let markup = '';
const logoutMlBtnEl = document.querySelector('.logout');
const welcomeMl = document.querySelector('.welcome-ml');

onAuthStateChanged(auth, user => {
  if (user) {
    userId = user.uid;
    userEmail = user.email;
    console.log('Это обсервер my-library');
    logoutMlBtnEl.classList.remove('visually-hidden');
    welcomeMl.innerHTML = `Welcome, ${userEmail}!`;
  } else {
    logoutMlBtnEl.classList.add('visually-hidden');
  }
});

const moviesContainer = document.querySelector('.movies');
const watchedBtnEl = document.querySelector('[data-id="watched-btn"');
const queueBtnEl = document.querySelector('[data-id="queue-btn"');
const myLibraryNavEl = document.querySelector('.header-nav__link--current-header');
const localStorageApi = new localStorageAPI();

watchedBtnEl.addEventListener('click', onWatchedBtnClick);
queueBtnEl.addEventListener('click', onQueueBtnClick);
// myLibraryNavEl.addEventListener('click', renderCardsWatched);

function renderCardsWatched() {
  let getWatched = [];
  onAuthStateChanged(auth, user => {
    if (user) {
      userId = user.uid;
      userEmail = user.email;
      get(child(dbRef, `users/${userId}watched/watched`))
        .then(snapshot => {
          if (snapshot.exists()) {
            getWatched = snapshot.val();
            localStorage.setItem('watched', JSON.stringify(getWatched));
            console.log('getWatched', snapshot.val());
            markup = createMovieCards(getWatched);
            moviesContainer.innerHTML = markup;
            moviesContainer.addEventListener('click', onWatchedMovieCardClick);
          } else {
            console.log('No data available');
            getWatched = snapshot.val();
            console.log('getWatched', snapshot.val());
            markup = DefaultMarcup;
            moviesContainer.innerHTML = markup;
            moviesContainer.addEventListener('click', onWatchedMovieCardClick);
          }
        })
        .catch(error => {
          console.error(error);
        });
      get(child(dbRef, `users/${userId}queue/queue`))
        .then(snapshot => {
          if (snapshot.exists()) {
            getQueue = snapshot.val();
            localStorage.setItem('queue', JSON.stringify(getQueue));
            console.log('getQueue', snapshot.val());
            markup = createMovieCards(getQueue);
          } else {
            console.log('No data available');
            getWatched = snapshot.val();
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      getWatched = localStorageApi.getData('watched');
      if (getWatched === null || getWatched.length === 0) {
        markup = DefaultMarcup;
      } else {
        markup = createMovieCards(getWatched);
      }
      moviesContainer.innerHTML = markup;
      moviesContainer.addEventListener('click', onWatchedMovieCardClick);
    }
  });
}

renderCardsWatched();

function onWatchedBtnClick() {
  moviesContainer.removeEventListener('click', onQueueMovieCardClick);

  if (watchedBtnEl.classList.contains('is-active')) {
    return;
  }
  onAuthStateChanged(auth, user => {
    if (user) {
      userId = user.uid;
      userEmail = user.email;
      get(child(dbRef, `users/${userId}watched/watched`))
        .then(snapshot => {
          if (snapshot.exists()) {
            getWatched = snapshot.val();
            console.log('getWatched', snapshot.val());
            markup = createMovieCards(getWatched);
            moviesContainer.innerHTML = markup;
            moviesContainer.addEventListener('click', onWatchedMovieCardClick);
          } else {
            console.log('No data available');
            getWatched = snapshot.val();
            console.log('getWatched', snapshot.val());
            markup = DefaultMarcup;
            moviesContainer.innerHTML = markup;
            moviesContainer.addEventListener('click', onWatchedMovieCardClick);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      getWatched = localStorageApi.getData('watched');
      if (getWatched === null || getWatched.length === 0) {
        markup = DefaultMarcup;
      } else {
        markup = createMovieCards(getWatched);
      }
      moviesContainer.innerHTML = markup;
      moviesContainer.addEventListener('click', onWatchedMovieCardClick);
    }
  });
}

function onQueueBtnClick() {
  moviesContainer.removeEventListener('click', onWatchedMovieCardClick);

  if (!watchedBtnEl.classList.contains('is-active')) {
    return;
  }
  onAuthStateChanged(auth, user => {
    if (user) {
      userId = user.uid;
      userEmail = user.email;
      get(child(dbRef, `users/${userId}queue/queue`))
        .then(snapshot => {
          if (snapshot.exists()) {
            getQueue = snapshot.val();
            console.log('getQueue', snapshot.val());
            markup = createMovieCards(getQueue);
            moviesContainer.innerHTML = markup;
            moviesContainer.addEventListener('click', onQueueMovieCardClick);
          } else {
            console.log('No data available');
            getWatched = snapshot.val();
            console.log('getWatched', snapshot.val());
            markup = DefaultMarcup;
            moviesContainer.innerHTML = markup;
            moviesContainer.addEventListener('click', onWatchedMovieCardClick);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      const getQueue = localStorageApi.getData('queue');
      if (getQueue === null || getQueue.length === 0) {
        markup = DefaultMarcup;
      } else {
        markup = createMovieCards(getQueue);
      }
      moviesContainer.innerHTML = markup;
      moviesContainer.addEventListener('click', onQueueMovieCardClick);
    }
  });
}

function onWatchedMovieCardClick(e) {
  const targetFilm = e.target.closest('li').dataset.id;
  if (e.target.nodeName === 'UL') {
    return;
  }

  try {
    const movies = localStorageApi.getData('watched');
    const parsedGenres = localStorageApi.getData('genresList');
    const film = movies.filter(({ id }) => id === Number(targetFilm))[0];
    const { genre_ids } = film;
    let genres;
    if (genre_ids) {
      genres = parsedGenres.filter(({ id }) => genre_ids.includes(id)).map(({ name }) => name);
    }
    film.genres = genres;

    localStorageApi.setData('current-film', film);

    modalBasicLightbox(film, 'watched');
    localStorageApi.addListenersToBtns();
  } catch (error) {
    console.log(error.message);
  }
}

function onQueueMovieCardClick(e) {
  const targetFilm = e.target.closest('li').dataset.id;
  if (e.target.nodeName === 'UL') {
    return;
  }

  try {
    const movies = localStorageApi.getData('queue');
    const parsedGenres = localStorageApi.getData('genresList');
    const film = movies.filter(({ id }) => id === Number(targetFilm))[0];
    const { genre_ids } = film;
    let genres;
    if (genre_ids) {
      genres = parsedGenres.filter(({ id }) => genre_ids.includes(id)).map(({ name }) => name);
    }
    film.genres = genres;

    localStorageApi.setData('current-film', film);

    modalBasicLightbox(film, 'queue');
    localStorageApi.addListenersToBtns();
  } catch (error) {
    console.log(error.message);
  }
}
