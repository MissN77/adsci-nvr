// ── Headless smoke test ───────────────────────────────────────────────────
// Renders every screen and every question type, and drives a full mock paper
// to completion, on a fresh empty store. The other test files check that a
// QUESTION is correct; this checks that the APP does not throw when a child
// actually uses it. It caught a mock-paper crash that shipped: the paper
// initialised answers to -1, and the tap handler did `answers[i] || []`, but
// -1 is truthy, so `.includes` threw on the first tap.
//
//   node tools/smoke-test.mjs
//
// Headless smoke test: render every screen and every question type, drive a
// full mock paper to completion, on a fresh (empty) store.
const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

// Minimal window + localStorage so store.js works.
const mem = new Map();
globalThis.window = {
  localStorage: {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: (k) => mem.delete(k),
  },
  location: { hash: '' },
  addEventListener: () => {},
};
globalThis.document = { documentElement: { style: { setProperty: () => {} } } };

const S = await import(ROOT + '/js/ui/screens.js');
const { REGISTRY, TYPES } = await import(ROOT + '/js/generators/index.js');
const { makeRng } = await import(ROOT + '/js/core/rng.js');

let fails = 0;
const ok = (name, fn) => {
  try { const r = fn(); if (r === false) throw new Error('returned false'); process.stdout.write('.'); }
  catch (e) { fails++; console.log('\nFAIL ' + name + ': ' + e.message); }
};

let painted = '';
S.initScreens({ root: { querySelectorAll: () => [], querySelector: () => null },
  paint: (x) => { painted = x; }, go: () => {} });

// 1. Every screen renders to a non-empty string of HTML.
const html = (s) => { const h = s.html; if (typeof h !== 'string' || h.length < 20) throw new Error('no html'); if (/undefined|NaN|\[object/.test(h)) throw new Error('leaked value in html'); return true; };
ok('licence', () => html(S.licenceScreen()));
ok('child', () => html(S.childScreen()));
ok('home', () => html(S.homeScreen()));
ok('learnMenu', () => html(S.learnScreen()));
ok('practiseMenu', () => html(S.practiseMenuScreen()));
ok('progress', () => html(S.progressScreen()));
ok('settings', () => html(S.settingsScreen()));
for (const t of TYPES) ok('teach:' + t.id, () => html(S.teachScreen(t.id)));
for (const t of TYPES) ok('practise:' + t.id, () => html(S.practiseRunScreen(t.id)));

// 2. Every type generates 20 questions with 5 rendered options, no leaks.
for (const t of TYPES) ok('gen:' + t.id, () => {
  for (let s = 1; s <= 20; s++) {
    const q = REGISTRY[t.id].generate(makeRng(s * 13 + 1), (s % 3) + 1);
    if (!q) continue;
    if (/undefined|NaN|\[object Object\]/.test(q.prompt + (q.stimulus||'') + q.optionsHTML)) throw new Error('leak at seed ' + s);
    const opts = (q.optionsHTML.match(/data-opt=/g) || []).length;
    if (opts < 5 || opts > 6) throw new Error(opts + ' options at seed ' + s);
  }
  return true;
});

// 3. Drive a full mock paper to completion (20 questions).
ok('paper-full-run', () => {
  const paper = S.paperScreen();
  painted = paper.html;
  paper.click({ dataset: { act: 'start' } });
  const opt = (n) => ({ dataset: {}, closest: () => ({ dataset: { opt: String(n) } }) });
  for (let k = 0; k < 200; k++) {
    if (/out of 20/.test(painted)) break;
    paper.click(opt(0));
    if (/out of 20/.test(painted)) break;
    paper.click(opt(1)); paper.click(opt(2));
  }
  if (!/(\d+) out of 20/.test(painted)) throw new Error('paper never reached a score');
  if (!/By question type/.test(painted)) throw new Error('no breakdown');
  return true;
});

console.log('\n' + (fails === 0 ? 'ALL SMOKE CHECKS PASSED' : fails + ' FAILURES'));
process.exit(fails === 0 ? 0 : 1);
