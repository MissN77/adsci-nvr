// ── Question validator ────────────────────────────────────────────────────
// Generates thousands of questions per type and asserts the invariants that
// make a question fair. Run with: npm run validate
//
// This exists because the failure mode that matters is not a crash, it is a
// question that quietly has two right answers, or no right answer. A child
// loses confidence, a parent asks for a refund, and nothing in the console
// ever went red. So we check it here, in bulk, every build.

import { makeRng } from '../js/core/rng.js';
import { REGISTRY } from '../js/generators/index.js';

const PER_TYPE = Number(process.env.N || 4000);

// Strip SVG down to the geometry that a child actually sees. If two options
// reduce to the same string they are indistinguishable on screen, whatever
// the underlying objects say.
function visualKey(html) {
  const shapes = [...html.matchAll(/<(polygon|circle|ellipse)\b[^>]*>/g)].map((m) => m[0]);
  const groups = [...html.matchAll(/<g transform="([^"]*)"/g)].map((m) => m[1]);
  if (shapes.length === 0) {
    // Text options (codes, worded answers) carry no geometry, compare the
    // visible text instead, ignoring the A/B/C/D letter chip.
    return html.replace(/<span class="opt-letter">.*?<\/span>/s, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return JSON.stringify([groups, shapes]);
}

function extractOptions(optionsHTML) {
  // Each option is wrapped in <button class="opt" ...> ... </button>
  const parts = optionsHTML.split(/<button class="opt"/).slice(1);
  return parts.map((p) => p.split('</button>')[0]);
}

let failures = 0;
const report = [];

function fail(type, seed, msg, extra = '') {
  failures++;
  if (report.filter((r) => r.type === type).length < 4) {
    report.push({ type, seed, msg, extra });
  }
}

for (const [id, gen] of Object.entries(REGISTRY)) {
  let generated = 0;
  const answerCounts = [0, 0, 0, 0, 0];

  for (let i = 0; i < PER_TYPE; i++) {
    const seed = i + 1;
    const rng = makeRng(seed);
    const difficulty = (i % 3) + 1;
    let q;
    try {
      q = gen.generate(rng, difficulty);
    } catch (e) {
      fail(id, seed, `threw: ${e.message}`);
      continue;
    }
    generated++;

    const opts = extractOptions(q.optionsHTML);

    if (opts.length < 4) fail(id, seed, `only ${opts.length} options`);
    if (!(q.answer >= 0 && q.answer < opts.length)) {
      fail(id, seed, `answer index ${q.answer} out of range (${opts.length} options)`);
      continue;
    }
    answerCounts[q.answer]++;

    // THE critical check: no two options may look the same.
    const keys = opts.map(visualKey);
    const seen = new Map();
    keys.forEach((k, idx) => {
      if (seen.has(k)) {
        fail(id, seed, `options ${seen.get(k)} and ${idx} are visually identical`);
      } else {
        seen.set(k, idx);
      }
    });

    // Classification questions (odd one out) legitimately have no stimulus , 
    // the options themselves are the question.
    if (!q.noStimulus && (!q.stimulus || q.stimulus.length < 10)) fail(id, seed, 'empty stimulus');
    if (!q.explain || q.explain.length < 20) fail(id, seed, 'missing explanation');
    if (!q.prompt) fail(id, seed, 'missing prompt');
    if (/undefined|NaN|\[object/.test(q.stimulus + q.optionsHTML + q.explain)) {
      fail(id, seed, 'rendered undefined/NaN into output');
    }
  }

  // Answer position must not be predictable. A child who spots that the
  // answer is usually C will score well without reasoning at all.
  const total = answerCounts.reduce((a, b) => a + b, 0);
  const used = answerCounts.filter((c) => c > 0).length;
  const expected = total / used;
  const skew = Math.max(...answerCounts.map((c) => (c ? Math.abs(c - expected) / expected : 0)));
  const skewFlag = skew > 0.18 ? `  ⚠ answer position skew ${(skew * 100).toFixed(0)}%` : '';

  const bad = report.filter((r) => r.type === id).length;
  const status = failures === 0 || bad === 0 ? '✅' : '❌';
  console.log(
    `${status} ${id.padEnd(10)} ${generated}/${PER_TYPE} generated   ` +
    `answers A-E: ${answerCounts.slice(0, used).join('/')}${skewFlag}`,
  );
}

if (report.length) {
  console.log('\nFirst failures:\n');
  for (const r of report) {
    console.log(`  [${r.type}] seed ${r.seed}: ${r.msg}`);
    if (r.extra) console.log(`      ${r.extra}`);
  }
}

console.log(`\n${failures === 0 ? 'All checks passed.' : `${failures} failed checks.`}`);
process.exit(failures === 0 ? 0 : 1);
