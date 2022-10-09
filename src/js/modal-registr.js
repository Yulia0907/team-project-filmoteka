const modalSignUpEl = document.querySelector('#modal-singup');
const modalLogInEl = document.querySelector('#modal-welcome');
const openModalSignUpEl = document.querySelector('#modal-singup-btn');
const openModalLogInEl = document.querySelector('#modal-login-btn');

openModalSignUpEl.addEventListener('click', onSignUp);
openModalLogInEl.addEventListener('click', onLogIn);

function onSignUp() {
    modalSignUpEl.classList.toggle('is-hidden');
    modalLogInEl.classList.toggle('is-hidden');
};

function onLogIn() {
    modalSignUpEl.classList.toggle('is-hidden');
    modalLogInEl.classList.toggle('is-hidden');
};