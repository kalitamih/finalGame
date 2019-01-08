export default function incorrectCureAnswer() {
  const startHealth = 100;
  const showMonsterHP = document.querySelector('.monster-HP');
  const cure = Math.floor(Math.random() * startHealth);
  let currMonsterHP = localStorage.getItem('monsterHP');
  currMonsterHP = +(currMonsterHP) + cure;
  localStorage.setItem('monsterHP', currMonsterHP);
  showMonsterHP.innerHTML = `${currMonsterHP} HP`;
}
