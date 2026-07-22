// ── Odd One Out ───────────────────────────────────────────────────────────
// Four figures. Three obey a rule, one breaks it.
//
// Two things make this question type go wrong, and both are guarded here.
//
// 1. Lazy version: three IDENTICAL shapes plus one different. A child spots
//    it without reasoning. So the three "same" figures are deliberately made
//    to differ from each other, using two attributes split two-and-two. A
//    two-two split can never single out one figure, so it adds visual
//    variety without adding a second possible answer.
//
// 2. Ambiguous version: the intended answer is "the grey one", but that
//    figure also happens to be the only large one. Every generated set is
//    audited for this and thrown away if more than one attribute singles out
//    a figure.

import { fig, ALL_SHAPES, FILL_SCALE, STROKES, minVisibleRot, BY_SIDES, SHAPES, sameFigure } from '../core/figure.js';
import { pick, int, shuffle } from '../core/rng.js';
import { sidesOf } from '../core/rules.js';
import { figureOptions, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { OPTION_COUNT, DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'ooo',
  name: 'Odd One Out',
  blurb: 'Three shapes follow a rule. Find the one that breaks it.',
  group: 'general',
};

const POLY = Object.values(BY_SIDES);

/** The features a child could reasonably compare, as comparable values. */
function attrValues(f) {
  const step = minVisibleRot(f.shape);
  const rotKey = step === Infinity ? 0 : Math.round((((f.rot % step) + step) % step) * 100) / 100;
  return {
    shape: f.shape,
    sides: sidesOf(f.shape) ?? `~${f.shape}`,
    fill: f.fill,
    rot: rotKey,
    scale: f.scale,
    dots: f.dots,
    stroke: f.stroke,
  };
}

/** Every (attribute, index) where exactly one figure differs from the rest. */
function oddPairs(figs) {
  const pairs = [];
  for (const key of Object.keys(attrValues(figs[0]))) {
    const vals = figs.map((f) => attrValues(f)[key]);
    const counts = new Map();
    vals.forEach((v) => counts.set(v, (counts.get(v) || 0) + 1));
    if (counts.size !== 2) continue;
    const lone = [...counts.entries()].find(([, c]) => c === 1);
    const rest = [...counts.entries()].find(([, c]) => c === figs.length - 1);
    if (lone && rest) pairs.push({ key, index: vals.indexOf(lone[0]), value: lone[0], common: rest[0] });
  }
  return pairs;
}

// Derived from the paper format, never written out. This said "three" while
// the paper offers five options, so every child was told to compare against a
// number that did not match what was in front of them. A visual pass caught
// it; no correctness test could, because the answer itself was right.
const OTHERS = ['zero', 'one', 'two', 'three', 'four', 'five'][DISTRACTOR_COUNT];

const PHRASE = {
  shape: () => `The other ${OTHERS} are all the same shape as each other. This one is a different shape`,
  sides: (p) => `The other ${OTHERS} all have ${p.common} sides. This one has ${p.value}`,
  fill: () => `The other ${OTHERS} are shaded the same way. This one is shaded differently`,
  rot: () => `The other ${OTHERS} are turned the same way. This one is turned differently`,
  scale: () => `The other ${OTHERS} are the same size. This one is a different size`,
  dots: (p) => `The other ${OTHERS} have ${p.common} dot${p.common === 1 ? '' : 's'} inside. This one has ${p.value}`,
  stroke: () => `The other ${OTHERS} have the same kind of outline. This one is drawn differently`,
};

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    const useSidesRule = rng() < 0.3;
    const oddAttr = useSidesRule
      ? 'shape'
      : pick(rng, difficulty === 1
        ? ['fill', 'scale', 'shape']
        : ['fill', 'scale', 'dots', 'shape', 'stroke']);

    const baseShape = pick(rng, ALL_SHAPES.filter((s) => s !== 'circle' && s !== 'oval'));
    const common = {
      fill: pick(rng, FILL_SCALE),
      scale: 1,
      dots: 0,
      stroke: 'thin',
      rot: 0,
    };

    const shapeFor = () => (useSidesRule ? BY_SIDES[int(rng, 3, 7)] : baseShape);
    const carrier = shapeFor();
    const figs = Array.from({ length: OPTION_COUNT }, () => fig(carrier, common));
    const oddIdx = int(rng, 0, OPTION_COUNT - 1);

    // ── Apply the rule break ─────────────────────────────────────────────
    if (oddAttr === 'fill') {
      const other = pick(rng, FILL_SCALE.filter(
        (f) => Math.abs(FILL_SCALE.indexOf(f) - FILL_SCALE.indexOf(common.fill)) >= 2,
      ));
      if (!other) return null;
      figs[oddIdx] = fig(carrier, { ...common, fill: other });
    } else if (oddAttr === 'scale') {
      // A 1.2-vs-1.0 difference is not readable on a phone. Minimum 0.35.
      figs[oddIdx] = fig(carrier, { ...common, scale: 0.62 });
    } else if (oddAttr === 'dots') {
      common.dots = int(rng, 1, 2);
      figs.forEach((f, i) => { figs[i] = { ...f, dots: common.dots }; });
      figs[oddIdx] = fig(carrier, { ...common, dots: common.dots === 1 ? 3 : 0 });
    } else if (oddAttr === 'stroke') {
      figs[oddIdx] = fig(carrier, { ...common, stroke: pick(rng, STROKES.filter((s) => s !== 'thin')) });
    } else {
      const otherShape = useSidesRule
        ? pick(rng, POLY.filter((s) => s !== carrier))
        : pick(rng, POLY.filter((s) => s !== carrier));
      figs[oddIdx] = fig(otherShape, { ...common, dots: figs[0].dots });
    }

    // ── Decoy variety ────────────────────────────────────────────────────
    // With four figures this used two attributes split two-and-two, so no
    // value ever belonged to exactly one figure. Five figures cannot be split
    // evenly, and any 1-4 split would read as a second odd one out.
    //
    // So the decoy attribute takes FIVE DIFFERENT values instead. A feature
    // where every figure differs cannot single anyone out, and it guarantees
    // all five figures look different from each other.
    const spread = (() => {
      if (oddAttr !== 'dots') return { key: 'dots', vals: [0, 1, 2, 3, 4] };
      // Dots are carrying the rule, so spread something else.
      if (SHAPES[carrier].sym === 1) return { key: 'rot', vals: [0, 72, 144, 216, 288] };
      return { key: 'scale', vals: [0.7, 0.85, 1, 1.15, 1.3] };
    })();

    const order = shuffle(rng, spread.vals);
    figs.forEach((f, i) => { figs[i] = { ...f, [spread.key]: order[i] }; });

    // ── Audit ────────────────────────────────────────────────────────────
    // All four must be visually distinct.
    for (let i = 0; i < figs.length; i++) {
      for (let j = i + 1; j < figs.length; j++) if (sameFigure(figs[i], figs[j])) return null;
    }
    // Sizes must stay readable.
    if (figs.some((f) => f.scale < 0.55 || f.scale > 1.3)) return null;

    const pairs = oddPairs(figs);
    if (pairs.some((p) => p.index !== oddIdx)) return null;
    const onIntended = pairs.filter((p) => p.index === oddIdx);
    if (onIntended.length === 0) return null;

    // Changing shape necessarily changes both `shape` and `sides`, that is
    // one reason, not two. Anything else doubling up is a real ambiguity.
    const reasons = new Set(onIntended.map((p) => (p.key === 'sides' ? 'shape' : p.key)));
    if (reasons.size > 1) return null;

    const reason = onIntended.find((p) => p.key === oddAttr)
      || onIntended.find((p) => p.key === 'sides')
      || onIntended[0];

    return {
      type: 'ooo',
      prompt: 'Which one is the odd one out?',
      stimulus: '',
      noStimulus: true,
      optionsHTML: figureOptions(figs, 96),
      answer: oddIdx,
      explain: explain(
        `The answer is <strong>${LETTERS[oddIdx]}</strong>.`,
        [
          `${PHRASE[reason.key](reason)}.`,
          `The other features change too, but they change in pairs, so they cannot be the answer. Only one feature separates a single shape from the other ${OTHERS}.`,
        ],
      ),
      teachRef: 'ooo',
    };
  });
}
