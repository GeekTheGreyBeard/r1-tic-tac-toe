import assert from 'node:assert/strict';
import { outcome, bestMove } from './game.js';
assert.deepEqual(outcome(['X','X','X','','','','','','']), { winner:'X', line:[0,1,2] });
assert.deepEqual(outcome(['X','O','X','X','O','O','O','X','X']), { winner:'draw', line:[] });
assert.equal(outcome(Array(9).fill('')), null);
assert.equal(bestMove(['O','O','','X','X','','','','']), 2);
assert.equal(bestMove(['X','X','','O','','','','','']), 2);
assert.equal(bestMove(Array(9).fill('')), 4);
console.log('game rules: ok');
