export default function correctCureAnswer() {
  const startHealth = 100;
  const showMainHeroHP = document.querySelector('.mainHero-HP');
  const cure = Math.floor(Math.random() * startHealth);
  let currMainHeroHP = localStorage.getItem('mainHero');
  currMainHeroHP = +(currMainHeroHP) + cure;
  localStorage.setItem('mainHero', currMainHeroHP);
  showMainHeroHP.innerHTML = `${currMainHeroHP} HP`;
}
