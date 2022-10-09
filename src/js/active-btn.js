const watchedBtn = document.querySelector('[data-id=watched-btn]');
const queueBtn = document.querySelector('[data-id=queue-btn]');
const watchedSet = document.querySelector('.header-button__wrapper');

watchedBtn.disabled = true;

watchedSet.addEventListener('click', makeActiveBtn);

function makeActiveBtn() {
  watchedBtn.classList.toggle('is-active');
  queueBtn.classList.toggle('is-active');
  if (watchedBtn.classList.contains('is-active') === true) {
    watchedBtn.disabled = true;
  } else {
    watchedBtn.disabled = false;
  }
  if (queueBtn.classList.contains('is-active') === true) {
    queueBtn.disabled = true;
  } else {
    queueBtn.disabled = false;
  }
}
