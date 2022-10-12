import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const openModalSignUpEl = document.querySelector('#signup-btn');
const openModalLogInEl = document.querySelector('#login-btn');
const closeModalSignUpEl = document.querySelector('.close-singup-btn');
const closeModalLogInel = document.querySelector('.close-login-btn');

const openModal = document.querySelector('.open-modal-svg');
openModal.addEventListener('click', toggleModal);

const markupModalLogIn = basicLightbox.create(
  document.querySelector('#modal-welcome'),
  { className: 'modal-registr' }
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

const inputEl = document.getElementById('#user-password');
const inputVerifyEl = document.querySelector('#user-verify-password');

function verifyPassword(e) {
  e.preventDefault();
  const password = inputEl.target.value;
  const verifyPassword = inputVerifyEl.target.value;

  console.log(password);
  if (password === verifyPassword) {
    console.log('adads');
  }
}

const btnSubmit = document.querySelector('#signup-submit');
const btnLogInEl = document.querySelector('.modal-registr-btn-sbmt');
// btnSubmit.addEventListener('click', verifyPassword);

// console.log(btnSubmit);
// console.log(btnLogInEl);

function isLoginValid(login) {
  if (login.length < 6) {
    alert('error');

    return false;
  }
  return true;
}

// for login
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
