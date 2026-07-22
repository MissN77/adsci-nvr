// ── Grammatical word choice ───────────────────────────────────────────────
// Quest English question 13. This is the GRAMMAR sibling of vrsent: there the
// five options all fit grammatically and the child chooses on meaning, here
// they all fit the meaning and the child chooses on grammar.
//
// Keeping the two apart matters. A child who is strong on vocabulary and weak
// on agreement should be able to see which of those two is costing them.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { GRAMMAR } from '../core/spag.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'spaggram',
  name: 'Grammar Choice',
  blurb: 'Choose the word that is grammatically correct.',
  group: 'quest',
  subject: 'verbal',
};

export function generate(rng) {
  return attempt(() => {
    const [text, answerWord, wrong, why] = pick(rng, GRAMMAR);
    if (!wrong || wrong.length < DISTRACTOR_COUNT) return null;
    const chosen = shuffle(rng, wrong).slice(0, DISTRACTOR_COUNT);
    const idx = int(rng, 0, DISTRACTOR_COUNT);
    const opts = chosen.slice();
    opts.splice(idx, 0, answerWord);
    if (new Set(opts).size !== opts.length) return null;

    return {
      type: 'spaggram',
      prompt: 'Choose the word or words that complete the sentence correctly.',
      stimulus: `<p class="sentence">${text.replace('___', '<span class="gap">&#95;&#95;&#95;&#95;</span>')}</p>`,
      optionsHTML: options(opts.map((w) => `<span class="opt-word">${w}</span>`)),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>, ${answerWord}.`,
        [
          why,
          `Reading it back: "${text.replace('___', answerWord)}"`,
          'Find the subject of the sentence first, then check the verb matches it. Most of these come down to that one question.',
        ],
      ),
      teachRef: 'spaggram',
    };
  });
}
