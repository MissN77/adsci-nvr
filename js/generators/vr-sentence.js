// ── Sentence completion ───────────────────────────────────────────────────
// Quest verbal questions 13 and 14: "Choose the word that will best complete
// the sentence below." Five options, one answer.
//
// The sentences are written, not generated, and live in js/core/vocab.js.
// The wrong answers are the same part of speech as the answer but plainly
// the wrong meaning, because a distractor that could be argued for is worse
// than an easy question.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';
import { SENTENCES } from '../core/vocab.js';

export const meta = {
  id: 'vrsent',
  name: 'Sentence Completion',
  blurb: 'Choose the word that fits the sentence best.',
  group: 'quest',
  subject: 'verbal',
};

export function generate(rng) {
  return attempt(() => {
    const [text, answer, wrong] = pick(rng, SENTENCES);
    if (wrong.length < DISTRACTOR_COUNT) return null;
    const chosen = shuffle(rng, wrong).slice(0, DISTRACTOR_COUNT);
    const idx = int(rng, 0, DISTRACTOR_COUNT);
    const opts = chosen.slice();
    opts.splice(idx, 0, answer);

    return {
      type: 'vrsent',
      prompt: 'Choose the word that will best complete the sentence below.',
      stimulus: `<p class="sentence">${text.replace('___', '<span class="gap">&#95;&#95;&#95;&#95;</span>')}</p>`,
      optionsHTML: options(opts.map((w) => `<span class="opt-word">${w}</span>`)),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>, ${answer}.`,
        [
          `Reading it back: "${text.replace('___', answer)}"`,
          'Try each word in the gap and read the whole sentence to yourself. A word that sounds nearly right usually gives itself away by the end of the sentence.',
          'The other four are all the right kind of word, so you cannot rule them out by grammar. It comes down to meaning.',
        ],
      ),
      teachRef: 'vrsent',
    };
  });
}
