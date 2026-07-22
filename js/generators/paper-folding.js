// ── Paper Folding ─────────────────────────────────────────────────────────
// A square of paper is folded once or twice, holes are punched through every
// layer, and the child works out what the sheet looks like opened out.
//
// The holes are not written by hand. They are SIMULATED: the punch positions
// are reflected back across each fold line in reverse order, which is exactly
// what happens to real paper. That means the answer is correct by
// construction, and the distractors can be built from specific, nameable
// mistakes rather than from guesswork.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';

export const meta = {
  id: 'fold',
  name: 'Paper Folding',
  blurb: 'Fold, punch, then work out what the paper looks like opened out.',
};

// A fold is described by the axis it folds along and where the crease sits.
// 'v' folds left-right about a vertical crease at x = line.
// 'h' folds top-bottom about a horizontal crease at y = line.
const FOLDS = {
  v: { line: 0.5, reflect: (p, line) => [2 * line - p[0], p[1]] },
  h: { line: 0.5, reflect: (p, line) => [p[0], 2 * line - p[1]] },
};

/**
 * Unfold a set of punch positions.
 * Folds are applied in order when folding, so they are undone in reverse.
 * Each undo doubles the holes by mirroring them across that crease.
 */
export function unfold(holes, folds) {
  let pts = holes.map((p) => p.slice());
  for (let i = folds.length - 1; i >= 0; i--) {
    const { axis, line } = folds[i];
    const mirrored = pts.map((p) => FOLDS[axis].reflect(p, line));
    pts = dedupe([...pts, ...mirrored]);
  }
  return pts;
}

