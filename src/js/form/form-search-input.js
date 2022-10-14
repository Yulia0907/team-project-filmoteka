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
let lastNameSearch = '';
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
  console.log('------onInputChange------');

  lastDownPage = 0;
  dataForRender = [];

  const ret = await quickSearchFetchAndRender(searchString);
  console.log(ret);
  console.log('lastNameSearch: ', lastNameSearch);
  return;
}

async function fetchMoviesByNameGetAll(nameSearch) {
  console.log('------fetchMoviesByNameGetAll------');
  dataForRender = [];
  lastDownPage = 0;
  // totalFoundPages = 0;
  // let totalFoundResults = 0;;
  const response = await fetchMoviesByName(nameSearch, (lastDownPage += 1));
  console.log('lastNameSearch  in getAll do: ', lastNameSearch);
  lastNameSearch = nameSearch;
  console.log('lastNameSearch  in getAll posle: ', lastNameSearch);

  dataForRender = [...response.results];
  console.log('return fetchMoviesByName then JSON:  ', response);
  totalFoundPages = response.total_pages;
  lastDownPage = response.page;
  // return;
  return fetchMoviesByNameGetAllNext(nameSearch);
}

async function fetchMoviesByNameGetAllNext(nameSearch) {
  console.log('------fetchMoviesByNameGetAllNext------');
  console.log(
    'nameSearch: ',
    nameSearch,
    '   lastDownPage: ',
    lastDownPage,
    '  totalFoundPages: ',
    totalFoundPages
  );
  // lastDownPage > 1 ? (dataForRender = []) : null;
  const pageEnd = lastDownPage + PAGE_PER_REQUEST;
  let respWhile = [];
  while (pageEnd > lastDownPage && totalFoundPages > lastDownPage) {
    const respWhile = await fetchMoviesByName(nameSearch, (lastDownPage += 1));
    console.log('respWhile ----- ', respWhile);
    lastDownPage = respWhile.page;
    // console.log('getsPage = ', getsPage);
    dataForRender.length === 0
      ? (dataForRender = [...respWhile.results])
      : (dataForRender = [...dataForRender, ...respWhile.results]);
  }
  console.log('dataForRender:   ', dataForRender);
  return dataForRender;
}

async function quickSearchFetchAndRender(nameSearch) {
  nameSearch = nameSearch.toLowerCase();
  console.log('------quickSearchFetchAndRender------');
  let response = [];
  if (lastNameSearch != nameSearch) {
    console.log('-----   lastNameSearch === nameSearch  ------');
    console.log('//* получаю в response готовый массив объектов.   fetchMoviesByNameGetAll');
    //* получаю в response готовый массив объектов
    response = await fetchMoviesByNameGetAll(nameSearch);
    console.log('!!!return first objects: === ', response);
  } else {
    console.log('* получаю в response продолжение, если есть.   fetchMoviesByNameGetAllNext');

    //* получаю в response продолжение, если есть
    if (lastDownPage === totalFoundPages) {
      return;
    }
    response = await fetchMoviesByNameGetAllNext(searchString);
    console.log('!!!return NEXT objects: === ', response);
  }

  //* подготавливаю из массива объектов разметку
  const forHTML = markupFormListSearch(response);

  //* рендерю разметку в форме поиска
  renderSearch(forHTML);

  //* очищаю данные для рендеринга
  dataForRender = [];
  return 'ok';
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
    console.log('------scrollSearch------');
    dataForRender = [];
    const response = fetchMoviesByNameGetAllNext(searchString, PAGE_PER_REQUEST);
    console.log('response: ', response);
    //* подготавливаю из массива объектов разметку
    const forHTML = markupFormListSearch(response);

    //* рендерю разметку в форме поиска
    renderAddedSearch(forHTML);

    //* очищаю данные для рендеринга
    dataForRender = [];
    return 'ok added search';

    console.log('forHTML: ', forHTML);
    renderAddedSearch(forHTML);
    dataForRender = [];
    return;
  }
  // console.dir(evt.target);

  // console.log(evt.target.scrollHeight);
  // console.log(formInputResultSearch.pageYOffset);
};

formSearchInput.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

formInputResultSearch.addEventListener('scroll', debounce(scrollSearch, 100));
