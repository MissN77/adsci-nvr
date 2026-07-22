// ── Licence code generator ────────────────────────────────────────────────
// Mints codes the app will accept, ready to paste into Payhip.
//
//   node tools/make-codes.js 200            print 200 codes
//   node tools/make-codes.js 200 > keys.txt save them to a file
//
// Payhip: product > Digital > Licence keys > "I'll provide my own keys",
// then paste the list. Payhip hands one key to each buyer on their receipt.
//
// The checksum is imported from the app itself rather than reimplemented, so
// the two can never drift apart.

import { checksumBlock } from '../js/core/licence.js';
import { randomInt } from 'node:crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function mint() {
  let block = '';
  // crypto rather than Math.random: these are sold, so two customers getting
  // the same code because of a weak generator would be a real problem.
  for (let i = 0; i < 4; i++) block += ALPHABET[randomInt(ALPHABET.length)];
  return `ADSCI-NVR-${block}-${checksumBlock(block)}`;
}

const want = Number(process.argv[2] || 100);
if (!Number.isInteger(want) || want < 1 || want > 100000) {
  console.error('Usage: node tools/make-codes.js <how many, 1-100000>');
  process.exit(1);
}

// The payload block is only four characters from a 32-character alphabet,
// so there are 32^4 = 1,048,576 possible codes. Warn well before collisions
// start to bite.
if (want > 20000) {
  console.error('Warning: minting more than 20,000 codes from a 1,048,576 code space.');
}

const codes = new Set();
let guard = 0;
while (codes.size < want && guard++ < want * 50) codes.add(mint());

if (codes.size < want) {
  console.error(`Could only mint ${codes.size} unique codes.`);
  process.exit(1);
}

for (const c of codes) console.log(c);
