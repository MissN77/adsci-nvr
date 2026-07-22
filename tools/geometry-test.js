// ── Geometry self-check ───────────────────────────────────────────────────
// Proves that the `sym` and `chiral` values written in the shape table match
// what the polygons actually do.
//
// These two numbers are load-bearing. `sym` decides whether a rotation is
// visible, and `chiral` decides whether a reflection is distinguishable from
// a turn. A wrong entry does not crash anything: it quietly produces
// questions with two identical options, or with no correct answer at all.
// Both mistakes were present in the first draft of the table and neither was
// caught by generating a quarter of a million questions, because the options
// differed as MARKUP while rendering identically. So the table is checked
// against the geometry itself, every run.

import { SHAPES, CHIRAL, CHIRAL_MARGIN } from '../js/core/figure.js';

const TOL = 1e-6;

const rotate = (poly, deg) => {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return poly.map(([x, y]) => [x * c - y * s, x * s + y * c]);
};

const mirror = (poly) => poly.map(([x, y]) => [-x, y]);

/** Point-set equality, order independent, with tolerance. */
function samePoints(A, B) {
  if (A.length !== B.length) return false;
  const used = new Array(B.length).fill(false);
  for (const a of A) {
    let hit = -1;
    for (let j = 0; j < B.length; j++) {
      if (used[j]) continue;
      if (Math.hypot(a[0] - B[j][0], a[1] - B[j][1]) < TOL) { hit = j; break; }
    }
    if (hit < 0) return false;
    used[hit] = true;
  }
  return true;
}

function trueSymmetry(poly) {
  for (const n of [12, 10, 8, 7, 6, 5, 4, 3, 2, 1]) {
    let ok = true;
    for (let k = 1; k < n; k++) {
      if (!samePoints(poly, rotate(poly, (360 * k) / n))) { ok = false; break; }
    }
    if (ok) return n;
  }
  return 1;
}

function trueChirality(poly) {
  // Chiral means: no rotation of the shape reproduces its mirror image.
  for (let d = 0; d < 3600; d++) {
    if (samePoints(mirror(poly), rotate(poly, d / 10))) return false;
  }
  return true;
}

let failures = 0;
console.log('shape        sym          chiral      mirror-vs-rotation gap');
for (const [name, def] of Object.entries(SHAPES)) {
  if (!def.poly) {
    console.log(`${name.padEnd(12)} curved, no polygon to check`);
    continue;
  }
  const sym = trueSymmetry(def.poly);
  const chiral = trueChirality(def.poly);
  const symOk = def.sym === sym;
  const chOk = def.chiral === chiral;
  if (!symOk || !chOk) failures++;

  const gap = def.chiralMargin;
  const usable = chiral && gap >= CHIRAL_MARGIN;
  console.log(
    `${name.padEnd(12)} ${String(def.sym).padStart(2)}${symOk ? ' ok ' : ` != ${sym} ✗`}`
    + `      ${String(def.chiral).padStart(5)}${chOk ? ' ok' : ` != ${chiral} ✗`}`
    + `      ${gap.toFixed(3)}${chiral ? (usable ? '  usable for reflection' : '  TOO CLOSE, excluded') : ''}`,
  );
}

// Reflection questions are only well posed on shapes whose mirror is clearly
// not a rotation, so the usable pool must not be thin.
console.log(`\nshapes usable for reflection (gap >= ${CHIRAL_MARGIN}): ${CHIRAL.length} [${CHIRAL.join(', ')}]`);
if (CHIRAL.length < 4) {
  console.log('✗ too few usable shapes for varied reflection questions');
  failures++;
}

console.log(failures === 0 ? '\nGeometry table is correct.' : `\n${failures} incorrect entries.`);
process.exit(failures === 0 ? 0 : 1);
