// ── Payhip licence gate ───────────────────────────────────────────────────
//
// THIS IS A COMMERCIAL GATE, NOT SECURITY.
//
// Everything here runs in the browser, so anyone willing to open the console
// can switch it off in under a minute. That is accepted and expected. The
// job of this file is only to make honest purchase the path of least
// resistance for an ordinary parent: the app asks once for the code that
// came with the receipt, stores it, and never asks again. Nothing valuable
// is protected by it, so it must never be treated as an access control.
//
// It also must never get in the way of a paying customer. Once a code has
// been accepted the app works fully offline for ever, with no further calls
// out and no expiry check, because a family on holiday with no signal must
// still be able to practise.

const PREFIX = 'adsci_nvr_';
const K_LICENCE = `${PREFIX}licence`;

/**
 * Payhip licence verification endpoint. Left EMPTY on purpose. It is wired
 * up later when the Payhip product exists and a small proxy is stood up to
 * hold the product key (Payhip's verify call needs a secret that must not
 * ship in a public JS file). While it is empty the offline check below is
 * used instead.
 */
export const ENDPOINT = '';

// ── Offline code format ───────────────────────────────────────────────────
//
//   ADSCI-NVR-BBBB-CCCC
//
// BBBB is the payload block, four characters from ALPHABET, chosen freely by
// whatever generates the codes (batch number, order id, anything).
// CCCC is a checksum of BBBB, computed as follows:
//
//   h = 5381
//   for each character c of BBBB:  h = ((h * 33) ^ charCode(c)) >>> 0
//   CCCC = ALPHABET[h & 31]
//        + ALPHABET[(h >>> 5)  & 31]
//        + ALPHABET[(h >>> 10) & 31]
//        + ALPHABET[(h >>> 15) & 31]
//
// ALPHABET is 32 characters with I, O, 0 and 1 removed, so a code read off a
// receipt over the phone cannot be mistyped into a different valid code.
// A generator written to this spec in any language will match exactly.

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const CODE_RE = /^ADSCI-NVR-([ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4})-([ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4})$/;

/** Checksum block for a four-character payload block. Exported so a code
 *  generator can import it rather than reimplementing the algorithm. */
export function checksumBlock(block) {
  let h = 5381;
  for (let i = 0; i < block.length; i++) {
    h = ((h * 33) ^ block.charCodeAt(i)) >>> 0;
  }
  return ALPHABET[h & 31]
    + ALPHABET[(h >>> 5) & 31]
    + ALPHABET[(h >>> 10) & 31]
    + ALPHABET[(h >>> 15) & 31];
}

/** Tidy what a parent typed: spaces stripped, uppercased, dashes kept. */
export function normaliseCode(input) {
  return String(input || '').toUpperCase().replace(/\s+/g, '');
}

function offlineCheck(code) {
  const m = CODE_RE.exec(code);
  if (!m) return false;
  return checksumBlock(m[1]) === m[2];
}

// ── Storage ───────────────────────────────────────────────────────────────

function read() {
  try {
    const raw = window.localStorage.getItem(K_LICENCE);
    if (!raw) return null;
    const v = JSON.parse(raw);
    return v && typeof v === 'object' && v.code ? v : null;
  } catch (e) {
    return null;
  }
}

function write(rec) {
  try {
    window.localStorage.setItem(K_LICENCE, JSON.stringify(rec));
    return true;
  } catch (e) {
    return false;
  }
}

/** A short label so a parent can tell two devices apart in a support email. */
function deviceLabel() {
  try {
    const ua = navigator.userAgent || '';
    if (/iPad/.test(ua)) return 'iPad';
    if (/iPhone/.test(ua)) return 'iPhone';
    if (/Android/.test(ua)) return 'Android';
    if (/Mac OS X/.test(ua)) return 'Mac';
    if (/Windows/.test(ua)) return 'Windows';
    return 'Browser';
  } catch (e) {
    return 'Browser';
  }
}

export function isActivated() {
  return read() !== null;
}

export function licenceInfo() {
  return read();
}

export function deactivate() {
  try {
    window.localStorage.removeItem(K_LICENCE);
  } catch (e) { /* already gone as far as the app is concerned */ }
}

/**
 * Validate and store a code. Resolves {ok, error}, never rejects, so the UI
 * only has to deal with one shape.
 */
export async function activate(input) {
  const code = normaliseCode(input);
  if (!code) return { ok: false, error: 'Enter the code from your receipt.' };

  let valid = false;

  if (ENDPOINT) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, product: 'adsci-nvr' }),
      });
      const body = await res.json().catch(() => ({}));
      valid = res.ok && body && body.valid === true;
      if (!valid) {
        return { ok: false, error: (body && body.message) || 'That code was not recognised.' };
      }
    } catch (e) {
      // Offline at the moment of first activation. Fall back to the format
      // check rather than blocking a paying parent on a bad connection.
      valid = offlineCheck(code);
      if (!valid) {
        return { ok: false, error: 'Could not check that code. Connect to the internet and try again.' };
      }
    }
  } else {
    valid = offlineCheck(code);
    if (!valid) {
      return { ok: false, error: 'That code does not look right. It should read ADSCI-NVR-XXXX-XXXX.' };
    }
  }

  write({ code, activatedAt: new Date().toISOString(), device: deviceLabel() });
  return { ok: true };
}
