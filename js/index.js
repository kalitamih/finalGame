const userName = document.getElementById('userName');

let players = localStorage.getItem('players');
players = players == null ? [] : JSON.parse(players);
const submitButton = document.querySelector('#submit');

submitButton.addEventListener('click', () => {
  if (userName.value === '') {
    alert('Fill username');
  } else {
    let count = players.length;
    let playerProfile = {
      userName: userName.value,
      id: count,
    };
    count += 1;
    const playerexists = players.filter((p) => {
      const exists = (p.userName === playerProfile.userName);
      if (exists) playerProfile = p;
      return exists;
    }).length !== 0;

    if (!playerexists) {
      players.push(playerProfile);
    }
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('curplayerid', playerProfile.id);
    localStorage.setItem('monstersKilled', 0);
    window.location.replace('game/dist/index.html');
  }
});
