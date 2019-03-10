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
  btn.classList.add('select');
  btn.id = 'callMathMet';
  btn.innerHTML = 'Arithmetics';
  const casts = document.querySelector('.casts');
  casts.appendChild(btn);
}

addTaskButtonToCasts();

function creatTask() {
  const div = document.createElement('div');
  div.className = 'mathMet';
  div.innerHTML = '<span class="taskHeading">Solve an example:</span><span class="task"></span><label for="#userMathInput">Your answer:</label><input type="text" id="userMathInput"><button type="submit" id="sendMathAnswer" class="send">Attack(Enter)</button><button type="submit" id="sendMathCure" class="send">Cure(AltRight)</button><button type="submit" id="mathMainMenu" class="send">Back(Esc)</button>';
  document.body.appendChild(div);
}

creatTask();

const callMet = document.querySelector('#callMathMet');
const castsModal = document.querySelector('.casts');
const currTask = document.querySelector('.mathMet');
const checkAnswer = document.querySelector('#sendMathAnswer');
const checkCureAnswer = document.querySelector('#sendMathCure');
const mainMenu = document.querySelector('#mathMainMenu');
const answer = document.querySelector('#userMathInput');
const task = document.querySelector('.task');

const randomize = () => {
  const max = 100;
  const min = 0;
  let firstNum = 0;
  let secNum = 0;
  const symbol = ['+', '-'];
  const symbolRand = Math.floor(Math.random() * symbol.length);
  firstNum = Math.floor(Math.random() * (max - min) + min);
  secNum = Math.floor(Math.random() * (max - min) + min);
  return [symbol[symbolRand], firstNum, secNum];
};

let data = [];

callMet.addEventListener('click', () => {
  castsModal.style.display = 'none';
  currTask.style.display = 'flex';
  data = randomize();
  task.innerHTML = `${data[1]} ${data[0]} ${data[2]}`;
});

function arithmeticsSelection(key) {
  if (key.code === 'Space' && callMet.classList.contains('selected') && castsModal.style.display === 'flex') {
    castsModal.style.display = 'none';
    currTask.style.display = 'flex';
    data = randomize();
    task.innerHTML = `${data[1]} ${data[0]} ${data[2]}`;
    answer.focus();
  }
}

function showTaskWindow() {
  task.innerHTML = '';
  castsModal.style.display = 'flex';
  answer.value = '';
  console.log('show window');
}

document.addEventListener('keydown', arithmeticsSelection);

const returnResult = () => {
  let returnedAnswer = 0;
  if (data[0] === '+') {
    returnedAnswer = data[1] + data[2];
    return `${returnedAnswer}`;
  }
  if (data[0] === '-') {
    returnedAnswer = data[1] - data[2];
    return `${returnedAnswer}`;
  }
  return 0;
};

mainMenu.addEventListener('click', () => {
  currTask.style.display = 'none';
  castsModal.style.display = 'flex';
});

function checkAnswerByKeyBoard(evt) {
  if (evt.code === 'Escape' && currTask.style.display === 'flex') {
    currTask.style.display = 'none';
    castsModal.style.display = 'flex';
  }
  if (evt.code === 'Enter' && currTask.style.display === 'flex') {
    currTask.style.display = 'none';
    if (answer.value.trim() === returnResult()) {
      animateSpellAttackMonster().then(() => {
        correctAnswer();
        showTaskWindow();
      });
    } else {
      animateSpellAttackHero().then(incorrectAnswer).then(showTaskWindow);
    }
  }
  if (evt.code === 'AltRight' && currTask.style.display === 'flex') {
    if (answer.value.trim() === returnResult()) {
      animateSpellCureHero().then(() => {
        correctCureAnswer();
        showTaskWindow();
      });
    } else {
      animateSpellCureMonster().then(() => {
        incorrectCureAnswer();
        showTaskWindow();
      });
    }
    currTask.style.display = 'none';
    task.innerHTML = '';
    castsModal.style.display = 'flex';
    answer.value = '';
  }
}

document.addEventListener('keydown', checkAnswerByKeyBoard);

checkAnswer.addEventListener('click', () => {
  currTask.style.display = 'none';
  if (answer.value.trim() === returnResult()) {
    animateSpellAttackMonster().then(() => {
      correctAnswer();
      showTaskWindow();
    });
  } else {
    animateSpellAttackHero().then(incorrectAnswer).then(showTaskWindow);
  }
});

checkCureAnswer.addEventListener('click', () => {
  currTask.style.display = 'none';
  task.innerHTML = '';
  castsModal.style.display = 'flex';
  if (answer.value.trim() === returnResult()) {
    animateSpellCureHero().then(() => {
      correctCureAnswer();
      showTaskWindow();
    });
  } else {
    animateSpellCureMonster().then(() => {
      incorrectCureAnswer();
      showTaskWindow();
    });
  }
  answer.value = '';
});
