// ── Transformation rules ──────────────────────────────────────────────────
//
// A Rule changes exactly ONE attribute of a Figure, as a function of a step
// index. Questions are built by composing 1-3 rules and evaluating them at
// steps 0,1,2,3.
//
// Every rule also knows how to produce NEAR MISSES: figures that get the rule
// slightly wrong. That is what makes a good distractor, a wrong answer a
// child could genuinely arrive at, rather than a random shape they can
// eliminate at a glance. Because distractors are derived from the rule, it is
// structurally impossible for a distractor to also be correct.

import { FILL_SCALE, FILL_PATTERNS, STROKES, BY_SIDES, ROT_SAFE, SHAPES } from './figure.js';
import { pick, int, shuffle } from './rng.js';

const clampIdx = (i, len) => Math.max(0, Math.min(len - 1, i));
const wrap = (i, len) => ((i % len) + len) % len;

// ── Rule factories ────────────────────────────────────────────────────────
// Each returns { attr, apply(fig, step), nearMisses(fig, step), describe() }

/** Fill steps along the light-to-dark scale. */
export function shadeRule(rng, startIdx, dir) {
  const d = dir || pick(rng, [1, -1]);
  return {
    attr: 'fill',
    apply: (f, step) => ({ ...f, fill: FILL_SCALE[clampIdx(startIdx + d * step, FILL_SCALE.length)] }),
    nearMisses: (f, step) => [
      { ...f, fill: FILL_SCALE[clampIdx(startIdx + d * (step - 1), FILL_SCALE.length)] },
      { ...f, fill: FILL_SCALE[clampIdx(startIdx - d * step, FILL_SCALE.length)] },
      { ...f, fill: FILL_SCALE[clampIdx(startIdx + d * (step + 1), FILL_SCALE.length)] },
    ],
    describe: () => (d > 0 ? 'the shading gets darker each step' : 'the shading gets lighter each step'),
  };
}

/** Rotation. Only ever built on shapes where every turn is visible. */
export function rotRule(rng, delta) {
  const d = delta || pick(rng, [45, 90, 90, 135, -45, -90, -90]);
  return {
    attr: 'rot',
    apply: (f, step) => ({ ...f, rot: wrap(f.rot + d * step, 360) }),
    nearMisses: (f, step) => [
      { ...f, rot: wrap(f.rot - d * step, 360) },
      { ...f, rot: wrap(f.rot + d * (step - 1), 360) },
      { ...f, rot: wrap(f.rot + d * (step + 1), 360) },
    ],
    describe: () => `it turns ${Math.abs(d)}° ${d > 0 ? 'clockwise' : 'anticlockwise'} each step`,
  };
}

/** Size. Steps are large enough to be unambiguous on a phone screen. */
export function scaleRule(rng, dir) {
  const d = (dir || pick(rng, [1, -1])) * 0.22;
  return {
    attr: 'scale',
    apply: (f, step) => ({ ...f, scale: +(f.scale + d * step).toFixed(3) }),
    nearMisses: (f, step) => [
      { ...f, scale: +(f.scale - d * step).toFixed(3) },
      { ...f, scale: +(f.scale + d * (step - 1)).toFixed(3) },
      { ...f, scale: +(f.scale + d * (step + 1)).toFixed(3) },
    ],
    describe: () => (d > 0 ? 'it gets bigger each step' : 'it gets smaller each step'),
  };
}

/** Number of sides on a regular polygon. */
export function sidesRule(rng, startSides, dir) {
  const d = dir || pick(rng, [1, -1]);
  const at = (step) => BY_SIDES[clampIdx(startSides + d * step - 3, 6) + 3];
  return {
    attr: 'shape',
    apply: (f, step) => ({ ...f, shape: at(step) }),
    nearMisses: (f, step) => [
      { ...f, shape: at(step - 1) },
      { ...f, shape: at(step + 1) },
      { ...f, shape: BY_SIDES[clampIdx(startSides - d * step - 3, 6) + 3] },
    ],
    describe: () => (d > 0 ? 'the shape gains a side each step' : 'the shape loses a side each step'),
  };
}

/** Number of dots inside the shape. */
export function dotsRule(rng, start, dir) {
  const d = dir || pick(rng, [1, -1]);
  const at = (step) => clampIdx(start + d * step, 5);
  return {
    attr: 'dots',
    apply: (f, step) => ({ ...f, dots: at(step) }),
    nearMisses: (f, step) => [
      { ...f, dots: at(step - 1) },
      { ...f, dots: at(step + 1) },
      { ...f, dots: clampIdx(start - d * step, 5) },
    ],
    describe: () => (d > 0 ? 'one more dot appears each step' : 'one dot disappears each step'),
  };
}

