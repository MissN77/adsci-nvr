// ── Net to solid ──────────────────────────────────────────────────────────
// A flat net is shown. Which of the five drawn solids does it fold into?
//
// This is question 17 of the official Quest non-verbal booklet, "Which shape
// can be made from this net?", where the solids are prisms and wedges rather
// than cubes. The cube version is a separate type, because there the shape is
// known and the work is tracking symbols; here the work is recognising the
// solid from the pieces its surface is made of.
//
// Correctness rests on one fact, checked in code rather than assumed: within
// this set of solids, the MULTISET OF FACES is unique. A net of two triangles
// and three rectangles can only close into a triangular prism; nothing else
// here is built from those pieces. So the correct option is the solid whose
// face signature matches the net, and every other solid is provably wrong.
// tools/solids-test.js asserts that no two solids share a signature, so a
// solid added later cannot quietly create a question with two right answers.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';

export const meta = {
  id: 'solid',
  name: 'Nets to Solids',
  blurb: 'Work out which 3D shape a flat net folds up into.',
};

// ── Geometry helpers ──────────────────────────────────────────────────────

const ngon = (n, r, z, turn = 0) => [...Array(n)].map((_, i) => {
  const a = (i / n) * Math.PI * 2 + turn;
  return [r * Math.cos(a), r * Math.sin(a), z];
});

/** A prism: an n-gon swept upwards. Faces wound outwards. */
function prism(n, r, h) {
  const bottom = ngon(n, r, -h / 2);
  const top = ngon(n, r, h / 2);
  const verts = [...bottom, ...top];
  const faces = [];
  faces.push([...Array(n).keys()].map((i) => n + i));              // top
  faces.push([...Array(n).keys()].map((i) => n - 1 - i));          // bottom
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    faces.push([i, j, n + j, n + i]);
  }
  return { verts, faces };
}

/** A pyramid: an n-gon base with an apex above its centre. */
function pyramid(n, r, h) {
  const base = ngon(n, r, -h / 2);
  const verts = [...base, [0, 0, h / 2]];
  const faces = [];
  faces.push([...Array(n).keys()].map((i) => n - 1 - i));          // base
  for (let i = 0; i < n; i++) faces.push([i, (i + 1) % n, n]);
  return { verts, faces };
}

/** A cuboid, square in plan, taller or shorter than it is wide. */
function cuboid(w, h) {
  const b = [[-w, -w, -h], [w, -w, -h], [w, w, -h], [-w, w, -h]];
  const t = b.map(([x, y]) => [x, y, h]);
  return {
    verts: [...b, ...t],
    faces: [[4, 5, 6, 7], [3, 2, 1, 0], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]],
  };
}

// ── The solids ────────────────────────────────────────────────────────────
// `faces` is the signature: what the net is made of, in plain words.

export const SOLIDS = [
  {
    id: 'cube', name: 'cube',
    faces: { square: 6 },
    model: () => cuboid(0.55, 0.55),
    net: { kind: 'prism', n: 4, square: true },
  },
  {
    id: 'cuboid', name: 'cuboid',
    faces: { square: 2, rectangle: 4 },
    model: () => cuboid(0.45, 0.8),
    net: { kind: 'prism', n: 4, square: false },
  },
  {
    id: 'triprism', name: 'triangular prism',
    faces: { triangle: 2, rectangle: 3 },
    model: () => prism(3, 0.7, 1.1),
    net: { kind: 'prism', n: 3 },
  },
  {
    id: 'pentprism', name: 'pentagonal prism',
    faces: { pentagon: 2, rectangle: 5 },
    model: () => prism(5, 0.65, 1.0),
    net: { kind: 'prism', n: 5 },
  },
  {
    id: 'hexprism', name: 'hexagonal prism',
    faces: { hexagon: 2, rectangle: 6 },
    model: () => prism(6, 0.62, 1.0),
    net: { kind: 'prism', n: 6 },
  },
  {
    id: 'sqpyramid', name: 'square-based pyramid',
    faces: { square: 1, triangle: 4 },
    model: () => pyramid(4, 0.72, 1.15),
    net: { kind: 'pyramid', n: 4 },
  },
  {
    id: 'tetra', name: 'triangle-based pyramid',
    faces: { triangle: 4 },
    model: () => pyramid(3, 0.75, 1.2),
    net: { kind: 'pyramid', n: 3 },
  },
  {
    id: 'pentpyramid', name: 'pentagon-based pyramid',
    faces: { pentagon: 1, triangle: 5 },
    model: () => pyramid(5, 0.68, 1.15),
    net: { kind: 'pyramid', n: 5 },
  },
  {
    id: 'cylinder', name: 'cylinder',
    faces: { circle: 2, 'curved rectangle': 1 },
    model: () => prism(24, 0.6, 1.1),
    curved: true,
    net: { kind: 'cylinder' },
  },
  {
    id: 'cone', name: 'cone',
    faces: { circle: 1, 'curved sector': 1 },
    model: () => pyramid(24, 0.7, 1.2),
    curved: true,
    net: { kind: 'cone' },
  },
];

