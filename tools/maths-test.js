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

let negDistractors = 0;
const negExamples = [];
let checked = 0;
let unparsed = 0;
let wrong = 0;
const examples = [];

for (let seed = 1; seed <= RUNS; seed++) {
  const q = maths.generate(makeRng(seed), (seed % 3) + 1);
  const text = strip(q.prompt);
  const vals = optionValues(q.optionsHTML);
  const marked = correctSet(q).map((i) => vals[i]);

  // No DISTRACTOR may be zero or negative. Every answer here is a positive
  // quantity, so a non-positive wrong option is one a child never produces and
  // discriminates nothing. Two shipped this way (a -30 and a contrived 58).
  const answers = correctSet(q);
  vals.forEach((v, i) => {
    if (!answers.includes(i) && Number.isFinite(v) && v <= 0) {
      negDistractors += 1;
      if (negExamples.length < 5) negExamples.push({ seed, text, v });
    }
  });

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
  } else if (/How many more on/.test(text) || /total for all four days/.test(text)) {
    // Bar chart: read the bar heights back off the drawing and the axis
    // labels, then work the answer out from those rather than from the
    // numbers the generator chose.
    const svg = q.stimulus;
    const ticks = [...svg.matchAll(/<text x="28" y="([\d.]+)"[^>]*>(\d+)<\/text>/g)]
      .map((t) => ({ y: Number(t[1]), v: Number(t[2]) }));
    const bars = [...svg.matchAll(/<rect x="(\d+)" y="([\d.]+)" width="\d+" height="([\d.]+)"/g)]
      .map((b) => ({ x: Number(b[1]), h: Number(b[3]) }))
      .sort((p1, p2) => p1.x - p2.x);
    const labels = [...svg.matchAll(/text-anchor="middle" font-size="13"[^>]*>([A-Za-z]+)<\/text>/g)].map((t) => t[1]);
    if (ticks.length >= 2 && bars.length) {
      // Two axis ticks give the scale: value per pixel.
      const perPixel = (ticks[1].v - ticks[0].v) / (ticks[0].y - ticks[1].y);
      const values = bars.map((b) => Math.round(b.h * perPixel));
      if (/total for all four days/.test(text)) {
        expected = [values.reduce((x, y) => x + y, 0)];
      } else {
        const mm = /How many more on (\w+) than on (\w+)/.exec(text);
        const hi = labels.indexOf(mm[1]);
        const lo = labels.indexOf(mm[2]);
        if (hi >= 0 && lo >= 0) expected = [values[hi] - values[lo]];
      }
    }
  } else if (/area of this shape/.test(text)) {
    // Compound area: the four side labels are printed on the figure.
    const nums = [...q.stimulus.matchAll(/font-weight="bold"[^>]*>(\d+)<\/text>/g)].map((t) => Number(t[1]));
    if (nums.length === 4) {
      const [wMinusW, H, W, hRest] = nums;
      // Split into two rectangles, exactly as the child is told to.
      expected = [wMinusW * H + (W - wMinusW) * hRest];
    }
  } else if (/built from/.test(text) && /cubes/.test(text)) {
    const dims = /is (\d+) cubes long, (\d+) cubes deep and (\d+) cubes high/.exec(q.stimulus);
    const per = /cubes of volume (\d+) cubic/.exec(text);
    if (dims) {
      expected = [Number(dims[1]) * Number(dims[2]) * Number(dims[3]) * (per ? Number(per[1]) : 1)];
    }
  } else if (/minutes does Train/.test(text)) {
    // Timetable: read the printed times out of the table and subtract.
    const rows = [...q.stimulus.matchAll(/<tr><th>([A-Za-z]+)<\/th>((?:<td>\d\d:\d\d<\/td>)+)<\/tr>/g)]
      .map((r) => ({ stop: r[1], times: [...r[2].matchAll(/(\d\d:\d\d)/g)].map((t) => t[1]) }));
    const mm = /Train (\d+) take to (?:travel from|get from) (\w+) to (\w+)/.exec(text);
    if (rows.length && mm) {
      const col = Number(mm[1]) - 1;
      const from = rows.findIndex((r) => r.stop === mm[2]);
      const to = rows.findIndex((r) => r.stop === mm[3]);
      const mins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
      if (from >= 0 && to >= 0) expected = [mins(rows[to].times[col]) - mins(rows[from].times[col])];
    }
  } else if ((m = /^(\d*)\?(\d*) \* (\d+) = (\d+)\. Which digit is missing\?$/.exec(text))) {
    // Long multiplication: divide the product to recover the whole number,
    // then read off the digit that was hidden.
    const before = m[1];
    const after = m[2];
    const whole = String(Number(m[4]) / Number(m[3]));
    expected = [Number(whole[before.length])];
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
console.log(`${negDistractors === 0 ? '✅' : '❌'} zero-or-negative distractors: ${negDistractors}`);
for (const e of negExamples) console.log(`  seed ${e.seed}: "${e.text}" has distractor ${e.v}`);
process.exit(wrong === 0 && negDistractors === 0 ? 0 : 1);
