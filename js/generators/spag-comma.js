// ── Where does the comma go ───────────────────────────────────────────────
// Quest English question 17 asks where a punctuation mark should be added.
// This is the comma version, which is the one Year 5 and 6 children most
// often get wrong: the comma that closes an opening phrase or clause.
//
// The options are words from the sentence, so the child answers by naming the
// word the comma follows. That needs no arrows or diagrams, which keeps it
// readable on a phone.

import { pick, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { COMMAS } from '../core/spag.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'spagcomma',
  name: 'Comma Placement',
  blurb: 'Work out which word the comma should follow.',
  group: 'quest',
  subject: 'verbal',
};

export function generate(rng) {
  return attempt(() => {
    const [words, at, why] = pick(rng, COMMAS);
    if (!words || at < 0 || at >= words.length) return null;

    const answerWord = words[at];
    // If the ANSWER word appears twice, "after which word" has two defensible
    // answers, so the item is genuinely unusable and is rejected.
    if (words.filter((w) => w === answerWord).length > 1) return null;
    // Distractors are other words from the same sentence, deduplicated. An
    // earlier version rejected the whole item whenever any word repeated,
    // which silently made several sentences unreachable: "the" appears twice
    // in a lot of ordinary English and those items simply never came up.
    const pool = [...new Set(words
      .filter((w, i) => i !== at && i !== words.length - 1 && w !== answerWord))];
    if (pool.length < DISTRACTOR_COUNT) return null;

    const opts = shuffle(rng, [answerWord, ...shuffle(rng, pool).slice(0, DISTRACTOR_COUNT)]);
    if (new Set(opts).size !== opts.length) return null;
    const answer = opts.indexOf(answerWord);

    const shown = words.map((w, i) => (i === at
      ? `<strong>${w}</strong>`
      : w)).join(' ');

    return {
      type: 'spagcomma',
      prompt: 'After which word should a comma be added?',
      stimulus: `<p class="sentence">${shown.replace(/<\/?strong>/g, '')}</p>`,
      optionsHTML: options(opts.map((w) => `<span class="opt-word">${w}</span>`)),
      answer,
      explain: explain(
        `The answer is <strong>${LETTERS[answer]}</strong>, after "${answerWord}".`,
        [
          why,
          'Find where the opening part of the sentence stops and the main part begins. The comma marks that join.',
          'Read it aloud and listen for the natural pause. Your voice drops slightly at exactly the place the comma belongs.',
        ],
      ),
      teachRef: 'spagcomma',
    };
  });
}
