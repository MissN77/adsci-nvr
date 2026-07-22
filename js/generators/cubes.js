// ── Nets and Cubes ────────────────────────────────────────────────────────
// The old app asked these as written general-knowledge questions ("how many
// nets does a cube have?"), which is not non-verbal reasoning at all, and
// several of its stated answers were wrong.
//
// Here a net is FOLDED FOR REAL. The cube is rolled from cell to cell across
// the net and we track which cube face ends up lying on each square. A net is
// valid exactly when all six squares land on six different faces. That single
// simulation answers both question types honestly:
//
//   * which of these nets folds into a cube      (validity)
//   * which face ends up opposite the marked one (face pairing)
//
// Rolling maths, with d = the face lying on the paper, n = the face pointing
// up the page, e = the face pointing right. Rolling east tips the cube over
// its east edge, so the bottom face swings round to the east side:
//     east:  d -> -e, e -> d          (n unchanged)
//     north: d -> -n, n -> d          (e unchanged)

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'cube',
  name: 'Nets and Cubes',
  blurb: 'Fold the flat net up in your head and see where each face lands.',
  group: 'general',
};

// Faces are unit vectors, written as short keys.
const neg = (v) => `-${v}`.replace('--', '');
const OPPOSITE = { '+x': '-x', '-x': '+x', '+y': '-y', '-y': '+y', '+z': '-z', '-z': '+z' };

/**
 * Fold a net and return the cube face lying on each cell, or null if the net
 * is not a valid cube net.
 * `cells` is an array of [col, row]. Cells must be edge-connected.
 */
export function foldNet(cells) {
  if (cells.length !== 6) return null;
  const key = ([c, r]) => `${c},${r}`;
  const index = new Map(cells.map((c, i) => [key(c), i]));

  const faces = new Array(cells.length).fill(null);
  const start = 0;
  // d lies on the paper, n points up the page, e points right.
  const frames = new Array(cells.length).fill(null);
  frames[start] = { d: '-z', n: '+y', e: '+x' };
  faces[start] = '-z';

  const queue = [start];
  let seen = 1;
  while (queue.length) {
    const i = queue.shift();
    const [c, r] = cells[i];
    const { d, n, e } = frames[i];

    const moves = [
      // Moving right across the page rolls the cube east.
      { at: [c + 1, r], frame: { d: OPPOSITE[e], n, e: d } },
      { at: [c - 1, r], frame: { d: e, n, e: OPPOSITE[d] } },
      // Screen y grows downwards, so [c, r-1] is up the page: roll north.
      { at: [c, r - 1], frame: { d: OPPOSITE[n], n: d, e } },
      { at: [c, r + 1], frame: { d: n, n: OPPOSITE[d], e } },
    ];

    for (const m of moves) {
      const j = index.get(key(m.at));
      if (j === undefined || frames[j]) continue;
      frames[j] = m.frame;
      faces[j] = m.frame.d;
      seen++;
      queue.push(j);
    }
  }

  // Disconnected net, or two squares folding onto the same face.
  if (seen !== 6) return null;
  if (new Set(faces).size !== 6) return null;
  return faces;
}

/**
 * Fold a net and return the full ORIENTATION of the cube at each cell, not
 * just which face lands there.
 *
 * {d, n, e} means: face d lies on this cell, face n points up the page, face
 * e points right. The extra two vectors are what makes it possible to know
 * which way up a symbol printed on that cell ends up on the finished cube.
 */
export function foldNetFrames(cells) {
  if (cells.length !== 6) return null;
  const key = ([c, r]) => `${c},${r}`;
  const index = new Map(cells.map((c, i) => [key(c), i]));
  const frames = new Array(cells.length).fill(null);
  frames[0] = { d: '-z', n: '+y', e: '+x' };
  const queue = [0];
  let seen = 1;
  while (queue.length) {
    const i = queue.shift();
    const [c, r] = cells[i];
    const { d, n, e } = frames[i];
    const moves = [
      { at: [c + 1, r], frame: { d: OPPOSITE[e], n, e: d } },
      { at: [c - 1, r], frame: { d: e, n, e: OPPOSITE[d] } },
      { at: [c, r - 1], frame: { d: OPPOSITE[n], n: d, e } },
      { at: [c, r + 1], frame: { d: n, n: OPPOSITE[d], e } },
    ];
    for (const m of moves) {
      const j = index.get(key(m.at));
      if (j === undefined || frames[j]) continue;
      frames[j] = m.frame;
      seen++;
      queue.push(j);
    }
  }
  if (seen !== 6) return null;
  if (new Set(frames.map((f) => f.d)).size !== 6) return null;
  return frames;
}

export function isValidNet(cells) {
  return foldNet(cells) !== null;
}

/** Normalise a cell list so shapes can be compared regardless of position. */
function normalise(cells) {
  const minC = Math.min(...cells.map((c) => c[0]));
  const minR = Math.min(...cells.map((c) => c[1]));
  return cells.map(([c, r]) => [c - minC, r - minR])
    .sort((a, b) => a[1] - b[1] || a[0] - b[0]);
}

const shapeKey = (cells) => JSON.stringify(normalise(cells));

export { normalise, harvest, randomHexomino };

