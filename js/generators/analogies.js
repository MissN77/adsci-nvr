// ── Analogies ─────────────────────────────────────────────────────────────
// "A is to B as C is to ?", the same transformation, applied to a new shape.

import { fig, ALL_SHAPES, ROT_SAFE, SHAPES } from '../core/figure.js';
import { pick, int } from '../core/rng.js';
import { chooseRules, applyRules, nearMissPool, describeRules } from '../core/rules.js';
import { analogyRow, figureOptions, LETTERS } from '../core/render.js';
import { chooseDistractors, attempt, explain, joinRules } from './_util.js';

const RULE_MENU = ['shade', 'rot', 'scale', 'sides', 'dots', 'pattern', 'stroke'];

export const meta = {
  id: 'ana',
  name: 'Analogies',
  blurb: 'Spot how the first shape changes, then do the same to the third.',
};

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    const nRules = difficulty <= 1 ? 1 : difficulty === 2 ? 2 : int(rng, 2, 3);
    const wantRot = difficulty >= 2 && rng() < 0.5;

    const pool = wantRot ? ROT_SAFE : ALL_SHAPES.filter((s) => s !== 'circle');
    const shapeA = pick(rng, pool);
    // C must be a genuinely different starting shape from A, otherwise the
    // question collapses into "copy B".
    const shapeC = pick(rng, pool.filter((s) => s !== shapeA));

    const mk = (shape) => fig(shape, {
      fill: 'white',
      rot: wantRot ? pick(rng, [0, 45, 90]) : 0,
      scale: 1,
      dots: int(rng, 0, 1),
    });

    const a = mk(shapeA);
    const c = mk(shapeC);

    // Rules are chosen by inspecting A but then applied to C as well, so a
    // rule only valid for A would break on C. A rotation of an oval, for
    // instance, is invisible. Offer the rotation rule only when BOTH shapes
    // can show every turn.
    const bothRotSafe = SHAPES[shapeA].sym === 1 && SHAPES[shapeC].sym === 1;
    const menu = bothRotSafe ? RULE_MENU : RULE_MENU.filter((k) => k !== 'rot');

    const rules = chooseRules(rng, a, nRules, menu);
    if (rules.length < nRules) return null;

    // A "sides" rule rewrites the shape, which would erase the difference
    // between A and C. Skip those pairings.
    if (rules.some((r) => r.attr === 'shape')) {
      const b0 = applyRules(a, rules, 1);
      const d0 = applyRules(c, rules, 1);
      if (b0.shape === d0.shape) return null;
    }

    const b = applyRules(a, rules, 1);
    const correct = applyRules(c, rules, 1);

    if ([a, b, c, correct].some((f) => f.scale < 0.5 || f.scale > 1.4)) return null;
    // The transformation must actually do something visible.
    if (JSON.stringify(a) === JSON.stringify(b)) return null;
    if (JSON.stringify(c) === JSON.stringify(correct)) return null;

    const misses = nearMissPool(c, rules, 1);
    // The single most instructive wrong answer: copying B outright, i.e.
    // applying the rule to the wrong starting shape.
    misses.push({ ...b });
    const distractors = chooseDistractors(rng, correct, misses, 3);
    if (!distractors) return null;

    const idx = int(rng, 0, 3);
    const opts = distractors.slice();
    opts.splice(idx, 0, correct);

    return {
      type: 'ana',
      prompt: 'The first shape changes into the second. Change the third shape in the same way.',
      stimulus: analogyRow(a, b, c),
      optionsHTML: figureOptions(opts),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          `Going from the first shape to the second: ${joinRules(describeRules(rules))}.`,
          'Do exactly the same to the third shape. Do not copy the second shape, the starting shape is different, so the answer is different too.',
        ],
      ),
      teachRef: 'ana',
    };
  });
}
