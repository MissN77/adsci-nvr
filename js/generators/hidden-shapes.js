// ── Hidden Shapes ─────────────────────────────────────────────────────────
// A complex figure is built by overlapping several outlines. The child works
// out which simple shape is in there, or which one is not.
//
// The old app drew the "hidden" shape concentrically in the middle of the
// others, so nothing was actually hidden and the question tested eyesight
// rather than reasoning. Here the component shapes are genuinely overlapped
// and offset, and the figure is drawn as outlines only, which is how these
// appear in a real paper.
//
// Fairness rule: every option is a different KIND of outline (different side
// count, or curved rather than straight). That is what keeps the answer
// single. If two options were both six-sided, a child could reasonably trace
// either one through the crossing lines and both would be defensible.

import { fig, SHAPES, figureMarkup } from '../core/figure.js';
import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS, figureSVG } from '../core/render.js';
import { sidesOf } from '../core/rules.js';
import { attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'hid',
  name: 'Hidden Shapes',
  blurb: 'Find the simple shape buried inside a tangle of lines.',
  group: 'general',
};

// Shapes that stay readable when overlapped. Each entry has a distinct
// silhouette so no two can be confused for one another.
const PARTS = ['tri', 'sq', 'pent', 'hex', 'circle', 'star5', 'cross', 'diamond'];

/** A stable descriptor used to guarantee options are all different kinds. */
function kindOf(shape) {
  if (shape === 'circle' || shape === 'oval') return 'curved';
  if (shape === 'star5') return 'star';
  if (shape === 'cross') return 'cross';
  return `sides-${sidesOf(shape) ?? SHAPES[shape].label}`;
}

const SIZE = 190;

/** Draw several outlines overlapping inside one box. */
function buildFigure(rng, shapes) {
  // Offsets are spread around the centre so the shapes genuinely cross each
  // other rather than nesting neatly one inside the next.
  const spread = SIZE * 0.13;
  const angles = shuffle(rng, [0, 90, 180, 270, 45, 225]);
  const markup = shapes.map((s, i) => {
    const a = (angles[i] * Math.PI) / 180;
    const cx = SIZE / 2 + Math.cos(a) * spread * (i === 0 ? 0.4 : 1);
    const cy = SIZE / 2 + Math.sin(a) * spread * (i === 0 ? 0.4 : 1);
    const f = fig(s, { fill: 'white', rot: pick(rng, [0, 15, 30, 45]), scale: 1, stroke: 'thin' });
    // Outline only: a filled shape would hide whatever sits beneath it.
    return figureMarkup({ ...f, fill: 'none' }, cx, cy, SIZE * 0.3);
  }).join('');
  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" class="fig fig--big">${markup}</svg>`;
}

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    const askNotUsed = rng() < 0.5;
    const nParts = askNotUsed ? DISTRACTOR_COUNT : (difficulty === 1 ? 2 : 3);

    const chosen = shuffle(rng, PARTS);
    const used = chosen.slice(0, nParts);
    const spare = chosen.slice(nParts);

    // All options must be different kinds, so only one can be traced.
    const usedKinds = new Set(used.map(kindOf));
    const absent = spare.filter((s) => !usedKinds.has(kindOf(s)));
    if (absent.length < DISTRACTOR_COUNT) return null;

    const figure = buildFigure(rng, used);

    let correct; let optShapes; let prompt; let points;

    if (askNotUsed) {
      // Three of the options ARE in the figure, one is not.
      // Every other option must genuinely be in the figure, so this variant
      // needs as many component shapes as there are wrong options.
      if (used.length < DISTRACTOR_COUNT) return null;
      correct = absent[0];
      optShapes = [...used.slice(0, DISTRACTOR_COUNT)];
      const idx = int(rng, 0, DISTRACTOR_COUNT);
      optShapes.splice(idx, 0, correct);
      prompt = 'Which one of these shapes was NOT used to build the figure?';
      points = [
        'Take each option in turn and try to trace its whole outline in the figure, going all the way round without lifting your finger.',
        'Three of them can be traced completely. The answer is the one where the line runs out.',
        'Overlapping shapes cut each other into pieces, so look for the full outline rather than a piece that happens to look right.',
      ];
      return finish(optShapes, idx, prompt, points);
    }

    // Exactly one option IS in the figure.
    correct = pick(rng, used);
    const wrong = shuffle(rng, absent).slice(0, DISTRACTOR_COUNT);
    if (wrong.length < DISTRACTOR_COUNT) return null;
    if (wrong.some((w) => kindOf(w) === kindOf(correct))) return null;
    optShapes = wrong.slice();
    const idx = int(rng, 0, DISTRACTOR_COUNT);
    optShapes.splice(idx, 0, correct);
    prompt = 'Which one of these shapes is hidden inside the figure?';
    points = [
      'Trace each option round the figure with your finger and see whether you can complete it without leaving the drawn lines.',
      'Only one of them goes all the way round. The others share a few lines with the figure but never close up.',
      'Ignore the extra lines crossing through. They belong to the other shapes, not to the one you are tracing.',
    ];
    return finish(optShapes, idx, prompt, points);

    function finish(shapesList, answerIdx, promptText, explainPoints) {
      // Options are drawn small, plain and upright so the child compares the
      // shape itself rather than its size or angle.
      const optionHTML = shapesList.map((s) => figureSVG(fig(s, { fill: 'white', rot: 0, scale: 1 }), 74));
      return {
        type: 'hid',
        prompt: promptText,
        stimulus: `<div class="stim-row">${figure}</div>`,
        optionsHTML: options(optionHTML),
        answer: answerIdx,
        explain: explain(`The answer is <strong>${LETTERS[answerIdx]}</strong>.`, explainPoints),
        teachRef: 'hid',
      };
    }
  });
}
