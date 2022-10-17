import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '0214e4f6556edfc65f2eadfc23b43510';

/**
 * Function fetch data from movies API
 * @param {number} page
 * @returns {movies data object}
 */
async function fetchTrendingMovies(p = 1) {
  const params = {
    api_key: '0214e4f6556edfc65f2eadfc23b43510',
    language: 'en-US',
    page: p ?? 1,
    include_adult: false,
  };

  const { data } = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${KEY}`, { params });
  const { results } = data;
  // console.log('data: ', data);
  localStorage.setItem('movies', JSON.stringify(results));
  return data;
}

/**
 * Function receive id and fetch movie by id
 * @param {number} id
 * @returns {object}
 */
async function fetchMovieById(id) {
  const params = {
    language: 'en-US',
  };
  const { data } = await axios.get(`${BASE_URL}/movie/${id}?api_key=${KEY}`, {
    params,
  });
  // console.log(data);
  return data;
}

async function fetchMoviesByNameQuickSearch(movieName, p = 1) {
  const params = {
    api_key: '0214e4f6556edfc65f2eadfc23b43510',
    language: 'en-US',
    page: p ?? 1,
    include_adult: false,
    query: movieName,
  };

  try {
    const { data } = await axios.get(`${BASE_URL}/search/movie?api_key${KEY}`, {
      params,
    });
    const { results } = data;
    // localStorage.setItem('movies', JSON.stringify(results));
    return data;
  } catch (error) {
    console.log(error.statusText);
  }
}

/**
 * Function receives movie name and page, doing fetch by received params
 * @param {string} movieName
 * @param {number} page
 * @returns {movies data object}
 */
async function fetchMoviesByName(movieName, p = 1) {
  const params = {
    api_key: '0214e4f6556edfc65f2eadfc23b43510',
    language: 'en-US',
    page: p ?? 1,
    include_adult: false,
    query: movieName,
  };

  try {
    const { data } = await axios.get(`${BASE_URL}/search/movie?api_key${KEY}`, {
      params,
    });
    const { results } = data;
    localStorage.setItem('movies', JSON.stringify(results));
    return data;
  } catch (error) {
    console.log(error.statusText);
  }
}

/**
 *  Function fetch array of movies genres objects and save it in localStorage
 */
async function fetchGenresList() {
  const params = {
    language: 'en-US',
  };
  try {
    const { data } = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${KEY}`, { params });
    const genresList = data.genres;
    localStorage.setItem('genresList', JSON.stringify(genresList));
  } catch (error) {
    console.log(error.message);
  }
}

if (!localStorage.getItem('genresList')) {
  fetchGenresList();
}

/**
 * Function fetch movie trailer by id
 * @param {number} id
 * @returns {movie data object}
 */
async function fetchTrailerById(id) {
  const params = {
    language: 'en-US',
  };
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${KEY}`, { params });
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export {
  fetchTrendingMovies,
  fetchMovieById,
  fetchMoviesByName,
  fetchMoviesByNameQuickSearch,
  fetchGenresList,
  fetchTrailerById,
};
