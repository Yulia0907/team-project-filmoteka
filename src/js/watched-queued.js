export class localStorageAPI {
  constructor() {
    this.watchedMoviesList = [];
    this.queueMoviesList = [];
    this.watchedMoviesIds = [];
    this.queueMoviesIds = [];
  }

  addListeners = () => {
    this.currentMovie = JSON.parse(localStorage.getItem('current-film'));
    // const watchedMovies = JSON.parse(localStorage.getItem('watched'));
    // console.log(watchedMovies);
    // if (watchedMovies) {
    //   console.log('Есть фильмы в списке Watched');
    // } else {
    //   console.log('Нет фильмов в списке Watched');
    // }

    // this.currentMovie.watchStatus = false;
    // this.currentMovie.queueStatus = false;

    this.watchedBtn = document.querySelector('.btn-watched');
    this.queueBtn = document.querySelector('.btn-queue');
    this.watchedBtn.addEventListener('click', this.onClickWatched);
    this.queueBtn.addEventListener('click', this.onClickQueue);
  };

  onClickWatched = () => {
    if (this.watchedMoviesIds.includes(this.currentMovie.id)) {
      return;
    } else {
      this.watchedMoviesIds.push(this.currentMovie.id);
      this.currentMovie.watchedStatus = true;
      this.watchedMoviesList.push(this.currentMovie);
      //   console.log(this.watchedMoviesIds);
    }
    localStorage.setItem('watched', JSON.stringify(this.watchedMoviesList));
  };

  onClickQueue = () => {
    if (this.queueMoviesIds.includes(this.currentMovie.id)) {
      return;
    } else {
      this.queueMoviesIds.push(this.currentMovie.id);
      this.currentMovie.queueStatus = true;
      this.queueMoviesList.push(this.currentMovie);
    }
    localStorage.setItem('queue', JSON.stringify(this.queueMoviesList));
  };

  //   get btnStatus() {
  //     return this.btnStatus;
  //   }

  //   set btnStatus(newStatus) {
  //     this.btnStatusWatched = newStatus;
  //   }
}

// export class localStorageAPI {
//   constructor() {
//     this.moviesList = [];
//     this.moviesIds = [];
//     this.localKey = '';
//   }

//   addListeners = () => {
//     this.currentMovie = JSON.parse(localStorage.getItem('current-film'));
//     this.watchedBtn = document.querySelector('.btn-watched');
//     this.queueBtn = document.querySelector('.btn-queue');
//     this.watchedBtn.addEventListener(
//       'click',
//       this.onClickLocalStorage('watched')
//     );
//     this.queueBtn.addEventListener('click', this.onClickLocalStorage('queued'));
//   };

//   onClickLocalStorage(key) {
//     this.localKey = key;
//     if (this.moviesIds.includes(this.currentMovie.id)) {
//       return;
//     } else {
//       this.moviesIds.push(this.currentMovie.id);
//       this.moviesList.push(this.currentMovie);
//     }
//     localStorage.setItem(this.localKey, JSON.stringify(this.moviesList));
//   }
// }
