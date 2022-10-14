import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import showConfetti from './confettiTeamModal';

import { teamInfo } from './teamInfo';
import spriteUrl from '../img/team/sprite.svg';

const markupTeamCard = teamInfo
  .map(({ name, img, socialLink, teamRole }) => {
    return `
    <li class="team-card">
      <img src='${img}' alt='${name}' class="team-image">
      <p class="team-name">${name}</p>
      <p class="team-role">${teamRole}</p>
      <a href='${socialLink}' target="_blank" class="team-git">
       <svg class="logo__icon" width="24" height="24">
        <use href="${spriteUrl}#github"></use>
       </svg></a>
    </li>`;
  })
  .join('');

const markupModal = `<ul class="team-wrapper">
    ${markupTeamCard}
  </ul>`;

const openBtnTeam = document.querySelector('.footer-btn');
openBtnTeam.addEventListener('click', openModalTeam);

const bodyTeam = document.querySelector('body');
const modalTeam = basicLightbox.create(markupModal, {
  onClose: instance => {
    document.body.classList.remove('modal-open');
  },
});

function openModalTeam(e) {
  e.preventDefault();
  modalTeam.show();
  showConfetti();
  document.body.classList.add('modal-open');

  window.addEventListener('keydown', closeModalTeam);

  function closeModalTeam(e) {
    if (e.code === 'Escape') {
      modalTeam.close();
      window.removeEventListener('keydown', closeModalTeam);
    }
  }
}
