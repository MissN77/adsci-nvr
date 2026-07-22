// ── Figure model + SVG renderer ───────────────────────────────────────────
//
// A Figure is a plain object. Every NVR question is built from Figures, and
// every rule is a function that changes ONE named attribute of a Figure.
//
//   { shape, fill, rot, scale, dots, stroke, mirrored }
//
// The two properties that matter most for question CORRECTNESS are:
//
//   symOrder(shape)  how many rotations of a shape look identical. The old
//                    app asked "which diamond is rotated 90 degrees?", a
//                    question with no visible answer. Rotation rules must
//                    only ever use shapes with symOrder 1.
//
//   isChiral(shape)  whether a shape's mirror image can be reached by
//                    rotating it. Reflection questions are only meaningful
//                    for chiral shapes, otherwise the "reflection" is just
//                    a rotation and several options are equally correct.

// ── Unit polygons ─────────────────────────────────────────────────────────
// All defined in a -1..1 box, centred on the origin, y increasing downwards
// (SVG convention).

function regular(n, offsetDeg = -90) {
  return [...Array(n)].map((_, i) => {
    const a = ((i * 360) / n + offsetDeg) * Math.PI / 180;
    return [Math.cos(a), Math.sin(a)];
  });
}

function star(points, innerRatio) {
  const pts = [];
  for (let i = 0; i < points * 2; i++) {
    const a = ((i * 180) / points - 90) * Math.PI / 180;
    const r = i % 2 === 0 ? 1 : innerRatio;
    pts.push([r * Math.cos(a), r * Math.sin(a)]);
  }
  return pts;
}

export const SHAPES = {
  circle: { poly: null, sym: Infinity, chiral: false, label: 'circle' },
  oval: { poly: null, sym: 2, chiral: false, label: 'oval', rx: 1, ry: 0.6 },

  tri: { poly: regular(3), sym: 3, chiral: false, label: 'triangle' },
  sq: { poly: regular(4, -45), sym: 4, chiral: false, label: 'square' },
  pent: { poly: regular(5), sym: 5, chiral: false, label: 'pentagon' },
  hex: { poly: regular(6), sym: 6, chiral: false, label: 'hexagon' },
  hept: { poly: regular(7), sym: 7, chiral: false, label: 'heptagon' },
  oct: { poly: regular(8), sym: 8, chiral: false, label: 'octagon' },

  // Rhombus, taller than wide, so a 90 degree turn IS visible (unlike a
  // square rotated 45, which the old app wrongly treated as a diamond).
  diamond: { poly: [[0, -1], [0.62, 0], [0, 1], [-0.62, 0]], sym: 2, chiral: false, label: 'diamond' },

  star5: { poly: star(5, 0.45), sym: 5, chiral: false, label: 'five-point star' },
  star6: { poly: star(6, 0.55), sym: 6, chiral: false, label: 'six-point star' },

  cross: {
    poly: [[-0.34, -1], [0.34, -1], [0.34, -0.34], [1, -0.34], [1, 0.34],
      [0.34, 0.34], [0.34, 1], [-0.34, 1], [-0.34, 0.34], [-1, 0.34],
      [-1, -0.34], [-0.34, -0.34]],
    sym: 4, chiral: false, label: 'cross',
  },

  // Arrow points right. Mirroring it in a vertical line gives a left-pointing
  // arrow, which is the same as rotating it 180, so it is NOT chiral and
  // must never be used for reflection questions.
  arrow: {
    poly: [[-1, -0.32], [0.15, -0.32], [0.15, -0.75], [1, 0], [0.15, 0.75],
      [0.15, 0.32], [-1, 0.32]],
    sym: 1, chiral: false, label: 'arrow',
  },

  trap: { poly: [[-0.55, -0.75], [0.55, -0.75], [1, 0.75], [-1, 0.75]], sym: 1, chiral: false, label: 'trapezium' },

  // ── Chiral shapes: mirror image is NOT any rotation of the original ─────
  rtri: { poly: [[-0.9, 0.9], [0.9, 0.9], [-0.9, -0.9]], sym: 1, chiral: true, label: 'right-angled triangle' },

  flag: {
    poly: [[-0.75, -1], [-0.75, 1], [-0.45, 1], [-0.45, -0.1], [0.9, -0.1],
      [0.9, -1]],
    sym: 1, chiral: true, label: 'flag',
  },

  ell: {
    poly: [[-0.8, -1], [-0.2, -1], [-0.2, 0.4], [0.9, 0.4], [0.9, 1], [-0.8, 1]],
    sym: 1, chiral: true, label: 'L-shape',
  },

  zed: {
    poly: [[-0.9, -0.9], [0.9, -0.9], [0.9, -0.4], [-0.1, 0.4], [0.9, 0.4],
      [0.9, 0.9], [-0.9, 0.9], [-0.9, 0.4], [0.1, -0.4], [-0.9, -0.4]],
    sym: 1, chiral: true, label: 'Z-shape',
  },

  para: { poly: [[-0.55, -0.7], [1, -0.7], [0.55, 0.7], [-1, 0.7]], sym: 2, chiral: true, label: 'parallelogram' },
};

