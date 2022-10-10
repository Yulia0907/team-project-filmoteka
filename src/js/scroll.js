const scrollToTopBtn = document.querySelector('#scrollToTopBtn'); // получаем обьект кнопки из html документа по id
const rootElement = document.documentElement; // получаем корневой документ html

function scrollToTop() {
  // функция-обработчик нажатия на кнопку

  rootElement.scrollTo({
    // вызов js api (функции) для перемещения скролла в позицию 0 - от начала документа
    top: 0,
    behavior: 'smooth', // параметр плавной прокрутки
  });
}

scrollToTopBtn.addEventListener('click', scrollToTop); // добавляем функцию-обработчик на click event (событие) кнопки

function scrollEvent() {
  // функция-обработчик событий скролла. скролл - это любая прокрутка колесика мышки на странице

  if (window.pageYOffset > 300) {
    // каждый скролл проверяем есть ли 300рх от начала сайта / страницы
    scrollToTopBtn.classList.add('scroll-visible'); // если да - добавляем
    scrollToTopBtn.classList.remove('noHover');
    scrollToTopBtn.classList.remove('clicked');
  } else {
    scrollToTopBtn.classList.remove('scroll-visible'); // если нет - удаляем
    scrollToTopBtn.classList.add('noHover');
    scrollToTopBtn.classList.add('clicked');
  }
}

window.addEventListener('scroll', scrollEvent); // window - это все окно. задаем функцию-обработчик события скролла на все окно сайта

// каждый раз при прокрутке колесиком будет вызываться функция обработчик scrollEvent
