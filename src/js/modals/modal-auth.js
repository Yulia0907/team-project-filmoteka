import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import Notiflix from 'notiflix';

const openModalSignUpEl = document.querySelector('#signup-btn');
const openModalLogInEl = document.querySelector('#login-btn');
const closeModalSignUpEl = document.querySelector('.close-signup-btn');
const closeModalLogInel = document.querySelector('.close-login-btn');

const openModal = document.querySelector('.login-btn');
console.log('openModal = ', openModal);
openModal.addEventListener('click', toggleModal);

const inputEl = document.querySelector('#registration-form-password');
const inputVerifyEl = document.querySelector('#user-verify-password');

const btnSubmit = document.querySelector('#signup-submit');

const markupModalSignUp = basicLightbox.create(document.querySelector('#modal-signup'));
const markupModalLogIn = basicLightbox.create(document.querySelector('#modal-welcome'), {
  className: 'modal-registr',
});

function toggleModal(e) {
  console.log('кликнуто открыть модалку логина');
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

// verify password

btnSubmit.addEventListener('click', verifyPassword);

function verifyPassword(e) {
  e.preventDefault();
  const password = inputEl.value;
  const verifyPassword = inputVerifyEl.value;

  if (password !== verifyPassword) {
    Notiflix.Notify.failure('Password is incorrect. Please try again.');
    return false;
  }
  return true;
}

// for login
function closeOnSubmit() {
  markupModalLogIn.close();
  markupModalSignUp.close();
}

const registrationForm = markupModalSignUp.element().querySelector('#registration-form');

const registrationFormEmail = markupModalSignUp.element().querySelector('#registration-form-email');

const registrationFormPassword = markupModalSignUp
  .element()
  .querySelector('#registration-form-password');

const registrationFormSubmit = markupModalSignUp.element().querySelector('#signup-submit');
const loginForm = markupModalLogIn.element().querySelector('#login-form');

const loginFormName = markupModalLogIn.element().querySelector('#login-form-name');

const loginFormEmail = markupModalLogIn.element().querySelector('#login-form-email');

const loginFormPassword = markupModalLogIn.element().querySelector('#login-form-password');

export { toggleModal, onSignUp, onLogIn };

export {
  registrationForm,
  registrationFormEmail,
  registrationFormPassword,
  loginForm,
  loginFormName,
  loginFormEmail,
  loginFormPassword,
  registrationFormSubmit,
  onCloseModal,
  closeOnSubmit,
};
