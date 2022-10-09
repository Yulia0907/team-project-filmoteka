const watchedBtn = document.querySelector('[data-id=watched-btn]');
const queueBtn = document.querySelector('[data-id=queue-btn]');
const watchedSet = document.querySelector('.header-button__wrapper');
// console.log(watchedBtn);
// console.log(queueBtn);
// watchedBtn.disabled = true;
watchedSet.addEventListener(
  'click',
  makeActiveWatched,
  makeActiveQueue,
  activeBtn
);

function activeBtn(e) {
  if (watchedBtn.classList.contains('is-active') === true) {
    watchedBtn.disabled = true;
    queueBtn.disabled = false;
  } else if (queueBtn.classList.contains('is-active') === true) {
    queueBtn.disabled = true;
    watchedBtn.disabled = false;
  }
}

function makeActiveWatched(e) {
  e.preventDefault();
  watchedBtn.classList.toggle('is-active');
  // if (watchedBtn.classList.contains('is-active') === true) {
  //   watchedBtn.disabled = true;
  //   queueBtn.disabled = false;
}
// watchedBtn.disabled = true;
// queueBtn.disabled = false;
// }

function makeActiveQueue(e) {
  e.preventDefault();
  queueBtn.classList.toggle('is-active');
  // if (queueBtn.classList.contains('is-active') === true) {
  //   queueBtn.disabled = true;
  //   watchedBtn.disabled = false;
  // }
}
//   watchedBtn.disabled = false;
//   queueBtn.disabled = true;
// }
// if (watchedBtn.classList.contains('is-active')) {
//   watchedBtn.disabled = true;
//   queueBtn.disabled = false;
// }
// if (queueBtn.classList.contains('is-active')) {
//   queueBtn.disabled = true;
//   watchedBtn.disabled = false;
// }
