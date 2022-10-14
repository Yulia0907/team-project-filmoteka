import { fetchTrendingMovies } from './fetchAPI';
import { createMovieCards } from './moviesMarkup';
import { paginationOptions } from './pagination-options';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const moviesContainer = document.querySelector('.movies');

/**
 * Function fetch trending movies and make markup on page
 */
async function trendingMovies() {
  // try {
  const res = await fetchTrendingMovies();
  moviesContainer.innerHTML = createMovieCards(res.results);
  const returPaginationOption = paginationOptions(res.total_results);

  const pagination = new Pagination('pagination', returPaginationOption);

  pagination.on('afterMove', ({ page }) => {
    fetchTrendingMovies(page).then(res => {
      moviesContainer.innerHTML = createMovieCards(res.results);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  // } catch (error) {
  //   console.log('error', error.message);
  // }
}
trendingMovies();
