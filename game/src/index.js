import drawMainHero from './mainHero/main-hero';
import drawMonster from './monsters/monster';
import './tasks/mathMet/mathMethod';
import './tasks/audioMet/audioMet';
import './tasks/translateMet/translate';
import navigationByKeyboard from './tasks/navigationBetweenTasks/navigationBetweenTasks';
import '../css/style.css';

const canvas = document.createElement('canvas');
canvas.width = 1280;
canvas.height = 720;
document.body.appendChild(canvas);
const startHealth = 100;

const showMonsterHP = document.querySelector('.monster-HP');
const showMainHeroHP = document.querySelector('.mainHero-HP');
const openMenu = document.querySelector('.menu-open');
const casts = document.querySelector('.casts');

openMenu.addEventListener('click', () => {
  openMenu.style.display = 'none';
  casts.style.display = 'flex';
});

function taskSelection(key) {
  if (key.code === 'Enter' && openMenu.style.display !== 'none') {
    openMenu.style.display = 'none';
    casts.style.display = 'flex';
  }
  if (key.code === 'Escape' && casts.style.display !== 'none') {
    openMenu.style.display = 'flex';
    casts.style.display = 'none';
  }
  if (key.code === 'F5') {
    window.location.replace('../../landing-page.html');
  }
}

document.addEventListener('keydown', taskSelection);

drawMainHero();
drawMonster();

localStorage.setItem('monsterHP', startHealth);
localStorage.setItem('mainHero', startHealth);

function getUserProfile() {
  const mainHeroName = document.querySelector('.mainHero-name');
  const playerid = +localStorage.getItem('curplayerid');
  const player = JSON.parse(localStorage.getItem('players'))[playerid];
  mainHeroName.innerHTML = `${player.userName}`;
  showMonsterHP.innerHTML = '100 HP';
  showMainHeroHP.innerHTML = '100 HP';
}

getUserProfile();
navigationByKeyboard();
