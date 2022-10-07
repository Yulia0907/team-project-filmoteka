import { fetchTrendingMovies, fetchMovieById } from './fetchAPI';
import { createMovieCards } from './moviesMarkup';
import { modalBasicLightbox } from './modalBasicLightbox';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const moviesContainer = document.querySelector('.movies');

async function trendingMovies() {
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
    fetchTrendingMovies(page)
      .then(res => {
        moviesContainer.innerHTML = createMovieCards(res.results);
      })
      .catch(error => {
        console.log(error);
      });
  });
}
trendingMovies();

moviesContainer.addEventListener('click', onMovieCardClick);

async function onMovieCardClick(e) {
  const id = e.target.closest('li').dataset.id;
  console.log(id);
  if (e.target.nodeName === 'UL') {
    return;
  }
  try {
    const film = await fetchMovieById(id);
    modalBasicLightbox(film);
  } catch (error) {
    console.log(error.statusText);
  }
}

async function fetchMoviesByName(event) {
  event.preventDefault();
  const movieName = form.elements.query.value.trim();
  if (movieName === '') {
    return console.log('Empty search query');
  }
  resetPage();

  const res = await fetchMovies(movieName);
  moviesContainer.innerHTML = createMovieCards(res.results);

  const options = {
    totalItems: res.total_pages,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: false,
  };
  const container = document.getElementById('pagination');
  const pagination = new Pagination(container, options);

  pagination.on('afterMove', ({ page }) => {
    fetchMovies(movieName, page)
      .then(res => {
        moviesContainer.innerHTML = createMovieCards(res.results);
      })
      .catch(error => {
        console.log(error);
      });
  });
}

function resetPage() {
  page = DEFAULT_PAGE;
}
