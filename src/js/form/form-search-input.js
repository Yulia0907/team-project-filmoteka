import debounce from 'lodash.debounce';
// import { fetchMoviesByName } from '../fetchAPI';
import { markupFormListSearch } from './markup-form-search';
import { galletyFetchAndRender } from '../moviesGallery';
const formInputResultSearch = document.querySelector('.search-result');
const formRefs = document.querySelector('.hero-home__form');

const formSearchInput = document.querySelector('.form_input');
const DEBOUNCE_DELAY = 500;

let forRenderDate = '';
let searchString = '';
let searchLastDownPage = 0;
// let searchTotalFound = 0;
const searchParPage = 20;
let totalFoundPages = 0;
let totalFoundResults = 0;

const onInputChange = e => {
  searchString = e.target.value.trim();
  if (searchString.length === 0) {
    closeSearch();
    searchLastDownPage = 0;
    return;
  }
  searchLastDownPage = 0;
  let forRenderDate = '';

  console.log(
    'searchString:  ',
    searchString,
    '  searchLastDownPage: ',
    searchLastDownPage
  );
  searchLastDownPage += 1;
  const res = fetchMoviesByNameGetAll(searchString, searchLastDownPage);
  console.log('res:  ', res);

  // fetchMoviesByNameService(searchString, (searchLastDownPage += 1));
  //   .then(data =>
  //   console.log('then after fetchMoviesByNameService ret data: ', data)
  // );
  // console.log('download searchLastDownPage: ', searchLastDownPage);

  // console.log('forRenderDate one: ', forRenderDate);

  // while (searchLastDownPage < totalFoundPages) {
  //   searcharray += fetchMoviesByNameService(
  //     searchString,
  //     (searchLastDownPage += 1)
  //   );
  // }

  // renderSearch(forRenderDate);
};

async function fetchMoviesByNameGetAll(nameSearch, page) {
  //
  const res = await fetchMoviesByName(nameSearch, page);
  conslole.log('return fetchMoviesByName:  ', res);
  return res;
}

function fetchMoviesByNameService(searchName, page) {
  //
  fetchMoviesByName(searchName, page).then(data => {
    console.log('fetchMoviesByName data.results: ', data.results);
    // return data;
    totalFoundPages = data.total_pages;
    totalFoundResults = data.total_results;
    return data;
    prepareArrayForRender(data);
  });
}

//для модернизации
async function fetchMoviesByName(movieName, p = 1) {
  console.log('movieName: ', movieName, '     p: ', p);
  const searchParams = new URLSearchParams({
    api_key: '0214e4f6556edfc65f2eadfc23b43510',
    language: 'en-US',
    page: p ?? 1,
    include_adult: false,
    query: movieName,
  });

  // try {
  const data = await fetch(
    `https://api.themoviedb.org/3/search/movie?${searchParams}`
  ).then(date => {
    console.log();
  });
  const results = await data.json();

  return results;
  // } catch (error) {
  //   console.log(error.statusText);
  // }
}

const prepareArrayForRender = fetchData => {
  console.log('fetchData.results: ', fetchData);
  const forHTML = markupFormListSearch(fetchData.results);
  return (forRenderDate += forHTML);
};

const renderSearch = dataRender => {
  formInputResultSearch.innerHTML = dataRender;
  document.body.addEventListener('click', onFormClick);
};

const onFormClick = evt => {
  if (!evt.target.closest('.hero-home__form')) {
    closeSearch();
    document.body.removeEventListener('click', onFormClick);
  }
  console.log('evt:  ', evt);
  let elementOfClick = evt.target.closest('.search-result__item');
  // console.log('elementOfClick:   ', elementOfClick);
  const searchID = elementOfClick.dataset.id;
  const searchName = elementOfClick.firstElementChild.textContent;
  // console.log('searchID: ', searchID);
  // console.log('searchName: ', searchName);
  closeSearch();

  galletyFetchAndRender(searchName);
};

formRefs.addEventListener('submit', onFormInputHandler);

function onFormInputHandler(event) {
  event.preventDefault();
  const movieName = formRefs.elements.searchQuery.value.trim();
  if (movieName === '') {
    return console.log('Empty search query');
  }
  closeSearch();

  galletyFetchAndRender(movieName);
  // resetPage();
  return;
}

const closeSearch = () => {
  renderSearch('');
};

const searchFilmFromID = filmid => {
  //
};

formSearchInput.addEventListener(
  'input',
  debounce(onInputChange, DEBOUNCE_DELAY)
);

// fromRefs.addEventListener('click', onFormClick);
// form
