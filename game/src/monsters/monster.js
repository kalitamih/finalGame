import './index.css';

import eyes1 from './img/eyes1.png';
import eyes2 from './img/eyes2.png';
import eyes3 from './img/eyes3.png';

import body1 from './img/body1.png';
import body2 from './img/body2.png';
import body3 from './img/body3.png';

import legs1 from './img/legs1.png';
import legs2 from './img/legs2.png';
import legs3 from './img/legs3.png';

import mouth1 from './img/mouth1.png';
import mouth2 from './img/mouth2.png';
import mouth3 from './img/mouth3.png';

import hands1 from './img/hands1.png';
import hands2 from './img/hands2.png';
import hands3 from './img/hands3.png';

export default function drawMonster() {
  const ctx = document.querySelector('canvas').getContext('2d');

  function drawBody() {
    return new Promise((resolve) => {
      const imgBody = new Image();
      const body = [body1, body2, body3];
      const randBody = Math.floor(Math.random() * body.length);
      imgBody.onload = () => {
        ctx.drawImage(imgBody, 1100, 400);
        resolve();
      };
      imgBody.src = body[randBody];
    });
  }

  function drawEyes() {
    const imgEyes = new Image();
    const eyes = [eyes1, eyes2, eyes3];
    const randEyes = Math.floor(Math.random() * eyes.length);
    imgEyes.onload = () => {
      ctx.drawImage(imgEyes, 1120, 415);
    };
    imgEyes.src = eyes[randEyes];
  }

  function drawMouth() {
    return new Promise((resolve) => {
      const imgMouth = new Image();
      const mouth = [mouth1, mouth2, mouth3];
      const randMouth = Math.floor(Math.random() * mouth.length);
      imgMouth.onload = () => {
        ctx.drawImage(imgMouth, 1120, 473);
        resolve();
      };
      imgMouth.src = mouth[randMouth];
    });
  }

  function drawLegs() {
    return new Promise((resolve) => {
      const imgLegs = new Image();
      const legs = [legs1, legs2, legs3];
      const randLegs = Math.floor(Math.random() * legs.length);
      imgLegs.onload = () => {
        ctx.drawImage(imgLegs, 1110, 500);
        resolve();
      };
      imgLegs.src = legs[randLegs];
    });
  }

  function drawHands() {
    return new Promise((resolve) => {
      const imgHands = new Image();
      const hands = [hands1, hands2, hands3];
      const randHands = Math.floor(Math.random() * hands.length);
      imgHands.onload = () => {
        ctx.drawImage(imgHands, 1050, 450);
        resolve();
      };
      imgHands.src = hands[randHands];
    });
  }

  function showMonsterName() {
    const monsterName = document.querySelector('.monster-name');
    const trait = ['Good', 'Bad', 'Ugly'];
    const race = ['Wolf', 'Dragon', 'Vampire'];
    const names = ['Cartman', 'Kyle', 'Kenny'];
    const randTrait = Math.floor(Math.random() * trait.length);
    const randRace = Math.floor(Math.random() * race.length);
    const randName = Math.floor(Math.random() * names.length);
    const monsterFullName = `${trait[randTrait]} ${race[randRace]} ${names[randName]}`;
    monsterName.innerHTML = monsterFullName;
  }

  drawBody()
    .then(drawHands)
    .then(drawLegs)
    .then(drawMouth)
    .then(drawEyes);

  showMonsterName();
}
