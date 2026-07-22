// ── Teaching content ──────────────────────────────────────────────────────
//
// One entry per question type id in the generator registry. Written for the
// child, not the parent, so it is short, plain and calm.
//
// Each entry: { what, steps: [4 short steps], tip }

export const TEACH = {
  ooo: {
    what: 'Four shapes are shown. Three of them share something. One does not, and that one is your answer.',
    steps: [
      'Look at the four shapes without deciding anything yet.',
      'Check one feature at a time: shape, shading, size, number of dots, line style.',
      'For each feature, ask whether three match and one is different.',
      'The shape that breaks a rule three others follow is the odd one out.',
    ],
    tip: 'If two features both seem to pick out a different shape, look again. Only one feature will separate a single shape from the other three.',
  },

  sim: {
    what: 'A small group of shapes belong together for one reason. You choose the shape from the options that joins the group.',
    steps: [
      'Work out what the group shapes have in common, not what makes them different.',
      'Say the rule out loud in your head, for example every one has four sides.',
      'Test each option against that rule.',
      'Pick the only option that obeys the rule.',
    ],
    tip: 'The right answer often looks nothing like the group at first glance. Trust the rule, not how similar it looks.',
  },

  seq: {
    what: 'Shapes are shown in order and something changes each step. You work out what comes next.',
    steps: [
      'Compare the first shape with the second and name one change.',
      'Check that same change happens again from the second to the third.',
      'Look for a second change running at the same time, such as a turn plus a shade.',
      'Apply every change once more to the last shape shown.',
    ],
    tip: 'Two or three rules can run together. Deal with them one at a time and only then look at the options.',
  },

  ana: {
    what: 'The first shape changes into the second. You do exactly the same thing to the third shape.',
    steps: [
      'Say what happened between the first shape and the second.',
      'Be exact about it, for example turned a quarter turn clockwise.',
      'Do that same change to the third shape in your head.',
      'Find the option that matches what you pictured.',
    ],
    tip: 'Describe the change, not the shapes. Once you can say the change in one short sentence the answer is quick.',
  },

  mat: {
    what: 'A three by three grid has one square missing. You work out what belongs in the gap.',
    steps: [
      'Read the top row from left to right and name what changes.',
      'Check the middle row follows the same pattern.',
      'Now read down the column that has the gap.',
      'The answer must fit both its row and its column.',
    ],
    tip: 'If the rows look confusing, start with the columns instead. One direction is usually easier to see than the other.',
  },

  cod: {
    what: 'Some shapes are labelled with a code. You work out what each letter stands for, then write the code for a new shape.',
    steps: [
      'Look only at the first letter of every code and find what it matches.',
      'Do the same for the second letter, and any letter after that.',
      'Write down what each letter position controls, such as first letter equals shading.',
      'Build the code for the new shape one letter at a time.',
    ],
    tip: 'Each letter position always controls one feature. Never mix positions, so a first letter and a second letter never mean the same thing.',
  },

  ref: {
    what: 'A shape is flipped over a mirror line. You choose the shape that is the true reflection.',
    steps: [
      'Find the mirror line and notice which side of it the shape sits on.',
      'Pick a corner that sticks out and see how far it is from the line.',
      'That corner lands the same distance on the other side.',
      'Check the whole shape has swapped sides, not just turned round.',
    ],
    tip: 'A reflection swaps left and right. If an option could be reached by turning the shape instead, it is not a reflection.',
  },

  rot: {
    what: 'A shape is turned round a point. You choose the shape that shows the right turn.',
    steps: [
      'Decide how far the turn is: a quarter, a half, or three quarters.',
      'Decide the direction, clockwise or anticlockwise.',
      'Pick one part of the shape and follow only that part round.',
      'Check the rest of the shape has come with it in the same way.',
    ],
    tip: 'Turning never swaps left and right. If the shape has come out back to front, that option is a reflection and it is wrong.',
  },

  grid: {
    what: 'A square grid has some parts shaded to make a pattern. You picture the whole grid turned round and choose how it looks afterwards.',
    steps: [
      'Read how far the turn is and which way it goes.',
      'Find one shaded square you can recognise, usually one near a corner.',
      'Work out where that one square lands after the turn.',
      'Check the options and keep only the one where the rest of the pattern fits too.',
    ],
    tip: 'A quarter turn sends the top row to one of the sides. If an option has the top row still along the top, it has been flipped rather than turned, and a flip is never the answer here.',
  },

  fold: {
    what: 'A sheet of paper is folded, then holes are punched through it. You choose what the paper looks like unfolded.',
    steps: [
      'Note where the fold line is and how many folds there are.',
      'Mark the holes you can see on the folded sheet.',
      'Unfold the last fold and mirror every hole across that line.',
      'Keep unfolding one fold at a time until the sheet is flat.',
    ],
    tip: 'Each fold doubles the holes. One fold and two holes gives four holes, so count before you look at the options.',
  },

  cube: {
    what: 'A flat net is folded into a cube. You work out which cube it makes, or which face ends up opposite another.',
    steps: [
      'Choose one face and imagine it as the base of the cube.',
      'Fold the faces next to it up to make the sides.',
      'Faces with one square between them on the net end up opposite each other.',
      'Check the pattern on each face is the right way up as well as in the right place.',
    ],
    tip: 'Opposite faces can never be seen at the same time. If an option shows two faces together that must be opposite, rule it out straight away.',
  },

  cube3d: {
    what: 'A flat net has a symbol on every face. You work out which of the drawn cubes it folds up into.',
    steps: [
      'You can only ever see three faces of a cube at once, so only three symbols need checking.',
      'Find pairs in the net that end up opposite each other. Those two can never be seen together.',
      'Rule out any cube showing an impossible pair straight away.',
      'For the cubes still left, check which way up each symbol sits.',
    ],
    tip: 'A cube can show all the right symbols and still be wrong, because one of them has ended up turned the wrong way. Check the turning last, once you have ruled out the impossible pairs.',
  },

  solid: {
    what: 'A flat net is shown. You work out which 3D shape it folds up into.',
    steps: [
      'Do not try to fold it in your head straight away. Count the pieces first.',
      'Note how many of each shape there are, for example two triangles and three rectangles.',
      'Every face of the finished shape has to come from the net, so the pieces alone usually give it away.',
      'Check your answer by counting the faces of the shape you picked.',
    ],
    tip: 'On a prism, the run of rectangles wraps round the sides and the two matching shapes at the ends become the top and bottom. On a pyramid, there is one base and the rest are triangles meeting at a point.',
  },

  radial: {
    what: 'A ring pattern is built from bands split into equal pieces, like slices of a cake. One piece is missing and you choose the one that belongs there.',
    steps: [
      'Go round the ring and find how often the pattern starts again.',
      'Count that many pieces round from the gap, in either direction.',
      'The piece you land on is the one that belongs in the gap.',
      'Check every band of it, from the middle outwards.',
    ],
    tip: 'The wrong answers usually get all but one band right, so do not stop as soon as the middle matches. Check every band before you choose.',
  },

  vrpair: {
    what: 'Two groups of words are shown in brackets. You pick one word from each group so that the pair means the same thing, or means the opposite.',
    steps: [
      'Read which one it wants: closest in meaning, or opposite meanings.',
      'Take the first word in the left group and try it against all three on the right.',
      'If none fit, move to the second word on the left and do the same.',
      'Remember to choose TWO answers, one from each group.',
    ],
    tip: 'Only one pairing works. If two seem to fit, look again at the exact shade of meaning, and be careful of words that are related but not quite the same.',
  },

  vrlogic: {
    what: 'You are given some facts, and you work out what else has to be true because of them.',
    steps: [
      'Write the names out in a line as you read each fact.',
      'Slide each name left or right until the line fits every fact.',
      'Some names may not have a fixed place, and that is normal.',
      'Check each answer against your line before choosing.',
    ],
    tip: 'Watch the difference between something that MIGHT be true and something that MUST be true. If you can arrange the names in a way that fits the facts but makes an answer false, that answer is not certain.',
  },

  maths: {
    what: 'Number questions. Some are quick calculations to do in your head, and others take several steps.',
    steps: [
      'Read the whole question before starting, especially whether it wants one answer or all of them.',
      'For a missing box, work out which operation undoes the one shown.',
      'For fractions of an amount, divide by the bottom then times by the top.',
      'Put your answer back into the question and check it works.',
    ],
    tip: 'Half the paper is quick arithmetic with no words at all, so speed on times tables and number bonds is worth as much as the harder problems at the end.',
  },

  hid: {
    what: 'A small shape is hidden inside a bigger, busier picture. You find the picture that contains it.',
    steps: [
      'Look hard at the small shape and count its sides and corners.',
      'Notice the length of each side and any unusual angle.',
      'Search each option for that exact outline, the same size and the same way up.',
      'Trace the outline with your finger to be sure every side is there.',
    ],
    tip: 'The hidden shape is never turned or resized. If you have to tilt your head to see it, that is the wrong option.',
  },
};

/** Safe lookup so the learn screen can never blow up on a new type id. */
export function teachFor(id) {
  return TEACH[id] || null;
}

export default TEACH;
