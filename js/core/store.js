// ── Progress store ────────────────────────────────────────────────────────
//
// localStorage only. No accounts, no cloud, no analytics. A parent buys this
// once and it works on a train with no signal, so there is nothing to sync
// and nothing to lose if the shop ever goes away.
//
// Layout of the namespace:
//   adsci_nvr_children   ["Jacob","Ava"]
//   adsci_nvr_current    "Jacob"
//   adsci_nvr_child_Jacob {days:{...}, papers:[...]}
//
// Every read is wrapped, because localStorage throws in private browsing on
// some iOS builds and a thrown quota error must never take the app down.

const PREFIX = 'adsci_nvr_';
const K_CHILDREN = `${PREFIX}children`;
const K_CURRENT = `${PREFIX}current`;
const childKey = (name) => `${PREFIX}child_${name}`;

// Days older than this are dropped on write. Three months is more than the
// 14-day strip and the streak need, and it keeps the record small enough to
// export as JSON in an email.
const KEEP_DAYS = 120;

function readRaw(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function writeRaw(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

function removeRaw(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (e) { /* nothing sensible to do, carry on */ }
}

function readJSON(key, fallback) {
  const raw = readRaw(key);
  if (!raw) return fallback;
  try {
    const v = JSON.parse(raw);
    return v === null || v === undefined ? fallback : v;
  } catch (e) {
    // Corrupt entry, most likely a half-finished import. Start clean rather
    // than crashing on every screen for ever after.
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    return writeRaw(key, JSON.stringify(value));
  } catch (e) {
    return false;
  }
}

// ── Dates ─────────────────────────────────────────────────────────────────
// Local dates, not UTC. A child practising at 9pm should see it counted
// against the day they are living in.

function dayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function shiftDay(key, delta) {
  const [y, m, d] = key.split('-').map(Number);
  const dt = new Date(y, m - 1, d + delta);
  return dayKey(dt);
}

// ── Child records ─────────────────────────────────────────────────────────

function emptyRecord() {
  return { days: {}, papers: [] };
}

function normaliseName(name) {
  return String(name || '').trim().slice(0, 24);
}

function listChildren() {
  const v = readJSON(K_CHILDREN, []);
  return Array.isArray(v) ? v.filter((n) => typeof n === 'string') : [];
}

function saveChildren(list) {
  writeJSON(K_CHILDREN, list);
}

function getChild() {
  const cur = readRaw(K_CURRENT);
  const all = listChildren();
  if (cur && all.includes(cur)) return cur;
  return all.length ? all[0] : null;
}

function setChild(name) {
  const n = normaliseName(name);
  if (!n) return null;
  if (!listChildren().includes(n)) addChild(n);
  writeRaw(K_CURRENT, n);
  return n;
}

function addChild(name) {
  const n = normaliseName(name);
  if (!n) return null;
  const all = listChildren();
  if (!all.includes(n)) {
    all.push(n);
    saveChildren(all);
    writeJSON(childKey(n), emptyRecord());
  }
  if (!readRaw(K_CURRENT)) writeRaw(K_CURRENT, n);
  return n;
}

function removeChild(name) {
  const n = normaliseName(name);
  const all = listChildren().filter((c) => c !== n);
  saveChildren(all);
  removeRaw(childKey(n));
  if (readRaw(K_CURRENT) === n) {
    if (all.length) writeRaw(K_CURRENT, all[0]);
    else removeRaw(K_CURRENT);
  }
  return all;
}

function load(name) {
  const who = name || getChild();
  if (!who) return emptyRecord();
  const rec = readJSON(childKey(who), null);
  if (!rec || typeof rec !== 'object') return emptyRecord();
  return {
    days: rec.days && typeof rec.days === 'object' ? rec.days : {},
    papers: Array.isArray(rec.papers) ? rec.papers : [],
  };
}

function prune(rec) {
  const cutoff = shiftDay(dayKey(), -KEEP_DAYS);
  Object.keys(rec.days).forEach((k) => {
    if (k < cutoff) delete rec.days[k];
  });
  // Papers are few and parents like seeing the history, so keep more of them.
  if (rec.papers.length > 60) rec.papers = rec.papers.slice(-60);
  return rec;
}

function save(rec, name) {
  const who = name || getChild();
  if (!who) return false;
  return writeJSON(childKey(who), prune(rec));
}

// ── Recording ─────────────────────────────────────────────────────────────

/**
 * One answered question. Called for practice runs and for every question in
 * a mock paper, so per-type accuracy reflects everything the child has done.
 */
function recordAnswer({ type, correct, difficulty = 2, ms = 0 }) {
  if (!type) return;
  const rec = load();
  const k = dayKey();
  if (!Array.isArray(rec.days[k])) rec.days[k] = [];
  rec.days[k].push({
    t: String(type),
    c: correct ? 1 : 0,
    d: Number(difficulty) || 2,
    ms: Math.max(0, Math.round(Number(ms) || 0)),
  });
  save(rec);
}

/** A finished mock paper. `breakdown` is {typeId: {right, total}}. */
function recordPaper({ score, total, seconds, breakdown }) {
  const rec = load();
  rec.papers.push({
    date: dayKey(),
    at: Date.now(),
    score: Number(score) || 0,
    total: Number(total) || 0,
    seconds: Math.round(Number(seconds) || 0),
    breakdown: breakdown && typeof breakdown === 'object' ? breakdown : {},
  });
  save(rec);
}

// ── Reading back ──────────────────────────────────────────────────────────

function pct(right, attempted) {
  return attempted ? Math.round((right / attempted) * 100) : 0;
}

/**
 * Per-type accuracy, an overall line, and the last 14 days of activity
 * (oldest first) for the strip on the progress screen.
 */
function stats(name) {
  const rec = load(name);
  const byType = {};
  let attempted = 0;
  let right = 0;

  Object.keys(rec.days).forEach((k) => {
    rec.days[k].forEach((a) => {
      if (!byType[a.t]) byType[a.t] = { attempted: 0, right: 0, pct: 0, ms: 0 };
      byType[a.t].attempted += 1;
      byType[a.t].right += a.c;
      byType[a.t].ms += a.ms;
      attempted += 1;
      right += a.c;
    });
  });

  Object.keys(byType).forEach((t) => {
    byType[t].pct = pct(byType[t].right, byType[t].attempted);
    byType[t].avgMs = byType[t].attempted
      ? Math.round(byType[t].ms / byType[t].attempted)
      : 0;
  });

  const activity = [];
  let k = shiftDay(dayKey(), -13);
  for (let i = 0; i < 14; i++) {
    const day = rec.days[k] || [];
    activity.push({
      date: k,
      count: day.length,
      right: day.reduce((s, a) => s + a.c, 0),
    });
    k = shiftDay(k, 1);
  }

  return {
    byType,
    overall: { attempted, right, pct: pct(right, attempted) },
    activity,
    papers: rec.papers.slice(),
  };
}

/**
 * The n weakest types. A type needs at least 8 attempts before it can be
 * called weak, otherwise one unlucky guess would send a child off to revise
 * something they are actually fine at.
 */
function weakestTypes(n = 2, name) {
  const { byType } = stats(name);
  return Object.keys(byType)
    .filter((t) => byType[t].attempted >= 8)
    .sort((a, b) => byType[a].pct - byType[b].pct)
    .slice(0, Math.max(0, n));
}

/** Consecutive days with any activity, counting back from today. */
function streak(name) {
  const rec = load(name);
  let k = dayKey();
  // A child who has not practised yet today has not broken anything, so the
  // count starts from yesterday in that case.
  if (!rec.days[k] || !rec.days[k].length) k = shiftDay(k, -1);
  let n = 0;
  while (rec.days[k] && rec.days[k].length) {
    n += 1;
    k = shiftDay(k, -1);
  }
  return n;
}

// ── Backup ────────────────────────────────────────────────────────────────

function exportJSON() {
  const out = {
    app: 'adsci-nvr',
    version: 1,
    exportedAt: new Date().toISOString(),
    current: readRaw(K_CURRENT) || null,
    children: {},
  };
  listChildren().forEach((c) => { out.children[c] = load(c); });
  return JSON.stringify(out, null, 2);
}

/**
 * Replaces the whole progress namespace. Returns {ok, error} so the caller
 * can show a plain message rather than a thrown stack.
 */
function importJSON(str) {
  let data;
  try {
    data = JSON.parse(str);
  } catch (e) {
    return { ok: false, error: 'That file is not readable. Check you pasted the whole thing.' };
  }
  if (!data || data.app !== 'adsci-nvr' || !data.children || typeof data.children !== 'object') {
    return { ok: false, error: 'That is not a backup from this app.' };
  }

  const names = Object.keys(data.children).map(normaliseName).filter(Boolean);
  if (!names.length) return { ok: false, error: 'That backup has no children in it.' };

  // Clear first so a restore is a true replace, not a merge with whatever
  // the device already had.
  listChildren().forEach((c) => removeRaw(childKey(c)));
  saveChildren(names);

  names.forEach((n) => {
    const rec = data.children[n] || {};
    writeJSON(childKey(n), prune({
      days: rec.days && typeof rec.days === 'object' ? rec.days : {},
      papers: Array.isArray(rec.papers) ? rec.papers : [],
    }));
  });

  const cur = normaliseName(data.current);
  writeRaw(K_CURRENT, names.includes(cur) ? cur : names[0]);
  return { ok: true };
}

export const Store = {
  PREFIX,
  getChild,
  setChild,
  listChildren,
  addChild,
  removeChild,
  recordAnswer,
  recordPaper,
  stats,
  weakestTypes,
  streak,
  exportJSON,
  importJSON,
  dayKey,
};

export default Store;
