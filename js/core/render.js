// ── Shared question-rendering helpers ─────────────────────────────────────
// Generators build their own stimulus markup from these, so there is no
// central switch statement that has to know about every question type.

import { figureMarkup, figureSVG } from './figure.js';

// Six, not five. The non-verbal paper stops at E, but the verbal paper's
// word-pair questions offer six options, A to F.
export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/** One boxed figure. */
export function box(f, size = 96, cls = '') {
  return `<div class="cell ${cls}">${figureSVG(f, size)}</div>`;
}

/** The empty box a child has to fill in. */
export function missingBox(size = 96) {
  return `<div class="cell cell--missing" style="width:${size}px;height:${size}px" aria-label="missing shape">?</div>`;
}

/** A horizontal run of figures, optionally ending in the missing box. */
export function row(figs, { missing = false, size = 96, arrow = false } = {}) {
  const parts = figs.map((f) => box(f, size));
  if (arrow) {
    for (let i = 1; i < parts.length; i += 2) parts.splice(i, 0, '<div class="lead">→</div>');
  }
  if (missing) parts.push(missingBox(size));
  return `<div class="stim-row">${parts.join('')}</div>`;
}

/** The "A is to B as C is to ?" layout. */
export function analogyRow(a, b, c, size = 92) {
  return `<div class="stim-row analogy">
    ${box(a, size)}<div class="lead">→</div>${box(b, size)}
    <div class="lead lead--sep">:</div>
    ${box(c, size)}<div class="lead">→</div>${missingBox(size)}
  </div>`;
}

/**
 * A run of figures with the gap somewhere other than the end.
 *
 * Quest's own sample sequence puts the missing cell fourth out of five, not
 * last. A child who has only ever seen the gap at the end learns to extend a
 * pattern forwards and never to work one backwards, which is a different and
 * harder skill.
 */
export function rowWithGap(figs, gapIndex, { size = 92 } = {}) {
  const parts = figs.map((f, i) => (i === gapIndex ? missingBox(size) : box(f, size)));
  return `<div class="stim-row">${parts.join('')}</div>`;
}

/** Square matrix, 2x2 or 3x3. `cells` is a flat array with one null. */
export function matrix(cells, size = 78, cols = 3) {
  const inner = cells
    .map((f) => (f ? box(f, size) : missingBox(size)))
    .join('');
  return `<div class="stim-grid" style="--cell:${size}px;--cols:${cols}">${inner}</div>`;
}

/** The lettered answer options. `items` are raw HTML strings. */
export function options(items) {
  return `<div class="opts">${items
    .map((html, i) => `
      <button class="opt" data-opt="${i}" type="button">
        <span class="opt-letter">${LETTERS[i]}</span>
        <span class="opt-body">${html}</span>
      </button>`)
    .join('')}</div>`;
}

/** Options that are single figures, the common case. */
export function figureOptions(figs, size = 88) {
  return options(figs.map((f) => figureSVG(f, size)));
}

/** Options that are short pieces of text (codes, answers in words). */
export function textOptions(strs) {
  return options(strs.map((s) => `<span class="opt-text">${s}</span>`));
}

/** Compose several figures into one SVG box, for hidden-shape questions. */
export function composite(markup, size = 200) {
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="fig fig--big" role="img" aria-label="a shape">${markup}</svg>`;
}

export { figureMarkup, figureSVG };
