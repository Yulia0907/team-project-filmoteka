import { fetchMoviesByName, fetchMovieById } from './fetchAPI';
import { createMovieCards } from './moviesMarkup';
import { paginationOptions } from './pagination-options';
import { modalBasicLightbox } from './modalBasicLightbox';
import { localStorageAPI } from './localStorageAPI';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { async } from '@firebase/util';

const moviesContainer = document.querySelector('.movies');
const form = document.querySelector('.hero-home__form');
const failSearch = document.querySelector('.fail-search');

const localStorageApi = new localStorageAPI();

moviesContainer.addEventListener('click', onMovieCardClick);

export async function onMovieCardClick(e) {
  // console.log('onMovieCardClick e: ', e);
  // console.log('onMovieCardClick e.target: ', e.target);
  // console.log('onMovieCardClick e.target: ', e.target.closest('li'));
  const targetFilm = e.target.closest('li').dataset.id; // id текущего фильма при открытии модалки
  // console.log('targetFilm: ', targetFilm);
  if (e.target.nodeName === 'UL') {
    return;
  }

  // try {
  // console.log(localStorageApi.getData('current-film'));

  const movies = localStorageApi.getData('movies'); // забираем фильмы из Local Storage по тегу "movies"
  // console.log('movies: ', movies);
  const parsedGenres = localStorageApi.getData('genresList'); // забираем жанры из Local Storage
  const film = movies.filter(({ id }) => id === Number(targetFilm))[0]; // метод filter возвращает массив, поэтому берем элемент этого массива
  // console.log('film: ', film);

  const { genre_ids } = film;
  let genres;
  if (genre_ids) {
    genres = parsedGenres
      .filter(({ id }) => genre_ids.includes(id)) // перебираем массив всех жанров по id и возвращаем только с текущими
      .map(({ name }) => name); //перебираем массив текущих id и возвращаем массив с именами
  }
  film.genres = genres; // в ключ текущего объекта film сохраняем жанры по именам

  localStorageApi.setData('current-film', film);

  modalBasicLightbox(film, 'movies');
  localStorageApi.addListenersToBtns();
  // console.log(localStorageApi.getData('current-film'));
  // } catch (error) {
  // console.log(error.message);
  // }
}

// form.addEventListener('submit', onFormInputHandler);

function onFormInputHandler(event) {
  event.preventDefault();
  const movieName = form.elements.searchQuery.value.trim();
  if (movieName === '') {
    return console.log('Empty search query');
  }

  // galletyFetchAndRender(movieName);
  // resetPage();
}

async function galletyFetchAndRender(movieName) {
  const res = await fetchMoviesByName(movieName);
  // console.log('search by Name: ', res, '      total_pages: ', res.total_pages);
  galleryRender(res, movieName);
}

async function galleryFetchAndRenderByID(movieID) {
  const res = await fetchMovieById(movieID);
  // console.log('---galleryFetchAndRenderByID---: ', res);
  const objResult = {};
  objResult.results = [{ ...res }];
  objResult.total_results = 1;
  localStorage.setItem('movies', JSON.stringify(objResult.results));
  galleryRender(objResult);
}

function galleryRender(itemRender, movieName) {
  if (itemRender.results.length === 0) {
    failSearch.classList.remove('is-hidden');
    setTimeout(() => failSearch.classList.add('is-hidden'), 5000);
    form.reset();
    return;
  }
  moviesContainer.innerHTML = createMovieCards(itemRender.results);
  const pagination = new Pagination('pagination', paginationOptions(itemRender.total_results));

  pagination.on('afterMove', ({ page }) => {
    fetchMoviesByName(movieName, page)
      .then(itemRender => {
        moviesContainer.innerHTML = createMovieCards(itemRender.results);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(error => {
        console.log(error);
      });
  });
  // form.reset();
}

export { galletyFetchAndRender, galleryFetchAndRenderByID };