export const ALL_SHAPES = Object.keys(SHAPES);

/** Shapes where EVERY rotation is visible. Rotation rules must use these. */
export const ROT_SAFE = ALL_SHAPES.filter((s) => SHAPES[s].sym === 1);

/** Shapes whose mirror image is not a rotation. Reflection rules use these. */
export const CHIRAL = ALL_SHAPES.filter((s) => SHAPES[s].chiral);

/** Regular polygons, ordered by side count, for "number of sides" rules. */
export const BY_SIDES = { 3: 'tri', 4: 'sq', 5: 'pent', 6: 'hex', 7: 'hept', 8: 'oct' };

/** Smallest rotation (degrees) that is visible on this shape. */
export function minVisibleRot(shape) {
  const sym = SHAPES[shape].sym;
  return sym === Infinity ? Infinity : 360 / sym;
}

/** True if rotating `shape` by `deg` produces a visibly different figure. */
export function rotationVisible(shape, deg) {
  const step = minVisibleRot(shape);
  if (step === Infinity) return false;
  const d = ((deg % 360) + 360) % 360;
  return Math.abs(d % step) > 0.01 && Math.abs((d % step) - step) > 0.01;
}

// ── Fills ─────────────────────────────────────────────────────────────────
// Ordered light to dark. "Shade" rules step along this list, so the
// progression is always visually monotonic.

export const FILL_SCALE = ['white', 'light', 'grey', 'dark', 'black'];

const FILL_PAINT = {
  // Outline-only, for composite figures where shapes must show through
  // each other. Not part of FILL_SCALE, so no rule can ever select it.
  none: 'none',
  white: '#FFFFFF',
  light: '#DCE3E8',
  grey: '#9AA7B2',
  dark: '#556A78',
  black: '#1A3A4A',
};

/** Non-scale fills, used for "pattern" rules rather than "shade" rules. */
export const FILL_PATTERNS = ['hatchH', 'hatchV', 'hatchD', 'dotted'];

export const ALL_FILLS = [...FILL_SCALE, ...FILL_PATTERNS];

export const STROKES = ['thin', 'thick', 'dashed'];

// ── Figure construction ───────────────────────────────────────────────────

export function fig(shape, opts = {}) {
  return {
    shape,
    fill: opts.fill ?? 'white',
    rot: opts.rot ?? 0,
    scale: opts.scale ?? 1,
    dots: opts.dots ?? 0,
    stroke: opts.stroke ?? 'thin',
    mirrored: opts.mirrored ?? false,
  };
}

export function withAttr(f, attr, value) {
  return { ...f, [attr]: value };
}

/**
 * Structural equality. Two figures that render identically must compare
 * equal, so rotation is normalised against the shape's symmetry, a hexagon
 * at 0 and at 60 degrees are the SAME figure and must never both appear as
 * options.
 */
export function sameFigure(a, b) {
  if (a.shape !== b.shape) return false;
  if (a.fill !== b.fill) return false;
  if (Math.abs(a.scale - b.scale) > 0.001) return false;
  if (a.dots !== b.dots) return false;
  if (a.stroke !== b.stroke) return false;

  const step = minVisibleRot(a.shape);
  if (step === Infinity) {
    // A circle looks the same at every angle and its mirror is itself.
    return true;
  }
  const norm = (d) => (((d % step) + step) % step);
  if (Math.abs(norm(a.rot) - norm(b.rot)) > 0.01) return false;

  // For achiral shapes, mirroring is equivalent to some rotation, which the
  // check above has already normalised away.
  if (SHAPES[a.shape].chiral && a.mirrored !== b.mirrored) return false;
  return true;
}

/** True if any two figures in the list render identically. */
export function hasDuplicate(figs) {
  for (let i = 0; i < figs.length; i++) {
    for (let j = i + 1; j < figs.length; j++) {
      if (sameFigure(figs[i], figs[j])) return true;
    }
  }
  return false;
}

// ── Rendering ─────────────────────────────────────────────────────────────

let patternsInjected = false;

