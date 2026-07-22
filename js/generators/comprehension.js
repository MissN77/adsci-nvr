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
//
// generateSet is the one that matters. The real English paper is ONE passage
// with twelve questions on it. Serving one question per passage meant a ten
// question run made a child read ten passages, about seven thousand words,
// for ten marks, and it trained none of the actual skill: holding one text in
// your head and going back to it again and again.

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

/** Build one question object from a passage and one of its authored items. */
function build(rng, p, item) {
  {
    const answers = item.answers || [item.answer];
    const all = shuffle(rng, [...answers, ...item.wrong]);
    const idx = answers.map((a) => all.indexOf(a)).sort((a, b) => a - b);

    const many = answers.length > 1;
    const head = many
      ? `The answers are <strong>${idx.map((i) => LETTERS[i]).join('</strong>, <strong>')}</strong>.`
      : `The answer is <strong>${LETTERS[idx[0]]}</strong>.`;

    return {
      type: 'comp',
      passageId: p.id,
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
  }
}

export function generate(rng) {
  return attempt(() => {
    const p = pick(rng, PASSAGES);
    return build(rng, p, pick(rng, p.questions));
  });
}

/**
 * A passage set: one passage, `count` different questions about it, in the
 * order the child meets them. This is the shape of the real paper.
 */
export function generateSet(rng, count = 10) {
  const p = pick(rng, PASSAGES);
  const items = shuffle(rng, p.questions).slice(0, Math.min(count, p.questions.length));
  return items.map((item) => build(rng, p, item));
}
