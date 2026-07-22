// ── Complete the Shape ────────────────────────────────────────────────────
// A ring pattern is built from concentric bands divided into equal wedges.
// One wedge is missing and the child chooses the piece that belongs there.
//
// Quest question 12, worded "Which image correctly completes this shape?".
// It is the last of their non-verbal types the app did not cover.
//
// The pattern always repeats every few wedges. That is what makes the answer
// findable: the missing wedge must match the one a whole number of repeats
// away from it. Because the answer is read straight off the pattern, and
// every option is compared on what it actually contains, a wrong option
// cannot also be right.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'radial',
  name: 'Complete the Shape',
  blurb: 'A ring pattern has a piece missing. Work out which piece fits.',
  group: 'quest',
};

const PALETTE = ['#FFFFFF', '#DCE3E8', '#9AA7B2', '#556A78', '#1A3A4A'];

// ── Geometry ──────────────────────────────────────────────────────────────

const SIZE = 150;

function cellPath(rIn, rOut, a0, a1) {
  const x = (r, a) => (r * Math.cos(a)).toFixed(2);
  const y = (r, a) => (r * Math.sin(a)).toFixed(2);
  if (rIn <= 0.001) {
    return `M 0 0 L ${x(rOut, a0)} ${y(rOut, a0)} `
      + `A ${rOut} ${rOut} 0 0 1 ${x(rOut, a1)} ${y(rOut, a1)} Z`;
  }
  return `M ${x(rIn, a0)} ${y(rIn, a0)} L ${x(rOut, a0)} ${y(rOut, a0)} `
    + `A ${rOut} ${rOut} 0 0 1 ${x(rOut, a1)} ${y(rOut, a1)} `
    + `L ${x(rIn, a1)} ${y(rIn, a1)} `
    + `A ${rIn} ${rIn} 0 0 0 ${x(rIn, a0)} ${y(rIn, a0)} Z`;
}

/** Corner points of one wedge, used to crop an option tightly. */
function wedgeBounds(radii, a0, a1) {
  const pts = [];
  const rIn = radii[0];
  const rOut = radii[radii.length - 1];
  for (let t = 0; t <= 1; t += 0.05) {
    const a = a0 + (a1 - a0) * t;
    pts.push([rOut * Math.cos(a), rOut * Math.sin(a)]);
    pts.push([Math.max(rIn, 0.001) * Math.cos(a), Math.max(rIn, 0.001) * Math.sin(a)]);
  }
  if (rIn <= 0.001) pts.push([0, 0]);
  return {
    minX: Math.min(...pts.map((p) => p[0])),
    maxX: Math.max(...pts.map((p) => p[0])),
    minY: Math.min(...pts.map((p) => p[1])),
    maxY: Math.max(...pts.map((p) => p[1])),
  };
}

/** The whole ring figure, optionally with one wedge left out. */
function figureSVG(grid, radii, sectors, missing) {
  const step = (Math.PI * 2) / sectors;
  const parts = [];
  for (let s = 0; s < sectors; s++) {
    if (s === missing) continue;
    const a0 = -Math.PI / 2 + s * step;
    const a1 = a0 + step;
    for (let r = 0; r < radii.length - 1; r++) {
      parts.push(`<path d="${cellPath(radii[r], radii[r + 1], a0, a1)}" fill="${PALETTE[grid[s][r]]}" stroke="#1A3A4A" stroke-width="1.8" stroke-linejoin="round"/>`);
    }
  }
  if (missing !== null) {
    // The gap is outlined so it reads as a hole rather than as nothing.
    const a0 = -Math.PI / 2 + missing * step;
    const a1 = a0 + step;
    parts.push(`<path d="${cellPath(radii[0], radii[radii.length - 1], a0, a1)}" fill="#F5CE6A" stroke="#1A3A4A" stroke-width="1.8" stroke-dasharray="5 4"/>`);
  }
  const r = radii[radii.length - 1] + 4;
  return `<svg viewBox="${-r} ${-r} ${r * 2} ${r * 2}" width="${SIZE}" height="${SIZE}" class="radial">${parts.join('')}</svg>`;
}

