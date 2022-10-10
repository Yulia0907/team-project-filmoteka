import {
  fetchTrendingMovies,
  fetchMovieById,
  fetchMoviesByName,
} from './fetchAPI';
import { createMovieCards } from './moviesMarkup';
import { modalBasicLightbox } from './modalBasicLightbox';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const moviesContainer = document.querySelector('.movies');
const form = document.querySelector('.hero-home__form');
const failSearch = document.querySelector('.fail-search');

let visiblePages = 0;
const mediaQueryMobile = window.matchMedia('(max-width: 768px)');
const mediaQueryTablet = window.matchMedia(
  '(min-width: 769px) and (max-width: 1279px)'
);
const mediaQueryDesktop = window.matchMedia('(min-width: 1280px)');

if (mediaQueryMobile.matches) {
  visiblePages = 3;
}

if (mediaQueryTablet.matches) {
  visiblePages = 5;
}

if (mediaQueryDesktop.matches) {
  visiblePages = 10;
}

/**
 * Function fetch trending movies and make markup on page
 */
async function trendingMovies() {
  try {
    const res = await fetchTrendingMovies();
    moviesContainer.innerHTML = createMovieCards(res.results);
    const options = {
      totalItems: res.total_results,
      itemsPerPage: 20,
      visiblePages,
      centerAlign: false,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
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
  console.log('onMovieCardClick e: ', e);
  console.log('onMovieCardClick e.target: ', e.target);
  console.log('onMovieCardClick e.target: ', e.target.closest('li'));
  const id = e.target.closest('li').dataset.id;
  console.log('id: ', id);
  if (e.target.nodeName === 'UL') {
    return;
  }

  try {
    const film = await fetchMovieById(id);
    modalBasicLightbox(film);
  } catch (error) {
    console.log(error.message);
  }
}

// form.addEventListener('submit', onFormInputHandler);

function onFormInputHandler(event) {
  event.preventDefault();
  const movieName = form.elements.searchQuery.value.trim();
  if (movieName === '') {
    return console.log('Empty search query');
  }

  galletyFetchAndRender(movieName);
  // resetPage();
}

async function galletyFetchAndRender(movieName) {
  const res = await fetchMoviesByName(movieName);
  // console.log('search by Name: ', res, '      total_pages: ', res.total_pages);
  if (res.results.length === 0) {
    failSearch.classList.remove('is-hidden');
    setTimeout(() => failSearch.classList.add('is-hidden'), 5000);
    form.reset();
    return;
  }
  moviesContainer.innerHTML = createMovieCards(res.results);

  const options = {
    totalItems: res.total_results,
    itemsPerPage: 20,
    visiblePages,
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
  // form.reset();
}

export { galletyFetchAndRender };
