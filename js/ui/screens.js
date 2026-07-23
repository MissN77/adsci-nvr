// ── Screens ───────────────────────────────────────────────────────────────
//
// Every screen is a plain object:
//   { html, click?(el, ev), change?(el, ev), mounted?(), destroy?() }
//
// No screen attaches its own DOM listeners. app.js owns one delegated
// listener on #app and hands events down, which is why switching screens can
// never leak a handler. Screens that own a timer clean it up in destroy.

import { TYPES, GROUPS, PAPER_SECTIONS, REGISTRY, generateFor } from '../generators/index.js';
import { correctSet, needed, isMulti, isCorrect, instruction } from '../core/answer.js';
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
  return `<p class="qprompt">${q.prompt}</p>${instruction(q) ? `<p class="qpick">${instruction(q)}</p>` : ''}${stim}${q.optionsHTML}`;
}

/**
 * Mark the chosen options and lock the rest.
 * `chosen` and `answer` are both arrays, so this covers "choose two" as well
 * as single-answer questions: every right option is marked right, and any
 * wrong pick the child made is marked wrong.
 */
function markOptions(root, chosen, answer) {
  const want = new Set(answer);
  const got = new Set(chosen);
  root.querySelectorAll('.opt').forEach((el, i) => {
    el.disabled = true;
    el.classList.remove('is-picked');
    if (want.has(i)) el.classList.add('is-correct');
    else if (got.has(i)) el.classList.add('is-wrong');
  });
}

/** Show a part-made choice on a "choose two" question. */
function paintPicked(root, chosen) {
  const got = new Set(chosen);
  root.querySelectorAll('.opt').forEach((el, i) => {
    el.classList.toggle('is-picked', got.has(i));
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
          Mock Paper<small>Twenty questions in twenty minutes</small>
        </button>
        <button class="btn btn--big btn--ghost" type="button" data-act="go" data-to="#/progress">
          Progress<small>Scores, streak and backup</small>
        </button>

        <hr class="rule">
        <div class="card card--accent">
          <h3>Focus on</h3>
          ${focus}
        </div>

        <button class="btn btn--ghost no-print" type="button" data-act="go" data-to="#/settings">Settings, extra time and text size</button>
        <button class="btn btn--ghost no-print" type="button" data-act="go" data-to="#/child">Change who is practising</button>
      </div>
      ${footer()}`,
  };
}

// ── Learn ─────────────────────────────────────────────────────────────────

export function learnScreen() {
  const sections = GROUPS.map((g) => `
    <section class="group">
      <h2 class="group-head">${esc(g.name)}</h2>
      <p class="group-note">${esc(g.note)}</p>
      ${g.types.map((m) => `
        <div class="card card--accent">
          <h3>${esc(m.name)}</h3>
          <p>${esc(m.blurb)}</p>
          <button class="btn" type="button" data-act="go" data-to="#/learn/${esc(m.id)}">How to do it</button>
        </div>`).join('')}
    </section>`).join('');

  return {
    html: `${header('Learn', '#/home')}
      <div class="wrap">
        <p>Pick a question type to see how it works and try one.</p>
        <hr class="rule">
        ${sections}
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
  let picked = [];

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
        picked = [];
        ctx.paint(body());
        return;
      }
      const opt = el.closest ? el.closest('.opt') : null;
      if (opt && !done) {
        const i = Number(opt.dataset.opt);
        // On a "choose two" question the first taps only build the choice up.
        picked = picked.includes(i) ? picked.filter((v) => v !== i) : [...picked, i];
        if (picked.length < needed(q)) { paintPicked(ctx.root, picked); return; }
        Store.recordAnswer({ type: q.type, correct: isCorrect(q, picked), difficulty: 1, ms: 0 });
        done = true;
        const chosen = picked;
        // Repaint first so the explanation and buttons appear, then mark the
        // freshly drawn options.
        ctx.paint(body());
        markOptions(ctx.root, chosen, correctSet(q));
      }
    },
  };
}

