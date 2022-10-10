import debounce from 'lodash.debounce';
import { fetchMoviesByName } from '../fetchAPI';
import { markupFormSearch } from './markup-form-search';
const formInputResultSearch = document.querySelector('.search-result');
const fromRefs = document.querySelector('.hero-home__form');

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
  const forHTML = markupFormSearch(fetchData.results);
  renderSearch(forHTML);
};

const renderSearch = dataRender => {
  formInputResultSearch.innerHTML = dataRender;
};

const onFormClick = evt => {
  console.log('onFormClick click ');
};

// formSearchInput.addEventListener(
//   'input',
//   debounce(onInputChange, DEBOUNCE_DELAY)
// );

// fromRefs.addEventListener('click', onFormClick);
// form
