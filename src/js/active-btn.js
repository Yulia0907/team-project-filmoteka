const watchedBtn = document.querySelector('[data-id=watched-btn]');
const queueBtn = document.querySelector('[data-id=queue-btn]');
const watchedSet = document.querySelector('.header-button__wrapper');

watchedSet.addEventListener('click', makeActiveBtn);

function makeActiveBtn(evt) {
  if (evt.target.classList.contains('is-active')) {
    return;
  }
  watchedBtn.classList.toggle('is-active');
  queueBtn.classList.toggle('is-active');
  return;
}
