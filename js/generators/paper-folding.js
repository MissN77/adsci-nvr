// ── Paper Folding ─────────────────────────────────────────────────────────
// A square of paper is folded, then either holes are punched through every
// layer or pieces are cut off. The child works out what the sheet looks like
// opened out.
//
// Quest questions 13 to 16. Theirs use up to three folds, including diagonal
// ones, and question 16 cuts pieces off rather than punching holes. The first
// version of this could only fold in half left-right or top-bottom, which is
// the easy end of the topic, and had only about 1,200 puzzles in the type.
//
// Nothing here is hand-authored. The answer comes from js/core/paper.js,
// which mirrors punches back across each crease and, for cuts, finds the
// opened outline by clipping the square with every mirrored cut. That module
// is held to hand-computable facts in tools/paper-test.js: a fold halves the
// paper, a punch doubles per fold, and slicing one corner off a stack folded
// twice takes exactly four corners off the opened sheet.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';
import {
  line, clip, area, contains, edgeDistance, UNIT_SQUARE,
  unfoldHoles, unfoldCuts, holesKey, polyKey,
} from '../core/paper.js';

export const meta = {
  id: 'fold',
  name: 'Paper Folding',
  blurb: 'Fold, punch or cut, then work out what the paper looks like opened out.',
  group: 'quest',
};

// Each fold is a crease, which half stays put, and a phrase for the answer.
const FOLD_MENU = [
  { id: 'v', make: (k) => line(1, 0, 0.5, k), say: (k) => (k < 0 ? 'right over onto the left' : 'left over onto the right') },
  { id: 'h', make: (k) => line(0, 1, 0.5, k), say: (k) => (k < 0 ? 'bottom up onto the top' : 'top down onto the bottom') },
  { id: 'd1', make: (k) => line(1, -1, 0, k), say: () => 'corner to corner along the diagonal' },
  { id: 'd2', make: (k) => line(1, 1, 1, k), say: () => 'corner to corner along the other diagonal' },
];

// ── Drawing ───────────────────────────────────────────────────────────────

const pts = (poly, s) => poly.map(([x, y]) => `${(x * s).toFixed(1)},${(y * s).toFixed(1)}`).join(' ');

function sheet(poly, holes, { size = 88, crease = null } = {}) {
  const parts = [`<polygon points="${pts(poly, size)}" fill="#FFFFFF" stroke="#1A3A4A" stroke-width="2.5" stroke-linejoin="round"/>`];

  if (crease) {
    // Show the crease only where it actually crosses the paper.
    const a = clip(poly, { ...crease, keep: 1 });
    const b = clip(poly, { ...crease, keep: -1 });
    const shared = [];
    for (const p of a) {
      for (const q of b) {
        if (Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-6
          && !shared.some((s) => Math.hypot(s[0] - p[0], s[1] - p[1]) < 1e-6)) shared.push(p);
      }
    }
    if (shared.length >= 2) {
      const [p, q] = shared;
      parts.push(`<line x1="${(p[0] * size).toFixed(1)}" y1="${(p[1] * size).toFixed(1)}" x2="${(q[0] * size).toFixed(1)}" y2="${(q[1] * size).toFixed(1)}" stroke="#2A7B6F" stroke-width="2" stroke-dasharray="6 4"/>`);
    }
  }

  holes.forEach(([x, y]) => {
    parts.push(`<circle cx="${(x * size).toFixed(1)}" cy="${(y * size).toFixed(1)}" r="${(size * 0.062).toFixed(1)}" fill="#1A3A4A"/>`);
  });

  return `<svg viewBox="-3 -3 ${size + 6} ${size + 6}" width="${size + 6}" height="${size + 6}" class="paper">${parts.join('')}</svg>`;
}

