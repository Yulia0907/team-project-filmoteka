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
let userId;
let userEmail;

export class localStorageAPI {
  constructor() {
    this.watchedMoviesList = [];
    this.queueMoviesList = [];
    this.watchedMoviesIds = [];
    this.queueMoviesIds = [];
    this.currentMovie = [];
  }

  getData(tag) {
    return JSON.parse(localStorage.getItem(`${tag}`));
  }

  setData(tag, data) {
    localStorage.setItem(`${tag}`, JSON.stringify(data));
  }

  removeData(tag) {
    localStorage.removeItem(`${tag}`);
  }

  addListenersToBtns = () => {
    this.currentMovie = this.getData('current-film');
    this.watchedMoviesList = this.getData('watched');
    //Добавить стягивание с БД если авторизирован;
    this.queueMoviesList = this.getData('queue');

    if (this.watchedMoviesList === null) {
      // при удалении всех записей, чтоб список был непустым,
      // так как кнопка Delete последнего оставшегося элемента удаляет и сам тэг из Local Storage
      this.watchedMoviesList = [];
    }

    if (this.queueMoviesList === null) {
      this.queueMoviesList = [];
    }

    this.watchedBtn = document.querySelector('.btn-watched');
    this.queueBtn = document.querySelector('.btn-queue');

    // для кнонпки Add to Watched
    if (this.watchedMoviesList.map(({ id }) => id).includes(this.currentMovie.id)) {
      this.watchedBtn.classList.toggle('added'); // чтоб при повторном открытии модалки одного и того же фильма сохранялся статус кнопки
      this.watchedBtn.classList.toggle('active');
      this.watchedBtn.innerText = 'Delete from watched';
      this.watchedBtn.addEventListener('click', this.onClickWatchedDelete);
    } else {
      this.watchedBtn.innerText = 'Add to watched';
      this.watchedBtn.addEventListener('click', this.onClickWatched);
    }

    // для кнонпки Add to Queue
    if (this.queueMoviesList.map(({ id }) => id).includes(this.currentMovie.id)) {
      this.queueBtn.classList.toggle('added');
      this.queueBtn.classList.toggle('active');
      this.queueBtn.innerText = 'Delete from Queue';
      this.queueBtn.addEventListener('click', this.onClickQueueDelete);
    } else {
      this.queueBtn.innerText = 'Add to queue';
      this.queueBtn.addEventListener('click', this.onClickQueue);
    }
  };

  onClickWatched = () => {
    this.watchedBtn.innerText = 'Delete from watched';
    this.watchedBtn.classList.toggle('added');
    this.watchedBtn.classList.toggle('active');

    if (this.getData('watched')) {
      this.watchedMoviesList = this.getData('watched');
    }

    this.watchedMoviesList.push(this.currentMovie);

    onAuthStateChanged(auth, user => {
      if (user) {
        userId = user.uid;
        userEmail = user.email;
        console.log('Добавили в БД по кнопке Watched');
        set(ref(database, 'users/' + `${userId}watched`), {
          watched: this.watchedMoviesList,
        });
      }
    });
    this.setData('watched', this.watchedMoviesList);
    this.watchedBtn.removeEventListener('click', this.onClickWatched);
    this.watchedBtn.addEventListener('click', this.onClickWatchedDelete);
  };

  onClickQueue = () => {
    this.queueBtn.innerText = 'Delete from Queue';
    this.queueBtn.classList.toggle('added');
    this.queueBtn.classList.toggle('active');
    if (this.getData('queue')) {
      this.queueMoviesList = this.getData('queue');
    }

    this.queueMoviesList.push(this.currentMovie);

    onAuthStateChanged(auth, user => {
      if (user) {
        userId = user.uid;
        userEmail = user.email;
        console.log('Добавили в БД по кнопке queue');
        set(ref(database, 'users/' + `${userId}queue`), {
          queue: this.queueMoviesList,
        });
      }
    });
    this.setData('queue', this.queueMoviesList);
    this.queueBtn.removeEventListener('click', this.onClickQueue);
    this.queueBtn.addEventListener('click', this.onClickQueueDelete);
  };

  onClickWatchedDelete = () => {
    this.watchedBtn.classList.toggle('added');
    this.watchedBtn.classList.toggle('active');
    this.watchedBtn.innerText = 'Add to watched';

    this.watchedMoviesList = this.getData('watched');
    this.currentMovie = this.getData('current-film');

    const items = this.watchedMoviesList.map(({ id }) => id);

    const itemToDelete = items.indexOf(this.currentMovie.id);
    this.watchedMoviesList.splice(itemToDelete, 1);

    onAuthStateChanged(auth, user => {
      if (user) {
        userId = user.uid;
        userEmail = user.email;
        console.log('Удалили из БД по кнопке Watched');
        set(ref(database, 'users/' + `${userId}watched`), {
          watched: this.watchedMoviesList,
        });
      }
    });
    this.setData('watched', this.watchedMoviesList);
    if (this.watchedMoviesList.length === 0) {
      localStorage.removeItem('watched');
    }
    this.watchedBtn.removeEventListener('click', this.onClickWatchedDelete);
    this.watchedBtn.addEventListener('click', this.onClickWatched);
  };

  onClickQueueDelete = () => {
    this.queueBtn.classList.toggle('added');
    this.queueBtn.innerText = 'Add to queue';
    this.queueBtn.classList.toggle('active');
    this.queueMoviesList = this.getData('queue');
    this.currentMovie = this.getData('current-film');

    const items = this.queueMoviesList.map(({ id }) => id);

    const itemToDelete = items.indexOf(this.currentMovie.id);
    this.queueMoviesList.splice(itemToDelete, 1);
    onAuthStateChanged(auth, user => {
      if (user) {
        userId = user.uid;
        userEmail = user.email;
        console.log('Удалили из БД по кнопке queue');
        set(ref(database, 'users/' + `${userId}queue`), {
          queue: this.queueMoviesList,
        });
      }
    });
    this.setData('queue', this.queueMoviesList);
    //добавить в БД

    if (this.queueMoviesList.length === 0) {
      localStorage.removeItem('queue');
    }
    this.queueBtn.removeEventListener('click', this.onClickQueueDelete);
    this.queueBtn.addEventListener('click', this.onClickQueue);
  };
}