// ── Practise ──────────────────────────────────────────────────────────────

export function practiseMenuScreen() {
  const stats = Store.stats();
  const sections = GROUPS.map((g) => `
    <section class="group">
      <h2 class="group-head">${esc(g.name)}</h2>
      <p class="group-note">${esc(g.note)}</p>
      ${g.types.map((m) => {
    const s = stats.byType[m.id];
    const line = s ? `${s.right} of ${s.attempted} right, ${s.pct}%` : 'Not tried yet';
    return `
        <div class="card">
          <h3>${esc(m.name)}</h3>
          <p class="muted">${esc(line)}</p>
          <button class="btn" type="button" data-act="go" data-to="#/practise/${esc(m.id)}">Start ten questions</button>
        </div>`;
  }).join('')}
    </section>`).join('');

  return {
    html: `${header('Practise', '#/home')}
      <div class="wrap">
        <p>Choose a type. You get ten questions and an explanation after each one.</p>
        <hr class="rule">
        ${sections}
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
  let chosen = [];
  let q = null;
  let startedAt = 0;

  // Ramp difficulty across the run so a child warms up before the hard ones.
  function difficultyFor(n) {
    if (n < 3) return 1;
    if (n < 7) return 2;
    return 3;
  }

  // A generator may expose generateSet when its questions belong together.
  // Comprehension does: the real English paper is ONE passage with twelve
  // questions on it, so a run of ten reads one passage, not ten.
  let queue = null;

  // The questions answered wrong in the current pass, kept so the child can go
  // back over the exact ones they missed rather than ten fresh questions. When
  // reviewList is set, the pass IS that review, and getting them wrong again
  // simply collects them for another go.
  let wrongThisPass = [];
  let reviewList = null;

  const total = () => (reviewList ? reviewList.length : RUN_LENGTH);
  const reviewing = () => reviewList !== null;

  function next() {
    if (reviewList) {
      q = reviewList[i];
    } else {
      const gen = REGISTRY[typeId];
      if (typeof gen.generateSet === 'function') {
        if (!queue) {
          const rng = makeRng(hashSeed(`set-${typeId}-${Date.now()}-${Math.random()}`));
          queue = gen.generateSet(rng, RUN_LENGTH);
        }
        q = queue[i % queue.length];
      } else {
        q = makeQuestion(typeId, difficultyFor(i), `run-${i}-${Date.now()}`);
      }
    }
    answered = false;
    chosen = [];
    startedAt = Date.now();
  }

  function summary() {
    const n = total();
    const pct = Math.round((right / n) * 100);
    const missed = wrongThisPass.length;
    const heading = reviewing()
      ? (missed === 0 ? 'All correct this time' : 'Review finished')
      : 'Run finished';
    const reviewBtn = missed > 0
      ? `<button class="btn" type="button" data-act="review">Go over the ${missed} you got wrong</button>`
      : '';
    // After a clean review, offer a fresh run rather than a dead end.
    const againLabel = reviewing() ? 'Start a fresh ten' : 'Another ten';
    return `${header(name, '#/practise')}
      <div class="wrap">
        <h2>${heading}</h2>
        <div class="card card--accent">
          <h3>${right} out of ${n}</h3>
          <p class="muted">${pct}% right on ${esc(name)}</p>
        </div>
        ${reviewBtn}
        <button class="btn ${reviewBtn ? 'btn--ghost' : ''}" type="button" data-act="again">${againLabel}</button>
        <button class="btn btn--ghost" type="button" data-act="go" data-to="#/learn/${esc(typeId)}">Read the method again</button>
        <button class="btn btn--ghost" type="button" data-act="go" data-to="#/home">Home</button>
      </div>
      ${footer()}`;
  }

  function body() {
    if (i >= total()) return summary();
    const canCheck = !answered && isMulti(q) && chosen.length === needed(q);
    // On a wrong multi-answer question, say how many of the set they found,
    // so a child who got two of three is not shown the same as one who got
    // none. The marking stays strict; only the feedback is kinder.
    let partial = '';
    if (answered && isMulti(q) && !isCorrect(q, chosen)) {
      const found = chosen.filter((c) => correctSet(q).includes(c)).length;
      partial = `<p class="qpick">You found ${found} of the ${needed(q)}.</p>`;
    }
    const after = answered
      ? `${partial}<div class="explain" role="status" aria-live="polite">${q.explain}</div>
         <button class="btn" type="button" data-act="next">${i + 1 >= total() ? 'See your score' : 'Next question'}</button>`
      : (canCheck
        ? '<button class="btn" type="button" data-act="check">Check my answer</button>'
        : (isMulti(q)
          ? `<p class="muted">Tap ${needed(q)} answers, then Check. You can change your mind before you check.</p>`
          : ''));
    const counter = reviewing()
      ? `Going over ${i + 1} of ${total()}`
      : `Question ${i + 1} of ${total()}`;
    return `${header(reviewing() ? `${name}, review` : name, '#/practise')}
      <div class="wrap">
        <div class="qmeta"><span>${counter}</span><span>${right} right</span></div>
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
        i = 0; right = 0; queue = null; reviewList = null; wrongThisPass = [];
        next();
        ctx.paint(body());
        return;
      }
      if (act === 'review') {
        // Replay the exact questions missed, not ten fresh ones.
        reviewList = wrongThisPass.slice();
        wrongThisPass = [];
        i = 0; right = 0;
        next();
        ctx.paint(body());
        return;
      }
      if (act === 'next') {
        i += 1;
        if (i < total()) next();
        ctx.paint(body());
        return;
      }
      // On a "choose two" the completing tap used to mark the question
      // instantly. The child has already changed their mind once, because
      // toggling is allowed up to that point, and then the door slams on a
      // misfire with no way back. Multi-answer questions now wait for Check.
      if (act === 'check' && !answered && isMulti(q) && chosen.length === needed(q)) {
        commit();
        return;
      }
      const opt = el.closest ? el.closest('.opt') : null;
      if (opt && !answered && i < total()) {
        const tapped = Number(opt.dataset.opt);
        chosen = chosen.includes(tapped)
          ? chosen.filter((v) => v !== tapped) : [...chosen, tapped];
        if (isMulti(q)) { ctx.paint(body()); paintPicked(ctx.root, chosen); return; }
        if (chosen.length < needed(q)) { paintPicked(ctx.root, chosen); return; }
        commit();
      }
    },
  };

  function commit() {
    const correct = isCorrect(q, chosen);
    if (correct) right += 1;
    else wrongThisPass.push(q);
    // Progress is not recorded during a review pass: these questions were
    // already counted the first time, and counting them twice would tell a
    // parent the child answered more than they did.
    if (!reviewing()) {
      Store.recordAnswer({
        type: q.type,
        correct,
        difficulty: difficultyFor(i),
        ms: Date.now() - startedAt,
      });
    }
    answered = true;
    ctx.paint(body());
    markOptions(ctx.root, chosen, correctSet(q));
  }
}

