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
import { OPTION_COUNT } from '../js/core/format.js';

const PER_TYPE = Number(process.env.N || 4000);

// Strip SVG down to the geometry that a child actually sees. If two options
// reduce to the same string they are indistinguishable on screen, whatever
// the underlying objects say.
/**
 * Reduce an option to what a child actually SEES.
 *
 * The first version of this compared the transform attribute as text, which
 * missed the real bug: a Z-shape and a Z-shape rotated 180 degrees have
 * different markup but draw the identical picture. So the transform is now
 * applied to the points and the resulting coordinates are compared. If two
 * options reduce to the same key, they are indistinguishable on screen no
 * matter what the underlying objects claim.
 */
function renderedKey(html) {
  const groups = [...html.matchAll(/<g transform="translate\(([-\d.]+),([-\d.]+)\) rotate\(([-\d.]+)\)( scale\(-1,1\))?">(.*?)<\/g>/gs)];
  if (groups.length === 0) return null;

  const parts = groups.map(([, tx, ty, rot, mir, body]) => {
    const cx = +tx; const cy = +ty; const a = (+rot * Math.PI) / 180;
    const m = mir ? -1 : 1;
    const place = (x, y) => {
      const px = x * m; // mirror is applied before rotation by the renderer
      return [
        (cx + px * Math.cos(a) - y * Math.sin(a)).toFixed(2),
        (cy + px * Math.sin(a) + y * Math.cos(a)).toFixed(2),
      ].join(',');
    };

    const shapes = [];
    for (const p of body.matchAll(/<polygon points="([^"]*)"([^>]*)>/g)) {
      const pts = p[1].trim().split(/\s+/).map((pair) => {
        const [x, y] = pair.split(',').map(Number);
        return place(x, y);
      });
      // Sorted, so the same outline written from a different starting vertex
      // still compares equal.
      shapes.push(`poly:${pts.sort().join('|')}${styleOf(p[2])}`);
    }
    for (const c of body.matchAll(/<circle cx="([-\d.]+)" cy="([-\d.]+)" r="([-\d.]+)"([^>]*)>/g)) {
      shapes.push(`circ:${place(+c[1], +c[2])}:${(+c[3]).toFixed(2)}${styleOf(c[4])}`);
    }
    for (const e of body.matchAll(/<ellipse cx="([-\d.]+)" cy="([-\d.]+)" rx="([-\d.]+)" ry="([-\d.]+)"([^>]*)>/g)) {
      shapes.push(`ell:${place(+e[1], +e[2])}:${(+e[3]).toFixed(2)}:${(+e[4]).toFixed(2)}${styleOf(e[5])}`);
    }
    return shapes.sort().join(';');
  });

  return parts.sort().join('##');
}

function styleOf(attrs) {
  const fill = /fill="([^"]*)"/.exec(attrs);
  const sw = /stroke-width="([^"]*)"/.exec(attrs);
  const dash = /stroke-dasharray="([^"]*)"/.exec(attrs);
  return `[${fill ? fill[1] : ''}/${sw ? sw[1] : ''}/${dash ? dash[1] : ''}]`;
}

function visualKey(html) {
  const geometric = renderedKey(html);
  if (geometric !== null) return geometric;

  const shapes = [...html.matchAll(/<(polygon|circle|ellipse|rect|line)\b[^>]*>/g)].map((m) => m[0]);
  if (shapes.length === 0) {
    // Text options (codes, worded answers) carry no geometry, compare the
    // visible text instead, ignoring the A/B/C/D letter chip.
    return html.replace(/<span class="opt-letter">.*?<\/span>/s, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  // Nets and folded-paper diagrams are drawn from plain rects and lines with
  // no group transform, so their markup already is their geometry.
  return shapes.join(';');
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
  const answerCounts = new Array(OPTION_COUNT).fill(0);

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

    // The real paper offers five options, A to E. Four would train the wrong
    // guess rate and the wrong scanning habit, so this is an exact check.
    if (opts.length !== OPTION_COUNT) {
      fail(id, seed, `${opts.length} options, expected ${OPTION_COUNT}`);
    }
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
