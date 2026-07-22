// ── Answers, single and multiple ──────────────────────────────────────────
//
// The non-verbal paper is single-answer throughout, so the app was built that
// way. The Quest verbal and maths papers are not: twelve of their twenty
// verbal questions say "choose the TWO words", and their maths asks "choose
// ALL of the common factors of 48 and 36".
//
// That is not a detail. A child who has only ever tapped one option and moved
// on will lose marks on more than half the verbal paper for a reason that has
// nothing to do with reasoning. So the answer model handles both, and every
// question declares which it is.
//
// A question carries EITHER:
//   answer:  3                     one right option
//   answers: [1, 4]                exactly these options, in any order
//
// `needed(q)` says how many taps the child must make before it is marked.

/** The correct option indexes, always as an array. */
export function correctSet(q) {
  return Array.isArray(q.answers) ? q.answers.slice().sort((a, b) => a - b) : [q.answer];
}

/** How many options the child has to choose. */
export function needed(q) {
  return correctSet(q).length;
}

export const isMulti = (q) => needed(q) > 1;

/** Did the child get it right? Order never matters. */
export function isCorrect(q, chosen) {
  const want = correctSet(q);
  const got = chosen.slice().sort((a, b) => a - b);
  return got.length === want.length && want.every((v, i) => v === got[i]);
}

/**
 * A line telling the child how many to pick, shown under the prompt.
 * Worded the way Quest words it, so the phrasing is familiar on the day.
 */
export function instruction(q) {
  const n = needed(q);
  if (n === 1) return '';
  if (q.chooseAll) return 'Choose <strong>all</strong> the correct answers.';
  return `Choose <strong>${n === 2 ? 'two' : n}</strong> answers.`;
}
