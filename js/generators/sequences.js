// ── Sequences ─────────────────────────────────────────────────────────────
// Four figures follow 1-3 rules. Three are shown; the child picks the fourth.

import { fig, ALL_SHAPES, ROT_SAFE, SHAPES } from '../core/figure.js';
import { pick, int } from '../core/rng.js';
import { chooseRules, applyRules, nearMissPool, describeRules } from '../core/rules.js';
import { row, figureOptions, LETTERS } from '../core/render.js';
import { chooseDistractors, attempt, explain, joinRules } from './_util.js';

const RULE_MENU = ['shade', 'rot', 'scale', 'sides', 'dots', 'pattern', 'stroke'];

export const meta = {
  id: 'seq',
  name: 'Sequences',
  blurb: 'Work out what is changing, then say what comes next.',
};

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    // Harder papers stack more rules at once.
    const nRules = difficulty <= 1 ? 1 : difficulty === 2 ? 2 : int(rng, 2, 3);

    // Rotation rules need a shape where every turn shows. If we might want
    // one, start from a rotation-safe shape.
    const wantRot = difficulty >= 2 && rng() < 0.5;
    const shape = wantRot ? pick(rng, ROT_SAFE) : pick(rng, ALL_SHAPES.filter((s) => s !== 'circle'));

    const base = fig(shape, {
      fill: 'white',
      rot: wantRot ? pick(rng, [0, 45, 90]) : 0,
      scale: 1,
      dots: int(rng, 0, 1),
    });

    const rules = chooseRules(rng, base, nRules, RULE_MENU);
    if (rules.length < nRules) return null;

    const steps = [0, 1, 2, 3].map((s) => applyRules(base, rules, s));

    // Reject a sequence where any rule has silently stopped changing
    // anything, e.g. a shade rule that hit the end of the scale, or a
    // scale rule that clamped. A visible sequence must actually progress.
    for (let i = 1; i < 4; i++) {
      if (JSON.stringify(steps[i]) === JSON.stringify(steps[i - 1])) return null;
    }
    // Guard scale staying in a sensible printable range.
    if (steps.some((s) => s.scale < 0.45 || s.scale > 1.45)) return null;

    const correct = steps[3];
    const pool = nearMissPool(base, rules, 3);
    const distractors = chooseDistractors(rng, correct, pool, 3);
    if (!distractors) return null;

    const idx = int(rng, 0, 3);
    const opts = distractors.slice();
    opts.splice(idx, 0, correct);

    return {
      type: 'seq',
      prompt: 'Which shape comes next in the sequence?',
      stimulus: row(steps.slice(0, 3), { missing: true }),
      optionsHTML: figureOptions(opts),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          `There ${rules.length === 1 ? 'is one rule' : `are ${rules.length} rules`} running at the same time: ${joinRules(describeRules(rules))}.`,
          'Apply every rule one more time to the third shape to get the fourth.',
        ],
      ),
      teachRef: 'seq',
    };
  });
}
