// ── Letters that complete a word and a sentence ───────────────────────────
// Quest verbal questions 15 and 16: "Which three letters will best complete
// the word, and the sentence, below?"
//
// Note the wording: the letters must complete the WORD and the SENTENCE. A
// wrong option is allowed to spell a real word, and some here deliberately
// do, because spotting that it makes a word but the wrong one is the skill
// the question is testing.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';
import { LETTER_GAPS } from '../core/vocab.js';

export const meta = {
  id: 'vrgap',
  name: 'Complete the Word',
  blurb: 'Find the letters that finish the word and the sentence.',
  group: 'quest',
  subject: 'verbal',
};

export function generate(rng) {
  return attempt(() => {
    const [before, missing, after, sentence, wrong] = pick(rng, LETTER_GAPS);
    if (wrong.length < DISTRACTOR_COUNT) return null;
    const chosen = shuffle(rng, wrong).slice(0, DISTRACTOR_COUNT);
    const idx = int(rng, 0, DISTRACTOR_COUNT);
    const opts = chosen.slice();
    opts.splice(idx, 0, missing);

    const gapped = `${before}<span class="gap">${'&#95;'.repeat(missing.length)}</span>${after}`;
    const shown = sentence.replace('%', `<strong>${gapped}</strong>`);
    const n = missing.length;
    const word = n === 2 ? 'two' : n === 3 ? 'three' : 'four';

    return {
      type: 'vrgap',
      prompt: `Which ${word} letters will best complete the word, and the sentence, below?`,
      stimulus: `<p class="sentence">${shown}</p>`,
      optionsHTML: options(opts.map((w) => `<span class="opt-word">${w}</span>`)),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>, ${missing}.`,
        [
          `That makes <strong>${before}${missing}${after}</strong>, which fits the sentence.`,
          'Say the word out loud with each set of letters in it. Your ear catches a wrong one faster than your eye does.',
          'Some of the wrong answers make a real word too, so check it fits the sentence as well as spelling something.',
        ],
      ),
      teachRef: 'vrgap',
    };
  });
}
