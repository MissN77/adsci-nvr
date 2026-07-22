// ── Comprehension content self-check ──────────────────────────────────────
// The questions are written by hand against a fixed passage, so most of what
// makes them good cannot be tested. What CAN be tested is the thing most
// likely to go wrong when a human writes them: a question that quotes or
// depends on a word which is not actually in the passage.
//
// That is a real risk, not a theoretical one. It is easy to write a question
// from memory of the passage rather than from the passage.

import { PASSAGES } from '../js/core/passages.js';
import { OPTION_COUNT } from '../js/core/format.js';

let failures = 0;
const fail = (msg) => { failures++; console.log(`✗ ${msg}`); };

// Words a question expects the child to find in the text. Single-word answers
// to "which word in the passage..." questions must genuinely be there.
const WORD_ANSWER = /Which word[^?]*\?/i;

for (const p of PASSAGES) {
  const text = p.paragraphs.join(' ');
  const lower = text.toLowerCase();
  const words = p.paragraphs.join(' ').split(/\s+/).length;

  if (words < 250) fail(`${p.id}: passage is only ${words} words, short for a comprehension text`);
  if (!p.source) fail(`${p.id}: no source line, which every out-of-copyright text needs`);

  const seen = new Set();
  for (const q of p.questions) {
    const answers = q.answers || [q.answer];
    const all = [...answers, ...q.wrong];

    if (seen.has(q.q)) fail(`${p.id}: duplicate question "${q.q.slice(0, 40)}"`);
    seen.add(q.q);

    if (all.length !== OPTION_COUNT) {
      fail(`${p.id}: "${q.q.slice(0, 45)}" has ${all.length} options, expected ${OPTION_COUNT}`);
    }
    if (new Set(all).size !== all.length) {
      fail(`${p.id}: "${q.q.slice(0, 45)}" repeats an option`);
    }
    for (const a of answers) {
      if (q.wrong.includes(a)) fail(`${p.id}: answer "${a}" also listed as wrong`);
    }
    if (!q.why || q.why.length < 2) {
      fail(`${p.id}: "${q.q.slice(0, 45)}" needs at least two explanation points`);
    }

    // The check that matters: a "which word" question must have an answer
    // that really appears in the passage.
    if (WORD_ANSWER.test(q.q)) {
      for (const a of answers) {
        if (!lower.includes(a.toLowerCase())) {
          fail(`${p.id}: answer "${a}" is not in the passage, but the question asks for a word from it`);
        }
      }
    }

    // Retrieval answers phrased as short quotations should also be present.
    for (const a of answers) {
      const quoted = a.replace(/^(a|an|the) /i, '');
      if (a.length < 30 && /^[a-z' -]+$/i.test(a) && !WORD_ANSWER.test(q.q)) {
        if (!lower.includes(quoted.toLowerCase()) && /which (two|three)/i.test(q.q)) {
          fail(`${p.id}: retrieval answer "${a}" does not appear in the passage`);
        }
      }
    }
  }
  console.log(`${p.id.padEnd(8)} ${String(words).padStart(4)} words, ${p.questions.length} questions   ${p.source}`);
}

const total = PASSAGES.reduce((n, p) => n + p.questions.length, 0);
console.log(`\n${PASSAGES.length} passages, ${total} questions`);
console.log(failures === 0 ? '✅ content checks passed' : `❌ ${failures} problems`);
console.log(`
NOT checked here, and needing a teacher's eye:
  - whether an inference question has exactly one defensible answer
  - whether the reading level suits a ten year old
  - whether a passage raises anything better handled with an adult present
These are judgement calls, so they are named rather than implied to be safe.`);

process.exit(failures === 0 ? 0 : 1);
