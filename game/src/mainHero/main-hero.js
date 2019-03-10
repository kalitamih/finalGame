import './index.css';

import picture from './img/main-hero.png';

export default function drawMainHero() {
  const ctx = document.querySelector('canvas').getContext('2d');
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 30, 445);
  };
  img.src = picture;
}