/** Cycles through hatch/dot patterns rather than a light-to-dark scale. */
export function patternRule(rng, startIdx) {
  const order = shuffle(rng, FILL_PATTERNS);
  return {
    attr: 'fill',
    apply: (f, step) => ({ ...f, fill: order[wrap(startIdx + step, order.length)] }),
    nearMisses: (f, step) => [
      { ...f, fill: order[wrap(startIdx + step + 1, order.length)] },
      { ...f, fill: order[wrap(startIdx + step - 1, order.length)] },
      { ...f, fill: order[wrap(startIdx + step + 2, order.length)] },
    ],
    describe: () => 'the pattern inside follows a repeating cycle',
  };
}

/** Line style of the outline. */
export function strokeRule(rng, startIdx) {
  return {
    attr: 'stroke',
    apply: (f, step) => ({ ...f, stroke: STROKES[wrap(startIdx + step, STROKES.length)] }),
    nearMisses: (f, step) => [
      { ...f, stroke: STROKES[wrap(startIdx + step + 1, STROKES.length)] },
      { ...f, stroke: STROKES[wrap(startIdx + step + 2, STROKES.length)] },
    ],
    describe: () => 'the outline style changes each step',
  };
}

// ── Composition ───────────────────────────────────────────────────────────

/** Apply every rule in turn to produce the figure at `step`. */
export function applyRules(base, rules, step) {
  return rules.reduce((f, r) => r.apply(f, step), base);
}

/**
 * Build a pool of near-miss figures for the correct answer at `step`.
 * Includes, for each rule: that rule got wrong while the others are right,
 * and (when there are 2+ rules) the "forgot one rule entirely" mistake,
 * which is the single most common real error.
 */
export function nearMissPool(base, rules, step) {
  const pool = [];
  rules.forEach((r, i) => {
    const others = rules.filter((_, j) => j !== i);
    const partial = others.reduce((f, o) => o.apply(f, step), base);
    // This rule applied wrongly, all others applied correctly.
    r.nearMisses(partial, step).forEach((m) => pool.push(m));
    // This rule not applied at all, all others applied correctly.
    if (rules.length > 1) pool.push(partial);
  });
  return pool;
}

/** Human-readable summary of the rules, for the explanation panel. */
export function describeRules(rules) {
  return rules.map((r) => r.describe());
}

// ── Safe rule selection ───────────────────────────────────────────────────

/**
 * Choose `n` rules that act on DIFFERENT attributes, and that are all valid
 * for the given base figure. This is the guard that stops the generator
 * producing questions like "which pentagon is turned 72 degrees?"
 */
export function chooseRules(rng, base, n, allowed) {
  const candidates = [];
  const has = (a) => candidates.some((r) => r.attr === a);
  const menu = shuffle(rng, allowed);

  for (const kind of menu) {
    if (candidates.length >= n) break;
    switch (kind) {
      case 'shade':
        if (has('fill')) break;
        candidates.push(shadeRule(rng, int(rng, 0, FILL_SCALE.length - 4)));
        break;
      case 'pattern':
        if (has('fill')) break;
        candidates.push(patternRule(rng, int(rng, 0, 3)));
        break;
      case 'rot':
        // Only meaningful when every turn of this shape is visible. Also
        // blocked once a side-count rule is in play, because that rule
        // swaps in regular polygons whose own symmetry would swallow the
        // turn.
        if (has('rot') || has('shape') || SHAPES[base.shape].sym !== 1) break;
        candidates.push(rotRule(rng));
        break;
      case 'scale':
        if (has('scale')) break;
        candidates.push(scaleRule(rng));
        break;
      case 'sides':
        // Changing side count only makes sense for regular polygons, and
        // cannot be combined with a rotation rule (the shape changes under
        // it, so "every turn is visible" may stop being true).
        if (has('shape') || has('rot') || !sidesOf(base.shape)) break;
        candidates.push(sidesRule(rng, sidesOf(base.shape)));
        break;
      case 'dots':
        if (has('dots')) break;
        candidates.push(dotsRule(rng, base.dots));
        break;
      case 'stroke':
        if (has('stroke')) break;
        candidates.push(strokeRule(rng, 0));
        break;
      default:
        break;
    }
  }
  return candidates;
}

export function sidesOf(shape) {
  const entry = Object.entries(BY_SIDES).find(([, s]) => s === shape);
  return entry ? +entry[0] : null;
}

/** A base figure guaranteed to work with rotation rules. */
export function rotSafeBase(rng, opts = {}) {
  return {
    shape: pick(rng, ROT_SAFE),
    fill: 'white',
    rot: 0,
    scale: 1,
    dots: 0,
    stroke: 'thin',
    mirrored: false,
    ...opts,
  };
}