// ── Settings ──────────────────────────────────────────────────────────────
//
// Extra time is the one that matters. Children with an access arrangement get
// 25% extra in the real Bexley test, and until now the app could not rehearse
// the conditions they will actually sit in.

export function settingsScreen() {
  function body() {
    const p = Store.getPrefs();
    const timeBtn = (mins, label) => `
      <button class="btn ${p.extraTime === mins ? '' : 'btn--ghost'}" type="button"
        data-act="time" data-mins="${mins}" aria-pressed="${p.extraTime === mins}">${label}</button>`;
    const sizeBtn = (v, label) => `
      <button class="btn ${p.textScale === v ? '' : 'btn--ghost'}" type="button"
        data-act="size" data-scale="${v}" aria-pressed="${p.textScale === v}">${label}</button>`;
    return `${header('Settings', '#/home')}
      <div class="wrap">
        <h2>Extra time</h2>
        <p class="muted">If your school has agreed extra time for the real test, set it here so
        practice papers run to the same clock.</p>
        ${timeBtn(0, 'Standard, 20 minutes')}
        ${timeBtn(25, '25% extra, 25 minutes')}
        ${timeBtn(50, '50% extra, 30 minutes')}

        <hr class="rule">
        <h2>Text size</h2>
        <p class="muted">Makes every question bigger without zooming the page.</p>
        ${sizeBtn(1, 'Normal')}
        ${sizeBtn(1.15, 'Larger')}
        ${sizeBtn(1.3, 'Largest')}

        <hr class="rule">
        <h2>The clock</h2>
        <p class="muted">A ticking clock helps some children and worries others. Hiding it does
        not stop the paper being timed.</p>
        <button class="btn ${p.hideTimer ? '' : 'btn--ghost'}" type="button" data-act="clock"
          aria-pressed="${p.hideTimer}">${p.hideTimer ? 'Clock is hidden' : 'Hide the clock'}</button>
      </div>
      ${footer()}`;
  }
  return {
    get html() { return body(); },
    click(el) {
      const act = el.dataset.act;
      if (act === 'time') Store.setPref('extraTime', Number(el.dataset.mins));
      else if (act === 'size') Store.setPref('textScale', Number(el.dataset.scale));
      else if (act === 'clock') Store.setPref('hideTimer', !Store.getPrefs().hideTimer);
      else return;
      ctx.paint(body());
    },
  };
}

