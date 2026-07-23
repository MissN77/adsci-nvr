// ── Three linked words, two odd ones out ──────────────────────────────────
// Quest verbal questions 10 to 12: "Three of these words are linked in some
// way. Choose the two odd ones out." Five options, TWO answers.
//
// The trap in building this is that words belong to more than one group. Ruby
// is a red and a gem, so a set built around reds can quietly contain a second
// group of three. Every set is therefore audited: exactly one category may
// hold three of the five words, and no category may hold more.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { WORD_TAGS } from '../core/vocab.js';

export const meta = {
  id: 'vrodd',
  name: 'Odd Two Out',
  blurb: 'Three words go together. Find the two that do not.',
  group: 'quest',
  subject: 'verbal',
  picks: 2,
};

const BY_TAG = {};
for (const [word, tags] of Object.entries(WORD_TAGS)) {
  for (const t of tags) (BY_TAG[t] = BY_TAG[t] || []).push(word);
}
const TAGS = Object.keys(BY_TAG).filter((t) => BY_TAG[t].length >= 4);

// The single most useful thing this explanation can do is NAME the category.
// It used to say the three linked words are "the same kind of thing", which
// tells a child who is stuck precisely nothing: the whole skill is naming the
// link. So each tag gets a plain word a ten year old would use.
const TAG_NAME = {
  bird: 'birds', body: 'parts of the body', book: 'kinds of book',
  building: 'buildings', colour: 'colours', fabric: 'fabrics', fish: 'fish',
  gem: 'precious stones', instrument: 'musical instruments',
  kitchen: 'things used in a kitchen', land: 'kinds of land',
  metal: 'metals', rain: 'kinds of wet weather', rank: 'ranks in the army',
  red: 'shades of red', shape: 'shapes', time: 'lengths of time',
  tool: 'tools', tree: 'trees', wind: 'kinds of wind',
};

/** How many of these words carry each tag. */
function tagCounts(words) {
  const counts = {};
  for (const w of words) {
    for (const t of WORD_TAGS[w] || []) counts[t] = (counts[t] || 0) + 1;
  }
  return counts;
}

export function generate(rng) {
  return attempt(() => {
    const tag = pick(rng, TAGS);
    const linked = shuffle(rng, BY_TAG[tag]).slice(0, 3);

    // The two odd words must come from two DIFFERENT other categories, or
    // they would form a linked pair of their own and muddy the question.
    const otherTags = shuffle(rng, TAGS.filter((t) => t !== tag));
    const odd = [];
    // Not just the chosen tag: the odd word must not share ANY tag with any
    // of the three linked words. A blind reader found scarlet, bronze and
    // copper sitting together, because bronze and copper are metals AND
    // colours, and only the metal tag was being guarded.
    const usedTags = new Set([tag]);
    for (const w of linked) (WORD_TAGS[w] || []).forEach((x) => usedTags.add(x));
    for (const t of otherTags) {
      if (odd.length >= 2) break;
      const candidate = pick(rng, BY_TAG[t].filter(
        (w) => !linked.includes(w) && !odd.includes(w)
          && !(WORD_TAGS[w] || []).some((x) => usedTags.has(x)),
      ) || []);
      if (!candidate) continue;
      odd.push(candidate);
      (WORD_TAGS[candidate] || []).forEach((x) => usedTags.add(x));
    }
    if (odd.length < 2) return null;

    const all = [...linked, ...odd];
    // The audit: exactly one category holds three, and none holds more.
    const counts = tagCounts(all);
    const threes = Object.entries(counts).filter(([, n]) => n === 3);
    if (threes.length !== 1 || threes[0][0] !== tag) return null;
    if (Object.values(counts).some((n) => n > 3)) return null;
    // And no other category may hold two of them either, which would give a
    // child a second defensible reading of "linked".
    const twos = Object.entries(counts).filter(([t, n]) => n === 2 && t !== tag);
    if (twos.length) return null;

    const shown = shuffle(rng, all);
    const answers = odd.map((w) => shown.indexOf(w)).sort((a, b) => a - b);

    return {
      type: 'vrodd',
      prompt: 'Three of these words are linked in some way. Choose the two odd ones out.',
      stimulus: '',
      noStimulus: true,
      optionsHTML: options(shown.map((w) => `<span class="opt-word">${w}</span>`)),
      answers,
      explain: explain(
        `The answers are <strong>${LETTERS[answers[0]]}</strong> and <strong>${LETTERS[answers[1]]}</strong>.`,
        [
          `${linked.slice(0, -1).join(', ')} and ${linked[linked.length - 1]} are all <strong>${TAG_NAME[tag] || 'the same kind of thing'}</strong>.`,
          `${odd[0]} and ${odd[1]} do not belong, so they are the two odd ones out.`,
          'Name the link in ONE word as you find it. If you can say "these are all birds", you have it. If you cannot put a name to it, you have not found the group yet.',
        ],
      ),
      teachRef: 'vrodd',
    };
  });
}
