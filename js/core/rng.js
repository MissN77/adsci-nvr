// ── Seeded RNG ────────────────────────────────────────────────────────────
// Every question is generated from a seed, so a "paper" can be reproduced
// exactly (same paper for a retake, or for the printable answer sheet)
// without storing the questions themselves.

/** mulberry32, small, fast, good enough for question generation. */
export function makeRng(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Turn any string into a 32-bit seed. */
export function hashSeed(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Random integer in [min, max] inclusive. */
export function int(rng, min, max) {
  return min + Math.floor(rng() * (max - min + 1));
}

/** Pick one element. */
export function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

/** Pick n distinct elements (order randomised). Throws if n > arr.length. */
export function pickN(rng, arr, n) {
  if (n > arr.length) throw new Error(`pickN: asked for ${n} of ${arr.length}`);
  return shuffle(rng, arr).slice(0, n);
}

/** Fisher-Yates, returns a new array. */
export function shuffle(rng, arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Place the correct answer at a random index among distractors.
 * Returns { options, answer } where answer is the index of `correct`.
 */
export function placeAnswer(rng, correct, distractors) {
  const idx = int(rng, 0, distractors.length);
  const options = distractors.slice();
  options.splice(idx, 0, correct);
  return { options, answer: idx };
}
