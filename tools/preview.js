// ── Visual preview sheet ──────────────────────────────────────────────────
// Renders a sample of every question type into one HTML page, with the
// correct answer ringed, so the questions can actually be LOOKED at.
//
// Passing the validator only proves a question is internally consistent. It
// says nothing about whether a shape is too small to see, whether two greys
// look the same on a real screen, or whether the fold diagram reads left to
// right. That needs eyes.
//
//   node tools/preview.js            3 of each type
//   node tools/preview.js 6          6 of each type
//   open preview.html

import { writeFileSync } from 'node:fs';
import { makeRng } from '../js/core/rng.js';
import { patternDefs } from '../js/core/figure.js';
import { REGISTRY } from '../js/generators/index.js';

const PER_TYPE = Number(process.argv[2] || 3);
const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const blocks = [];

for (const [id, gen] of Object.entries(REGISTRY)) {
  const items = [];
  for (let i = 0; i < PER_TYPE; i++) {
    for (let d = 1; d <= 3; d++) {
      const q = gen.generate(makeRng(i * 31 + d * 7 + 1), d);
      // Ring the correct option so a mistake is obvious at a glance.
      const marked = q.optionsHTML.replace(
        new RegExp(`<button class="opt" data-opt="${q.answer}"`),
        '<button class="opt is-correct" data-opt="' + q.answer + '"',
      );
      items.push(`
        <article class="q">
          <p class="q-meta">${gen.meta.name} · difficulty ${d} · answer ${LETTERS[q.answer]}</p>
          <p class="q-prompt">${q.prompt}</p>
          ${q.noStimulus ? '' : `<div class="q-stim">${q.stimulus}</div>`}
          ${marked}
          <div class="q-explain">${q.explain}</div>
        </article>`);
    }
  }
  blocks.push(`<section><h2>${gen.meta.name}</h2><p class="blurb">${gen.meta.blurb}</p>${items.join('')}</section>`);
}

const html = `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>NVR question preview</title>
<link rel="stylesheet" href="css/app.css">
<style>
  body{background:#FAF7F0;color:#1A3A4A;font-family:"Trebuchet MS",system-ui,sans-serif;margin:0;padding:24px}
  h1{text-transform:uppercase;letter-spacing:.02em}
  h2{text-transform:uppercase;border-bottom:3px solid #F08080;padding-bottom:6px;margin-top:40px}
  .blurb{color:#556A78;margin-top:-6px}
  .q{background:#fff;border:2px solid #1A3A4A;padding:16px;margin:16px 0}
  .q-meta{font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#2A7B6F;margin:0 0 6px;font-weight:bold}
  .q-prompt{font-weight:bold;margin:0 0 12px}
  .q-explain{background:#FAF7F0;border-left:6px solid #2A7B6F;padding:10px 14px;margin-top:12px;font-size:15px}
  .q-explain ul{margin:6px 0 0 18px}
</style></head>
<body>
${patternDefs()}
<h1>Question preview</h1>
<p>Every type, three difficulties. The correct option is ringed.</p>
${blocks.join('')}
</body></html>`;

writeFileSync(new URL('../preview.html', import.meta.url), html);
console.log(`Wrote preview.html with ${Object.keys(REGISTRY).length * PER_TYPE * 3} questions.`);
