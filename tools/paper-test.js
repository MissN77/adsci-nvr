// ── Paper geometry self-check ─────────────────────────────────────────────
// The folding questions are only fair if folding, punching and cutting behave
// the way real paper does. Every assertion here is something that can be
// checked by hand with a square of paper and a hole punch, which is the point:
// the answers are not a matter of opinion, so the code should be held to them.

import {
  line, clip, reflect, area, UNIT_SQUARE,
  unfoldHoles, unfoldCuts, holesKey, contains, edgeDistance,
} from '../js/core/paper.js';

let failures = 0;
const round = (n) => +n.toFixed(4);
const check = (name, got, want) => {
  const ok = got === want;
  if (!ok) failures++;
  console.log(`${ok ? '  ' : '✗ '}${name.padEnd(56)} ${got}${ok ? '' : `   expected ${want}`}`);
};

const V = line(1, 0, 0.5, -1);   // vertical crease, keep the left
const H = line(0, 1, 0.5, -1);   // horizontal crease, keep the top
const D = line(1, -1, 0, -1);    // corner to corner

// ── Folding ───────────────────────────────────────────────────────────────
check('a straight fold leaves half the paper', round(area(clip(UNIT_SQUARE, V))), 0.5);
check('a diagonal fold leaves half the paper', round(area(clip(UNIT_SQUARE, D))), 0.5);
check('a diagonal fold gives a triangle', clip(UNIT_SQUARE, D).length, 3);
check('two folds leave a quarter', round(area(clip(clip(UNIT_SQUARE, V), H))), 0.25);

// ── Reflection ────────────────────────────────────────────────────────────
check('reflecting twice returns the point', holesKey([reflect(V, reflect(V, [0.2, 0.7]))]), holesKey([[0.2, 0.7]]));
check('a point on the crease does not move', holesKey([reflect(V, [0.5, 0.3])]), holesKey([[0.5, 0.3]]));
check('x=0.2 mirrors to x=0.8 across x=0.5', holesKey(unfoldHoles([[0.2, 0.3]], [V])), holesKey([[0.2, 0.3], [0.8, 0.3]]));
check('the diagonal swaps the coordinates', holesKey([reflect(D, [0.2, 0.7])]), holesKey([[0.7, 0.2]]));

// ── Punching ──────────────────────────────────────────────────────────────
// Every fold doubles the holes, because the punch goes through every layer.
check('1 hole through 1 fold opens to 2', unfoldHoles([[0.2, 0.3]], [V]).length, 2);
check('1 hole through 2 folds opens to 4', unfoldHoles([[0.2, 0.3]], [V, H]).length, 4);
check('1 hole through 3 folds opens to 8', unfoldHoles([[0.15, 0.2]], [V, H, D]).length, 8);
check('2 holes through 2 folds open to 8', unfoldHoles([[0.2, 0.3], [0.3, 0.15]], [V, H]).length, 8);

// ── Cutting ───────────────────────────────────────────────────────────────
// Slicing the corner off a folded stack takes a triangle out of every layer.
const corner = line(1, 1, 0.35, 1);
const oneCorner = 0.35 * 0.35 / 2;
check('one cut, unfolded flat, removes one corner', round(area(unfoldCuts([corner], []))), round(1 - oneCorner));
check('one cut through one fold removes two corners', round(area(unfoldCuts([corner], [V]))), round(1 - 2 * oneCorner));
check('one cut through two folds removes four corners', round(area(unfoldCuts([corner], [V, H]))), round(1 - 4 * oneCorner));
check('the cut sheet is still a single closed shape', unfoldCuts([corner], [V, H]).length, 8);

// ── Helpers used to place punches ─────────────────────────────────────────
check('a point inside the square is found to be inside', contains(UNIT_SQUARE, [0.5, 0.5]), true);
check('a point outside is found to be outside', contains(UNIT_SQUARE, [1.5, 0.5]), false);
check('distance from the middle to the edge is a half', round(edgeDistance(UNIT_SQUARE, [0.5, 0.5])), 0.5);

console.log(failures === 0 ? '\nPaper geometry is correct.' : `\n${failures} failures.`);
process.exit(failures === 0 ? 0 : 1);
