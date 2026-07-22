// ── Net to 3D cube ────────────────────────────────────────────────────────
// A net with a symbol on every face is shown. Which of the five drawn cubes
// could be folded from it?
//
// This is questions 18 to 20 of the official Quest non-verbal booklet, worded
// "Which cube can be made from this net?". It is a genuinely different skill
// from the net questions the app already had. Asking whether a net is valid,
// or which face ends up opposite another, only needs the FACE PAIRINGS.
// This needs the orientation of each symbol as well: a triangle that ends up
// pointing the wrong way round makes the cube impossible, even though every
// face carries the right symbol.
//
// How correctness is guaranteed:
//
//   1. The net is folded by simulation, giving each cell the cube face it
//      lands on AND which way up its symbol ends up.
//   2. All 24 orientations of the finished cube are enumerated. Each one is
//      reduced to a "view key": the symbol and its up direction on the three
//      faces a viewer can actually see.
//   3. The correct option is one of those 24 views, so it is possible by
//      construction.
//   4. Every distractor is built by damaging the cube (swapping two symbols,
//      turning one symbol on its face, or moving a symbol to the face
//      opposite) and is then CHECKED against all 24 true views. If it happens
//      to match one, it is thrown away rather than shown.
//
// A note on mirroring. Whether a printed net folds with the ink inside or
// outside is a convention that flips left and right on every face. To make
// the question immune to it, every symbol used here is symmetrical about its
// own vertical axis, so a mirrored symbol is indistinguishable from an
// unmirrored one. Which way up a symbol sits still matters, and that is what
// the question turns on.

import { SHAPES, minVisibleRot } from '../core/figure.js';
import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';
import { foldNetFrames, isValidNet, normalise } from './cubes.js';

export const meta = {
  id: 'cube3d',
  name: 'Nets to Cubes',
  blurb: 'Fold the net in your head and find the cube it makes.',
  group: 'quest',
};

// ── Vector helpers ────────────────────────────────────────────────────────
// Faces are named '+x', '-y' and so on. Numeric form is [x, y, z].

const VEC = {
  '+x': [1, 0, 0], '-x': [-1, 0, 0],
  '+y': [0, 1, 0], '-y': [0, -1, 0],
  '+z': [0, 0, 1], '-z': [0, 0, -1],
};
const nameOf = (v) => Object.keys(VEC).find((k) => VEC[k].every((c, i) => c === v[i]));
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

/** The 24 rotations of a cube, as functions on a vector. */
function buildRotations() {
  const axes = Object.values(VEC);
  const out = [];
  for (const zAxis of axes) {
    for (const yAxis of axes) {
      // The two must be perpendicular, and the third follows right-handed.
      if (Math.abs(zAxis[0] * yAxis[0] + zAxis[1] * yAxis[1] + zAxis[2] * yAxis[2]) !== 0) continue;
      const xAxis = cross(yAxis, zAxis);
      // Rows of the matrix send the standard basis onto these axes.
      const m = [
        [xAxis[0], yAxis[0], zAxis[0]],
        [xAxis[1], yAxis[1], zAxis[1]],
        [xAxis[2], yAxis[2], zAxis[2]],
      ];
      out.push((v) => [
        m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
        m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
        m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
      ]);
    }
  }
  return out;
}
export const ROTATIONS = buildRotations();

// ── Symbols ───────────────────────────────────────────────────────────────
// All symmetrical about their own vertical axis, so the ink-inside or
// ink-outside convention cannot change how they look. Mixed fills, as Quest
// does, because shading is part of what distinguishes the faces.

const SYMBOLS = [
  { shape: 'tri', fill: 'black' }, { shape: 'tri', fill: 'white' },
  { shape: 'sq', fill: 'black' }, { shape: 'sq', fill: 'white' },
  { shape: 'circle', fill: 'black' }, { shape: 'circle', fill: 'white' },
  { shape: 'diamond', fill: 'black' }, { shape: 'diamond', fill: 'white' },
  { shape: 'star5', fill: 'black' }, { shape: 'cross', fill: 'black' },
];
const symKey = (s) => `${s.shape}:${s.fill}`;
const PAINT = { black: '#1A3A4A', white: '#FFFFFF' };

// ── The cube ──────────────────────────────────────────────────────────────
// A cube is a list of six { normal, up, symbol }, all vectors numeric.

export function cubeFromNet(cells, symbols) {
  const frames = foldNetFrames(cells);
  if (!frames) return null;
  return frames.map((f, i) => ({
    normal: VEC[f.d],
    up: VEC[f.n],
    symbol: symbols[i],
  }));
}

