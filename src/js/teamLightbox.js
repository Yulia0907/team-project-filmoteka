// import './js/teamLightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import * as basicLightbox from 'basiclightbox';

import showConfetti from './confetti';

import aleksandrImg from '../img/team/aleksandr-k.jpg';
import oksanaImg from '../img/team/Oksana.jpg';
import alekseiImg from '../img/team/Aleksei.jpg';
import dmytroImg from '../img/team/Dmytro.jpg';
import yuliaImg from '../img/team/Yulia.jpg';
import antonImg from '../img/team/Anton.jpg';
import maximImg from '../img/team/Maksim.jpg';
import evgeniyImg from '../img/team/Evgeniy.jpg';
import yelyzavetaImg from '../img/team/Yelyzaveta.jpg';
import artemImg from '../img/team/user-min.png';
import yuriiImg from '../img/team/Yurii.jpg';
import spriteUrl from '../img/team/sprite.svg';

const markupTeam = `<div class="team-wrapper">
<div class="team-card">
    <img src="${aleksandrImg}" alt="Aleksandr" class="team-image">
    <p class="team-name">Aleksandr Kadulin</p>
    <p class="team-role">Team Lead</p>
    <a href="https://github.com/NilKad" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteUrl}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${oksanaImg}" alt="Oksana" class="team-image">
    <p class="team-name">Oksana Kuzich</p>
    <p class="team-role">Scrum Master</p>
    <a href="https://github.com/OksanaKuzich" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteUrl}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${alekseiImg}" alt="Aleksei" class="team-image">
    <p class="team-name">Aleksei Baliuk</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/AlekseiBaliuk" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteUrl}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${dmytroImg}" alt="Dmytro" class="team-image">
    <p class="team-name">Dmytro Kobeza</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/kobeza1" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteUrl}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${yuliaImg}" alt="Yulia" class="team-image">
    <p class="team-name">Yulia Sukhonenko</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/Yulia0907" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteUrl}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${antonImg}" alt="Anton" class="team-image">
    <p class="team-name">Anton Ostapienko</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/AntonyUser" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteUrl}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${maximImg}" alt="Maksim" class="team-image">
    <p class="team-name">Maksim Semak</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/Pleomax07" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteUrl}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${evgeniyImg}" alt="Evgeniy" class="team-image">
    <p class="team-name">Evgeniy Zyuskin</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/Yevhenns" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteUrl}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${yelyzavetaImg}" alt="Yelyzaveta" class="team-image">
    <p class="team-name">Yelyzaveta Demchenko</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/yelyzaveta05" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteUrl}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${artemImg}" alt="Artem" class="team-image">
    <p class="team-name">Artem Borzov</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteUrl}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${yuriiImg}" alt="Yurii" class="team-image">
    <p class="team-name">Yurii Shulga</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/Yurkes2020" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteUrl}#github"></use>
    </svg></a>
</div>
</div>`;

const wrapperTeam = document.querySelector('.footer-btn');
const clickBtn = document.querySelector('.close__btn');

wrapperTeam.addEventListener('click', openModalTeam);

const modalTeam = basicLightbox.create(markupTeam);

function openModalTeam(e) {
  e.preventDefault();
  modalTeam.show();
  showConfetti();

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modalTeam.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
