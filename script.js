//cím
const title = document.createElement('h1');
title.textContent = 'Űr Memóriajáték';
document.body.appendChild(title);

//játéktér
const board = document.createElement('div');
board.className = 'space-board';
document.body.appendChild(board);

//pontszám
const scoreBox = document.createElement('div');
scoreBox.className = 'score-box';
scoreBox.innerHTML = 'Találatok: <span id="points">0</span>';
document.body.appendChild(scoreBox);

const pointsSpan = document.getElementById('points');

//újraindítás
const controlPanel = document.createElement('div');
controlPanel.className = 'controls';
document.body.appendChild(controlPanel);

const resetBtn = document.createElement('button');
resetBtn.textContent = 'Új játék';
controlPanel.appendChild(resetBtn);

resetBtn.addEventListener('click', restartGame);

//kártyák
const cardPool = [
  { text: 'Nap', group: 1 }, { text: '☀️', group: 1 },
  { text: 'Hold', group: 2 }, { text: '🌙', group: 2 },
  { text: 'Mars', group: 3 }, { text: '🔴', group: 3 },
  { text: 'Föld', group: 4 }, { text: '🌍', group: 4 },
  { text: 'Szaturnusz', group: 5 }, { text: '🪐', group: 5 },
  { text: 'Csillag', group: 6 }, { text: '⭐', group: 6 },
  { text: 'Rakéta', group: 7 }, { text: '🚀', group: 7 },
  { text: 'UFO', group: 8 }, { text: '🛸', group: 8 },
  { text: 'Köd', group: 9 }, { text: '🌌', group: 9 }
];

let firstPick = null;
let secondPick = null;
let freeze = false;
let scoreValue = 0;

//keverés
function shuffleDeck() {
  for (let i = cardPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardPool[i], cardPool[j]] = [cardPool[j], cardPool[i]];
  }
}

//kártyák létrehozása
function buildBoard() {
  for (let item of cardPool) {
    const card = document.createElement('div');
    card.classList.add('space-card');
    card.dataset.group = item.group;

    card.innerHTML = `
      <div class="card-face front-face">${item.text}</div>
      <div class="card-face back-face"></div>
    `;

    board.appendChild(card);
    card.addEventListener('click', revealCard);
  }
}

function revealCard() {
  if (freeze) return;
  if (this === firstPick) return;

  this.classList.add('open');

  if (!firstPick) {
    firstPick = this;
    return;
  }

  secondPick = this;
  freeze = true;

  compareCards();
}

function compareCards() {
  const match = firstPick.dataset.group === secondPick.dataset.group;

  match ? handleMatch() : hideCards();
}

function handleMatch() {
  scoreValue++;
  pointsSpan.textContent = scoreValue;

  firstPick.removeEventListener('click', revealCard);
  secondPick.removeEventListener('click', revealCard);

  resetTurn();
}

function hideCards() {
  setTimeout(() => {
    firstPick.classList.remove('open');
    secondPick.classList.remove('open');
    resetTurn();
  }, 900);
}

function resetTurn() {
  firstPick = null;
  secondPick = null;
  freeze = false;
}

function restartGame() {
  resetTurn();
  shuffleDeck();
  scoreValue = 0;
  pointsSpan.textContent = scoreValue;
  board.innerHTML = '';
  buildBoard();
}

shuffleDeck();
buildBoard();
