function createMovieCards(movies) {
  if (movies === null) {
    return ''; // чтобы не было ошибки в случае, если movies = undefined
  }
  return movies
    .map(
      ({
        poster_path,
        title,
        id,
        name,
        release_date,
        first_air_date,
        vote_average,
        genres,
        genre_ids,
      }) => {
        const moviRating = vote_average === 0 ? '-' : vote_average.toFixed(1);
        const genresListFromStorage = localStorage.getItem('genresList');
        const parsedGenres = JSON.parse(genresListFromStorage);

        if (genre_ids) {
          filmGenres = parsedGenres
            .filter(({ id }) => genre_ids.includes(id))
            .map(({ name }) => name)
            .slice(0, 2)
            .join(', ');
        }
        const imgUrl = poster_path
          ? `https://image.tmdb.org/t/p/original${poster_path}`
          : 'https://via.placeholder.com/395x574';

        return `<li class="movies__item" data-id=${id}>
                <div class="movies__img">
                <img src=${imgUrl} alt="${title || name}" loading="lazy">
        </div>
                <div class="movies__description">
                  <p class="movies__title">${title || name}</p>
                  <div class="movies__meta">
                    <p class="movies__genres">${filmGenres}</p>
                    <p class="movies__data">${
                      parseInt(release_date) || parseInt(first_air_date)
                    }</p>
                    <span class="movies__rating">${moviRating}</span>
                  </div>
                </div>
            </li>`;
      }
    )
    .join('');
}

export { createMovieCards };
