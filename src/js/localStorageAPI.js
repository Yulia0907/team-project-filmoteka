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

    if (this.watchedMoviesList === null) {
      // при удалении всех записей, чтоб список был непустым,
      // так как кнопка Delete последнего оставшегося элемента удаляет и сам тэг из Local Storage
      this.watchedMoviesList = [];
    }

    this.watchedBtn = document.querySelector('.btn-watched');
    this.queueBtn = document.querySelector('.btn-queue');

    // для кнонпки Add to Watched
    if (
      this.watchedMoviesList.map(({ id }) => id).includes(this.currentMovie.id)
    ) {
      this.watchedBtn.classList.toggle('added'); // чтоб при повторном открытии модалки одного и того же фильма сохранялся статус кнопки
      this.watchedBtn.innerText = 'Delete';
      this.watchedBtn.addEventListener('click', this.onClickWatchedDelete);
    } else {
      this.watchedBtn.innerText = 'Add to watched';
      this.watchedBtn.addEventListener('click', this.onClickWatched);
    }

    // для кнонпки Add to Queue
    if (
      this.queueMoviesList.map(({ id }) => id).includes(this.currentMovie.id)
    ) {
      this.queueBtn.classList.toggle('added');
      this.queueBtn.innerText = 'Delete';
      this.queueBtn.addEventListener('click', this.onClickQueueDelete);
    } else {
      this.queueBtn.innerText = 'Add to queue';
      this.queueBtn.addEventListener('click', this.onClickQueue);
    }
  };

  onClickWatched = () => {
    this.watchedBtn.innerText = 'Delete';
    this.watchedBtn.classList.toggle('added');

    if (this.getData('watched')) {
      this.watchedMoviesList = this.getData('watched');
    }

    this.watchedMoviesList.push(this.currentMovie);
    this.setData('watched', this.watchedMoviesList);

    this.watchedBtn.removeEventListener('click', this.onClickWatched);
    this.watchedBtn.addEventListener('click', this.onClickWatchedDelete);
  };

  onClickQueue = () => {
    this.queueBtn.innerText = 'Delete';
    this.queueBtn.classList.toggle('added');

    if (this.getData('queue')) {
      this.queueMoviesList = this.getData('queue');
    }

    this.queueMoviesList.push(this.currentMovie);
    this.setData('queue', this.queueMoviesList);

    this.queueBtn.removeEventListener('click', this.onClickQueue);
    this.queueBtn.addEventListener('click', this.onClickQueueDelete);
  };

  onClickWatchedDelete = () => {
    this.watchedBtn.classList.toggle('added');
    this.watchedBtn.innerText = 'Add to watched';

    this.watchedMoviesList = this.getData('watched');
    this.currentMovie = this.getData('current-film');

    const items = this.watchedMoviesList.map(({ id }) => id);

    const itemToDelete = items.indexOf(this.currentMovie.id);
    this.watchedMoviesList.splice(itemToDelete, 1);

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

    this.queueMoviesList = this.getData('queue');
    this.currentMovie = this.getData('current-film');

    const items = this.queueMoviesList.map(({ id }) => id);

    const itemToDelete = items.indexOf(this.currentMovie.id);
    this.queueMoviesList.splice(itemToDelete, 1);

    this.setData('queue', this.queueMoviesList);

    if (this.queueMoviesList.length === 0) {
      localStorage.removeItem('queue');
    }
    this.queueBtn.removeEventListener('click', this.onClickQueueDelete);
    this.queueBtn.addEventListener('click', this.onClickQueue);
  };
}
