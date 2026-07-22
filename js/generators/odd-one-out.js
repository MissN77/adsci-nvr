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
import { pick, int } from '../core/rng.js';
import { sidesOf } from '../core/rules.js';
import { figureOptions, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';

export const meta = {
  id: 'ooo',
  name: 'Odd One Out',
  blurb: 'Three shapes follow a rule. Find the one that breaks it.',
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

const PHRASE = {
  shape: () => 'the other three are all the same shape as each other',
  sides: (p) => `the other three all have ${p.common} sides, but this one has ${p.value}`,
  fill: () => 'the other three are shaded the same way, but this one is not',
  rot: () => 'the other three are turned the same way, but this one is not',
  scale: () => 'the other three are the same size, but this one is not',
  dots: (p) => `the other three have ${p.common} dot${p.common === 1 ? '' : 's'} inside, but this one has ${p.value}`,
  stroke: () => 'the other three have the same kind of outline, but this one does not',
};

/** Two rotations of this shape that are visibly different, or null. */
function rotPair(rng, shape) {
  const step = minVisibleRot(shape);
  // Below 90 degrees of symmetry step the two angles get too close to call.
  if (step === Infinity || step < 90) return null;
  return [0, Math.round(step / 2)];
}

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
    const figs = [0, 1, 2, 3].map(() => fig(carrier, common));
    const oddIdx = int(rng, 0, 3);

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

    // ── Decoy variety: two attributes, each split two-and-two ────────────
    // Orthogonal splits give all four figures a unique combination, so no two
    // are identical, while neither attribute can single anyone out.
    const decoyMenu = [];
    const rp = rotPair(rng, carrier);
    if (rp && oddAttr !== 'shape') decoyMenu.push({ key: 'rot', vals: rp });
    if (oddAttr !== 'scale') decoyMenu.push({ key: 'scale', vals: [1, 0.78] });
    if (oddAttr !== 'dots') decoyMenu.push({ key: 'dots', vals: [figs[0].dots, figs[0].dots + 2] });
    if (oddAttr !== 'stroke') decoyMenu.push({ key: 'stroke', vals: ['thin', 'thick'] });
    if (oddAttr !== 'fill') {
      const i = FILL_SCALE.indexOf(common.fill);
      const partner = FILL_SCALE[i >= 2 ? i - 2 : i + 2];
      if (partner) decoyMenu.push({ key: 'fill', vals: [common.fill, partner] });
    }
    if (decoyMenu.length < 2) return null;

    const [d1, d2] = (() => {
      const a = int(rng, 0, decoyMenu.length - 1);
      let b = int(rng, 0, decoyMenu.length - 1);
      if (b === a) b = (b + 1) % decoyMenu.length;
      return [decoyMenu[a], decoyMenu[b]];
    })();

    // Split one attribute [X,X,Y,Y] and the other [P,Q,P,Q].
    figs.forEach((f, i) => {
      figs[i] = {
        ...f,
        [d1.key]: d1.vals[i < 2 ? 0 : 1],
        [d2.key]: d2.vals[i % 2],
      };
    });

    // ── Audit ────────────────────────────────────────────────────────────
    // All four must be visually distinct.
    for (let i = 0; i < 4; i++) {
      for (let j = i + 1; j < 4; j++) if (sameFigure(figs[i], figs[j])) return null;
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
          'The other features change too, but they change in pairs, so they cannot be the answer. Only one feature separates a single shape from the other three.',
        ],
      ),
      teachRef: 'ooo',
    };
  });
}
