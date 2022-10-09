import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const body = document.querySelector('body');
const closeBtn = document.querySelector('.modalClose__btn');

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
  const instance = basicLightbox.create(
    `<div class="modal">
    <button class="mobalClose__btn" type="button"></button>
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
              <span class="movie__rating--orange">${vote_average.toFixed(
                1
              )}</span>
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
        instance.element().querySelector('.mobalClose__btn').onclick = () => {
          instance.close();
        };
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
}

export { modalBasicLightbox };