/** Canonical description of what a solid's surface is made of. */
export function signature(solid) {
  return Object.entries(solid.faces).sort().map(([k, v]) => `${v}x${k}`).join('+');
}

/** Plain-English list, for the explanation. */
function facesInWords(solid) {
  const bits = Object.entries(solid.faces).map(([shape, n]) => {
    const plural = n === 1 ? shape : `${shape}s`;
    return `${n} ${plural}`;
  });
  if (bits.length === 1) return bits[0];
  return `${bits.slice(0, -1).join(', ')} and ${bits[bits.length - 1]}`;
}

// ── Drawing the solid ─────────────────────────────────────────────────────

const VIEW = [0.9, 0.55, 0.75];

function project(v, size) {
  return [
    (v[0] - v[1]) * 0.83 * size,
    ((v[0] + v[1]) * 0.42 - v[2]) * size,
  ];
}

/** Outline of a set of 2D points. Every solid here is convex, so the convex
 *  hull is exactly its silhouette. */
function hull(points) {
  const pts = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const half = (src) => {
    const out = [];
    for (const p of src) {
      while (out.length >= 2) {
        const [ax, ay] = out[out.length - 2];
        const [bx, by] = out[out.length - 1];
        if ((bx - ax) * (p[1] - ay) - (by - ay) * (p[0] - ax) > 0) break;
        out.pop();
      }
      out.push(p);
    }
    return out;
  };
  const lower = half(pts);
  const upper = half(pts.slice().reverse());
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

function solidSVG(solid, size = 46) {
  const { verts, faces } = solid.model();
  const parts = [];

  const shaded = faces.map((f) => {
    const pts = f.map((i) => verts[i]);
    // Outward normal from the first three corners.
    const [a, b, c] = pts;
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const w = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const nrm = [
      u[1] * w[2] - u[2] * w[1],
      u[2] * w[0] - u[0] * w[2],
      u[0] * w[1] - u[1] * w[0],
    ];
    const facing = nrm[0] * VIEW[0] + nrm[1] * VIEW[1] + nrm[2] * VIEW[2];
    const depth = pts.reduce((s, p) => s + p[0] * VIEW[0] + p[1] * VIEW[1] + p[2] * VIEW[2], 0) / pts.length;
    return { pts, facing, depth, nrm };
  });

  // Only the faces turned towards the viewer, painted far to near so the
  // near ones cover the ones behind. A solid drawn without hidden-line
  // removal reads as a wireframe, which is a different question.
  shaded.filter((f) => f.facing > 0)
    .sort((a, b) => a.depth - b.depth)
    .forEach((f) => {
      // Shade by how square-on the face is, so the form reads at a glance.
      const len = Math.hypot(...f.nrm) || 1;
      const lit = f.facing / (len * Math.hypot(...VIEW));
      const grey = Math.round(255 - 70 * Math.max(0, Math.min(1, lit)));
      const fill = `rgb(${grey},${grey + 4},${grey + 8})`;
      const poly = f.pts.map((p) => project(p, size).map((n) => n.toFixed(2)).join(',')).join(' ');
      // A cylinder and a cone are drawn from many flat strips. Stroking every
      // strip makes them look like folded fans, so on curved solids only the
      // shading is drawn here and the outline is added afterwards.
      const edge = solid.curved ? 'stroke="none"' : 'stroke="#1A3A4A" stroke-width="2" stroke-linejoin="round"';
      parts.push(`<polygon points="${poly}" fill="${fill}" ${edge}/>`);
    });

  if (solid.curved) {
    const outline = hull(verts.map((v) => project(v, size)));
    parts.push(`<polygon points="${polyPts(outline)}" fill="none" stroke="#1A3A4A" stroke-width="2" stroke-linejoin="round"/>`);
    // The rim of a cylinder sits inside its silhouette and has to be drawn
    // or the shape reads as a flat blob.
    if (solid.id === 'cylinder') {
      const n = verts.length / 2;
      const rim = verts.slice(n).map((v) => project(v, size));
      parts.push(`<polygon points="${polyPts(rim)}" fill="#F7F9FA" stroke="#1A3A4A" stroke-width="2" stroke-linejoin="round"/>`);
    }
  }

  const r = size * 1.9;
  return `<svg viewBox="${-r} ${-r} ${r * 2} ${r * 2}" width="${size * 2.4}" height="${size * 2.4}" class="solid">${parts.join('')}</svg>`;
}

// ── Drawing the net ───────────────────────────────────────────────────────

const polyPts = (pts) => pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
const FACE = 'fill="#FFFFFF" stroke="#1A3A4A" stroke-width="2" stroke-linejoin="round"';

/**
 * Draw the net.
 *
 * Every solid has more than one net, and the same net drawn at a different
 * angle looks quite different to a ten year old. Without this the whole type
 * had only ten possible pictures, one per solid, and a child would have met
 * all of them inside a week. Where a prism's end caps attach, and how the
 * whole net is turned, both vary.
 */
function netSVG(solid, rng, unit = 34) {
  const { kind, n, square } = solid.net;
  const prims = [];
  const poly = (pts) => prims.push({ pts });
  const disc = (cx, cy, r) => prims.push({ circle: [cx, cy, r] });

  if (kind === 'prism') {
    const w = unit;
    const h = square === false ? unit * 1.5 : unit;
    for (let i = 0; i < n; i++) {
      poly([[i * w, 0], [(i + 1) * w, 0], [(i + 1) * w, h], [i * w, h]]);
    }
    // The two caps can hang off any of the rectangles, one above and one
    // below, which is what makes the same prism produce many different nets.
    const capR = (w / 2) / Math.sin(Math.PI / n);
    const inset = capR * Math.cos(Math.PI / n);
    const capAt = (col, above) => {
      const cx = col * w + w / 2;
      const cy = above ? -inset : h + inset;
      return [...Array(n)].map((_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n;
        return [cx + capR * Math.cos(a), cy + (above ? 1 : -1) * capR * Math.sin(a)];
      });
    };
    poly(capAt(int(rng, 0, n - 1), true));
    poly(capAt(int(rng, 0, n - 1), false));
  } else if (kind === 'pyramid') {
    const r = unit * 0.78;
    const turn = (int(rng, 0, n - 1) / n) * Math.PI * 2;
    const base = [...Array(n)].map((_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2 + turn;
      return [r * Math.cos(a), r * Math.sin(a)];
    });
    poly(base);
    for (let i = 0; i < n; i++) {
      const a = base[i];
      const b = base[(i + 1) % n];
      const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const len = Math.hypot(mid[0], mid[1]) || 1;
      const slant = unit * 0.95;
      poly([a, b, [mid[0] + (mid[0] / len) * slant, mid[1] + (mid[1] / len) * slant]]);
    }
  } else if (kind === 'cylinder') {
    const band = unit * 2.6;
    const h = unit;
    poly([[0, 0], [band, 0], [band, h], [0, h]]);
    const rr = unit * 0.42;
    // Both circles on one side, or one at each end.
    if (rng() < 0.5) {
      disc(-rr - 4, h / 2, rr);
      disc(band + rr + 4, h / 2, rr);
    } else {
      disc(band * 0.3, -rr - 4, rr);
      disc(band * 0.7, h + rr + 4, rr);
    }
  } else if (kind === 'cone') {
    const R = unit * 1.35;
    const sweep = Math.PI * (1.05 + rng() * 0.45);
    const start = -Math.PI / 2 - sweep / 2 + (rng() - 0.5);
    // The sector is drawn as a fine polygon so it turns with everything else.
    const arc = [[0, 0]];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const a = start + (i / steps) * sweep;
      arc.push([R * Math.cos(a), R * Math.sin(a)]);
    }
    poly(arc);
    const rr = unit * 0.5;
    disc(R + rr + 10, 0, rr);
  }

  // Turn the whole net. A quarter turn changes the picture a lot without
  // changing the answer at all.
  const spin = (int(rng, 0, 3) * Math.PI) / 2;
  const cs = Math.cos(spin);
  const sn = Math.sin(spin);
  const spun = prims.map((pr) => {
    if (pr.circle) {
      const [cx, cy, r] = pr.circle;
      return { circle: [cx * cs - cy * sn, cx * sn + cy * cs, r] };
    }
    return { pts: pr.pts.map(([x, y]) => [x * cs - y * sn, x * sn + y * cs]) };
  });

  let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity;
  const see = (x, y) => {
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  };
  spun.forEach((pr) => {
    if (pr.circle) {
      const [cx, cy, r] = pr.circle;
      see(cx - r, cy - r); see(cx + r, cy + r);
    } else pr.pts.forEach(([x, y]) => see(x, y));
  });

  const parts = spun.map((pr) => (pr.circle
    ? `<circle cx="${pr.circle[0].toFixed(2)}" cy="${pr.circle[1].toFixed(2)}" r="${pr.circle[2].toFixed(2)}" ${FACE}/>`
    : `<polygon points="${polyPts(pr.pts)}" ${FACE}/>`));

  const pad = 8;
  const w = maxX - minX + pad * 2;
  const h = maxY - minY + pad * 2;
  const scale = Math.min(1, 280 / w, 210 / h);
  return `<svg viewBox="${minX - pad} ${minY - pad} ${w} ${h}" width="${(w * scale).toFixed(0)}" height="${(h * scale).toFixed(0)}" class="net">${parts.join('')}</svg>`;
}

