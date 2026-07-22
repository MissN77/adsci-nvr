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
import { DISTRACTOR_COUNT } from '../core/format.js';

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

/**
 * Reflect in a mirror line at any angle.
 *
 * Reflecting in a line at angle p is R(2p) . M, so applying it to a figure
 * drawn as R(t) . M^m gives R(2p) . M . R(t) . M^m = R(2p - t) . M^(m+1).
 * The vertical and horizontal cases above are this with p = 90 and p = 0.
 *
 * Quest's own familiarisation booklet uses a DIAGONAL line of symmetry for
 * both of its reflection questions, so a trainer that only ever mirrors
 * left-right and top-bottom is practising the easy half of the topic.
 */
export function reflectInLine(f, angleDeg) {
  return { ...f, rot: norm(2 * angleDeg - f.rot), mirrored: !f.mirrored };
}

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    // 45 and 135 are the diagonals. Quest uses these, and children find them
    // markedly harder than the upright cases, so they carry real weight here.
    const AXES = difficulty === 1
      ? [{ id: 'v', angle: 90 }, { id: 'h', angle: 0 }]
      : [{ id: 'v', angle: 90 }, { id: 'h', angle: 0 },
        { id: 'd1', angle: 45 }, { id: 'd2', angle: 135 }];
    const axis = pick(rng, AXES);
    const shape = pick(rng, CHIRAL);

    // Vary size, inner dots and outline as well as angle and shading. With
    // only axis, shape, angle and shade there were just 240 different
    // reflection questions in the whole app, so a child practising daily
    // would have seen every one inside a month.
    const base = fig(shape, {
      fill: pick(rng, difficulty === 1 ? ['white', 'light'] : ['white', 'light', 'grey', 'dark']),
      rot: difficulty === 1 ? pick(rng, [0, 90, 180, 270]) : pick(rng, [0, 45, 90, 135, 180, 225, 270, 315]),
      scale: pick(rng, [0.85, 1, 1.15]),
      dots: difficulty === 1 ? 0 : int(rng, 0, 2),
      stroke: difficulty >= 3 ? pick(rng, ['thin', 'thick']) : 'thin',
    });

    const correct = reflectInLine(base, axis.angle);

    // Distractors are the four mistakes children actually make.
    const pool = [
      { ...base },                                     // forgot to flip at all
      ...AXES.filter((a) => a.angle !== axis.angle)    // flipped in the wrong line
        .map((a) => reflectInLine(base, a.angle)),
      { ...base, rot: norm(base.rot + 180) },          // turned instead of flipped
      { ...base, rot: norm(base.rot + 90) },
      { ...base, rot: norm(base.rot + 270) },
      { ...correct, rot: norm(correct.rot + 180) },    // flipped, then over-turned
      { ...correct, rot: norm(correct.rot + 90) },
    ];

    const distractors = chooseDistractors(rng, correct, pool, DISTRACTOR_COUNT);
    if (!distractors) return null;

    const idx = int(rng, 0, DISTRACTOR_COUNT);
    const opts = distractors.slice();
    opts.splice(idx, 0, correct);

    // The mirror is drawn as part of the figure's own box for the diagonals,
    // so the child sees the line lying across the shape as it does in the
    // real paper, rather than sitting between two separate tiles.
    const diagonal = axis.id === 'd1' || axis.id === 'd2';
    const stimulus = diagonal
      ? `<div class="stim-row">
          <div class="cell cell--mirror">
            ${figureSVG(base, 120)}
            <svg class="mirror-line" viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
              <line x1="${axis.id === 'd1' ? 6 : 114}" y1="114" x2="${axis.id === 'd1' ? 114 : 6}" y2="6"
                stroke="#F08080" stroke-width="2.5" stroke-dasharray="7 5"/>
            </svg>
          </div>
          <div class="cell cell--missing" aria-label="the reflection">?</div>
        </div>
        <p class="stim-note">The dashed line is the mirror.</p>`
      : `<div class="stim-row reflect reflect--${axis.id}">
          <div class="cell">${figureSVG(base, 110)}</div>
          <div class="mirror mirror--${axis.id}" aria-hidden="true"></div>
          <div class="cell cell--missing" aria-label="the reflection">?</div>
        </div>
        <p class="stim-note">The dashed line is the mirror.</p>`;

    return {
      type: 'ref',
      prompt: 'Which image shows the reflection of this shape across the line of symmetry?',
      stimulus,
      optionsHTML: figureOptions(opts),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          {
            v: 'This mirror is upright, so it swaps left and right. Anything sticking out to the right ends up sticking out to the left.',
            h: 'This mirror lies flat, so it swaps top and bottom. Anything sticking up ends up sticking down.',
            d1: 'This mirror runs corner to corner, so it swaps the top-right and the bottom-left. A corner that pointed up now points sideways.',
            d2: 'This mirror runs corner to corner, so it swaps the top-left and the bottom-right. A corner that pointed up now points sideways.',
          }[axis.id],
          'A reflection is not the same as a turn. If you can get the answer by rotating the shape on the page, it is the wrong answer.',
          'Check one feature at a time. Find a corner that sticks out, and follow just that corner through the mirror.',
        ],
      ),
      teachRef: 'ref',
    };
  });
}
