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
  crimson: ['red', 'colour'], scarlet: ['red', 'colour'], maroon: ['red', 'colour'],
  ruby: ['red', 'gem', 'colour'], emerald: ['gem'], sapphire: ['gem'],
  diamond: ['gem', 'shape'], opal: ['gem'], amber: ['gem', 'colour'],
  oak: ['tree'], willow: ['tree'], birch: ['tree'], sycamore: ['tree'], beech: ['tree'],
  violin: ['instrument'], cello: ['instrument'], flute: ['instrument'],
  trumpet: ['instrument'], harp: ['instrument'], oboe: ['instrument'],
  copper: ['metal', 'colour'], iron: ['metal'], zinc: ['metal'], nickel: ['metal'], bronze: ['metal', 'colour'],
  sparrow: ['bird'], robin: ['bird'], heron: ['bird'], falcon: ['bird'], swallow: ['bird'],
  trout: ['fish'], cod: ['fish'], haddock: ['fish'], herring: ['fish'],
  triangle: ['shape'], hexagon: ['shape'], octagon: ['shape'], pentagon: ['shape'],
  atlas: ['book'], dictionary: ['book'], thesaurus: ['book'],
  gale: ['wind'], breeze: ['wind'], gust: ['wind'], draught: ['wind'],
  drizzle: ['rain'], downpour: ['rain'], hail: ['rain'],
  saucepan: ['kitchen'], colander: ['kitchen'], whisk: ['kitchen'], ladle: ['kitchen'],
  chisel: ['tool'], mallet: ['tool'], pliers: ['tool'], spanner: ['tool'],
  cotton: ['fabric'], linen: ['fabric'], velvet: ['fabric'], denim: ['fabric'],
  meadow: ['land'], moor: ['land'], marsh: ['land'],
  cathedral: ['building'], cottage: ['building'], barn: ['building'], mill: ['building'],
  captain: ['rank'], sergeant: ['rank'], admiral: ['rank'], colonel: ['rank'],
  minute: ['time'], fortnight: ['time'], decade: ['time'], century: ['time'],
  ankle: ['body'], elbow: ['body'], wrist: ['body'], shoulder: ['body'],
  poplar: ['tree'], hazel: ['tree'],
  clarinet: ['instrument'], bassoon: ['instrument'],
  pewter: ['metal'], brass: ['metal'],
  kestrel: ['bird'], starling: ['bird'],
  mackerel: ['fish'], plaice: ['fish'],
  rhombus: ['shape'], trapezium: ['shape'],
  journal: ['book'],
  squall: ['wind'],
  sleet: ['rain'], deluge: ['rain'],
  sieve: ['kitchen', 'tool'], skewer: ['kitchen'],

  tweed: ['fabric'], calico: ['fabric'],
  dune: ['land'],
  chapel: ['building'], granary: ['building'],
  corporal: ['rank'],
  hour: ['time'], millennium: ['time'],
  knuckle: ['body'], shin: ['body'],
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
  ['The witness gave a ___ account, which matched the evidence exactly.', 'reliable', ['lengthy', 'reluctant', 'cheerful', 'sudden']],
  ['Frost had made the steps ___, so we held the handrail.', 'slippery', ['crowded', 'expensive', 'ancient', 'colourful']],
  ['She was ___ about the change of plan and said so at once.', 'blunt', ['grateful', 'uncertain', 'weary', 'patient']],
  ['The hall was ___ enough to seat the whole school.', 'spacious', ['fragrant', 'punctual', 'elderly', 'costly']],
  ['His first attempt was ___, but the second was much better.', 'clumsy', ['generous', 'lengthy', 'polite', 'recent']],
  ['The map was so ___ that we found the path at once.', 'clear', ['ancient', 'expensive', 'damaged', 'folded']],
  ['A ___ noise from the engine warned us something was wrong.', 'peculiar', ['welcome', 'gentle', 'faint', 'distant']],
  ['She was ___ to be chosen for the team.', 'delighted', ['reluctant', 'furious', 'anxious', 'doubtful']],
  ['The cliff path is ___ and should not be walked alone.', 'perilous', ['popular', 'narrow', 'sandy', 'ancient']],
  ['He spoke with such ___ that everyone believed him.', 'conviction', ['confusion', 'silence', 'hesitation', 'politeness']],
  ['The room was ___ after the party, with nothing in its place.', 'chaotic', ['spotless', 'silent', 'chilly', 'empty']],
  ['Her explanation was ___ and answered every question.', 'thorough', ['brief', 'hasty', 'muddled', 'quiet']],
  ['The dog was ___ of strangers and hid behind the sofa.', 'wary', ['fond', 'proud', 'certain', 'weary']],
  ['They made a ___ decision without discussing it properly.', 'hasty', ['careful', 'popular', 'lengthy', 'generous']],
  ['The old letters were ___ and had to be handled carefully.', 'fragile', ['valuable', 'lengthy', 'recent', 'untidy']],
  ['His argument was ___ and nobody could find a fault in it.', 'sound', ['loud', 'brief', 'unusual', 'polite']],
  ['She felt ___ when she realised she had forgotten his name.', 'awkward', ['delighted', 'furious', 'curious', 'sleepy']],
  ['The instructions were ___, so we finished in ten minutes.', 'straightforward', ['expensive', 'colourful', 'ancient', 'fragrant']],
  ['A ___ crowd waited quietly outside the courtroom.', 'solemn', ['cheerful', 'hungry', 'youthful', 'wealthy']],
  ['The soup was ___ and needed a great deal of salt.', 'bland', ['scalding', 'costly', 'thick', 'green']],
  ['He was ___ in his work and never missed a detail.', 'meticulous', ['careless', 'cheerful', 'sudden', 'brief']],
  ['The news spread ___ through the village.', 'rapidly', ['quietly', 'sadly', 'politely', 'carefully']],
  ['She gave a ___ nod and carried on reading.', 'curt', ['lengthy', 'generous', 'delighted', 'anxious']],
  ['The bridge was ___ enough to carry a lorry.', 'sturdy', ['narrow', 'ancient', 'painted', 'wooden']],
  ['His story was so ___ that we could not stop listening.', 'gripping', ['lengthy', 'quiet', 'polite', 'ordinary']],
  ['The teacher was ___ about late homework and never made exceptions.', 'strict', ['puzzled', 'cheerful', 'curious', 'anxious']],
  ['We waited in ___ silence for the results to be read out.', 'tense', ['comfortable', 'brief', 'polite', 'ordinary']],
  ['The path became ___ and we had to walk in single file.', 'narrow', ['muddy', 'longer', 'darker', 'steeper']],
  ['Her handwriting was ___ and easy to read from the back of the room.', 'bold', ['faint', 'tiny', 'untidy', 'slanted']],
  ['The plan was ___ and depended on everything going perfectly.', 'risky', ['sensible', 'popular', 'detailed', 'cheap']],
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
  ['m', 'ount', 'ain', 'Snow covered the top of the % all winter.', ['aunt', 'onst', 'urnt', 'ould']],
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
  ['f', 'urn', 'iture', 'They carried the % into the empty room.', ['orm', 'arm', 'irm', 'erm']],
  ['w', 'hisp', 'er', 'She spoke in a % so as not to be heard.', ['hasp', 'husp', 'hesp', 'hosp']],
  ['b', 'utt', 'on', 'A % had come off his coat.', ['att', 'itt', 'ett', 'ott']],
  ['s', 'ilen', 'ce', 'A long % followed the announcement.', ['olen', 'alen', 'ulen', 'elen']],
  ['m', 'arv', 'ellous', 'The view from the summit was %.', ['erv', 'orv', 'irv', 'urv']],
  ['p', 'atien', 'ce', 'Waiting in the queue tested her %.', ['otien', 'utien', 'itien', 'etien']],
  ['c', 'urios', 'ity', 'His % got the better of him and he opened the box.', ['arios', 'orios', 'erios', 'irios']],
  ['d', 'iffic', 'ult', 'The last question was too % to finish in time.', ['offic', 'affic', 'uffic', 'effic']],
  ['e', 'norm', 'ous', 'An % wave broke over the harbour wall.', ['narm', 'nirm', 'nurm', 'nerm']],
  ['f', 'urnit', 'ure', 'The removal van was full of %.', ['ornit', 'arnit', 'ernit', 'irnit']],
  ['a', 'dvent', 'ure', 'They set off on an % into the hills.', ['dvant', 'dvint', 'dvont', 'dvunt']],
];