// ── Generator ─────────────────────────────────────────────────────────────

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    // Easier papers avoid the curved solids and the two pyramids that are
    // easily muddled; harder papers use everything.
    const menu = difficulty === 1
      ? SOLIDS.filter((s) => ['cube', 'triprism', 'sqpyramid', 'cylinder', 'cuboid'].includes(s.id))
      : SOLIDS;

    const correct = pick(rng, menu);
    const sig = signature(correct);

    // Wrong options are solids with a DIFFERENT face signature. Same
    // signature would mean two correct answers, so it is excluded rather
    // than hoped against.
    const wrong = shuffle(rng, SOLIDS.filter((s) => signature(s) !== sig));
    if (wrong.length < DISTRACTOR_COUNT) return null;
    const distractors = wrong.slice(0, DISTRACTOR_COUNT);

    const idx = int(rng, 0, DISTRACTOR_COUNT);
    const opts = distractors.slice();
    opts.splice(idx, 0, correct);

    return {
      type: 'solid',
      prompt: 'Which shape can be made from this net?',
      stimulus: `<div class="stim-row">${netSVG(correct, rng)}</div>`,
      optionsHTML: options(opts.map((s) => solidSVG(s))),
      answer: idx,
      explain: explain(
        `The answer is <strong>${LETTERS[idx]}</strong>, a ${correct.name}.`,
        [
          `Count the pieces in the net before looking at the shapes. This net has ${facesInWords(correct)}.`,
          'Every face of the finished solid has to come from somewhere in the net, so the pieces tell you the answer on their own.',
          'A quick check on prisms: the flat run of rectangles wraps round the sides, and the two matching shapes at the ends become the top and the bottom.',
        ],
      ),
      teachRef: 'solid',
    };
  });
}