function dedupe(pts) {
  const seen = new Set();
  const out = [];
  for (const p of pts) {
    const k = `${p[0].toFixed(3)},${p[1].toFixed(3)}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(p);
  }
  return out;
}

function sameHoles(a, b) {
  if (a.length !== b.length) return false;
  const key = (pts) => pts.map((p) => `${p[0].toFixed(3)},${p[1].toFixed(3)}`).sort().join('|');
  return key(a) === key(b);
}

// ── Rendering ─────────────────────────────────────────────────────────────

const S = 104; // panel size in px

function sheet(holes, { region = [0, 0, 1, 1], creases = [], size = S } = {}) {
  const [x0, y0, x1, y1] = region;
  const w = (x1 - x0) * size;
  const h = (y1 - y0) * size;
  const px = (p) => `${((p[0] - x0) * size).toFixed(1)}`;
  const py = (p) => `${((p[1] - y0) * size).toFixed(1)}`;

  const creaseMarkup = creases.map((c) => (c.axis === 'v'
    ? `<line x1="${((c.line - x0) * size).toFixed(1)}" y1="0" x2="${((c.line - x0) * size).toFixed(1)}" y2="${h}" stroke="#2A7B6F" stroke-width="2" stroke-dasharray="6 4"/>`
    : `<line x1="0" y1="${((c.line - y0) * size).toFixed(1)}" x2="${w}" y2="${((c.line - y0) * size).toFixed(1)}" stroke="#2A7B6F" stroke-width="2" stroke-dasharray="6 4"/>`)).join('');

  const holeMarkup = holes
    .map((p) => `<circle cx="${px(p)}" cy="${py(p)}" r="${(size * 0.075).toFixed(1)}" fill="#1A3A4A"/>`)
    .join('');

  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" class="paper">
    <rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="#FFFFFF" stroke="#1A3A4A" stroke-width="2.5"/>
    ${creaseMarkup}${holeMarkup}</svg>`;
}

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    const nFolds = difficulty === 1 ? 1 : difficulty === 2 ? (rng() < 0.5 ? 1 : 2) : 2;

    // Build the fold sequence. Two folds always use different axes, so the
    // folded sheet is a quarter rather than a thin strip.
    const first = pick(rng, ['v', 'h']);
    const folds = [{ axis: first, line: 0.5 }];
    if (nFolds === 2) folds.push({ axis: first === 'v' ? 'h' : 'v', line: 0.5 });

    // Work out the region of paper left showing after folding. The half that
    // stays put is always the left or top half, so the visible region is the
    // low side of each crease.
    let region = [0, 0, 1, 1];
    for (const f of folds) {
      if (f.axis === 'v') region = [region[0], region[1], f.line, region[3]];
      else region = [region[0], region[1], region[2], f.line];
    }

    // Punch one or two holes inside the folded region, on a coarse grid so
    // they sit clearly rather than ambiguously near a crease.
    const gx = [0.16, 0.34];
    const gy = [0.16, 0.34];
    const spots = [];
    for (const x of gx) for (const y of gy) {
      const sx = region[0] + (x / 0.5) * (region[2] - region[0]);
      const sy = region[1] + (y / 0.5) * (region[3] - region[1]);
      spots.push([+sx.toFixed(3), +sy.toFixed(3)]);
    }
    const nHoles = difficulty >= 3 && rng() < 0.5 ? 2 : 1;
    const holes = shuffle(rng, spots).slice(0, nHoles);

    const correct = unfold(holes, folds);
    // Every fold must double the holes, otherwise a punch landed on a crease
    // and the question loses its point.
    if (correct.length !== holes.length * Math.pow(2, folds.length)) return null;

    // ── Distractors: named mistakes ──────────────────────────────────────
    const pool = [];
    // Forgot to unfold at all.
    pool.push(holes.map((p) => p.slice()));
    // Unfolded across only the last crease.
    if (folds.length === 2) pool.push(unfold(holes, [folds[1]]));
    // Unfolded across only the first crease.
    pool.push(unfold(holes, [folds[0]]));
    // Mirrored across the wrong axis throughout.
    const flipped = folds.map((f) => ({ axis: f.axis === 'v' ? 'h' : 'v', line: f.line }));
    pool.push(unfold(holes, flipped));
    // Slid the holes across instead of mirroring them.
    pool.push(dedupe(correct.map((p) => [+(1 - p[0]).toFixed(3), p[1]])));
    // Right number of holes, wrong places.
    pool.push(dedupe(correct.map((p) => [p[1], p[0]])));

    const distractors = [];
    for (const cand of shuffle(rng, pool)) {
      if (distractors.length >= 3) break;
      if (cand.length === 0) continue;
      if (sameHoles(cand, correct)) continue;
      if (distractors.some((d) => sameHoles(d, cand))) continue;
      distractors.push(cand);
    }
    if (distractors.length < 3) return null;

    const idx = int(rng, 0, 3);
    const opts = distractors.slice();
    opts.splice(idx, 0, correct);

    // ── Stimulus: the fold story, panel by panel ─────────────────────────
    const panels = [];
    panels.push(`<div class="fold-step"><span class="fold-cap">Start</span>${sheet([], { creases: [folds[0]] })}</div>`);
    let shown = [0, 0, 1, 1];
    folds.forEach((f, i) => {
      if (f.axis === 'v') shown = [shown[0], shown[1], f.line, shown[3]];
      else shown = [shown[0], shown[1], shown[2], f.line];
      const next = folds[i + 1];
      panels.push('<div class="fold-arrow">→</div>');
      panels.push(`<div class="fold-step"><span class="fold-cap">Fold ${i + 1}</span>${sheet([], {
        region: shown, creases: next ? [next] : [],
      })}</div>`);
    });
    panels.push('<div class="fold-arrow">→</div>');
    panels.push(`<div class="fold-step"><span class="fold-cap">Punch</span>${sheet(holes, { region: shown })}</div>`);

    const optionHTML = opts.map((h) => sheet(h, { size: 92 }));

    const foldWords = folds
      .map((f) => (f.axis === 'v' ? 'left over right' : 'bottom up to the top'))
      .join(', then ');

    return {
      type: 'fold',
      prompt: 'The paper is folded, then holes are punched through every layer. What does it look like opened out?',
      stimulus: `<div class="stim-row fold-row">${panels.join('')}</div>`,
      optionsHTML: options(optionHTML),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          `The paper was folded ${foldWords}.`,
          `Each hole goes through every layer, so opening one fold doubles the holes. ${holes.length} hole${holes.length > 1 ? 's' : ''} and ${folds.length} fold${folds.length > 1 ? 's' : ''} gives <strong>${correct.length} holes</strong> in total.`,
          'Open the paper one fold at a time, and mirror the holes across the crease each time. The holes always land opposite each other, the same distance from the crease.',
        ],
      ),
      teachRef: 'fold',
    };
  });
}
