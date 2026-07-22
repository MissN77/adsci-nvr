// ── Reading comprehension ─────────────────────────────────────────────────
//
// Quest's English paper puts a passage at the front and asks twenty questions
// about it. Six of their twelve comprehension items ask about the EFFECT of
// something the author did rather than what happened, so the mix here leans
// the same way: retrieval, then inference, then authorial effect.
//
// This is the one type where the question is chosen rather than built. A
// question about a particular passage has to be written by a person who has
// read it. The passages are out of copyright and the questions are authored
// in js/core/passages.js.
//
// Because the questions are fixed, a run never repeats one until the pool is
// used up, which is what the shuffling below is for.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { PASSAGES } from '../core/passages.js';

export const meta = {
  id: 'comp',
  name: 'Reading Comprehension',
  blurb: 'Read the passage, then answer questions about it.',
  group: 'quest',
  subject: 'verbal',
};

function passageHTML(p) {
  const paras = p.paragraphs.map((t) => `<p>${t}</p>`).join('');
  return `<div class="passage">
      <h3 class="passage-title">${p.title}</h3>
      ${paras}
      <p class="passage-source">${p.source}</p>
    </div>`;
}

export function generate(rng) {
  return attempt(() => {
    const p = pick(rng, PASSAGES);
    const item = pick(rng, p.questions);

    const answers = item.answers || [item.answer];
    const all = shuffle(rng, [...answers, ...item.wrong]);
    const idx = answers.map((a) => all.indexOf(a)).sort((a, b) => a - b);

    const many = answers.length > 1;
    const head = many
      ? `The answers are <strong>${idx.map((i) => LETTERS[i]).join('</strong>, <strong>')}</strong>.`
      : `The answer is <strong>${LETTERS[idx[0]]}</strong>.`;

    return {
      type: 'comp',
      prompt: item.q,
      stimulus: passageHTML(p),
      optionsHTML: options(all.map((a) => `<span class="opt-text opt-sentence">${a}</span>`)),
      ...(many ? { answers: idx } : { answer: idx[0] }),
      explain: explain(head, [
        ...item.why,
        'Go back to the passage for every question. Answering from memory of what you read is where most marks are lost.',
      ]),
      teachRef: 'comp',
    };
  });
}