// ── Mock paper ────────────────────────────────────────────────────────────

// The official Quest non-verbal booklet is twenty questions in twenty
// minutes, so a mock paper is that, not a round number chosen for us. Pace is
// a separate skill from reasoning and it only transfers if the pace is right.
const PAPER_LENGTH = 20;
const PAPER_BASE_SECONDS = 20 * 60;

/** Standard time plus whatever extra the settings screen has been given. */
function paperSeconds() {
  const extra = Store.getPrefs().extraTime || 0;
  return Math.round(PAPER_BASE_SECONDS * (1 + extra / 100));
}

export function paperScreen() {
  let phase = 'intro'; // intro -> running -> done
  let questions = [];
  let answers = [];
  let i = 0;
  let remaining = paperSeconds();
  let timer = null;
  let startedAt = 0;

  function buildPaper() {
    // Built to the real weighting: half verbal and English, a quarter
    // numerical, a quarter non-verbal. See PAPER_SECTIONS for the source.
    const rng = makeRng(hashSeed(`paper-${Date.now()}-${Math.random()}`));
    const order = [];

    for (const section of PAPER_SECTIONS) {
      const quota = Math.round(PAPER_LENGTH * section.share);
      const picks = [];
      if (section.alsoUpTo) {
        const n = Math.min(section.alsoUpTo.max, Math.floor(quota / 4));
        for (let k = 0; k < n; k += 1) picks.push(section.alsoUpTo.id);
      }
      while (picks.length < quota) {
        shuffle(rng, section.ids).forEach((id) => {
          if (picks.length < quota) picks.push(id);
        });
      }
      order.push(...picks);
    }
    // Interleave so a child never gets a long run of one type, while the
    // section quotas above stay exactly as allocated.
    shuffle(rng, order);
    while (order.length < PAPER_LENGTH) order.push(order[order.length - 1]);
    order.length = PAPER_LENGTH;

    // Comprehension in the paper also comes from a single passage, for the
    // same reason: a twenty question paper should not contain two unrelated
    // seven hundred word texts.
    const compCount = order.filter((id) => id === 'comp').length;
    const compSet = compCount
      ? REGISTRY.comp.generateSet(makeRng(hashSeed(`paperset-${Date.now()}`)), compCount)
      : [];
    let compAt = 0;

    questions = order.map((id, n) => {
      if (id === 'comp' && compSet[compAt]) return compSet[compAt++];
      // Scaled to the paper length. This read `n < 12 ? 1 : n < 28 ? 2 : 3`,
      // and with a twenty question paper the n < 28 branch always won, so
      // difficulty 3 was unreachable and every mock was easy-then-medium
      // with no ceiling to separate the strongest children.
      const frac = n / PAPER_LENGTH;
      const d = frac < 0.4 ? 1 : frac < 0.75 ? 2 : 3;
      return makeQuestion(id, d, `paper-${n}`);
    });
    answers = questions.map(() => -1);
  }

  function tick() {
    remaining -= 1;
    const el = ctx.root && ctx.root.querySelector('#clock');
    // A clock that updates every second is exactly the element some children
    // need to be able to hide. The paper is still timed either way.
    if (el && !Store.getPrefs().hideTimer) el.textContent = secs(Math.max(0, remaining));
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
      const got = isCorrect(q, answers[n] || []);
      if (got) { breakdown[q.type].right += 1; score += 1; }
    });
    Store.recordPaper({
      score,
      total: PAPER_LENGTH,
      seconds: Math.min(paperSeconds(), Math.round((Date.now() - startedAt) / 1000)),
      breakdown,
    });
    ctx.paint(body());
  }

  function intro() {
    return `${header('Mock Paper', '#/home')}
      <div class="wrap">
        <h2>Twenty questions, twenty minutes</h2>
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
          <span id="clock">${Store.getPrefs().hideTimer ? "&#9202;" : secs(Math.max(0, remaining))}</span>
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
      if (isCorrect(q, answers[n] || [])) { breakdown[q.type].right += 1; score += 1; }
    });

    const rows = Object.keys(breakdown).map((t) => {
      const b = breakdown[t];
      const p = Math.round((b.right / b.total) * 100);
      return `<div class="bar-label"><span>${esc(typeName(t))}</span><span>${b.right}/${b.total}</span></div>
              <span class="bar"><span style="width:${p}%"></span></span>`;
    }).join('');

    const review = questions.map((q, n) => {
      const got = isCorrect(q, answers[n] || []);
      return `<div class="card">
        <div class="bar-label"><span>Question ${n + 1}</span>
        <span class="tag ${got ? '' : 'tag--salmon'}">${got ? 'Right' : 'Wrong'}</span></div>
        <p class="qprompt">${q.prompt}</p>${instruction(q) ? `<p class="qpick">${instruction(q)}</p>` : ''}
        ${q.noStimulus ? '' : (q.stimulus || '')}
        ${q.optionsHTML}
        <div class="explain">${q.explain}</div>
      </div>`;
    }).join('');

    return `${header('Paper marked', '#/home')}
      <div class="wrap">
        <div class="card card--accent">
          <h3>${score} out of ${PAPER_LENGTH}</h3>
          <p class="muted">${Math.round((score / PAPER_LENGTH) * 100)}% in ${secs(Math.min(paperSeconds(), paperSeconds() - Math.max(0, remaining)))}</p>
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
        remaining = paperSeconds();
        startedAt = Date.now();
        ctx.paint(body());
        startTimer();
        return;
      }
      if (act === 'stop') { finish(); return; }
      if (act === 'print') { window.print(); return; }

      const opt = el.closest ? el.closest('.opt') : null;
      if (opt && phase === 'running') {
        const tapped = Number(opt.dataset.opt);
        const q = questions[i];
        const so_far = answers[i] || [];
        const picked = so_far.includes(tapped)
          ? so_far.filter((v) => v !== tapped) : [...so_far, tapped];
        answers[i] = picked;
        // On a "choose two" question the child can change their mind until
        // the second tap, then it moves on, the same as tapping once does on
        // a single-answer question.
        if (picked.length < needed(q)) { paintPicked(ctx.root, picked); return; }
        // Under test conditions there is no feedback, so the marked options
        // in the review at the end are the first thing the child sees.
        Store.recordAnswer({ type: q.type, correct: isCorrect(q, picked), difficulty: 2, ms: 0 });
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
