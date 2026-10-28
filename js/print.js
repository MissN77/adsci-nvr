// ── Printable worksheets ──────────────────────────────────────────────────
//
// Builds A4 worksheets from the same generators the app uses, so every
// printed question has passed the same geometry checks as the on-screen ones.
// Nothing is stored: each sheet has a short code, and the same code always
// rebuilds the same questions, so a lost answer key can be reprinted.
//
// Each page carries the method for its question type in a strip across the
// top. The child writes the rule they spotted before choosing a letter. That
// line is there on purpose: naming the rule first is what stops a child who
// rushes from grabbing the first option that looks right.

import { isActivated } from './core/licence.js';
import { makeRng } from './core/rng.js';
import { patternDefs } from './core/figure.js';
import { REGISTRY, GROUPS } from './generators/index.js';
import { teachFor } from './core/teach.js';
import { LETTERS } from './core/render.js';

const root = document.getElementById('print-root');

// The pattern-spotting types share one checklist, checked in the same order
// every time. The spatial types have their own steps in teach.js.
const CHECKLIST = ['Shape', 'Count', 'Shading', 'Size', 'Position', 'Rotation', 'Lines'];
const CHECKLIST_TYPES = new Set(['seq', 'mat', 'radial', 'ooo', 'sim', 'ana']);

// Tall stimuli need more room, so fewer fit on a page.
const PER_PAGE = { mat: 2, ref: 2, fold: 3, cube3d: 2, solid: 2, cube: 2, grid: 2, hid: 2, radial: 2 };
const DEFAULT_PER_PAGE = 3;

// Printed sheets are non-verbal only. The verbal and maths types are text
// heavy and already work well on screen.
const NVR_GROUPS = GROUPS.filter((g) => g.id === 'quest' || g.id === 'general');
const BEXLEY_IDS = GROUPS.find((g) => g.id === 'quest').types.map((t) => t.id);

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function newCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

// ── Controls ──────────────────────────────────────────────────────────────

function controls() {
  const opts = NVR_GROUPS.map((g) => `
    <optgroup label="${esc(g.name)}">
      ${g.id === 'quest' ? '<option value="mix">Mixed Bexley types</option>' : ''}
      ${g.types.map((t) => `<option value="${t.id}">${esc(t.name)}</option>`).join('')}
    </optgroup>`).join('');

  root.innerHTML = `
    <section class="pc no-print">
      <h1>Printable worksheets</h1>
      <p>Choose a question type and how many questions you want. Every sheet is new. The sheet code rebuilds the same sheet if you need to print it again.</p>
      <div class="pc-grid">
        <label>Question type<select id="pc-type">${opts}</select></label>
        <label>Questions<select id="pc-n">
          ${[6, 10, 12, 20, 30, 40].map((n) => `<option ${n === 12 ? 'selected' : ''}>${n}</option>`).join('')}
        </select></label>
        <label>Difficulty<select id="pc-d">
          <option value="1">1, getting started</option>
          <option value="2" selected>2, test level</option>
          <option value="3">3, stretch</option>
        </select></label>
        <label>Sheet code<input id="pc-code" inputmode="numeric" maxlength="6" value="${newCode()}"></label>
        <label class="pc-check"><input type="checkbox" id="pc-key" checked> Answer key at the back</label>
        <label class="pc-check"><input type="checkbox" id="pc-track"> Progress tracker page</label>
      </div>
      <div class="pc-actions">
        <button id="pc-make" class="btn">Make the sheet</button>
        <button id="pc-print" class="btn btn--ghost">Print</button>
        <button id="pc-new" class="btn btn--ghost">New questions</button>
      </div>
    </section>
    <div id="sheet"></div>`;

  // Links can preselect a sheet, e.g. print.html?type=fold&n=20&d=2
  const qs = new URLSearchParams(location.search);
  if (qs.get('type') && (REGISTRY[qs.get('type')] || qs.get('type') === 'mix')) document.getElementById('pc-type').value = qs.get('type');
  if (qs.get('n')) document.getElementById('pc-n').value = qs.get('n');
  if (qs.get('d')) document.getElementById('pc-d').value = qs.get('d');
  if (qs.get('code')) document.getElementById('pc-code').value = qs.get('code');

  const make = () => buildSheet();
  document.getElementById('pc-make').onclick = make;
  document.getElementById('pc-print').onclick = () => { buildSheet(); window.print(); };
  document.getElementById('pc-new').onclick = () => {
    document.getElementById('pc-code').value = newCode();
    make();
  };
  make();
}

// ── Sheet ─────────────────────────────────────────────────────────────────

function methodStrip(id) {
  const t = teachFor(id);
  const steps = t ? t.steps : [];
  const list = CHECKLIST_TYPES.has(id)
    ? `<p class="ms-check"><strong>Check in this order:</strong> ${CHECKLIST.map((c, i) => `<span>${i + 1}. ${c}</span>`).join('')}</p>`
    : '';
  return `
    <div class="method">
      <p class="ms-head">The method</p>
      <ol>${steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
      ${list}
      <p class="ms-rule">${CHECKLIST_TYPES.has(id) ? 'Say the rule, then choose.' : 'Work it out, then choose.'} Cross out the options that cannot be right.</p>
    </div>`;
}

