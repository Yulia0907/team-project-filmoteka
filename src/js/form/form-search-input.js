import debounce from 'lodash.debounce';
import { fetchMoviesByName } from '../fetchAPI';
import { markupFormListSearch } from './markup-form-search';
import { galletyFetchAndRender } from '../moviesGallery';
const formInputResultSearch = document.querySelector('.search-result');
const formRefs = document.querySelector('.hero-home__form');

const formSearchInput = document.querySelector('.form_input');
const DEBOUNCE_DELAY = 500;

let searchString = null;

const onInputChange = e => {
  searchString = e.target.value.trim();
  if (searchString.length === 0) {
    renderSearch('');
    return;
  }

  fetchMoviesByName(searchString).then(data => {
    console.log('fetchMoviesByName data.results: ', data.results);
    // return data;
    prepareArrayForRender(data);
  });
};

const prepareArrayForRender = fetchData => {
  console.log('fetchData.results: ', fetchData);
  const forHTML = markupFormListSearch(fetchData.results);
  renderSearch(forHTML);
};

const renderSearch = dataRender => {
  formInputResultSearch.innerHTML = dataRender;
  document.body.addEventListener('click', onFormClick);
};

const onFormClick = evt => {
  if (!evt.target.closest('.hero-home__form')) {
    renderSearch('');
    document.body.removeEventListener('click', onFormClick);
  }
  console.log('evt:  ', evt);
  let elementOfClick = evt.target.closest('.search-result__item');
  console.log('elementOfClick:   ', elementOfClick);
  const searchID = elementOfClick.dataset.id;
  const searchName = elementOfClick.firstElementChild.textContent;
  console.log('searchID: ', searchID);
  console.log('searchName: ', searchName);
  renderSearch('');

  galletyFetchAndRender(searchName);
};

formRefs.addEventListener('submit', onFormInputHandler);

function onFormInputHandler(event) {
  event.preventDefault();
  const movieName = formRefs.elements.searchQuery.value.trim();
  if (movieName === '') {
    return console.log('Empty search query');
  }
  renderSearch('');

  galletyFetchAndRender(movieName);
  // resetPage();
  return;
}

const searchFilmFromID = filmid => {
  //
};

formSearchInput.addEventListener(
  'input',
  debounce(onInputChange, DEBOUNCE_DELAY)
);

// fromRefs.addEventListener('click', onFormClick);
// form
