// ── Generator registry ────────────────────────────────────────────────────
// The single place that knows which question types exist. The app, the mock
// paper builder and the validator all read from here.

import * as seq from './sequences.js';
import * as ooo from './odd-one-out.js';
import * as sim from './similarities.js';
import * as ana from './analogies.js';
import * as mat from './matrices.js';
import * as cod from './codes.js';
import * as ref from './reflection.js';
import * as rot from './rotation.js';
import * as grid from './grid-rotation.js';
import * as fold from './paper-folding.js';
import * as cube from './cubes.js';
import * as hid from './hidden-shapes.js';

// Ordered the way a child should meet them: pattern-spotting first, spatial
// visualisation last.
export const REGISTRY = {
  [ooo.meta.id]: ooo,
  [sim.meta.id]: sim,
  [seq.meta.id]: seq,
  [ana.meta.id]: ana,
  [mat.meta.id]: mat,
  [cod.meta.id]: cod,
  [ref.meta.id]: ref,
  [rot.meta.id]: rot,
  [grid.meta.id]: grid,
  [fold.meta.id]: fold,
  [cube.meta.id]: cube,
  [hid.meta.id]: hid,
};

export const TYPES = Object.values(REGISTRY).map((g) => g.meta);

export function generateFor(id, rng, difficulty) {
  const gen = REGISTRY[id];
  if (!gen) throw new Error(`unknown question type: ${id}`);
  return gen.generate(rng, difficulty);
}