const rotateCube = (cube, R) => cube.map((f) => ({
  normal: R(f.normal), up: R(f.up), symbol: f.symbol,
}));

/** The three faces a viewer sees, in a fixed isometric view. */
const VISIBLE = ['+z', '+x', '+y'];

function viewOf(cube) {
  return VISIBLE.map((dir) => cube.find((f) => nameOf(f.normal) === dir));
}

/**
 * Reduce a view to a string. Two cubes drawn the same way produce the same
 * key, which is what lets a distractor be checked for being accidentally
 * correct.
 */
function viewKey(cube) {
  const seen = viewOf(cube);
  if (seen.some((f) => !f)) return null;
  return seen.map((f) => {
    // A symbol turned by less than its own symmetry looks the same, so the
    // up vector is normalised against that before being compared.
    const step = minVisibleRot(f.symbol.shape);
    const up = step === Infinity ? 'any' : nameOf(f.up);
    return `${symKey(f.symbol)}@${up}`;
  }).join('|');
}

/** Every view of this cube that a drawing could legitimately show. */
export function allTrueViews(cube) {
  const set = new Set();
  for (const R of ROTATIONS) {
    const k = viewKey(rotateCube(cube, R));
    if (k) set.add(k);
  }
  return set;
}

// ── Isometric drawing ─────────────────────────────────────────────────────

const ISO = 90;

/** Project a 3D point to the screen. Larger z is up the page. */
function project(v, size) {
  return [
    (v[0] - v[1]) * 0.866 * size,
    ((v[0] + v[1]) * 0.5 - v[2]) * size,
  ];
}

function cubeSVG(cube, size = ISO) {
  const half = 0.5;
  const parts = [];

  for (const dir of VISIBLE) {
    const face = cube.find((f) => nameOf(f.normal) === dir);
    if (!face) continue;
    const n = face.normal;
    const up = face.up;
    const right = cross(up, n);
    const centre = n.map((c) => c * half);

    const at = (a, b) => project(
      [0, 1, 2].map((i) => centre[i] + a * right[i] * half + b * up[i] * half),
      size,
    );

    // The face itself.
    const corners = [at(-1, 1), at(1, 1), at(1, -1), at(-1, -1)]
      .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
    parts.push(`<polygon points="${corners}" fill="#FFFFFF" stroke="#1A3A4A" stroke-width="2.5" stroke-linejoin="round"/>`);

    // The symbol, drawn by projecting its outline onto the face rather than
    // using a transform, so the stroke width stays constant.
    const def = SHAPES[face.symbol.shape];
    const scale = 0.55;
    let pts;
    if (!def.poly) {
      pts = [...Array(28)].map((_, i) => {
        const a = (i / 28) * Math.PI * 2;
        return at(Math.cos(a) * scale, Math.sin(a) * scale);
      });
    } else {
      // Polygon points are listed with y downwards, so up is negated.
      pts = def.poly.map(([px, py]) => at(px * scale, -py * scale));
    }
    const poly = pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
    parts.push(`<polygon points="${poly}" fill="${PAINT[face.symbol.fill]}" stroke="#1A3A4A" stroke-width="1.8" stroke-linejoin="round"/>`);
  }

  const r = size * 1.15;
  return `<svg viewBox="${-r} ${-r} ${r * 2} ${r * 2}" width="${size * 1.5}" height="${size * 1.5}" class="cube3d" role="img" aria-label="a cube drawn in three dimensions, showing three faces">${parts.join('')}</svg>`;
}

/** The flat net, with each symbol drawn upright in its cell. */
function netSVG(cells, symbols, size = 40) {
  const norm = normalise(cells);
  const cols = Math.max(...norm.map((c) => c[0])) + 1;
  const rows = Math.max(...norm.map((c) => c[1])) + 1;
  const parts = [];
  norm.forEach(([c, r], i) => {
    const x = c * size;
    const y = r * size;
    parts.push(`<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="#FFFFFF" stroke="#1A3A4A" stroke-width="2"/>`);
    const s = symbols[i];
    const def = SHAPES[s.shape];
    const cx = x + size / 2;
    const cy = y + size / 2;
    const rad = size * 0.3;
    if (!def.poly) {
      parts.push(`<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${PAINT[s.fill]}" stroke="#1A3A4A" stroke-width="1.6"/>`);
    } else {
      const pts = def.poly.map(([px, py]) => `${(cx + px * rad).toFixed(2)},${(cy + py * rad).toFixed(2)}`).join(' ');
      parts.push(`<polygon points="${pts}" fill="${PAINT[s.fill]}" stroke="#1A3A4A" stroke-width="1.6" stroke-linejoin="round"/>`);
    }
  });
  const w = cols * size;
  const h = rows * size;
  return `<svg viewBox="-2 -2 ${w + 4} ${h + 4}" width="${w + 4}" height="${h + 4}" class="net" role="img" aria-label="a flat net of six squares, each with a shape on it">${parts.join('')}</svg>`;
}

