function updateLeaderBoard() {
  console.log('updateLeaderBoard');
  const monstersKilled = +localStorage.getItem('monstersKilled');
  const playerid = +localStorage.getItem('curplayerid');
  let rating = localStorage.getItem('rating');
  rating = rating == null ? [] : JSON.parse(rating);
  const player = JSON.parse(localStorage.getItem('players'))[playerid];
  const record = {
    name: player.userName,
    streak: monstersKilled,
  };
  rating.push(record);
  rating = rating.sort((a, b) => b.streak - a.streak).slice(0, 10);
  localStorage.setItem('rating', JSON.stringify(rating));
}

function showLeaderBoard() {
  const golp = document.querySelector('#goLP');
  const gameOver = document.querySelector('.game-over');
  const tbody = document.querySelector('tbody');
  const showMainHeroHP = document.querySelector('.mainHero-HP');
  let lastStat = localStorage.getItem('rating');
  lastStat = lastStat == null ? [] : JSON.parse(lastStat);
  for (let i = 0; i < lastStat.length; i += 1) {
    const tr = document.createElement('tr');
    const name = document.createElement('td');
    const streak = document.createElement('td');
    name.innerText = lastStat[i].name;
    streak.innerText = lastStat[i].streak;
    tr.appendChild(name);
    tr.appendChild(streak);
    tbody.appendChild(tr);
  }

  const castsModal = document.querySelector('.casts');
  castsModal.style.display = 'none';
  document.querySelector('.mathMet').style.display = 'none';
  document.querySelector('.audioMet').style.display = 'none';
  document.querySelector('.translateMet').style.display = 'none';
  const openMenu = document.querySelector('.menu-open');
  openMenu.style.display = 'none';

  showMainHeroHP.innerHTML = '0 HP';
  gameOver.style.display = 'flex';

  golp.addEventListener('click', () => {
    window.location.replace('../../landing-page.html');
  });

  function goBack(key) {
    if (key.code === 'Escape' && gameOver.style.display === 'flex') {
      window.location.replace('../../landing-page.html');
    }
  }
  document.body.addEventListener('keydown', goBack);
}

export default function incorrectAnswer() {
  return new Promise((resolve) => {
    const startHealth = 100;
    const showMainHeroHP = document.querySelector('.mainHero-HP');
    const damage = Math.floor(Math.random() * startHealth);
    let currMainHeroHP = localStorage.getItem('mainHero');
    currMainHeroHP -= damage;
    if (currMainHeroHP > 0) {
      localStorage.setItem('mainHero', currMainHeroHP);
      showMainHeroHP.innerHTML = `${currMainHeroHP} HP`;
      resolve();
    }
    if (currMainHeroHP <= 0) {
      updateLeaderBoard();
      showLeaderBoard();
    }
  });
}
