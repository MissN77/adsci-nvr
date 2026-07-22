// ── Vocabulary content self-check ─────────────────────────────────────────
// The sentence questions are written by hand, so they cannot be proved
// correct the way the geometry can. What CAN be checked is checked here, and
// what cannot is listed at the end so it is not mistaken for verified.

import { WORD_TAGS, SENTENCES, LETTER_GAPS, ACTION_OBJECTS } from '../js/core/vocab.js';
import { SYNONYMS, ANTONYMS } from '../js/core/words.js';

let failures = 0;
const fail = (msg) => { failures++; console.log(`✗ ${msg}`); };

// ── Categories ────────────────────────────────────────────────────────────
const byTag = {};
for (const [word, tags] of Object.entries(WORD_TAGS)) {
  for (const t of tags) (byTag[t] = byTag[t] || []).push(word);
}
for (const [tag, words] of Object.entries(byTag)) {
  if (words.length < 4) fail(`category "${tag}" has only ${words.length} words, needs 4 to build a set`);
}
console.log(`categories: ${Object.keys(byTag).length}, words: ${Object.keys(WORD_TAGS).length}`);

// ── Sentence completion ───────────────────────────────────────────────────
const seenSentences = new Set();
for (const [text, answer, wrong] of SENTENCES) {
  if (!text.includes('___')) fail(`sentence has no gap: "${text.slice(0, 40)}"`);
  if (seenSentences.has(text)) fail(`duplicate sentence: "${text.slice(0, 40)}"`);
  seenSentences.add(text);
  if (wrong.length < 4) fail(`sentence needs 4 wrong options: "${text.slice(0, 40)}"`);
  if (new Set(wrong).size !== wrong.length) fail(`repeated wrong option in "${text.slice(0, 40)}"`);
  if (wrong.includes(answer)) fail(`answer appears among the wrong options: "${text.slice(0, 40)}"`);

  // A distractor that MEANS THE SAME as the answer would also be defensible,
  // and that is a real fault. An opposite is not: it is clearly wrong, which
  // is exactly what a good wrong answer is.
  for (const w of wrong) {
    const isSynonym = SYNONYMS.some(
      ([a, b]) => (a === answer && b === w) || (b === answer && a === w),
    );
    if (isSynonym) fail(`"${w}" is a known synonym of the answer "${answer}"`);
  }
}
console.log(`sentence completion items: ${SENTENCES.length}`);

// ── Three-letter gaps ─────────────────────────────────────────────────────
// The real check: no wrong option may make the same word, and the answer must
// actually rebuild the intended word.
for (const [before, missing, after, sentence, wrong] of LETTER_GAPS) {
  const word = before + missing + after;
  if (!sentence.includes('%')) fail(`letter gap sentence has no % marker: ${word}`);
  if (wrong.includes(missing)) fail(`the answer "${missing}" is also listed as wrong for ${word}`);
  if (new Set(wrong).size !== wrong.length) fail(`repeated wrong option for ${word}`);
  if (wrong.length < 4) fail(`${word} needs 4 wrong options, has ${wrong.length}`);
  for (const w of wrong) {
    if (w.length !== missing.length) {
      fail(`option "${w}" is ${w.length} letters but the gap is ${missing.length} for ${word}`);
    }
  }
  // Note deliberately NOT checked: whether a wrong option also spells a real
  // word. Quest's own example includes options that do, because the letters
  // have to complete the word AND fit the sentence. Checking that properly
  // would need a dictionary, so it stays on the human review list below.
}
console.log(`three-letter gap items: ${LETTER_GAPS.length}`);

// ── Action and object ─────────────────────────────────────────────────────
const verbs = new Set();
for (const [verb, obj] of ACTION_OBJECTS) {
  if (verbs.has(verb)) fail(`duplicate verb: ${verb}`);
  verbs.add(verb);
  if (!obj || !verb) fail(`incomplete action pair: ${verb} / ${obj}`);
}
console.log(`action and object pairs: ${ACTION_OBJECTS.length}`);

console.log(`\n${failures === 0 ? '✅ content checks passed' : `❌ ${failures} problems`}`);
console.log(`
NOT checked here, and needing a teacher's eye:
  - whether each sentence reads naturally to a ten year old
  - whether a wrong option could still be argued as correct in context
  - whether the reading level is right for the age group
These are judgement calls, so the file says so rather than implying the
content is verified.`);

process.exit(failures === 0 ? 0 : 1);
