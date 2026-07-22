// ── Same or opposite ──────────────────────────────────────────────────────
// Quest English questions 19 and 20: "Which word means the same as X?" and
// "Which word means the opposite of X?"
//
// This is the only SPaG type that is generated rather than authored, because
// the word pairs already exist in words.js. The guard that matters is the
// RELATED map: a distractor must not be a synonym or an antonym of the
// headword through some other pair, or the question has two right answers.

import { pick, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { SYNONYMS, ANTONYMS } from '../core/words.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'spagsyn',
  name: 'Same or Opposite',
  blurb: 'Choose the word that means the same, or the opposite.',
  group: 'quest',
  subject: 'verbal',
};

// Every word any given word is linked to, in either direction and in either
// list. Built once at load.
const RELATED = new Map();
const link = (a, b) => {
  if (!RELATED.has(a)) RELATED.set(a, new Set());
  RELATED.get(a).add(b);
};
for (const [a, b] of [...SYNONYMS, ...ANTONYMS]) { link(a, b); link(b, a); }

const ALL_WORDS = [...new Set([...SYNONYMS, ...ANTONYMS].flat())];

export function generate(rng) {
  return attempt(() => {
    const sameWay = rng() < 0.5;
    const pairs = sameWay ? SYNONYMS : ANTONYMS;
    const pair = pick(rng, pairs);
    const flip = rng() < 0.5;
    const head = flip ? pair[1] : pair[0];
    const answerWord = flip ? pair[0] : pair[1];

    const banned = new Set([head, answerWord, ...(RELATED.get(head) || [])]);
    const pool = ALL_WORDS.filter((w) => !banned.has(w));
    if (pool.length < DISTRACTOR_COUNT) return null;

    const opts = shuffle(rng, [answerWord, ...shuffle(rng, pool).slice(0, DISTRACTOR_COUNT)]);
    if (new Set(opts).size !== opts.length) return null;
    const answer = opts.indexOf(answerWord);

    return {
      type: 'spagsyn',
      prompt: sameWay
        ? `Which word means the SAME as "${head}"?`
        : `Which word means the OPPOSITE of "${head}"?`,
      stimulus: '',
      noStimulus: true,
      optionsHTML: options(opts.map((w) => `<span class="opt-word">${w}</span>`)),
      answer,
      explain: explain(
        `The answer is <strong>${LETTERS[answer]}</strong>, ${answerWord}.`,
        [
          sameWay
            ? `"${head}" and "${answerWord}" mean the same thing, or very nearly.`
            : `"${head}" and "${answerWord}" are opposites.`,
          'Read the question word again before you choose. Same and opposite look alike on the page, and picking the perfect opposite when the question asked for a synonym is the commonest way to lose this mark.',
          'If a word is unfamiliar, try it in a short sentence of your own. A word you cannot use is usually not the answer.',
        ],
      ),
      teachRef: 'spagsyn',
    };
  });
}
