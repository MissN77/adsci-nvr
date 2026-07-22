// ── Matrices ──────────────────────────────────────────────────────────────
// A 3x3 grid with one cell missing. One rule runs across the rows, another
// down the columns. The missing cell has to satisfy both at once.

import { fig, ALL_SHAPES, ROT_SAFE } from '../core/figure.js';
import { pick, int } from '../core/rng.js';
import { chooseRules, applyRules, describeRules } from '../core/rules.js';
import { matrix, figureOptions, LETTERS } from '../core/render.js';
import { chooseDistractors, attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'mat',
  name: 'Matrices',
  blurb: 'Read across the rows and down the columns to find the missing piece.',
};

// Quest uses both sizes. A two by two grid gives less evidence per rule, so
// it is not simply an easier three by three: there is only one other cell in
// each direction to read the rule from.

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    const wantRot = difficulty >= 2 && rng() < 0.45;
    const shape = wantRot ? pick(rng, ROT_SAFE) : pick(rng, ALL_SHAPES.filter((s) => s !== 'circle'));

    const base = fig(shape, { fill: 'white', rot: 0, scale: 1, dots: 0 });

    // Rows and columns must use DIFFERENT attributes, or the grid becomes
    // self-contradictory (two rules fighting over the same property).
    const rowRules = chooseRules(rng, base, 1, ['shade', 'rot', 'scale', 'dots', 'pattern']);
    if (!rowRules.length) return null;
    const used = rowRules[0].attr;
    const colMenu = ['shade', 'rot', 'scale', 'dots', 'sides', 'stroke', 'pattern']
      .filter((k) => {
        if (used === 'fill') return k !== 'shade' && k !== 'pattern';
        if (used === 'rot') return k !== 'rot';
        if (used === 'scale') return k !== 'scale';
        if (used === 'dots') return k !== 'dots';
        return true;
      });
    const colRules = chooseRules(rng, base, 1, colMenu);
    if (!colRules.length || colRules[0].attr === used) return null;

    // A "sides" rule down the columns would change the shape under a row
    // rotation rule, breaking the guarantee that every turn stays visible.
    if (colRules[0].attr === 'shape' && used === 'rot') return null;

    const N = rng() < 0.4 ? 2 : 3;
    const cellAt = (r, c) => applyRules(applyRules(base, rowRules, c), colRules, r);

    const cells = [];
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) cells.push(cellAt(r, c));

    if (cells.some((f) => f.scale < 0.5 || f.scale > 1.4)) return null;

    // Every row and every column must actually progress, otherwise part of
    // the grid gives no information and the question is guessable.
    for (let r = 0; r < N; r++) {
      if (JSON.stringify(cells[r * N]) === JSON.stringify(cells[r * N + 1])) return null;
    }
    for (let c = 0; c < N; c++) {
      if (JSON.stringify(cells[c]) === JSON.stringify(cells[N + c])) return null;
    }

    // Hide a cell. Easier papers hide the bottom-right corner (both rules
    // read forwards); harder papers hide one in the middle, which forces the
    // child to work backwards.
    const hidden = difficulty >= 3 ? int(rng, 0, N * N - 1) : N * N - 1;
    const correct = cells[hidden];
    const hr = Math.floor(hidden / N);
    const hc = hidden % N;

    // Distractors: the cell that satisfies only the row rule, only the
    // column rule, or is off by one step in either direction.
    const pool = [
      applyRules(base, rowRules, hc),
      applyRules(base, colRules, hr),
      applyRules(applyRules(base, rowRules, (hc + 1) % N), colRules, hr),
      applyRules(applyRules(base, rowRules, hc), colRules, (hr + 1) % N),
      applyRules(applyRules(base, rowRules, (hc + 2) % N), colRules, hr),
      applyRules(applyRules(base, rowRules, hc), colRules, (hr + 2) % N),
      applyRules(applyRules(base, rowRules, hc + 1), colRules, hr + 1),
    ];
    const distractors = chooseDistractors(rng, correct, pool, DISTRACTOR_COUNT);
    if (!distractors) return null;

    const idx = int(rng, 0, DISTRACTOR_COUNT);
    const opts = distractors.slice();
    opts.splice(idx, 0, correct);

    const display = cells.slice();
    display[hidden] = null;

    return {
      type: 'mat',
      prompt: 'Which image correctly completes this grid?',
      stimulus: matrix(display, N === 2 ? 92 : 78, N),
      optionsHTML: figureOptions(opts),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          `Reading across each row, ${describeRules(rowRules)[0]}.`,
          `Reading down each column, ${describeRules(colRules)[0]}.`,
          'The missing piece has to obey both rules at the same time. Work out what it should be before you look at the options.',
        ],
      ),
      teachRef: 'mat',
    };
  });
}
