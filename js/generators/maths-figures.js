// ── Maths questions that need a picture ───────────────────────────────────
//
// The second half of the Quest maths paper stops being bare arithmetic and
// starts giving you something to read: a bar chart, an L-shaped garden, a
// stack of cubes, a train timetable, a long multiplication with a digit
// missing. Those are a different skill. A child who can multiply fluently can
// still lose every one of these marks by misreading an axis.
//
// Everything drawn here carries its numbers as text on the diagram, which is
// what makes the questions checkable: tools/maths-test.js reads the labels
// back out of the rendered SVG and works the answer out again from those,
// rather than from the values the generator happened to pick.

import { pick, int, shuffle } from '../core/rng.js';

const INK = '#1A3A4A';
const FILL = '#9AA7B2';

// ── Bar chart ─────────────────────────────────────────────────────────────

function barChartSVG(labels, values, step) {
  const w = 42;
  const gap = 16;
  const h = 130;
  const max = Math.max(...values);
  const top = Math.ceil(max / step) * step;
  const chartW = labels.length * (w + gap) + gap;
  const scale = h / top;

  const parts = [];
  // Value axis, drawn with real gridlines so the chart can be read.
  for (let v = 0; v <= top; v += step) {
    const y = 20 + h - v * scale;
    parts.push(`<line x1="34" y1="${y.toFixed(1)}" x2="${34 + chartW}" y2="${y.toFixed(1)}" stroke="#C9D2D8" stroke-width="1"/>`);
    parts.push(`<text x="28" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="${INK}">${v}</text>`);
  }
  labels.forEach((label, i) => {
    const x = 34 + gap + i * (w + gap);
    const bh = values[i] * scale;
    parts.push(`<rect x="${x}" y="${(20 + h - bh).toFixed(1)}" width="${w}" height="${bh.toFixed(1)}" fill="${FILL}" stroke="${INK}" stroke-width="2"/>`);
    parts.push(`<text x="${x + w / 2}" y="${20 + h + 18}" text-anchor="middle" font-size="13" fill="${INK}">${label}</text>`);
  });
  parts.push(`<line x1="34" y1="${20 + h}" x2="${34 + chartW}" y2="${20 + h}" stroke="${INK}" stroke-width="2"/>`);
  parts.push(`<line x1="34" y1="20" x2="34" y2="${20 + h}" stroke="${INK}" stroke-width="2"/>`);

  const W = 34 + chartW + 10;
  return `<svg viewBox="0 0 ${W} ${h + 50}" width="${Math.min(W, 320)}" height="${(h + 50) * Math.min(1, 320 / W)}" class="chart" role="img" aria-label="a bar chart with the value printed above each bar">${parts.join('')}</svg>`;
}

export function barChart(rng) {
  const things = pick(rng, [
    { title: 'Books borrowed each day', labels: ['Mon', 'Tue', 'Wed', 'Thu'] },
    { title: 'Cakes sold each day', labels: ['Mon', 'Tue', 'Wed', 'Thu'] },
    { title: 'Visitors each afternoon', labels: ['Mon', 'Tue', 'Wed', 'Thu'] },
  ]);
  const step = pick(rng, [5, 10]);
  const values = things.labels.map(() => int(rng, 1, 9) * step);
  if (new Set(values).size < 3) return null;

  const mode = pick(rng, ['difference', 'total', 'more']);
  const [i, j] = shuffle(rng, [0, 1, 2, 3]).slice(0, 2);

  if (mode === 'total') {
    const answer = values.reduce((a, b) => a + b, 0);
    return {
      prompt: 'Look at the chart. What is the total for all four days?',
      stimulus: `<p class="chart-title">${things.title}</p>${barChartSVG(things.labels, values, step)}`,
      answer,
      slips: [answer - values[0], answer + step, answer - step, Math.max(...values) * 4, answer / 2],
      points: [
        `Add all four bars: ${values.join(' + ')} = <strong>${answer}</strong>.`,
        'Read each bar against the scale before you add anything. The gridlines go up in ' + step + 's here, not in ones.',
      ],
    };
  }
  const answer = Math.abs(values[i] - values[j]);
  if (answer === 0) return null;
  const hi = values[i] > values[j] ? i : j;
  const lo = hi === i ? j : i;
  return {
    prompt: `Look at the chart. How many more on ${things.labels[hi]} than on ${things.labels[lo]}?`,
    stimulus: `<p class="chart-title">${things.title}</p>${barChartSVG(things.labels, values, step)}`,
    answer,
    slips: [values[hi] + values[lo], values[hi], values[lo], answer + step, answer - step, answer / step],
    points: [
      `${things.labels[hi]} is ${values[hi]} and ${things.labels[lo]} is ${values[lo]}, so the difference is ${values[hi]} &minus; ${values[lo]} = <strong>${answer}</strong>.`,
      'The word "more" means subtract. Read both bars off the scale first, then take one from the other.',
    ],
  };
}

