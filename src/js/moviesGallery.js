import {
  fetchTrendingMovies,
  fetchMovieById,
  fetchMoviesByName,
} from './fetchAPI';
import { createMovieCards } from './moviesMarkup';
import { modalBasicLightbox } from './modalBasicLightbox';
import { localStorageAPI } from './watched-queued';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const moviesContainer = document.querySelector('.movies');
const form = document.querySelector('.hero-home__form');
const failSearch = document.querySelector('.fail-search');

const localStorageApi = new localStorageAPI();

/**
 * Function fetch trending movies and make markup on page
 */
async function trendingMovies() {
  try {
    const res = await fetchTrendingMovies();
    moviesContainer.innerHTML = createMovieCards(res.results);
    const options = {
      totalItems: res.total_pages,
      itemsPerPage: 20,
      visiblePages: 4,
      centerAlign: false,
    };
    const container = document.getElementById('pagination');
    const pagination = new Pagination(container, options);

    pagination.on('afterMove', ({ page }) => {
      fetchTrendingMovies(page).then(res => {
        moviesContainer.innerHTML = createMovieCards(res.results);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  } catch (error) {
    console.log('error', error.message);
  }
}
trendingMovies();

moviesContainer.addEventListener('click', onMovieCardClick);

async function onMovieCardClick(e) {
  const targetFilm = e.target.closest('li').dataset.id;
  if (e.target.nodeName === 'UL') {
    return;
  }
  try {
    const movies = JSON.parse(localStorage.getItem('movies'));
    const parsedGenres = JSON.parse(localStorage.getItem('genresList'));

    const film = movies.filter(({ id }) => id === Number(targetFilm))[0];
    const { genre_ids } = film;
    let genres;
    if (genre_ids) {
      genres = parsedGenres
        .filter(({ id }) => genre_ids.includes(id))
        .map(({ name }) => name);
    }
    film.genres = genres;

    const watchedMovies = JSON.parse(localStorage.getItem('watched'));
    const queuedMovies = JSON.parse(localStorage.getItem('queue'));

    if (watchedMovies) {
      if (watchedMovies.map(({ id }) => id).includes(film.id)) {
        const movieIsInWatched = watchedMovies.filter(
          ({ id }) => id == film.id
        )[0];
        film.watchedStatus = movieIsInWatched.watchedStatus;
        film.queueStatus = movieIsInWatched.queueStatus;
        localStorage.setItem('current-film', JSON.stringify(film));
      } else {
        film.watchedStatus = false;
        film.queueStatus = false;

        localStorage.setItem('current-film', JSON.stringify(film));
      }
    } else if (queuedMovies) {
      if (queuedMovies.map(({ id }) => id).includes(film.id)) {
        const movieIsInQueue = queuedMovies.filter(
          ({ id }) => id == film.id
        )[0];
        film.watchedStatus = movieIsInQueue.watchedStatus;
        film.queueStatus = movieIsInQueue.queueStatus;
        localStorage.setItem('current-film', JSON.stringify(film));
      } else {
        film.watchedStatus = false;
        film.queueStatus = false;
        localStorage.setItem('current-film', JSON.stringify(film));
      }
    } else {
      film.watchedStatus = false;
      film.queueStatus = false;
      localStorage.setItem('current-film', JSON.stringify(film));
    }

    modalBasicLightbox(film);
    localStorageApi.addListeners();
  } catch (error) {
    console.log(error.message);
  }
}

form.addEventListener('submit', onFormInputHandler);

async function onFormInputHandler(event) {
  event.preventDefault();
  const movieName = form.elements.searchQuery.value.trim();
  if (movieName === '') {
    return console.log('Empty search query');
  }

  // resetPage();

  const res = await fetchMoviesByName(movieName);
  if (res.results.length === 0) {
    failSearch.classList.remove('is-hidden');
    setTimeout(() => failSearch.classList.add('is-hidden'), 5000);
    form.reset();
    return;
  }
  moviesContainer.innerHTML = createMovieCards(res.results);

  const options = {
    totalItems: res.total_pages,
    itemsPerPage: 20,
    visiblePages: 4,
    centerAlign: false,
  };
  const container = document.getElementById('pagination');
  const pagination = new Pagination(container, options);

  pagination.on('afterMove', ({ page }) => {
    fetchMoviesByName(movieName, page)
      .then(res => {
        moviesContainer.innerHTML = createMovieCards(res.results);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(error => {
        console.log(error);
      });
  });
  form.reset();
}
