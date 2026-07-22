// ── Solids self-check ─────────────────────────────────────────────────────
// The net-to-solid question is only sound because, within this set, the faces
// a solid is made of identify it uniquely. If two solids ever shared a face
// signature, a net could fold into either and the question would have two
// right answers with nothing in the code to notice.
//
// So the property the question depends on is asserted here rather than
// assumed, and anyone adding a solid later gets told immediately.

import { SOLIDS, signature } from '../js/generators/solids.js';

let failures = 0;

// 1. Signatures must be unique.
const bySig = new Map();
for (const s of SOLIDS) {
  const sig = signature(s);
  if (bySig.has(sig)) {
    console.log(`✗ ${s.id} and ${bySig.get(sig)} are both "${sig}"`);
    failures++;
  } else {
    bySig.set(sig, s.id);
  }
}
console.log(`${failures === 0 ? '✅' : '❌'} ${SOLIDS.length} solids, ${bySig.size} distinct face signatures`);

// 2. Euler's formula, as a check that each model is a closed solid rather
//    than a bag of loose polygons: vertices minus edges plus faces is 2.
for (const s of SOLIDS) {
  const { verts, faces } = s.model();
  const edges = new Set();
  for (const f of faces) {
    for (let i = 0; i < f.length; i++) {
      const a = f[i];
      const b = f[(i + 1) % f.length];
      edges.add(a < b ? `${a}-${b}` : `${b}-${a}`);
    }
  }
  const chi = verts.length - edges.size + faces.length;
  const ok = chi === 2;
  if (!ok) failures++;
  console.log(
    `${ok ? '  ' : '✗ '}${s.id.padEnd(13)} V=${String(verts.length).padStart(3)} `
    + `E=${String(edges.size).padStart(3)} F=${String(faces.length).padStart(3)}  V-E+F=${chi}`,
  );
}

// 3. Every face count in the signature must match the model, for the solids
//    drawn with their true number of faces. The curved ones are approximated
//    with many flat faces on purpose, so they are exempt.
const CURVED = new Set(['cylinder', 'cone']);
for (const s of SOLIDS) {
  if (CURVED.has(s.id)) continue;
  const declared = Object.values(s.faces).reduce((a, b) => a + b, 0);
  const actual = s.model().faces.length;
  if (declared !== actual) {
    console.log(`✗ ${s.id}: net says ${declared} faces, model has ${actual}`);
    failures++;
  }
}

console.log(failures === 0 ? '\nSolids are consistent.' : `\n${failures} problems.`);
process.exit(failures === 0 ? 0 : 1);
