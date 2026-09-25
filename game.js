export const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export function outcome(board) {
  for (const line of wins) { const [a,b,c] = line; if (board[a] && board[a] === board[b] && board[a] === board[c]) return { winner: board[a], line }; }
  return board.every(Boolean) ? { winner: 'draw', line: [] } : null;
}
export function bestMove(board) {
  const open = board.map((cell, i) => cell ? null : i).filter(i => i !== null);
  for (const mark of ['O', 'X']) for (const i of open) { const copy = [...board]; copy[i] = mark; if (outcome(copy)?.winner === mark) return i; }
  if (board[4] === '') return 4;
  const corners = [0,2,6,8].filter(i => board[i] === '');
  return corners[0] ?? open[0];
}