// ── Damage, to make wrong cubes ───────────────────────────────────────────

function damaged(rng, cube) {
  const c = cube.map((f) => ({ ...f }));
  const how = int(rng, 0, 2);

  if (how === 0) {
    // Two faces swap symbols.
    const [i, j] = shuffle(rng, [0, 1, 2, 3, 4, 5]).slice(0, 2);
    const t = c[i].symbol;
    c[i].symbol = c[j].symbol;
    c[j].symbol = t;
  } else if (how === 1) {
    // One symbol is turned on its face. Only worth doing where the turn
    // shows, so a square turned 90 degrees is no good.
    const candidates = c.filter((f) => minVisibleRot(f.symbol.shape) <= 180);
    if (!candidates.length) return null;
    const f = pick(rng, candidates);
    f.up = cross(f.normal, f.up);
  } else {
    // A symbol moves to the face opposite, which is the mistake a child makes
    // when they lose track of which way the net wraps.
    const i = int(rng, 0, 5);
    const oppName = nameOf(c[i].normal.map((v) => -v));
    const j = c.findIndex((f) => nameOf(f.normal) === oppName);
    if (j < 0) return null;
    const t = c[i].symbol;
    c[i].symbol = c[j].symbol;
    c[j].symbol = t;
  }
  return c;
}

// ── Generator ─────────────────────────────────────────────────────────────

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    // Build a valid net by growing one and testing it, same as the flat
    // cube questions do.
    let cells = null;
    for (let tries = 0; tries < 60 && !cells; tries++) {
      const grown = [[0, 0]];
      const has = (c, r) => grown.some(([a, b]) => a === c && b === r);
      let guard = 0;
      while (grown.length < 6 && guard++ < 120) {
        const [c, r] = pick(rng, grown);
        const [dc, dr] = pick(rng, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
        if (!has(c + dc, r + dr)) grown.push([c + dc, r + dr]);
      }
      if (grown.length === 6 && isValidNet(grown)) cells = normalise(grown);
    }
    if (!cells) return null;

    // Easier papers reuse a couple of symbols, which gives the child fewer
    // things to track. Harder papers give every face its own.
    const pool = shuffle(rng, SYMBOLS);
    const distinct = difficulty === 1 ? 4 : 6;
    const symbols = [0, 1, 2, 3, 4, 5].map((i) => pool[i % distinct]);

    const cube = cubeFromNet(cells, shuffle(rng, symbols));
    if (!cube) return null;

    const trueViews = allTrueViews(cube);
    // A cube whose symbols repeat too much has few distinguishable views and
    // makes weak distractors.
    if (trueViews.size < 8) return null;

    const correctRotation = pick(rng, ROTATIONS);
    const correctCube = rotateCube(cube, correctRotation);
    const correctKey = viewKey(correctCube);
    if (!correctKey) return null;

    // Distractors: damaged cubes, verified impossible.
    const distractors = [];
    const usedKeys = new Set([correctKey]);
    for (let tries = 0; tries < 400 && distractors.length < DISTRACTOR_COUNT; tries++) {
      const broken = damaged(rng, cube);
      if (!broken) continue;
      const view = rotateCube(broken, pick(rng, ROTATIONS));
      const k = viewKey(view);
      if (!k || usedKeys.has(k)) continue;
      // THE check: if any rotation of the real cube looks like this, the
      // option is actually correct and must not be offered as a wrong one.
      if (trueViews.has(k)) continue;
      usedKeys.add(k);
      distractors.push(view);
    }
    if (distractors.length < DISTRACTOR_COUNT) return null;

    const idx = int(rng, 0, DISTRACTOR_COUNT);
    const opts = distractors.slice();
    opts.splice(idx, 0, correctCube);

    return {
      type: 'cube3d',
      prompt: 'Which cube can be made from this net?',
      stimulus: `<div class="stim-row">${netSVG(cells, symbols)}</div>`,
      optionsHTML: options(opts.map((c) => cubeSVG(c, 62))),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          'Only three faces of a cube can be seen at once, so check the three you can see and ignore the rest.',
          'Start with the faces that cannot appear together. Two squares directly opposite each other in the net fold onto opposite sides of the cube, and opposite sides can never both be visible.',
          'Then check which way up each symbol sits. A cube can show all the right symbols and still be wrong because one of them has ended up turned the wrong way.',
        ],
      ),
      teachRef: 'cube3d',
    };
  });
}
