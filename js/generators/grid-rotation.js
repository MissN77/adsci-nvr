// ── Grid Rotation ─────────────────────────────────────────────────────────
// A square grid is partly shaded. The child pictures the whole grid turned
// through a quarter or half turn and picks the result.
//
// Added after reading the official Quest familiarisation booklet, where this
// is questions 5 and 6 of the non-verbal paper, worded:
//
//   "Parts of the grid below have been shaded to make a pattern. Choose the
//    option that shows what the grid looks like after it is rotated 90
//    degrees anticlockwise."
//
// The app had nothing like it. Every other rotation question here turns a
// single shape, which is a different skill: turning one object is about
// tracking its outline, whereas turning a grid is about holding a whole
// arrangement in mind at once.
//
// Correctness is exact. Rotating a matrix is arithmetic, not judgement, so
// the answer is right by construction and every distractor is a different
// transformation of the same grid, which guarantees it is wrong.

import { int, pick, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'grid',
  name: 'Grid Rotation',
  blurb: 'Turn the whole pattern in your head and see where it lands.',
};

// ── Grid maths ────────────────────────────────────────────────────────────
// A grid is an array of rows, each an array of 0 or 1.

export const rotateCW = (g) => g[0].map((_, c) => g.map((row) => row[c]).reverse());
export const rotateCCW = (g) => g[0].map((_, c) => g.map((row) => row[g[0].length - 1 - c]));
export const rotate180 = (g) => rotateCW(rotateCW(g));
export const flipH = (g) => g.map((row) => row.slice().reverse());
export const flipV = (g) => g.slice().reverse();

const key = (g) => g.map((r) => r.join('')).join('/');
const sameGrid = (a, b) => key(a) === key(b);

const TURNS = [
  { name: 'rotated 90&deg; clockwise', fn: rotateCW, short: 'a quarter turn clockwise' },
  { name: 'rotated 90&deg; anticlockwise', fn: rotateCCW, short: 'a quarter turn anticlockwise' },
  { name: 'rotated 180&deg;', fn: rotate180, short: 'a half turn' },
];

// ── Rendering ─────────────────────────────────────────────────────────────

function gridSVG(g, { size = 22, circles = false } = {}) {
  const n = g.length;
  const w = n * size;
  const cells = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const on = g[r][c] === 1;
      if (circles) {
        cells.push(`<rect x="${c * size}" y="${r * size}" width="${size}" height="${size}" fill="#FFFFFF" stroke="#1A3A4A" stroke-width="1"/>`);
        cells.push(`<circle cx="${c * size + size / 2}" cy="${r * size + size / 2}" r="${size * 0.34}" fill="${on ? '#9AA7B2' : '#FFFFFF'}" stroke="#1A3A4A" stroke-width="1.4"/>`);
      } else {
        cells.push(`<rect x="${c * size}" y="${r * size}" width="${size}" height="${size}" fill="${on ? '#9AA7B2' : '#FFFFFF'}" stroke="#1A3A4A" stroke-width="1.4"/>`);
      }
    }
  }
  return `<svg viewBox="-1 -1 ${w + 2} ${w + 2}" width="${w + 2}" height="${w + 2}" class="grid-fig">${cells.join('')}</svg>`;
}

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    // Quest uses a five by five grid. Smaller grids are easier to hold in
    // mind, so difficulty moves the size rather than the rule.
    const n = difficulty === 1 ? 4 : 5;
    const circles = rng() < 0.4;
    const turn = pick(rng, difficulty === 1 ? TURNS.slice(0, 2) : TURNS);

    // Roughly a third to a half shaded reads best: too few and the pattern
    // is trivial, too many and the options are hard to tell apart.
    const target = Math.round(n * n * (difficulty === 1 ? 0.3 : 0.4));
    const flat = new Array(n * n).fill(0);
    shuffle(rng, [...flat.keys()]).slice(0, target).forEach((i) => { flat[i] = 1; });
    const g = [];
    for (let r = 0; r < n; r++) g.push(flat.slice(r * n, r * n + n));

    // A pattern with rotational symmetry would look identical after the turn,
    // leaving the question with no visible answer.
    if (sameGrid(g, rotateCW(g)) || sameGrid(g, rotate180(g))) return null;

    const correct = turn.fn(g);
    if (sameGrid(correct, g)) return null;

    // Distractors are the other transformations a child confuses this with:
    // turning the wrong way, turning too far, or flipping instead of turning.
    const pool = [
      g,
      rotateCW(g),
      rotateCCW(g),
      rotate180(g),
      flipH(g),
      flipV(g),
      flipH(rotateCW(g)),
      flipV(rotateCW(g)),
    ];

    const distractors = [];
    for (const cand of shuffle(rng, pool)) {
      if (distractors.length >= DISTRACTOR_COUNT) break;
      if (sameGrid(cand, correct)) continue;
      if (distractors.some((d) => sameGrid(d, cand))) continue;
      distractors.push(cand);
    }
    if (distractors.length < DISTRACTOR_COUNT) return null;

    const idx = int(rng, 0, DISTRACTOR_COUNT);
    const opts = distractors.slice();
    opts.splice(idx, 0, correct);

    const arrow = turn.fn === rotateCCW ? '&#8630;' : '&#8631;';

    return {
      type: 'grid',
      prompt: `Parts of the grid below have been shaded to make a pattern. Choose the option that shows what the grid looks like after it is ${turn.name}.`,
      stimulus: `<div class="stim-row grid-stim">
          <span class="grid-turn" aria-hidden="true">${arrow}</span>
          ${gridSVG(g, { size: 26, circles })}
        </div>`,
      optionsHTML: options(opts.map((o) => gridSVG(o, { size: 19, circles }))),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          `The whole grid makes ${turn.short}, so every shaded square travels round together.`,
          turn.fn === rotate180
            ? 'After a half turn the top row becomes the bottom row, reversed. Check the corners first.'
            : 'After a quarter turn the top row becomes a side column. Find one corner square, work out where that corner ends up, and check the options against it.',
          'Watch for options that are the pattern flipped over rather than turned. A flip is not a turn, and it is the most common wrong answer here.',
        ],
      ),
      teachRef: 'grid',
    };
  });
}
