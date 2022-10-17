import * as basicLightbox from 'basiclightbox';
import { fetchTrailerById } from './fetchAPI';
import 'basiclightbox/dist/basicLightbox.min.css';
import playSvg from '../img/play.svg';
import noFoto from '../img/no_ing.jpg';
import { createMovieCards } from './moviesMarkup';
import nothingHereIMG from '../img/thereNothingHere.jpg';

const body = document.querySelector('body');
let instance;

function modalBasicLightbox(
  {
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
  },
  tag
) {
  const imgUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : noFoto;
  let aboutEl = '';
  if (overview.length > 0) {
    aboutEl = 'About';
  }
  let genresNo = '';
  if (genres.length > 0) {
    genresNo = 'Genres';
  }
  instance = basicLightbox.create(
    `<div class="modal">
    <button class="mobalClose__btn" type="button"></button>
    <div class="movie__image">
      <img class="image" src=${imgUrl} alt=${title || original_title || name} />
    </div>
    <div class="movie__information">
      <div>
        <h2 class="movie__title">${title || original_title || name}</h2>
        <ul>
          <li class="movie__item">
            <p class="movie__details">Vote / Votes</p>
            <p>
              <span class="movie__rating--orange">${vote_average.toFixed(1)}</span>
              <span class="movie__rating--delimiter"> / </span>
              <span class="vote-count">${vote_count}</span>
            </p>
          </li>
          <li class="movie__item">
            <p class="movie__details">Popularity</p>
            <p>${popularity.toFixed(1)}</p>
          </li>
          <li class="movie__item">
            <p class="movie__details">Original title</p>
            <p class="movie__info--uper">${title || original_title || name}</p>
          </li>
          <li class="movie__item">
            <p class="movie__details">${genresNo}</p>
            <p class="movie__info">${genres.join(', ')}</p>

          </li>
        </ul>
      </div>
      <div>
        <h3 class="about__title">${aboutEl}</h3>
        <p class="about__text">${overview}</p>
        <button type="button" class="trailer__button" data-id=${id}><img class="play__icon" src=${playSvg} alt="play" />Watch trailer</button>
      </div>
      <div class="button__wrapper">
        <button type="button" class="movie__button btn-watched" data-id=${id} onclick="this.blur();">Add to watched</button>
        <button type="button" class="movie__button btn-queue" data-id=${id} onclick="this.blur();">Add to queue</button>
      </div>
      </div>
      </div>
      `,
    {
      onShow: () => {
        instance.element().querySelector('.modal');
        instance.element().querySelector('.mobalClose__btn').onclick = () => {
          instance.close();
        };
        body.style.overflow = 'hidden';
        window.addEventListener('keydown', onEscKeyPress);
        instance.element(
          '.basicLightbox.film-detail'
        ).style.background = `linear-gradient(rgba(100, 100, 100, 0.7), rgba(100, 100, 100, 0.7)), url('${imgUrl}') center center / cover no-repeat`;

        // body.style.overflow = 'auto';
      },
      onClose: () => {
        localStorage.removeItem('current-film');
        body.style.overflow = 'auto';
        window.removeEventListener('keydown', onEscKeyPress);
        // console.log(tag);

        if (tag !== 'movies') {
          const moviesListOnClose = JSON.parse(localStorage.getItem(`${tag}`));
          let markup = '';
          if (moviesListOnClose === null || moviesListOnClose.length === 0) {
            markup = `<li class="default-img"><img src="${nothingHereIMG}" 
              alt="nothing-here" width="400px"></img></li>`;
          } else {
            markup = createMovieCards(moviesListOnClose);
          }
          const moviesContainer = document.querySelector('.movies');
          moviesContainer.innerHTML = markup;
        }
      },
      className: 'film-modal',
    }
  );

  instance.show();

  async function tryFetch() {
    const trailer = await fetchTrailerById(id);
    const resultType = trailer.results;
    const typeObj = resultType.find(result => result.type === 'Trailer');
    if (resultType.length === 0 || typeObj.type !== 'Trailer') {
      trailerBtnEl.style.display = 'none';
      return;
    }
    return;
  }
  tryFetch();

  const trailerBtnEl = document.querySelector('.trailer__button');
  trailerBtnEl.addEventListener('click', getLinkTrailer);
}

async function getLinkTrailer(e) {
  const trailerBtnEl = document.querySelector('.trailer__button');
  const movieId = e.target.dataset.id;
  const trailer = await fetchTrailerById(movieId);
  const resultType = trailer.results;
  const typeObj = resultType.find(result => result.type === 'Trailer');
  if (resultType.length === 0 || typeObj.type !== 'Trailer') {
    trailerBtnEl.style.display = 'none';
    return;
  }
  const trailerKey = typeObj.key;

  const instanceTrailer = basicLightbox.create(
    `<iframe width="700" height="400" src="https://www.youtube.com/embed/${trailerKey}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
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

function onEscKeyPress(evt) {
  // console.log(evt);
  if (evt.keyCode === 27) {
    instance.close();
  }
}

export { modalBasicLightbox };
