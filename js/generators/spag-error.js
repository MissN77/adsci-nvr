// ── Spot the mistake ──────────────────────────────────────────────────────
// Quest English questions 15 and 16: "Which part of the sentence contains a
// mistake? If there is no mistake, choose 'None'."
//
// The options are the four parts themselves rather than bare letters, because
// on a phone a child should not have to hold "part C" in their head while
// looking back up at the sentence.
//
// Option order is FIXED, matching the order of the sentence. That is how the
// real paper works, and it is why the position of the fault is balanced in
// the data rather than here.

import { pick } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { MISTAKES } from '../core/spag.js';

export const meta = {
  id: 'spagerr',
  name: 'Spot the Mistake',
  blurb: 'Find the part that is wrong, or say the sentence is already correct.',
  group: 'quest',
  subject: 'verbal',
};

export function generate(rng) {
  return attempt(() => {
    const [parts, bad, why] = pick(rng, MISTAKES);
    if (!Array.isArray(parts) || parts.length !== 4) return null;
    const answer = bad === -1 ? 4 : bad;
    const opts = [...parts, 'No mistake'];
    if (new Set(opts).size !== opts.length) return null;

    return {
      type: 'spagerr',
      prompt: 'Which part of the sentence contains a mistake? If there is no mistake, choose "No mistake".',
      stimulus: `<p class="sentence">${parts.join(' ')}</p>`,
      optionsHTML: options(opts.map((w) => `<span class="opt-text opt-sentence">${w}</span>`)),
      answer,
      explain: explain(
        `The answer is <strong>${LETTERS[answer]}</strong>.`,
        [
          why,
          'Read the sentence one part at a time and say each part to yourself. A mistake is much easier to hear in a short piece than in a whole sentence.',
          'Some sentences really are correct. If you have checked all four parts and found nothing, choose "No mistake" rather than picking the part you understand least.',
        ],
      ),
      teachRef: 'spagerr',
    };
  });
}
