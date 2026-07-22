// ── Rotation ──────────────────────────────────────────────────────────────
// Turn the shape by a given amount and pick the result.
//
// Chiral shapes are used throughout so that the mirror image can be offered
// as a distractor. Confusing a turn with a flip is the single most common
// mistake in this topic, and a question that cannot punish it is not
// teaching anything.

import { fig, CHIRAL, ROT_SAFE } from '../core/figure.js';
import { pick, int } from '../core/rng.js';
import { figureSVG, figureOptions, LETTERS } from '../core/render.js';
import { reflectVertical, reflectHorizontal } from './reflection.js';
import { chooseDistractors, attempt, explain } from './_util.js';

export const meta = {
  id: 'rot',
  name: 'Rotation',
  blurb: 'Turn the shape and work out how it lands.',
};

const norm = (d) => ((d % 360) + 360) % 360;

const TURNS = [
  { deg: 90, say: 'a quarter turn clockwise', short: 'quarter turn clockwise' },
  { deg: 180, say: 'a half turn', short: 'half turn' },
  { deg: 270, say: 'a quarter turn anticlockwise', short: 'quarter turn anticlockwise' },
];

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    // Chiral shapes let a reflection sit in the option list as a trap.
    const shape = pick(rng, difficulty === 1 ? CHIRAL : [...CHIRAL, ...ROT_SAFE]);
    const turn = pick(rng, difficulty === 1 ? TURNS.slice(0, 2) : TURNS);

    // Same reasoning as reflection: the original had only 252 distinct
    // rotation questions, which is not enough to practise against.
    const base = fig(shape, {
      fill: pick(rng, difficulty === 1 ? ['white', 'light'] : ['white', 'light', 'grey', 'dark']),
      rot: difficulty === 1 ? pick(rng, [0, 90]) : pick(rng, [0, 45, 90, 135, 180, 225, 270, 315]),
      scale: pick(rng, [0.85, 1, 1.15]),
      dots: difficulty === 1 ? 0 : int(rng, 0, 2),
      stroke: difficulty >= 3 ? pick(rng, ['thin', 'thick']) : 'thin',
    });

    const correct = { ...base, rot: norm(base.rot + turn.deg) };

    const pool = [
      { ...base },                                          // forgot to turn it
      { ...base, rot: norm(base.rot - turn.deg) },           // turned the wrong way
      { ...base, rot: norm(base.rot + turn.deg + 90) },      // over-turned
      { ...base, rot: norm(base.rot + turn.deg - 90) },      // under-turned
      reflectVertical(correct),                              // flipped instead of turned
      reflectHorizontal(base),
    ];

    const distractors = chooseDistractors(rng, correct, pool, 3);
    if (!distractors) return null;

    const idx = int(rng, 0, 3);
    const opts = distractors.slice();
    opts.splice(idx, 0, correct);

    return {
      type: 'rot',
      prompt: `Which option shows this shape after ${turn.say}?`,
      stimulus: `<div class="stim-row"><div class="cell">${figureSVG(base, 120)}</div>
        <div class="lead lead--turn">${turn.deg === 180 ? '↻ 180°' : turn.deg === 90 ? '↻ 90°' : '↺ 90°'}</div>
        <div class="cell cell--missing">?</div></div>`,
      optionsHTML: figureOptions(opts),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          `The shape makes ${turn.say}, so every part of it travels round the centre by the same amount.`,
          'Pick one corner that sticks out and follow only that corner round. Where it lands tells you the answer.',
          'Watch for the option that is a mirror image rather than a turn. It can look right at a glance, but a turn never flips a shape over.',
        ],
      ),
      teachRef: 'rot',
    };
  });
}
