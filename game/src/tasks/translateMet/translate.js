import './index.css';
import correctAnswer from '../../logics/correctAnswer';
import correctCureAnswer from '../../logics/correctCureAnswer';
import incorrectAnswer from '../../logics/incorrectAnswer';
import incorrectCureAnswer from '../../logics/incorrectCureAnswer';
import animateSpellAttackMonster from '../spellsAnimation/spellAnimationAttackMonster';
import animateSpellAttackHero from '../spellsAnimation/spellAnimationAttackHero';
import animateSpellCureHero from '../spellsAnimation/spellAnimationCureHero';
import animateSpellCureMonster from '../spellsAnimation/spellAnimationCureMonster';

const dictionary = {
  dog: ['собака', 'пес', 'собачка'],
  task: ['задача', 'урок', 'задание'],
  cat: ['кот', 'кошка'],
  mind: ['разум', 'ум', 'мнение'],
  game: ['развлечение', 'игра', 'партия'],
  skirt: ['юбка', 'подол', 'край'],
  global: ['глобальный', 'мировой', 'общий', 'всеобщий'],
  activity: ['активность', 'деятельность', 'энергия'],
  amount: ['количество', 'сумма', 'итог'],
  blind: ['слепой', 'слепить', 'штора'],
  cartoon: ['мультфильм', 'карикатура', 'комикс', 'мультик'],
  transfer: ['перевод', 'передача', 'трансфер'],
  dictionary: ['словарь'],
  environment: ['окружающая среда', 'окружение', 'среда'],
  famous: ['известный', 'знаменитый', 'замечательный'],
  horror: ['ужас', 'ужастик'],
  inspiration: ['вдохновение', 'воодушевление', 'вдох'],
  jealous: ['завистливый', 'ревнивый', 'заботливый', 'зависть', 'ревность'],
  lucky: ['счастливый', 'везучий', 'удачливый'],
  message: ['сообщение', 'послание', 'письмо'],
  mysterious: ['загадочный', 'таинственный', 'непостижимый'],
  realize: ['реализовать', 'понимать', 'осуществлять'],
};

function addTaskButtonToCasts() {
  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.id = 'callTranslateMet';
  btn.classList.add('select');
  btn.innerHTML = 'Translate';
  const casts = document.querySelector('.casts');
  casts.appendChild(btn);
}

addTaskButtonToCasts();

function creatTask() {
  const div = document.createElement('div');
  div.className = 'translateMet';
  div.innerHTML = '<span class="taskHeading">Translate the next word:</span><span class="task" id="translateText"></span><label for="#userTranslateInput">Your answer:</label><input type="text" id="userTranslateInput"><button type="submit" id="sendTranslateAnswer" class="send">Attack(Enter)</button><button type="submit" id="sendTranslateCure" class="send">Cure(AltRight)</button><button type="submit" id="translateMainMenu" class="send">Back(Esc)</button>';
  document.body.appendChild(div);
}

creatTask();

const callMet = document.querySelector('#callTranslateMet');
const castsModal = document.querySelector('.casts');
const currTask = document.querySelector('.translateMet');
const checkAnswer = document.querySelector('#sendTranslateAnswer');
const checkCureAnswer = document.querySelector('#sendTranslateCure');
const mainMenu = document.querySelector('#translateMainMenu');
const answer = document.querySelector('#userTranslateInput');
const task = document.querySelector('#translateText');

const pickRandExample = () => {
  const randNumber = Math.floor(Math.random() * Object.keys(dictionary).length);
  return randNumber;
};

let randTranslate = '';

function showTask() {
  task.innerHTML = '';
  castsModal.style.display = 'flex';
  answer.value = '';
}

callMet.addEventListener('click', () => {
  castsModal.style.display = 'none';
  currTask.style.display = 'flex';
  randTranslate = Object.keys(dictionary)[pickRandExample()];
  task.innerHTML = randTranslate;
});

function translationSelection(key) {
  if (key.code === 'Space' && callMet.classList.contains('selected') && castsModal.style.display === 'flex') {
    castsModal.style.display = 'none';
    currTask.style.display = 'flex';
    randTranslate = Object.keys(dictionary)[pickRandExample()];
    task.innerHTML = randTranslate;
    answer.focus();
  }
}

document.addEventListener('keydown', translationSelection);

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
    let currentTrans = [];
    let flag = false;
    currentTrans = dictionary[randTranslate];
    for (let i = 0; i < currentTrans.length; i += 1) {
      if (answer.value.trim() === currentTrans[i]) { flag = true; }
    }
    if (flag) {
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
    let currentTrans = [];
    let flag = false;
    currentTrans = dictionary[randTranslate];
    for (let i = 0; i < currentTrans.length; i += 1) {
      if (answer.value.trim() === currentTrans[i]) { flag = true; }
    }
    if (flag) {
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
  let currentTrans = [];
  let flag = false;
  currentTrans = dictionary[randTranslate];
  currTask.style.display = 'none';
  for (let i = 0; i < currentTrans.length; i += 1) {
    if (answer.value.trim() === currentTrans[i]) { flag = true; }
  }
  if (flag) {
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
  let currentTrans = [];
  let flag = false;
  currentTrans = dictionary[randTranslate];
  for (let i = 0; i < currentTrans.length; i += 1) {
    if (answer.value.trim() === currentTrans[i]) { flag = true; }
  }
  if (flag) {
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