// ── Verb and the thing it acts on, for bracketed analogies ────────────────
// "Wring is to (finger, twist, cloth) as knead is to (kicked, dough, require)"
// The link is always the same on both sides: what the action is done TO.

// Objects that take no article: you bake bread, not "a bread". Without this
// the analogy explanation reads "you knead a dough" and "you brew a tea",
// which is wrong in front of a child being told to check their sentence
// reads properly.
export const MASS_NOUNS = new Set([
  'dough', 'coffee', 'tea', 'corn', 'hay', 'iron', 'bread', 'wood', 'paper',
]);

export const ACTION_OBJECTS = [
  // [action, its object, OTHER objects in this table the action also fits]
  //
  // The third field exists because a blind check found the real fault here:
  // fillers were drawn from other actions' objects, but you can mend a fence,
  // a sock, a shirt OR a sail. The filler could itself be a correct answer,
  // and on one item an independent reader picked a different pair from the
  // key. Anything listed third is barred from being a filler for that verb.
  ['wring', 'cloth', ['sock', 'shirt']],
  ['knead', 'dough', []],
  ['sharpen', 'pencil', []],
  ['shear', 'sheep', ['hedge']],
  ['tile', 'roof', []],
  ['plough', 'field', ['garden']],
  ['row', 'boat', ['ship']],
  ['saddle', 'horse', []],
  ['weed', 'garden', ['field']],
  ['darn', 'sock', ['cloth', 'shirt']],
  ['prune', 'hedge', ['garden']],
  ['grind', 'coffee', ['corn']],
  ['whisk', 'egg', []],
  ['fold', 'paper', ['cloth', 'shirt', 'sail', 'tent', 'dough']],
  ['tune', 'piano', []],
  ['polish', 'shoe', ['wood']],
  ['post', 'letter', []],
  ['launch', 'ship', ['boat']],
  ['thread', 'needle', []],
  ['pitch', 'tent', []],
  ['reap', 'corn', ['field']],
  ['carve', 'wood', []],
  ['press', 'shirt', ['cloth']],
  ['brew', 'tea', []],
  ['hoist', 'sail', []],
  ['stack', 'hay', ['corn', 'paper', 'wood']],
  ['mend', 'fence', ['sock', 'shirt', 'roof', 'sail', 'tent', 'hedge', 'shoe']],
  ['bait', 'hook', []],
  ['forge', 'iron', []],
  ['bake', 'bread', []],
];
