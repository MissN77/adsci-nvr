// ── Word pairs: closest and opposite in meaning ───────────────────────────
//
// Quest verbal questions 1 to 6, in their own words:
//
//   "Choose the two words, one from each group, that are closest in meaning."
//   "Choose the two words, one from each group, that have opposite meanings."
//
//   (glare, beam, shaft) (plank, light, grin)
//   A glare  B beam  C shaft  D plank  E light  F grin
//
// Two things about the format matter as much as the words. There are SIX
// options, not five, and the child picks TWO of them, one from each bracket.
// Both are unusual enough that meeting them first on the day would cost marks
// for reasons that have nothing to do with vocabulary.
//
// The word pairs are not generated. They come from Brenda's own 11+ word
// bank, written by a teacher, because a synonym list invented on the fly is
// exactly the kind of thing that looks right and quietly is not.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { POS, POS_AMBIGUOUS, SYNONYMS, ANTONYMS } from '../core/words.js';

export const meta = {
  id: 'vrpair',
  name: 'Word Pairs',
  blurb: 'Find the two words, one from each group, that go together.',
  group: 'quest',
  subject: 'verbal',
  optionCount: 6,
  picks: 2,
};

/** Every word that appears anywhere, used to draw filler words. */
const ALL_WORDS = [...new Set([
  ...SYNONYMS.flat(),
  ...ANTONYMS.flat(),
])];

/**
 * Words related to `w` in any way. A filler must not be related to the target
 * word, or the question quietly gains a second correct answer.
 */
function relatives(w) {
  const out = new Set([w]);
  for (const [a, b] of [...SYNONYMS, ...ANTONYMS]) {
    if (a === w) out.add(b);
    if (b === w) out.add(a);
  }
  return out;
}

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    const opposite = rng() < 0.5;
    const source = opposite ? ANTONYMS : SYNONYMS;
    const [left, right] = pick(rng, source);

    // Two fillers for each bracket. None may relate to anything else on
    // screen, otherwise more than one pairing works.
    //
    // They must ALSO match the part of speech of the answer. Without that the
    // brackets mixed word classes and the question stopped testing vocabulary:
    // (fragile, dwindle, blunder) holds exactly one adjective, so a child who
    // knew neither word still scored. Every sampled item leaked this way.
    const partOfSpeech = POS[left] || POS[right];
    if (!partOfSpeech) return null;
    const banned = new Set([...relatives(left), ...relatives(right)]);
    const fillers = shuffle(rng, ALL_WORDS).filter(
      (w) => !banned.has(w) && !POS_AMBIGUOUS.has(w) && POS[w] === partOfSpeech,
    );
    if (fillers.length < 4) return null;

    const groupA = [left, fillers[0], fillers[1]];
    const groupB = [right, fillers[2], fillers[3]];

    // No filler may pair with any other word on screen.
    const onScreen = [...groupA, ...groupB];
    for (const w of onScreen) {
      const rel = relatives(w);
      const hits = onScreen.filter((o) => o !== w && rel.has(o));
      const intended = (w === left && [right]) || (w === right && [left]) || [];
      if (hits.length !== intended.length) return null;
    }

    const shownA = shuffle(rng, groupA);
    const shownB = shuffle(rng, groupB);
    const all = [...shownA, ...shownB];
    const answers = [all.indexOf(left), all.indexOf(right)].sort((a, b) => a - b);

    const bracket = (ws) => `(${ws.join(', ')})`;

    return {
      type: 'vrpair',
      prompt: opposite
        ? 'Choose the two words, one from each group, that have opposite meanings.'
        : 'Choose the two words, one from each group, that are closest in meaning.',
      stimulus: `<p class="wordgroups">${bracket(shownA)} &nbsp; ${bracket(shownB)}</p>`,
      optionsHTML: options(all.map((w) => `<span class="opt-word">${w}</span>`)),
      answers,
      explain: explain(
        `The answer is <strong>${LETTERS[answers[0]]}</strong> and <strong>${LETTERS[answers[1]]}</strong>.`,
        [
          // The old first line just asserted "these two are synonyms", which
          // leaves a child who did not know a word exactly where they were.
          // Model the SUBSTITUTION TEST instead, which is the method a tutor
          // teaches: swap the two words in one sentence and see if it holds.
          opposite
            ? `Try them in one sentence: if something is <strong>${left}</strong>, it is the opposite of <strong>${right}</strong>. When a sentence stays true with the meaning flipped, you have found the opposite pair.`
            : `Try them in one sentence: if something is <strong>${left}</strong>, it is also <strong>${right}</strong>. When a sentence stays true after you swap one word for the other, they mean the same.`,
          'Take one word from the first group and try it against all three in the second, then move to the next. Working through it in order beats staring at all six.',
          // Replaces "look again at the exact shade of meaning", which a child
          // cannot act on, with something they can do.
          'If a word is new to you, say it in a sentence of your own. A word you cannot use in a sentence is usually not the answer.',
        ],
      ),
      teachRef: 'vrpair',
    };
  });
}
