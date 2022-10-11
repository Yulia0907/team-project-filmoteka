import {
  fetchTrendingMovies,
  fetchMovieById,
  fetchMoviesByName,
} from './fetchAPI';
import { createMovieCards } from './moviesMarkup';
import { modalBasicLightbox } from './modalBasicLightbox';
import { localStorageAPI } from './localStorageAPI';
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

export async function onMovieCardClick(e) {
  const targetFilm = e.target.closest('li').dataset.id; // id текущего фильма при открытии модалки
  console.log(targetFilm);
  if (e.target.nodeName === 'UL') {
    return;
  }
  try {
    const movies = localStorageApi.getData('movies'); // забираем фильмы из Local Storage по тегу "movies"
    const parsedGenres = localStorageApi.getData('genresList'); // забираем жанры из Local Storage

    const film = movies.filter(({ id }) => id === Number(targetFilm))[0]; // метод filter возвращает массив, поэтому берем элемент этого массива
    const { genre_ids } = film;
    let genres;
    if (genre_ids) {
      genres = parsedGenres
        .filter(({ id }) => genre_ids.includes(id)) // перебираем массив всех жанров по id и возвращаем только с текущими
        .map(({ name }) => name); //перебираем массив текущих id и возвращаем массив с именами
    }
    film.genres = genres; // в ключ текущего объекта film сохраняем жанры по именам

    localStorageApi.setData('current-film', film);

    modalBasicLightbox(film);
    localStorageApi.addListenersToBtns();
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
