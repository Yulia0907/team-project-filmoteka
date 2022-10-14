document.body.onload = function () {
  setTimeout(function () {
    const preloader = document.querySelector('.preloader');
    preloader.classList.toggle('done');
  }, 100);
};
