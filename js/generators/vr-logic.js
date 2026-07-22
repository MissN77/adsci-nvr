// ── Logical deduction ─────────────────────────────────────────────────────
//
// Quest verbal questions 17 to 20, worded:
//
//   "Read the information below, then answer the question."
//   "All of the statements above are true. Which statement must also be true?"
//   "...which statement cannot be true?"
//
// These are the only verbal questions that can be built from nothing, and the
// answer can be PROVED rather than asserted. A set of facts about who is
// taller, older or faster than whom leaves some orderings possible and rules
// others out. Every ordering of five things is checked, all 120 of them, so:
//
//   must be true    holds in every ordering the facts allow
//   cannot be true  holds in none of them
//   might be true   holds in some but not all, which is what makes it a good
//                   wrong answer, because it feels true and is not
//
// That last one matters. A child who guesses from feel will pick a "might be
// true" statement, and the explanation can then name exactly why it fails:
// here is an ordering that fits every fact and still makes it false.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'vrlogic',
  name: 'Logical Deduction',
  blurb: 'Read the facts, then work out what has to be true.',
  group: 'quest',
  subject: 'verbal',
};

const NAMES = ['Amira', 'Ben', 'Chloe', 'Dev', 'Esme', 'Femi', 'Grace', 'Hari', 'Iris', 'Jonah'];

// Each scale gives the comparison its own wording, so the questions do not all
// read the same way.
const SCALES = [
  { more: 'taller than', less: 'shorter than', most: 'tallest', least: 'shortest', of: 'height' },
  { more: 'older than', less: 'younger than', most: 'oldest', least: 'youngest', of: 'age' },
  { more: 'faster than', less: 'slower than', most: 'fastest', least: 'slowest', of: 'speed' },
  { more: 'heavier than', less: 'lighter than', most: 'heaviest', least: 'lightest', of: 'weight' },
];

/** Every arrangement of `n` items. n is at most 5, so 120 at worst. */
function permutations(items) {
  if (items.length <= 1) return [items];
  const out = [];
  items.forEach((it, i) => {
    const rest = [...items.slice(0, i), ...items.slice(i + 1)];
    permutations(rest).forEach((p) => out.push([it, ...p]));
  });
  return out;
}

