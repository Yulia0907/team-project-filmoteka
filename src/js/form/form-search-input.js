import debounce from 'lodash.debounce';
import { fetchMoviesByName } from '../api/fetchAPI-v2';
import { markupFormListSearch } from './markup-form-search';
import { galletyFetchAndRender } from '../moviesGallery';
const formInputResultSearch = document.querySelector('.search-result');
const formRefs = document.querySelector('.hero-home__form');

const formSearchInput = document.querySelector('.form_input');

const DEBOUNCE_DELAY = 500;
const PAGE_PER_REQUEST = 4;

let dataForRender = [];
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
  let dataForRender = '';

  console.log(
    'searchString:  ',
    searchString,
    '  searchLastDownPage: ',
    lastDownPage
  );
  // lastDownPage += 1;
  // const res =
  const response = await fetchMoviesByNameGetAll(
    searchString,
    PAGE_PER_REQUEST
  );
  console.log('return first objects: === ', response);
  const forHTML = markupFormListSearch(response);
  renderSearch(forHTML);
  dataForRender = [];
  return;
  // fetchMoviesByNameService(searchString, (searchLastDownPage += 1));
  //   .then(data =>
  //   console.log('then after fetchMoviesByNameService ret data: ', data)
  // );
  // console.log('download searchLastDownPage: ', searchLastDownPage);

  // console.log('    dataForRender one: ',     dataForRender);

  // while (searchLastDownPage < totalFoundPages) {
  //   searcharray += fetchMoviesByNameService(
  //     searchString,
  //     (searchLastDownPage += 1)
  //   );
  // }

  // renderSearch(    dataForRender);
}

async function fetchMoviesByNameGetAll(nameSearch, page) {
  dataForRender = [];
  lastDownPage = 0;
  // totalFoundPages = 0;
  // let totalFoundResults = 0;;
  const response = await fetchMoviesByName(nameSearch, (lastDownPage += 1));
  dataForRender = [...response.results];
  console.log('return fetchMoviesByName then JSON:  ', response);
  totalFoundPages = response.total_pages;
  getsPage = response.page;

  return fetchMoviesByNameGetAllNext(nameSearch, page);
}

async function fetchMoviesByNameGetAllNext(nameSearch, page) {
  getsPage > 1 ? (dataForRender = []) : '';
  let respWhile = [];
  while (page > lastDownPage && totalFoundPages > lastDownPage) {
    const respWhile = await fetchMoviesByName(nameSearch, (lastDownPage += 1));
    console.log('respWhile ----- ', respWhile);
    getsPage = respWhile.page;
    console.log('getsPage = ', getsPage);
    dataForRender = [...dataForRender, ...respWhile.results];
  }
  console.log('dataForRender:   ', dataForRender);
  return dataForRender;
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

//получаем массив с данными о фмльмах и
const prepareArrayForRender = fetchData => {
  console.log('fetchData.results: ', fetchData);
  const forHTML = markupFormListSearch(fetchData);
  return forHTML;
};

const renderSearch = dataRender => {
  formInputResultSearch.innerHTML = dataRender;
  document.body.addEventListener('click', onFormClick);
};

const renderAddedSearch = datarender => {
  formInputResultSearch.insertAdjacentElement('beforeend', datarender);
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
  // console.log(evt.scrollHeight);
};

//--------------------------------
// offsetHeight 440
// scrollHeight 1654  1654-440=1214
// scrollTop 1214
const scrollSearch = evt => {
  const { offsetHeight, scrollHeight, scrollTop } = evt.target;
  if (scrollHeight * 0.3 > scrollHeight - offsetHeight - scrollTop) {
    console.log('fetchNext');
    const forHTML = fetchMoviesByNameGetAllNext(
      searchString,
      PAGE_PER_REQUEST + lastDownPage
    );
    console.log('forHTML: ', forHTML);
    renderAddedSearch(forHTML);
    dataForRender = [];
    return;
  }
  // console.dir(evt.target);

  // console.log(evt.target.scrollHeight);
  // console.log(formInputResultSearch.pageYOffset);
};

formSearchInput.addEventListener(
  'input',
  debounce(onInputChange, DEBOUNCE_DELAY)
);

formInputResultSearch.addEventListener('scroll', debounce(scrollSearch, 100));
