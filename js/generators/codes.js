// ── Codes ─────────────────────────────────────────────────────────────────
// Each figure carries a two-letter code. The first letter stands for one
// feature, the second for another. Work out the system, then code a new shape.
//
// The guard that matters: every letter needed for the answer must be
// deducible from the examples shown. A code question where the child has to
// guess a letter they have never seen is unanswerable, and the old app's
// text-based version had exactly that problem.

import { fig, FILL_SCALE, BY_SIDES } from '../core/figure.js';
import { pick, int, shuffle } from '../core/rng.js';
import { textOptions, figureSVG, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'cod',
  name: 'Codes',
  blurb: 'Crack the letter code, then write the code for a new shape.',
  group: 'general',
};

const POLY = Object.values(BY_SIDES);

// Letters are drawn from disjoint pools so the two positions can never be
// confused with each other.
const POOL_1 = ['P', 'Q', 'R', 'S'];
const POOL_2 = ['X', 'Y', 'Z', 'W'];

const DIMENSIONS = {
  shape: { label: 'the shape', values: (rng) => shuffle(rng, POLY).slice(0, 3), of: (f) => f.shape },
  fill: { label: 'the shading', values: (rng) => shuffle(rng, FILL_SCALE).slice(0, 3), of: (f) => f.fill },
  dots: { label: 'the number of dots inside', values: () => [0, 1, 2], of: (f) => f.dots },
  scale: { label: 'the size', values: () => [0.7, 1, 1.25], of: (f) => f.scale },
};

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    const keys = shuffle(rng, Object.keys(DIMENSIONS)).slice(0, 2);
    const [k1, k2] = keys;
    const d1 = DIMENSIONS[k1];
    const d2 = DIMENSIONS[k2];

    // Three values per dimension at every level. Two values only yields
    // three possible wrong codes, which is not enough now that a question
    // needs four distractors. Difficulty is carried by how many worked
    // examples the child is shown instead.
    const n = 3;
    const v1 = d1.values(rng).slice(0, n);
    const v2 = d2.values(rng).slice(0, n);
    const letters1 = shuffle(rng, POOL_1).slice(0, n);
    const letters2 = shuffle(rng, POOL_2).slice(0, n);

    const map1 = new Map(v1.map((v, i) => [v, letters1[i]]));
    const map2 = new Map(v2.map((v, i) => [v, letters2[i]]));

    const build = (a, b) => {
      const f = fig('sq', { fill: 'white', scale: 1, dots: 0 });
      const g = { ...f, [k1 === 'shape' ? 'shape' : k1]: a };
      return { ...g, [k2 === 'shape' ? 'shape' : k2]: b };
    };
    const codeOf = (a, b) => `${map1.get(a)}${map2.get(b)}`;

    // Choose the target first, then choose examples that between them reveal
    // both of the target's letters.
    const ta = pick(rng, v1);
    const tb = pick(rng, v2);

    const allPairs = [];
    for (const a of v1) for (const b of v2) if (!(a === ta && b === tb)) allPairs.push([a, b]);

    const exCount = difficulty === 1 ? 6 : difficulty === 2 ? 5 : 4;
    const chosen = shuffle(rng, allPairs).slice(0, exCount);
    if (chosen.length < exCount) return null;

    // The deducibility guard.
    if (!chosen.some(([a]) => a === ta)) return null;
    if (!chosen.some(([, b]) => b === tb)) return null;

    // Every letter must also be pinned down unambiguously: a letter that
    // only ever appears alongside one partner cannot be attributed to a
    // dimension with confidence. Require each shown value of dimension 1 to
    // appear with at least two different values of dimension 2, or vice
    // versa, for the two values that matter.
    const partnersOfTa = new Set(chosen.filter(([a]) => a === ta).map(([, b]) => b));
    const holdersOfTb = new Set(chosen.filter(([, b]) => b === tb).map(([a]) => a));
    // With only two values per dimension there are just three example pairs
    // available, so the evidence bar has to be lower or nothing generates.
    if (partnersOfTa.size + holdersOfTb.size < 3) return null;

    const examples = chosen.map(([a, b]) => ({ figure: build(a, b), code: codeOf(a, b) }));
    const target = build(ta, tb);
    const correct = codeOf(ta, tb);

    // Distractors: right letters in the wrong order, and one letter wrong.
    const wrong1 = shuffle(rng, letters1.filter((l) => l !== map1.get(ta)));
    const wrong2 = shuffle(rng, letters2.filter((l) => l !== map2.get(tb)));
    const pool = [
      `${map1.get(ta)}${wrong2[0]}`,
      `${wrong1[0]}${map2.get(tb)}`,
      `${wrong1[0]}${wrong2[0]}`,
      wrong1[1] ? `${wrong1[1]}${map2.get(tb)}` : null,
      wrong2[1] ? `${map1.get(ta)}${wrong2[1]}` : null,
    ].filter(Boolean);

    const distractors = [];
    for (const p of shuffle(rng, pool)) {
      if (distractors.length >= DISTRACTOR_COUNT) break;
      if (p === correct || distractors.includes(p)) continue;
      distractors.push(p);
    }
    if (distractors.length < DISTRACTOR_COUNT) return null;

    const idx = int(rng, 0, DISTRACTOR_COUNT);
    const opts = distractors.slice();
    opts.splice(idx, 0, correct);

    const exHTML = `<div class="stim-row code-row">${examples
      .map((e) => `<div class="code-item">${figureBox(e.figure)}<span class="code-tag">${e.code}</span></div>`)
      .join('')}</div>
      <div class="stim-row code-target"><div class="code-item">${figureBox(target)}<span class="code-tag code-tag--q">?</span></div></div>`;

    return {
      type: 'cod',
      prompt: 'Work out the code, then choose the code for the last shape.',
      stimulus: exHTML,
      optionsHTML: textOptions(opts),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]} (${correct})</strong>.`,
        [
          `The first letter stands for ${d1.label}. The second letter stands for ${d2.label}.`,
          `Here, ${map1.get(ta)} is the first letter and ${map2.get(tb)} is the second, giving <strong>${correct}</strong>.`,
          'Write down what each letter means as you work it out. Do not try to hold it all in your head.',
        ],
      ),
      teachRef: 'cod',
    };
  });
}

function figureBox(f) {
  return `<div class="cell">${figureSVG(f, 84)}</div>`;
}
