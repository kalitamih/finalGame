import drawMonster from '../monsters/monster';

export default function correctAnswer() {
  const startHealth = 100;
  const deathHealth = 0;
  const showMonsterHP = document.querySelector('.monster-HP');
  const ctx = document.querySelector('canvas').getContext('2d');
  const damage = Math.floor(Math.random() * startHealth);
  let currMonsterHP = localStorage.getItem('monsterHP');
  currMonsterHP -= damage;
  if (currMonsterHP > deathHealth) {
    localStorage.setItem('monsterHP', currMonsterHP);
    showMonsterHP.innerHTML = `${currMonsterHP} HP`;
  }
  if (currMonsterHP < deathHealth) {
    localStorage.setItem('monsterHP', startHealth);
    let monsterStreak = +localStorage.getItem('monstersKilled');
    monsterStreak += 1;
    localStorage.setItem('monstersKilled', monsterStreak);
    showMonsterHP.innerHTML = '100 HP';
    ctx.clearRect(900, 200, 400, 395);
    drawMonster();
  }
}
