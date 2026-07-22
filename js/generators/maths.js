// ── Numerical reasoning ───────────────────────────────────────────────────
//
// The Quest maths booklet has a distinctive shape, which this follows: the
// first half is bare arithmetic with no words at all, then it jumps into
// multi-step reasoning. Roughly:
//
//   quick calculation      5 x 12,  7 x 17,  4 x 7 x 25
//   missing box            79 - [] = 25,  2 - [] = 1.67
//   place value            500,000 + 3,000 + 7
//   fractions              1/8 as a decimal, 5/7 = []/84, 1/5 of 410
//   factors, multi-answer  "Choose all of the common factors of 48 and 36"
//   angles                 on a straight line, and on a clock face
//   number puzzles         a missing digit in a long multiplication
//
// Every answer is computed, never written down, and every wrong answer is a
// specific slip: the inverse operation, a place value out, a factor of one
// number but not both. A distractor a child would never write teaches nothing.
//
// Content is pitched at what is covered by the end of Year 5, which is what
// Quest states its maths assumes.

import { pick, int, shuffle } from '../core/rng.js';
import { options, LETTERS } from '../core/render.js';
import { attempt, explain } from './_util.js';
import { DISTRACTOR_COUNT } from '../core/format.js';
import { barChart, compoundArea, cubeVolume, timetable, missingDigit } from './maths-figures.js';

export const meta = {
  id: 'maths',
  name: 'Numerical Reasoning',
  blurb: 'Quick calculations and number problems, the way the real paper mixes them.',
  group: 'quest',
  subject: 'maths',
};

const num = (n) => (Number.isInteger(n) ? n.toLocaleString('en-GB') : String(+n.toFixed(4)));

/** Build a question from a computed answer and a list of computed slips. */
function assemble(rng, { prompt, stimulus, answer, slips, points, chooseAll }) {
  const seen = new Set([String(answer)]);
  const wrong = [];
  for (const s of shuffle(rng, slips)) {
    if (wrong.length >= DISTRACTOR_COUNT) break;
    if (s === null || s === undefined || Number.isNaN(s)) continue;
    const k = String(s);
    if (seen.has(k)) continue;
    seen.add(k);
    wrong.push(s);
  }
  if (wrong.length < DISTRACTOR_COUNT) return null;

  const idx = int(rng, 0, DISTRACTOR_COUNT);
  const opts = wrong.slice();
  opts.splice(idx, 0, answer);

  return {
    prompt,
    stimulus: stimulus || '',
    noStimulus: !stimulus,
    optionsHTML: options(opts.map((v) => `<span class="opt-text opt-sum">${num(v)}</span>`)),
    answer: idx,
    explain: explain(`The answer is <strong>${LETTERS[idx]}</strong>, ${num(answer)}.`, points),
    chooseAll,
  };
}

// ── The question kinds ────────────────────────────────────────────────────