// ── Generator ─────────────────────────────────────────────────────────────

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    const cutting = difficulty >= 2 && rng() < 0.35;
    const nFolds = difficulty === 1 ? 1 : difficulty === 2 ? int(rng, 1, 2) : int(rng, 2, 3);

    // Fold, keeping the remaining piece big enough to work on.
    const folds = [];
    const regions = [UNIT_SQUARE.map((p) => p.slice())];
    const usedIds = new Set();
    for (let i = 0; i < nFolds; i++) {
      const choices = shuffle(rng, FOLD_MENU.filter((f) => !usedIds.has(f.id)));
      let placed = false;
      for (const f of choices) {
        const keep = pick(rng, [-1, 1]);
        const L = f.make(keep);
        const next = clip(regions[regions.length - 1], L);
        if (next.length >= 3 && area(next) > 0.11) {
          folds.push({ ...f, L, keep });
          regions.push(next);
          usedIds.add(f.id);
          placed = true;
          break;
        }
      }
      if (!placed) return null;
    }

    const folded = regions[regions.length - 1];
    const lines = folds.map((f) => f.L);
    const story = folds.map((f) => f.say(f.keep)).join(', then ');

    let opts; let idx; let renderOption; let finalPanel; let prompt; let points;

    if (cutting) {
      // ── Pieces cut off the folded stack ─────────────────────────────────
      // Only slice corners that are corners of the ORIGINAL sheet. A corner
      // of the folded piece that sits on a crease is not really a corner:
      // cutting there takes a slab out of the middle when the paper opens,
      // which shrinks the whole sheet instead of notching it, and reads as
      // five plain squares of slightly different sizes.
      const realCorners = folded.filter((c) => UNIT_SQUARE.some(
        (o) => Math.hypot(c[0] - o[0], c[1] - o[1]) < 1e-6,
      ));
      if (!realCorners.length) return null;

      const nCuts = difficulty === 3 && realCorners.length > 1 && rng() < 0.4 ? 2 : 1;
      const cuts = [];
      for (const corner of shuffle(rng, realCorners).slice(0, nCuts)) {
        const away = [corner[0] - 0.5, corner[1] - 0.5];
        const len = Math.hypot(...away);
        if (len < 0.01) return null;
        const nx = away[0] / len;
        const ny = away[1] / len;
        // Deep enough to see clearly at option size.
        const depth = 0.13 + rng() * 0.1;
        cuts.push(line(nx, ny, nx * corner[0] + ny * corner[1] - depth, -1));
      }

      const opened = unfoldCuts(cuts, lines);
      // The opened sheet must be visibly cut, but still clearly a sheet.
      if (opened.length < 5 || area(opened) < 0.55 || area(opened) > 0.94) return null;

      let cutFolded = folded;
      for (const C of cuts) cutFolded = clip(cutFolded, C);
      if (cutFolded.length < 3) return null;

      const pool = [
        unfoldCuts(cuts, []),
        unfoldCuts(cuts, lines.slice(1)),
        unfoldCuts(cuts, lines.slice(0, -1)),
        unfoldCuts(cuts, [...lines, lines[0]]),
        unfoldCuts(cuts, lines.slice().reverse()),
        UNIT_SQUARE.map((p) => p.slice()),
      ];
      // Compare the DRAWN markup, not the coordinates. Two outlines can
      // differ in the fourth decimal place and still be the same picture once
      // rounded to screen pixels, which is all a child ever sees.
      const draw = (p2) => sheet(p2, [], { size: 84 });
      const seen = new Set([draw(opened)]);
      const picked = [];
      for (const cand of shuffle(rng, pool)) {
        if (picked.length >= DISTRACTOR_COUNT) break;
        if (cand.length < 3 || area(cand) < 0.2) continue;
        const k = draw(cand);
        if (seen.has(k)) continue;
        seen.add(k);
        picked.push(cand);
      }
      if (picked.length < DISTRACTOR_COUNT) return null;

      idx = int(rng, 0, DISTRACTOR_COUNT);
      opts = picked.slice();
      opts.splice(idx, 0, opened);
      renderOption = (p) => sheet(p, [], { size: 84 });
      finalPanel = { label: 'Cut', svg: sheet(cutFolded, [], { size: 68 }) };
      prompt = 'This piece of paper has been folded and then had pieces cut off it. What will it look like when unfolded?';
      points = [
        `The paper was folded ${story}.`,
        'Each cut goes through every layer, so opening one fold doubles the number of pieces missing.',
        'Open it one fold at a time and mirror each cut across the crease. The missing pieces always sit opposite each other, the same distance from the crease.',
      ];
    } else {
      // ── Holes punched through the folded stack ──────────────────────────
      const spots = [];
      for (let gx = 1; gx <= 6; gx++) {
        for (let gy = 1; gy <= 6; gy++) {
          const p = [gx / 7, gy / 7];
          // Comfortably inside, so the punch never straddles a crease.
          if (contains(folded, p) && edgeDistance(folded, p) > 0.08) spots.push(p);
        }
      }
      if (spots.length < 3) return null;

      const nHoles = difficulty === 1 ? 1 : difficulty === 2 ? int(rng, 1, 2) : int(rng, 1, 3);
      const holes = shuffle(rng, spots).slice(0, nHoles);
      const opened = unfoldHoles(holes, lines);

      // Every fold has to double the holes. If it did not, one landed on a
      // crease and the question loses its point.
      if (opened.length !== holes.length * 2 ** folds.length) return null;

      const pool = [
        holes.map((p) => p.slice()),                              // never opened out
        unfoldHoles(holes, lines.slice(1)),                       // a crease forgotten
        unfoldHoles(holes, lines.slice(0, -1)),
        unfoldHoles(holes, [...lines, lines[0]]),                 // opened once too often
        opened.map(([x, y]) => [+(1 - x).toFixed(6), y]),         // whole sheet flipped
        opened.map(([x, y]) => [y, x]),                           // whole sheet turned
        opened.slice(0, Math.max(1, opened.length - 1)),          // one hole short
        // Mirrored across a crease that was never folded. With a single fold
        // the mistakes above collapse onto each other, so these carry the
        // easier questions, and they are the mistake a child actually makes:
        // right idea, wrong line.
        ...FOLD_MENU.flatMap((f) => [-1, 1].map((k) => unfoldHoles(holes, [f.make(k)]))),
      ];
      const drawHoles = (h) => sheet(UNIT_SQUARE, h, { size: 84 });
      const seen = new Set([drawHoles(opened)]);
      const picked = [];
      for (const cand of shuffle(rng, pool)) {
        if (picked.length >= DISTRACTOR_COUNT) break;
        if (!cand.length) continue;
        if (cand.some(([x, y]) => x < 0.04 || x > 0.96 || y < 0.04 || y > 0.96)) continue;
        const k = drawHoles(cand);
        if (seen.has(k)) continue;
        seen.add(k);
        picked.push(cand);
      }
      if (picked.length < DISTRACTOR_COUNT) return null;

      idx = int(rng, 0, DISTRACTOR_COUNT);
      opts = picked.slice();
      opts.splice(idx, 0, opened);
      renderOption = (h) => sheet(UNIT_SQUARE, h, { size: 84 });
      finalPanel = { label: 'Punch', svg: sheet(folded, holes, { size: 68 }) };
      prompt = 'The paper is folded, then holes are punched through every layer. What does it look like opened out?';
      points = [
        `The paper was folded ${story}.`,
        `Each hole goes through every layer, so opening one fold doubles the holes. ${holes.length} hole${holes.length > 1 ? 's' : ''} and ${folds.length} fold${folds.length > 1 ? 's' : ''} gives <strong>${opened.length} holes</strong>.`,
        'Open it one fold at a time, mirroring the holes across each crease. They always land opposite each other, the same distance from the crease.',
      ];
    }

    // The fold story, panel by panel.
    const panels = [];
    regions.forEach((r, i) => {
      if (i > 0) panels.push('<div class="fold-arrow">&#8594;</div>');
      panels.push(`<div class="fold-step"><span class="fold-cap">${i === 0 ? 'Start' : `Fold ${i}`}</span>${
        sheet(r, [], { size: 68, crease: folds[i] ? folds[i].L : null })}</div>`);
    });
    panels.push('<div class="fold-arrow">&#8594;</div>');
    panels.push(`<div class="fold-step"><span class="fold-cap">${finalPanel.label}</span>${finalPanel.svg}</div>`);

    return {
      type: 'fold',
      prompt,
      stimulus: `<div class="stim-row fold-row">${panels.join('')}</div>`,
      optionsHTML: options(opts.map(renderOption)),
      answer: idx,
      explain: explain(`The answer is <strong>${LETTERS[idx]}</strong>.`, points),
      teachRef: 'fold',
    };
  });
}