// An ordering is a list from least to most. `rank` is the position in it.
const satisfies = (order, [a, b]) => order.indexOf(a) > order.indexOf(b);

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    // Four people minimum. With three there are only six ordered pairs, and
    // once the given facts are removed there are not five distinct statements
    // left to offer.
    const n = difficulty === 3 ? 5 : 4;
    const scale = pick(rng, SCALES);
    const people = shuffle(rng, NAMES).slice(0, n);

    // A hidden true ordering, least to most, then facts drawn from it.
    const truth = shuffle(rng, people);
    const allPairs = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i !== j) allPairs.push([truth[j], truth[i]]); // [more, less]
      }
    }
    const truePairs = allPairs.filter(([a, b]) => truth.indexOf(a) > truth.indexOf(b));

    const factCount = difficulty === 1 ? n : n - 1 + (difficulty >= 3 ? 1 : 0);
    const facts = shuffle(rng, truePairs).slice(0, factCount);

    // Which orderings are still possible once the facts are known?
    const possible = permutations(people).filter((o) => facts.every((f) => satisfies(o, f)));
    if (!possible.length) return null;
    // The facts must leave real doubt, or every statement is decidable and the
    // question stops being reasoning.
    if (possible.length < 2) return null;

    const statedKey = new Set(facts.map(([a, b]) => `${a}>${b}`));
    // Weighted toward CANNOT at the attempt stage, because most cannot
    // candidates are now rejected for being one-step reversals of a stated
    // fact. Without this the surviving mix was 84/16 and a child would hardly
    // ever meet the wording, which is in the Quest booklet.
    const asMust = rng() < 0.32;

    // Sort every candidate statement by how the facts constrain it.
    const must = []; const cannot = []; const might = [];
    for (const [a, b] of allPairs) {
      if (statedKey.has(`${a}>${b}`)) continue; // already given, not a deduction
      const hits = possible.filter((o) => satisfies(o, [a, b])).length;
      const s = { a, b, text: `${a} is ${scale.more} ${b}.` };
      if (hits === possible.length) must.push(s);
      else if (hits === 0) cannot.push(s);
      else might.push(s);
    }

    const correctPool = asMust ? must : cannot;
    // Wrong answers are statements that are not certain. "Might be true" ones
    // are the best of them, because they feel right.
    const wrongPool = asMust ? [...might, ...cannot] : [...might, ...must];
    if (!correctPool.length || wrongPool.length < DISTRACTOR_COUNT) return null;

    const correct = pick(rng, correctPool);
    // Lead with a "might be true" wrong answer where there is one, because
    // that is the one worth explaining: it feels right and is not forced.
    // No two options may be about the same PAIR of people. If "Ben is faster
    // than Hari" and "Hari is faster than Ben" both appear they contradict, so
    // at most one can be forced and a child can strike both out without
    // reading a single fact. One sampled item was answerable in five seconds
    // with the facts covered up.
    //
    // Done by construction rather than by rejecting the attempt: the wrong
    // pool is full of reversals, so rejecting simply exhausted the generator.
    // Only for MUST questions. On a CANNOT question a reversal pair is not a
    // free elimination: one of the two may well be the impossible one and the
    // other perfectly possible, so the child still has to read the facts.
    // Applying it to both starved the cannot pool and silently drove those
    // questions to zero, which a distinct-count check would not have caught.
    const usedPair = asMust
      ? new Set([[correct.a, correct.b].sort().join('|')])
      : new Set();
    const ordered = shuffle(rng, wrongPool)
      .sort((a, b) => (might.includes(b) ? 1 : 0) - (might.includes(a) ? 1 : 0));
    const wrong = [];
    for (const w of ordered) {
      const key = [w.a, w.b].sort().join('|');
      if (asMust && usedPair.has(key)) continue;
      usedPair.add(key);
      wrong.push(w);
      if (wrong.length >= DISTRACTOR_COUNT) break;
    }
    if (wrong.length < DISTRACTOR_COUNT) return null;
    const idx = int(rng, 0, DISTRACTOR_COUNT);
    const opts = wrong.slice();
    opts.splice(idx, 0, correct);

    // A "cannot be true" answer that simply reverses a stated fact is a
    // one-step lookup, not a deduction.
    if (!asMust && statedKey.has(`${correct.b}>${correct.a}`)) return null;

    // For the explanation: an ordering that fits the facts but breaks the
    // statement, which is the proof a "might be true" answer is not certain.
    const counterFor = (s) => possible.find((o) => (asMust
      ? !satisfies(o, [s.a, s.b])
      : satisfies(o, [s.a, s.b])));
    const example = counterFor(wrong[0]);

    const factList = facts.map(([a, b]) => `<li>${a} is ${scale.more} ${b}.</li>`).join('');

    return {
      type: 'vrlogic',
      prompt: asMust
        ? 'All of the statements below are true. Which statement must also be true?'
        : 'All of the statements below are true. Which statement cannot be true?',
      stimulus: `<ul class="facts">${factList}</ul>`,
      optionsHTML: options(opts.map((s) => `<span class="opt-text opt-sentence">${s.text}</span>`)),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>.`,
        [
          asMust
            ? `Put everyone in order of ${scale.of} from the facts. However you fill in the gaps, ${correct.a} always ends up ${scale.more} ${correct.b}, so that one has to be true.`
            : `Put everyone in order of ${scale.of} from the facts. There is no way to arrange them that makes ${correct.a} ${scale.more} ${correct.b}, so that one is impossible.`,
          // "Not forced by the facts" is the reason a MUST question's distractors
          // are wrong. For a CANNOT question the point is the opposite: the
          // others are wrong because they CAN be true. The same sentence was
          // being printed for both, so half the time it taught the wrong test.
          example
            ? (asMust
              ? `The other answers are not forced by the facts. For instance ${example.slice().reverse().join(', then ')} fits every fact given, and it makes "${wrong[0].text.replace(/\.$/, '')}" false.`
              : `The other answers are all possible. For instance ${example.slice().reverse().join(', then ')} fits every fact given, and it makes "${wrong[0].text.replace(/\.$/, '')}" true.`)
            : (asMust
              ? 'The other answers are not forced by the facts given.'
              : 'The other answers can all be true under some arrangement.'),
          'Write the names in a line as you read each fact. Guessing from memory is where marks go here.',
        ],
      ),
      teachRef: 'vrlogic',
    };
  });
}
