import debounce from 'lodash.debounce';
import { fetchMoviesByName } from '../api/fetchAPI-v2';
import { markupFormListSearch } from './markup-form-search';
import { galletyFetchAndRender } from '../moviesGallery';
const formInputResultSearch = document.querySelector('.search-result');
const formRefs = document.querySelector('.hero-home__form');

const formSearchInput = document.querySelector('.form_input');

const DEBOUNCE_DELAY = 500;

let forRenderDate = '';
let searchString = '';
let lastDownPage = 0;
// let searchTotalFound = 0;
const searchParPage = 20;
let totalFoundPages = 0;
let totalFoundResults = 0;

async function onInputChange(e) {
  searchString = e.target.value.trim();
  if (searchString.length === 0) {
    closeSearch();
    lastDownPage = 0;
    return;
  }
  lastDownPage = 0;
  let forRenderDate = '';

  console.log(
    'searchString:  ',
    searchString,
    '  searchLastDownPage: ',
    lastDownPage
  );
  // lastDownPage += 1;
  // const res =
  const response = await fetchMoviesByNameGetAll(searchString, 3);
  // const response = await fetchMoviesByName(searchString, searchLastDownPage);
  console.log('response: === ', response);
  return;
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
}

async function fetchMoviesByNameGetAll(nameSearch, page) {
  // console.log('Start ----- fetchMoviesByNameGetAll');
  // console.log('nameSearch: ', nameSearch, 'page: ', page);
  const response = await fetchMoviesByName(nameSearch, page);
  console.log('return fetchMoviesByName then JSON:  ', response);
  totalFoundPages = response.total_pages;
  getsPage = response.page;
  let respWhile = [];
  while (page > lastDownPage && totalFoundPages > lastDownPage) {
    const respWhile = await fetchMoviesByName(nameSearch, (lastDownPage += 1));
    console.log('respWhile ----- ', respWhile);
    getsPage = respWhile.page;
    console.log('getsPage = ', getsPage);
  }
  console.log(
    'lastDownPage: ',
    lastDownPage,
    '   getsPage: ',
    getsPage,
    '  respWhile:  ',
    respWhile
  );
  // }
  return response;
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
//

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
