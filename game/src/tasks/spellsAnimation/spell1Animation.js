import spellImage from './img/hammer.png';
import spellSoundmp3 from './sounds/hammer.mp3';

function spell1Sound() {
  const audio = new Audio();
  audio.src = spellSoundmp3;
  audio.volume = 0.5;
  audio.autoplay = true;
}

export default function animateSpell1() {
  return new Promise((resolve) => {
    const ctx = document.querySelector('canvas').getContext('2d');
    let x = 900;
    const height = 128;
    const img = new Image();

    function drawAttack() {
      ctx.clearRect(x, 445, height, height);
      ctx.drawImage(img, x, 445);
    }

    img.onload = () => {
      spell1Sound();
      const gameLoop = () => {
        if (x > 260) {
          drawAttack();
          x -= 10;
          requestAnimationFrame(gameLoop);
        } else {
          ctx.clearRect(260, 445, height, height);
          resolve();
        }
      };
      gameLoop();
    };
    img.src = spellImage;
  });
}
