// ── Authored vocabulary content ───────────────────────────────────────────
//
// The verbal paper's sentence questions cannot be generated. A sentence with
// a blank in it needs a writer, and so does a set of wrong answers that are
// plausible without being defensible. So this file is written, not computed,
// and it is the one part of the app that wants a teacher's eye over it.
//
// Everything here is pitched at 11+ level and uses UK spelling. Where a check
// is possible it is made in tools/vocab-test.js rather than assumed: option
// counts, lengths, duplicates, and distractors that are secretly synonyms of
// the answer. What that file CANNOT check, and says so plainly, is whether a
// sentence reads naturally to a ten year old. That needs a teacher.

// ── Category sets, for "choose the two odd ones out" ──────────────────────
// A word may belong to more than one category, which is exactly why the sets
// have to be audited: ruby is both a red and a gem.

export const WORD_TAGS = {
  crimson: ['red'], scarlet: ['red'], vermilion: ['red'], maroon: ['red'],
  ruby: ['red', 'gem'], emerald: ['gem'], sapphire: ['gem'],
  diamond: ['gem', 'shape'], opal: ['gem'], amber: ['gem'],
  oak: ['tree'], willow: ['tree'], birch: ['tree'], sycamore: ['tree'], beech: ['tree'],
  violin: ['instrument'], cello: ['instrument'], flute: ['instrument'],
  trumpet: ['instrument'], harp: ['instrument'], oboe: ['instrument'],
  copper: ['metal'], iron: ['metal'], zinc: ['metal'], nickel: ['metal'], bronze: ['metal'],
  sparrow: ['bird'], robin: ['bird'], heron: ['bird'], falcon: ['bird'], swallow: ['bird'],
  trout: ['fish'], salmon: ['fish'], haddock: ['fish'], herring: ['fish'],
  triangle: ['shape'], hexagon: ['shape'], octagon: ['shape'], pentagon: ['shape'],
  atlas: ['book'], almanac: ['book'], dictionary: ['book'], thesaurus: ['book'],
  gale: ['wind'], breeze: ['wind'], gust: ['wind'], draught: ['wind'],
  drizzle: ['rain'], downpour: ['rain'], shower: ['rain'], hail: ['rain'],
  saucepan: ['kitchen'], colander: ['kitchen'], whisk: ['kitchen'], ladle: ['kitchen'],
  chisel: ['tool'], mallet: ['tool'], pliers: ['tool'], spanner: ['tool'],
  cotton: ['fabric'], linen: ['fabric'], velvet: ['fabric'], denim: ['fabric'],
  meadow: ['land'], moor: ['land'], marsh: ['land'], heath: ['land'],
  cathedral: ['building'], cottage: ['building'], barn: ['building'], mill: ['building'],
  captain: ['rank'], sergeant: ['rank'], admiral: ['rank'], colonel: ['rank'],
  minute: ['time'], fortnight: ['time'], decade: ['time'], century: ['time'],
  ankle: ['body'], elbow: ['body'], wrist: ['body'], shoulder: ['body'],
};

// ── Sentence completion ───────────────────────────────────────────────────
// One word fits; the rest are the right sort of word but the wrong meaning.
// Distractors are never near-synonyms of the answer, because two defensible
// answers is worse than an easy question.

export const SENTENCES = [
  ['After the argument, she felt ___ about the way that she had behaved.', 'remorseful', ['curious', 'heroic', 'indecisive', 'weary']],
  ['The instructions were so ___ that nobody could follow them.', 'confusing', ['generous', 'fragrant', 'punctual', 'elderly']],
  ['He gave a ___ account of the accident, leaving nothing out.', 'detailed', ['hasty', 'reluctant', 'cheerful', 'distant']],
  ['The old bridge was ___ and had to be closed to traffic.', 'unsafe', ['ancient', 'popular', 'narrow', 'famous']],
  ['She was ___ to admit that she had been wrong.', 'reluctant', ['delighted', 'certain', 'furious', 'ready']],
  ['The room fell ___ when the headteacher walked in.', 'silent', ['crowded', 'untidy', 'warm', 'bright']],
  ['His handwriting was so ___ that the letter could not be read.', 'untidy', ['lengthy', 'formal', 'polite', 'recent']],
  ['The evidence was ___, so the case was dropped.', 'insufficient', ['expensive', 'ancient', 'tidy', 'loud']],
  ['A ___ crowd gathered to watch the fireworks.', 'sizeable', ['obedient', 'ancient', 'reluctant', 'grateful']],
  ['The path became ___ as it climbed towards the summit.', 'steeper', ['wetter', 'wider', 'quieter', 'older']],
  ['She spoke in a ___ voice so as not to wake the baby.', 'hushed', ['bitter', 'formal', 'rapid', 'proud']],
  ['The scientist was ___ about announcing the result until it was checked.', 'cautious', ['delighted', 'careless', 'famous', 'certain']],
  ['They were ___ by the sheer size of the cathedral.', 'awed', ['bored', 'annoyed', 'delayed', 'refused']],
  ['His excuse was so ___ that nobody believed a word of it.', 'feeble', ['lengthy', 'polite', 'urgent', 'formal']],
  ['The ___ of the parcel suggested there was something valuable inside.', 'weight', ['colour', 'address', 'journey', 'delay']],
  ['She made a ___ effort to finish before the deadline.', 'determined', ['pleasant', 'gradual', 'silent', 'sudden']],
  ['The instructions warned that the chemical was ___.', 'hazardous', ['plentiful', 'affordable', 'popular', 'ancient']],
  ['After the flood the village was left ___ from the outside world.', 'isolated', ['delighted', 'admired', 'praised', 'invited']],
  ['He was ___ in his praise of the whole team.', 'generous', ['doubtful', 'brief', 'silent', 'unwilling']],
  ['The argument was eventually ___ without anyone raising their voice.', 'resolved', ['repeated', 'forgotten', 'started', 'ignored']],
  ['A ___ silence followed the announcement.', 'stunned', ['cheerful', 'gentle', 'brief', 'polite']],
  ['The library holds a ___ collection of maps.', 'remarkable', ['reluctant', 'temporary', 'nervous', 'punctual']],
  ['She was ___ for her kindness to new pupils.', 'admired', ['blamed', 'refused', 'delayed', 'doubted']],
  ['The bread had gone ___ and was thrown away.', 'stale', ['ripe', 'fresh', 'sweet', 'warm']],
  ['His answer was ___ and told us almost nothing.', 'vague', ['precise', 'lengthy', 'honest', 'cheerful']],
  ['The team showed great ___ in coming back to win.', 'determination', ['confusion', 'politeness', 'silence', 'curiosity']],
  ['Heavy rain had made the ground ___ underfoot.', 'treacherous', ['fragrant', 'colourful', 'expensive', 'obedient']],
  ['She read the contract carefully before ___ it.', 'signing', ['losing', 'praising', 'ignoring', 'posting']],
  ['The museum has ___ the painting to its original condition.', 'restored', ['damaged', 'purchased', 'discussed', 'described']],
  ['His tone was ___, and nobody dared argue.', 'firm', ['playful', 'uncertain', 'weary', 'faint']],
];

