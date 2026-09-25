import assert from 'node:assert/strict';
import { SIZE, createBoard, outcome, bestMove, addRoundScore, addRoundHistory } from './game.js';

const boardWith = entries => { const board = createBoard(); entries.forEach(([index, mark]) => { board[index] = mark; }); return board; };
const row = boardWith([[30,'X'],[31,'X'],[32,'X'],[33,'X'],[34,'X']]);
const column = boardWith([[7,'O'],[17,'O'],[27,'O'],[37,'O'],[47,'O']]);
const diagonalDown = boardWith([[11,'X'],[22,'X'],[33,'X'],[44,'X'],[55,'X']]);
const diagonalUp = boardWith([[81,'O'],[72,'O'],[63,'O'],[54,'O'],[45,'O']]);
assert.deepEqual(outcome(row), { winner: 'X', line: [30,31,32,33,34] }, 'horizontal five');
assert.deepEqual(outcome(column), { winner: 'O', line: [7,17,27,37,47] }, 'vertical five');
assert.deepEqual(outcome(diagonalDown), { winner: 'X', line: [11,22,33,44,55] }, 'down-right diagonal five');
assert.deepEqual(outcome(diagonalUp), { winner: 'O', line: [45,54,63,72,81] }, 'down-left diagonal five');
assert.equal(outcome(createBoard()), null, 'empty board continues');
assert.equal(SIZE, 10, 'ten by ten board');

const nearWin = boardWith([[20,'O'],[21,'O'],[22,'O'],[23,'O'],[54,'X']]);
const threat = boardWith([[40,'X'],[41,'X'],[42,'X'],[43,'X'],[54,'O']]);
assert.equal(bestMove(nearWin, 'medium'), 24, 'medium takes a five-in-a-row win');
assert.equal(bestMove(threat, 'hard'), 44, 'hard blocks a five-in-a-row threat');
assert.equal(bestMove(createBoard(), 'easy', () => .99), 99, 'easy makes a random legal move');
assert.equal(bestMove(createBoard(), 'medium'), 44, 'medium opens centrally');
assert.equal(bestMove(createBoard(), 'hard'), 44, 'hard values the center');

let score = { wins: 0, draws: 0, losses: 0 };
score = addRoundScore(score, { winner: 'X' }); score = addRoundScore(score, { winner: 'draw' }); score = addRoundScore(score, { winner: 'O' });
assert.deepEqual(score, { wins: 1, draws: 1, losses: 1 }, 'score tracks rounds');

let history = [];
history = addRoundHistory(history, { winner: 'X' });
history = addRoundHistory(history, { winner: 'draw' });
history = addRoundHistory(history, { winner: 'O' });
assert.deepEqual(history, ['loss', 'draw', 'win'], 'history records losses, draws, and wins newest first');
assert.deepEqual(addRoundHistory(['win', 'draw', 'loss', 'win', 'draw'], { winner: 'X' }), ['win', 'win', 'draw', 'loss', 'win'], 'history stays compact at five rounds');
console.log('five-in-a-row rules, score, history, and difficulty levels: ok');
