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
    this.watchedBtn = document.querySelector('.btn-watched');
    this.queueBtn = document.querySelector('.btn-queue');
    this.watchedBtn.addEventListener('click', this.onClickWatched);
    this.queueBtn.addEventListener('click', this.onClickQueue);

    if (
      this.watchedMoviesList.map(({ id }) => id).includes(this.currentMovie.id)
    ) {
      // this.watchedBtn.classList.add('added');
      this.watchedBtn.innerText = 'Delete';
      this.watchedBtn.addEventListener('click', this.onClickWatchedDelete);
    }

    if (
      this.queueMoviesList.map(({ id }) => id).includes(this.currentMovie.id)
    ) {
      this.queueBtn.innerText = 'Delete';
      this.queueBtn.addEventListener('click', this.onClickQueueDelete);
    }
  };

  onClickWatched = () => {
    this.watchedBtn.innerText = 'Delete';
    this.watchedBtn.classList.toggle('added');

    if (this.watchedBtn.classList.contains('added')) {
      this.watchedBtn.addEventListener('click', this.onClickWatchedDelete);
    }

    if (this.watchedMoviesIds.includes(this.currentMovie.id)) {
      return;
    } else {
      this.watchedMoviesIds.push(this.currentMovie.id);
      this.watchedMoviesList.push(this.currentMovie);
      // console.log(this.watchedMoviesList);
    }
    this.setData('watched', this.watchedMoviesList);
    this.setData('current-film', this.currentMovie);
  };

  onClickQueue = () => {
    this.queueBtn.innerText = 'Delete';
    this.queueBtn.classList.toggle('added');

    if (this.queueBtn.classList.contains('added')) {
      this.queueBtn.addEventListener('click', this.onClickQueueDelete);
    }

    if (this.queueMoviesIds.includes(this.currentMovie.id)) {
      return;
    } else {
      this.queueMoviesIds.push(this.currentMovie.id);
      this.queueMoviesList.push(this.currentMovie);
    }
    this.setData('queue', this.queueMoviesList);
    this.setData('current-film', this.currentMovie);
  };

  onClickWatchedDelete = () => {
    this.watchedBtn.innerText = 'Add to watched';

    this.watchedMoviesList = this.getData('watched');
    this.currentMovie = this.getData('current-film');

    const items = this.watchedMoviesList.map(({ id }) => id);
    if (items.includes(this.currentMovie.id)) {
      const itemToDelete = items.indexOf(this.currentMovie.id);
      this.watchedMoviesList.splice(itemToDelete, 1);

      this.setData('watched', this.watchedMoviesList);

      if (this.watchedMoviesList.length === 0) {
        localStorage.removeItem('watched');
      }
    }
  };

  onClickQueueDelete = () => {
    this.queueBtn.innerText = 'Add to queue';

    this.queueMoviesList = this.getData('queue');
    this.currentMovie = this.getData('current-film');

    const items = this.queueMoviesList.map(({ id }) => id);
    if (items.includes(this.currentMovie.id)) {
      const itemToDelete = items.indexOf(this.currentMovie.id);
      this.queueMoviesList.splice(itemToDelete, 1);

      this.setData('queue', this.queueMoviesList);

      if (this.queueMoviesList.length === 0) {
        localStorage.removeItem('queue');
      }
    }
  };
}
