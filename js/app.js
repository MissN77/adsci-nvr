// ── App shell and router ──────────────────────────────────────────────────
//
// One delegated click listener on #app, for the whole life of the page.
// Screens never attach listeners of their own, so switching screens cannot
// leave a stale handler behind holding on to an old screen's state. The
// router simply swaps which screen object receives the delegated events.

import { ensurePatterns } from './core/figure.js';
import { Store } from './core/store.js';
import { isActivated } from './core/licence.js';
import {
  initScreens,
  licenceScreen,
  childScreen,
  homeScreen,
  learnScreen,
  teachScreen,
  practiseMenuScreen,
  practiseRunScreen,
  paperScreen,
  progressScreen,
} from './ui/screens.js';

const root = document.getElementById('app');

let current = null;

/** Replace the markup without touching the current screen's lifecycle. */
function paint(html) {
  root.innerHTML = html;
}

function go(hash) {
  if (window.location.hash === hash) route();
  else window.location.hash = hash;
}

initScreens({ root, paint, go });

/** Swap screens, giving the outgoing one a chance to clear its timers. */
function mount(screen) {
  if (current && typeof current.destroy === 'function') current.destroy();
  current = screen;
  paint(screen.html);
  if (typeof screen.mounted === 'function') screen.mounted();
  window.scrollTo(0, 0);
}

// ── Routing ───────────────────────────────────────────────────────────────

function parseHash() {
  const raw = (window.location.hash || '').replace(/^#\/?/, '');
  const parts = raw.split('/').filter(Boolean);
  return { name: parts[0] || 'home', arg: parts[1] || null };
}

function route() {
  // The two gates come before everything else. A parent who has not entered
  // a code, or has not said who is practising, cannot reach a question.
  if (!isActivated()) { mount(licenceScreen()); return; }
  if (!Store.getChild()) { mount(childScreen()); return; }

  const { name, arg } = parseHash();

  switch (name) {
    case 'learn':
      mount(arg ? teachScreen(arg) : learnScreen());
      break;
    case 'practise':
      mount(arg ? practiseRunScreen(arg) : practiseMenuScreen());
      break;
    case 'paper':
      mount(paperScreen());
      break;
    case 'progress':
      mount(progressScreen());
      break;
    case 'child':
      mount(childScreen());
      break;
    case 'home':
    default:
      mount(homeScreen());
      break;
  }
}

// ── The single delegated listener ─────────────────────────────────────────

root.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-act], .opt');
  if (!el) return;

  // Navigation is handled centrally so no screen has to know about the hash.
  if (el.dataset && el.dataset.act === 'go' && el.dataset.to) {
    ev.preventDefault();
    go(el.dataset.to);
    return;
  }

  if (current && typeof current.click === 'function') current.click(el, ev);
});

// Enter in a text field should do the obvious thing on a phone keyboard.
root.addEventListener('keydown', (ev) => {
  if (ev.key !== 'Enter') return;
  const field = ev.target;
  if (!field || field.tagName !== 'INPUT' || !field.dataset.enter) return;
  ev.preventDefault();
  const btn = root.querySelector(`button[data-act="${field.dataset.enter}"]`);
  if (btn) btn.click();
});

window.addEventListener('hashchange', route);

// ── Boot ──────────────────────────────────────────────────────────────────

// Pattern fills live in a single <defs> block, so this must run once before
// any figure is drawn or hatched shapes render as plain white.
ensurePatterns();
route();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // Offline support is a nice to have. A failed registration, usually a
      // file:// origin during local testing, must not stop the app.
    });
  });
}
