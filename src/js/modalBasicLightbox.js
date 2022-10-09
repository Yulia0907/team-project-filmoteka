import * as basicLightbox from 'basiclightbox';
import { fetchTrailerById } from './fetchAPI';
import 'basiclightbox/dist/basicLightbox.min.css';
import playSvg from '../img/play.svg';

const body = document.querySelector('body');

function modalBasicLightbox({
  poster_path,
  original_title,
  title,
  name,
  vote_average,
  vote_count,
  genres,
  overview,
  popularity,
  id,
}) {
  // const filmGenres = genres.map(({ name }) => name).join(', ');
  const instance = basicLightbox.create(
    `<div class="modal">
    <div class="movie__image">
      <img class="image" src=https://image.tmdb.org/t/p/original${poster_path} alt=${
      title || original_title || name
    } />
    </div>
    <div class="movie__information">
      <div>
        <h2 class="movie__title">${title || original_title || name}</h2>
        <ul>
          <li class="movie__item">
            <p class="movie__details">Vote / Votes</p>
            <p>
              <span class="movie__rating--orange">${vote_average}</span>
              <span class="movie__rating--delimiter"> / </span>
              <span class="vote-count">${vote_count}</span>
            </p>
          </li>
          <li class="movie__item">
            <p class="movie__details">Popularity</p>
            <p>${popularity}</p>
          </li>
          <li class="movie__item">
            <p class="movie__details">Original title</p>
            <p class="movie__info--uper">${title || original_title || name}</p>
          </li>
          <li class="movie__item">
            <p class="movie__details">Genre</p>
            <p class="movie__info">${genres
              .map(genre => genre.name)
              .join(', ')}</p>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="about__title">About</h3>
        <p class="about__text">${overview}</p>
        <button type="button" class="trailer__button" data-id=${id}><img class="play__icon" src=${playSvg} alt="play" />Watch trailer</button>
      </div>
      <div class="button__wrapper">
        <button type="button" class="movie__button" data-id=${id}>Add to watched</button>
        <button type="button" class="movie__button" data-id=${id}>Add to queue</button>
      </div>
      </div>
      </div>
      `,
    {
      onShow: instance => {
        instance.element().querySelector('.modal');
        body.style.overflow = 'hidden';
        window.addEventListener('keydown', function event(evt) {
          if (evt.keyCode === 27) {
            body.style.overflow = 'auto';
            instance.close();
            window.removeEventListener('keydown', event);
          }
        });
      },
      onClose: instance => {
        body.style.overflow = 'auto';
      },
    }
  );

  instance.show();

  const trailerBtnEl = document.querySelector('.trailer__button');
  trailerBtnEl.addEventListener('click', getLinkTrailer);
}

async function getLinkTrailer(e) {
  const movieId = e.target.dataset.id;
  const trailer = await fetchTrailerById(movieId);
  const resultType = trailer.results;
  const typeObj = resultType.find(result => result.type === 'Trailer');
  if (typeObj.type !== 'Trailer') {
    const trailerBtnEl = document.querySelector('.trailer__button');
    trailerBtnEl.style.display = 'none';
    return;
  }
  const trailerKey = typeObj.key;

  const instanceTrailer = basicLightbox.create(
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    {
      onShow: instance => {
        instance.element().querySelector('.modal');
        body.style.overflow = 'hidden';
        window.addEventListener('keydown', function event(evt) {
          if (evt.keyCode === 27) {
            body.style.overflow = 'auto';
            instance.close();
            window.removeEventListener('keydown', event);
          }
        });
      },
      onClose: instance => {
        body.style.overflow = 'auto';
      },
    }
  );

  instanceTrailer.show();
}

export { modalBasicLightbox };
