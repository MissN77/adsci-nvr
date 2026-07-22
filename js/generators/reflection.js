// ── Reflection ────────────────────────────────────────────────────────────
// A shape is reflected in a mirror line. Which option shows the reflection?
//
// This is the type the old app got most wrong, so the maths is done properly
// here rather than by juggling angles.
//
// The renderer applies transforms in the order: rotate(rot) then, if
// mirrored, scale(-1,1). Writing M for the left-right flip and R for
// rotation, a figure is drawn as R(t)·M^m.
//
//   Reflecting in a VERTICAL line means pre-multiplying by M:
//     M·R(t)     = R(-t)·M          so rot -> -rot, mirrored flips
//     M·R(t)·M   = R(-t)            same rule
//
//   Reflecting in a HORIZONTAL line means pre-multiplying by R(180)·M:
//     R(180)·M·R(t) = R(180-t)·M    so rot -> 180-rot, mirrored flips
//
// Only CHIRAL shapes are used. For a shape like an arrow or a triangle, the
// mirror image is just a rotation of the original, so several options would
// be equally correct and the question has no answer. That was the bug behind
// the old app's reflection questions self-correcting mid-explanation.

import { fig, CHIRAL, sameFigure } from '../core/figure.js';
import { pick, int } from '../core/rng.js';
import { figureSVG, figureOptions, LETTERS } from '../core/render.js';
import { chooseDistractors, attempt, explain } from './_util.js';

export const meta = {
  id: 'ref',
  name: 'Reflection',
  blurb: 'Flip the shape over the mirror line and pick the match.',
};

const norm = (d) => ((d % 360) + 360) % 360;

/** Reflect a figure in a vertical mirror line (a left-right flip). */
export function reflectVertical(f) {
  return { ...f, rot: norm(-f.rot), mirrored: !f.mirrored };
}

/** Reflect a figure in a horizontal mirror line (a top-bottom flip). */
export function reflectHorizontal(f) {
  return { ...f, rot: norm(180 - f.rot), mirrored: !f.mirrored };
}

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    const axis = pick(rng, ['v', 'h']);
    const shape = pick(rng, CHIRAL);

    const base = fig(shape, {
      fill: pick(rng, difficulty === 1 ? ['white'] : ['white', 'light', 'grey']),
      rot: difficulty === 1 ? 0 : pick(rng, [0, 45, 90, 135, 180, 225, 270, 315]),
      scale: 1,
      dots: 0,
    });

    const correct = axis === 'v' ? reflectVertical(base) : reflectHorizontal(base);

    // Distractors are the four mistakes children actually make.
    const pool = [
      { ...base },                                    // forgot to flip at all
      axis === 'v' ? reflectHorizontal(base) : reflectVertical(base), // flipped the wrong way
      { ...base, rot: norm(base.rot + 180) },         // turned it instead of flipping it
      { ...base, rot: norm(base.rot + 90) },          // quarter turn instead of a flip
      { ...correct, rot: norm(correct.rot + 180) },   // flipped, then over-turned
    ];

    const distractors = chooseDistractors(rng, correct, pool, 3);
    if (!distractors) return null;

    const idx = int(rng, 0, 3);
    const opts = distractors.slice();
    opts.splice(idx, 0, correct);

    const mirrorLine = axis === 'v'
      ? '<div class="mirror mirror--v" aria-hidden="true"></div>'
      : '<div class="mirror mirror--h" aria-hidden="true"></div>';

    const stimulus = `<div class="stim-row reflect reflect--${axis}">
        <div class="cell">${figureSVG(base, 110)}</div>
        ${mirrorLine}
        <div class="cell cell--missing" aria-label="the reflection">?</div>
      </div>
      <p class="stim-note">The dashed line is the mirror.</p>`;

    return {
      type: 'ref',
      prompt: axis === 'v'
        ? 'Which option shows the shape reflected in the vertical mirror line?'
        : 'Which option shows the shape reflected in the horizontal mirror line?',
      stimulus,
      optionsHTML: figureOptions(opts),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          axis === 'v'
            ? 'A vertical mirror swaps left and right. Anything sticking out to the right ends up sticking out to the left.'
            : 'A horizontal mirror swaps top and bottom. Anything sticking up ends up sticking down.',
          'A reflection is not the same as a turn. If you can get the answer by rotating the shape on the page, it is the wrong answer.',
          'Check one feature at a time. Find a corner that sticks out, and follow just that corner through the mirror.',
        ],
      ),
      teachRef: 'ref',
    };
  });
}