// ── Three letters that complete a word and the sentence ───────────────────
// [before, missing, after, sentence with the gapped word marked by %]
//
// A wrong option is allowed to spell a real word, and some deliberately do.
// Quest's own sample works that way: the letters have to complete the word
// AND fit the sentence, so "golden" is a fair wrong answer for a gap in a
// sentence about weeding a garden.

export const LETTER_GAPS = [
  ['ch', 'es', 't', 'The delicate contents of the % were wrapped in cloth.', ['ar', 'ol', 'ur', 'in']],
  ['br', 'idg', 'e', 'The old % across the river was closed for repairs.', ['ing', 'ang', 'ung', 'ock']],
  ['g', 'ard', 'en', 'She spent the afternoon weeding the %.', ['old', 'ird', 'urd', 'end']],
  ['m', 'ount', 'ain', 'Snow lay on the top of the % all winter.', ['aunt', 'onst', 'urnt', 'ould']],
  ['c', 'and', 'le', 'The % burned down to a stub.', ['end', 'ind', 'ond', 'ard']],
  ['th', 'und', 'er', 'We heard % long before the rain arrived.', ['and', 'ind', 'ond', 'end']],
  ['w', 'eath', 'er', 'The % turned cold overnight.', ['orth', 'ould', 'ealt', 'arth']],
  ['h', 'arb', 'our', 'Fishing boats filled the % at dawn.', ['erb', 'orb', 'urb', 'ard']],
  ['s', 'ilv', 'er', 'The % cup was polished until it shone.', ['olv', 'alv', 'elv', 'ulv']],
  ['c', 'ott', 'age', 'They stayed in a small % by the sea.', ['att', 'itt', 'utt', 'ett']],
  ['j', 'ourn', 'ey', 'The % took nearly six hours.', ['earn', 'ourt', 'oure', 'urne']],
  ['g', 'ener', 'ous', 'It was % of her to share her lunch.', ['iner', 'oner', 'aner', 'uner']],
  ['t', 'rea', 'sure', 'The map promised buried %.', ['rou', 'ria', 'roa', 'rui']],
  ['p', 'ict', 'ure', 'A % of the whole school hung in the hall.', ['act', 'ost', 'unt', 'ast']],
  ['f', 'urn', 'iture', 'The room was empty apart from a little %.', ['orm', 'arm', 'irm', 'erm']],
  ['w', 'hisp', 'er', 'She spoke in a % so as not to be heard.', ['hasp', 'husp', 'hesp', 'hosp']],
  ['b', 'utt', 'on', 'A % had come off his coat.', ['att', 'itt', 'ett', 'ott']],
];

// ── Verb and the thing it acts on, for bracketed analogies ────────────────
// "Wring is to (finger, twist, cloth) as knead is to (kicked, dough, require)"
// The link is always the same on both sides: what the action is done TO.

export const ACTION_OBJECTS = [
  ['wring', 'cloth'], ['knead', 'dough'], ['sharpen', 'pencil'], ['shear', 'sheep'],
  ['thatch', 'roof'], ['plough', 'field'], ['moor', 'boat'], ['saddle', 'horse'],
  ['weed', 'garden'], ['darn', 'sock'], ['prune', 'hedge'], ['grind', 'coffee'],
  ['whisk', 'egg'], ['fold', 'paper'], ['tune', 'piano'], ['polish', 'shoe'],
  ['post', 'letter'], ['launch', 'ship'], ['thread', 'needle'], ['pitch', 'tent'],
];