// ── Compound area ─────────────────────────────────────────────────────────

export function compoundArea(rng) {
  // An L-shape: a big rectangle with a smaller one cut out of a corner.
  const W = int(rng, 6, 14);
  const H = int(rng, 5, 12);
  const w = int(rng, 2, W - 3);
  const h = int(rng, 2, H - 3);
  const answer = W * H - w * h;

  const s = 13;
  const x = (n) => 20 + n * s;
  const y = (n) => 20 + (H - n) * s;
  const pts = [
    [x(0), y(0)], [x(W), y(0)], [x(W), y(H - h)], [x(W - w), y(H - h)],
    [x(W - w), y(H)], [x(0), y(H)],
  ].map((p) => p.join(',')).join(' ');

  const label = (px, py, t) => `<text x="${px}" y="${py}" text-anchor="middle" font-size="13" font-weight="bold" fill="${INK}">${t}</text>`;
  const svg = `<svg viewBox="0 0 ${x(W) + 40} ${y(0) + 30}" width="${Math.min(x(W) + 40, 300)}" height="${(y(0) + 30) * Math.min(1, 300 / (x(W) + 40))}" class="figure" role="img" aria-label="a diagram with its measurements printed on it">
      <polygon points="${pts}" fill="#EDF1F3" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
      ${label((x(0) + x(W - w)) / 2, y(H) - 8, W - w)}
      ${label(x(0) - 12, (y(0) + y(H)) / 2, H)}
      ${label((x(0) + x(W)) / 2, y(0) + 18, W)}
      ${label(x(W) + 14, (y(0) + y(H - h)) / 2, H - h)}
    </svg>
    <p class="figure-note">The diagram is not drawn to scale. All measurements are in centimetres.</p>`;

  return {
    prompt: 'What is the area of this shape?',
    stimulus: svg,
    answer,
    slips: [W * H, w * h, (W - w) * (H - h), 2 * (W + H), W * H + w * h, W + H],
    points: [
      `Split it into two rectangles. One is ${W - w} by ${H}, the other is ${w} by ${H - h}.`,
      `${(W - w) * H} + ${w * (H - h)} = <strong>${answer}</strong> square centimetres.`,
      'You can also work out the whole rectangle and take away the missing corner. Both give the same answer, so use whichever you find easier to see.',
    ],
  };
}

// ── Volume from a stack of cubes ──────────────────────────────────────────

export function cubeVolume(rng) {
  const a = int(rng, 2, 5);
  const b = int(rng, 2, 4);
  const c = int(rng, 2, 4);
  const count = a * b * c;
  const each = pick(rng, [1, 2]);
  const answer = each === 1 ? count : count * each;

  // Isometric drawing, with the unit cubes marked out on the visible faces.
  const S = 15;
  const px = (i, j, k) => [(i - j) * 0.866 * S, ((i + j) * 0.5 - k) * S];
  const parts = [];
  const face = (corners, fill) => {
    const pts = corners.map(([i, j, k]) => px(i, j, k).map((n) => n.toFixed(1)).join(',')).join(' ');
    parts.push(`<polygon points="${pts}" fill="${fill}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>`);
  };
  for (let i = 0; i < a; i++) for (let j = 0; j < b; j++) face([[i, j, c], [i + 1, j, c], [i + 1, j + 1, c], [i, j + 1, c]], '#F2F6F8');
  for (let i = 0; i < a; i++) for (let k = 0; k < c; k++) face([[i, 0, k], [i + 1, 0, k], [i + 1, 0, k + 1], [i, 0, k + 1]], '#D5DEE3');
  for (let j = 0; j < b; j++) for (let k = 0; k < c; k++) face([[0, j, k], [0, j + 1, k], [0, j + 1, k + 1], [0, j, k + 1]], '#B9C6CD');

  const xs = [];
  const ys = [];
  for (const i of [0, a]) for (const j of [0, b]) for (const k of [0, c]) {
    const [X, Y] = px(i, j, k); xs.push(X); ys.push(Y);
  }
  const pad = 12;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const W = Math.max(...xs) - Math.min(...xs) + pad * 2;
  const Hh = Math.max(...ys) - Math.min(...ys) + pad * 2;

  const svg = `<svg viewBox="${minX} ${minY} ${W} ${Hh}" width="${Math.min(W * 1.6, 250)}" height="${Math.min(Hh * 1.6, 250)}" class="figure" role="img" aria-label="a diagram with its measurements printed on it">${parts.join('')}</svg>`;

  return {
    prompt: each === 1
      ? 'This solid is built from centimetre cubes. What is its volume in cubic centimetres?'
      : `This solid is built from cubes of volume ${each} cubic centimetres. What is its total volume?`,
    stimulus: `${svg}<p class="figure-note">The solid is ${a} cubes long, ${b} cubes deep and ${c} cubes high.</p>`,
    answer,
    slips: [a + b + c, a * b, 2 * (a * b + b * c + a * c), count, count * (each + 1), a * b * c * 2].filter((v) => v !== answer),
    points: [
      `Volume is length times depth times height: ${a} &times; ${b} &times; ${c} = ${count} cubes.`,
      each === 1
        ? `Each cube is 1 cubic centimetre, so the volume is <strong>${answer}</strong> cubic centimetres.`
        : `Each cube is ${each} cubic centimetres, so ${count} &times; ${each} = <strong>${answer}</strong>.`,
      'Count one layer first, then multiply by the number of layers. That is quicker and easier to check than counting every cube.',
    ],
  };
}