const KINDS = {
  // The second half of the real paper, where a question gives you something
  // to read rather than only something to calculate. These live in
  // maths-figures.js because they each need a drawing.
  barChart,
  compoundArea,
  cubeVolume,
  timetable,
  missingDigit,

  /** 79 - [] = 25. The inverse operation is the whole point. */
  missingBox(rng) {
    const op = pick(rng, ['+', '-', 'x']);
    if (op === 'x') {
      const b = int(rng, 3, 12);
      const answer = int(rng, 3, 12);
      const total = b * answer;
      return {
        prompt: `${total} &divide; &#9723; = ${b}`,
        answer,
        slips: [total - b, total + b, b, Math.round(total / (b + 1)), answer + 1, answer - 1, total * b],
        points: [
          `The missing number times ${b} makes ${total}, so divide: ${total} &divide; ${b} = <strong>${answer}</strong>.`,
          'Check it by multiplying back. That takes two seconds and catches most slips.',
        ],
      };
    }
    const a = int(rng, 30, 199);
    const answer = int(rng, 8, a - 5);
    const result = op === '+' ? a + answer : a - answer;
    return {
      prompt: `${a} ${op === '+' ? '+' : '&minus;'} &#9723; = ${result}`,
      answer,
      slips: [a + result, result - a, a - result + 2, a - result - 2, result, a, Math.abs(result - a) + 10],
      points: [
        op === '+'
          ? `Take ${a} away from ${result}: ${result} &minus; ${a} = <strong>${answer}</strong>.`
          : `The box is what was taken away, so ${a} &minus; ${result} = <strong>${answer}</strong>.`,
        'Put your answer back into the original line and check it works.',
      ],
    };
  },

  /** 7 x 17, or 4 x 7 x 25 where reordering makes it easy. */
  quickCalc(rng) {
    if (rng() < 0.4) {
      // Chosen so that pairing two of them gives a round number.
      const [a, b] = pick(rng, [[4, 25], [2, 50], [5, 20], [8, 125]]);
      const c = int(rng, 3, 9);
      const answer = a * b * c;
      return {
        prompt: `${a} &times; ${c} &times; ${b} =`,
        answer,
        slips: [a * b + c, a + b + c, a * b * (c + 1), a * b * (c - 1), answer / 10, answer + 100],
        points: [
          `Multiply in whatever order is easiest. ${a} &times; ${b} = ${a * b}, and ${a * b} &times; ${c} = <strong>${answer}</strong>.`,
          'Multiplying in a different order never changes the answer, so look for the pair that makes a round number first.',
        ],
      };
    }
    const a = int(rng, 6, 9);
    const b = int(rng, 12, 19);
    const answer = a * b;
    return {
      prompt: `${a} &times; ${b} =`,
      answer,
      slips: [a * (b - 10) + 10, a * b - a, a * b + a, a * b - 10, a * (b + 1), a + b],
      points: [
        `Split the ${b}: ${a} &times; ${b - (b % 10)} = ${a * (b - (b % 10))}, and ${a} &times; ${b % 10} = ${a * (b % 10)}. Add them for <strong>${answer}</strong>.`,
        'Splitting one number into tens and units keeps it in your head without written working.',
      ],
    };
  },

  placeValue(rng) {
    const parts = shuffle(rng, [
      [int(rng, 1, 9) * 100000, 'hundred thousands'],
      [int(rng, 1, 9) * 1000, 'thousands'],
      [int(rng, 1, 9) * 10, 'tens'],
      [int(rng, 1, 9), 'units'],
    ]).slice(0, int(rng, 3, 4));
    const answer = parts.reduce((s, [v]) => s + v, 0);
    const shown = parts.map(([v]) => num(v)).join(' + ');
    return {
      prompt: `${shown} =`,
      answer,
      slips: [
        answer * 10, Math.round(answer / 10),
        answer + 1000, answer - 1000,
        Number(parts.map(([v]) => String(v)[0]).join('')),
        answer + 10000,
      ],
      points: [
        'Line the parts up by their place value and add. It helps to write the columns down rather than doing it in your head.',
        `That gives <strong>${num(answer)}</strong>. A zero in the middle is where marks usually go.`,
      ],
    };
  },

  fractionOfAmount(rng) {
    const den = pick(rng, [3, 4, 5, 6, 8]);
    const numr = int(rng, 1, den - 1);
    const whole = den * int(rng, 8, 40);
    const answer = (whole / den) * numr;
    return {
      prompt: `${numr}/${den} of ${num(whole)} =`,
      answer,
      slips: [whole / den, whole - answer, answer + whole / den, answer - whole / den, whole * numr, Math.round(whole / numr)],
      points: [
        `Divide by the bottom, then times by the top. ${num(whole)} &divide; ${den} = ${num(whole / den)}, and ${num(whole / den)} &times; ${numr} = <strong>${num(answer)}</strong>.`,
        'Doing it the other way round works too, but the numbers stay smaller this way.',
      ],
    };
  },

  equivalentFraction(rng) {
    const a = int(rng, 2, 9);
    const b = int(rng, a + 1, 12);
    const k = int(rng, 3, 12);
    const answer = a * k;
    return {
      prompt: `${a}/${b} = &#9723;/${num(b * k)}`,
      answer,
      slips: [a + k, b * k - a, a * (k + 1), a * (k - 1), b * k - a * k, Math.round((b * k) / a)],
      points: [
        `The bottom went from ${b} to ${num(b * k)}, so it was multiplied by ${k}.`,
        `Do the same to the top: ${a} &times; ${k} = <strong>${answer}</strong>. Whatever you do to one part of a fraction you must do to the other.`,
      ],
    };
  },

  fractionToDecimal(rng) {
    const [numr, den, dec] = pick(rng, [
      [1, 8, 0.125], [3, 8, 0.375], [1, 4, 0.25], [3, 4, 0.75],
      [1, 5, 0.2], [2, 5, 0.4], [1, 2, 0.5], [7, 8, 0.875], [1, 10, 0.1], [3, 5, 0.6],
    ]);
    return {
      prompt: `Write ${numr}/${den} as a decimal.`,
      answer: dec,
      slips: [+(dec * 10).toFixed(4), +(dec / 10).toFixed(4), +(numr / 10).toFixed(4),
        +(den / 100).toFixed(4), +(1 - dec).toFixed(4), +(dec + 0.1).toFixed(4)],
      points: [
        `${numr} &divide; ${den} = <strong>${dec}</strong>.`,
        'The eighths are worth learning by heart: 1/8 is 0.125, and every other eighth is a step of 0.125 from there.',
      ],
    };
  },

  anglesStraightLine(rng) {
    const onLine = rng() < 0.5;
    const total = onLine ? 180 : 360;
    const known = onLine ? [int(rng, 20, 70), int(rng, 20, 70)] : [int(rng, 40, 110), int(rng, 40, 110), int(rng, 30, 80)];
    const answer = total - known.reduce((a, b) => a + b, 0);
    if (answer < 15) return null;
    return {
      prompt: onLine
        ? `Angles of ${known.join('&deg;, ')}&deg; and one more angle sit on a straight line. What is the missing angle?`
        : `Angles of ${known.join('&deg;, ')}&deg; and one more angle meet at a point. What is the missing angle?`,
      answer,
      slips: [total + known.reduce((a, b) => a + b, 0), (onLine ? 360 : 180) - known.reduce((a, b) => a + b, 0),
        answer + 10, answer - 10, 180 - answer, 90 - (answer % 90)],
      points: [
        onLine
          ? 'Angles on a straight line add up to 180 degrees.'
          : 'Angles that meet at a point add up to 360 degrees.',
        `So the missing one is ${total} &minus; ${known.join(' &minus; ')} = <strong>${answer}&deg;</strong>.`,
      ],
    };
  },

  clockAngle(rng) {
    const hour = int(rng, 1, 12);
    // On the hour only, so this stays a Year 5 question.
    const raw = Math.abs(hour * 30 - 0);
    const answer = raw > 180 ? 360 - raw : raw;
    if (answer === 0 || answer === 180) return null;
    const obtuse = answer > 90;
    return {
      prompt: `A clock shows ${hour} o'clock exactly. What is the ${obtuse ? 'obtuse' : 'acute'} angle between the hands?`,
      answer,
      slips: [360 - answer, answer + 30, answer - 30, 180 - answer, hour * 30 + 30, 90],
      points: [
        'There are 12 hours round a clock face and 360 degrees in a full turn, so each hour is 30 degrees.',
        `At ${hour} o'clock the hands are ${hour > 6 ? 12 - hour : hour} hour${(hour > 6 ? 12 - hour : hour) === 1 ? '' : 's'} apart, and ${hour > 6 ? 12 - hour : hour} &times; 30 = <strong>${answer}&deg;</strong>.`,
      ],
    };
  },
};

