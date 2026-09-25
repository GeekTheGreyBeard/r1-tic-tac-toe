export const SIZE = 10;
export const CONNECT = 5;
const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

export const createBoard = () => Array(SIZE * SIZE).fill('');
export const openSquares = board => board.map((cell, index) => cell ? null : index).filter(index => index !== null);

function lineFrom(index, rowStep, columnStep) {
  const row = Math.floor(index / SIZE);
  const column = index % SIZE;
  const line = [];
  for (let offset = 0; offset < CONNECT; offset += 1) {
    const nextRow = row + rowStep * offset;
    const nextColumn = column + columnStep * offset;
    if (nextRow < 0 || nextRow >= SIZE || nextColumn < 0 || nextColumn >= SIZE) return null;
    line.push(nextRow * SIZE + nextColumn);
  }
  return line;
}

function winningLines() {
  const lines = [];
  for (let index = 0; index < SIZE * SIZE; index += 1) {
    for (const [rowStep, columnStep] of directions) {
      const line = lineFrom(index, rowStep, columnStep);
      if (line) lines.push(line);
    }
  }
  return lines;
}

export const lines = winningLines();

export function outcome(board) {
  for (const line of lines) {
    const [first] = line;
    if (board[first] && line.every(index => board[index] === board[first])) return { winner: board[first], line };
  }
  return board.every(Boolean) ? { winner: 'draw', line: [] } : null;
}

function immediateMove(board, mark) {
  for (const index of openSquares(board)) {
    const copy = [...board];
    copy[index] = mark;
    if (outcome(copy)?.winner === mark) return index;
  }
  return undefined;
}

function strategicValue(board, index) {
  let value = 0;
  for (const line of lines.filter(line => line.includes(index))) {
    const oMarks = line.filter(square => board[square] === 'O').length;
    const xMarks = line.filter(square => board[square] === 'X').length;
    if (!xMarks) value += (oMarks + 1) ** 3;
    if (!oMarks) value += (xMarks + 1) ** 2;
  }
  const row = Math.floor(index / SIZE);
  const column = index % SIZE;
  return value - (Math.abs(row - 4.5) + Math.abs(column - 4.5)) / 100;
}

function hardMove(board) {
  let choice;
  let bestValue = -Infinity;
  for (const index of openSquares(board)) {
    const value = strategicValue(board, index);
    if (value > bestValue) {
      bestValue = value;
      choice = index;
    }
  }
  return choice;
}

export function bestMove(board, difficulty = 'medium', random = Math.random) {
  const open = openSquares(board);
  if (!open.length) return undefined;
  if (difficulty === 'easy') return open[Math.floor(random() * open.length)];

  const win = immediateMove(board, 'O');
  if (win !== undefined) return win;
  const block = immediateMove(board, 'X');
  if (block !== undefined) return block;

  if (difficulty === 'hard') return hardMove(board);
  const central = [44, 45, 54, 55].filter(index => board[index] === '');
  return central[0] ?? open[0];
}

export function addRoundScore(scores, end) {
  if (end.winner === 'X') return { ...scores, wins: scores.wins + 1 };
  if (end.winner === 'O') return { ...scores, losses: scores.losses + 1 };
  return { ...scores, draws: scores.draws + 1 };
}
