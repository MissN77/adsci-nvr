// ── Similarities (classification) ─────────────────────────────────────────
// Three figures belong together because they share a hidden property. The
// child picks the option that belongs with them.
//
// The old app treated this as "find the identical clone", which is a matching
// task, not reasoning. Here the examples deliberately differ from each other
// in every way EXCEPT the one property that matters, so the child has to
// isolate the rule rather than pattern-match a picture.

import { fig, ALL_SHAPES, FILL_SCALE, STROKES, BY_SIDES } from '../core/figure.js';
import { pick, int, shuffle } from '../core/rng.js';
import { sidesOf } from '../core/rules.js';
import { row, figureOptions, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';

export const meta = {
  id: 'sim',
  name: 'Similarities',
  blurb: 'Three shapes belong together. Find the one that joins them.',
};

// The properties a set can be built around. Each has a test and a wording.
const PROPS = {
  fill: {
    values: () => FILL_SCALE,
    test: (f, v) => f.fill === v,
    say: () => 'they are all shaded the same way',
  },
  dots: {
    values: () => [0, 1, 2, 3],
    test: (f, v) => f.dots === v,
    say: (v) => `they all have exactly ${v} dot${v === 1 ? '' : 's'} inside`,
  },
  sides: {
    values: () => [3, 4, 5, 6, 7, 8],
    test: (f, v) => sidesOf(f.shape) === v,
    say: (v) => `they all have ${v} sides`,
  },
  stroke: {
    values: () => STROKES,
    test: (f, v) => f.stroke === v,
    say: () => 'they all have the same kind of outline',
  },
  even: {
    values: () => [true],
    test: (f) => { const s = sidesOf(f.shape); return s != null && s % 2 === 0; },
    say: () => 'they all have an even number of sides',
  },
  odd: {
    values: () => [true],
    test: (f) => { const s = sidesOf(f.shape); return s != null && s % 2 === 1; },
    say: () => 'they all have an odd number of sides',
  },
};

const POLY = Object.values(BY_SIDES);

/** Which of the candidate properties hold for every figure in the set. */
function sharedProps(figs, candidates) {
  return candidates.filter(({ key, value }) => figs.every((f) => PROPS[key].test(f, value)));
}

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    const keys = difficulty === 1
      ? ['fill', 'dots', 'sides']
      : ['fill', 'dots', 'sides', 'stroke', 'even', 'odd'];
    const key = pick(rng, keys);
    const value = pick(rng, PROPS[key].values());

    const isShapeProp = key === 'sides' || key === 'even' || key === 'odd';

    // Build a figure that satisfies the property, randomising everything else.
    const make = (satisfy) => {
      let shape;
      if (isShapeProp) {
        const ok = POLY.filter((s) => PROPS[key].test({ shape: s }, value));
        const no = POLY.filter((s) => !PROPS[key].test({ shape: s }, value));
        shape = pick(rng, satisfy ? ok : no);
      } else {
        shape = pick(rng, POLY);
      }
      const f = fig(shape, {
        fill: pick(rng, FILL_SCALE),
        rot: 0,
        scale: pick(rng, [0.85, 1, 1.1]),
        dots: int(rng, 0, 3),
        stroke: pick(rng, STROKES),
      });
      if (isShapeProp) return f;
      if (satisfy) return { ...f, [key === 'sides' ? 'shape' : key]: value };
      // Force the property to FAIL.
      const others = PROPS[key].values().filter((v) => v !== value);
      return { ...f, [key]: pick(rng, others) };
    };

    const examples = [make(true), make(true), make(true)];
    const correct = make(true);
    const distractors = [make(false), make(false), make(false)];

    // ── Audit ────────────────────────────────────────────────────────────
    // Build the full candidate list, then find everything the three examples
    // share. Exactly one option may satisfy all of it.
    const candidates = [];
    for (const k of Object.keys(PROPS)) {
      for (const v of PROPS[k].values()) candidates.push({ key: k, value: v });
    }
    const shared = sharedProps(examples, candidates);
    if (shared.length === 0) return null;

    const satisfiesAll = (f) => shared.every(({ key: k, value: v }) => PROPS[k].test(f, v));
    if (!satisfiesAll(correct)) return null;
    if (distractors.some(satisfiesAll)) return null;

    // Every distractor must be visually distinct from the answer and from
    // each other, or a child could reasonably pick either.
    const all = [correct, ...distractors];
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        if (JSON.stringify(all[i]) === JSON.stringify(all[j])) return null;
      }
    }
    // And the answer must not simply be a copy of one of the examples.
    if (examples.some((e) => JSON.stringify(e) === JSON.stringify(correct))) return null;

    const idx = int(rng, 0, 3);
    const opts = distractors.slice();
    opts.splice(idx, 0, correct);

    // Describe the property the examples actually share, not just the one we
    // aimed for, the audit may have found a stricter shared rule.
    const reason = shared.find((s) => s.key === key) || shared[0];

    return {
      type: 'sim',
      prompt: 'These three shapes belong together. Which one belongs with them?',
      stimulus: row(examples, { size: 92 }),
      optionsHTML: figureOptions(opts),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          `The three shapes look different in lots of ways, but ${PROPS[reason.key].say(reason.value)}.`,
          'Ignore everything that changes between them. The rule is the one thing that stays the same.',
        ],
      ),
      teachRef: 'sim',
    };
  });
}
