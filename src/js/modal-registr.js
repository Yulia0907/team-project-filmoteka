// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';

// const openModalSignUpEl = document.querySelector('#signup-btn');
// const openModalLogInEl = document.querySelector('#login-btn');
// const closeModalSignUpEl = document.querySelector('.close-singup-btn');
// const closeModalLogInel = document.querySelector('.close-login-btn');

// const openModal = document.querySelector('#login');
// openModal.addEventListener('click', toggleModal);

// const markupModalLogIn = basicLightbox.create(
//   document.querySelector('#modal-welcome')
// );

// function toggleModal() {
//   markupModalLogIn.show();

//   window.addEventListener('keydown', onEscKeyPress);
//   function onEscKeyPress(e) {
//     if (e.code === 'Escape') {
//       markupModalLogIn.close();
//     }
//   }
// }

// openModalSignUpEl.addEventListener('click', onSignUp);
// openModalLogInEl.addEventListener('click', onLogIn);
// closeModalSignUpEl.addEventListener('click', onCloseModal);
// closeModalLogInel.addEventListener('click', onCloseModal);

// const markupModalSignUp = basicLightbox.create(
//   document.querySelector('#modal-singup')
// );
// function onSignUp() {
//   markupModalSignUp.show();

//   window.addEventListener('keydown', onEscKeyPress);
//   function onEscKeyPress(e) {
//     if (e.code === 'Escape') {
//       markupModalSignUp.close();
//     }
//   }

//   markupModalLogIn.close();
// }

// function onLogIn() {
//   markupModalLogIn.show();
//   markupModalSignUp.close();
// }

// function onCloseModal(e) {
//   e.preventDefault();
//   markupModalLogIn.close();
//   markupModalSignUp.close();
// }

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const openModalSignUpEl = document.querySelector('#signup-btn');
const openModalLogInEl = document.querySelector('#login-btn');
const closeModalSignUpEl = document.querySelector('.close-singup-btn');
const closeModalLogInel = document.querySelector('.close-login-btn');

const openModal = document.querySelector('.open-modal-svg');
openModal.addEventListener('click', toggleModal);

const markupModalLogIn = basicLightbox.create(
  document.querySelector('#modal-welcome')
);

function toggleModal(e) {
  e.preventDefault();
  markupModalLogIn.show();

  window.addEventListener('keydown', onEscKeyPress);
  function onEscKeyPress(e) {
    if (e.code === 'Escape') {
      markupModalLogIn.close();
    }
  }
}

openModalSignUpEl.addEventListener('click', onSignUp);
openModalLogInEl.addEventListener('click', onLogIn);
closeModalSignUpEl.addEventListener('click', onCloseModal);
closeModalLogInel.addEventListener('click', onCloseModal);

const markupModalSignUp = basicLightbox.create(
  document.querySelector('#modal-singup')
);
function onSignUp(e) {
  e.preventDefault();
  markupModalSignUp.show();

  window.addEventListener('keydown', onEscKeyPress);
  function onEscKeyPress(e) {
    if (e.code === 'Escape') {
      markupModalSignUp.close();
    }
  }

  markupModalLogIn.close();
}

function onLogIn(e) {
  e.preventDefault();
  markupModalLogIn.show();
  markupModalSignUp.close();
}

function onCloseModal(e) {
  e.preventDefault();
  markupModalLogIn.close();
  markupModalSignUp.close();
}

function closeOnSubmit() {
  markupModalLogIn.close();
  markupModalSignUp.close();
}

const registrationForm = markupModalSignUp
  .element()
  .querySelector('#registration-form');

const registrationFormName = markupModalSignUp
  .element()
  .querySelector('#registration-form-name');

const registrationFormEmail = markupModalSignUp
  .element()
  .querySelector('#registration-form-email');

const registrationFormPassword = markupModalSignUp
  .element()
  .querySelector('#registration-form-password');

const loginForm = markupModalLogIn.element().querySelector('#login-form');

const loginFormName = markupModalLogIn
  .element()
  .querySelector('#login-form-name');

const loginFormEmail = markupModalLogIn
  .element()
  .querySelector('#login-form-email');

const loginFormPassword = markupModalLogIn
  .element()
  .querySelector('#login-form-password');

export { toggleModal, onSignUp, onLogIn };

export {
  registrationForm,
  registrationFormName,
  registrationFormEmail,
  registrationFormPassword,
  loginForm,
  loginFormName,
  loginFormEmail,
  loginFormPassword,
  onCloseModal,
  closeOnSubmit,
};