function questionBlock(q, n) {
  return `
    <article class="pq">
      <p class="pq-prompt"><span class="pq-num">${n}</span>${q.prompt}</p>
      <div class="pq-body">
        ${q.noStimulus ? '' : `<div class="q-stim">${q.stimulus}</div>`}
        ${q.optionsHTML}
      </div>
      <p class="pq-write"><span>${CHECKLIST_TYPES.has(q.type) ? 'The rule I spotted' : 'How I checked'}: <i></i></span><span class="pq-ans">Answer: <i></i></span></p>
    </article>`;
}

function sheetHeader(title, code, n) {
  return `
    <header class="ph">
      <p class="ph-title">Non-verbal reasoning<br><strong>${esc(title)}</strong></p>
      <p class="ph-fields"><span>Name <i></i></span><span>Date <i></i></span><span>Time taken <i></i></span><span>Score <i></i> / ${n}</span></p>
      <p class="ph-code">Sheet ${esc(code)}</p>
    </header>`;
}

function buildSheet() {
  const choice = document.getElementById('pc-type').value;
  const n = Number(document.getElementById('pc-n').value);
  const d = Number(document.getElementById('pc-d').value);
  const code = document.getElementById('pc-code').value.trim() || '1';
  const withKey = document.getElementById('pc-key').checked;
  const withTrack = document.getElementById('pc-track').checked;

  // Seed from the code, type and difficulty so a code always rebuilds the
  // same sheet.
  const seed = [...`${code}|${choice}|${d}`].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rng = makeRng(seed);

  const items = [];
  for (let i = 0; i < n; i++) {
    const id = choice === 'mix' ? BEXLEY_IDS[i % BEXLEY_IDS.length] : choice;
    const gen = REGISTRY[id];
    // Each question gets its own seed drawn from the sheet's stream, so one
    // slow generator can never shift every question after it.
    const q = gen.generate(makeRng(Math.floor(rng() * 2 ** 31)), d);
    items.push({ id, q, name: gen.meta.name });
  }
  // Mixed sheets keep each type together so pages do not switch method
  // halfway down.
  if (choice === 'mix') items.sort((a, b) => BEXLEY_IDS.indexOf(a.id) - BEXLEY_IDS.indexOf(b.id));

  const title = choice === 'mix' ? 'Mixed Bexley types' : REGISTRY[choice].meta.name;
  const pages = [];
  let i = 0;
  while (i < items.length) {
    const id = items[i].id;
    // A page holds one question type only, so its method strip always
    // matches every question on it.
    const per = PER_PAGE[id] || DEFAULT_PER_PAGE;
    let end = i;
    while (end < items.length && end - i < per && items[end].id === id) end++;
    const chunk = items.slice(i, end);
    const stripId = id;
    pages.push(`
      <section class="pp">
        ${pages.length === 0 ? sheetHeader(title, code, n) : `<p class="pp-run">${esc(title)} · Sheet ${esc(code)} · page ${pages.length + 1}</p>`}
        ${choice === 'mix' ? `<p class="pp-type">${esc(items[i].name)}</p>` : ''}
        ${methodStrip(stripId)}
        ${chunk.map((it, k) => questionBlock(it.q, i + k + 1)).join('')}
      </section>`);
    i = end;
  }

  if (withKey) {
    pages.push(`
      <section class="pp pp--key">
        <p class="pp-run">${esc(title)} · Sheet ${esc(code)} · answers</p>
        <h2 class="key-h">Answers</h2>
        <ol class="key">
          ${items.map((it) => `<li><strong>${LETTERS[it.q.answer]}</strong><div class="key-ex">${it.q.explain}</div></li>`).join('')}
        </ol>
      </section>`);
  }

  if (withTrack) {
    pages.push(`
      <section class="pp pp--track">
        <h2 class="key-h">My non-verbal reasoning tracker</h2>
        <table class="track">
          <thead><tr><th>Date</th><th>Question type</th><th>Score</th><th>Time</th><th>Rules I found hard</th><th>&#9733;</th></tr></thead>
          <tbody>${'<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>'.repeat(18)}</tbody>
        </table>
      </section>`);
  }

  document.getElementById('sheet').innerHTML = patternDefs() + pages.join('');
  // The option "buttons" are print-only here, so take them out of the tab
  // order and stop them looking pressable.
  document.querySelectorAll('#sheet .opt').forEach((b) => { b.disabled = true; b.tabIndex = -1; });
}

// ── Start ─────────────────────────────────────────────────────────────────

if (!isActivated()) {
  root.innerHTML = `<section class="pc"><h1>Printable worksheets</h1>
    <p>Open the app and enter your licence code first. The printable sheets then work on this device.</p>
    <p><a class="btn" href="./">Open the app</a></p></section>`;
} else {
  controls();
}
