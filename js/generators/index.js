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
import * as cube3d from './cube3d.js';
import * as solid from './solids.js';
import * as radial from './radial.js';
import * as vrpair from './vr-word-pairs.js';
import * as vrlogic from './vr-logic.js';
import * as vrsent from './vr-sentence.js';
import * as vrgap from './vr-letters.js';
import * as vrodd from './vr-odd-words.js';
import * as vrana from './vr-analogy.js';
import * as maths from './maths.js';
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
  [cube3d.meta.id]: cube3d,
  [solid.meta.id]: solid,
  [radial.meta.id]: radial,
  [vrpair.meta.id]: vrpair,
  [vrana.meta.id]: vrana,
  [vrodd.meta.id]: vrodd,
  [vrsent.meta.id]: vrsent,
  [vrgap.meta.id]: vrgap,
  [vrlogic.meta.id]: vrlogic,
  [maths.meta.id]: maths,
  [hid.meta.id]: hid,
};

export const TYPES = Object.values(REGISTRY).map((g) => g.meta);

/**
 * The two halves of the app.
 *
 * `quest` types appear in the official Quest familiarisation booklet, which
 * is what the Bexley Selection Test uses from the 2026 cycle. `general` types
 * are the older GL-style families. They are not in the Quest non-verbal paper,
 * but they are in most 11+ books and in other areas' tests, so they are worth
 * practising and are kept separate rather than quietly mixed in.
 *
 * Keeping them apart is an honesty measure as much as a navigation one: a
 * parent buying this for Bexley should be able to see which half is which.
 */
export const GROUPS = [
  {
    id: 'quest',
    name: 'Bexley non-verbal',
    note: 'These match the non-verbal question types in the official Bexley familiarisation booklet. Non-verbal reasoning is 25% of the test.',
    types: TYPES.filter((t) => t.group === 'quest' && !t.subject),
  },
  {
    id: 'verbal',
    name: 'Bexley verbal reasoning',
    note: 'Verbal ability and English comprehension together are 50% of the test, the largest part of it. These match the verbal question types in the official booklet.',
    types: TYPES.filter((t) => t.subject === 'verbal'),
  },
  {
    id: 'maths',
    name: 'Bexley numerical reasoning',
    note: 'Numerical reasoning is 25% of the test. Pitched at what is covered by the end of Year 5, which is what the test assumes.',
    types: TYPES.filter((t) => t.subject === 'maths'),
  },
  {
    id: 'general',
    name: 'General 11+ practice',
    note: 'Widely used 11+ reasoning types. They are not in the current Bexley non-verbal paper, but they come up in other areas and in most practice books.',
    types: TYPES.filter((t) => t.group === 'general'),
  },
];

/** Ids used to build a Bexley-shaped mock paper. */
export const PAPER_TYPES = TYPES.filter((t) => t.group === 'quest' && !t.subject).map((t) => t.id);

export function generateFor(id, rng, difficulty) {
  const gen = REGISTRY[id];
  if (!gen) throw new Error(`unknown question type: ${id}`);
  return gen.generate(rng, difficulty);
}
