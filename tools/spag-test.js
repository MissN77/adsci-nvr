// ── Spelling, punctuation and grammar self-check ──────────────────────────
//
// The content is authored, so most of what makes it good cannot be tested.
// Three things CAN be, and each of them has already gone wrong once:
//
//   1. REACHABILITY. A generator guard rejected any comma sentence containing
//      a repeated word, and "the" appears twice in a lot of ordinary English.
//      Several sentences could therefore never appear, and nothing said so.
//      This test generates thousands of questions and checks every authored
//      item actually comes out.
//
//   2. ANSWER POSITION. Spot-the-mistake cannot shuffle its options, because
//      they are the parts of the sentence in order. The first draft put the
//      fault in part A or B in 21 items out of 26, which teaches a child to
//      look at the front of the sentence and stop reading.
//
//   3. DISTINCTNESS. Two identical options mean two correct answers.

import { MISTAKES, PUNCTUATED, COMMAS, GRAMMAR } from '../js/core/spag.js';
import { REGISTRY } from '../js/generators/index.js';
import { makeRng } from '../js/core/rng.js';
import { SYNONYMS, ANTONYMS } from '../js/core/words.js';
import { OPTION_COUNT, DISTRACTOR_COUNT } from '../js/core/format.js';

let failures = 0;
const fail = (msg) => { failures++; console.log(`✗ ${msg}`); };

// ── Structure ─────────────────────────────────────────────────────────────

MISTAKES.forEach(([parts, bad, why], n) => {
  if (parts.length !== 4) fail(`MISTAKES[${n}] has ${parts.length} parts, expected 4`);
  if (bad < -1 || bad > 3) fail(`MISTAKES[${n}] bad index ${bad} out of range`);
  if (!why) fail(`MISTAKES[${n}] has no explanation`);
  const opts = [...parts, 'No mistake'];
  if (new Set(opts).size !== opts.length) fail(`MISTAKES[${n}] repeats an option`);
});

PUNCTUATED.forEach(([right, wrongs, why], n) => {
  if (wrongs.length < DISTRACTOR_COUNT) {
    fail(`PUNCTUATED[${n}] has ${wrongs.length} wrong versions, needs ${DISTRACTOR_COUNT}`);
  }
  const all = [right, ...wrongs];
  if (new Set(all).size !== all.length) fail(`PUNCTUATED[${n}] repeats a version`);
  if (!why) fail(`PUNCTUATED[${n}] has no explanation`);
});

COMMAS.forEach(([words, at, why], n) => {
  if (at < 0 || at >= words.length - 1) fail(`COMMAS[${n}] index ${at} out of range`);
  const answerWord = words[at];
  if (words.filter((w) => w === answerWord).length > 1) {
    fail(`COMMAS[${n}] answer word "${answerWord}" appears more than once, so the question has two answers`);
  }
  const pool = [...new Set(words.filter((w, i) => i !== at && i !== words.length - 1 && w !== answerWord))];
  if (pool.length < DISTRACTOR_COUNT) {
    fail(`COMMAS[${n}] can only supply ${pool.length} distinct distractors, needs ${DISTRACTOR_COUNT}`);
  }
  if (!why) fail(`COMMAS[${n}] has no explanation`);
});

GRAMMAR.forEach(([text, answer, wrong, why], n) => {
  if (!text.includes('___')) fail(`GRAMMAR[${n}] has no gap marker`);
  if (wrong.length < DISTRACTOR_COUNT) {
    fail(`GRAMMAR[${n}] has ${wrong.length} distractors, needs ${DISTRACTOR_COUNT}`);
  }
  const all = [answer, ...wrong];
  if (new Set(all).size !== all.length) fail(`GRAMMAR[${n}] repeats an option`);
  if (!why) fail(`GRAMMAR[${n}] has no explanation`);
});

console.log(`banks: mistakes ${MISTAKES.length}, punctuation ${PUNCTUATED.length}, commas ${COMMAS.length}, grammar ${GRAMMAR.length}`);

// ── Reachability and answer position ──────────────────────────────────────

const SEEDS = 8000;
for (const id of ['spagerr', 'spagpunc', 'spagcomma', 'spaggram', 'spagsyn']) {
  const gen = REGISTRY[id];
  const stems = new Set();
  const pos = {};
  for (let s = 1; s <= SEEDS; s += 1) {
    const q = gen.generate(makeRng(s), 2);
    if (!q) continue;
    stems.add((q.stimulus || '') + q.prompt);
    const a = q.answers !== undefined ? q.answers[0] : q.answer;
    pos[a] = (pos[a] || 0) + 1;
    const opts = [...String(q.optionsHTML).matchAll(/class="opt-(?:word|text[^"]*)">([^<]*)</g)].map((m) => m[1]);
    if (opts.length !== OPTION_COUNT) fail(`${id} produced ${opts.length} options`);
    if (new Set(opts).size !== opts.length) fail(`${id} produced two identical options: ${opts.join(' | ')}`);
  }
  const total = Object.values(pos).reduce((a, b) => a + b, 0);
  const worst = Math.max(...Object.values(pos)) / total;
  if (worst > 0.4) {
    fail(`${id} puts the answer in one position ${(worst * 100).toFixed(0)}% of the time`);
  }
  console.log(`${id.padEnd(10)} ${String(stems.size).padStart(5)} distinct stems, answer position never above ${(worst * 100).toFixed(0)}%`);
}

// Every authored item must actually be reachable.
const reach = (id, bank, key) => {
  const seen = new Set();
  for (let s = 1; s <= SEEDS; s += 1) {
    const q = REGISTRY[id].generate(makeRng(s), 2);
    if (q) seen.add(key(q));
  }
  if (seen.size < bank.length) {
    fail(`${id}: only ${seen.size} of ${bank.length} authored items ever appear`);
  }
  return seen.size;
};
reach('spagerr', MISTAKES, (q) => q.stimulus);
reach('spagcomma', COMMAS, (q) => q.stimulus);
reach('spaggram', GRAMMAR, (q) => q.stimulus);

// ── Same or opposite: no distractor may also be a right answer ────────────

const RELATED = new Map();
const link = (a, b) => {
  if (!RELATED.has(a)) RELATED.set(a, new Set());
  RELATED.get(a).add(b);
};
for (const [a, b] of [...SYNONYMS, ...ANTONYMS]) { link(a, b); link(b, a); }

let leaks = 0;
for (let s = 1; s <= SEEDS; s += 1) {
  const q = REGISTRY.spagsyn.generate(makeRng(s), 2);
  if (!q) continue;
  const head = (q.prompt.match(/"([^"]+)"/) || [])[1];
  const opts = [...String(q.optionsHTML).matchAll(/class="opt-word">([^<]*)</g)].map((m) => m[1]);
  const related = RELATED.get(head) || new Set();
  opts.forEach((w, i) => {
    if (i !== q.answer && related.has(w)) leaks += 1;
  });
}
if (leaks) fail(`spagsyn offered ${leaks} distractors that are themselves linked to the question word`);
else console.log('spagsyn distractors checked: none is also a synonym or antonym of the question word');

console.log(`\n${failures === 0 ? '✅ content checks passed' : `❌ ${failures} problems`}`);
console.log(`
NOT checked here, and needing a teacher's eye:
  - whether each sentence sounds natural to a ten year old
  - whether the grammar rule being tested is the one a child would notice
  - whether the "no mistake" sentences really contain no mistake
These are judgement calls, so the file says so rather than implying the
content is verified.`);

process.exit(failures === 0 ? 0 : 1);
