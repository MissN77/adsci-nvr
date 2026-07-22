// ── Screens ───────────────────────────────────────────────────────────────
//
// Every screen is a plain object:
//   { html, click?(el, ev), change?(el, ev), mounted?(), destroy?() }
//
// No screen attaches its own DOM listeners. app.js owns one delegated
// listener on #app and hands events down, which is why switching screens can
// never leak a handler. Screens that own a timer clean it up in destroy.

import { TYPES, REGISTRY, generateFor } from '../generators/index.js';
import { makeRng, hashSeed, shuffle } from '../core/rng.js';
import { Store } from '../core/store.js';
import { teachFor } from '../core/teach.js';
import { activate, licenceInfo, deactivate } from '../core/licence.js';

// Set once by app.js on boot.
let ctx = { paint() {}, go() {}, root: null };

export function initScreens(c) {
  ctx = c;
}

// ── Small helpers ─────────────────────────────────────────────────────────

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function header(title, back) {
  const backBtn = back
    ? `<button class="back" type="button" data-act="go" data-to="${esc(back)}">Back</button>`
    : '';
  return `<div class="topbar">${backBtn}<span class="topbar-title">${esc(title)}</span></div>`;
}

function footer() {
  return `<div class="sitefoot">Advisory Science &middot; 11+ Non-Verbal Reasoning</div>`;
}

function typeName(id) {
  const m = REGISTRY[id];
  return m && m.meta ? m.meta.name : id;
}

/** Fresh seeded question. A new seed every time so a run is never repeated. */
function makeQuestion(typeId, difficulty, salt) {
  const rng = makeRng(hashSeed(`${typeId}|${difficulty}|${salt}|${Math.random()}`));
  return generateFor(typeId, rng, difficulty);
}

function questionBody(q) {
  const stim = q.noStimulus ? '' : (q.stimulus || '');
  return `<p class="qprompt">${q.prompt}</p>${stim}${q.optionsHTML}`;
}

/** Mark the tapped option and lock the rest. Used by practice and learn. */
function markOptions(root, chosen, answer) {
  const opts = root.querySelectorAll('.opt');
  opts.forEach((el, i) => {
    el.disabled = true;
    if (i === answer) el.classList.add('is-correct');
    else if (i === chosen) el.classList.add('is-wrong');
  });
}

