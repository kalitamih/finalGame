import './index.css';
import correctAnswer from '../../logics/correctAnswer';
import correctCureAnswer from '../../logics/correctCureAnswer';
import incorrectAnswer from '../../logics/incorrectAnswer';
import incorrectCureAnswer from '../../logics/incorrectCureAnswer';
import animateSpellAttackMonster from '../spellsAnimation/spellAnimationAttackMonster';
import animateSpellAttackHero from '../spellsAnimation/spellAnimationAttackHero';
import animateSpellCureHero from '../spellsAnimation/spellAnimationCureHero';
import animateSpellCureMonster from '../spellsAnimation/spellAnimationCureMonster';

function addTaskButtonToCasts() {
  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.id = 'callAudioMet';
  btn.classList.add('select');
  btn.innerHTML = 'Audio';
  const casts = document.querySelector('.casts');
  casts.appendChild(btn);
}

addTaskButtonToCasts();

function creatTask() {
  const div = document.createElement('div');
  div.className = 'audioMet';
  div.innerHTML = '<span class="taskHeading">Enter the word that you heard<br>(Use CtrlRight to listen word):</span><span class="task"><audio src="" controls></audio></span><label for="#userAudioInput">Your answer:</label><input type="text" id="userAudioInput"><button type="submit" id="sendAudioAnswer" class="send">Attack(Enter)</button><button type="submit" id="sendAudioCure" class="send">Cure(AltLeft)</button><button type="submit" id="audioMainMenu" class="send">Back(Esc)</button>;';
  document.body.appendChild(div);
}

creatTask();

const castsModal = document.querySelector('.casts');
const currTask = document.querySelector('.audioMet');
const checkAnswer = document.querySelector('#sendAudioAnswer');
const checkCureAnswer = document.querySelector('#sendAudioCure');
const mainMenu = document.querySelector('#audioMainMenu');
const callMet = document.querySelector('#callAudioMet');
const answer = document.querySelector('#userAudioInput');
const audio = document.querySelector('audio');

const audioList = {
  'https://www.anglaisfacile.com/free/words/w/watch.wav': 'watch',
  'https://www.anglaisfacile.com/free/words/h/humble.wav': 'humble',
  'https://www.anglaisfacile.com/free/words/r/respect.wav': 'respect',
  'https://www.anglaisfacile.com/free/words/g/ground.wav': 'ground',
  'https://www.anglaisfacile.com/free/words/m/movie.wav': 'movie',
  'https://www.anglaisfacile.com/free/words/v/vomit.wav': 'vomit',
  'https://www.anglaisfacile.com/free/words/c/confidence.wav': 'confidence',
};

let randAudio = '';

const pickRandAudio = () => {
  const randNumber = Math.floor(Math.random() * Object.keys(audioList).length);
  return randNumber;
};

callMet.addEventListener('click', () => {
  castsModal.style.display = 'none';
  randAudio = Object.keys(audioList)[pickRandAudio()];
  audio.src = randAudio;
  currTask.style.display = 'flex';
});

function audioSelection(key) {
  if (key.code === 'Space' && callMet.classList.contains('selected') && castsModal.style.display === 'flex') {
    castsModal.style.display = 'none';
    randAudio = Object.keys(audioList)[pickRandAudio()];
    audio.src = randAudio;
    currTask.style.display = 'flex';
  }
}

document.addEventListener('keydown', audioSelection);

mainMenu.addEventListener('click', () => {
  currTask.style.display = 'none';
  castsModal.style.display = 'flex';
});

function showTask() {
  audio.src = '';
  castsModal.style.display = 'flex';
  answer.value = '';
}

function checkAnswerByKeyBoard(evt) {
  if (evt.code === 'ControlRight' && currTask.style.display === 'flex') {
    audio.play();
    answer.focus();
  }
  if (evt.code === 'Escape' && currTask.style.display === 'flex') {
    currTask.style.display = 'none';
    castsModal.style.display = 'flex';
  }
  if (evt.code === 'Enter' && currTask.style.display === 'flex') {
    currTask.style.display = 'none';
    if (answer.value.trim() === audioList[randAudio]) {
      animateSpellAttackMonster().then(() => {
        correctAnswer();
        showTask();
      });
    } else {
      animateSpellAttackHero().then(incorrectAnswer).then(showTask);
    }
  }
  if (evt.code === 'AltRight' && currTask.style.display === 'flex') {
    currTask.style.display = 'none';
    if (answer.value.trim() === audioList[randAudio]) {
      animateSpellCureHero().then(() => {
        correctCureAnswer();
        showTask();
      });
    } else {
      animateSpellCureMonster().then(() => {
        incorrectCureAnswer();
        showTask();
      });
    }
  }
}

document.addEventListener('keydown', checkAnswerByKeyBoard);

checkAnswer.addEventListener('click', () => {
  currTask.style.display = 'none';
  if (answer.value.trim() === audioList[randAudio]) {
    animateSpellAttackMonster().then(() => {
      correctAnswer();
      showTask();
    });
  } else {
    animateSpellAttackHero().then(incorrectAnswer).then(showTask);
  }
});

checkCureAnswer.addEventListener('click', () => {
  currTask.style.display = 'none';
  if (answer.value.trim() === audioList[randAudio]) {
    animateSpellCureHero().then(() => {
      correctCureAnswer();
      showTask();
    });
  } else {
    animateSpellCureMonster().then(() => {
      incorrectCureAnswer();
      showTask();
    });
  }
});
