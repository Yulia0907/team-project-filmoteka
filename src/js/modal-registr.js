import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/dist/basicLightbox.min.css';

const openModalSignUpEl = document.querySelector('#modal-singup-btn');
const openModalLogInEl = document.querySelector('#modal-login-btn');

const openModal = document.querySelector('#check');
openModal.addEventListener("click", toggleModal);

const markupModalLogIn = basicLightbox.create(document.querySelector('#modal-welcome'));

function toggleModal() {
    markupModalLogIn.show();

    window.addEventListener('keydown', onEscKeyPress);
    function onEscKeyPress(e) {
        if (e.code === "Escape") {
            markupModalLogIn.close();
        }
    }
};

openModalSignUpEl.addEventListener('click', onSignUp);
openModalLogInEl.addEventListener('click', onLogIn);

const markupModalSignUp = basicLightbox.create(document.querySelector('#modal-singup'));
function onSignUp() {

    markupModalSignUp.show();

    window.addEventListener('keydown', onEscKeyPress);
    function onEscKeyPress(e) {
        if (e.code === "Escape") {
            markupModalSignUp.close();
        }
    }

    markupModalLogIn.close();
};

function onLogIn() {
    markupModalLogIn.show();
    markupModalSignUp.close();
};

export { toggleModal, onSignUp, onLogIn };