// ── Sequences ─────────────────────────────────────────────────────────────
// Four figures follow 1-3 rules. Three are shown; the child picks the fourth.

import { fig, ALL_SHAPES, ROT_SAFE, SHAPES } from '../core/figure.js';
import { pick, int } from '../core/rng.js';
import { chooseRules, applyRules, nearMissPool, describeRules } from '../core/rules.js';
import { rowWithGap, figureOptions, LETTERS } from '../core/render.js';
import { chooseDistractors, attempt, explain, joinRules } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

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

    // Quest shows five cells with the gap fourth, so the run is longer than
    // the old four and the gap is not always at the end.
    const length = difficulty === 1 ? 4 : 5;
    const steps = [...Array(length).keys()].map((s) => applyRules(base, rules, s));

    // Reject a sequence where any rule has silently stopped changing
    // anything, e.g. a shade rule that hit the end of the scale, or a
    // scale rule that clamped. A visible sequence must actually progress.
    for (let i = 1; i < length; i++) {
      if (JSON.stringify(steps[i]) === JSON.stringify(steps[i - 1])) return null;
    }
    // Guard scale staying in a sensible printable range.
    if (steps.some((s) => s.scale < 0.45 || s.scale > 1.45)) return null;

    // The first cell always shows, because it anchors the pattern. Anywhere
    // after that is fair game, and working backwards to a gap in the middle
    // is the harder skill.
    const gap = difficulty === 1 ? length - 1 : int(rng, 1, length - 1);
    const correct = steps[gap];
    const pool = nearMissPool(base, rules, gap);
    const distractors = chooseDistractors(rng, correct, pool, DISTRACTOR_COUNT);
    if (!distractors) return null;

    const idx = int(rng, 0, DISTRACTOR_COUNT);
    const opts = distractors.slice();
    opts.splice(idx, 0, correct);

    return {
      type: 'seq',
      prompt: gap === length - 1
        ? 'Which shape comes next in the sequence?'
        : 'Which image correctly completes this sequence?',
      stimulus: rowWithGap(steps, gap),
      optionsHTML: figureOptions(opts),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          `There ${rules.length === 1 ? 'is one rule' : `are ${rules.length} rules`} running at the same time: ${joinRules(describeRules(rules))}.`,
          gap === length - 1
            ? 'Apply every rule one more time to the shape before the gap.'
            : 'The gap is not at the end, so check it against the shape before it AND the shape after it. Both have to fit.',
        ],
      ),
      teachRef: 'seq',
    };
  });
}