// ── Timetable ─────────────────────────────────────────────────────────────

const pad2 = (n) => String(n).padStart(2, '0');
const toMins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
const toTime = (m) => `${pad2(Math.floor(m / 60) % 24)}:${pad2(m % 60)}`;

export function timetable(rng) {
  const stops = ['Ashford', 'Barton', 'Colne', 'Deepdale'];
  const legs = [int(rng, 8, 25), int(rng, 10, 30), int(rng, 7, 20)];
  const starts = [int(rng, 7, 9) * 60 + pick(rng, [0, 15, 30, 45])];
  starts.push(starts[0] + int(rng, 2, 4) * 15);
  starts.push(starts[1] + int(rng, 2, 4) * 15);

  const rows = starts.map((s) => {
    const times = [s];
    legs.forEach((l) => times.push(times[times.length - 1] + l));
    return times;
  });

  const trainIdx = int(rng, 0, 2);
  const total = legs.reduce((a, b) => a + b, 0);

  const head = `<tr><th></th>${rows.map((_, i) => `<th>Train ${i + 1}</th>`).join('')}</tr>`;
  const body = stops.map((stop, r) => `<tr><th>${stop}</th>${rows.map((t) => `<td>${toTime(t[r])}</td>`).join('')}</tr>`).join('');
  const table = `<table class="timetable">${head}${body}</table>`;

  const asJourney = rng() < 0.5;
  if (asJourney) {
    return {
      prompt: `How many minutes does Train ${trainIdx + 1} take to travel from ${stops[0]} to ${stops[3]}?`,
      stimulus: table,
      answer: total,
      slips: [legs[0] + legs[1], legs[1] + legs[2], total + 10, total - 10, total + 60, legs[0]],
      points: [
        `Train ${trainIdx + 1} leaves ${stops[0]} at ${toTime(rows[trainIdx][0])} and reaches ${stops[3]} at ${toTime(rows[trainIdx][3])}.`,
        `From ${toTime(rows[trainIdx][0])} to ${toTime(rows[trainIdx][3])} is <strong>${total} minutes</strong>.`,
        'Work in minutes rather than trying to subtract the times as if they were ordinary numbers, because an hour is sixty, not a hundred.',
      ],
    };
  }
  const legIdx = int(rng, 0, 2);
  return {
    prompt: `How many minutes does Train ${trainIdx + 1} take to get from ${stops[legIdx]} to ${stops[legIdx + 1]}?`,
    stimulus: table,
    answer: legs[legIdx],
    slips: [total, legs[legIdx] + 10, legs[legIdx] - 5, legs[(legIdx + 1) % 3], legs[legIdx] + 60],
    points: [
      `Train ${trainIdx + 1} leaves ${stops[legIdx]} at ${toTime(rows[trainIdx][legIdx])} and arrives at ${stops[legIdx + 1]} at ${toTime(rows[trainIdx][legIdx + 1])}.`,
      `That is <strong>${legs[legIdx]} minutes</strong>.`,
      'Every train on this timetable takes the same time between two stops, so you can check your answer against another column.',
    ],
  };
}

// ── Long multiplication with a missing digit ──────────────────────────────

export function missingDigit(rng) {
  const b = int(rng, 3, 9);
  const a = int(rng, 12, 98);
  const product = a * b;
  const digits = String(a).split('');
  const hide = int(rng, 0, digits.length - 1);
  const answer = Number(digits[hide]);
  // Same tofu-glyph fix as maths.js: U+25FB is missing from some Android font
  // sets and renders as an empty box, so the child cannot tell the placeholder
  // from a bug. Drawn in CSS via .numbox instead.
  const shown = digits.map((d, i) => (i === hide ? '<span class="numbox" aria-label="missing digit"></span>' : d)).join('');

  return {
    prompt: `${shown} &times; ${b} = ${product}. Which digit is missing?`,
    answer,
    slips: [(answer + 1) % 10, (answer + 9) % 10, b, Number(digits[(hide + 1) % digits.length]), (answer + 5) % 10],
    points: [
      `Divide instead of guessing: ${product} &divide; ${b} = ${a}, so the missing digit is <strong>${answer}</strong>.`,
      hide === digits.length - 1
        ? 'For the last digit you can also look at what the units must end in, which is often faster.'
        : 'Working backwards with division is almost always quicker than trying each digit in turn.',
    ],
  };
}
