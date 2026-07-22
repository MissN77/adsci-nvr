// ── Paper geometry ────────────────────────────────────────────────────────
// The maths behind the folding questions, kept apart from the question
// building so it can be tested on its own.
//
// A fold is a straight line with one side kept. Folding is therefore two
// operations: the paper is CLIPPED to the half-plane that stays put, and
// anything on the other side is REFLECTED onto it. Unfolding runs the
// reflections backwards.
//
// Writing it this way, rather than as "left half" and "top half", is what
// allows diagonal folds, which the Quest booklet uses and which the first
// version of this could not express at all.

/** A line ax + by = c, with `keep` naming the side that stays put. */
export function line(a, b, c, keep = -1) {
  const len = Math.hypot(a, b);
  return { a: a / len, b: b / len, c: c / len, keep };
}

/** Signed distance from the line. Negative is the "keep" side by convention. */
export const side = (L, [x, y]) => L.a * x + L.b * y - L.c;

/** Mirror a point in a line. */
export function reflect(L, [x, y]) {
  const d = side(L, [x, y]);
  return [+(x - 2 * L.a * d).toFixed(6), +(y - 2 * L.b * d).toFixed(6)];
}

/**
 * Cut a polygon down to one side of a line (Sutherland-Hodgman).
 * Everything here stays convex, so a single polygon always comes back.
 */
export function clip(poly, L) {
  const out = [];
  const inside = (p) => side(L, p) * L.keep >= -1e-9;
  for (let i = 0; i < poly.length; i++) {
    const cur = poly[i];
    const prev = poly[(i + poly.length - 1) % poly.length];
    const curIn = inside(cur);
    const prevIn = inside(prev);
    if (curIn !== prevIn) {
      const dp = side(L, prev);
      const dc = side(L, cur);
      const t = dp / (dp - dc);
      out.push([
        +(prev[0] + t * (cur[0] - prev[0])).toFixed(6),
        +(prev[1] + t * (cur[1] - prev[1])).toFixed(6),
      ]);
    }
    if (curIn) out.push(cur);
  }
  return tidy(out);
}

/**
 * Drop repeated and collinear corners.
 *
 * When a crease runs exactly through a corner of the paper, the clipper emits
 * the intersection point AND the corner itself, so a folded triangle comes
 * back claiming five sides. The area is right either way, but the extra
 * corners make two identical shapes compare as different, which would let
 * duplicate options through.
 */
function tidy(poly) {
  const pts = [];
  for (const p of poly) {
    const last = pts[pts.length - 1];
    if (last && Math.hypot(p[0] - last[0], p[1] - last[1]) < 1e-7) continue;
    pts.push(p);
  }
  if (pts.length > 1) {
    const first = pts[0];
    const last = pts[pts.length - 1];
    if (Math.hypot(first[0] - last[0], first[1] - last[1]) < 1e-7) pts.pop();
  }
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[(i + pts.length - 1) % pts.length];
    const b = pts[i];
    const c = pts[(i + 1) % pts.length];
    const cross = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    if (Math.abs(cross) > 1e-9) out.push(b);
  }
  return out.length >= 3 ? out : pts;
}

export const UNIT_SQUARE = [[0, 0], [1, 0], [1, 1], [0, 1]];

export function area(poly) {
  let s = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i];
    const [x2, y2] = poly[(i + 1) % poly.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
}

/** Shortest distance from a point to the polygon's boundary. */
export function edgeDistance(poly, p) {
  let best = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const vx = b[0] - a[0];
    const vy = b[1] - a[1];
    const len2 = vx * vx + vy * vy || 1;
    let t = ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / len2;
    t = Math.max(0, Math.min(1, t));
    best = Math.min(best, Math.hypot(p[0] - (a[0] + t * vx), p[1] - (a[1] + t * vy)));
  }
  return best;
}

export function contains(poly, p) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if ((yi > p[1]) !== (yj > p[1])
      && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Fold the paper: keep one side, and the rest lands on top of it. */
export const foldOnce = (poly, L) => clip(poly, L);

/**
 * Unfold a set of punched holes.
 * Each fold, undone in reverse, doubles the holes by mirroring them.
 */
export function unfoldHoles(holes, folds) {
  let pts = holes.map((p) => p.slice());
  for (let i = folds.length - 1; i >= 0; i--) {
    pts = dedupePoints([...pts, ...pts.map((p) => reflect(folds[i], p))]);
  }
  return pts;
}

/**
 * Unfold a set of CUTS.
 *
 * A cut removes a half-plane from the folded stack. Undoing a fold mirrors
 * every cut made so far, so the opened sheet is the original square with all
 * those mirrored half-planes taken off it. Because a square minus half-planes
 * stays convex, clipping repeatedly gives the exact final outline with no
 * polygon subtraction needed.
 */
export function unfoldCuts(cuts, folds) {
  let active = cuts.slice();
  for (let i = folds.length - 1; i >= 0; i--) {
    const F = folds[i];
    const mirrored = active.map((C) => {
      // Mirror the line itself: reflect two points on it and rebuild.
      const p1 = pointOn(C);
      const p2 = [p1[0] + C.b, p1[1] - C.a];
      const q1 = reflect(F, p1);
      const q2 = reflect(F, p2);
      const a = q2[1] - q1[1];
      const b = q1[0] - q2[0];
      const c = a * q1[0] + b * q1[1];
      const L = line(a, b, c, 1);
      // Keep whichever side the mirrored kept-point lands on.
      const keptPoint = reflect(F, keepSample(C));
      return { ...L, keep: side(L, keptPoint) >= 0 ? 1 : -1 };
    });
    active = [...active, ...mirrored];
  }
  let poly = UNIT_SQUARE.map((p) => p.slice());
  for (const C of active) poly = clip(poly, C);
  return poly;
}

const pointOn = (L) => [L.a * L.c, L.b * L.c];
const keepSample = (L) => [L.a * L.c + L.a * L.keep * 0.1, L.b * L.c + L.b * L.keep * 0.1];

function dedupePoints(pts) {
  const seen = new Set();
  const out = [];
  for (const p of pts) {
    const k = `${p[0].toFixed(4)},${p[1].toFixed(4)}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(p);
  }
  return out;
}

export const holesKey = (pts) => pts
  .map((p) => `${p[0].toFixed(3)},${p[1].toFixed(3)}`).sort().join('|');

export const polyKey = (poly) => {
  const pts = poly.map((p) => `${p[0].toFixed(3)},${p[1].toFixed(3)}`);
  return pts.slice().sort().join('|');
};