/** Pattern fills have to live in a <defs> block once per document. */
export function patternDefs() {
  return `
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <pattern id="p-hatchH" width="8" height="8" patternUnits="userSpaceOnUse">
    <rect width="8" height="8" fill="#fff"/>
    <path d="M0 4 H8" stroke="#1A3A4A" stroke-width="1.6"/>
  </pattern>
  <pattern id="p-hatchV" width="8" height="8" patternUnits="userSpaceOnUse">
    <rect width="8" height="8" fill="#fff"/>
    <path d="M4 0 V8" stroke="#1A3A4A" stroke-width="1.6"/>
  </pattern>
  <pattern id="p-hatchD" width="8" height="8" patternUnits="userSpaceOnUse">
    <rect width="8" height="8" fill="#fff"/>
    <path d="M0 8 L8 0" stroke="#1A3A4A" stroke-width="1.6"/>
  </pattern>
  <pattern id="p-dotted" width="9" height="9" patternUnits="userSpaceOnUse">
    <rect width="9" height="9" fill="#fff"/>
    <circle cx="4.5" cy="4.5" r="1.7" fill="#1A3A4A"/>
  </pattern>
</defs></svg>`;
}

export function ensurePatterns() {
  if (patternsInjected) return;
  document.body.insertAdjacentHTML('afterbegin', patternDefs());
  patternsInjected = true;
}

function paintFor(fill) {
  if (FILL_PAINT[fill]) return FILL_PAINT[fill];
  return `url(#p-${fill})`;
}

function strokeAttrs(stroke) {
  if (stroke === 'thick') return 'stroke="#1A3A4A" stroke-width="5"';
  if (stroke === 'dashed') return 'stroke="#1A3A4A" stroke-width="2.5" stroke-dasharray="7 5"';
  return 'stroke="#1A3A4A" stroke-width="2.5"';
}

/**
 * Render one figure as SVG markup, centred at (cx, cy) with base radius r.
 * Returns markup only, no outer <svg>, so figures can be composed.
 */
export function figureMarkup(f, cx, cy, r) {
  const def = SHAPES[f.shape];
  const R = r * f.scale;
  const paint = paintFor(f.fill);
  const sa = strokeAttrs(f.stroke);

  let body;
  if (f.shape === 'circle') {
    body = `<circle cx="0" cy="0" r="${R}" fill="${paint}" ${sa}/>`;
  } else if (f.shape === 'oval') {
    body = `<ellipse cx="0" cy="0" rx="${R * def.rx}" ry="${R * def.ry}" fill="${paint}" ${sa}/>`;
  } else {
    const pts = def.poly.map(([x, y]) => `${(x * R).toFixed(2)},${(y * R).toFixed(2)}`).join(' ');
    body = `<polygon points="${pts}" fill="${paint}" ${sa}/>`;
  }

  // Dots sit inside the shape, laid out symmetrically so they never
  // accidentally give away an orientation the question does not intend.
  let dots = '';
  if (f.dots > 0) {
    const positions = dotPositions(f.dots, R * 0.42);
    dots = positions
      .map(([x, y]) => `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(R * 0.13).toFixed(2)}" fill="#1A3A4A"/>`)
      .join('');
  }

  // Order matters: mirror first (about the figure's own vertical axis),
  // then rotate. This matches how a real reflected-then-turned shape behaves.
  const mirror = f.mirrored ? ' scale(-1,1)' : '';
  return `<g transform="translate(${cx},${cy}) rotate(${f.rot})${mirror}">${body}${dots}</g>`;
}

function dotPositions(n, spread) {
  switch (n) {
    case 1: return [[0, 0]];
    case 2: return [[-spread * 0.6, 0], [spread * 0.6, 0]];
    case 3: return [[-spread * 0.8, spread * 0.45], [spread * 0.8, spread * 0.45], [0, -spread * 0.6]];
    case 4: return [[-spread * 0.6, -spread * 0.6], [spread * 0.6, -spread * 0.6],
      [-spread * 0.6, spread * 0.6], [spread * 0.6, spread * 0.6]];
    default: return [];
  }
}

/** A single figure in its own square SVG box, the standard option tile. */
export function figureSVG(f, size = 100) {
  const c = size / 2;
  const r = size * 0.33;
  return `<svg viewBox="0 0 ${size} ${size}" class="fig" role="img" aria-label="${describe(f)}">${figureMarkup(f, c, c, r)}</svg>`;
}

/** Plain-English description, used as the SVG accessible label. */
export function describe(f) {
  const bits = [];
  if (f.fill !== 'white') bits.push(f.fill.replace('hatch', '').toLowerCase());
  bits.push(SHAPES[f.shape].label);
  if (f.dots) bits.push(`with ${f.dots} dot${f.dots > 1 ? 's' : ''}`);
  if (f.rot) bits.push(`turned ${f.rot} degrees`);
  return bits.join(' ');
}
