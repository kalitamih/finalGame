import spellImage from './img/axe.png';
import spellSoundmp3 from './sounds/spear.mp3';

function spellSound() {
  const audio = new Audio();
  audio.src = spellSoundmp3;
  audio.volume = 0.5;
  audio.autoplay = true;
}

export default function animateSpell2() {
  return new Promise((resolve) => {
    const ctx = document.querySelector('canvas').getContext('2d');
    let x = 260;
    const sizeImageWeapon = 128;
    const finishX = 900;
    const Y = 445;
    const img = new Image();

    function drawAttack() {
      ctx.clearRect(x, Y, sizeImageWeapon, sizeImageWeapon);
      ctx.drawImage(img, x, Y);
    }

    spellSound();

    const gameLoop = () => {
      if (x < finishX) {
        drawAttack();
        x += 10;
        requestAnimationFrame(gameLoop);
      } else {
        ctx.clearRect(finishX, Y, sizeImageWeapon, sizeImageWeapon);
        resolve();
      }
    };
    gameLoop();

    img.src = spellImage;
  });
}