/** A single wedge on its own, cropped to itself. */
function wedgeSVG(column, radii, sectors, at, size = 74) {
  const step = (Math.PI * 2) / sectors;
  const a0 = -Math.PI / 2 + at * step;
  const a1 = a0 + step;
  const parts = [];
  for (let r = 0; r < radii.length - 1; r++) {
    parts.push(`<path d="${cellPath(radii[r], radii[r + 1], a0, a1)}" fill="${PALETTE[column[r]]}" stroke="#1A3A4A" stroke-width="1.8" stroke-linejoin="round"/>`);
  }
  const b = wedgeBounds(radii, a0, a1);
  const pad = 4;
  const w = b.maxX - b.minX + pad * 2;
  const h = b.maxY - b.minY + pad * 2;
  const span = Math.max(w, h);
  const cx = (b.minX + b.maxX) / 2;
  const cy = (b.minY + b.maxY) / 2;
  return `<svg viewBox="${cx - span / 2} ${cy - span / 2} ${span} ${span}" width="${size}" height="${size}" class="radial-piece">${parts.join('')}</svg>`;
}

const columnKey = (c) => c.join('-');

// ── Generator ─────────────────────────────────────────────────────────────

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    const sectors = pick(rng, difficulty === 1 ? [6, 8] : [6, 8, 8]);
    const rings = difficulty === 1 ? 2 : int(rng, 2, 3);

    // The pattern repeats every `period` wedges, and the whole ring must show
    // at least two full repeats or there is nothing to infer the rule from.
    const periods = [2, 3, 4].filter((m) => sectors % m === 0 && sectors / m >= 2);
    if (!periods.length) return null;
    const period = pick(rng, periods);

    // Build one repeat, then tile it.
    const unit = [];
    for (let s = 0; s < period; s++) {
      const col = [];
      for (let r = 0; r < rings; r++) col.push(int(rng, 0, PALETTE.length - 1));
      unit.push(col);
    }

    // A repeat whose wedges are all the same makes a plain ring with no
    // pattern to read, and neighbouring shades must be far enough apart to
    // tell apart on a phone.
    const distinctInUnit = new Set(unit.map(columnKey));
    if (distinctInUnit.size < Math.min(period, 2)) return null;
    for (let s = 0; s < period; s++) {
      const next = unit[(s + 1) % period];
      const same = unit[s].every((v, r) => Math.abs(v - next[r]) < 1);
      if (same && period > 1) return null;
      for (let r = 0; r + 1 < rings; r++) {
        if (Math.abs(unit[s][r] - unit[s][r + 1]) < 1) return null;
      }
    }

    const grid = [...Array(sectors).keys()].map((s) => unit[s % period].slice());

    const radii = rings === 2 ? [16, 40, 62] : [12, 30, 47, 63];
    const missing = int(rng, 0, sectors - 1);
    const correct = grid[missing];

    // Wrong pieces: wedges from elsewhere in the pattern, and near misses
    // with one band changed. Both are what a child actually picks.
    const pool = [];
    for (let s = 0; s < sectors; s++) if (s % period !== missing % period) pool.push(grid[s].slice());
    for (let r = 0; r < rings; r++) {
      for (const d of [1, -1, 2]) {
        const v = correct[r] + d;
        if (v < 0 || v >= PALETTE.length) continue;
        const alt = correct.slice();
        alt[r] = v;
        pool.push(alt);
      }
    }
    pool.push(correct.slice().reverse());

    const seen = new Set([columnKey(correct)]);
    const picked = [];
    for (const cand of shuffle(rng, pool)) {
      if (picked.length >= DISTRACTOR_COUNT) break;
      const k = columnKey(cand);
      if (seen.has(k)) continue;
      seen.add(k);
      picked.push(cand);
    }
    if (picked.length < DISTRACTOR_COUNT) return null;

    const idx = int(rng, 0, DISTRACTOR_COUNT);
    const opts = picked.slice();
    opts.splice(idx, 0, correct);

    return {
      type: 'radial',
      prompt: 'Which image correctly completes this shape?',
      stimulus: `<div class="stim-row">${figureSVG(grid, radii, sectors, missing)}</div>`,
      optionsHTML: options(opts.map((c) => wedgeSVG(c, radii, sectors, missing))),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          `The pattern repeats every ${period} pieces as you go round the ring.`,
          `So count ${period} places round from the gap, in either direction, and the piece you land on is the one that belongs in it.`,
          'Check every band of the piece, from the middle outwards. The wrong answers usually get all but one band right.',
        ],
      ),
      teachRef: 'radial',
    };
  });
}
