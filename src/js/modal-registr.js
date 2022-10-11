import * as lightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const openModalSignUp = document.querySelector('#signup-btn');
const openModalSignIn = document.querySelector('#signin-btn');
openModalSignUp.addEventListener("click", toggleModal);
openModalSignIn.addEventListener("click", openSignIn);

const closeModalBtn = document.querySelector('.modal-regist-close-btn');
// const openModalSignIn = document.querySelector('#signin-btn');
closeModalBtn.addEventListener("click", closeModal);
// openModalSignIn.addEventListener("click", openSignIn);

const markupModalSignUp = lightbox.create(`<div class="lightbox" id="modal-singup">
  <button type="button" class="modal-close-btn modal-regist-close-btn"></button>
  <p class="modal-registr-title">Sing up to Filmoteka</p>
  <form>
    <div class="modal-registr-wrap">
      <input
        type="text"
        name="user-name"
        id="user-name"
        class="modal-registr-input"
        placeholder="Name"
        minlength="2"
        pattern="^[a-zA-Z]+"
        required
      />
      <input
        type="email"
        name="user-email"
        id="user-email"
        class="modal-registr-input"
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="user-password"
        id="user-password"
        class="modal-registr-input"
        placeholder="Password"
        minlength="2"
        pattern="^[a-zA-Z]+"
        required
      />
      <input
        type="text"
        name="user-password"
        id="user-password"
        class="modal-registr-input"
        placeholder="Verify password"
        minlength="2"
        pattern="^[a-zA-Z]+"
        required
      />
    </div>
    <button type="submit" class="modal-registr-btn-sbmt">Sign up</button>
  </form>
</div>`);

function toggleModal() {
    markupModalSignUp.show();

    window.addEventListener('keydown', onEscKeyPress);
    function onEscKeyPress(e) {
        if (e.code === "Escape") {
            markupModalSignUp.close();
        }
    }
};

const markupModalSignIn = lightbox.create(`<div class="lightbox">
<button type="button" class="modal-close-btn modal-regist-close-btn"></button>
  <p class="modal-registr-title">Welcome to Filmoteka</p>
  <form>
    <div class="modal-registr-wrap">
      <input
        type="text"
        name="user-name"
        id="user-name"
        class="modal-registr-input"
        placeholder="Name"
        minlength="2"
        pattern="^[a-zA-Z]+"
        required
      />
      <input
        type="email"
        name="user-email"
        id="user-email"
        class="modal-registr-input"
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="user-password"
        id="user-password"
        class="modal-registr-input"
        placeholder="Password"
        minlength="6"
        pattern="[a-z0-9]{1,}"
        required
      />
    </div>
    <button type="submit" class="modal-registr-btn-sbmt">Log in</button>
  </form>
</div>
`);

function openSignIn() {
    markupModalSignIn.show();

    window.addEventListener('keydown', onEscKeyPress);
    function onEscKeyPress(e) {
        if (e.code === "Escape") {
            markupModalSignIn.close();
        }
    }
}

function closeModal() {
    markupModalSignUp.close();
    markupModalSignIn.close();
}