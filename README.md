# 11+ Non-Verbal Reasoning, Advisory Science

A standalone practice app for the non-verbal reasoning part of the Bexley 11+
paper. Sold to parents. Works offline once opened, installs to a phone home
screen, keeps all progress on the device.

This is a **separate product** from `~/myapps/jacob-11plus-tutor`. That app is
untouched and Jacob can keep using it. Nothing here shares its repo, its
Supabase project, or its data.

---

## What a parent gets

- **Eleven question types** covering the standard non-verbal and spatial
  reasoning families: odd one out, similarities, sequences, analogies,
  matrices, codes, reflection, rotation, paper folding, nets and cubes,
  hidden shapes.
- **Questions are generated, not stored.** There is no bank of 150 questions to
  memorise. Every practice run is newly built, so a child can practise the same
  type every day for months without repeating a paper.
- **Three difficulty levels** per type, which stack extra rules rather than just
  shrinking the shapes.
- **Teaching screens** for every type, written for a ten year old.
- **Timed mock papers**, 40 questions in 30 minutes, no feedback until the end.
- **Progress tracking** per child, several children per device, with a weakest
  topics card on the home screen.

---

## Selling it

### 1. Mint licence codes

```bash
node tools/make-codes.js 200 > keys.txt
```

Codes look like `ADSCI-NVR-K7QM-F7SK`. The alphabet has no I, O, 0 or 1 in it,
so a code read out over the phone cannot be mistyped into a different valid one.

### 2. Load them into Payhip

Product → Digital → Licence keys → "I'll provide my own keys" → paste `keys.txt`.
Payhip gives each buyer one key on their receipt.

### 3. Sell the link

The buyer opens the app URL, types the code once, and never sees it again. After
that the app is fully offline, so a family with no signal can still practise.

### Be straight with buyers about what the gate is

The licence check runs in the browser. Anyone who wants to get past it can, in
about a minute, with the developer console. It exists to make buying the easy
path, not to stop a determined person. Do not describe it as secure or as
copy protected, because it is neither.

To connect Payhip's real verification later, set `ENDPOINT` in
`js/core/licence.js` to a small proxy that holds the Payhip product key. The key
must not ship in the page.

---

## Checking it still works

Three layers, because the failure that matters is silent. A question with two
correct answers does not throw an error, it just quietly costs a child marks and
costs you a refund.

```bash
node tools/geometry-test.js      # the shape table matches the actual geometry
npm run validate                 # generates 30,000 questions per type
node tools/preview.js 3          # writes preview.html to eyeball the questions
```

Then open `selftest.html` in a browser and press the button. That one matters
most: it renders questions into a real page and measures the shapes the browser
actually draws, which is the only way to catch two options that differ in the
code while looking identical on screen. Both bugs found late in the build were
of exactly that kind and only this check saw them.

Run all four before any release.

---

## How the questions are built

`js/generators/*.js`, one file per type, registered in `js/generators/index.js`.

A question is never hand written. A rule is chosen, the correct answer is
computed from it, and the wrong answers are computed from the SAME rule applied
slightly wrongly. A distractor therefore cannot accidentally also be correct,
and each wrong answer maps to a real mistake a child makes, which is what the
explanation then names.

The guards that keep questions fair:

| Risk | Guard |
|---|---|
| Rotation invisible because the shape is symmetric | rotation rules only run on shapes whose symmetry order is 1, checked against real geometry |
| "Reflection" that is really just a turn | reflection only uses shapes whose mirror is a clear distance from every rotation of themselves |
| Odd one out with two possible answers | every set is audited, and thrown away unless exactly one feature singles out exactly one figure |
| Two options that render identically | `sameFigure` compares what is drawn, not the stored values, and folds mirroring into rotation for shapes where a flip is a turn |
| Cube net questions with wrong answers | nets are folded by simulation; verified to find exactly the 11 valid nets, and to satisfy the adjacency and opposite-face rules across all 760 placements |
| Paper folding answers guessed by hand | punches are mirrored back across each crease in reverse order, so the answer is correct by construction |
| A child learning that the answer is usually C | answer position is randomised and the spread is asserted in `tools/validate.js` |

### The one honest caveat

**Hidden shapes** is the only type where a determined child could argue for a
second answer. Overlapping outlines cut each other into pieces, and one of those
pieces might resemble another option. It is kept fair by giving every option a
different kind of outline, and by asking about complete traceable outlines, but
unlike the other ten types this is a design mitigation rather than a proof. If
you would rather not ship it, remove the `hid` line from
`js/generators/index.js` and everything else carries on working.

---

## Files

```
index.html          shell
selftest.html       in-browser correctness checks, run before every release
css/app.css         house style, no rounded corners, no shadows
js/app.js           hash router, licence and child gates
js/core/figure.js   shape table, symmetry and chirality, SVG rendering
js/core/rules.js    the transformations, and their near misses
js/core/store.js    progress, localStorage only
js/core/licence.js  the commercial gate
js/generators/      one file per question type
tools/              validator, geometry test, preview, code minting
```

Progress never leaves the device. No accounts, no cloud, no personal data of
other people's children on any server, which keeps this well clear of needing a
privacy policy or a data processing agreement.

## What the Bexley test actually is, as of the 2026 cycle

Checked against Bexley Council's own admissions page in July 2026.

- The provider is **Quest Assessments**, not GL Assessment. GL ran the paper in
  earlier cycles and a lot of tutoring sites still say so. Do not put "GL" on
  the listing.
- Two papers, both multiple choice, roughly 50 minutes each in one session.
- Weighting: **verbal ability and English comprehension 50%, numerical
  reasoning 25%, non-verbal reasoning 25%.**

So this app covers the **25%**. Say that plainly on the listing. Quest does not
publish a question-type breakdown, so no claim of type-by-type alignment with
their paper can be made honestly. Cubes and nets is the one type named in
public write-ups of the Quest paper, and it is included here.

## Deploying

Static files, no build step. Copy the folder to any host.

**Bump `CACHE_NAME` in `sw.js` on every deploy.** Otherwise the service worker
keeps serving the old version and buyers never see the fix. Currently
`adsci-nvr-v4`.
