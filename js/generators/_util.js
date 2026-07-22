// ── Generator utilities ───────────────────────────────────────────────────

import { sameFigure } from '../core/figure.js';
import { shuffle } from '../core/rng.js';

/**
 * Pick `n` distractors from a pool, rejecting anything that renders the same
 * as the correct answer or as another distractor already chosen.
 *
 * Returns null if the pool cannot supply n genuinely distinct options, the
 * generator then retries with a fresh seed rather than shipping a question
 * with two correct answers. This is the single most important guard in the
 * whole app.
 */
export function chooseDistractors(rng, correct, pool, n, eq = sameFigure) {
  const out = [];
  for (const cand of shuffle(rng, pool)) {
    if (out.length >= n) break;
    if (eq(cand, correct)) continue;
    if (out.some((o) => eq(o, cand))) continue;
    out.push(cand);
  }
  return out.length === n ? out : null;
}

/**
 * Run a generator body until it produces a valid question.
 * Generators return null when their guards reject an attempt.
 */
export function attempt(build, tries = 60) {
  for (let i = 0; i < tries; i++) {
    const q = build(i);
    if (q) return q;
  }
  throw new Error('generator failed to produce a valid question');
}

/** Standard explanation block. */
export function explain(headline, points = []) {
  const list = points.length
    ? `<ul>${points.map((p) => `<li>${p}</li>`).join('')}</ul>`
    : '';
  return `<p class="ex-head">${headline}</p>${list}`;
}

/** Sentence-case join: ["a","b","c"] -> "a, b, and c" */
export function joinRules(rules) {
  if (rules.length === 1) return rules[0];
  if (rules.length === 2) return `${rules[0]}, and ${rules[1]}`;
  return `${rules.slice(0, -1).join(', ')}, and ${rules[rules.length - 1]}`;
}
