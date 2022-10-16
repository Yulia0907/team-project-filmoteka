import { fetchTrendingMovies } from './fetchAPI';
import { createMovieCards } from './moviesMarkup';
import { paginationOptions } from './pagination-options';
// import './pagination-options';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

// const paginationOptions = {
//   totalItems: 0,
//   itemsPerPage: 20,
//   visiblePages: 3,
//   centerAlign: true,
//   firstItemClassName: 'pagination-first-child',
//   lastItemClassName: 'pagination-last-child',
//   usageStatistics: false,
// };

const moviesContainer = document.querySelector('.movies');

// const getPaginationsOption = totalResults => paginationOptions;
/**
 * Function fetch trending movies and make markup on page
 */
async function trendingMovies() {
  // try {
  const res = await fetchTrendingMovies();
  moviesContainer.innerHTML = createMovieCards(res.results);

  console.log('res: ', res);
  // let returnPaginationOption = null;
  // console.log(typeof paginationOptions(res.total_results)); //.then(e => (returnPaginationOption = e));
  // paginationOptions.totalItems = res.total_results;
  // console.log(returnPaginationOption);

  const pagination = new Pagination('pagination', paginationOptions(res.total_results));

  pagination.on('afterMove', ({ page }) => {
    fetchTrendingMovies(page).then(res => {
      moviesContainer.innerHTML = createMovieCards(res.results);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // console.log('!!!!');
  // document.querySelector('.pagination-first-child').textContent = 1;
  // document.querySelector('.pagination-last-child').textContent = res.;

  // } catch (error) {
  //   console.log('error', error.message);
  // }
}
trendingMovies();