/** Grow a random edge-connected polyomino of six cells. */
function randomHexomino(rng) {
  const cells = [[0, 0]];
  const has = (c, r) => cells.some(([a, b]) => a === c && b === r);
  let guard = 0;
  while (cells.length < 6 && guard++ < 200) {
    const [c, r] = pick(rng, cells);
    const [dc, dr] = pick(rng, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
    if (!has(c + dc, r + dr)) cells.push([c + dc, r + dr]);
  }
  return cells.length === 6 ? cells : null;
}

/** Collect distinct valid and invalid nets by generating and testing. */
function harvest(rng, want, valid) {
  const out = [];
  const seen = new Set();
  let guard = 0;
  while (out.length < want && guard++ < 4000) {
    const cells = randomHexomino(rng);
    if (!cells) continue;
    if (isValidNet(cells) !== valid) continue;
    const k = shapeKey(cells);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(normalise(cells));
  }
  return out.length === want ? out : null;
}

// ── Rendering ─────────────────────────────────────────────────────────────

function netSVG(cells, { size = 22, marks = {} } = {}) {
  const norm = normalise(cells);
  const cols = Math.max(...norm.map((c) => c[0])) + 1;
  const rows = Math.max(...norm.map((c) => c[1])) + 1;
  const w = cols * size;
  const h = rows * size;
  const squares = norm.map(([c, r], i) => {
    const mark = marks[i];
    const fill = mark === 'target' ? '#2A7B6F' : mark ? '#F5CE6A' : '#FFFFFF';
    const label = mark && mark !== 'target'
      ? `<text x="${c * size + size / 2}" y="${r * size + size / 2 + 5}" text-anchor="middle" font-size="${size * 0.55}" font-weight="bold" fill="#1A3A4A">${mark}</text>`
      : '';
    return `<rect x="${c * size}" y="${r * size}" width="${size}" height="${size}" fill="${fill}" stroke="#1A3A4A" stroke-width="2"/>${label}`;
  }).join('');
  return `<svg viewBox="-2 -2 ${w + 4} ${h + 4}" width="${w + 4}" height="${h + 4}" class="net">${squares}</svg>`;
}

// ── Question forms ────────────────────────────────────────────────────────

function validityQuestion(rng) {
  const good = harvest(rng, 1, true);
  const bad = harvest(rng, DISTRACTOR_COUNT, false);
  if (!good || !bad) return null;

  const correct = good[0];
  const idx = int(rng, 0, DISTRACTOR_COUNT);
  const opts = bad.slice();
  opts.splice(idx, 0, correct);

  return {
    type: 'cube',
    prompt: 'Which one of these nets would fold up into a cube?',
    stimulus: '',
    noStimulus: true,
    optionsHTML: options(opts.map((c) => netSVG(c, { size: 26 }))),
    answer: idx,
    explain: explain(
      `The answer is <strong>${LETTERS[idx]}</strong>.`,
      [
        'Fold the net up in your head one square at a time and keep track of where each square lands.',
        'A net only works if all six squares land on six different faces. In the other three, two squares end up trying to cover the same face, so the cube cannot close.',
        'A quick check: a row of four squares wraps right around the cube like a belt, so it needs exactly one square above and one below, and they must not be in the same column.',
      ],
    ),
    teachRef: 'cube',
  };
}

function oppositeFaceQuestion(rng) {
  const nets = harvest(rng, 1, true);
  if (!nets) return null;
  const cells = nets[0];
  const faces = foldNet(cells);
  if (!faces) return null;

  // Mark one square as the target, letter the other five, and ask which
  // letter ends up on the opposite face.
  const targetIdx = int(rng, 0, 5);
  const others = [0, 1, 2, 3, 4, 5].filter((i) => i !== targetIdx);
  const wantFace = OPPOSITE[faces[targetIdx]];
  const answerCell = others.find((i) => faces[i] === wantFace);
  if (answerCell === undefined) return null;

  // Four of the five remaining squares are offered, including the right one.
  const letters = ['P', 'Q', 'R', 'S', 'T'];
  const lettered = shuffle(rng, others);
  const marks = { [targetIdx]: 'target' };
  lettered.forEach((cellIdx, i) => { marks[cellIdx] = letters[i]; });

  const answerLetter = letters[lettered.indexOf(answerCell)];
  const wrongLetters = shuffle(rng, letters.slice(0, lettered.length).filter((l) => l !== answerLetter)).slice(0, DISTRACTOR_COUNT);
  if (wrongLetters.length < DISTRACTOR_COUNT) return null;

  const idx = int(rng, 0, DISTRACTOR_COUNT);
  const opts = wrongLetters.slice();
  opts.splice(idx, 0, answerLetter);

  return {
    type: 'cube',
    prompt: 'This net folds into a cube. Which square ends up on the face opposite the shaded one?',
    stimulus: `<div class="stim-row">${netSVG(cells, { size: 44, marks })}</div>`,
    optionsHTML: options(opts.map((l) => `<span class="opt-text">${l}</span>`)),
    answer: idx,
    explain: explain(
      `The answer is <strong>${LETTERS[idx]} (${answerLetter})</strong>.`,
      [
        'Two squares that touch along an edge always fold into faces that meet at a corner, so they can never be opposite each other.',
        'Squares that sit two apart in the same straight line always end up opposite, because folding a line of three wraps it round three sides of the cube.',
        'Where the net bends, follow it round square by square rather than trusting how it looks flat on the page.',
      ],
    ),
    teachRef: 'cube',
  };
}

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    const wantOpposite = difficulty >= 2 && rng() < 0.5;
    return wantOpposite ? oppositeFaceQuestion(rng) : validityQuestion(rng);
  });
}
