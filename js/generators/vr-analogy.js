// ── Word analogies with brackets ──────────────────────────────────────────
// Quest verbal questions 7 to 9: "Choose the two words, one from each group,
// that will best complete the sentence."
//
//   Wring is to (finger, twist, cloth) as knead is to (kicked, dough, require)
//
// The link is the same on both sides: what the action is done to. You wring a
// cloth and you knead dough. Six options, pick two.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { ACTION_OBJECTS } from '../core/vocab.js';

export const meta = {
  id: 'vrana',
  name: 'Word Analogies',
  blurb: 'Work out how the first pair go together, then match the second.',
  group: 'quest',
  subject: 'verbal',
  optionCount: 6,
  picks: 2,
};

export function generate(rng) {
  return attempt(() => {
    const picked = shuffle(rng, ACTION_OBJECTS).slice(0, 5);
    if (picked.length < 5) return null;
    const [[verbA, objA], [verbB, objB], ...rest] = picked;

    // Fillers are objects from other actions, so they are the right sort of
    // word and cannot be ruled out by grammar alone.
    const fillers = rest.map(([, o]) => o);
    const groupA = shuffle(rng, [objA, fillers[0], fillers[1]]);
    const groupB = shuffle(rng, [objB, fillers[2], verbA]);

    const all = [...groupA, ...groupB];
    if (new Set(all).size !== all.length) return null;
    const answers = [all.indexOf(objA), all.indexOf(objB)].sort((a, b) => a - b);

    return {
      type: 'vrana',
      prompt: 'Choose the two words, one from each group, that will best complete the sentence.',
      stimulus: `<p class="sentence"><strong>${verbA}</strong> is to (${groupA.join(', ')}) as <strong>${verbB}</strong> is to (${groupB.join(', ')}).</p>`,
      optionsHTML: options(all.map((w) => `<span class="opt-word">${w}</span>`)),
      answers,
      explain: explain(
        `The answers are <strong>${LETTERS[answers[0]]}</strong> and <strong>${LETTERS[answers[1]]}</strong>.`,
        [
          `You ${verbA} a ${objA}, and you ${verbB} ${objB.match(/^[aeiou]/) ? 'an' : 'a'} ${objB}. The link is what the action is done to.`,
          'Work out the link from the first pair before you look at the second group. Deciding the rule first is much faster than trying every combination.',
          'Say the whole sentence with your two words in it. If it does not read properly, the link is wrong.',
        ],
      ),
      teachRef: 'vrana',
    };
  });
}
