import { createBoard, outcome, bestMove, addRoundScore, addRoundHistory } from './game.js';

const boardEl = document.querySelector('#board');
const statusEl = document.querySelector('#status');
const scoreEls = { wins: document.querySelector('#wins'), draws: document.querySelector('#draws'), losses: document.querySelector('#losses') };
const difficultyEl = document.querySelector('#difficulty');
const historyListEl = document.querySelector('#history-list');
const historyEmptyEl = document.querySelector('#history-empty');
let board = createBoard();
let gameOver = false;
let soundOn = false;
let difficulty = 'medium';
let scores = { wins: 0, draws: 0, losses: 0 };
let history = [];

const tone = hz => {
  if (!soundOn) return;
  const context = new AudioContext(), oscillator = context.createOscillator(), gain = context.createGain();
  oscillator.frequency.value = hz; gain.gain.value = .04;
  oscillator.connect(gain).connect(context.destination); oscillator.start();
  gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .12); oscillator.stop(context.currentTime + .12);
};

function renderScore() { Object.entries(scores).forEach(([key, value]) => { scoreEls[key].textContent = value; }); }
function renderHistory() {
  historyListEl.innerHTML = '';
  historyEmptyEl.hidden = history.length > 0;
  history.forEach((result, index) => {
    const item = document.createElement('li');
    item.className = `round-result ${result}`;
    item.textContent = `${index + 1}. ${result}`;
    historyListEl.append(item);
  });
}
function render() {
  boardEl.innerHTML = '';
  board.forEach((mark, index) => {
    const cell = document.createElement('button');
    cell.className = `cell ${mark ? 'taken' : ''}`; cell.type = 'button'; cell.setAttribute('role', 'gridcell');
    cell.setAttribute('aria-label', mark ? `square ${index + 1}, ${mark}` : `square ${index + 1}, empty`); cell.textContent = mark;
    cell.addEventListener('click', () => move(index)); boardEl.append(cell);
  });
  const end = outcome(board); if (end?.line.length) end.line.forEach(index => boardEl.children[index].classList.add('winner'));
}
function finish(end) {
  gameOver = true; scores = addRoundScore(scores, end); history = addRoundHistory(history, end); renderScore(); renderHistory();
  if (end.winner === 'X') { statusEl.textContent = 'you made five.'; tone(740); }
  else if (end.winner === 'O') { statusEl.textContent = 'R1 made five.'; tone(220); }
  else { statusEl.textContent = 'a clean draw.'; tone(420); }
}
function move(index) {
  if (gameOver || board[index]) return;
  board[index] = 'X'; tone(520); render();
  const end = outcome(board); if (end) return finish(end);
  statusEl.textContent = 'R1 is thinking…';
  window.setTimeout(() => {
    const choice = bestMove(board, difficulty); if (choice === undefined || gameOver) return;
    board[choice] = 'O'; render(); const response = outcome(board);
    response ? finish(response) : statusEl.textContent = 'your turn / X';
  }, 280);
}
function reset() { board = createBoard(); gameOver = false; statusEl.textContent = 'your turn / X'; render(); }
document.querySelector('#new-game').addEventListener('click', reset);
document.querySelector('#sound').addEventListener('click', event => { soundOn = !soundOn; event.currentTarget.textContent = soundOn ? 'sound on' : 'sound off'; event.currentTarget.setAttribute('aria-pressed', soundOn); });
difficultyEl.addEventListener('change', event => { difficulty = event.currentTarget.value; reset(); statusEl.textContent = `${difficulty} / your turn X`; });
const initial = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; document.documentElement.dataset.theme = initial;
document.querySelector('#theme').textContent = initial === 'dark' ? '☀' : '☾';
document.querySelector('#theme').addEventListener('click', event => { const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = next; event.currentTarget.textContent = next === 'dark' ? '☀' : '☾'; });
renderScore(); renderHistory(); render();
