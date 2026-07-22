// ── Paper format ──────────────────────────────────────────────────────────
//
// Held in one place because it is a property of the REAL EXAM, not a
// styling choice, and getting it wrong trains the wrong instincts.
//
// Checked 22 July 2026 against the Quest Assessments Grammar Familiarisation
// Guide, which is the official sample material for the Bexley Selection Test
// from the 2026 cycle onwards. Every sample question in the non-verbal
// reasoning section offers five options, A to E, and the printed OMR answer
// sheet has five bubbles per non-verbal question.
//
// This matters more than it looks. A child who has practised on four options
// has a 25% guess rate and a scanning habit built around four tiles. In the
// real paper both are wrong, and the extra option is usually the near miss
// that punishes sloppy checking.

/** Options per question in the non-verbal reasoning section. */
export const OPTION_COUNT = 5;

/** Distractors needed per question. */
export const DISTRACTOR_COUNT = OPTION_COUNT - 1;