// ── Common factors: the multi-answer one ──────────────────────────────────

function commonFactors(rng) {
  const base = pick(rng, [12, 16, 18, 24, 36, 48]);
  const other = pick(rng, [24, 30, 36, 40, 48, 60].filter((n) => n !== base));
  const factorsOf = (n) => [...Array(n).keys()].map((i) => i + 1).filter((d) => n % d === 0);
  const fa = factorsOf(base);
  const fb = factorsOf(other);
  const common = fa.filter((d) => fb.includes(d) && d > 1);
  const onlyOne = [...fa, ...fb].filter((d) => d > 1 && !common.includes(d));

  if (common.length < 2 || onlyOne.length < 1) return null;

  // Show five numbers, of which two to four are common factors.
  const showCommon = shuffle(rng, common).slice(0, Math.min(common.length, int(rng, 2, 4)));
  const showOther = shuffle(rng, [...new Set(onlyOne)]).slice(0, 5 - showCommon.length);
  if (showCommon.length + showOther.length !== 5) return null;

  const shown = shuffle(rng, [...showCommon, ...showOther]);
  const answers = shown.map((v, i) => (showCommon.includes(v) ? i : -1)).filter((i) => i >= 0);

  return {
    prompt: `Choose <strong>all</strong> of the common factors of ${base} and ${other}.`,
    noStimulus: true,
    stimulus: '',
    optionsHTML: options(shown.map((v) => `<span class="opt-text opt-sum">${v}</span>`)),
    answers,
    chooseAll: true,
    explain: explain(
      `The answers are <strong>${answers.map((i) => LETTERS[i]).join('</strong>, <strong>')}</strong>.`,
      [
        `A common factor divides into both numbers with nothing left over. ${showCommon.sort((a, b) => a - b).join(', ')} ${showCommon.length === 1 ? 'does' : 'all do'}.`,
        `The others divide into one of them but not both, so they do not count.`,
        'This question asks for all of them, so check every option. Stopping at the first right answer loses the mark.',
      ],
    ),
  };
}

// ── Generator ─────────────────────────────────────────────────────────────

export function generate(rng, difficulty = 2) {
  return attempt(() => {
    // Easier papers stay on the bare-calculation half of the paper.
    const easy = ['missingBox', 'quickCalc', 'placeValue', 'fractionToDecimal', 'barChart', 'timetable'];
    const harder = [...easy, 'fractionOfAmount', 'equivalentFraction', 'anglesStraightLine',
      'clockAngle', 'compoundArea', 'cubeVolume', 'missingDigit'];
    const menu = difficulty === 1 ? easy : harder;

    // The multi-answer factor question is part of the real paper, so it turns
    // up here too rather than being quietly dropped for being awkward.
    if (difficulty >= 2 && rng() < 0.18) {
      const q = commonFactors(rng);
      return q ? { type: 'maths', teachRef: 'maths', ...q } : null;
    }

    const kind = pick(rng, menu);
    const spec = KINDS[kind](rng);
    if (!spec) return null;
    const built = assemble(rng, spec);
    return built ? { type: 'maths', teachRef: 'maths', ...built } : null;
  });
}
