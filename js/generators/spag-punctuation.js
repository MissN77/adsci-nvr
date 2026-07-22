// ── Which sentence is punctuated correctly ────────────────────────────────
// Quest English question 18. Five versions of the same sentence, one right.
//
// The wrong versions each break ONE rule, so a child who knows that rule can
// rule that option out. Options that broke several rules at once would be too
// easy to spot and would not teach anything.

import { pick, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { PUNCTUATED } from '../core/spag.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'spagpunc',
  name: 'Punctuation',
  blurb: 'Choose the sentence that is punctuated correctly.',
  group: 'quest',
  subject: 'verbal',
};

export function generate(rng) {
  return attempt(() => {
    const [right, wrongs, why] = pick(rng, PUNCTUATED);
    if (!wrongs || wrongs.length < DISTRACTOR_COUNT) return null;
    const opts = shuffle(rng, [right, ...wrongs.slice(0, DISTRACTOR_COUNT)]);
    if (new Set(opts).size !== opts.length) return null;
    const answer = opts.indexOf(right);

    return {
      type: 'spagpunc',
      prompt: 'Which sentence is punctuated correctly?',
      stimulus: '',
      noStimulus: true,
      optionsHTML: options(opts.map((w) => `<span class="opt-text opt-sentence">${w}</span>`)),
      answer,
      explain: explain(
        `The answer is <strong>${LETTERS[answer]}</strong>.`,
        [
          why,
          'Check one mark at a time down the whole list: capital letters first, then commas, then the mark at the end. Comparing five sentences at once is where mistakes creep in.',
          'Read each version aloud in your head. Punctuation shows where a reader pauses, so a version that reads awkwardly is usually the one that is wrong.',
        ],
      ),
      teachRef: 'spagpunc',
    };
  });
}
