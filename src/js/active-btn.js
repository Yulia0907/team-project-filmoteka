const watchedBtn = document.querySelector('[data-id=watched-btn]');
const queueBtn = document.querySelector('[data-id=queue-btn]');
const watchedSet = document.querySelector('.header-button__wrapper');
// console.log(watchedBtn);
// console.log(queueBtn);
// watchedBtn.disabled = true;
watchedSet.addEventListener('click', makeActiveWatched);

function makeActiveWatched() {
  watchedBtn.classList.toggle('is-active');
  queueBtn.classList.toggle('is-active');
}
