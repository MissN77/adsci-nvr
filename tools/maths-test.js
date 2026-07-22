// ── Maths self-check ──────────────────────────────────────────────────────
// Reads the question as PRINTED and works the answer out again from scratch,
// then compares it with the one the generator marked correct.
//
// This is deliberately not a test of the generator's own arithmetic using the
// generator's own numbers, which would only prove it agrees with itself. It
// parses the text a child would read and solves that, so a question whose
// wording and answer have drifted apart is caught.
//
// A wrong sum is the worst thing this app could ship. Everything else is a
// question a child might argue with; a wrong sum is one they would be marked
// down for copying.

import { makeRng } from '../js/core/rng.js';
import * as maths from '../js/generators/maths.js';
import { correctSet } from '../js/core/answer.js';

const RUNS = Number(process.env.N || 6000);

const strip = (s) => s
  .replace(/&divide;/g, '/').replace(/&times;/g, '*').replace(/&minus;/g, '-')
  .replace(/&#9723;/g, '?').replace(/&deg;/g, '').replace(/<[^>]+>/g, '')
  .replace(/,/g, '').trim();

const optionValues = (html) => html.split('<button class="opt"').slice(1)
  .map((o) => {
    const m = /opt-sum">([^<]+)</.exec(o);
    return m ? Number(m[1].replace(/,/g, '')) : NaN;
  });

let checked = 0;
let unparsed = 0;
let wrong = 0;
const examples = [];

for (let seed = 1; seed <= RUNS; seed++) {
  const q = maths.generate(makeRng(seed), (seed % 3) + 1);
  const text = strip(q.prompt);
  const vals = optionValues(q.optionsHTML);
  const marked = correctSet(q).map((i) => vals[i]);

  let expected = null;
  let m;

  if ((m = /^(\d+)\s*\/\s*\?\s*=\s*(\d+)$/.exec(text))) {
    expected = [Number(m[1]) / Number(m[2])];
  } else if ((m = /^(\d+)\s*\+\s*\?\s*=\s*(\d+)$/.exec(text))) {
    expected = [Number(m[2]) - Number(m[1])];
  } else if ((m = /^(\d+)\s*-\s*\?\s*=\s*(\d+)$/.exec(text))) {
    expected = [Number(m[1]) - Number(m[2])];
  } else if ((m = /^(\d+)\s*\*\s*(\d+)\s*\*\s*(\d+)\s*=$/.exec(text))) {
    expected = [Number(m[1]) * Number(m[2]) * Number(m[3])];
  } else if ((m = /^(\d+)\s*\*\s*(\d+)\s*=$/.exec(text))) {
    expected = [Number(m[1]) * Number(m[2])];
  } else if (/^[\d\s+]+=$/.test(text)) {
    expected = [text.slice(0, -1).split('+').reduce((s, p) => s + Number(p.trim()), 0)];
  } else if ((m = /^(\d+)\/(\d+) of (\d+)\s*=$/.exec(text))) {
    expected = [(Number(m[3]) / Number(m[2])) * Number(m[1])];
  } else if ((m = /^(\d+)\/(\d+)\s*=\s*\?\/(\d+)$/.exec(text))) {
    expected = [(Number(m[1]) * Number(m[3])) / Number(m[2])];
  } else if ((m = /^Write (\d+)\/(\d+) as a decimal\.$/.exec(text))) {
    expected = [Number(m[1]) / Number(m[2])];
  } else if ((m = /straight line/.test(text) && /Angles of ([\d, ]+) and one more/.exec(text))) {
    expected = [180 - m[1].trim().split(/[\s,]+/).reduce((s, p) => s + Number(p), 0)];
  } else if ((m = /meet at a point/.test(text) && /Angles of ([\d, ]+) and one more/.exec(text))) {
    expected = [360 - m[1].trim().split(/[\s,]+/).reduce((s, p) => s + Number(p), 0)];
  } else if ((m = /clock shows (\d+) o'clock/.exec(text))) {
    const raw = Number(m[1]) * 30;
    expected = [raw > 180 ? 360 - raw : raw];
  } else if ((m = /common factors of (\d+) and (\d+)/.exec(text))) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    expected = vals.filter((v) => a % v === 0 && b % v === 0 && v > 1).sort((x, y) => x - y);
  }

  if (expected === null) { unparsed++; continue; }
  checked++;

  const got = marked.slice().sort((x, y) => x - y);
  const want = expected.slice().sort((x, y) => x - y);
  const same = got.length === want.length
    && want.every((v, i) => Math.abs(v - got[i]) < 1e-9);
  if (!same) {
    wrong++;
    if (examples.length < 5) examples.push({ seed, text, got, want });
  }
}

console.log(`questions generated : ${RUNS}`);
console.log(`re-solved from text : ${checked}`);
console.log(`not parsed by this test : ${unparsed}`);
console.log(`${wrong === 0 ? '✅' : '❌'} answers disagreeing with the printed question: ${wrong}`);
for (const e of examples) {
  console.log(`  seed ${e.seed}: "${e.text}" marked ${e.got} but works out as ${e.want}`);
}
process.exit(wrong === 0 ? 0 : 1);