function secs(n) {
  const m = Math.floor(n / 60);
  const s = n % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ── Licence ───────────────────────────────────────────────────────────────

export function licenceScreen() {
  let message = '';
  let busy = false;

  function body() {
    return `${header('Activate')}
      <div class="wrap">
        <h2>Enter your code</h2>
        <p>Your code came with your receipt. It looks like <strong>ADSCI-NVR-XXXX-XXXX</strong>. You only need to do this once on this device.</p>
        <hr class="rule">
        ${message}
        <input class="input" id="code" type="text" inputmode="text" autocapitalize="characters"
               autocomplete="off" spellcheck="false" data-enter="activate"
               placeholder="ADSCI-NVR-XXXX-XXXX">
        <button class="btn" type="button" data-act="activate" ${busy ? 'disabled' : ''}>
          ${busy ? 'Checking' : 'Activate'}
        </button>
        <p class="muted">Lost your code? Reply to your order email and we will send it again.</p>
      </div>
      ${footer()}`;
  }

  return {
    get html() { return body(); },
    async click(el) {
      if (el.dataset.act !== 'activate' || busy) return;
      const input = ctx.root.querySelector('#code');
      const value = input ? input.value : '';
      busy = true;
      ctx.paint(body());
      const res = await activate(value);
      busy = false;
      if (res.ok) { ctx.go('#/home'); return; }
      message = `<div class="err">${esc(res.error)}</div>`;
      ctx.paint(body());
    },
  };
}

// ── Child picker ──────────────────────────────────────────────────────────

export function childScreen() {
  function body() {
    const kids = Store.listChildren();
    const current = Store.getChild();
    const list = kids.length
      ? kids.map((k) => `
        <div class="card">
          <div class="bar-label">
            <span>${esc(k)}${k === current ? ' <span class="tag">Using now</span>' : ''}</span>
          </div>
          <div class="btn-row">
            <button class="btn" type="button" data-act="use" data-name="${esc(k)}">Use</button>
            <button class="btn btn--ghost" type="button" data-act="remove" data-name="${esc(k)}">Remove</button>
          </div>
        </div>`).join('')
      : '<p class="muted">No one added yet. Add a first name below.</p>';

    return `${header('Who is practising')}
      <div class="wrap">
        ${list}
        <hr class="rule">
        <h3>Add someone</h3>
        <input class="input" id="kid" type="text" placeholder="First name" autocomplete="off"
               maxlength="24" data-enter="add">
        <button class="btn" type="button" data-act="add">Add</button>
        <p class="muted">Each person keeps their own progress on this device.</p>
      </div>
      ${footer()}`;
  }

  return {
    get html() { return body(); },
    click(el) {
      const act = el.dataset.act;
      if (act === 'add') {
        const input = ctx.root.querySelector('#kid');
        const name = input ? input.value : '';
        if (!name.trim()) return;
        Store.addChild(name);
        Store.setChild(name);
        ctx.go('#/home');
      } else if (act === 'use') {
        Store.setChild(el.dataset.name);
        ctx.go('#/home');
      } else if (act === 'remove') {
        Store.removeChild(el.dataset.name);
        ctx.paint(body());
      }
    },
  };
}

// ── Home ──────────────────────────────────────────────────────────────────

export function homeScreen() {
  const child = Store.getChild();
  const st = Store.streak();
  const weak = Store.weakestTypes(2);
  const stats = Store.stats();

  const focus = weak.length
    ? `<p>Spend your next few sessions on these two.</p>
       ${weak.map((t) => `
         <div class="bar-label"><span>${esc(typeName(t))}</span><span>${stats.byType[t].pct}%</span></div>
         <button class="btn btn--ghost" type="button" data-act="go" data-to="#/practise/${esc(t)}">Practise ${esc(typeName(t))}</button>
       `).join('')}`
    : '<p class="muted">Answer a few more questions and this card will show the two types worth working on.</p>';

  const streakLine = st > 0
    ? `<span class="tag tag--gold">${st} day${st === 1 ? '' : 's'} in a row</span>`
    : '<span class="tag tag--lav">Start a streak today</span>';

  return {
    html: `${header('11+ Non-Verbal Reasoning')}
      <div class="wrap">
        <h2>Hello ${esc(child || 'there')}</h2>
        <p>${streakLine}
           <span class="tag">${stats.overall.attempted} answered</span>
           ${stats.overall.attempted ? `<span class="tag tag--salmon">${stats.overall.pct}% right</span>` : ''}</p>
        <hr class="rule">

        <button class="btn btn--big" type="button" data-act="go" data-to="#/learn">
          Learn<small>How each question type works</small>
        </button>
        <button class="btn btn--big" type="button" data-act="go" data-to="#/practise">
          Practise<small>Ten questions of one type</small>
        </button>
        <button class="btn btn--big" type="button" data-act="go" data-to="#/paper">
          Mock Paper<small>Forty questions in thirty minutes</small>
        </button>
        <button class="btn btn--big btn--ghost" type="button" data-act="go" data-to="#/progress">
          Progress<small>Scores, streak and backup</small>
        </button>

        <hr class="rule">
        <div class="card card--accent">
          <h3>Focus on</h3>
          ${focus}
        </div>

        <button class="btn btn--ghost no-print" type="button" data-act="go" data-to="#/child">Change who is practising</button>
      </div>
      ${footer()}`,
  };
}

// ── Learn ─────────────────────────────────────────────────────────────────

export function learnScreen() {
  const cards = TYPES.map((m) => `
    <div class="card card--accent">
      <h3>${esc(m.name)}</h3>
      <p>${esc(m.blurb)}</p>
      <button class="btn" type="button" data-act="go" data-to="#/learn/${esc(m.id)}">How to do it</button>
    </div>`).join('');

  return {
    html: `${header('Learn', '#/home')}
      <div class="wrap">
        <p>Pick a question type to see how it works and try one.</p>
        <hr class="rule">
        ${cards}
      </div>
      ${footer()}`,
  };
}

/** Teaching page for one type, with a single worked example to try. */
export function teachScreen(typeId) {
  const meta = REGISTRY[typeId] ? REGISTRY[typeId].meta : null;
  const t = teachFor(typeId);

  if (!meta) {
    return {
      html: `${header('Learn', '#/learn')}
        <div class="wrap">
          <h2>Coming soon</h2>
          <p>${t ? esc(t.what) : 'This type is not ready yet.'}</p>
          <button class="btn" type="button" data-act="go" data-to="#/learn">Back to the list</button>
        </div>${footer()}`,
    };
  }

  let q = makeQuestion(typeId, 1, 'teach');
  let done = false;

  function body() {
    const steps = t ? `<ol>${t.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>` : '';
    const tip = t ? `<div class="card"><h4>Tip</h4><p>${esc(t.tip)}</p></div>` : '';
    const after = done
      ? `<div class="explain">${q.explain}</div>
         <button class="btn" type="button" data-act="another">Try another</button>
         <button class="btn btn--ghost" type="button" data-act="go" data-to="#/practise/${esc(typeId)}">Practise ten of these</button>`
      : '';

    return `${header(meta.name, '#/learn')}
      <div class="wrap">
        <h2>${esc(meta.name)}</h2>
        <p>${t ? esc(t.what) : esc(meta.blurb)}</p>
        <hr class="rule">
        <h3>How to do it</h3>
        ${steps}
        ${tip}
        <hr class="rule">
        <h3>Try one</h3>
        <div id="qbox">${questionBody(q)}</div>
        ${after}
      </div>
      ${footer()}`;
  }

  return {
    get html() { return body(); },
    click(el) {
      if (el.dataset.act === 'another') {
        q = makeQuestion(typeId, 1, `teach-${Date.now()}`);
        done = false;
        ctx.paint(body());
        return;
      }
      const opt = el.closest ? el.closest('.opt') : null;
      if (opt && !done) {
        const chosen = Number(opt.dataset.opt);
        Store.recordAnswer({ type: q.type, correct: chosen === q.answer, difficulty: 1, ms: 0 });
        done = true;
        // Repaint first so the explanation and buttons appear, then mark the
        // freshly drawn options.
        ctx.paint(body());
        markOptions(ctx.root, chosen, q.answer);
      }
    },
  };
}

// ── Practise ──────────────────────────────────────────────────────────────

export function practiseMenuScreen() {
  const stats = Store.stats();
  const cards = TYPES.map((m) => {
    const s = stats.byType[m.id];
    const line = s ? `${s.right} of ${s.attempted} right, ${s.pct}%` : 'Not tried yet';
    return `
      <div class="card">
        <h3>${esc(m.name)}</h3>
        <p class="muted">${esc(line)}</p>
        <button class="btn" type="button" data-act="go" data-to="#/practise/${esc(m.id)}">Start ten questions</button>
      </div>`;
  }).join('');

  return {
    html: `${header('Practise', '#/home')}
      <div class="wrap">
        <p>Choose a type. You get ten questions and an explanation after each one.</p>
        <hr class="rule">
        ${cards}
      </div>
      ${footer()}`,
  };
}

const RUN_LENGTH = 10;

export function practiseRunScreen(typeId) {
  if (!REGISTRY[typeId]) {
    return {
      html: `${header('Practise', '#/practise')}
        <div class="wrap"><h2>Not ready yet</h2>
        <p>That question type is still being built.</p>
        <button class="btn" type="button" data-act="go" data-to="#/practise">Choose another</button></div>
        ${footer()}`,
    };
  }

  const name = REGISTRY[typeId].meta.name;
  let i = 0;
  let right = 0;
  let answered = false;
  let chosen = -1;
  let q = null;
  let startedAt = 0;

  // Ramp difficulty across the run so a child warms up before the hard ones.
  function difficultyFor(n) {
    if (n < 3) return 1;
    if (n < 7) return 2;
    return 3;
  }

  function next() {
    q = makeQuestion(typeId, difficultyFor(i), `run-${i}-${Date.now()}`);
    answered = false;
    chosen = -1;
    startedAt = Date.now();
  }

  function summary() {
    const pct = Math.round((right / RUN_LENGTH) * 100);
    return `${header(name, '#/practise')}
      <div class="wrap">
        <h2>Run finished</h2>
        <div class="card card--accent">
          <h3>${right} out of ${RUN_LENGTH}</h3>
          <p class="muted">${pct}% right on ${esc(name)}</p>
        </div>
        <button class="btn" type="button" data-act="again">Another ten</button>
        <button class="btn btn--ghost" type="button" data-act="go" data-to="#/learn/${esc(typeId)}">Read the method again</button>
        <button class="btn btn--ghost" type="button" data-act="go" data-to="#/home">Home</button>
      </div>
      ${footer()}`;
  }

  function body() {
    if (i >= RUN_LENGTH) return summary();
    const after = answered
      ? `<div class="explain">${q.explain}</div>
         <button class="btn" type="button" data-act="next">${i + 1 >= RUN_LENGTH ? 'See your score' : 'Next question'}</button>`
      : '';
    return `${header(name, '#/practise')}
      <div class="wrap">
        <div class="qmeta"><span>Question ${i + 1} of ${RUN_LENGTH}</span><span>${right} right</span></div>
        ${questionBody(q)}
        ${after}
      </div>
      ${footer()}`;
  }

  next();

  return {
    get html() { return body(); },
    click(el) {
      const act = el.dataset.act;
      if (act === 'again') {
        i = 0; right = 0; next();
        ctx.paint(body());
        return;
      }
      if (act === 'next') {
        i += 1;
        if (i < RUN_LENGTH) next();
        ctx.paint(body());
        return;
      }
      const opt = el.closest ? el.closest('.opt') : null;
      if (opt && !answered && i < RUN_LENGTH) {
        chosen = Number(opt.dataset.opt);
        const correct = chosen === q.answer;
        if (correct) right += 1;
        Store.recordAnswer({
          type: q.type,
          correct,
          difficulty: difficultyFor(i),
          ms: Date.now() - startedAt,
        });
        answered = true;
        ctx.paint(body());
        markOptions(ctx.root, chosen, q.answer);
      }
    },
  };
}

// ── Mock paper ────────────────────────────────────────────────────────────

const PAPER_LENGTH = 40;
const PAPER_SECONDS = 30 * 60;

export function paperScreen() {
  let phase = 'intro'; // intro -> running -> done
  let questions = [];
  let answers = [];
  let i = 0;
  let remaining = PAPER_SECONDS;
  let timer = null;
  let startedAt = 0;

  function buildPaper() {
    const ids = TYPES.map((t) => t.id);
    const rng = makeRng(hashSeed(`paper-${Date.now()}-${Math.random()}`));
    const order = [];
    // Round-robin over a shuffled type list, so the paper is evenly spread
    // and never gives a child six of the same type in a row.
    while (order.length < PAPER_LENGTH) {
      shuffle(rng, ids).forEach((id) => { if (order.length < PAPER_LENGTH) order.push(id); });
    }
    questions = order.map((id, n) => {
      const d = n < 12 ? 1 : n < 28 ? 2 : 3;
      return makeQuestion(id, d, `paper-${n}`);
    });
    answers = questions.map(() => -1);
  }

  function tick() {
    remaining -= 1;
    const el = ctx.root && ctx.root.querySelector('#clock');
    if (el) el.textContent = secs(Math.max(0, remaining));
    if (remaining <= 0) finish();
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(tick, 1000);
  }

  function stopTimer() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  function finish() {
    stopTimer();
    phase = 'done';
    const breakdown = {};
    let score = 0;
    questions.forEach((q, n) => {
      if (!breakdown[q.type]) breakdown[q.type] = { right: 0, total: 0 };
      breakdown[q.type].total += 1;
      const got = answers[n] === q.answer;
      if (got) { breakdown[q.type].right += 1; score += 1; }
    });
    Store.recordPaper({
      score,
      total: PAPER_LENGTH,
      seconds: Math.min(PAPER_SECONDS, Math.round((Date.now() - startedAt) / 1000)),
      breakdown,
    });
    ctx.paint(body());
  }

  function intro() {
    return `${header('Mock Paper', '#/home')}
      <div class="wrap">
        <h2>Forty questions, thirty minutes</h2>
        <p>This works like the real test. You get no explanations while you go and you cannot go back. Answer, and it moves straight on.</p>
        <p>If you are not sure, choose your best guess and keep moving. There are no marks lost for a wrong answer.</p>
        <hr class="rule">
        <button class="btn btn--big" type="button" data-act="start">Start the paper</button>
        <button class="btn btn--ghost" type="button" data-act="go" data-to="#/home">Not now</button>
      </div>
      ${footer()}`;
  }

  function running() {
    const q = questions[i];
    return `${header('Mock Paper')}
      <div class="wrap">
        <div class="qmeta">
          <span>Question ${i + 1} of ${PAPER_LENGTH}</span>
          <span id="clock">${secs(Math.max(0, remaining))}</span>
        </div>
        ${questionBody(q)}
        <button class="btn btn--ghost no-print" type="button" data-act="stop">Stop and mark it now</button>
      </div>
      ${footer()}`;
  }

  function results() {
    const breakdown = {};
    let score = 0;
    questions.forEach((q, n) => {
      if (!breakdown[q.type]) breakdown[q.type] = { right: 0, total: 0 };
      breakdown[q.type].total += 1;
      if (answers[n] === q.answer) { breakdown[q.type].right += 1; score += 1; }
    });

    const rows = Object.keys(breakdown).map((t) => {
      const b = breakdown[t];
      const p = Math.round((b.right / b.total) * 100);
      return `<div class="bar-label"><span>${esc(typeName(t))}</span><span>${b.right}/${b.total}</span></div>
              <span class="bar"><span style="width:${p}%"></span></span>`;
    }).join('');

    const review = questions.map((q, n) => {
      const got = answers[n] === q.answer;
      return `<div class="card">
        <div class="bar-label"><span>Question ${n + 1}</span>
        <span class="tag ${got ? '' : 'tag--salmon'}">${got ? 'Right' : 'Wrong'}</span></div>
        <p class="qprompt">${q.prompt}</p>
        ${q.noStimulus ? '' : (q.stimulus || '')}
        ${q.optionsHTML}
        <div class="explain">${q.explain}</div>
      </div>`;
    }).join('');

    return `${header('Paper marked', '#/home')}
      <div class="wrap">
        <div class="card card--accent">
          <h3>${score} out of ${PAPER_LENGTH}</h3>
          <p class="muted">${Math.round((score / PAPER_LENGTH) * 100)}% in ${secs(Math.min(PAPER_SECONDS, PAPER_SECONDS - Math.max(0, remaining)))}</p>
        </div>
        <hr class="rule">
        <h3>By question type</h3>
        ${rows}
        <button class="btn no-print" type="button" data-act="go" data-to="#/progress">See progress</button>
        <button class="btn btn--ghost no-print" type="button" data-act="print">Print this paper</button>
        <hr class="rule">
        <h3>Every question</h3>
        ${review}
      </div>
      ${footer()}`;
  }

  function body() {
    if (phase === 'intro') return intro();
    if (phase === 'running') return running();
    return results();
  }

  return {
    get html() { return body(); },
    click(el) {
      const act = el.dataset.act;
      if (act === 'start') {
        buildPaper();
        phase = 'running';
        i = 0;
        remaining = PAPER_SECONDS;
        startedAt = Date.now();
        ctx.paint(body());
        startTimer();
        return;
      }
      if (act === 'stop') { finish(); return; }
      if (act === 'print') { window.print(); return; }

      const opt = el.closest ? el.closest('.opt') : null;
      if (opt && phase === 'running') {
        const chosen = Number(opt.dataset.opt);
        const q = questions[i];
        answers[i] = chosen;
        // Under test conditions there is no feedback, so the marked options
        // in the review at the end are the first thing the child sees.
        Store.recordAnswer({ type: q.type, correct: chosen === q.answer, difficulty: 2, ms: 0 });
        i += 1;
        if (i >= PAPER_LENGTH) finish();
        else ctx.paint(body());
      }
    },
    destroy() { stopTimer(); },
  };
}

// ── Progress ──────────────────────────────────────────────────────────────

export function progressScreen() {
  let panel = ''; // '', 'export' or 'import'
  let message = '';

  function body() {
    const st = Store.stats();
    const child = Store.getChild();

    const bars = TYPES.map((m) => {
      const s = st.byType[m.id] || { attempted: 0, right: 0, pct: 0 };
      return `
        <div class="bar-label"><span>${esc(m.name)}</span><span>${s.attempted ? `${s.pct}%` : 'not tried'}</span></div>
        <span class="bar"><span style="width:${s.pct}%"></span></span>
        <p class="muted">${s.right} right out of ${s.attempted}</p>`;
    }).join('');

    // Three activity bands, so a glance shows a light day against a full one.
    const strip = st.activity.map((d) => {
      const lvl = d.count === 0 ? '' : d.count < 10 ? 'lvl1' : d.count < 25 ? 'lvl2' : 'lvl3';
      return `<div class="${lvl}" title="${esc(d.date)}: ${d.count}"></div>`;
    }).join('');

    const papers = st.papers.length
      ? st.papers.slice(-5).reverse().map((p) => `
          <div class="bar-label"><span>${esc(p.date)}</span><span>${p.score}/${p.total}</span></div>`).join('')
      : '<p class="muted">No mock papers yet.</p>';

    let panelHTML = '';
    if (panel === 'export') {
      panelHTML = `<div class="card">
        <h4>Backup</h4>
        <p class="muted">Copy all of this text and keep it somewhere safe, or paste it into the restore box on another device.</p>
        <textarea class="input" id="backup" rows="8" readonly>${esc(Store.exportJSON())}</textarea>
      </div>`;
    } else if (panel === 'import') {
      panelHTML = `<div class="card">
        <h4>Restore</h4>
        <p class="muted">Paste a backup here. This replaces everything already saved on this device.</p>
        <textarea class="input" id="restore" rows="8" placeholder="Paste the backup text"></textarea>
        <button class="btn" type="button" data-act="do-import">Restore now</button>
      </div>`;
    }

    return `${header('Progress', '#/home')}
      <div class="wrap">
        <h2>${esc(child || 'Progress')}</h2>
        <p><span class="tag tag--gold">${Store.streak()} day streak</span>
           <span class="tag">${st.overall.attempted} answered</span>
           <span class="tag tag--lav">${st.overall.pct}% right</span></p>

        <hr class="rule">
        <h3>Last fourteen days</h3>
        <div class="strip">${strip}</div>

        <hr class="rule">
        <h3>By question type</h3>
        ${bars}

        <hr class="rule">
        <h3>Recent papers</h3>
        ${papers}

        <hr class="rule">
        <h3>Backup</h3>
        ${message}
        <div class="btn-row no-print">
          <button class="btn btn--ghost" type="button" data-act="export">Export</button>
          <button class="btn btn--ghost" type="button" data-act="import">Restore</button>
        </div>
        ${panelHTML}
      </div>
      ${footer()}`;
  }

  return {
    get html() { return body(); },
    click(el) {
      const act = el.dataset.act;
      if (act === 'export') {
        panel = panel === 'export' ? '' : 'export';
        message = '';
        ctx.paint(body());
      } else if (act === 'import') {
        panel = panel === 'import' ? '' : 'import';
        message = '';
        ctx.paint(body());
      } else if (act === 'do-import') {
        const ta = ctx.root.querySelector('#restore');
        const res = Store.importJSON(ta ? ta.value : '');
        message = res.ok
          ? '<div class="ok">Restored. Progress on this device now matches the backup.</div>'
          : `<div class="err">${esc(res.error)}</div>`;
        if (res.ok) panel = '';
        ctx.paint(body());
      }
    },
  };
}

// ── Settings bits used from more than one screen ──────────────────────────

export function licenceLine() {
  const info = licenceInfo();
  return info ? `Activated on ${esc(info.device)}` : 'Not activated';
}

export { deactivate };
