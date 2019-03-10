import spellImage from './img/cross.png';
import spellSoundmp3 from './sounds/drop.mp3';

function spellSound() {
  const audio = new Audio();
  audio.src = spellSoundmp3;
  audio.volume = 0.5;
  audio.autoplay = true;
}

export default function animateSpell3() {
  return new Promise((resolve) => {
    const ctx = document.querySelector('canvas').getContext('2d');
    let y = 100;
    const X = 100;
    const finishY = 290;
    const sizeImageCross = 128;
    const img = new Image();

    function drawCure() {
      ctx.clearRect(X, y - 10, sizeImageCross, sizeImageCross);
      ctx.drawImage(img, X, y);
    }

    spellSound();

    const gameLoop = () => {
      if (y < finishY + 10) {
        drawCure();
        y += 10;
        requestAnimationFrame(gameLoop);
      } else {
        ctx.clearRect(X, finishY, sizeImageCross, sizeImageCross);
        resolve();
      }
    };
    gameLoop();

    img.src = spellImage;
  });
}
