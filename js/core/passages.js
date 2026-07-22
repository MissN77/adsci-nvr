// ── Reading passages and their questions ──────────────────────────────────
//
// Quest's English paper puts a reading passage at the front, then asks twenty
// questions about it: twelve on the passage and eight on spelling, punctuation
// and grammar.
//
// This comment used to claim the mix here "leans the same way" as Quest's. It
// does not, and saying so was worse than saying nothing, because it stopped
// anyone checking. Measured across all 320 questions on 22 July 2026:
//
//   retrieval             35%
//   inference             27%
//   language and effect   17%
//   vocabulary in context 11%
//   word-level retrieval  11%
//
// Quest's twelve comprehension items run closer to seven of twelve on
// language and effect. So this bank is materially retrieval-heavy against the
// real paper and the effect questions need roughly to treble. The passages are
// also short: median 400 words here against roughly 750 in the Quest booklet
// and 688 to 1008 in GL's published English papers.
//
// Recorded rather than quietly fixed, because rebalancing means writing about
// a hundred new questions and that is a decision, not a tidy-up.
//
// The passages are genuinely out of copyright, taken from Project Gutenberg:
//
//   The Wind in the Willows,  Kenneth Grahame,            1908, died 1932
//   Black Beauty,             Anna Sewell,                1877, died 1878
//   Alice's Adventures in Wonderland, Lewis Carroll,      1865, died 1898
//   A Christmas Carol,        Charles Dickens,            1843, died 1870
//   The Railway Children,     E. Nesbit,                  1906, died 1924
//   The Secret Garden,        Frances Hodgson Burnett,    1911, died 1924
//   The Wonderful Wizard of Oz, L. Frank Baum,            1900, died 1919
//   Heidi,                    Johanna Spyri,              1881, died 1901
//   Little Women,             Louisa May Alcott,          1868, died 1888
//   Anne of Green Gables,     L. M. Montgomery,           1908, died 1942
//   The Adventures of Tom Sawyer, Mark Twain,             1876, died 1910
//   Treasure Island,          Robert Louis Stevenson,     1883, died 1894
//   Around the World in Eighty Days, Jules Verne,         1873, died 1905
//   Five Children and It,     E. Nesbit,                  1902, died 1924
//   The Voyage of the Beagle, Charles Darwin,             1839, died 1882
//   Gulliver's Travels,       Jonathan Swift,             1726, died 1745
//   Jane Eyre,                Charlotte Bronte,           1847, died 1855
//   Great Expectations,       Charles Dickens,            1861, died 1870
//   South,                    Sir Ernest Shackleton,      1919, died 1922
//   Twenty Thousand Leagues,  Jules Verne,                1870, died 1905
//   Kidnapped,                Robert Louis Stevenson,     1886, died 1894
//   Pollyanna,                Eleanor H. Porter,          1913, died 1920
//   Through the Looking-Glass, Lewis Carroll,             1871, died 1898
//   Peter Pan,                J. M. Barrie,               1911, died 1937
//   Rebecca of Sunnybrook Farm, Kate Douglas Wiggin,      1903, died 1923
//   Three Men in a Boat,      Jerome K. Jerome,           1889, died 1927
//   The Jungle Book,          Rudyard Kipling,            1894, died 1936
//   Robinson Crusoe,          Daniel Defoe,               1719, died 1731
//   Just So Stories,          Rudyard Kipling,            1902, died 1936
//   The Prince and the Pauper, Mark Twain,                1881, died 1910
//   The Happy Prince,         Oscar Wilde,                1888, died 1900
//   What Katy Did,            Susan Coolidge,             1872, died 1905
//   A Little Princess,        Frances Hodgson Burnett,    1905, died 1924
//   The Story of My Boyhood,  John Muir,                  1913, died 1914
//   The Red-Headed League,    Arthur Conan Doyle,         1891, died 1930
//   A Wonder Book,            Nathaniel Hawthorne,        1851, died 1864
//   At the Back of the North Wind, George MacDonald,      1871, died 1905
//   The Merry Adventures of Robin Hood, Howard Pyle,      1883, died 1911
//   The Chemical History of a Candle, Michael Faraday,    1861, died 1867
//   Wild Animals I Have Known, Ernest Thompson Seton,     1898, died 1946
//
// The latest death here is Seton in 1946, so every text is clear of life of
// the author plus seventy years.
//
// Five of the forty are non-fiction on purpose: Darwin, Shackleton, Muir,
// Faraday and Seton. Quest's English paper says
// questions may cover one or two texts, and a child who has only ever
// practised on stories meets an information text for the first time on the
// day. They also read quite differently from one another: Darwin is patient
// observation, Shackleton is a log of things going wrong, Muir is memoir,
// Faraday is a lecture spoken aloud to an audience of children, and Seton is
// nature writing that borrows the shape of a story.
//
// The fiction is deliberately not all Victorian children's novels. There is a
// fairy tale (Wilde), a Greek myth retold (Hawthorne), a legend (Pyle), a
// detective story (Conan Doyle) and a piece of comic writing (Jerome), because
// a child who has only met one register is being trained on half the paper.
//
// Extracts screened and rejected, so nobody has to rediscover why:
//
//   The Secret Garden, opening chapter: Indian servants in 1911 language.
//   Tom Sawyer, whitewashing scene: runs into Jim's dialect speech, and one
//     line carries a racial slur. The book is fine; that scene is not, so the
//     extract used is Aunt Polly hunting for Tom instead.
//   A Little Princess, opening: Lascars on the voyage from Bombay. A later
//     extract from the same chapter IS used. It still carries period words
//     from a colonial childhood, ayah and salaams and Missee Sahib, used
//     descriptively rather than unkindly. It is left in because the passage is
//     standard eleven plus material and the words are worth a parent
//     explaining, but it is flagged here rather than left to be discovered.
//   The Water-Babies, opening: Tom is beaten by his master every day of the
//     week, and the second sentence turns on his never having heard of God or
//     of Christ. Both are hard to meet alone on a practice paper.
//
// One further rejection, for a different reason. The Natural History of
// Selborne is out of copyright and would have made a third non-fiction text,
// but it opens with eighteenth-century topographical prose, a list of twelve
// parish names and the word calcareous. It would punish a ten year old rather
// than teach one. Hard is fine; unfair is not. Scott's Last Expedition went
// the same way: the diary is fragmentary and thick with abbreviations, so
// Muir's boyhood memoir took the place it would have had.
//
// The point is that a book is not ruled out by one bad extract. Screen the
// extract, not the author.
//
// Every text above is past life of the author plus seventy years, so all are
// in the public domain in the UK. The text is the author's, not Gutenberg's,
// and none of Gutenberg's own boilerplate is reproduced.
//
// One typographic change has been made. Where the original prints a long dash
// for speech that is cut off, an ellipsis is used instead, because that
// character is not permitted anywhere in this project and the automatic
// substitution mangled the line into stray commas. An ellipsis carries the
// same meaning and is a normal reprint convention. No words are altered.
//
// The Secret Garden is used, but NOT its opening chapter. That opening is the
// obvious choice and is equally out of copyright, but it describes Indian
// servants in the language of 1911. Authentic, and in plenty of anthologies,
// but not something to put in front of a ten year old on a screen with no
// teacher in the room to talk about it. The extract used instead is Mary
// finding the walled garden, which carries none of that.
//
// The QUESTIONS are written, not generated, and are the part that wants a
// teacher's eye. tools/passage-test.js checks what it can: that every word a
// question claims is in the passage really is there, that answers are not
// repeated among the distractors, and that option counts are right.

export const PASSAGES = [
  {
    id: 'mole',
    title: 'The Mole leaves home',
    source: 'from The Wind in the Willows by Kenneth Grahame, 1908',
    paragraphs: [
      'The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur, and an aching back and weary arms. Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing. It was small wonder, then, that he suddenly flung down his brush on the floor, said "Bother!" and "O blow!" and also "Hang spring-cleaning!" and bolted out of the house without even waiting to put on his coat. Something up above was calling him imperiously, and he made for the steep little tunnel which answered in his case to the gravelled carriage-drive owned by animals whose residences are nearer to the sun and air. So he scraped and scratched and scrabbled and scrooged and then he scrooged again and scrabbled and scratched and scraped, working busily with his little paws and muttering to himself, "Up we go! Up we go!" till at last, pop! his snout came out into the sunlight, and he found himself rolling in the warm grass of a great meadow.',
      '"This is fine!" he said to himself. "This is better than whitewashing!" The sunshine struck hot on his fur, soft breezes caressed his heated brow, and after the seclusion of the cellarage he had lived in so long the carol of happy birds fell on his dulled hearing almost like a shout. Jumping off all his four legs at once, in the joy of living and the delight of spring without its cleaning, he pursued his way across the meadow till he reached the hedge on the further side.',
      '"Hold up!" said an elderly rabbit at the gap. "Sixpence for the privilege of passing by the private road!" He was bowled over in an instant by the impatient and contemptuous Mole, who trotted along the side of the hedge chaffing the other rabbits as they peeped hurriedly from their holes to see what the row was about. "Onion-sauce! Onion-sauce!" he remarked jeeringly, and was gone before they could think of a thoroughly satisfactory reply. Then they all started grumbling at each other. "How stupid you are! Why didn\'t you tell him... " "Well, why didn\'t you say... " "You might have reminded him... " and so on, in the usual way; but, of course, it was then much too late.',
    ],
    questions: [
      {
        q: 'In the first paragraph, which THREE things had the Mole been using to clean his home?',
        answers: ['brooms', 'dusters', 'whitewash'],
        wrong: ['a hosepipe', 'soap'],
        why: ['The first sentence lists them: "First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash."',
          'This one asks for three, so read to the end of the list before choosing.'],
      },
      {
        q: 'Which word in the first paragraph shows that the Mole left the house in a great hurry?',
        answer: 'bolted',
        wrong: ['muttering', 'penetrating', 'working', 'waiting'],
        why: ['"Bolted out of the house" tells you he left suddenly and fast.',
          'The others describe things he did slowly or steadily, so they do not carry the same sense of speed.'],
      },
      {
        q: 'What is the effect of the words "scraped and scratched and scrabbled and scrooged"?',
        answer: 'It makes the digging feel long and effortful.',
        wrong: ['It shows the Mole is frightened of the dark.',
          'It suggests the tunnel is much wider than he expected.',
          'It tells the reader the Mole is a careful, tidy animal.',
          'It shows that the Mole has changed his mind about leaving.'],
        why: ['Four similar words piled up, then repeated backwards, make the tunnel feel like hard work that goes on and on.',
          'Ask what the sound and the length of a phrase do, not just what the words mean.'],
      },
      {
        q: 'Why does the author use the word "pop!" when the Mole reaches the surface?',
        answer: 'To make his arrival sudden after all the slow digging.',
        wrong: ['To show that the Mole has hurt himself.',
          'To suggest the meadow is a noisy place.',
          'To warn the reader that something bad is about to happen.',
          'To show the Mole is smaller than the other animals.'],
        why: ['The long, effortful digging is followed by one short word, so the moment he breaks through feels instant.',
          'A very short word after a very long sentence almost always marks a sudden change.'],
      },
      {
        q: 'How does the Mole behave towards the elderly rabbit?',
        answer: 'Rudely and without any patience.',
        wrong: ['Politely, though he is in a hurry.',
          'Nervously, because he has no money.',
          'Kindly, because he feels sorry for him.',
          'Cautiously, because he does not know the way.'],
        why: ['He bowls the rabbit over, is described as "impatient and contemptuous", and jeers at the others.',
          'The narrator says outright what the Mole is like here, so the evidence is in the choice of describing words.'],
      },
      {
        q: 'What does the passage suggest about the other rabbits?',
        answer: 'They think of what to say only when it is too late.',
        wrong: ['They are pleased that the Mole has come outside.',
          'They agree with each other about what should be done.',
          'They chase the Mole away from the hedge.',
          'They are too frightened to leave their holes at all.'],
        why: ['They start blaming each other afterwards, and the author adds "it was then much too late".',
          'They do peep out of their holes, so they are not too frightened to look.'],
      },
      {
        q: 'What does "seclusion" mean in the second paragraph?',
        answer: 'being shut away from others',
        wrong: ['a feeling of great excitement', 'a kind of spring cleaning', 'a long, deep sleep', 'a narrow underground tunnel'],
        why: ['The Mole has been living alone underground, and the birdsong sounds loud to him after it.',
          'When you do not know a word, look at what is happening around it in the sentence.'],
      },
      {
        q: 'Why does the birdsong sound "almost like a shout" to the Mole?',
        answer: 'Because he has been underground in the quiet for a long time.',
        wrong: ['Because the birds are unusually close to him.',
          'Because he has hurt his ears while digging.',
          'Because there are far more birds than usual that morning.',
          'Because the meadow echoes the sound back at him.'],
        why: ['The author says his hearing was "dulled" by "the seclusion of the cellarage he had lived in so long".',
          'The change is in the Mole, not in the birds. That is the point being made.'],
      },
    ],
  },

  {
    id: 'beauty',
    title: 'My early home',
    source: 'from Black Beauty by Anna Sewell, 1877',
    paragraphs: [
      "The first place that I can well remember was a large pleasant meadow with a pond of clear water in it. Some shady trees leaned over it, and rushes and water-lilies grew at the deep end. Over the hedge on one side we looked into a plowed field, and on the other we looked over a gate at our master's house, which stood by the roadside; at the top of the meadow was a grove of fir trees, and at the bottom a running brook overhung by a steep bank.",
      'While I was young I lived upon my mother\'s milk, as I could not eat grass. In the daytime I ran by her side, and at night I lay down close by her. When it was hot we used to stand by the pond in the shade of the trees, and when it was cold we had a nice warm shed near the grove.',
      'There were six young colts in the meadow besides me; they were older than I was; some were nearly as large as grown-up horses. I used to run with them, and had great fun; we used to gallop all together round and round the field as hard as we could go. Sometimes we had rather rough play, for they would frequently bite and kick as well as gallop.',
      'One day, when there was a good deal of kicking, my mother whinnied to me to come to her, and then she said: "I wish you to pay attention to what I am going to say to you. The colts who live here are very good colts, but they are cart-horse colts, and of course they have not learned manners. You have been well-bred and well-born; your father has a great name in these parts, and your grandfather won the cup two years at the Newmarket races; your grandmother had the sweetest temper of any horse I ever knew, and I think you have never seen me kick or bite. I hope you will grow up gentle and good, and never learn bad ways; do your work with a good will, lift your feet up well when you trot, and never bite or kick even in play."',
      "I have never forgotten my mother's advice; I knew she was a wise old horse, and our master thought a great deal of her. Her name was Duchess, but he often called her Pet.",
    ],
    questions: [
      {
        q: 'Who is telling this story?',
        answer: 'A young horse.',
        wrong: ["The horses' master.", 'A farm worker who looks after the colts.', "The narrator's mother.", 'A child living at the house.'],
        why: ['The narrator drinks its mother\'s milk, gallops with the colts, and is given advice about trotting and biting.',
          'Nothing says "I am a horse". You work it out from what the narrator does.'],
      },
      {
        q: 'Which TWO things does the narrator say were at the edges of the meadow?',
        answers: ['a grove of fir trees', 'a running brook'],
        wrong: ['a stone wall', 'a wooden bridge', 'a railway line'],
        why: ['"At the top of the meadow was a grove of fir trees, and at the bottom a running brook."',
          'This one asks for two, so keep reading after you find the first.'],
      },
      {
        q: 'Why does the mother say the other colts have "not learned manners"?',
        answer: 'Because they are cart-horse colts and have been brought up differently.',
        wrong: ['Because they are younger than the narrator.',
          'Because they have no mother to teach them.',
          'Because they have been badly treated by the master.',
          'Because they are not allowed in the meadow.'],
        why: ['She says they are "very good colts, but they are cart-horse colts, and of course they have not learned manners".',
          'She is careful to say they are good. It is their upbringing she is talking about, not their character.'],
      },
      {
        q: 'What is the effect of the mother listing the narrator\'s father, grandfather and grandmother?',
        answer: 'It shows she expects a high standard of behaviour because of his family.',
        wrong: ['It shows that she misses her own family a great deal.',
          'It explains why the narrator is not allowed near the pond.',
          'It suggests the family were once owned by somebody else.',
          'It proves that the narrator is older than the other colts.'],
        why: ['She sets out who he comes from, then says "I hope you will grow up gentle and good". The list is there to support the advice.',
          'Ask what a list is doing in the argument, not just what is in it.'],
      },
      {
        q: 'Which name does the master call her instead of her real name?',
        answer: 'Pet',
        wrong: ['Duchess', 'advice', 'wise', 'often'],
        why: ['Her name was Duchess, but he often called her Pet.',
          'Duchess is her proper name. It is the nickname that shows the feeling.'],
      },
      {
        q: 'What does "frequently" mean in the third paragraph?',
        answer: 'often',
        wrong: ['gently', 'suddenly', 'rarely', 'loudly'],
        why: ['The colts "would frequently bite and kick as well as gallop", meaning it happened a lot.',
          'The sentence is explaining why the play was rough, so the word has to mean it happened often.'],
      },
      {
        q: 'Why does the author begin with a description of the meadow before anything happens?',
        answer: 'To set a calm, pleasant scene before the story moves on.',
        wrong: ['To warn the reader that the meadow is dangerous.',
          'To explain why the colts behave so roughly.',
          'To show that the master is a wealthy man.',
          'To suggest the narrator is unhappy living there.'],
        why: ['Clear water, shady trees and water-lilies build a settled, happy place, which is where the story starts from.',
          'Openings usually set a mood. Ask what feeling you are left with after the first paragraph.'],
      },
      {
        q: 'What does the narrator think of his mother\'s advice?',
        answer: 'He takes it seriously and remembers it.',
        wrong: ['He thinks it is unfair on the other colts.',
          'He forgets it as soon as he goes back to playing.',
          'He does not understand what she means.',
          'He is annoyed at being called away from his friends.'],
        why: ['"I have never forgotten my mother\'s advice; I knew she was a wise old horse."',
          'The narrator tells you directly here, so this one is retrieval rather than inference.'],
      },
    ],
  },
  {
    id: "alice",
    title: "Down the rabbit-hole",
    source: "from Alice’s Adventures in Wonderland by Lewis Carroll, 1865",
    paragraphs: [
      "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”",
      "So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.",
      "There was nothing so _very_ remarkable in that; nor did Alice think it so _very_ much out of the way to hear the Rabbit say to itself, “Oh dear! Oh dear! I shall be late!” (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually _took a watch out of its waistcoat-pocket_, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.",
      "In another moment down went Alice after it, never once considering how in the world she was to get out again.",
      "The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.",
      "Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next. First, she tried to look down and make out what she was coming to, but it was too dark to see anything; then she looked at the sides of the well, and noticed that they were filled with cupboards and book-shelves; here and there she saw maps and pictures hung upon pegs. She took down a jar from one of the shelves as she passed; it was labelled “ORANGE MARMALADE”, but to her great disappointment it was empty: she did not like to drop the jar for fear of killing somebody underneath, so managed to put it into one of the cupboards as she fell past it.",
    ],
    questions: [
      {
        q: "Why does Alice think her sister's book is not worth reading?",
        answer: "It has no pictures or conversations in it.",
        wrong: ["It is far too long for her.", "It is written in a language she cannot read.", "She has already read it twice before.", "Her sister will not let her hold it."],
        why: ["The first paragraph says the book \"had no pictures or conversations in it\", and Alice asks what the use of such a book is.", "This one is answered directly in the text, so it is retrieval rather than inference."],
      },
      {
        q: "Which word in the third paragraph shows how strongly Alice wanted to know more?",
        answer: "burning",
        wrong: ["peeped", "natural", "remarkable", "considering"],
        why: ["\"Burning with curiosity\" tells you the feeling was very strong indeed.", "The other words are there, but none of them describe how much she wanted something."],
      },
      {
        q: "Why is the Rabbit taking out a watch more surprising to Alice than the Rabbit talking?",
        answer: "Because she had never seen a rabbit with a waistcoat-pocket or a watch.",
        wrong: ["Because the watch had stopped working.", "Because the Rabbit spoke to her directly.", "Because she had been told rabbits cannot talk.", "Because the Rabbit was much larger than she expected."],
        why: ["The passage says it \"flashed across her mind\" that she had never seen a rabbit with either a waistcoat-pocket or a watch.", "The talking seemed \"quite natural\" to her at the time. It is the pocket and the watch that make her jump up."],
      },
      {
        q: "What does \"never once considering how in the world she was to get out again\" suggest about Alice?",
        answer: "She acts on impulse without thinking ahead.",
        wrong: ["She is very careful about danger.", "She has been down the hole before.", "She is trying to escape from her sister.", "She is certain the Rabbit will help her."],
        why: ["She goes straight down after the Rabbit without a thought for how she will come back up.", "The narrator points this out on purpose, which is a hint about the sort of girl Alice is."],
      },
      {
        q: "Which TWO things does the passage say were hanging upon pegs?",
        answers: ["maps", "pictures"],
        wrong: ["cupboards", "book-shelves", "jars"],
        why: ["\"Here and there she saw maps and pictures hung upon pegs.\"", "The cupboards and book-shelves are in the well too, but they are not the things on pegs. Read the question closely."],
      },
      {
        q: "What does \"remarkable\" mean in the third paragraph?",
        answer: "worth noticing",
        wrong: ["frightening", "difficult", "cheerful", "enormous"],
        why: ["The narrator is saying there was nothing much worth noticing in a rabbit running past.", "The whole sentence is playing down how odd the moment is, so the word has to mean something like noteworthy."],
      },
      {
        q: "Why does the author mention that Alice put the jar into a cupboard instead of dropping it?",
        answer: "To show she is thoughtful even in a strange situation.",
        wrong: ["To show she is hungry and wants to keep it.", "To explain how she slowed herself down.", "To suggest the jar is valuable to her.", "To show she is frightened of breaking things."],
        why: ["She does not want to drop it \"for fear of killing somebody underneath\", which is a kind thought to have while falling down a well.", "Small details like this are usually there to tell you about the character."],
      },
      {
        q: "What does the passage suggest about how fast Alice was falling?",
        answer: "Slowly enough to look around and pick things up.",
        wrong: ["Too fast to see anything at all.", "Fast at first and then not at all.", "Fast enough to frighten her badly.", "So slowly that she almost stopped."],
        why: ["She has \"plenty of time\" to look about, read a label and put a jar away as she passes.", "The author even offers two explanations: either the well was very deep, or she fell very slowly."],
      },
    ],
  },
  {
    id: "scrooge",
    title: "A tight-fisted hand",
    source: "from A Christmas Carol by Charles Dickens, 1843",
    paragraphs: [
      "Oh! But he was a tight-fisted hand at the grind-stone, Scrooge! a squeezing, wrenching, grasping, scraping, clutching, covetous, old sinner! Hard and sharp as flint, from which no steel had ever struck out generous fire; secret, and self-contained, and solitary as an oyster. The cold within him froze his old features, nipped his pointed nose, shrivelled his cheek, stiffened his gait; made his eyes red, his thin lips blue; and spoke out shrewdly in his grating voice. A frosty rime was on his head, and on his eyebrows, and his wiry chin. He carried his own low temperature always about with him; he iced his office in the dog-days; and didn't thaw it one degree at Christmas.",
      "External heat and cold had little influence on Scrooge. No warmth could warm, no wintry weather chill him. No wind that blew was bitterer than he, no falling snow was more intent upon its purpose, no pelting rain less open to entreaty. Foul weather didn't know where to have him. The heaviest rain, and snow, and hail, and sleet, could boast of the advantage over him in only one respect. They often \"came down\" handsomely, and Scrooge never did.",
      "Nobody ever stopped him in the street to say, with gladsome looks, \"My dear Scrooge, how are you? When will you come to see me?\" No beggars implored him to bestow a trifle, no children asked him what it was o'clock, no man or woman ever once in all his life inquired the way to such and such a place, of Scrooge. Even the blind men's dogs appeared to know him; and when they saw him coming on, would tug their owners into doorways and up courts; and then would wag their tails as though they said, \"No eye at all is better than an evil eye, dark master!\"",
      "But what did Scrooge care! It was the very thing he liked. To edge his way along the crowded paths of life, warning all human sympathy to keep its distance, was what the knowing ones call \"nuts\" to Scrooge.",
    ],
    questions: [
      {
        q: "What is the effect of the list \"squeezing, wrenching, grasping, scraping, clutching, covetous\"?",
        answer: "It piles up word after word to make him seem relentlessly mean.",
        wrong: ["It shows that he works with his hands all day.", "It suggests he is in physical pain.", "It tells the reader he is very old and frail.", "It shows he is good at his job."],
        why: ["Six similar words in a row give no relief, which is exactly how the man himself is being described.", "When an author uses a long list, ask what the length of it does, not only what the words mean."],
      },
      {
        q: "What does \"solitary as an oyster\" suggest about Scrooge?",
        answer: "He keeps himself tightly shut away from other people.",
        wrong: ["He lives close to the sea.", "He is slow and clumsy when he moves.", "He is wealthy but hides it well.", "He is quiet but friendly underneath."],
        why: ["An oyster is closed up tight, which is the point of the comparison.", "The same sentence pairs it with \"secret\" and \"self-contained\", which point the same way."],
      },
      {
        q: "What does \"he iced his office in the dog-days\" tell us about Scrooge?",
        answer: "He made the place feel cold even in the hottest weather.",
        wrong: ["He kept ice in the office to sell.", "He only worked there during the summer.", "He refused to light a fire to save money.", "He was often ill in the hot weather."],
        why: ["The dog-days are the hottest part of the summer, and even then he chilled the room.", "The next line adds that he \"didn't thaw it one degree at Christmas\", so the coldness is in him, not the weather."],
      },
      {
        q: "Which word in the first paragraph describes Scrooge's voice?",
        answer: "grating",
        wrong: ["frosty", "wiry", "pointed", "shrewdly"],
        why: ["\"Spoke out shrewdly in his grating voice.\"", "The other words are all in the paragraph, but they describe his eyebrows, his chin, his nose and the way he spoke, not the voice itself."],
      },
      {
        q: "Why do the blind men's dogs pull their owners into doorways?",
        answer: "Even the animals sense that he is unkind.",
        wrong: ["The dogs are frightened of his walking stick.", "Scrooge has kicked them in the past.", "The dogs want to beg him for food.", "Scrooge always walks in the middle of the road."],
        why: ["The author imagines the dogs saying \"No eye at all is better than an evil eye\", so they are avoiding him on purpose.", "Nothing in the passage says he ever touched them. It is his manner that they react to."],
      },
      {
        q: "What is the effect of \"They often came down handsomely, and Scrooge never did\"?",
        answer: "It is a joke that plays on two meanings of coming down.",
        wrong: ["It shows the weather was worse than usual that year.", "It explains why Scrooge stayed indoors.", "It suggests Scrooge was afraid of the rain.", "It tells the reader that Scrooge was often ill."],
        why: ["Rain comes down from the sky, and a generous person comes down handsomely with money. Scrooge does neither.", "Dickens often makes a joke turn on a word having two meanings at once."],
      },
      {
        q: "How does Scrooge feel about being avoided by everybody?",
        answer: "He likes it and prefers to be left alone.",
        wrong: ["He is hurt but pretends not to be.", "He does not notice it at all.", "He is angry about it and blames others.", "He is puzzled by it."],
        why: ["\"But what did Scrooge care! It was the very thing he liked.\"", "This one is stated outright, so you do not have to work it out."],
      },
      {
        q: "Which THREE things does the passage say nobody ever did to Scrooge?",
        answers: ["stopped him to ask how he was", "asked him what the time was", "asked him the way"],
        wrong: ["offered to shake his hand", "wished him a happy birthday"],
        why: ["\"Nobody ever stopped him in the street\" with gladsome looks, and \"no children asked him what it was o'clock\".", "The third is \"no man or woman ever once in all his life inquired the way to such and such a place\"."],
      },
    ],
  },
  {
    id: "railway",
    title: "Before the change",
    source: "from The Railway Children by E. Nesbit, 1906",
    paragraphs: [
      "They were not railway children to begin with. I don't suppose they had ever thought about railways except as a means of getting to Maskelyne and Cook's, the Pantomime, Zoological Gardens, and Madame Tussaud's. They were just ordinary suburban children, and they lived with their Father and Mother in an ordinary red-brick-fronted villa, with coloured glass in the front door, a tiled passage that was called a hall, a bath-room with hot and cold water, electric bells, French windows, and a good deal of white paint, and 'every modern convenience', as the house-agents say.",
      "There were three of them. Roberta was the eldest. Of course, Mothers never have favourites, but if their Mother HAD had a favourite, it might have been Roberta. Next came Peter, who wished to be an Engineer when he grew up; and the youngest was Phyllis, who meant extremely well.",
      "Mother did not spend all her time in paying dull calls to dull ladies, and sitting dully at home waiting for dull ladies to pay calls to her. She was almost always there, ready to play with the children, and read to them, and help them to do their home-lessons. Besides this she used to write stories for them while they were at school, and read them aloud after tea, and she always made up funny pieces of poetry for their birthdays and for other great occasions, such as the christening of the new kittens, or the refurnishing of the doll's house, or the time when they were getting over the mumps.",
      "These three lucky children always had everything they needed: pretty clothes, good fires, a lovely nursery with heaps of toys, and a Mother Goose wall-paper. They had a kind and merry nursemaid, and a dog who was called James, and who was their very own. They also had a Father who was just perfect, never cross, never unjust, and always ready for a game. At least, if at any time he was NOT ready, he always had an excellent reason for it, and explained the reason to the children so interestingly and funnily that they felt sure he couldn't help himself.",
    ],
    questions: [
      {
        q: "What did Peter want to be when he grew up?",
        answer: "An engineer.",
        wrong: ["A railway guard.", "A writer of stories.", "A doctor.", "A house-agent."],
        why: ["\"Next came Peter, who wished to be an Engineer when he grew up.\"", "Straight retrieval. The answer is in the second paragraph."],
      },
      {
        q: "What is the effect of repeating the word \"dull\" in the third paragraph?",
        answer: "It makes those visits sound tedious, so Mother seems livelier by comparison.",
        wrong: ["It shows that Mother was often tired.", "It suggests the ladies were unkind to the children.", "It tells the reader that the family had little money.", "It shows the children were bored with their mother."],
        why: ["\"Dull calls to dull ladies, and sitting dully at home waiting for dull ladies\" hammers the word four times.", "The point of the repetition is what Mother did NOT do, which sets up everything she did do next."],
      },
      {
        q: "What does \"Phyllis, who meant extremely well\" suggest about her?",
        answer: "Her intentions were good but things did not always go right.",
        wrong: ["She was the cleverest of the three.", "She was the quietest of the three.", "She was often unwell.", "She was the eldest of the children."],
        why: ["Saying only that somebody means well is a gentle way of hinting that the results were mixed.", "The narrator is being affectionate and a little bit funny about her here."],
      },
      {
        q: "Which word in the first paragraph tells you the children's home was like many others?",
        answer: "ordinary",
        wrong: ["suburban", "modern", "coloured", "tiled"],
        why: ["The word is used twice: \"just ordinary suburban children\" in \"an ordinary red-brick-fronted villa\".", "The other words describe the house, but only one of them says it was nothing unusual."],
      },
      {
        q: "Which TWO of these does the passage say Mother did for the children?",
        answers: ["wrote stories for them", "made up funny poetry"],
        wrong: ["taught at their school", "took them to the seaside", "painted the nursery walls"],
        why: ["\"She used to write stories for them while they were at school\" and \"she always made up funny pieces of poetry\".", "The other three sound like things a mother might do, but they are not in the passage."],
      },
      {
        q: "What does the narrator think of the children's Father?",
        answer: "That he was almost perfect and always fair.",
        wrong: ["That he was strict but kind underneath.", "That he was often away from home.", "That he cared more about work than his children.", "That he was cheerful but forgetful."],
        why: ["\"A Father who was just perfect--never cross, never unjust, and always ready for a game.\"", "Even when he could not play he explained why, and the children were satisfied."],
      },
      {
        q: "What does \"suburban\" mean in the first paragraph?",
        answer: "living on the outskirts of a town",
        wrong: ["living in the countryside", "living above a shop", "travelling a great deal", "being rather wealthy"],
        why: ["The children live in a villa on the edge of a town, from which they visit places in the city.", "The list of London attractions in the same sentence shows they went into town for treats rather than living there."],
      },
      {
        q: "Why does the author list the coloured glass, tiled passage and electric bells?",
        answer: "To show it was a comfortable and thoroughly ordinary home.",
        wrong: ["To show the family were extremely rich.", "To suggest the house was old and falling down.", "To explain why the children liked railways.", "To show that the house was hard to keep clean."],
        why: ["The list ends with \"every modern convenience, as the house-agents say\", which gently mocks how ordinary it all is.", "The details are there to set up the comfortable life the children are about to lose."],
      },
    ],
  },
  {
    id: "garden",
    title: "The garden nobody had seen",
    source: "from The Secret Garden by Frances Hodgson Burnett, 1911",
    paragraphs: [
      "It was the sweetest, most mysterious-looking place anyone could imagine. The high walls which shut it in were covered with the leafless stems of climbing roses which were so thick that they were matted together. Mary Lennox knew they were roses because she had seen a great many roses in India. All the ground was covered with grass of a wintry brown and out of it grew clumps of bushes which were surely rosebushes if they were alive. There were numbers of standard roses which had so spread their branches that they were like little trees. There were other trees in the garden, and one of the things which made the place look strangest and loveliest was that climbing roses had run all over them and swung down long tendrils which made light swaying curtains, and here and there they had caught at each other or at a far-reaching branch and had crept from one tree to another and made lovely bridges of themselves. There were neither leaves nor roses on them now and Mary did not know whether they were dead or alive, but their thin gray or brown branches and sprays looked like a sort of hazy mantle spreading over everything, walls, and trees, and even brown grass, where they had fallen from their fastenings and run along the ground. It was this hazy tangle from tree to tree which made it all look so mysterious. Mary had thought it must be different from other gardens which had not been left all by themselves so long; and indeed it was different from any other place she had ever seen in her life.",
      "“How still it is!” she whispered. “How still!”",
      "Then she waited a moment and listened at the stillness. The robin, who had flown to his treetop, was still as all the rest. He did not even flutter his wings; he sat without stirring, and looked at Mary.",
      "“No wonder it is still,” she whispered again. “I am the first person who has spoken in here for ten years.”",
    ],
    questions: [
      {
        q: "How did Mary know the leafless stems were roses?",
        answer: "She had seen a great many roses in India.",
        wrong: ["The robin showed her where they were.", "There were roses still flowering on them.", "A gardener had told her about them.", "She read the name on a label."],
        why: ["\"Mary Lennox knew they were roses because she had seen a great many roses in India.\"", "Retrieval, and the reason is given in the same sentence."],
      },
      {
        q: "Which TWO things does the author compare the hanging rose branches to?",
        answers: ["curtains", "bridges"],
        wrong: ["ropes", "ladders", "nets"],
        why: ["They made \"light swaying curtains\", and where they reached from tree to tree they \"made lovely bridges of themselves\".", "Both comparisons make a tangle of dead-looking branches sound beautiful."],
      },
      {
        q: "Which word does Mary repeat to describe the garden?",
        answer: "still",
        wrong: ["dead", "lovely", "strange", "brown"],
        why: ["\"How still it is!\" she whispered. \"How still!\" and then \"No wonder it is still\".", "Repeating a word in speech is a way of showing what has struck the character most."],
      },
      {
        q: "Why does Mary whisper rather than speak normally?",
        answer: "The garden feels secret and undisturbed, and she does not want to break it.",
        wrong: ["She has promised someone not to speak aloud.", "Somebody has told her to keep quiet.", "She has hurt her throat climbing in.", "She is hiding from a gardener nearby."],
        why: ["She says \"How still it is!\" twice before she works out why, so the hush is the first thing she notices.", "Nobody else is there. The quiet comes from the place, not from any danger, which is why she treats it so carefully."],
      },
      {
        q: "What does Mary mean by \"I am the first person who has spoken in here for ten years\"?",
        answer: "The garden has been shut up and unvisited for a very long time.",
        wrong: ["She is the only person allowed inside it.", "Nobody else in the house can speak.", "She has been away from the garden for ten years.", "The garden was only planted ten years ago."],
        why: ["The stillness makes sense to her once she remembers how long the garden has been locked.", "She is working something out aloud, which is why the line comes after the silence, not before it."],
      },
      {
        q: "What is the effect of describing the robin sitting completely still?",
        answer: "It makes the silence of the garden feel complete.",
        wrong: ["It shows that the robin is unwell.", "It suggests the robin is watching for danger.", "It tells the reader that the robin is asleep.", "It shows the robin does not trust Mary."],
        why: ["Even the one living thing that could make a noise does not, so nothing at all breaks the hush.", "The robin is described straight after Mary says how still it is, which links the two."],
      },
      {
        q: "What does \"mysterious\" suggest about the garden?",
        answer: "It is strange in a way that makes you want to know more.",
        wrong: ["It is frightening and best avoided.", "It is untidy and needs a great deal of work.", "It is smaller than it first appears.", "It is dark and difficult to walk through."],
        why: ["The word sits alongside \"sweetest\" and \"loveliest\", so the strangeness is appealing rather than alarming.", "The whole paragraph builds a place Mary wants to explore, not one she wants to leave."],
      },
      {
        q: "Why does Mary wonder whether the roses are dead?",
        answer: "It is winter, so she cannot tell from the bare branches.",
        wrong: ["Somebody has told her the garden was destroyed.", "The robin has been pulling at the stems.", "She can see that the walls have fallen down.", "She has never seen a rose before."],
        why: ["The grass is \"a wintry brown\" and there are \"neither leaves nor roses on them now\", so there is nothing to judge by.", "She says outright that she does not know whether they were dead or alive."],
      },
    ],
  },
  {
    id: "oz",
    title: "A grey little house on the prairie",
    source: "from The Wonderful Wizard of Oz by L. Frank Baum, 1900",
    paragraphs: [
      "Dorothy lived in the midst of the great Kansas prairies, with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer’s wife. Their house was small, for the lumber to build it had to be carried by wagon many miles. There were four walls, a floor and a roof, which made one room; and this room contained a rusty looking cookstove, a cupboard for the dishes, a table, three or four chairs, and the beds. Uncle Henry and Aunt Em had a big bed in one corner, and Dorothy a little bed in another corner. There was no garret at all, and no cellar, except a small hole dug in the ground, called a cyclone cellar, where the family could go in case one of those great whirlwinds arose, mighty enough to crush any building in its path. It was reached by a trap door in the middle of the floor, from which a ladder led down into the small, dark hole.",
      "When Dorothy stood in the doorway and looked around, she could see nothing but the great gray prairie on every side. Not a tree nor a house broke the broad sweep of flat country that reached to the edge of the sky in all directions. The sun had baked the plowed land into a gray mass, with little cracks running through it. Even the grass was not green, for the sun had burned the tops of the long blades until they were the same gray color to be seen everywhere. Once the house had been painted, but the sun blistered the paint and the rains washed it away, and now the house was as dull and gray as everything else.",
      "When Aunt Em came there to live she was a young, pretty wife. The sun and wind had changed her, too. They had taken the sparkle from her eyes and left them a sober gray; they had taken the red from her cheeks and lips, and they were gray also. She was thin and gaunt, and never smiled now. When Dorothy, who was an orphan, first came to her, Aunt Em had been so startled by the child’s laughter that she would scream and press her hand upon her heart whenever Dorothy’s merry voice reached her ears; and she still looked at the little girl with wonder that she could find anything to laugh at.",
    ],
    questions: [
      {
        q: "What was the cyclone cellar?",
        answer: "A small hole dug in the ground to shelter in.",
        wrong: ["A cupboard where the dishes were kept.", "A room built onto the side of the house.", "A deep well for drinking water.", "A shed for storing farm tools."],
        why: ["\"A small hole dug in the ground, called a cyclone cellar, where the family could go in case one of those great whirlwinds arose.\"", "It is reached by a trap door in the floor, so it is under the house rather than beside it."],
      },
      {
        q: "Which colour is repeated again and again in the second paragraph?",
        answer: "gray",
        wrong: ["brown", "green", "yellow", "black"],
        why: ["The prairie, the plowed land, the grass and the house are all described as gray.", "Only one colour word is used over and over, and that repetition is the point."],
      },
      {
        q: "What is the effect of repeating that colour so often?",
        answer: "It makes the whole place feel drained of life.",
        wrong: ["It shows that a storm is coming.", "It suggests the land is covered in dust from the road.", "It tells the reader that Dorothy is colour-blind.", "It shows the family cannot afford paint."],
        why: ["Land, grass, house and even Aunt Em's eyes and cheeks are all the same colour, so nothing stands out anywhere.", "When one word is repeated this often, ask what feeling it builds rather than what it describes."],
      },
      {
        q: "Why does Aunt Em never smile now?",
        answer: "The hard life on the prairie has worn her down.",
        wrong: ["She is angry with Dorothy for laughing.", "She is unwell and in pain.", "She has quarrelled with Uncle Henry.", "She does not like living near the cyclone cellar."],
        why: ["She arrived young and pretty, and \"the sun and wind had changed her\", taking the sparkle from her eyes.", "The passage links her sadness to the place itself, exactly as it does with the grey house and grass."],
      },
      {
        q: "Which TWO things does the passage say the sun had done to the land?",
        answers: ["baked the plowed land into a gray mass", "burned the tops of the long blades of grass"],
        wrong: ["dried up the family's well", "cracked the windows of the house", "set fire to the dry grass"],
        why: ["\"The sun had baked the plowed land into a gray mass\" and \"the sun had burned the tops of the long blades\".", "The sun also blistered the paint, but the question asks about the land."],
      },
      {
        q: "What does \"gaunt\" mean in the third paragraph?",
        answer: "very thin and worn",
        wrong: ["tall and graceful", "cheerful and lively", "pale and frightened", "strong and healthy"],
        why: ["It sits next to \"thin\" and follows a description of everything the sun and wind took from her.", "The whole paragraph is about how much she has lost, so the word has to point the same way."],
      },
      {
        q: "Why does the author mention that Dorothy's laughter startled Aunt Em?",
        answer: "To show how unused to happiness Aunt Em had become.",
        wrong: ["To show that Dorothy was a noisy child.", "To explain why Dorothy was sent to live there.", "To suggest Aunt Em was frightened of children.", "To show that the house had a loud echo."],
        why: ["Aunt Em would \"scream and press her hand upon her heart\" at a child's laugh, which is not a normal reaction to a happy sound.", "The detail measures how grey her life has become, not what Dorothy is like."],
      },
      {
        q: "What does the description of the house suggest about the family?",
        answer: "They are poor and life there is hard.",
        wrong: ["They travel often and do not stay long.", "They prefer living simply by choice.", "They have recently moved in.", "They are saving up for a larger farm."],
        why: ["One room, four walls, no garret and no cellar, and the lumber had to be carried many miles by wagon.", "Nothing suggests they chose it. The wagon detail shows how far they are from anywhere."],
      },
    ],
  },
  {
    id: "heidi",
    title: "Up the mountain path",
    source: "from Heidi by Johanna Spyri, 1881",
    paragraphs: [
      "From the old and pleasantly situated village of Mayenfeld, a footpath winds through green and shady meadows to the foot of the mountains, which on this side look down from their stern and lofty heights upon the valley below. The land grows gradually wilder as the path ascends, and the climber has not gone far before he begins to inhale the fragrance of the short grass and sturdy mountain-plants, for the way is steep and leads directly up to the summits above.",
      "On a clear sunny morning in June two figures might be seen climbing the narrow mountain path; one, a tall strong-looking girl, the other a child whom she was leading by the hand, and whose little checks were so aglow with heat that the crimson color could be seen even through the dark, sunburnt skin. And this was hardly to be wondered at, for in spite of the hot June sun the child was clothed as if to keep off the bitterest frost. She did not look more than five years old, if as much, but what her natural figure was like, it would have been hard to say, for she had apparently two, if not three dresses, one above the other, and over these a thick red woollen shawl wound round about her, so that the little body presented a shapeless appearance, as, with its small feet shod in thick, nailed mountain-shoes, it slowly and laboriously plodded its way up in the heat. The two must have left the valley a good hour's walk behind them, when they came to the hamlet known as Dorfli, which is situated half-way up the mountain. Here the wayfarers met with greetings from all sides, some calling to them from windows, some from open doors, others from outside, for the elder girl was now in her old home. She did not, however, pause in her walk to respond to her friends' welcoming cries and questions, but passed on without stopping for a moment until she reached the last of the scattered houses of the hamlet. Here a voice called to her from the door: \"Wait a moment, Dete; if you are going up higher, I will come with you.\"",
    ],
    questions: [
      {
        q: "In which month are the two figures climbing the mountain?",
        answer: "June",
        wrong: ["March", "September", "December", "August"],
        why: ["\"On a clear sunny morning in June two figures might be seen climbing the narrow mountain path.\"", "Straight retrieval from the second paragraph."],
      },
      {
        q: "What does the passage suggest about the amount of clothing the child is wearing?",
        answer: "Far more than the weather could possibly need.",
        wrong: ["Exactly the right amount for a mountain climb.", "Too little for the cold air higher up.", "Clothes that are much too large for her.", "Clothes borrowed from the older girl."],
        why: ["She has \"two, if not three dresses, one above the other\" and a thick woollen shawl, in the hot June sun.", "The author says she was \"clothed as if to keep off the bitterest frost\", which is the point being made."],
      },
      {
        q: "Which word describes how the child made her way up the path?",
        answer: "laboriously",
        wrong: ["gracefully", "hurriedly", "cheerfully", "carelessly"],
        why: ["\"It slowly and laboriously plodded its way up in the heat.\"", "The word means with great effort, which fits a small child in three dresses on a steep climb."],
      },
      {
        q: "What is the effect of saying \"the little body presented a shapeless appearance\"?",
        answer: "It shows the clothes are so bulky the child is lost inside them.",
        wrong: ["It suggests the child is unwell.", "It shows the child is much older than she looks.", "It tells the reader the child is walking oddly.", "It suggests the path is too dark to see clearly."],
        why: ["The author has just listed the layers, so the shapelessness is the result of them.", "Notice the child is called \"it\" here, which adds to the sense of a bundle rather than a girl."],
      },
      {
        q: "Which TWO of these does the passage say the villagers did as the pair passed?",
        answers: ["called to them from windows", "called to them from open doors"],
        wrong: ["ran out to stop them", "offered them food", "waved from a bridge"],
        why: ["\"Some calling to them from windows, some from open doors, others from outside.\"", "The other three are not in the passage, however likely they sound in a friendly village."],
      },
      {
        q: "What does \"ascends\" mean in the first paragraph?",
        answer: "goes upwards",
        wrong: ["turns sharply", "becomes narrower", "grows darker", "runs alongside a river"],
        why: ["\"The land grows gradually wilder as the path ascends\", and the way \"leads directly up to the summits\".", "The same sentence tells you the path is steep, which points to the meaning."],
      },
      {
        q: "What does the greeting from all sides suggest about the older girl?",
        answer: "She is well known in the village and has lived there before.",
        wrong: ["She is famous throughout the whole country.", "She has been away for only a few days.", "She is expected to stop and deliver a message.", "She is a stranger who has lost her way."],
        why: ["\"The elder girl was now in her old home\", which is why people call out to her from every side.", "She does not stop to answer, which tells you something about her too."],
      },
      {
        q: "Why does the author describe the mountains looking down from \"stern and lofty heights\"?",
        answer: "To make them seem grand and a little forbidding.",
        wrong: ["To show that they are covered in snow.", "To suggest they are dangerous to climb in June.", "To explain why nobody lives on them.", "To show that they are further away than they look."],
        why: ["\"Stern\" gives them a severe, unsmiling quality, and \"lofty\" makes them tower over the valley.", "The gentle meadows come first, so the mountains feel like a change in mood."],
      },
    ],
  },
  {
    id: "women",
    title: "Christmas without presents",
    source: "from Little Women by Louisa May Alcott, 1868",
    paragraphs: [
      "“Christmas won’t be Christmas without any presents,” grumbled Jo, lying on the rug.",
      "“It’s so dreadful to be poor!” sighed Meg, looking down at her old dress.",
      "“I don’t think it’s fair for some girls to have plenty of pretty things, and other girls nothing at all,” added little Amy, with an injured sniff.",
      "“We’ve got Father and Mother, and each other,” said Beth contentedly from her corner.",
      "The four young faces on which the firelight shone brightened at the cheerful words, but darkened again as Jo said sadly, “We haven’t got Father, and shall not have him for a long time.” She didn’t say “perhaps never,” but each silently added it, thinking of Father far away, where the fighting was.",
      "Nobody spoke for a minute; then Meg said in an altered tone, “You know the reason Mother proposed not having any presents this Christmas was because it is going to be a hard winter for everyone; and she thinks we ought not to spend money for pleasure, when our men are suffering so in the army. We can’t do much, but we can make our little sacrifices, and ought to do it gladly. But I am afraid I don’t,” and Meg shook her head, as she thought regretfully of all the pretty things she wanted.",
      "“But I don’t think the little we should spend would do any good. We’ve each got a dollar, and the army wouldn’t be much helped by our giving that. I agree not to expect anything from Mother or you, but I do want to buy Undine and Sintran for myself. I’ve wanted it so long,” said Jo, who was a bookworm.",
      "“I planned to spend mine in new music,” said Beth, with a little sigh, which no one heard but the hearth brush and kettle-holder.",
      "“I shall get a nice box of Faber’s drawing pencils; I really need them,” said Amy decidedly.",
      "“Mother didn’t say anything about our money, and she won’t wish us to give up everything. Let’s each buy what we want, and have a little fun; I’m sure we work hard enough to earn it,” cried Jo, examining the heels of her shoes in a gentlemanly manner.",
    ],
    questions: [
      {
        q: "Why had Mother suggested having no presents this Christmas?",
        answer: "Because it will be a hard winter and men are suffering in the army.",
        wrong: ["Because the girls had behaved badly.", "Because the shops were closed.", "Because Father had forbidden it.", "Because they had already had presents that year."],
        why: ["Meg explains it: \"it is going to be a hard winter for everyone; and she thinks we ought not to spend money for pleasure, when our men are suffering so in the army\".", "It is stated in the passage, so this one is retrieval."],
      },
      {
        q: "Which sister seems most contented with what they have?",
        answer: "Beth",
        wrong: ["Jo", "Meg", "Amy", "Mother"],
        why: ["\"We've got Father and Mother, and each other,\" said Beth contentedly from her corner.", "Her sigh later is heard by nobody, which fits the same quiet character."],
      },
      {
        q: "Which word tells you that Jo loved reading?",
        answer: "bookworm",
        wrong: ["grumbled", "gentlemanly", "contentedly", "regretfully"],
        why: ["\"Said Jo, who was a bookworm.\"", "The others describe how people spoke or moved, not what Jo liked."],
      },
      {
        q: "What is the effect of beginning the story with four short lines of speech?",
        answer: "It introduces each sister's character quickly through what she says.",
        wrong: ["It shows that the sisters are arguing.", "It suggests nobody is listening to anybody else.", "It tells the reader the story is a play.", "It shows the girls are in a great hurry."],
        why: ["A grumble, a sigh, a sniff and a contented remark give you four different personalities in four lines.", "The author lets them speak before describing any of them, which is a quick way to draw characters."],
      },
      {
        q: "Which THREE things do the sisters say they would like to buy for themselves?",
        answers: ["a book", "new music", "drawing pencils"],
        wrong: ["a new dress", "a pair of skates"],
        why: ["Jo wants a book, Beth wants new music and Amy wants a box of drawing pencils.", "Meg is the one who does not name anything, though she does think of \"all the pretty things she wanted\"."],
      },
      {
        q: "What has happened to the girls' father?",
        answer: "He is away where the fighting is.",
        wrong: ["He has gone to find work in another town.", "He is unwell and staying elsewhere.", "He has died during the winter.", "He is travelling and will be home for Christmas."],
        why: ["\"Thinking of Father far away, where the fighting was.\"", "Jo does not say \"perhaps never\", but each sister silently added it, which is why the mood darkens."],
      },
      {
        q: "What does \"sacrifices\" mean in this passage?",
        answer: "giving up things you would like",
        wrong: ["promises made at Christmas", "gifts given to soldiers", "prayers said before a meal", "savings kept for later"],
        why: ["Meg is talking about not spending money on pleasure while others are suffering.", "She says they \"can't do much, but we can make our little sacrifices\", so it means going without."],
      },
      {
        q: "Why does the author say Beth's sigh was heard by \"no one but the hearth brush and kettle-holder\"?",
        answer: "To show that Beth keeps her disappointment to herself.",
        wrong: ["To show that the room was very noisy.", "To suggest her sisters were being unkind.", "To show that Beth was sitting outside.", "To suggest the objects were more important to her."],
        why: ["Naming two household objects as the only listeners is a gentle way of saying nobody noticed her.", "It fits Beth, who is described sitting quietly in her corner."],
      },
    ],
  },
  {
    id: "anne",
    title: "Matthew and the chatterbox",
    source: "from Anne of Green Gables by L. M. Montgomery, 1908",
    paragraphs: [
      "Matthew, much to his own surprise, was enjoying himself. Like most quiet folks he liked talkative people when they were willing to do the talking themselves and did not expect him to keep up his end of it. But he had never expected to enjoy the society of a little girl. Women were bad enough in all conscience, but little girls were worse. He detested the way they had of sidling past him timidly, with sidewise glances, as if they expected him to gobble them up at a mouthful if they ventured to say a word. That was the Avonlea type of well-bred little girl. But this freckled witch was very different, and although he found it rather difficult for his slower intelligence to keep up with her brisk mental processes he thought that he “kind of liked her chatter.” So he said as shyly as usual:",
      "“Oh, you can talk as much as you like. I don’t mind.”",
      "“Oh, I’m so glad. I know you and I are going to get along together fine. It’s such a relief to talk when one wants to and not be told that children should be seen and not heard. I’ve had that said to me a million times if I have once. And people laugh at me because I use big words. But if you have big ideas you have to use big words to express them, haven’t you?”",
      "“Well now, that seems reasonable,” said Matthew.",
      "“Mrs. Spencer said that my tongue must be hung in the middle. But it isn’t, it’s firmly fastened at one end. Mrs. Spencer said your place was named Green Gables. I asked her all about it. And she said there were trees all around it. I was gladder than ever. I just love trees. And there weren’t any at all about the asylum, only a few poor weeny-teeny things out in front with little whitewashed cagey things about them. They just looked like orphans themselves, those trees did. It used to make me want to cry to look at them. I used to say to them, ‘Oh, you poor little things! If you were out in a great big woods with other trees all around you and little mosses and June bells growing over your roots and a brook not far away and birds singing in your branches, you could grow, couldn’t you? But you can’t where you are. I know just exactly how you feel, little trees.’ I felt sorry to leave them behind this morning. You do get so attached to things like that, don’t you? Is there a brook anywhere near Green Gables? I forgot to ask Mrs. Spencer that.”",
    ],
    questions: [
      {
        q: "Why does Matthew enjoy listening to Anne?",
        answer: "She does all the talking, so he does not have to.",
        wrong: ["She talks about subjects he knows well.", "She reminds him of himself as a child.", "She asks him questions he can answer easily.", "She talks more quietly than other children."],
        why: ["\"Like most quiet folks he liked talkative people when they were willing to do the talking themselves.\"", "The narrator explains it directly, which is why Matthew surprises himself."],
      },
      {
        q: "What did Mrs Spencer say about Anne's tongue?",
        answer: "That it must be hung in the middle.",
        wrong: ["That it would get her into trouble.", "That it was quicker than her thoughts.", "That it should be kept still at meals.", "That it was the best thing about her."],
        why: ["Anne repeats it and then argues with it: \"But it isn't, it's firmly fastened at one end.\"", "Anne answering back to the joke is part of what makes her likeable here."],
      },
      {
        q: "Which word does Matthew use for the way Anne talks?",
        answer: "chatter",
        wrong: ["nonsense", "argument", "questions", "speeches"],
        why: ["He thought that he \"kind of liked her chatter\".", "It is a fond word rather than a critical one, which tells you how he feels."],
      },
      {
        q: "What is the effect of Anne speaking to the trees as if they could hear her?",
        answer: "It shows how strong her imagination is and how much she feels for them.",
        wrong: ["It shows that she is not telling the truth.", "It suggests she has no friends her own age.", "It shows that she is frightened of the woods.", "It suggests she has been unwell."],
        why: ["She imagines a whole better life for them, with mosses and a brook and birds, and then says she knows how they feel.", "The trees stand in for her own situation, which is why the speech matters."],
      },
      {
        q: "Which TWO things does Anne say people do to her because of the way she talks?",
        answers: ["laugh at her for using big words", "tell her children should be seen and not heard"],
        wrong: ["refuse to answer her at all", "send her out of the room", "correct her spelling"],
        why: ["\"people laugh at me because I use big words\", and she has been told \"children should be seen and not heard\" a million times.", "The other three are not in the passage, though they sound like things that might happen."],
      },
      {
        q: "What does \"detested\" mean in the first paragraph?",
        answer: "strongly disliked",
        wrong: ["did not notice", "secretly admired", "found amusing", "was puzzled by"],
        why: ["Matthew detested the way little girls sidled past him timidly, which he found uncomfortable.", "The whole sentence lists what he did not enjoy about children, so the word is a strong negative."],
      },
      {
        q: "What does the passage tell us about where Anne has come from?",
        answer: "An orphanage, which she calls the asylum.",
        wrong: ["A farm in another part of the island.", "A school in a large town.", "The home of Mrs Spencer.", "A house with a brook near it."],
        why: ["\"There weren't any at all about the asylum, only a few poor weeny-teeny things out in front.\"", "She compares the trees there to orphans, which is a strong hint about her own situation."],
      },
      {
        q: "What does Anne say the little trees looked like?",
        answer: "Orphans.",
        wrong: ["Soldiers standing in a row.", "A crowd of old women.", "Ghosts in the moonlight.", "A line of green candles."],
        why: ["\"They just looked like orphans themselves, those trees did. It used to make me want to cry to look at them.\"", "The comparison is Anne's own, said aloud, so it is stated in the passage rather than worked out."],
      },
    ],
  },
  {
    id: "tom",
    title: "Aunt Polly hunts for Tom",
    source: "from The Adventures of Tom Sawyer by Mark Twain, 1876",
    paragraphs: [
      "The old lady pulled her spectacles down and looked over them about the room; then she put them up and looked out under them. She seldom or never looked through them for so small a thing as a boy; they were her state pair, the pride of her heart, and were built for “style,” not service, she could have seen through a pair of stove-lids just as well. She looked perplexed for a moment, and then said, not fiercely, but still loud enough for the furniture to hear:",
      "“Well, I lay if I get hold of you I’ll, ”",
      "She did not finish, for by this time she was bending down and punching under the bed with the broom, and so she needed breath to punctuate the punches with. She resurrected nothing but the cat.",
      "“I never did see the beat of that boy!”",
      "She went to the open door and stood in it and looked out among the tomato vines and “jimpson” weeds that constituted the garden. No Tom. So she lifted up her voice at an angle calculated for distance and shouted:",
      "“Y-o-u-u TOM!”",
      "There was a slight noise behind her and she turned just in time to seize a small boy by the slack of his roundabout and arrest his flight.",
      "“There! I might ’a’ thought of that closet. What you been doing in there?”",
      "“Nothing.”",
      "“Nothing! Look at your hands. And look at your mouth. What is that truck?”",
      "“I don’t know, aunt.”",
      "“Well, I know. It’s jam, that’s what it is. Forty times I’ve said if you didn’t let that jam alone I’d skin you. Hand me that switch.”",
      "The switch hovered in the air, the peril was desperate,",
      "“My! Look behind you, aunt!”",
      "The old lady whirled round, and snatched her skirts out of danger. The lad fled on the instant, scrambled up the high board-fence, and disappeared over it.",
      "His aunt Polly stood surprised a moment, and then broke into a gentle laugh.",
      "“Hang the boy, can’t I never learn anything? Ain’t he played me tricks enough like that for me to be looking out for him by this time? But old fools is the biggest fools there is. Can’t learn an old dog new tricks, as the saying is. But my goodness, he never plays them alike, two days, and how is a body to know what’s coming? He ’pears to know just how long he can torment me before I get my dander up, and he knows if he can make out to put me off for a minute or make me laugh, it’s all down again and I can’t hit him a lick. I ain’t doing my duty by that boy, and that’s the Lord’s truth, goodness knows. Spare the rod and spile the child, as the Good Book says. I’m a laying up sin and suffering for us both, I know. He’s full of the Old Scratch, but laws-a-me! he’s my own dead sister’s boy, poor thing, and I ain’t got the heart to lash him, somehow. Every time I let him off, my conscience does hurt me so, and every time I hit him my old heart most breaks. Well-a-well, man that is born of woman is of few days and full of trouble, as the Scripture says, and I reckon it’s so. He’ll play hookey this evening,[*] and I’ll just be obleeged to make him work, tomorrow, to punish him. It’s mighty hard to make him work Saturdays, when all the boys is having holiday, but he hates work more than he hates anything else, and I’ve got to do some of my duty by him, or I’ll be the ruination of the child.”",
    ],
    questions: [
      {
        q: "Why does Aunt Polly look over her spectacles rather than through them?",
        answer: "They were for show rather than for seeing.",
        wrong: ["They were broken across one lens.", "She had left her reading pair upstairs.", "The room was too dark to see through them.", "She only needed them for close work."],
        why: ["\"They were her state pair, the pride of her heart, and were built for style, not service.\"", "She could have seen through a pair of stove lids just as well, which is the joke."],
      },
      {
        q: "What did Aunt Polly find when she punched under the bed with the broom?",
        answer: "The cat.",
        wrong: ["Tom's shoes.", "Nothing at all.", "A pot of jam.", "The missing switch."],
        why: ["\"She resurrected nothing but the cat.\"", "The word resurrected is doing comic work here, as though she had raised the dead."],
      },
      {
        q: "Which word in the passage means to stop something from happening?",
        answer: "arrest",
        wrong: ["resurrected", "punctuate", "constituted", "calculated"],
        why: ["\"Turned just in time to seize a small boy by the slack of his roundabout and arrest his flight.\"", "It is the same word used for stopping a person, which is why it fits a boy running away."],
      },
      {
        q: "How does Aunt Polly know Tom has been at the jam?",
        answer: "By looking at his hands and his mouth.",
        wrong: ["The jar has been left open.", "Sid has told her about it.", "She heard him in the closet.", "There is jam on the floor."],
        why: ["\"Look at your hands. And look at your mouth. What is that truck?\"", "She works it out from the evidence in front of her rather than being told."],
      },
      {
        q: "What is the effect of \"The switch hovered in the air, the peril was desperate\"?",
        answer: "It builds a moment of tension just before the trick.",
        wrong: ["It shows that Tom is badly hurt.", "It suggests Aunt Polly has lost her temper completely.", "It tells the reader that Tom deserves the punishment.", "It shows how long Aunt Polly hesitates every time."],
        why: ["The sentence stops short, and the very next line is Tom's escape trick, so the tension is set up to be popped.", "Notice the sentence is left hanging rather than finished, which holds the moment still."],
      },
      {
        q: "Which TWO places does Aunt Polly search for Tom?",
        answers: ["under the bed", "out in the garden"],
        wrong: ["in the barn", "up the chimney", "behind the door"],
        why: ["She punches under the bed with the broom, then goes to the open door and looks out among the tomato vines and weeds.", "She does NOT look in the closet, which is why she says afterwards that she might have thought of it."],
      },
      {
        q: "What does Aunt Polly's gentle laugh show about her feelings for Tom?",
        answer: "She is fond of him and not really angry.",
        wrong: ["She is relieved that he has gone.", "She is pleased that he told the truth.", "She thinks he will not do it again.", "She is too tired to chase him."],
        why: ["She has just been tricked and lost her chance to punish him, and she laughs instead of shouting.", "The passage moves straight from the switch in the air to a gentle laugh, which tells you where her real feelings sit."],
      },
      {
        q: "What does \"old fools is the biggest fools there is\" tell us about Aunt Polly?",
        answer: "She is laughing at herself for being caught out again.",
        wrong: ["She is angry with the neighbours.", "She thinks Tom is foolish.", "She believes she is getting too old to look after him.", "She is repeating something Tom said to her."],
        why: ["She is scolding herself, not Tom, for falling for a trick she has seen before.", "She goes on to admit she can never guess which trick is coming, which is a fond kind of complaint."],
      },
    ],
  },
  {
    id: "island",
    title: "The captain comes to the inn",
    source: "from Treasure Island by Robert Louis Stevenson, 1883",
    paragraphs: [
      "I remember him as if it were yesterday, as he came plodding to the inn door, his sea-chest following behind him in a hand-barrow, a tall, strong, heavy, nut-brown man, his tarry pigtail falling over the shoulder of his soiled blue coat, his hands ragged and scarred, with black, broken nails, and the sabre cut across one cheek, a dirty, livid white. I remember him looking round the cove and whistling to himself as he did so, and then breaking out in that old sea-song that he sang so often afterwards:",
      "“Fifteen men on the dead man’s chest, Yo-ho-ho, and a bottle of rum!”",
      "in the high, old tottering voice that seemed to have been tuned and broken at the capstan bars. Then he rapped on the door with a bit of stick like a handspike that he carried, and when my father appeared, called roughly for a glass of rum. This, when it was brought to him, he drank slowly, like a connoisseur, lingering on the taste and still looking about him at the cliffs and up at our signboard.",
      "“This is a handy cove,” says he at length; “and a pleasant sittyated grog-shop. Much company, mate?”",
      "My father told him no, very little company, the more was the pity.",
      "“Well, then,” said he, “this is the berth for me. Here you, matey,” he cried to the man who trundled the barrow; “bring up alongside and help up my chest. I’ll stay here a bit,” he continued. “I’m a plain man; rum and bacon and eggs is what I want, and that head up there for to watch ships off. What you mought call me? You mought call me captain. Oh, I see what you’re at, there”; and he threw down three or four gold pieces on the threshold. “You can tell me when I’ve worked through that,” says he, looking as fierce as a commander.",
      "And indeed bad as his clothes were and coarsely as he spoke, he had none of the appearance of a man who sailed before the mast, but seemed like a mate or skipper accustomed to be obeyed or to strike. The man who came with the barrow told us the mail had set him down the morning before at the Royal George, that he had inquired what inns there were along the coast, and hearing ours well spoken of, I suppose, and described as lonely, had chosen it from the others for his place of residence. And that was all we could learn of our guest.",
    ],
    questions: [
      {
        q: "Which word describes the colour of the captain's skin?",
        answer: "nut-brown",
        wrong: ["livid", "tarry", "soiled", "ragged"],
        why: ["\"A tall, strong, heavy, nut-brown man.\"", "The other words describe his scar, his pigtail, his coat and his hands."],
      },
      {
        q: "Which TWO things does the captain say he wants at the inn?",
        answers: ["rum, bacon and eggs", "somewhere to watch ships from"],
        wrong: ["a horse and cart", "a letter to be posted", "a doctor to be sent for"],
        why: ["\"I'm a plain man; rum and bacon and eggs is what I want, and that head up there for to watch ships off.\"", "He says it as a list of two things, which is how the question is framed."],
      },
      {
        q: "What is the effect of the captain singing about a dead man's chest?",
        answer: "It hints that he has a violent past at sea.",
        wrong: ["It shows he is homesick for England.", "It suggests he is a trained singer.", "It tells the reader he is drunk already.", "It shows he wants to entertain the family."],
        why: ["A song about fifteen men on a dead man's chest is not an ordinary sailor's tune, and he sings it often afterwards.", "It arrives before he has said a word to anybody, so it works as a warning to the reader."],
      },
      {
        q: "Why does the narrator think the captain was not an ordinary sailor?",
        answer: "He seemed like a mate or skipper who was used to being obeyed.",
        wrong: ["His clothes were far too fine for a sailor.", "He did not know any sea-songs.", "He arrived by mail coach rather than by ship.", "He could not carry his own sea-chest."],
        why: ["\"He had none of the appearance of a man who sailed before the mast, but seemed like a mate or skipper accustomed to be obeyed or to strike.\"", "His clothes were bad and his speech was rough, so it is his manner that gives it away."],
      },
      {
        q: "What does \"coarsely\" mean in the last paragraph?",
        answer: "roughly and without politeness",
        wrong: ["quietly and shyly", "quickly and clearly", "kindly and warmly", "slowly and carefully"],
        why: ["It is paired with \"bad as his clothes were\", so both are things you might expect to make him seem lowly.", "The sentence then says that in spite of both, he seemed like a man used to command."],
      },
      {
        q: "What did the captain use to knock on the door?",
        answer: "A bit of stick like a handspike.",
        wrong: ["The handle of his sea-chest.", "His fist.", "A gold coin.", "The end of his pigtail."],
        why: ["\"Then he rapped on the door with a bit of stick like a handspike that he carried.\"", "A handspike is a heavy wooden bar used on a ship, which is another hint about who he is."],
      },
      {
        q: "What is the effect of describing the sabre cut as \"a dirty, livid white\"?",
        answer: "It makes the scar vivid and suggests a violent past.",
        wrong: ["It shows the wound is very recent.", "It suggests he is unwell and needs a doctor.", "It tells the reader he works outdoors.", "It shows he has been in an accident at sea."],
        why: ["A sabre is a weapon, so the scar was not an accident, and the colour makes it stand out against the nut-brown face.", "The detail comes in the middle of a list of ordinary features, which makes it land harder."],
      },
      {
        q: "Why had the captain chosen this particular inn?",
        answer: "Because he had heard it was lonely.",
        wrong: ["Because it was the cheapest along the coast.", "Because he knew the family who kept it.", "Because it was closest to the harbour.", "Because the mail coach stopped outside it."],
        why: ["He asked what inns there were along the coast and chose this one after hearing it described as lonely.", "Wanting somewhere out of the way is another clue that he is hiding from something."],
      },
    ],
  },
  {
    id: "fogg",
    title: "A most mysterious gentleman",
    source: "from Around the World in Eighty Days by Jules Verne, 1873",
    paragraphs: [
      "Mr. Phileas Fogg lived, in 1872, at No. 7, Saville Row, Burlington Gardens, the house in which Sheridan died in 1814. He was one of the most noticeable members of the Reform Club, though he seemed always to avoid attracting attention; an enigmatical personage, about whom little was known, except that he was a polished man of the world. People said that he resembled Byron, at least that his head was Byronic; but he was a bearded, tranquil Byron, who might live on a thousand years without growing old.",
      "Certainly an Englishman, it was more doubtful whether Phileas Fogg was a Londoner. He was never seen on ’Change, nor at the Bank, nor in the counting-rooms of the “City”; no ships ever came into London docks of which he was the owner; he had no public employment; he had never been entered at any of the Inns of Court, either at the Temple, or Lincoln’s Inn, or Gray’s Inn; nor had his voice ever resounded in the Court of Chancery, or in the Exchequer, or the Queen’s Bench, or the Ecclesiastical Courts. He certainly was not a manufacturer; nor was he a merchant or a gentleman farmer. His name was strange to the scientific and learned societies, and he never was known to take part in the sage deliberations of the Royal Institution or the London Institution, the Artisan’s Association, or the Institution of Arts and Sciences. He belonged, in fact, to none of the numerous societies which swarm in the English capital, from the Harmonic to that of the Entomologists, founded mainly for the purpose of abolishing pernicious insects.",
      "Phileas Fogg was a member of the Reform, and that was all.",
      "The way in which he got admission to this exclusive club was simple enough.",
      "He was recommended by the Barings, with whom he had an open credit. His cheques were regularly paid at sight from his account current, which was always flush.",
      "Was Phileas Fogg rich? Undoubtedly. But those who knew him best could not imagine how he had made his fortune, and Mr. Fogg was the last person to whom to apply for the information. He was not lavish, nor, on the contrary, avaricious; for, whenever he knew that money was needed for a noble, useful, or benevolent purpose, he supplied it quietly and sometimes anonymously. He was, in short, the least communicative of men. He talked very little, and seemed all the more mysterious for his taciturn manner. His daily habits were quite open to observation; but whatever he did was so exactly the same thing that he had always done before, that the wits of the curious were fairly puzzled.",
    ],
    questions: [
      {
        q: "Which THREE of these does the passage say Phileas Fogg was NOT?",
        answers: ["a manufacturer", "a merchant", "a gentleman farmer"],
        wrong: ["a member of the Reform Club", "a rich man"],
        why: ["\"He certainly was not a manufacturer; nor was he a merchant or a gentleman farmer.\"", "He was both a member of the Reform Club and undoubtedly rich, so those two are the wrong answers."],
      },
      {
        q: "What is the effect of the long list of places Fogg was never seen?",
        answer: "It shows how little anybody actually knew about him.",
        wrong: ["It shows that he disliked the city of London.", "It suggests he was too poor to belong anywhere.", "It proves that he was not really English.", "It shows how much travelling he did."],
        why: ["Bank, docks, courts, societies: the list rules out every ordinary explanation of who a man like that might be.", "Ruling things out one by one leaves a mystery, which is exactly the effect being aimed at."],
      },
      {
        q: "What does \"taciturn\" mean in the last paragraph?",
        answer: "saying very little",
        wrong: ["easily angered", "extremely wealthy", "always punctual", "fond of company"],
        why: ["The same sentence says \"He talked very little, and seemed all the more mysterious for his taciturn manner.\"", "The meaning is given right beside the word, which is often true of a hard word in a passage."],
      },
      {
        q: "How did Fogg give money to good causes?",
        answer: "Quietly, and sometimes without giving his name.",
        wrong: ["Only when he was asked directly.", "In public, at meetings of the Reform Club.", "By leaving it in his will.", "Through the Barings bank."],
        why: ["\"He supplied it quietly and sometimes anonymously.\"", "The passage is careful to say he was neither lavish nor mean, which makes the quietness the point."],
      },
      {
        q: "Which club was Phileas Fogg a member of?",
        answer: "The Reform.",
        wrong: ["The Royal Institution.", "The Harmonic.", "The Artisan's Association.", "The Institution of Arts and Sciences."],
        why: ["\"Phileas Fogg was a member of the Reform, and that was all.\"", "The others are named only as societies he did NOT belong to."],
      },
      {
        q: "Which word in the first paragraph means puzzling or mysterious?",
        answer: "enigmatical",
        wrong: ["polished", "noticeable", "tranquil", "Byronic"],
        why: ["\"An enigmatical personage, about whom little was known.\"", "The rest of the sentence explains it: little was known about him."],
      },
      {
        q: "Why were \"the wits of the curious fairly puzzled\"?",
        answer: "Because he did exactly the same things every day and gave nothing away.",
        wrong: ["Because he changed his habits constantly.", "Because he refused to speak to anyone at all.", "Because he was never seen in daylight.", "Because nobody knew where he lived."],
        why: ["\"His daily habits were quite open to observation; but whatever he did was so exactly the same thing that he had always done before.\"", "Being completely predictable turns out to hide more than being secretive would."],
      },
      {
        q: "What is the effect of calling him \"a bearded, tranquil Byron, who might live on a thousand years without growing old\"?",
        answer: "It makes him seem calm and strangely unchanging.",
        wrong: ["It shows that he was a famous poet.", "It suggests he was much older than he looked.", "It tells the reader he was in poor health.", "It shows that he was vain about his appearance."],
        why: ["Byron was known for storminess, so a tranquil Byron is a deliberate contradiction.", "The thousand years exaggerates how little he ever seems to alter, which fits the rest of the description."],
      },
    ],
  },
  {
    id: "sand",
    title: "The White House",
    source: "from Five Children and It by E. Nesbit, 1902",
    paragraphs: [
      "The house was three miles from the station, but before the dusty hired fly had rattled along for five minutes the children began to put their heads out of the carriage window and to say, 'Aren't we nearly there?' And every time they passed a house, which was not very often, they all said, 'Oh, is THIS it?' But it never was, till they reached the very top of the hill, just past the chalk-quarry and before you come to the gravel-pit. And then there was a white house with a green garden and an orchard beyond, and mother said, 'Here we are!'",
      "'How white the house is,' said Robert.",
      "'And look at the roses,' said Anthea.",
      "'And the plums,' said Jane.",
      "'It is rather decent,' Cyril admitted.",
      "The Baby said, 'Wanty go walky'; and the fly stopped with a last rattle and jolt.",
      "Everyone got its legs kicked or its feet trodden on in the scramble to get out of the carriage that very minute, but no one seemed to mind. Mother, curiously enough, was in no hurry to get out; and even when she had come down slowly and by the step, and with no jump at all, she seemed to wish to see the boxes carried in, and even to pay the driver, instead of joining in that first glorious rush round the garden and the orchard and the thorny, thistly, briery, brambly wilderness beyond the broken gate and the dry fountain at the side of the house. But the children were wiser, for once. It was not really a pretty house at all; it was quite ordinary, and mother thought it was rather inconvenient, and was quite annoyed at there being no shelves, to speak of, and hardly a cupboard in the place. Father used to say that the ironwork on the roof and coping was like an architect's nightmare. But the house was deep in the country, with no other house in sight, and the children had been in London for two years, without so much as once going to the seaside even for a day by an excursion train, and so the White House seemed to them a sort of Fairy Palace set down in an Earthly Paradise. For London is like prison for children, especially if their relations are not rich.",
    ],
    questions: [
      {
        q: "How far was the house from the station?",
        answer: "Three miles.",
        wrong: ["Five miles.", "Just past the station.", "Two years' journey.", "On the other side of London."],
        why: ["\"The house was three miles from the station.\"", "Straight retrieval from the first sentence."],
      },
      {
        q: "What is the effect of the children asking \"Oh, is THIS it?\" every time they pass a house?",
        answer: "It shows how impatient they are to arrive.",
        wrong: ["It shows that they are lost.", "It suggests the houses all look the same.", "It tells the reader they do not want to be there.", "It shows they are frightened of the journey."],
        why: ["They ask after five minutes and then at every house, which is what impatience looks like from the outside.", "The narrator adds \"which was not very often\", so there were not many houses and they asked about all of them."],
      },
      {
        q: "Which THREE things did the children call out about when they first saw the house?",
        answers: ["how white it was", "the roses", "the plums"],
        wrong: ["the orchard wall", "the front door"],
        why: ["Robert says how white the house is, Anthea points out the roses and Jane the plums.", "Cyril only says it is rather decent, and the Baby wants to walk, so those two do not count."],
      },
      {
        q: "Why was Mother in no hurry to get out of the carriage?",
        answer: "She had grown-up jobs to do and did not share their excitement.",
        wrong: ["She was afraid of the horses.", "She had lost something in the carriage.", "She was waiting for Father to arrive.", "She had fallen asleep on the way."],
        why: ["She saw to the boxes and paid the driver instead of rushing round the garden.", "The narrator says the children \"were wiser, for once\", which is a joke at the grown-ups' expense."],
      },
      {
        q: "Which word shows that Cyril was less enthusiastic than the others?",
        answer: "admitted",
        wrong: ["glorious", "curiously", "scramble", "ordinary"],
        why: ["\"It is rather decent, Cyril admitted.\"", "You admit something you would rather not say, so the word shows he is holding back."],
      },
      {
        q: "Why does the author call the house \"a sort of Fairy Palace set down in an Earthly Paradise\"?",
        answer: "To show how it looked to children who had been shut up in London.",
        wrong: ["To show that the house was very grand.", "To suggest the house was haunted.", "To tell the reader the story is not real.", "To show that Mother had chosen well."],
        why: ["The narrator has just said the house was ordinary, and that Mother found it inconvenient.", "The grand words describe the children's view, not the house, which is the joke."],
      },
      {
        q: "What does \"For London is like prison for children\" tell us about the narrator?",
        answer: "The narrator is on the children's side.",
        wrong: ["The narrator dislikes the countryside.", "The narrator has never been to London.", "The narrator thinks the children are ungrateful.", "The narrator is describing a real prison."],
        why: ["It is an aside to the reader explaining why the children were so wild with delight.", "The narrator adds \"especially if their relations are not rich\", which is sympathy rather than criticism."],
      },
      {
        q: "What did Father say the ironwork on the roof looked like?",
        answer: "An architect's nightmare.",
        wrong: ["A fairy palace.", "A birdcage.", "A ship's rigging.", "A crown."],
        why: ["\"Father used to say that the ironwork on the roof and coping was like an architect's nightmare.\"", "It is one of several details showing the house was not actually handsome."],
      },
    ],
  },
  {
    id: "beagle",
    title: "The tortoises and the springs",
    source: "from The Voyage of the Beagle by Charles Darwin, 1839",
    paragraphs: [
      "The tortoise is very fond of water, drinking large quantities, and wallowing in the mud. The larger islands alone possess springs, and these are always situated towards the central parts, and at a considerable height. The tortoises, therefore, which frequent the lower districts, when thirsty, are obliged to travel from a long distance. Hence broad and well-beaten paths branch off in every direction from the wells down to the sea-coast; and the Spaniards by following them up, first discovered the watering-places. When I landed at Chatham Island, I could not imagine what animal travelled so methodically along well-chosen tracks. Near the springs it was a curious spectacle to behold many of these huge creatures, one set eagerly travelling onwards with outstretched necks, and another set returning, after having drunk their fill. When the tortoise arrives at the spring, quite regardless of any spectator, he buries his head in the water above his eyes, and greedily swallows great mouthfuls, at the rate of about ten in a minute. The inhabitants say each animal stays three or four days in the neighbourhood of the water, and then returns to the lower country; but they differed respecting the frequency of these visits. The animal probably regulates them according to the nature of the food on which it has lived. It is, however, certain, that tortoises can subsist even on these islands where there is no other water than what falls during a few rainy days in the year.",
      "I believe it is well ascertained, that the bladder of the frog acts as a reservoir for the moisture necessary to its existence: such seems to be the case with the tortoise. For some time after a visit to the springs, their urinary bladders are distended with fluid, which is said gradually to decrease in volume, and to become less pure. The inhabitants, when walking in the lower district, and overcome with thirst, often take advantage of this circumstance, and drink the contents of the bladder if full: in one I saw killed, the fluid was quite limpid, and had only a very slightly bitter taste. The inhabitants, however, always first drink the water in the pericardium, which is described as being best.",
    ],
    questions: [
      {
        q: "Where are the springs found on the larger islands?",
        answer: "Towards the middle, high up.",
        wrong: ["Along the sea-coast.", "In the mud where the tortoises wallow.", "On the smaller islands only.", "At the bottom of the well-beaten paths."],
        why: ["\"These are always situated towards the central parts, and at a considerable height.\"", "That is why the tortoises in the low districts have to travel so far."],
      },
      {
        q: "How did the Spaniards first discover the watering places?",
        answer: "By following the tortoises' well-beaten paths.",
        wrong: ["By digging wells in the central parts.", "By asking the inhabitants of the islands.", "By watching where the rain collected.", "By exploring the coast in boats."],
        why: ["\"Broad and well-beaten paths branch off in every direction from the wells down to the sea-coast; and the Spaniards by following them up, first discovered the watering-places.\"", "The animals had already solved the problem, which is the point of the observation."],
      },
      {
        q: "Which TWO things does the passage say the tortoise does when it reaches the spring?",
        answers: ["buries its head in the water above its eyes", "swallows great mouthfuls"],
        wrong: ["washes the mud from its shell", "calls to the other tortoises", "sleeps beside the water"],
        why: ["\"He buries his head in the water above his eyes, and greedily swallows great mouthfuls, at the rate of about ten in a minute.\"", "The wallowing in mud happens elsewhere, not at the spring."],
      },
      {
        q: "Which word means in an orderly, planned way?",
        answer: "methodically",
        wrong: ["greedily", "eagerly", "curiously", "gradually"],
        why: ["\"I could not imagine what animal travelled so methodically along well-chosen tracks.\"", "It is the regularity of the tracks that puzzles him, not the speed or the number."],
      },
      {
        q: "Why could the writer not imagine what animal had made the tracks?",
        answer: "The paths were so regular and well chosen that they seemed planned.",
        wrong: ["The tracks were far too small for a large animal.", "He had never landed on the island before.", "The tracks disappeared into the sea.", "There were no animals to be seen anywhere."],
        why: ["He describes them as \"well-chosen tracks\" travelled \"methodically\", which does not look like the work of an animal.", "He does see the tortoises later, at the springs, which is how the puzzle is solved."],
      },
      {
        q: "What is the effect of \"quite regardless of any spectator\"?",
        answer: "It shows how single-minded the tortoise is about drinking.",
        wrong: ["It shows the tortoise cannot see very well.", "It suggests the tortoise is tame and friendly.", "It tells the reader that nobody was watching.", "It shows the tortoise is frightened of people."],
        why: ["A wild animal would normally take notice of a person standing over it, and this one does not even pause.", "The phrase sits just before the description of ten mouthfuls a minute, which makes the same point."],
      },
      {
        q: "How many mouthfuls a minute does the tortoise swallow?",
        answer: "About ten.",
        wrong: ["About three.", "About twenty.", "About fifty.", "About one hundred."],
        why: ["\"Greedily swallows great mouthfuls, at the rate of about ten in a minute.\"", "Precise numbers like this are typical of writing that records observations."],
      },
      {
        q: "What does the passage suggest the islanders do when they are overcome with thirst?",
        answer: "They drink fluid taken from a tortoise.",
        wrong: ["They walk up to the central springs.", "They wait for the yearly rains.", "They follow the tortoise paths to the coast.", "They collect dew from the plants."],
        why: ["\"The inhabitants, when walking in the lower district, and overcome with thirst, often take advantage of this circumstance.\"", "The writer even reports which fluid is considered best, which shows how commonly it was done."],
      },
    ],
  },
  {
    id: "gulliver",
    title: "Tied to the ground",
    source: "from Gulliver’s Travels by Jonathan Swift, 1726",
    paragraphs: [
      "I attempted to rise, but was not able to stir: for, as I happened to lie on my back, I found my arms and legs were strongly fastened on each side to the ground; and my hair, which was long and thick, tied down in the same manner. I likewise felt several slender ligatures across my body, from my arm-pits to my thighs. I could only look upwards; the sun began to grow hot, and the light offended my eyes. I heard a confused noise about me; but in the posture I lay, could see nothing except the sky. In a little time I felt something alive moving on my left leg, which advancing gently forward over my breast, came almost up to my chin; when, bending my eyes downwards as much as I could, I perceived it to be a human creature not six inches high, with a bow and arrow in his hands, and a quiver at his back. In the mean time, I felt at least forty more of the same kind (as I conjectured) following the first. I was in the utmost astonishment, and roared so loud, that they all ran back in a fright; and some of them, as I was afterwards told, were hurt with the falls they got by leaping from my sides upon the ground. However, they soon returned, and one of them, who ventured so far as to get a full sight of my face, lifting up his hands and eyes by way of admiration, cried out in a shrill but distinct voice, Hekinah degul: the others repeated the same words several times, but then I knew not what they meant. I lay all this while, as the reader may believe, in great uneasiness. At length, struggling to get loose, I had the fortune to break the strings, and wrench out the pegs that fastened my left arm to the ground; for, by lifting it up to my face, I discovered the methods they had taken to bind me, and at the same time with a violent pull, which gave me excessive pain, I a little loosened the strings that tied down my hair on the left side, so that I was just able to turn my head about two inches. But the creatures ran off a second time, before I could seize them; whereupon there was a great shout in a very shrill accent, and after it ceased I heard one of them cry aloud Tolgo phonac; when in an instant I felt above a hundred arrows discharged on my left hand, which, pricked me like so many needles; and besides, they shot another flight into the air, as we do bombs in Europe, whereof many, I suppose, fell on my body, (though I felt them not), and some on my face, which I immediately covered with my left hand.",
    ],
    questions: [
      {
        q: "Why is the narrator unable to move?",
        answer: "His arms, legs and hair are tied to the ground.",
        wrong: ["He has been badly injured in a fall.", "He is trapped under a fallen tree.", "He is too weak from hunger to stand.", "He is buried up to his waist in sand."],
        why: ["\"I found my arms and legs were strongly fastened on each side to the ground; and my hair, which was long and thick, tied down in the same manner.\"", "He also feels slender ligatures across his body, so he is pinned at every point."],
      },
      {
        q: "Which word in the passage means the thin cords tying him down?",
        answer: "ligatures",
        wrong: ["quiver", "posture", "astonishment", "conjectured"],
        why: ["\"I likewise felt several slender ligatures across my body, from my arm-pits to my thighs.\"", "The other words are in the passage but describe a case for arrows, the way he was lying, his feeling, and his guessing."],
      },
      {
        q: "Which TWO things is the first little creature carrying?",
        answers: ["a bow and arrow", "a quiver"],
        wrong: ["a lantern", "a length of rope", "a small hammer"],
        why: ["\"A human creature not six inches high, with a bow and arrow in his hands, and a quiver at his back.\"", "The other three are not mentioned anywhere in the passage."],
      },
      {
        q: "What is the effect of telling us the creature is \"not six inches high\"?",
        answer: "It makes the strangeness of the scene clear in a single detail.",
        wrong: ["It shows the narrator is looking from far away.", "It suggests the creature is a child.", "It explains why the narrator cannot move.", "It shows that the narrator is dreaming."],
        why: ["Everything up to that point could be an ordinary capture. The measurement is the moment it stops being ordinary.", "Swift gives an exact size rather than saying tiny, which makes it harder to dismiss."],
      },
      {
        q: "Why do the creatures run away the first time?",
        answer: "The narrator roared very loudly.",
        wrong: ["He broke one of his arms free.", "The sun grew too hot for them.", "He fired an arrow back at them.", "Their leader called them away."],
        why: ["\"I was in the utmost astonishment, and roared so loud, that they all ran back in a fright.\"", "Some were hurt leaping from his sides, which tells you how fast they fled."],
      },
      {
        q: "What does \"conjectured\" mean in the passage?",
        answer: "guessed",
        wrong: ["counted exactly", "remembered", "hoped", "shouted"],
        why: ["He says at least forty more followed \"as I conjectured\", because he could not turn his head to count them.", "He can only look upwards, so an exact count is impossible and he has to estimate."],
      },
      {
        q: "Why does the author say the arrows \"pricked me like so many needles\"?",
        answer: "It shows the tiny weapons hurt without being deadly.",
        wrong: ["It shows the narrator is being sewn to the ground.", "It suggests the arrows are made of metal.", "It tells the reader he cannot feel anything.", "It shows that the creatures are skilled hunters."],
        why: ["A hundred arrows from six-inch archers would sting rather than wound, and a needle is exactly that kind of pain.", "The comparison keeps the scene comic rather than frightening, which is the tone Swift wants."],
      },
      {
        q: "What does the narrator do when arrows begin to fall on his face?",
        answer: "He covers it with his free left hand.",
        wrong: ["He shuts his eyes and lies still.", "He rolls onto his side.", "He shouts at the creatures to stop.", "He pulls his other arm free."],
        why: ["\"Some on my face, which I immediately covered with my left hand.\"", "His left hand is the only one he has managed to free, which is why he can do it at all."],
      },
    ],
  },
  {
    id: "lowood",
    title: "Burnt porridge",
    source: "from Jane Eyre by Charlotte Bronte, 1847",
    paragraphs: [
      "Disgusting! The porridge is burnt again!”",
      "“Silence!” ejaculated a voice; not that of Miss Miller, but one of the upper teachers, a little and dark personage, smartly dressed, but of somewhat morose aspect, who installed herself at the top of one table, while a more buxom lady presided at the other. I looked in vain for her I had first seen the night before; she was not visible: Miss Miller occupied the foot of the table where I sat, and a strange, foreign-looking, elderly lady, the French teacher, as I afterwards found, took the corresponding seat at the other board. A long grace was said and a hymn sung; then a servant brought in some tea for the teachers, and the meal began.",
      "Ravenous, and now very faint, I devoured a spoonful or two of my portion without thinking of its taste; but the first edge of hunger blunted, I perceived I had got in hand a nauseous mess; burnt porridge is almost as bad as rotten potatoes; famine itself soon sickens over it. The spoons were moved slowly: I saw each girl taste her food and try to swallow it; but in most cases the effort was soon relinquished. Breakfast was over, and none had breakfasted. Thanks being returned for what we had not got, and a second hymn chanted, the refectory was evacuated for the schoolroom. I was one of the last to go out, and in passing the tables, I saw one teacher take a basin of the porridge and taste it; she looked at the others; all their countenances expressed displeasure, and one of them, the stout one, whispered,",
      "“Abominable stuff! How shameful!”",
      "A quarter of an hour passed before lessons again began, during which the schoolroom was in a glorious tumult; for that space of time it seemed to be permitted to talk loud and more freely, and they used their privilege. The whole conversation ran on the breakfast, which one and all abused roundly. Poor things! it was the sole consolation they had. Miss Miller was now the only teacher in the room: a group of great girls standing about her spoke with serious and sullen gestures. I heard the name of Mr. Brocklehurst pronounced by some lips; at which Miss Miller shook her head disapprovingly; but she made no great effort to check the general wrath; doubtless she shared in it.",
    ],
    questions: [
      {
        q: "Why did almost none of the girls eat their breakfast?",
        answer: "The porridge was burnt and sickening.",
        wrong: ["They were not given enough time.", "They were told to wait for the teachers.", "They had already eaten earlier.", "They were too nervous to eat."],
        why: ["\"I perceived I had got in hand a nauseous mess; burnt porridge is almost as bad as rotten potatoes.\"", "Each girl tastes it and tries to swallow, but in most cases the effort is soon given up."],
      },
      {
        q: "Which word in the passage shows how hungry the narrator was?",
        answer: "Ravenous",
        wrong: ["morose", "buxom", "nauseous", "sullen"],
        why: ["\"Ravenous, and now very faint, I devoured a spoonful or two of my portion without thinking of its taste.\"", "The other words describe two of the teachers, the food, and the older girls."],
      },
      {
        q: "What is the effect of \"Breakfast was over, and none had breakfasted\"?",
        answer: "It states plainly, in one line, that they were given nothing they could eat.",
        wrong: ["It shows the meal was finished very quickly.", "It suggests the girls were being punished.", "It tells the reader breakfast was cancelled.", "It shows that the narrator arrived too late."],
        why: ["The sentence contradicts itself on purpose: the meal happened, the eating did not.", "Putting it so briefly makes it land harder than a long complaint would."],
      },
      {
        q: "What do the teachers think of the porridge?",
        answer: "They find it as disgusting as the girls do.",
        wrong: ["They think the girls are being fussy.", "They have not noticed anything wrong.", "They blame the girls for complaining.", "They think it is good enough for children."],
        why: ["One tastes it, and their faces \"expressed displeasure\"; the stout one whispers \"Abominable stuff! How shameful!\"", "The narrator sees this on her way out, which is why we learn it at all."],
      },
      {
        q: "Which TWO things happened before the meal began?",
        answers: ["a long grace was said", "a hymn was sung"],
        wrong: ["the windows were opened", "the girls washed their hands", "a register was called"],
        why: ["\"A long grace was said and a hymn sung; then a servant brought in some tea for the teachers, and the meal began.\"", "The other three are not in the passage."],
      },
      {
        q: "What does \"nauseous\" mean in the passage?",
        answer: "sickening to eat",
        wrong: ["far too hot", "very plain", "strangely sweet", "cold and lumpy"],
        why: ["It is followed straight away by a comparison with rotten potatoes.", "The whole sentence is about food that hunger itself cannot get down."],
      },
      {
        q: "Why does Miss Miller not stop the girls complaining?",
        answer: "She probably agreed with them.",
        wrong: ["She could not hear them over the noise.", "She had been told to let them talk.", "She was too frightened of the older girls.", "She had left the room already."],
        why: ["\"She made no great effort to check the general wrath; doubtless she shared in it.\"", "The narrator is guessing, but says so, which is why the word doubtless is there."],
      },
      {
        q: "Why does the narrator call the complaining \"the sole consolation they had\"?",
        answer: "To show how little comfort the girls were given.",
        wrong: ["To show that the girls enjoyed arguing.", "To suggest the girls were ungrateful.", "To explain why the teachers were angry.", "To show that the girls had no friends."],
        why: ["They had no breakfast and only a quarter of an hour of freedom, and grumbling was all they got out of it.", "The words \"Poor things!\" just before it tell you where the narrator's sympathy lies."],
      },
    ],
  },
  {
    id: "havisham",
    title: "The stopped clock of a room",
    source: "from Great Expectations by Charles Dickens, 1861",
    paragraphs: [
      "I entered, therefore, and found myself in a pretty large room, well lighted with wax candles. No glimpse of daylight was to be seen in it. It was a dressing-room, as I supposed from the furniture, though much of it was of forms and uses then quite unknown to me. But prominent in it was a draped table with a gilded looking-glass, and that I made out at first sight to be a fine lady’s dressing-table.",
      "Whether I should have made out this object so soon if there had been no fine lady sitting at it, I cannot say. In an arm-chair, with an elbow resting on the table and her head leaning on that hand, sat the strangest lady I have ever seen, or shall ever see.",
      "She was dressed in rich materials, satins, and lace, and silks, all of white. Her shoes were white. And she had a long white veil dependent from her hair, and she had bridal flowers in her hair, but her hair was white. Some bright jewels sparkled on her neck and on her hands, and some other jewels lay sparkling on the table. Dresses, less splendid than the dress she wore, and half-packed trunks, were scattered about. She had not quite finished dressing, for she had but one shoe on, the other was on the table near her hand, her veil was but half arranged, her watch and chain were not put on, and some lace for her bosom lay with those trinkets, and with her handkerchief, and gloves, and some flowers, and a Prayer-Book all confusedly heaped about the looking-glass.",
      "It was not in the first few moments that I saw all these things, though I saw more of them in the first moments than might be supposed. But I saw that everything within my view which ought to be white, had been white long ago, and had lost its lustre and was faded and yellow. I saw that the bride within the bridal dress had withered like the dress, and like the flowers, and had no brightness left but the brightness of her sunken eyes. I saw that the dress had been put upon the rounded figure of a young woman, and that the figure upon which it now hung loose had shrunk to skin and bone. Once, I had been taken to see some ghastly waxwork at the Fair, representing I know not what impossible personage lying in state. Once, I had been taken to one of our old marsh churches to see a skeleton in the ashes of a rich dress that had been dug out of a vault under the church pavement. Now, waxwork and skeleton seemed to have dark eyes that moved and looked at me. I should have cried out, if I could.",
    ],
    questions: [
      {
        q: "How was the room lit?",
        answer: "By wax candles.",
        wrong: ["By daylight through a tall window.", "By a single oil lamp.", "By a fire in the grate.", "By the jewels sparkling on the table."],
        why: ["\"I entered, therefore, and found myself in a pretty large room, well lighted with wax candles. No glimpse of daylight was to be seen in it.\"", "The absence of daylight is mentioned first, which sets the strangeness before anything else happens."],
      },
      {
        q: "Which THREE of these does the passage say were white?",
        answers: ["her shoes", "her veil", "her hair"],
        wrong: ["her jewels", "the candles"],
        why: ["\"Her shoes were white. And she had a long white veil dependent from her hair... but her hair was white.\"", "The jewels sparkled rather than being white, and the candles are not described by colour."],
      },
      {
        q: "Which word in the passage means brightness or shine?",
        answer: "lustre",
        wrong: ["dependent", "splendid", "trinkets", "ghastly"],
        why: ["\"Had lost its lustre and was faded and yellow.\"", "It is used to describe what the white things no longer have."],
      },
      {
        q: "What is the effect of comparing the lady to waxwork and to a skeleton?",
        answer: "It makes her seem barely alive.",
        wrong: ["It shows that she is a statue rather than a person.", "It suggests she is dressed up for a fair.", "It tells the reader she has been buried.", "It shows the narrator has a poor memory."],
        why: ["Both comparisons are things that look like a person but are not one, and both come from frightening memories.", "The narrator then says the waxwork and skeleton seemed to have eyes that moved, which is what tips it into horror."],
      },
      {
        q: "What does the one shoe and the half-arranged veil suggest?",
        answer: "She stopped dressing suddenly and never finished.",
        wrong: ["She was dressing in a great hurry.", "She had been interrupted by the narrator.", "She was too ill to dress herself.", "She had been dressed by somebody else."],
        why: ["Her watch is not put on, her lace and gloves are heaped about, and half-packed trunks stand around the room.", "Everything is stopped at the same moment, which is the detail the whole description turns on."],
      },
      {
        q: "What does \"confusedly heaped\" mean?",
        answer: "piled up in a muddle",
        wrong: ["arranged very neatly", "hidden out of sight", "thrown away", "stacked in boxes"],
        why: ["The lace, handkerchief, gloves, flowers and Prayer-Book are all lying together around the looking-glass.", "It is the opposite of how a dressing-table would look if somebody had finished with it."],
      },
      {
        q: "Why does the narrator say \"I should have cried out, if I could\"?",
        answer: "He was so frightened that he could not make a sound.",
        wrong: ["He had been told to stay silent.", "He did not want to wake the lady.", "He was too far away to be heard.", "He had lost his voice from the cold."],
        why: ["It comes straight after the waxwork and skeleton seem to look at him, so the fear is at its highest there.", "Saying he could not cry out is stronger than saying he was afraid."],
      },
      {
        q: "What does the passage suggest about how long the room has been like this?",
        answer: "A very long time, because everything has faded and yellowed.",
        wrong: ["Only a few hours.", "Since the previous evening.", "About a week.", "It has just been arranged that morning."],
        why: ["\"Everything within my view which ought to be white, had been white long ago, and had lost its lustre and was faded and yellow.\"", "The bride has withered like the dress and the flowers, which takes years rather than days."],
      },
    ],
  },
  {
    id: "ice",
    title: "The ship is beset",
    source: "from South by Sir Ernest Shackleton, 1919",
    paragraphs: [
      "During the night a moderate north-easterly gale sprang up, and a survey of the position on the 20th showed that the ship was firmly beset. The ice was packed heavily and firmly all round the Endurance in every direction as far as the eye could reach from the masthead. There was nothing to be done till the conditions changed, and we waited through that day and the succeeding days with increasing anxiety. The east-north-easterly gale that had forced us to take shelter behind the stranded berg on the 16th had veered later to the north-east, and it continued with varying intensity until the 22nd. Apparently this wind had crowded the ice into the bight of the Weddell Sea, and the ship was now drifting south-west with the floes which had enclosed it. A slight movement of the ice round the ship caused the rudder to become dangerously jammed on the 21st, and we had to cut away the ice with ice-chisels, heavy pieces of iron with 6-ft. wooden hafts. We kept steam up in readiness for a move if the opportunity offered, and the engines running full speed ahead helped to clear the rudder. Land was in sight to the east and south about sixteen miles distant on the 22nd. The land-ice seemed to be faced with ice-cliffs at most points, but here and there slopes ran down to sea-level. Large crevassed areas in terraces parallel with the coast showed where the ice was moving down over foot-hills. The inland ice appeared for the most part to be undulating, smooth, and easy to march over, but many crevasses might have been concealed from us by the surface snow or by the absence of shadows. I thought that the land probably rose to a height of 5000 ft. forty or fifty miles inland. The accurate estimation of heights and distances in the Antarctic is always difficult, owing to the clear air, the confusing monotony of colouring, and the deceptive effect of mirage and refraction. The land appeared to increase in height to the southward, where we saw a line of land or barrier that must have been seventy miles, and possibly was even more distant.",
    ],
    questions: [
      {
        q: "What was the name of the ship?",
        answer: "The Endurance",
        wrong: ["The Weddell", "The Governor Higginson", "The Beagle", "The Discovery"],
        why: ["\"The ice was packed heavily and firmly all round the Endurance in every direction.\"", "It is named once, so this rewards reading carefully rather than skimming."],
      },
      {
        q: "Which TWO things did the crew do about the jammed rudder?",
        answers: ["cut the ice away with ice-chisels", "ran the engines full speed ahead"],
        wrong: ["lowered a boat to push the ice", "waited for the gale to drop", "tied the rudder in position"],
        why: ["\"We had to cut away the ice with ice-chisels... and the engines running full speed ahead helped to clear the rudder.\"", "The other three are not in the passage."],
      },
      {
        q: "Which word in the passage means trapped and surrounded by ice?",
        answer: "beset",
        wrong: ["stranded", "crevassed", "undulating", "jammed"],
        why: ["\"A survey of the position on the 20th showed that the ship was firmly beset.\"", "Jammed is used for the rudder, not for the ship, and the other two describe the land."],
      },
      {
        q: "Why was there \"nothing to be done till the conditions changed\"?",
        answer: "The ice was packed solid all round as far as anyone could see.",
        wrong: ["The crew had run out of fuel.", "The rudder had been lost completely.", "It was too dark to work.", "The gale made it unsafe to go on deck."],
        why: ["The ice reached \"in every direction as far as the eye could reach from the masthead\".", "They keep steam up in readiness, which shows they would have moved if they could."],
      },
      {
        q: "How far away was land on the 22nd?",
        answer: "About sixteen miles.",
        wrong: ["About five miles.", "About fifty miles.", "About seventy miles.", "About five thousand feet."],
        why: ["\"Land was in sight to the east and south about sixteen miles distant on the 22nd.\"", "Seventy miles is the distance to a further line of land, and five thousand feet is a height, not a distance."],
      },
      {
        q: "Why is judging heights and distances difficult in the Antarctic?",
        answer: "The clear air, the sameness of the colours, and mirages.",
        wrong: ["The constant darkness in winter.", "The height of the waves.", "The lack of any landmarks at all.", "The speed at which the ship is drifting."],
        why: ["\"Owing to the clear air, the confusing monotony of colouring, and the deceptive effect of mirage and refraction.\"", "He says his own estimate of 5000 ft is only what he thought, which shows he is being careful."],
      },
      {
        q: "What does \"undulating\" mean in the passage?",
        answer: "gently rising and falling",
        wrong: ["covered in deep snow", "broken into cliffs", "sloping steeply downwards", "split by wide cracks"],
        why: ["It is used with smooth and easy to march over, so it cannot mean rough or steep.", "The crevassed terraces are described separately, as the places where the ice is moving."],
      },
      {
        q: "What does \"increasing anxiety\" tell us about the crew?",
        answer: "They grew more worried as the days passed with no change.",
        wrong: ["They were arguing about what to do next.", "They were frightened of the wildlife.", "They were running short of food.", "They had given up hope entirely."],
        why: ["\"We waited through that day and the succeeding days with increasing anxiety.\"", "Nothing else in the passage suggests panic. The worry builds because nothing changes."],
      },
    ],
  },
  {
    id: "sea",
    title: "An enormous thing",
    source: "from Twenty Thousand Leagues Under the Sea by Jules Verne, 1870",
    paragraphs: [
      "The year 1866 was signalised by a remarkable incident, a mysterious and puzzling phenomenon, which doubtless no one has yet forgotten. Not to mention rumours which agitated the maritime population and excited the public mind, even in the interior of continents, seafaring men were particularly excited. Merchants, common sailors, captains of vessels, skippers, both of Europe and America, naval officers of all countries, and the Governments of several states on the two continents, were deeply interested in the matter.",
      "For some time past, vessels had been met by “an enormous thing,” a long object, spindle-shaped, occasionally phosphorescent, and infinitely larger and more rapid in its movements than a whale.",
      "The facts relating to this apparition (entered in various log-books) agreed in most respects as to the shape of the object or creature in question, the untiring rapidity of its movements, its surprising power of locomotion, and the peculiar life with which it seemed endowed. If it was a cetacean, it surpassed in size all those hitherto classified in science. Taking into consideration the mean of observations made at divers times, rejecting the timid estimate of those who assigned to this object a length of two hundred feet, equally with the exaggerated opinions which set it down as a mile in width and three in length, we might fairly conclude that this mysterious being surpassed greatly all dimensions admitted by the ichthyologists of the day, if it existed at all. And that it did exist was an undeniable fact; and, with that tendency which disposes the human mind in favour of the marvellous, we can understand the excitement produced in the entire world by this supernatural apparition. As to classing it in the list of fables, the idea was out of the question.",
      "On the 20th of July, 1866, the steamer Governor Higginson, of the Calcutta and Burnach Steam Navigation Company, had met this moving mass five miles off the east coast of Australia. Captain Baker thought at first that he was in the presence of an unknown sandbank; he even prepared to determine its exact position, when two columns of water, projected by the inexplicable object, shot with a hissing noise a hundred and fifty feet up into the air. Now, unless the sandbank had been submitted to the intermittent eruption of a geyser, the Governor Higginson had to do neither more nor less than with an aquatic mammal, unknown till then, which threw up from its blow-holes columns of water mixed with air and vapour.",
    ],
    questions: [
      {
        q: "In which year did the strange sightings begin?",
        answer: "1866",
        wrong: ["1856", "1876", "1886", "1896"],
        why: ["\"The year 1866 was signalised by a remarkable incident.\"", "The date of the first sighting, 20th July 1866, is given later in the passage."],
      },
      {
        q: "Which word in the passage means giving off light in the dark?",
        answer: "phosphorescent",
        wrong: ["spindle-shaped", "cetacean", "intermittent", "inexplicable"],
        why: ["\"A long object, spindle-shaped, occasionally phosphorescent.\"", "Spindle-shaped describes its outline, a cetacean is a whale, and the other two describe a geyser and the object itself."],
      },
      {
        q: "Which THREE of these does the passage say were interested in the matter?",
        answers: ["merchants", "naval officers", "governments"],
        wrong: ["newspaper editors", "schoolteachers"],
        why: ["\"Merchants, common sailors, captains of vessels, skippers... naval officers of all countries, and the Governments of several states.\"", "Sailors, captains and skippers were interested too, but the other two are not mentioned at all."],
      },
      {
        q: "What is the effect of putting \"an enormous thing\" in quotation marks?",
        answer: "It shows that nobody could say what it actually was.",
        wrong: ["It shows that somebody was lying about it.", "It tells the reader the words come from a poem.", "It suggests the object was not really very big.", "It shows the words were painted on a sign."],
        why: ["The phrase is vague on purpose, and the marks show it is what people were saying rather than a description.", "The rest of the paragraph then tries to be precise about shape and speed, which makes the contrast clear."],
      },
      {
        q: "Why did Captain Baker change his mind about the sandbank?",
        answer: "Two columns of water shot high into the air.",
        wrong: ["The sandbank began to move towards him.", "He saw the creature's eyes.", "Another ship warned him by signal.", "His charts showed no sandbank there."],
        why: ["\"Two columns of water, projected by the inexplicable object, shot with a hissing noise a hundred and fifty feet up into the air.\"", "Sandbanks do not spout, which is exactly the reasoning the passage then sets out."],
      },
      {
        q: "What does \"apparition\" mean in the passage?",
        answer: "something strange that appears",
        wrong: ["a written record", "a sea captain", "a scientific society", "a kind of whale"],
        why: ["It is used twice for the object itself: \"The facts relating to this apparition\" and \"this supernatural apparition\".", "The word carries a hint of something ghostly, which suits an object nobody can explain."],
      },
      {
        q: "What does the writer conclude the object must have been?",
        answer: "An unknown aquatic mammal.",
        wrong: ["A very large sandbank.", "An underwater geyser.", "A ship of a new design.", "A trick of the light."],
        why: ["\"Had to do neither more nor less than with an aquatic mammal, unknown till then, which threw up from its blow-holes columns of water.\"", "The geyser is raised only to be dismissed, which is how the argument narrows down."],
      },
      {
        q: "Why does the author list so many different kinds of people who were excited?",
        answer: "To show how far and how quickly the story spread.",
        wrong: ["To show that sailors are easily frightened.", "To suggest that most of them were mistaken.", "To explain why the object was never caught.", "To show how many ships were at sea that year."],
        why: ["Merchants, sailors, captains, officers and whole governments on two continents covers almost everybody who might care.", "He even says the rumours excited the public mind \"even in the interior of continents\", far from any sea."],
      },
    ],
  },
  {
    id: "kidnapped",
    title: "The morning I left home",
    source: "from Kidnapped by Robert Louis Stevenson, 1886",
    paragraphs: [
      "I will begin the story of my adventures with a certain morning early in the month of June, the year of grace 1751, when I took the key for the last time out of the door of my father’s house. The sun began to shine upon the summit of the hills as I went down the road; and by the time I had come as far as the manse, the blackbirds were whistling in the garden lilacs, and the mist that hung around the valley in the time of the dawn was beginning to arise and die away.",
      "Mr. Campbell, the minister of Essendean, was waiting for me by the garden gate, good man! He asked me if I had breakfasted; and hearing that I lacked for nothing, he took my hand in both of his and clapped it kindly under his arm.",
      "“Well, Davie, lad,” said he, “I will go with you as far as the ford, to set you on the way.” And we began to walk forward in silence.",
      "“Are ye sorry to leave Essendean?” said he, after awhile.",
      "“Why, sir,” said I, “if I knew where I was going, or what was likely to become of me, I would tell you candidly. Essendean is a good place indeed, and I have been very happy there; but then I have never been anywhere else. My father and mother, since they are both dead, I shall be no nearer to in Essendean than in the Kingdom of Hungary, and, to speak truth, if I thought I had a chance to better myself where I was going I would go with a good will.”",
      "“Ay?” said Mr. Campbell. “Very well, Davie. Then it behoves me to tell your fortune; or so far as I may. When your mother was gone, and your father (the worthy, Christian man) began to sicken for his end, he gave me in charge a certain letter, which he said was your inheritance. ‘So soon,’ says he, ‘as I am gone, and the house is redd up and the gear disposed of’ (all which, Davie, hath been done), ‘give my boy this letter into his hand, and start him off to the house of Shaws, not far from Cramond. That is the place I came from,’ he said, ‘and it’s where it befits that my boy should return. He is a steady lad,’ your father said, ‘and a canny goer; and I doubt not he will come safe, and be well liked where he goes.’”",
    ],
    questions: [
      {
        q: "In which month and year does David begin his journey?",
        answer: "June 1751",
        wrong: ["June 1715", "January 1751", "June 1571", "May 1751"],
        why: ["\"A certain morning early in the month of June, the year of grace 1751.\"", "Both are in the opening sentence, so this rewards reading the first line carefully."],
      },
      {
        q: "Which word in the first paragraph tells you David will not be coming back?",
        answer: "last",
        wrong: ["certain", "summit", "dawn", "forward"],
        why: ["\"When I took the key for the last time out of the door of my father's house.\"", "Taking the key for the last time is a quiet way of saying the house is no longer his."],
      },
      {
        q: "Why does Mr Campbell take David's hand \"in both of his\"?",
        answer: "To show kindness to a boy leaving home alone.",
        wrong: ["To stop him from running away.", "To check whether he is cold.", "To lead him back to the house.", "To take the key from him."],
        why: ["He \"clapped it kindly under his arm\" and walks with him to the ford to set him on his way.", "He also asks whether David has eaten, which is the same sort of care."],
      },
      {
        q: "What is the effect of describing the blackbirds and the rising mist?",
        answer: "It makes a fresh, hopeful morning of a sad departure.",
        wrong: ["It shows that a storm is coming.", "It suggests David has overslept.", "It tells the reader the journey will be long.", "It shows the countryside is deserted."],
        why: ["Sun on the hills, birds singing and mist lifting are all beginnings, set against a boy leaving home for the last time.", "The contrast is the point: the day is opening up just as his old life closes."],
      },
      {
        q: "Which TWO things does David say about Essendean?",
        answers: ["it is a good place", "he has been very happy there"],
        wrong: ["he has friends waiting for him there", "he hopes to return within a year", "he has always found it dull"],
        why: ["\"Essendean is a good place indeed, and I have been very happy there.\"", "He then says he has never been anywhere else, which is why he is willing to go."],
      },
      {
        q: "What does \"candidly\" mean in the passage?",
        answer: "honestly and openly",
        wrong: ["quietly", "quickly", "politely", "cheerfully"],
        why: ["David says he would tell Mr Campbell candidly if only he knew where he was going.", "He then does speak very frankly about his parents and his prospects, which shows the meaning."],
      },
      {
        q: "Why would David leave \"with a good will\"?",
        answer: "He has nothing left to keep him there and hopes to better himself.",
        wrong: ["He has been asked to leave by the minister.", "He dislikes the people of Essendean.", "He is being sent away as a punishment.", "He has always wanted to travel."],
        why: ["Both his parents are dead, so he says he is no nearer them in Essendean than in Hungary.", "He adds \"if I thought I had a chance to better myself where I was going\", which is the condition."],
      },
      {
        q: "What had David's father left for him?",
        answer: "A letter.",
        wrong: ["The key to the house.", "A sum of money.", "A map of the road to Cramond.", "His share of the furniture."],
        why: ["\"He gave me in charge a certain letter, which he said was your inheritance.\"", "The house has been cleared and the goods disposed of, so the letter is all that is left."],
      },
    ],
  },
  {
    id: "pollyanna",
    title: "Miss Polly hurries",
    source: "from Pollyanna by Eleanor H. Porter, 1913",
    paragraphs: [
      "Miss Polly Harrington entered her kitchen a little hurriedly this June morning. Miss Polly did not usually make hurried movements; she specially prided herself on her repose of manner. But to-day she was hurrying, actually hurrying.",
      "Nancy, washing dishes at the sink, looked up in surprise. Nancy had been working in Miss Polly's kitchen only two months, but already she knew that her mistress did not usually hurry.",
      "“Nancy!”",
      "“Yes, ma'am.” Nancy answered cheerfully, but she still continued wiping the pitcher in her hand.",
      "“Nancy,”, Miss Polly's voice was very stern now, “when I'm talking to you, I wish you to stop your work and listen to what I have to say.”",
      "Nancy flushed miserably. She set the pitcher down at once, with the cloth still about it, thereby nearly tipping it over, which did not add to her composure.",
      "“Yes, ma'am; I will, ma'am,” she stammered, righting the pitcher, and turning hastily. “I was only keepin' on with my work 'cause you specially told me this mornin' ter hurry with my dishes, ye know.”",
      "Her mistress frowned.",
      "“That will do, Nancy. I did not ask for explanations. I asked for your attention.”",
      "“Yes, ma'am.” Nancy stifled a sigh. She was wondering if ever in any way she could please this woman. Nancy had never “worked out” before; but a sick mother suddenly widowed and left with three younger children besides Nancy herself, had forced the girl into doing something toward their support, and she had been so pleased when she found a place in the kitchen of the great house on the hill, Nancy had come from “The Corners,” six miles away, and she knew Miss Polly Harrington only as the mistress of the old Harrington homestead, and one of the wealthiest residents of the town. That was two months before. She knew Miss Polly now as a stern, severe-faced woman who frowned if a knife clattered to the floor, or if a door banged, but who never thought to smile even when knives and doors were still.",
      "“When you've finished your morning work, Nancy,” Miss Polly was saying now, “you may clear the little room at the head of the stairs in the attic, and make up the cot bed. Sweep the room and clean it, of course, after you clear out the trunks and boxes.”",
    ],
    questions: [
      {
        q: "Why was Nancy surprised when Miss Polly came in?",
        answer: "Miss Polly was hurrying, which she never did.",
        wrong: ["Miss Polly had been away for two months.", "Miss Polly was carrying a heavy trunk.", "Miss Polly was smiling for once.", "Miss Polly had come in through the wrong door."],
        why: ["\"Miss Polly did not usually make hurried movements; she specially prided herself on her repose of manner.\"", "Nancy has only worked there two months but already knows this, which shows how fixed the habit is."],
      },
      {
        q: "Which word describes the calm manner Miss Polly was proud of?",
        answer: "repose",
        wrong: ["composure", "stern", "hastily", "miserably"],
        why: ["\"She specially prided herself on her repose of manner.\"", "Composure is used of Nancy a moment later, not of Miss Polly."],
      },
      {
        q: "Why does Nancy flush \"miserably\"?",
        answer: "She has been told off and feels she can never please her mistress.",
        wrong: ["She has broken the pitcher.", "The kitchen is far too hot.", "She has been caught not working.", "She is about to be dismissed."],
        why: ["She is scolded for carrying on with her work, and the narrator says she wondered if she could ever please this woman.", "She nearly tips the pitcher over afterwards, which the passage says did not help her composure."],
      },
      {
        q: "What is the effect of \"actually hurrying\"?",
        answer: "It stresses how unusual this behaviour is for Miss Polly.",
        wrong: ["It shows that Miss Polly is late for something.", "It suggests Miss Polly is unwell.", "It tells the reader Miss Polly is angry with Nancy.", "It shows how fast Miss Polly can move."],
        why: ["The word actually is doing the work: it invites the reader to be as surprised as Nancy is.", "The sentence before has just told us she never hurries, so the repetition lands harder."],
      },
      {
        q: "Which THREE things is Nancy told to do in the attic room?",
        answers: ["clear out the trunks and boxes", "make up the cot bed", "sweep and clean it"],
        wrong: ["paint the walls", "open the window"],
        why: ["\"You may clear the little room at the head of the stairs in the attic, and make up the cot bed. Sweep the room and clean it, of course, after you clear out the trunks and boxes.\"", "The order matters: the clearing comes before the sweeping."],
      },
      {
        q: "Why had Nancy taken the job at the great house?",
        answer: "Her family needed the money after her mother was widowed.",
        wrong: ["She wanted to leave The Corners behind.", "She had always admired Miss Polly.", "She was training to be a cook.", "She had been sent by her mother's employer."],
        why: ["\"A sick mother suddenly widowed and left with three younger children besides Nancy herself, had forced the girl into doing something toward their support.\"", "She had never worked out before, so this was not a career she chose."],
      },
      {
        q: "What does \"composure\" mean in the passage?",
        answer: "being calm and steady",
        wrong: ["being quick at work", "being polite to others", "being tidy", "being cheerful"],
        why: ["Nancy nearly tips the pitcher over, and the narrator says this did not add to her composure.", "She is flustered, which is the opposite of the word."],
      },
      {
        q: "What does \"who never thought to smile even when knives and doors were still\" tell us about Miss Polly?",
        answer: "She notices faults but never praises anything.",
        wrong: ["She is hard of hearing.", "She is often away from the house.", "She is frightened of loud noises.", "She smiles only when she is alone."],
        why: ["She frowns at a clattering knife or a banging door, but silence earns nothing at all.", "The sentence is built to make the absence of the smile the point."],
      },
    ],
  },
  {
    id: "kitten",
    title: "The black kitten",
    source: "from Through the Looking-Glass by Lewis Carroll, 1871",
    paragraphs: [
      "One thing was certain, that the white kitten had had nothing to do with it:, it was the black kitten’s fault entirely. For the white kitten had been having its face washed by the old cat for the last quarter of an hour (and bearing it pretty well, considering); so you see that it couldn’t have had any hand in the mischief.",
      "The way Dinah washed her children’s faces was this: first she held the poor thing down by its ear with one paw, and then with the other paw she rubbed its face all over, the wrong way, beginning at the nose: and just now, as I said, she was hard at work on the white kitten, which was lying quite still and trying to purr, no doubt feeling that it was all meant for its good.",
      "But the black kitten had been finished with earlier in the afternoon, and so, while Alice was sitting curled up in a corner of the great arm-chair, half talking to herself and half asleep, the kitten had been having a grand game of romps with the ball of worsted Alice had been trying to wind up, and had been rolling it up and down till it had all come undone again; and there it was, spread over the hearth-rug, all knots and tangles, with the kitten running after its own tail in the middle.",
      "“Oh, you wicked little thing!” cried Alice, catching up the kitten, and giving it a little kiss to make it understand that it was in disgrace. “Really, Dinah ought to have taught you better manners! You ought, Dinah, you know you ought!” she added, looking reproachfully at the old cat, and speaking in as cross a voice as she could manage, and then she scrambled back into the arm-chair, taking the kitten and the worsted with her, and began winding up the ball again. But she didn’t get on very fast, as she was talking all the time, sometimes to the kitten, and sometimes to herself. Kitty sat very demurely on her knee, pretending to watch the progress of the winding, and now and then putting out one paw and gently touching the ball, as if it would be glad to help, if it might.",
    ],
    questions: [
      {
        q: "Whose fault was the mischief?",
        answer: "The black kitten's.",
        wrong: ["The white kitten's.", "Dinah's.", "Alice's.", "Nobody's."],
        why: ["\"One thing was certain, that the white kitten had had nothing to do with it: it was the black kitten's fault entirely.\"", "The white kitten has an alibi: it was having its face washed the whole time."],
      },
      {
        q: "Which word does the narrator use for the trouble the kitten is in?",
        answer: "disgrace",
        wrong: ["worsted", "reproachfully", "romps", "manners"],
        why: ["\"Giving it a little kiss to make it understand that it was in disgrace.\"", "Reproachfully describes how Alice looks at Dinah, not the trouble the kitten is in."],
      },
      {
        q: "What is amusing about saying the white kitten could not have had \"any hand\" in the mischief?",
        answer: "Kittens have paws, not hands.",
        wrong: ["The white kitten was asleep at the time.", "Alice cannot see the white kitten.", "The mischief happened outdoors.", "The white kitten is much older."],
        why: ["The narrator uses an everyday expression about people and applies it to a cat, which is where the joke sits.", "Paws are mentioned in the very next paragraph, describing how Dinah washes, which sharpens it."],
      },
      {
        q: "Which TWO things did Dinah do when washing a kitten's face?",
        answers: ["held it down by its ear with one paw", "rubbed its face the wrong way"],
        wrong: ["licked it clean all over", "carried it to the fire", "used a damp cloth"],
        why: ["\"First she held the poor thing down by its ear with one paw, and then with the other paw she rubbed its face all over, the wrong way, beginning at the nose.\"", "The other three are not in the passage."],
      },
      {
        q: "Why did the white kitten lie still and try to purr?",
        answer: "It believed the washing was meant for its own good.",
        wrong: ["It was too tired to struggle.", "It was frightened of Alice.", "It enjoyed having its face washed.", "It had been told to keep still."],
        why: ["\"Which was lying quite still and trying to purr, no doubt feeling that it was all meant for its good.\"", "The narrator is guessing on the kitten's behalf, which is part of the humour."],
      },
      {
        q: "What had the black kitten been playing with?",
        answer: "A ball of worsted.",
        wrong: ["Alice's shoelace.", "A ball of paper.", "The old cat's tail.", "A wooden spool."],
        why: ["\"The kitten had been having a grand game of romps with the ball of worsted Alice had been trying to wind up.\"", "Worsted is wool, which is why it comes undone so easily."],
      },
      {
        q: "Why does Alice kiss the kitten while telling it off?",
        answer: "She is not really angry with it.",
        wrong: ["She is saying goodbye to it.", "She wants it to fall asleep.", "She is rewarding it for being still.", "She has mistaken it for the white kitten."],
        why: ["A kiss is a strange way to make something understand it is in disgrace, and that contradiction is the point.", "She then has to speak in as cross a voice as she can manage, which tells you crossness does not come naturally here."],
      },
      {
        q: "What does \"speaking in as cross a voice as she could manage\" suggest?",
        answer: "She is trying to sound cross and not quite succeeding.",
        wrong: ["She has a sore throat.", "She is shouting very loudly.", "She is talking to herself.", "She is imitating her sister."],
        why: ["Managing to sound cross is not the same as being cross, and the phrase admits the effort.", "She has just kissed the kitten, so the reader already knows how she really feels."],
      },
    ],
  },
  {
    id: "peterpan",
    title: "All children, except one",
    source: "from Peter Pan by J. M. Barrie, 1911",
    paragraphs: [
      "All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she was playing in a garden, and she plucked another flower and ran with it to her mother. I suppose she must have looked rather delightful, for Mrs. Darling put her hand to her heart and cried, “Oh, why can’t you remain like this for ever!” This was all that passed between them on the subject, but henceforth Wendy knew that she must grow up. You always know after you are two. Two is the beginning of the end.",
      "Of course they lived at 14, and until Wendy came her mother was the chief one. She was a lovely lady, with a romantic mind and such a sweet mocking mouth. Her romantic mind was like the tiny boxes, one within the other, that come from the puzzling East, however many you discover there is always one more; and her sweet mocking mouth had one kiss on it that Wendy could never get, though there it was, perfectly conspicuous in the right-hand corner.",
      "The way Mr. Darling won her was this: the many gentlemen who had been boys when she was a girl discovered simultaneously that they loved her, and they all ran to her house to propose to her except Mr. Darling, who took a cab and nipped in first, and so he got her. He got all of her, except the innermost box and the kiss. He never knew about the box, and in time he gave up trying for the kiss. Wendy thought Napoleon could have got it, but I can picture him trying, and then going off in a passion, slamming the door.",
      "Mr. Darling used to boast to Wendy that her mother not only loved him but respected him. He was one of those deep ones who know about stocks and shares. Of course no one really knows, but he quite seemed to know, and he often said stocks were up and shares were down in a way that would have made any woman respect him.",
    ],
    questions: [
      {
        q: "How old was Wendy when she learned she would have to grow up?",
        answer: "Two years old.",
        wrong: ["One year old.", "Three years old.", "Five years old.", "Seven years old."],
        why: ["\"One day when she was two years old she was playing in a garden.\"", "The narrator adds \"You always know after you are two\", which fixes the age."],
      },
      {
        q: "What is the effect of opening with \"All children, except one, grow up\"?",
        answer: "It makes the reader want to know who the exception is.",
        wrong: ["It warns the reader the story will be sad.", "It explains where the story takes place.", "It tells the reader Wendy is unusual.", "It shows the narrator dislikes children."],
        why: ["\"All children, except one, grow up.\"", "The exception is never named in this extract, so the sentence works as a hook rather than an answer."],
      },
      {
        q: "What does \"conspicuous\" mean in the passage?",
        answer: "easy to see",
        wrong: ["hidden away", "very small", "brightly coloured", "carefully guarded"],
        why: ["The kiss was \"perfectly conspicuous in the right-hand corner\", yet Wendy could never get it.", "The joke depends on it being plainly visible and still out of reach."],
      },
      {
        q: "What do the boxes \"that come from the puzzling East\" tell us about Mrs Darling?",
        answer: "There is always more to her than anyone finds out.",
        wrong: ["She has travelled a great deal.", "She keeps her belongings very tidy.", "She is difficult to talk to.", "She collects unusual objects."],
        why: ["\"however many you discover there is always one more\"", "The image is used for her mind, not for anything she owns."],
      },
      {
        q: "Which TWO things did Mr Darling never win from his wife?",
        answers: ["the innermost box", "the kiss"],
        wrong: ["her respect", "her romantic mind", "her sweet mocking mouth"],
        why: ["\"He got all of her, except the innermost box and the kiss.\"", "He is later said to boast that she \"not only loved him but respected him\", so respect is not one of them."],
      },
      {
        q: "Why did Mr Darling reach Mrs Darling before all the other gentlemen?",
        answer: "He took a cab while the others ran.",
        wrong: ["He lived nearest to her house.", "He asked her first, before the others thought of it.", "He was the only one she liked.", "He wrote to her instead of calling."],
        why: ["\"who took a cab and nipped in first, and so he got her\"", "All the others \"ran to her house to propose to her\", which is the contrast."],
      },
      {
        q: "What is the narrator suggesting about Mr Darling and stocks and shares?",
        answer: "He only appears to understand them.",
        wrong: ["He has lost a great deal of money.", "He is the cleverest man in the city.", "He refuses to talk about his work.", "He explains them carefully to Wendy."],
        why: ["\"Of course no one really knows, but he quite seemed to know.\"", "The phrase \"in a way that would have made any woman respect him\" is about the manner, not the knowledge."],
      },
      {
        q: "Which word in the passage describes Mrs Darling's mind?",
        answer: "romantic",
        wrong: ["mocking", "conspicuous", "delightful", "puzzling"],
        why: ["\"She was a lovely lady, with a romantic mind and such a sweet mocking mouth.\"", "Mocking describes her mouth and puzzling describes the East, so neither fits the mind."],
      },
    ],
  },
  {
    id: "rebecca",
    title: "The stage coach to Riverboro",
    source: "from Rebecca of Sunnybrook Farm by Kate Douglas Wiggin, 1903",
    paragraphs: [
      "The old stage coach was rumbling along the dusty road that runs from Maplewood to Riverboro. The day was as warm as midsummer, though it was only the middle of May, and Mr. Jeremiah Cobb was favoring the horses as much as possible, yet never losing sight of the fact that he carried the mail. The hills were many, and the reins lay loosely in his hands as he lolled back in his seat and extended one foot and leg luxuriously over the dashboard. His brimmed hat of worn felt was well pulled over his eyes, and he revolved a quid of tobacco in his left cheek.",
      "There was one passenger in the coach, a small dark-haired person in a glossy buff calico dress. She was so slender and so stiffly starched that she slid from space to space on the leather cushions, though she braced herself against the middle seat with her feet and extended her cotton-gloved hands on each side, in order to maintain some sort of balance. Whenever the wheels sank farther than usual into a rut, or jolted suddenly over a stone, she bounded involuntarily into the air, came down again, pushed back her funny little straw hat, and picked up or settled more firmly a small pink sun shade, which seemed to be her chief responsibility, unless we except a bead purse, into which she looked whenever the condition of the roads would permit, finding great apparent satisfaction in that its precious contents neither disappeared nor grew less. Mr. Cobb guessed nothing of these harassing details of travel, his business being to carry people to their destinations, not, necessarily, to make them comfortable on the way. Indeed he had forgotten the very existence of this one unnoteworthy little passenger.",
      "When he was about to leave the post-office in Maplewood that morning, a woman had alighted from a wagon, and coming up to him, inquired whether this were the Riverboro stage, and if he were Mr. Cobb. Being answered in the affirmative, she nodded to a child who was eagerly waiting for the answer, and who ran towards her as if she feared to be a moment too late. The child might have been ten or eleven years old perhaps, but whatever the number of her summers, she had an air of being small for her age. Her mother helped her into the stage coach, deposited a bundle and a bouquet of lilacs beside her, superintended the \"roping on\" behind of an old hair trunk, and finally paid the fare, counting out the silver with great care.",
    ],
    questions: [
      {
        q: "What was Mr Cobb's job?",
        answer: "Driving the stage coach and carrying the mail.",
        wrong: ["Keeping the post office at Maplewood.", "Looking after the horses at Riverboro.", "Selling tickets for the coach.", "Delivering parcels on foot."],
        why: ["\"never losing sight of the fact that he carried the mail\"", "The opening also has him driving the coach from Maplewood to Riverboro."],
      },
      {
        q: "Which word in the passage tells you the road was not paved?",
        answer: "dusty",
        wrong: ["crooked", "narrow", "winding", "muddy"],
        why: ["\"The old stage coach was rumbling along the dusty road.\"", "Ruts and stones are mentioned later, but the word describing the road itself is the one asked for."],
      },
      {
        q: "Why did the child slide about on the seat?",
        answer: "Her dress was so stiffly starched that it slipped on the leather.",
        wrong: ["The coach was going very fast.", "She was trying to see out of the window.", "She was too small to reach the floor.", "The seat was wet from the rain."],
        why: ["\"She was so slender and so stiffly starched that she slid from space to space on the leather cushions.\"", "She braces her feet against the middle seat to stop it, which shows the cause is the sliding, not the speed."],
      },
      {
        q: "What did the child keep looking into during the journey?",
        answer: "A bead purse.",
        wrong: ["A small pink sun shade.", "A bouquet of lilacs.", "An old hair trunk.", "A letter from her mother."],
        why: ["\"a bead purse, into which she looked whenever the condition of the roads would permit\"", "She holds the sun shade, but it is the purse she keeps checking."],
      },
      {
        q: "Which TWO things did the child's mother do before the coach set off?",
        answers: ["helped her into the stage coach", "paid the fare"],
        wrong: ["gave her a bead purse", "spoke to the other passengers", "drove the wagon to Riverboro"],
        why: ["\"Her mother helped her into the stage coach, deposited a bundle and a bouquet of lilacs beside her.\"", "\"finally paid the fare, counting out the silver with great care\""],
      },
      {
        q: "What does \"counting out the silver with great care\" suggest about the family?",
        answer: "Money is short and every coin matters.",
        wrong: ["The mother does not trust Mr Cobb.", "The fare is unusually expensive.", "The mother is slow at arithmetic.", "They are wealthy and used to paying."],
        why: ["\"finally paid the fare, counting out the silver with great care\"", "The care is in the counting rather than in the paying, which is what makes the detail tell."],
      },
      {
        q: "Why has Mr Cobb forgotten his passenger?",
        answer: "He thinks of his job as delivering people, not looking after them.",
        wrong: ["She has been completely silent the whole way.", "He is angry that she has so much luggage.", "He cannot see into the coach from his seat.", "He is worried about the state of the road."],
        why: ["\"his business being to carry people to their destinations, not, necessarily, to make them comfortable on the way\"", "The narrator says he guessed nothing of the harassing details of her travel."],
      },
      {
        q: "What does \"whatever the number of her summers\" tell us?",
        answer: "The narrator is not certain of her exact age.",
        wrong: ["The child was born in summer.", "The journey lasted several summers.", "The child had never left home before.", "The narrator thinks she is older than she looks."],
        why: ["\"The child might have been ten or eleven years old perhaps.\"", "The narrator then says \"she had an air of being small for her age\", which is a guess rather than a fact."],
      },
    ],
  },
  {
    id: "jerome",
    title: "The man with every disease",
    source: "from Three Men in a Boat by Jerome K. Jerome, 1889",
    paragraphs: [
      "There were four of us, George, and William Samuel Harris, and myself, and Montmorency. We were sitting in my room, smoking, and talking about how bad we were, bad from a medical point of view I mean, of course.",
      "We were all feeling seedy, and we were getting quite nervous about it. Harris said he felt such extraordinary fits of giddiness come over him at times, that he hardly knew what he was doing; and then George said that he had fits of giddiness too, and hardly knew what he was doing. With me, it was my liver that was out of order. I knew it was my liver that was out of order, because I had just been reading a patent liver-pill circular, in which were detailed the various symptoms by which a man could tell when his liver was out of order. I had them all.",
      "It is a most extraordinary thing, but I never read a patent medicine advertisement without being impelled to the conclusion that I am suffering from the particular disease therein dealt with in its most virulent form. The diagnosis seems in every case to correspond exactly with all the sensations that I have ever felt.",
      "I remember going to the British Museum one day to read up the treatment for some slight ailment of which I had a touch, hay fever, I fancy it was. I got down the book, and read all I came to read; and then, in an unthinking moment, I idly turned the leaves, and began to indolently study diseases, generally. I forget which was the first distemper I plunged into, some fearful, devastating scourge, I know, and, before I had glanced half down the list of “premonitory symptoms,” it was borne in upon me that I had fairly got it.",
      "I sat for awhile, frozen with horror; and then, in the listlessness of despair, I again turned over the pages. I came to typhoid fever, read the symptoms, discovered that I had typhoid fever, must have had it for months without knowing it, wondered what else I had got; turned up St. Vitus’s Dance, found, as I expected, that I had that too, began to get interested in my case, and determined to sift it to the bottom, and so started alphabetically, read up ague, and learnt that I was sickening for it, and that the acute stage would commence in about another fortnight. Bright’s disease, I was relieved to find, I had only in a modified form, and, so far as that was concerned, I might live for years. Cholera I had, with severe complications; and diphtheria I seemed to have been born with. I plodded conscientiously through the twenty-six letters, and the only malady I could conclude I had not got was housemaid’s knee.",
    ],
    questions: [
      {
        q: "How many were in the room at the start?",
        answer: "Four.",
        wrong: ["Two.", "Three.", "Five.", "Six."],
        why: ["\"There were four of us, George, and William Samuel Harris, and myself, and Montmorency.\"", "They are all named in the opening sentence."],
      },
      {
        q: "What is the effect of \"bad from a medical point of view I mean, of course\"?",
        answer: "The narrator corrects himself as though the other meaning were obvious, which is comic.",
        wrong: ["It shows the narrator is a doctor.", "It warns the reader that the story is serious.", "It explains why the four men are friends.", "It tells the reader they have been behaving badly."],
        why: ["\"talking about how bad we were, bad from a medical point of view I mean, of course\"", "The of course pretends the reader has already made the mistake, which is where the humour sits."],
      },
      {
        q: "How did the narrator decide that his liver was out of order?",
        answer: "He read a pill advertisement listing the symptoms and found he had them all.",
        wrong: ["A doctor examined him at the British Museum.", "George told him he looked unwell.", "He had been feeling giddy for weeks.", "He looked it up in a medical dictionary."],
        why: ["\"in which were detailed the various symptoms by which a man could tell when his liver was out of order\"", "He then says simply \"I had them all.\""],
      },
      {
        q: "Which single word describes how the narrator studied diseases in the library?",
        answer: "indolently",
        wrong: ["carefully", "hastily", "eagerly", "anxiously"],
        why: ["\"began to indolently study diseases, generally\"", "It matters because he is only browsing, which makes the panic that follows funnier."],
      },
      {
        q: "Which THREE illnesses does the narrator decide he has?",
        answers: ["typhoid fever", "cholera", "diphtheria"],
        wrong: ["scarlet fever", "gout"],
        why: ["\"I came to typhoid fever, read the symptoms, discovered that I had typhoid fever.\"", "\"Cholera I had, with severe complications; and diphtheria I seemed to have been born with.\""],
      },
      {
        q: "Which was the only illness he decided he did not have?",
        answer: "Housemaid's knee.",
        wrong: ["Hay fever.", "Ague.", "Bright's disease.", "St Vitus's Dance."],
        why: ["\"the only malady I could conclude I had not got was housemaid's knee\"", "He says he had Bright's disease in a modified form, so that one does not count as a miss."],
      },
      {
        q: "What is the effect of the narrator working through the diseases alphabetically?",
        answer: "It makes his panic sound absurdly organised.",
        wrong: ["The book was arranged that way and he had no choice.", "He wanted to finish before the museum closed.", "He was looking for one disease in particular.", "He was writing a list for his doctor."],
        why: ["\"and so started alphabetically\"", "\"I plodded conscientiously through the twenty-six letters.\""],
      },
      {
        q: "What does \"premonitory\" mean in the passage?",
        answer: "giving warning beforehand",
        wrong: ["extremely painful", "very rare", "easily cured", "hard to explain"],
        why: ["He had not even read half the list \"before I had glanced half down the list of\" them when he was convinced.", "A premonitory symptom is one that comes first and warns of what follows."],
      },
    ],
  },
  {
    id: "jungle",
    title: "Tabaqui comes to the cave",
    source: "from The Jungle Book by Rudyard Kipling, 1894",
    paragraphs: [
      "It was seven o’clock of a very warm evening in the Seeonee hills when Father Wolf woke up from his day’s rest, scratched himself, yawned, and spread out his paws one after the other to get rid of the sleepy feeling in their tips. Mother Wolf lay with her big gray nose dropped across her four tumbling, squealing cubs, and the moon shone into the mouth of the cave where they all lived. “Augrh!” said Father Wolf. “It is time to hunt again.” He was going to spring down hill when a little shadow with a bushy tail crossed the threshold and whined: “Good luck go with you, O Chief of the Wolves. And good luck and strong white teeth go with noble children that they may never forget the hungry in this world.”",
      "It was the jackal, Tabaqui, the Dish-licker, and the wolves of India despise Tabaqui because he runs about making mischief, and telling tales, and eating rags and pieces of leather from the village rubbish-heaps. But they are afraid of him too, because Tabaqui, more than anyone else in the jungle, is apt to go mad, and then he forgets that he was ever afraid of anyone, and runs through the forest biting everything in his way. Even the tiger runs and hides when little Tabaqui goes mad, for madness is the most disgraceful thing that can overtake a wild creature. We call it hydrophobia, but they call it dewanee, the madness, and run.",
      "“Enter, then, and look,” said Father Wolf stiffly, “but there is no food here.”",
      "“For a wolf, no,” said Tabaqui, “but for so mean a person as myself a dry bone is a good feast. Who are we, the Gidur-log [the jackal people], to pick and choose?” He scuttled to the back of the cave, where he found the bone of a buck with some meat on it, and sat cracking the end merrily.",
      "“All thanks for this good meal,” he said, licking his lips. “How beautiful are the noble children! How large are their eyes! And so young too! Indeed, indeed, I might have remembered that the children of kings are men from the beginning.”",
    ],
    questions: [
      {
        q: "At what time does the passage begin?",
        answer: "Seven o'clock on a warm evening.",
        wrong: ["Seven o'clock on a cold morning.", "Midnight, when the moon was full.", "Dawn, before the wolves had woken.", "Noon, in the heat of the day."],
        why: ["\"It was seven o'clock of a very warm evening in the Seeonee hills.\"", "Father Wolf is waking from his day's rest, which fits an evening start."],
      },
      {
        q: "Which word in the passage names the trouble Tabaqui goes about making?",
        answer: "mischief",
        wrong: ["dewanee", "hydrophobia", "threshold", "despise"],
        why: ["\"because he runs about making mischief, and telling tales\"", "Dewanee and hydrophobia are both names for his madness, not for the trouble he stirs up."],
      },
      {
        q: "Why are the wolves afraid of Tabaqui even though they despise him?",
        answer: "He is likely to go mad and bite everything in his way.",
        wrong: ["He is stronger than any of them.", "He hunts in a larger pack.", "He is a favourite of Shere Khan.", "He can climb where they cannot follow."],
        why: ["\"Tabaqui, more than anyone else in the jungle, is apt to go mad.\"", "\"Even the tiger runs and hides when little Tabaqui goes mad.\""],
      },
      {
        q: "Which THREE reasons does the passage give for the wolves despising Tabaqui?",
        answers: ["he makes mischief", "he tells tales", "he eats rubbish"],
        wrong: ["he hunts alone", "he steals cubs"],
        why: ["\"he runs about making mischief, and telling tales, and eating rags and pieces of leather from the village rubbish-heaps\"", "All three are in the same sentence, so this rewards reading it to the end."],
      },
      {
        q: "What is the effect of Tabaqui praising the cubs so lavishly?",
        answer: "It sounds like flattery from someone who has just been fed.",
        wrong: ["It shows he is genuinely fond of the family.", "It proves he has come to give a warning.", "It suggests he has cubs of his own.", "It shows he cannot see very well in the dark."],
        why: ["He has just said \"All thanks for this good meal\" before the compliments begin.", "He has already called himself \"so mean a person as myself\", so the grand language does not fit him."],
      },
      {
        q: "What does \"despise\" mean in the passage?",
        answer: "look down on with contempt",
        wrong: ["fear greatly", "fail to notice", "envy secretly", "drive away"],
        why: ["\"the wolves of India despise Tabaqui\"", "The passage sets it against being afraid of him, so the two are different feelings."],
      },
      {
        q: "What does Father Wolf mean by \"Enter, then, and look, but there is no food here\"?",
        answer: "Tabaqui may come in, but he is not welcome to eat.",
        wrong: ["The cubs are too young to eat meat.", "Tabaqui should look for food in the village.", "Father Wolf has mistaken Tabaqui for another wolf.", "The cubs have eaten everything already."],
        why: ["\"Enter, then, and look,\" said Father Wolf stiffly.", "Tabaqui finds a bone at the back of the cave anyway, which shows it was not strictly true."],
      },
      {
        q: "What did Tabaqui find at the back of the cave?",
        answer: "The bone of a buck with some meat on it.",
        wrong: ["A piece of leather from the rubbish-heap.", "Nothing at all.", "One of Father Wolf's cubs.", "A dish of milk."],
        why: ["\"where he found the bone of a buck with some meat on it, and sat cracking the end merrily\"", "He had been told there was no food there, which is why the detail matters."],
      },
    ],
  },
  {
    id: "crusoe",
    title: "The print on the shore",
    source: "from Robinson Crusoe by Daniel Defoe, 1719",
    paragraphs: [
      "It happened one day, about noon, going towards my boat, I was exceedingly surprised with the print of a man’s naked foot on the shore, which was very plain to be seen on the sand. I stood like one thunderstruck, or as if I had seen an apparition. I listened, I looked round me, but I could hear nothing, nor see anything; I went up to a rising ground to look farther; I went up the shore and down the shore, but it was all one; I could see no other impression but that one. I went to it again to see if there were any more, and to observe if it might not be my fancy; but there was no room for that, for there was exactly the print of a foot, toes, heel, and every part of a foot. How it came thither I knew not, nor could I in the least imagine; but after innumerable fluttering thoughts, like a man perfectly confused and out of myself, I came home to my fortification, not feeling, as we say, the ground I went on, but terrified to the last degree, looking behind me at every two or three steps, mistaking every bush and tree, and fancying every stump at a distance to be a man. Nor is it possible to describe how many various shapes my affrighted imagination represented things to me in, how many wild ideas were found every moment in my fancy, and what strange, unaccountable whimsies came into my thoughts by the way.",
      "When I came to my castle (for so I think I called it ever after this), I fled into it like one pursued. Whether I went over by the ladder, as first contrived, or went in at the hole in the rock, which I had called a door, I cannot remember; no, nor could I remember the next morning, for never frightened hare fled to cover, or fox to earth, with more terror of mind than I to this retreat.",
    ],
    questions: [
      {
        q: "What did the narrator see on the shore?",
        answer: "The print of one bare human foot.",
        wrong: ["The prints of many bare feet.", "The mark of a boat being dragged up.", "A set of animal tracks.", "The remains of a fire."],
        why: ["\"I was exceedingly surprised with the print of a man's naked foot on the shore.\"", "\"I could see no other impression but that one.\""],
      },
      {
        q: "Which word describes how he stood at the moment he first saw the print?",
        answer: "thunderstruck",
        wrong: ["confused", "terrified", "affrighted", "pursued"],
        why: ["\"I stood like one thunderstruck, or as if I had seen an apparition.\"", "The other words describe him later, once he has begun to move and think."],
      },
      {
        q: "Why did he walk up and down the shore?",
        answer: "To find out whether there were any more prints.",
        wrong: ["To follow the person who had made it.", "To find a safe place to hide.", "To reach his boat before dark.", "To wash the print away with sea water."],
        why: ["\"I went to it again to see if there were any more, and to observe if it might not be my fancy.\"", "\"I went up the shore and down the shore, but it was all one.\""],
      },
      {
        q: "What is the effect of the short repeated clauses \"I listened, I looked round me\"?",
        answer: "They copy the quick, jerky movements of a frightened man.",
        wrong: ["They show he was taking his time.", "They suggest he had done this many times before.", "They prove he was not really afraid.", "They tell the reader how long he searched."],
        why: ["\"I listened, I looked round me, but I could hear nothing, nor see anything.\"", "Longer, calmer sentences return only once he is safely inside his castle."],
      },
      {
        q: "Which TWO ordinary things did his frightened imagination play tricks with?",
        answers: ["every bush and tree", "every stump at a distance"],
        wrong: ["the sound of the sea", "the shadow of his boat", "his own footprints"],
        why: ["\"mistaking every bush and tree, and fancying every stump at a distance to be a man\"", "Both are in the same clause, so both must be found."],
      },
      {
        q: "What does \"fortification\" mean in the passage?",
        answer: "the defended place where he lived",
        wrong: ["a weapon he carried", "a high point on the shore", "a store of food", "a boat pulled up on the sand"],
        why: ["\"I came home to my fortification\"", "He calls the same place his castle: \"When I came to my castle (for so I think I called it ever after this).\""],
      },
      {
        q: "Why can he not remember how he got into his castle?",
        answer: "He was too frightened to notice what he was doing.",
        wrong: ["It was completely dark by then.", "He had been struck on the head.", "He had two different doors and always confused them.", "He was asleep when he arrived."],
        why: ["\"Whether I went over by the ladder\" or through the hole in the rock, \"I cannot remember\".", "He adds that he could not remember the next morning either, which rules out simple tiredness."],
      },
      {
        q: "Why does he compare himself to a hare and a fox?",
        answer: "Both are hunted animals bolting for safety, and that is how he feels.",
        wrong: ["Both are animals he had hunted on the island.", "Both are quick, and he wants to show how fast he ran.", "Both live alone, as he does.", "Both are common in England, which he is homesick for."],
        why: ["\"never frightened hare fled to cover, or fox to earth, with more terror of mind than I to this retreat\"", "He puts himself above them, saying no hunted animal ever fled with more terror than he did."],
      },
    ],
  },
  {
    id: "justso",
    title: "The Elephant's Child",
    source: "from Just So Stories by Rudyard Kipling, 1902",
    paragraphs: [
      "IN the High and Far-Off Times the Elephant, O Best Beloved, had no trunk. He had only a blackish, bulgy nose, as big as a boot, that he could wriggle about from side to side; but he couldn’t pick up things with it. But there was one Elephant, a new Elephant, an Elephant’s Child, who was full of ‘satiable curtiosity, and that means he asked ever so many questions. And he lived in Africa, and he filled all Africa with his ‘satiable curtiosities. He asked his tall aunt, the Ostrich, why her tail-feathers grew just so, and his tall aunt the Ostrich spanked him with her hard, hard claw. He asked his tall uncle, the Giraffe, what made his skin spotty, and his tall uncle, the Giraffe, spanked him with his hard, hard hoof. And still he was full of ‘satiable curtiosity! He asked his broad aunt, the Hippopotamus, why her eyes were red, and his broad aunt, the Hippopotamus, spanked him with her broad, broad hoof; and he asked his hairy uncle, the Baboon, why melons tasted just so, and his hairy uncle, the Baboon, spanked him with his hairy, hairy paw. And still he was full of ‘satiable curtiosity! He asked questions about everything that he saw, or heard, or felt, or smelt, or touched, and all his uncles and his aunts spanked him. And still he was full of ‘satiable curtiosity!",
      "One fine morning in the middle of the Precession of the Equinoxes this ‘satiable Elephant’s Child asked a new fine question that he had never asked before. He asked, ‘What does the Crocodile have for dinner?’ Then everybody said, ‘Hush!’ in a loud and dretful tone, and they spanked him immediately and directly, without stopping, for a long time.",
      "By and by, when that was finished, he came upon Kolokolo Bird sitting in the middle of a wait-a-bit thorn-bush, and he said, ‘My father has spanked me, and my mother has spanked me; all my aunts and uncles have spanked me for my ‘satiable curtiosity; and still I want to know what the Crocodile has for dinner!’",
    ],
    questions: [
      {
        q: "What did the Elephant have instead of a trunk?",
        answer: "A blackish, bulgy nose as big as a boot.",
        wrong: ["A long, thin snout like a crocodile's.", "No nose at all.", "A short trunk that could not stretch.", "Two small tusks and nothing else."],
        why: ["\"He had only a blackish, bulgy nose, as big as a boot.\"", "It could wriggle from side to side \"but he couldn't pick up things with it\"."],
      },
      {
        q: "Which invented word does the author use for the tone in which everybody said \"Hush!\"?",
        answer: "dretful",
        wrong: ["loud", "hairy", "broad", "satiable"],
        why: ["\"Then everybody said, Hush! in a loud and dretful tone.\"", "The author is spelling dreadful the way a small child might say it."],
      },
      {
        q: "Which THREE relatives spanked the Elephant's Child in this passage?",
        answers: ["the Ostrich", "the Hippopotamus", "the Baboon"],
        wrong: ["the Crocodile", "the Kolokolo Bird"],
        why: ["\"He asked his tall aunt, the Ostrich, why her tail-feathers grew just so.\"", "\"his broad aunt, the Hippopotamus\" and \"his hairy uncle, the Baboon\" each spank him in turn."],
      },
      {
        q: "Why does the author repeat \"And still he was full of 'satiable curtiosity!\"?",
        answer: "To show that nothing anyone does will stop him asking questions.",
        wrong: ["To remind the reader of the Elephant's name.", "To show that he is slow to learn.", "Because the story is meant to be sung.", "To fill space between the animals."],
        why: ["\"And still he was full of\" that curiosity, after every single spanking.", "The repetition sets his curiosity against the punishment, and the curiosity keeps winning."],
      },
      {
        q: "Why did everybody say \"Hush!\" when he asked what the Crocodile has for dinner?",
        answer: "It was a question they were frightened of.",
        wrong: ["They had answered it many times already.", "They did not know what a Crocodile was.", "It was rude to talk about dinner.", "They were trying to sleep."],
        why: ["They said it \"in a loud and dretful tone\", and then spanked him \"immediately and directly, without stopping, for a long time\".", "No one gives him an answer, which is what sends him off to find one."],
      },
      {
        q: "What does the author mean by calling the reader \"O Best Beloved\"?",
        answer: "He is speaking directly to the child listening to the story.",
        wrong: ["He is talking to the Elephant's Child.", "It is the name of the Kolokolo Bird.", "He is addressing the Crocodile.", "It is an African word for elephant."],
        why: ["\"In the High and Far-Off Times the Elephant, O Best Beloved, had no trunk.\"", "The phrase breaks into the story to reach the listener, the way a storyteller speaks aloud."],
      },
      {
        q: "Why does the Elephant's Child tell his troubles to the Kolokolo Bird?",
        answer: "He still wants his answer and everyone else has only spanked him.",
        wrong: ["The bird had promised to help him.", "The bird was the only one who could speak.", "He was hoping to be given some dinner.", "He wanted to complain about the Crocodile."],
        why: ["\"all my aunts and uncles have spanked me for my 'satiable curtiosity; and still I want to know what the Crocodile has for dinner\"", "The bird is simply the next creature he meets, which is why he pours it all out."],
      },
      {
        q: "What is the effect of listing the relatives with their hard claws, hooves and paws?",
        answer: "It builds a pattern of the same thing happening again and again.",
        wrong: ["It shows the animals all lived close together.", "It explains why elephants live in Africa.", "It proves the relatives were cruel by nature.", "It tells the reader what each animal looks like."],
        why: ["Each one spanks him with something \"hard, hard\" or \"broad, broad\" of its own.", "The pattern is what makes the ending, when he finally gets his trunk, feel earned."],
      },
    ],
  },
  {
    id: "pauper",
    title: "Two babies, one day",
    source: "from The Prince and the Pauper by Mark Twain, 1881",
    paragraphs: [
      "In the ancient city of London, on a certain autumn day in the second quarter of the sixteenth century, a boy was born to a poor family of the name of Canty, who did not want him. On the same day another English child was born to a rich family of the name of Tudor, who did want him. All England wanted him too. England had so longed for him, and hoped for him, and prayed God for him, that, now that he was really come, the people went nearly mad for joy. Mere acquaintances hugged and kissed each other and cried. Everybody took a holiday, and high and low, rich and poor, feasted and danced and sang, and got very mellow; and they kept this up for days and nights together. By day, London was a sight to see, with gay banners waving from every balcony and housetop, and splendid pageants marching along. By night, it was again a sight to see, with its great bonfires at every corner, and its troops of revellers making merry around them. There was no talk in all England but of the new baby, Edward Tudor, Prince of Wales, who lay lapped in silks and satins, unconscious of all this fuss, and not knowing that great lords and ladies were tending him and watching over him, and not caring, either. But there was no talk about the other baby, Tom Canty, lapped in his poor rags, except among the family of paupers whom he had just come to trouble with his presence.",
      "Let us skip a number of years.",
      "London was fifteen hundred years old, and was a great town, for that day. It had a hundred thousand inhabitants, some think double as many. The streets were very narrow, and crooked, and dirty, especially in the part where Tom Canty lived, which was not far from London Bridge. The houses were of wood, with the second story projecting over the first, and the third sticking its elbows out beyond the second. The higher the houses grew, the broader they grew. They were skeletons of strong criss-cross beams, with solid material between, coated with plaster. The beams were painted red or blue or black, according to the owner’s taste, and this gave the houses a very picturesque look. The windows were small, glazed with little diamond-shaped panes, and they opened outward, on hinges, like doors.",
    ],
    questions: [
      {
        q: "On what day was Tom Canty born?",
        answer: "The same day as Edward Tudor.",
        wrong: ["The day Edward Tudor became king.", "Exactly a year before Edward Tudor.", "On the day of a great London fire.", "Fifteen hundred years after London was founded."],
        why: ["\"On the same day another English child was born to a rich family of the name of Tudor, who did want him.\"", "The whole point of the chapter is that the two lives begin together and go opposite ways."],
      },
      {
        q: "Which word does the passage use for the sort of family Tom was born into?",
        answer: "paupers",
        wrong: ["revellers", "acquaintances", "inhabitants", "Tudor"],
        why: ["\"except among the family of paupers whom he had just come to trouble with his presence\"", "A pauper is a person with no money at all, which sets up the title of the book."],
      },
      {
        q: "What is the effect of describing the two births in the same paragraph?",
        answer: "It shows how differently two babies born on one day were treated.",
        wrong: ["It suggests the two boys were related.", "It shows that London was a crowded city.", "It explains why Tom was unhappy.", "It proves the two boys were born in the same house."],
        why: ["One family \"did not want him\", and of the other the passage says \"All England wanted him too.\"", "The same sentence pattern is used twice with the opposite meaning, which forces the comparison."],
      },
      {
        q: "Which THREE things did the people do to celebrate the prince's birth?",
        answers: ["feasted", "danced", "sang"],
        wrong: ["fasted", "worked"],
        why: ["\"high and low, rich and poor, feasted and danced and sang, and got very mellow\"", "They kept it up for days and nights together, which is why the list is worth reading in full."],
      },
      {
        q: "Why does the narrator say the prince was \"not caring, either\"?",
        answer: "He was a newborn baby who knew nothing about the fuss.",
        wrong: ["He was an unkind child from the start.", "He was too ill to notice.", "He wanted to be left alone.", "He had been told to ignore the crowds."],
        why: ["\"who lay lapped in silks and satins, unconscious of all this fuss\"", "The joke is that all England is delighted and the one person it is about is asleep."],
      },
      {
        q: "What does \"revellers\" mean in the passage?",
        answer: "people making merry",
        wrong: ["soldiers on guard", "travellers arriving in the city", "people building bonfires", "musicians paid by the king"],
        why: ["\"its troops of revellers making merry around them\"", "They are gathered round the bonfires at every corner, which is where celebrating was done."],
      },
      {
        q: "What happened to the London houses as they rose higher?",
        answer: "They grew broader.",
        wrong: ["They grew narrower.", "They leaned into the river.", "They were built of stone instead of wood.", "They lost their windows."],
        why: ["\"The higher the houses grew, the broader they grew.\"", "The second storey projected over the first and the third beyond the second, which is the same idea."],
      },
      {
        q: "What is the effect of using \"lapped\" for both babies?",
        answer: "The same word is used for silks and for rags, which puts the whole difference in one line.",
        wrong: ["It shows both babies were the same size.", "It suggests the babies were swapped at birth.", "It tells the reader both were loved equally.", "It is a word used only for royal children."],
        why: ["One is \"lapped in silks and satins\" and the other \"lapped in his poor rags\".", "Repeating the verb and changing only the cloth puts the whole difference into two words."],
      },
    ],
  },
  {
    id: "prince",
    title: "The statue on the column",
    source: "from The Happy Prince by Oscar Wilde, 1888",
    paragraphs: [
      "HIGH above the city, on a tall column, stood the statue of the Happy Prince. He was gilded all over with thin leaves of fine gold, for eyes he had two bright sapphires, and a large red ruby glowed on his sword-hilt.",
      "He was very much admired indeed. “He is as beautiful as a weathercock,” remarked one of the Town Councillors who wished to gain a reputation for having artistic tastes; “only not quite so useful,” he added, fearing lest people should think him unpractical, which he really was not.",
      "“Why can’t you be like the Happy Prince?” asked a sensible mother of her little boy who was crying for the moon. “The Happy Prince never dreams of crying for anything.”",
      "“I am glad there is some one in the world who is quite happy,” muttered a disappointed man as he gazed at the wonderful statue.",
      "“He looks just like an angel,” said the Charity Children as they came out of the cathedral in their bright scarlet cloaks and their clean white pinafores.",
      "“How do you know?” said the Mathematical Master, “you have never seen one.”",
      "“Ah! but we have, in our dreams,” answered the children; and the Mathematical Master frowned and looked very severe, for he did not approve of children dreaming.",
      "One night there flew over the city a little Swallow. His friends had gone away to Egypt six weeks before, but he had stayed behind, for he was in love with the most beautiful Reed. He had met her early in the spring as he was flying down the river after a big yellow moth, and had been so attracted by her slender waist that he had stopped to talk to her.",
      "“Shall I love you?” said the Swallow, who liked to come to the point at once, and the Reed made him a low bow. So he flew round and round her, touching the water with his wings, and making silver ripples. This was his courtship, and it lasted all through the summer.",
    ],
    questions: [
      {
        q: "What glowed on the statue's sword-hilt?",
        answer: "A large red ruby.",
        wrong: ["Two bright sapphires.", "A thin leaf of fine gold.", "A small green emerald.", "A silver star."],
        why: ["\"a large red ruby glowed on his sword-hilt\"", "The sapphires are his eyes, so the two must be kept apart."],
      },
      {
        q: "Which word in the passage describes the man who gazed at the statue and muttered?",
        answer: "disappointed",
        wrong: ["sensible", "severe", "practical", "gilded"],
        why: ["\"muttered a disappointed man as he gazed at the wonderful statue\"", "Sensible describes the mother and severe the Mathematical Master."],
      },
      {
        q: "Why is \"He is as beautiful as a weathercock\" a strange compliment?",
        answer: "A weathercock is a plain, everyday object, so the praise says very little.",
        wrong: ["A weathercock is ugly, so it is an insult.", "Weathercocks are made of gold, so it is exact.", "It shows the statue can turn in the wind.", "It means the statue is very tall."],
        why: ["The Councillor says it to \"gain a reputation for having artistic tastes\", so the aim is to be admired, not to be right.", "He then adds \"only not quite so useful\", which undoes even that."],
      },
      {
        q: "Why did the Councillor add \"only not quite so useful\"?",
        answer: "He was afraid of being thought impractical.",
        wrong: ["He had decided the statue was ugly after all.", "He wanted the statue melted down.", "He was answering a question from the crowd.", "He thought weathercocks were better made."],
        why: ["\"fearing lest people should think him unpractical, which he really was not\"", "The narrator quietly tells us the fear was groundless, which makes him look sillier."],
      },
      {
        q: "Which TWO things did the Mathematical Master do when the children spoke of their dreams?",
        answers: ["frowned", "looked very severe"],
        wrong: ["laughed", "agreed with them", "asked them to explain"],
        why: ["\"the Mathematical Master frowned and looked very severe\"", "Both are in the same short clause, so both must be found."],
      },
      {
        q: "What does the passage suggest about the Mathematical Master?",
        answer: "He has no patience with imagination.",
        wrong: ["He is frightened of the Charity Children.", "He is very good at his subject.", "He believes in angels himself.", "He is a friend of the Town Councillor."],
        why: ["\"he did not approve of children dreaming\"", "His first reply is to challenge the children, not to listen to them."],
      },
      {
        q: "Why had the Swallow not gone to Egypt with his friends?",
        answer: "He had fallen in love with a Reed.",
        wrong: ["He had injured his wing.", "He was waiting for the weather to change.", "He wanted to see the Happy Prince.", "He had been left behind by mistake."],
        why: ["\"he had stayed behind, for he was in love with the most beautiful Reed\"", "His friends had gone six weeks earlier, which shows how long he had lingered."],
      },
      {
        q: "What is amusing about the Swallow's courtship?",
        answer: "He asks whether he should love her as though it were a piece of business.",
        wrong: ["He forgets the Reed's name.", "He flies away in the middle of it.", "He asks the Reed to come to Egypt.", "He sings instead of speaking."],
        why: ["\"Shall I love you?\" said the Swallow, \"who liked to come to the point at once\".", "The Reed answers with a bow rather than a word, which is just as odd."],
      },
    ],
  },
  {
    id: "katy",
    title: "Katy did, Katy didn't",
    source: "from What Katy Did by Susan Coolidge, 1872",
    paragraphs: [
      "I was sitting in the meadows one day, not long ago, at a place where there was a small brook. It was a hot day. The sky was very blue, and white clouds, like great swans, went floating over it to and fro. Just opposite me was a clump of green rushes, with dark velvety spikes, and among them one single tall, red cardinal flower, which was bending over the brook as if to see its own beautiful face in the water. But the cardinal did not seem to be vain.",
      "The picture was so pretty that I sat a long time enjoying it. Suddenly, close to me, two small voices began to talk, or to sing, for I couldn't tell exactly which it was. One voice was shrill; the other, which was a little deeper, sounded very positive and cross. They were evidently disputing about something, for they said the same words over and over again. These were the words, \"Katy did.\" \"Katy didn't.\" \"She did.\" \"She didn't.\" \"She did.\" \"She didn't.\" \"Did.\" \"Didn't.\" I think they must have repeated them at least a hundred times.",
      "I got up from my seat to see if I could find the speakers; and sure enough, there on one of the cat-tail bulrushes, I spied two tiny pale-green creatures. Their eyes seemed to be weak, for they both wore black goggles. They had six legs apiece, two short ones, two not so short, and two very long. These last legs had joints like the springs to buggy-tops; and as I watched, they began walking up the rush, and then I saw that they moved exactly like an old-fashioned gig. In fact, if I hadn't been too big, I think I should have heard them creak as they went along. They didn't say anything so long as I was there, but the moment my back was turned they began to quarrel again, and in the same old words, \"Katy did.\" \"Katy didn't.\" \"She did.\" \"She didn't.\"",
      "As I walked home I fell to thinking about another Katy, a Katy I once knew, who planned to do a great many wonderful things, and in the end did none of them, but something quite different, something she didn't like at all at first, but which, on the whole, was a great deal better than any of the doings she had dreamed about. And as I thought, this little story grew in my head, and I resolved to write it down for you. I have done it; and, in memory of my two little friends on the bulrush, I give it their name. Here it is, the story of What Katy Did.",
    ],
    questions: [
      {
        q: "What were the two small creatures sitting on?",
        answer: "A cat-tail bulrush.",
        wrong: ["The red cardinal flower.", "A clump of green rushes by the brook.", "A swan's back.", "A branch above the water."],
        why: ["\"there on one of the cat-tail bulrushes, I spied two tiny pale-green creatures\"", "The green rushes and the cardinal flower are described earlier, on the far side of the brook."],
      },
      {
        q: "Which word describes the higher of the two voices?",
        answer: "shrill",
        wrong: ["deeper", "positive", "cross", "weak"],
        why: ["\"One voice was shrill; the other, which was a little deeper, sounded very positive and cross.\"", "Positive and cross both belong to the second voice."],
      },
      {
        q: "Why does the author say the insects wore black goggles?",
        answer: "It turns them into small comic people.",
        wrong: ["It shows they were blind.", "It explains why they were quarrelling.", "It tells the reader what species they were.", "It suggests they were hiding from the narrator."],
        why: ["\"Their eyes seemed to be weak, for they both wore black goggles.\"", "Their legs are then compared to a gig, so the whole description dresses them up as little travellers."],
      },
      {
        q: "Which TWO things are used to describe the long legs and the way they moved?",
        answers: ["the springs to buggy-tops", "an old-fashioned gig"],
        wrong: ["a pair of scissors", "the necks of swans", "the stalks of cat-tails"],
        why: ["\"These last legs had joints like the springs to buggy-tops.\"", "\"they moved exactly like an old-fashioned gig\""],
      },
      {
        q: "Why did the insects fall silent while the narrator watched?",
        answer: "They would only quarrel when they thought nobody was listening.",
        wrong: ["They were frightened of the brook.", "They had finished their argument.", "They could not see the narrator.", "They were waiting for Katy to arrive."],
        why: ["\"They didn't say anything so long as I was there, but the moment my back was turned they began to quarrel again.\"", "The narrator has to walk away to hear the rest, which is what sets off the story."],
      },
      {
        q: "What does \"disputing\" mean in the passage?",
        answer: "arguing",
        wrong: ["singing together", "complaining of the heat", "asking for help", "counting something"],
        why: ["\"They were evidently disputing about something, for they said the same words over and over again.\"", "The words repeated are Katy did and Katy didn't, which is a disagreement."],
      },
      {
        q: "What do we learn about the Katy the narrator once knew?",
        answer: "She planned wonderful things, did none of them, and something better happened instead.",
        wrong: ["She grew up to write this story.", "She kept insects as pets.", "She never did anything at all.", "She was one of the two creatures on the rush."],
        why: ["\"a Katy I once knew, who planned to do a great many wonderful things, and in the end did none of them\"", "The narrator says the different thing that happened was on the whole a great deal better."],
      },
      {
        q: "Why does the author begin with the insects instead of with Katy?",
        answer: "Their quarrel is where the book gets its name.",
        wrong: ["The insects tell the story themselves.", "She wants to describe a hot summer day.", "The insects appear again at the end.", "She has forgotten how the story begins."],
        why: ["\"in memory of my two little friends on the bulrush, I give it their name\"", "The last line of the extract is the title of the book, which the insects have been saying all along."],
      },
    ],
  },
  {
    id: "sara",
    title: "The place",
    source: "from A Little Princess by Frances Hodgson Burnett, 1905",
    paragraphs: [
      "She was such a little girl that one did not expect to see such a look on her small face. It would have been an old look for a child of twelve, and Sara Crewe was only seven. The fact was, however, that she was always dreaming and thinking odd things and could not herself remember any time when she had not been thinking things about grown-up people and the world they belonged to. She felt as if she had lived a long, long time.",
      "At this moment she was remembering the voyage she had just made from Bombay with her father, Captain Crewe. She was thinking of the big ship, of the Lascars passing silently to and fro on it, of the children playing about on the hot deck, and of some young officers' wives who used to try to make her talk to them and laugh at the things she said.",
      "Principally, she was thinking of what a queer thing it was that at one time one was in India in the blazing sun, and then in the middle of the ocean, and then driving in a strange vehicle through strange streets where the day was as dark as the night. She found this so puzzling that she moved closer to her father.",
      "\"Papa,\" she said in a low, mysterious little voice which was almost a whisper, \"papa.\"",
      "\"What is it, darling?\" Captain Crewe answered, holding her closer and looking down into her face. \"What is Sara thinking of?\"",
      "\"Is this the place?\" Sara whispered, cuddling still closer to him. \"Is it, papa?\"",
      "\"Yes, little Sara, it is. We have reached it at last.\" And though she was only seven years old, she knew that he felt sad when he said it.",
      "It seemed to her many years since he had begun to prepare her mind for \"the place,\" as she always called it. Her mother had died when she was born, so she had never known or missed her. Her young, handsome, rich, petting father seemed to be the only relation she had in the world. They had always played together and been fond of each other. She only knew he was rich because she had heard people say so when they thought she was not listening, and she had also heard them say that when she grew up she would be rich, too. She did not know all that being rich meant. She had always lived in a beautiful bungalow, and had been used to seeing many servants who made salaams to her and called her \"Missee Sahib,\" and gave her her own way in everything. She had had toys and pets and an ayah who worshipped her, and she had gradually learned that people who were rich had these things. That, however, was all she knew about it.",
    ],
    questions: [
      {
        q: "How old was Sara Crewe?",
        answer: "Seven.",
        wrong: ["Five.", "Nine.", "Twelve.", "Fourteen."],
        why: ["\"It would have been an old look for a child of twelve, and Sara Crewe was only seven.\"", "Twelve is mentioned only as a comparison, so it is a trap for hurried reading."],
      },
      {
        q: "Which word does the passage use for the look on Sara's small face?",
        answer: "old",
        wrong: ["sad", "puzzled", "mysterious", "strange"],
        why: ["\"It would have been an old look for a child of twelve.\"", "Mysterious describes her voice and strange describes the streets, so neither belongs to her face."],
      },
      {
        q: "Why does Sara move closer to her father?",
        answer: "She finds the change from India so puzzling that she wants comfort.",
        wrong: ["The carriage is cold.", "She has seen something frightening outside.", "She is falling asleep.", "She wants to whisper a secret."],
        why: ["\"She found this so puzzling that she moved closer to her father.\"", "The puzzle is going from blazing sun to a day as dark as night, which is stated just before."],
      },
      {
        q: "Why does Sara call it \"the place\" instead of naming it?",
        answer: "She has been prepared for it for years without ever being told what it really is.",
        wrong: ["She cannot pronounce the name.", "Her father has forbidden her to name it.", "She is hoping they will not stop there.", "It is a secret from the other passengers."],
        why: ["\"It seemed to her many years since he had begun to prepare her mind for the place, as she always called it.\"", "The vagueness is hers, not the narrator's, which is what makes it uneasy."],
      },
      {
        q: "How do we know Captain Crewe is unhappy about arriving?",
        answer: "Sara can tell he feels sad, although he says nothing about it.",
        wrong: ["He refuses to answer her question.", "He tells her he does not want to leave her.", "He looks away from the window.", "He holds her at arm's length."],
        why: ["\"And though she was only seven years old, she knew that he felt sad when he said it.\"", "His words are cheerful enough, so it is the feeling behind them that she picks up."],
      },
      {
        q: "Which TWO things does the passage tell us about Sara's mother?",
        answers: ["she died when Sara was born", "Sara had never known her"],
        wrong: ["she stayed behind in India", "she was often ill", "she wrote to Sara every week"],
        why: ["\"Her mother had died when she was born, so she had never known or missed her.\"", "The two facts are joined by so, which is why one leads to the other."],
      },
      {
        q: "What does \"petting\" mean in \"her young, handsome, rich, petting father\"?",
        answer: "fond of spoiling her",
        wrong: ["strict with her", "often away", "easily worried", "quick to lose his temper"],
        why: ["\"Her young, handsome, rich, petting father seemed to be the only relation she had in the world.\"", "It sits in a list of things that make him easy to love, not difficult."],
      },
      {
        q: "How did Sara learn that she was rich?",
        answer: "She overheard people saying so when they thought she was not listening.",
        wrong: ["Her father told her before they sailed.", "She counted the servants in the bungalow.", "Her ayah explained it to her.", "She read it in one of her father's letters."],
        why: ["\"she had heard people say so when they thought she was not listening\"", "The passage adds that she did not know all that being rich meant, so nobody had explained it."],
      },
    ],
  },
  {
    id: "muir",
    title: "A boy in Scotland",
    source: "from The Story of My Boyhood and Youth by John Muir, 1913",
    paragraphs: [
      "When I was a boy in Scotland I was fond of everything that was wild, and all my life I’ve been growing fonder and fonder of wild places and wild creatures. Fortunately around my native town of Dunbar, by the stormy North Sea, there was no lack of wildness, though most of the land lay in smooth cultivation. With red-blooded playmates, wild as myself, I loved to wander in the fields to hear the birds sing, and along the seashore to gaze and wonder at the shells and seaweeds, eels and crabs in the pools among the rocks when the tide was low; and best of all to watch the waves in awful storms thundering on the black headlands and craggy ruins of the old Dunbar Castle when the sea and the sky, the waves and the clouds, were mingled together as one. We never thought of playing truant, but after I was five or six years old I ran away to the seashore or the fields almost every Saturday, and every day in the school vacations except Sundays, though solemnly warned that I must play at home in the garden and back yard, lest I should learn to think bad thoughts and say bad words. All in vain. In spite of the sure sore punishments that followed like shadows, the natural inherited wildness in our blood ran true on its glorious course as invincible and unstoppable as stars.",
      "My earliest recollections of the country were gained on short walks with my grandfather when I was perhaps not over three years old. On one of these walks grandfather took me to Lord Lauderdale’s gardens, where I saw figs growing against a sunny wall and tasted some of them, and got as many apples to eat as I wished. On another memorable walk in a hay-field, when we sat down to rest on one of the haycocks I heard a sharp, prickly, stinging cry, and, jumping up eagerly, called grandfather’s attention to it. He said he heard only the wind, but I insisted on digging into the hay and turning it over until we discovered the source of the strange exciting sound, a mother field mouse with half a dozen naked young hanging to her teats. This to me was a wonderful discovery. No hunter could have been more excited on discovering a bear and her cubs in a wilderness den.",
    ],
    questions: [
      {
        q: "Where did Muir grow up?",
        answer: "Dunbar, on the coast of Scotland.",
        wrong: ["Edinburgh, in the centre of Scotland.", "A farm in Wisconsin.", "A village in the Scottish Highlands.", "London, by the river."],
        why: ["\"around my native town of Dunbar, by the stormy North Sea\"", "The sea and its storms are the reason he gives for there being no lack of wildness."],
      },
      {
        q: "Which word does Muir use again and again for what he loved?",
        answer: "wild",
        wrong: ["stormy", "glorious", "invincible", "natural"],
        why: ["\"I was fond of everything that was wild, and all my life I've been growing fonder and fonder of wild places and wild creatures.\"", "He uses it of the places, the creatures and his playmates, which is what makes it the key word."],
      },
      {
        q: "Which TWO places did Muir like to go as a boy?",
        answers: ["the fields", "the seashore"],
        wrong: ["the town market", "his grandfather's house", "the school playground"],
        why: ["\"I loved to wander in the fields to hear the birds sing, and along the seashore to gaze and wonder at the shells and seaweeds, eels and crabs in the pools among the rocks when the tide was low\"", "Both are in the same long sentence, so it has to be read to the end."],
      },
      {
        q: "Why did Muir keep running away even though he was punished?",
        answer: "The pull of wild places was stronger than his fear of punishment.",
        wrong: ["He was never actually caught.", "His parents secretly approved.", "He did not understand the rule.", "The punishments were very mild."],
        why: ["\"In spite of the sure sore punishments that followed like shadows\"", "He says the punishments were sure, so he knew exactly what would happen and went anyway."],
      },
      {
        q: "What is the effect of \"as invincible and unstoppable as stars\"?",
        answer: "It makes his wildness sound like a force of nature nobody could stop.",
        wrong: ["It shows he only went out at night.", "It suggests he wanted to be an astronomer.", "It tells the reader he was often lost.", "It means his family came from far away."],
        why: ["\"the natural inherited wildness in our blood ran true on its glorious course as invincible and unstoppable as stars\"", "Comparing a boy to the stars is deliberately far too grand, which is how strongly he felt it."],
      },
      {
        q: "What did Muir hear in the hay-field?",
        answer: "A sharp, prickly, stinging cry.",
        wrong: ["The wind in the haycocks.", "A bird singing overhead.", "His grandfather calling him.", "The sea breaking on the rocks."],
        why: ["\"I heard a sharp, prickly, stinging cry\"", "His grandfather said he heard only the wind, which is what makes the discovery Muir's own."],
      },
      {
        q: "Why was Muir as excited as a hunter finding a bear?",
        answer: "A small discovery of his own meant as much to him as a great one.",
        wrong: ["He was frightened of the mouse.", "He hoped to sell the mice.", "He had been searching for the nest all day.", "His grandfather had promised him a reward."],
        why: ["\"No hunter could have been more excited on discovering a bear and her cubs in a wilderness den.\"", "He calls it a wonderful discovery, though it is only a field mouse and her young."],
      },
      {
        q: "What does \"native town\" mean in the passage?",
        answer: "the town where he was born",
        wrong: ["the biggest town nearby", "a town with no roads", "the town where he went to school", "a town he often visited"],
        why: ["\"around my native town of Dunbar, by the stormy North Sea\"", "Being by the sea is given as a separate fact, so it is not part of the meaning."],
      },
    ],
  },
  {
    id: "holmes",
    title: "A visitor with red hair",
    source: "from The Red-Headed League by Arthur Conan Doyle, 1891",
    paragraphs: [
      "I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn of last year and found him in deep conversation with a very stout, florid-faced, elderly gentleman with fiery red hair. With an apology for my intrusion, I was about to withdraw when Holmes pulled me abruptly into the room and closed the door behind me.",
      "“You could not possibly have come at a better time, my dear Watson,” he said cordially.",
      "“I was afraid that you were engaged.”",
      "“So I am. Very much so.”",
      "“Then I can wait in the next room.”",
      "“Not at all. This gentleman, Mr. Wilson, has been my partner and helper in many of my most successful cases, and I have no doubt that he will be of the utmost use to me in yours also.”",
      "The stout gentleman half rose from his chair and gave a bob of greeting, with a quick little questioning glance from his small fat-encircled eyes.",
      "“Try the settee,” said Holmes, relapsing into his armchair and putting his fingertips together, as was his custom when in judicial moods. “I know, my dear Watson, that you share my love of all that is bizarre and outside the conventions and humdrum routine of everyday life. You have shown your relish for it by the enthusiasm which has prompted you to chronicle, and, if you will excuse my saying so, somewhat to embellish so many of my own little adventures.”",
      "“Your cases have indeed been of the greatest interest to me,” I observed.",
      "“You will remember that I remarked the other day, just before we went into the very simple problem presented by Miss Mary Sutherland, that for strange effects and extraordinary combinations we must go to life itself, which is always far more daring than any effort of the imagination.”",
      "“A proposition which I took the liberty of doubting.”",
    ],
    questions: [
      {
        q: "How is Mr Wilson described when Watson first sees him?",
        answer: "A very stout, florid-faced, elderly gentleman with fiery red hair.",
        wrong: ["A thin, pale young man with dark hair.", "A tall gentleman in a heavy coat.", "A quiet clerk with spectacles.", "An old soldier with a limp."],
        why: ["\"in deep conversation with a very stout, florid-faced, elderly gentleman with fiery red hair\"", "His red hair is given last and turns out to matter, which is why it is worth noticing."],
      },
      {
        q: "Why does Holmes pull Watson into the room?",
        answer: "He believes Watson will be useful to him on the case.",
        wrong: ["He wants Watson to examine Mr Wilson.", "He is afraid to be alone with Mr Wilson.", "He wants Watson to fetch a cab.", "He has been waiting for Watson all morning."],
        why: ["\"I have no doubt that he will be of the utmost use to me in yours also\"", "He calls Watson his partner and helper in many of his most successful cases."],
      },
      {
        q: "Which word describes the way Holmes spoke to Watson?",
        answer: "cordially",
        wrong: ["abruptly", "stiffly", "coldly", "anxiously"],
        why: ["\"You could not possibly have come at a better time, my dear Watson,\" he said cordially.", "Abruptly describes how he pulled Watson in, not how he spoke."],
      },
      {
        q: "What does Holmes reveal about Watson by saying \"somewhat to embellish\"?",
        answer: "He is teasing Watson for making the cases sound grander than they were.",
        wrong: ["He thinks Watson invents cases entirely.", "He is grateful for Watson's careful accuracy.", "He wants Watson to write more often.", "He is angry that Watson published them."],
        why: ["\"the enthusiasm which has prompted you to chronicle, and, if you will excuse my saying so, somewhat to embellish so many of my own little adventures\"", "The apology in the middle is what makes it a tease rather than an accusation."],
      },
      {
        q: "What does \"bizarre\" mean in the passage?",
        answer: "strange and out of the ordinary",
        wrong: ["dangerous", "dishonest", "very old", "difficult to solve"],
        why: ["\"you share my love of all that is bizarre and outside the conventions and humdrum routine of everyday life\"", "It is set against humdrum routine, so it must mean the opposite of ordinary."],
      },
      {
        q: "What is Holmes's view of real life compared with imagination?",
        answer: "Real life throws up stranger things than anyone could invent.",
        wrong: ["Imagination is more useful to a detective.", "Most crimes are dull and much alike.", "Stories are always better than facts.", "Only small crimes are worth studying."],
        why: ["\"for strange effects and extraordinary combinations we must go to life itself, which is always far more daring than any effort of the imagination\"", "He offers Mr Wilson's story as the proof of it."],
      },
      {
        q: "Which TWO things does Watson say are Holmes's custom when he is in a judicial mood?",
        answers: ["relapsing into his armchair", "putting his fingertips together"],
        wrong: ["pacing up and down the room", "smoking a pipe", "drawing the curtains"],
        why: ["\"relapsing into his armchair and putting his fingertips together, as was his custom when in judicial moods\"", "Watson calls both of them his custom, so the two belong together."],
      },
      {
        q: "What does Watson mean by \"a proposition which I took the liberty of doubting\"?",
        answer: "He politely disagreed with Holmes.",
        wrong: ["He had not understood what Holmes meant.", "He agreed but did not want to say so.", "He thought Holmes was joking.", "He had made the same point himself earlier."],
        why: ["\"A proposition which I took the liberty of doubting.\"", "Took the liberty is a polite way of admitting he contradicted his friend."],
      },
    ],
  },
  {
    id: "midas",
    title: "The king who loved gold",
    source: "from A Wonder Book by Nathaniel Hawthorne, 1851",
    paragraphs: [
      "Once upon a time, there lived a very rich man, and a king besides, whose name was Midas; and he had a little daughter, whom nobody but myself ever heard of, and whose name I either never knew, or have entirely forgotten. So, because I love odd names for little girls, I choose to call her Marygold.",
      "This King Midas was fonder of gold than of anything else in the world. He valued his royal crown chiefly because it was composed of that precious metal. If he loved anything better, or half so well, it was the one little maiden who played so merrily around her father's footstool. But the more Midas loved his daughter, the more did he desire and seek for wealth. He thought, foolish man! that the best thing he could possibly do for this dear child would be to bequeath her the immensest pile of yellow, glistening coin, that had ever been heaped together since the world was made. Thus, he gave all his thoughts and all his time to this one purpose. If ever he happened to gaze for an instant at the gold-tinted clouds of sunset, he wished that they were real gold, and that they could be squeezed safely into his strong box. When little Marygold ran to meet him, with a bunch of buttercups and dandelions, he used to say, \"Poh, poh, child! If these flowers were as golden as they look, they would be worth the plucking!\"",
      "And yet, in his earlier days, before he was so entirely possessed of this insane desire for riches, King Midas had shown a great taste for flowers. He had planted a garden, in which grew the biggest and beautifullest and sweetest roses that any mortal ever saw or smelt. These roses were still growing in the garden, as large, as lovely, and as fragrant, as when Midas used to pass whole hours in gazing at them, and inhaling their perfume. But now, if he looked at them at all, it was only to calculate how much the garden would be worth if each of the innumerable rose-petals were a thin plate of gold. And though he once was fond of music (in spite of an idle story about his ears, which were said to resemble those of an ass), the only music for poor Midas, now, was the chink of one coin against another.",
    ],
    questions: [
      {
        q: "What does the narrator call the king's daughter?",
        answer: "Marygold.",
        wrong: ["Midas.", "Buttercup.", "Marigold Rose.", "She is never given a name."],
        why: ["\"because I love odd names for little girls, I choose to call her Marygold\"", "He admits the real name is lost, so this one is his own choice."],
      },
      {
        q: "Why does the narrator have to choose a name for her himself?",
        answer: "Nobody recorded her real name and he cannot remember it.",
        wrong: ["Her father never gave her one.", "Her name was too difficult to say.", "She had several names already.", "Names were not used in those days."],
        why: ["\"whose name I either never knew, or have entirely forgotten\"", "He says nobody but himself ever heard of her, which is part of the same joke."],
      },
      {
        q: "Which word describes Midas's desire for riches?",
        answer: "insane",
        wrong: ["precious", "immensest", "innumerable", "merry"],
        why: ["\"before he was so entirely possessed of this insane desire for riches\"", "The other words describe the gold, the pile and the petals, not the desire."],
      },
      {
        q: "What is the effect of \"foolish man!\" breaking into the sentence?",
        answer: "The narrator judges Midas openly instead of leaving it to the reader.",
        wrong: ["It shows Midas is speaking to himself.", "It warns that Midas is about to die.", "It tells the reader Midas is not really a king.", "It shows the narrator is frightened of him."],
        why: ["\"He thought, foolish man! that the best thing he could possibly do for this dear child\"", "The story is being told aloud, so the teller can interrupt himself to disagree."],
      },
      {
        q: "Which TWO things had Midas once loved before gold took over?",
        answers: ["flowers", "music"],
        wrong: ["hunting", "travelling", "reading"],
        why: ["\"in his earlier days\" he \"had shown a great taste for flowers\".", "\"And though he once was fond of music\", the only music left to him is the chink of coins."],
      },
      {
        q: "What does Midas say when Marygold brings him buttercups and dandelions?",
        answer: "He wishes they were really made of gold.",
        wrong: ["He asks her to plant more of them.", "He tells her to take them away.", "He says they remind him of her mother.", "He promises to make her a crown of them."],
        why: ["\"Poh, poh, child! If these flowers were as golden as they look, they would be worth the plucking!\"", "He is looking at their colour and thinking about their price."],
      },
      {
        q: "What does \"bequeath\" mean in the passage?",
        answer: "leave to someone after your death",
        wrong: ["hide somewhere safe", "count very carefully", "spend on someone", "earn by hard work"],
        why: ["\"the best thing he could possibly do for this dear child would be to bequeath her the immensest pile of yellow, glistening coin\"", "He is thinking about what she will have after he is gone, not about giving it now."],
      },
      {
        q: "Why does the passage end on \"the chink of one coin against another\"?",
        answer: "It shows that money has replaced everything he once enjoyed.",
        wrong: ["It shows he had sold all his instruments.", "It tells the reader he was counting his gold.", "It suggests his gold was fake.", "It shows he was about to give the money away."],
        why: ["\"the only music for poor Midas, now, was the chink of one coin against another\"", "It closes a list of losses, roses then music, so it lands as the last thing to go."],
      },
    ],
  },
  {
    id: "northwind",
    title: "The boy in the loft",
    source: "from At the Back of the North Wind by George MacDonald, 1871",
    paragraphs: [
      "I HAVE been asked to tell you about the back of the north wind. An old Greek writer mentions a people who lived there, and were so comfortable that they could not bear it any longer, and drowned themselves. My story is not the same as his. I do not think Herodotus had got the right account of the place. I am going to tell you how it fared with a boy who went there.",
      "He lived in a low room over a coach-house; and that was not by any means at the back of the north wind, as his mother very well knew. For one side of the room was built only of boards, and the boards were so old that you might run a penknife through into the north wind. And then let them settle between them which was the sharper! I know that when you pulled it out again the wind would be after it like a cat after a mouse, and you would know soon enough you were not at the back of the north wind. Still, this room was not very cold, except when the north wind blew stronger than usual: the room I have to do with now was always cold, except in summer, when the sun took the matter into his own hands. Indeed, I am not sure whether I ought to call it a room at all; for it was just a loft where they kept hay and straw and oats for the horses.",
      "And when little Diamond, but stop: I must tell you that his father, who was a coachman, had named him after a favourite horse, and his mother had had no objection:, when little Diamond, then, lay there in bed, he could hear the horses under him munching away in the dark, or moving sleepily in their dreams. For Diamond's father had built him a bed in the loft with boards all round it, because they had so little room in their own end over the coach-house; and Diamond's father put old Diamond in the stall under the bed, because he was a quiet horse, and did not go to sleep standing, but lay down like a reasonable creature. But, although he was a surprisingly reasonable creature, yet, when young Diamond woke in the middle of the night, and felt the bed shaking in the blasts of the north wind, he could not help wondering whether, if the wind should blow the house down, and he were to fall through into the manger, old Diamond mightn't eat him up before he knew him in his night-gown. And although old Diamond was very quiet all night long, yet when he woke he got up like an earthquake, and then young Diamond knew what o'clock it was, or at least what was to be done next, which was, to go to sleep again as fast as he could.",
    ],
    questions: [
      {
        q: "Who was Diamond named after?",
        answer: "His father's favourite horse.",
        wrong: ["His grandfather.", "A Greek writer his mother admired.", "The coachman who lived next door.", "A jewel his mother once owned."],
        why: ["\"his father, who was a coachman, had named him after a favourite horse, and his mother had had no objection\"", "The horse is called old Diamond and the boy young Diamond, which keeps them apart."],
      },
      {
        q: "Which word does the narrator use for the place where Diamond slept?",
        answer: "loft",
        wrong: ["coach-house", "manger", "stall", "garret"],
        why: ["\"it was just a loft where they kept hay and straw and oats for the horses\"", "The coach-house is below and the manger is where he fears he might fall."],
      },
      {
        q: "What is the effect of \"you might run a penknife through into the north wind\"?",
        answer: "It makes the wind sound like something solid waiting just outside.",
        wrong: ["It shows the boards were made of paper.", "It suggests Diamond owned a penknife.", "It warns that the house was about to fall.", "It shows how cold the summer was."],
        why: ["\"the boards were so old that you might run a penknife through into the north wind\"", "The narrator then imagines the wind and the knife settling between them which was sharper, as though both were alive."],
      },
      {
        q: "Why does the narrator mention the old Greek writer?",
        answer: "To make clear that his own story of the place is a different one.",
        wrong: ["To prove that the back of the north wind is real.", "To show that he has read a great deal.", "To explain where Diamond's family came from.", "To warn the reader the story is sad."],
        why: ["\"My story is not the same as his.\"", "\"I do not think Herodotus had got the right account of the place.\""],
      },
      {
        q: "Which TWO things could Diamond hear from his bed?",
        answers: ["the horses munching in the dark", "the horses moving in their dreams"],
        wrong: ["the coachman singing below", "the wind whistling in the chimney", "his mother calling him"],
        why: ["\"he could hear the horses under him munching away in the dark, or moving sleepily in their dreams\"", "Both are in the same sentence, joined by or."],
      },
      {
        q: "What did Diamond worry about when the wind shook his bed?",
        answer: "That if he fell through into the manger the horse might eat him.",
        wrong: ["That the horse would escape into the night.", "That his father would not hear him call.", "That the hay would catch fire.", "That the wind would carry the roof away."],
        why: ["\"old Diamond mightn't eat him up before he knew him in his night-gown\"", "The night-gown is the funny part: the horse would not recognise him out of his day clothes."],
      },
      {
        q: "What does the narrator mean by \"he got up like an earthquake\"?",
        answer: "The horse rose so noisily that everything shook.",
        wrong: ["The horse was frightened by a noise.", "The horse got up very slowly.", "The floor of the loft collapsed.", "The horse was ill in the night."],
        why: ["\"when he woke he got up like an earthquake\"", "It was how Diamond knew what o clock it was, so it happened every morning."],
      },
      {
        q: "Why is it funny that Diamond's response to waking was \"to go to sleep again as fast as he could\"?",
        answer: "A grand build-up ends in the smallest possible action.",
        wrong: ["Diamond was always tired.", "He was hiding from his father.", "He had been awake all night.", "The horse had told him to."],
        why: ["\"young Diamond knew what o'clock it was, or at least what was to be done next, which was, to go to sleep again as fast as he could\"", "An earthquake is announced and then nothing happens, which is where the joke sits."],
      },
    ],
  },
  {
    id: "robinhood",
    title: "How Robin fell foul of the law",
    source: "from The Merry Adventures of Robin Hood by Howard Pyle, 1883",
    paragraphs: [
      "IN MERRY ENGLAND in the time of old, when good King Henry the Second ruled the land, there lived within the green glades of Sherwood Forest, near Nottingham Town, a famous outlaw whose name was Robin Hood. No archer ever lived that could speed a gray goose shaft with such skill and cunning as his, nor were there ever such yeomen as the sevenscore merry men that roamed with him through the greenwood shades. Right merrily they dwelled within the depths of Sherwood Forest, suffering neither care nor want, but passing the time in merry games of archery or bouts of cudgel play, living upon the King's venison, washed down with draughts of ale of October brewing.",
      "Not only Robin himself but all the band were outlaws and dwelled apart from other men, yet they were beloved by the country people round about, for no one ever came to jolly Robin for help in time of need and went away again with an empty fist.",
      "And now I will tell how it came about that Robin Hood fell afoul of the law.",
      "When Robin was a youth of eighteen, stout of sinew and bold of heart, the Sheriff of Nottingham proclaimed a shooting match and offered a prize of a butt of ale to whosoever should shoot the best shaft in Nottinghamshire. \"Now,\" quoth Robin, \"will I go too, for fain would I draw a string for the bright eyes of my lass and a butt of good October brewing.\" So up he got and took his good stout yew bow and a score or more of broad clothyard arrows, and started off from Locksley Town through Sherwood Forest to Nottingham.",
      "It was at the dawn of day in the merry Maytime, when hedgerows are green and flowers bedeck the meadows; daisies pied and yellow cuckoo buds and fair primroses all along the briery hedges; when apple buds blossom and sweet birds sing, the lark at dawn of day, the throstle cock and cuckoo; when lads and lasses look upon each other with sweet thoughts; when busy housewives spread their linen to bleach upon the bright green grass. Sweet was the greenwood as he walked along its paths, and bright the green and rustling leaves, amid which the little birds sang with might and main: and blithely Robin whistled as he trudged along, thinking of Maid Marian and her bright eyes, for at such times a youth's thoughts are wont to turn pleasantly upon the lass that he loves the best.",
    ],
    questions: [
      {
        q: "Who ruled England at the time of the story?",
        answer: "King Henry the Second.",
        wrong: ["King Richard the First.", "The Sheriff of Nottingham.", "King John.", "Robin Hood himself."],
        why: ["\"when good King Henry the Second ruled the land\"", "The Sheriff appears later but rules only Nottinghamshire."],
      },
      {
        q: "Which word does the passage use for the men who roamed with Robin?",
        answer: "yeomen",
        wrong: ["sheriffs", "housewives", "lasses", "shepherds"],
        why: ["\"nor were there ever such yeomen as the sevenscore merry men that roamed with him through the greenwood shades\"", "A yeoman was a free countryman, often skilled with a bow."],
      },
      {
        q: "How many merry men roamed with Robin?",
        answer: "Sevenscore, which is one hundred and forty.",
        wrong: ["A score, which is twenty.", "Five.", "A thousand.", "Eighteen."],
        why: ["\"the sevenscore merry men that roamed with him through the greenwood shades\"", "A score is twenty, so sevenscore is seven twenties."],
      },
      {
        q: "Why were the outlaws loved by the country people?",
        answer: "Nobody who came to them for help was ever turned away empty-handed.",
        wrong: ["They paid rent to every farmer.", "They protected the town from the King.", "They gave the Sheriff his prize back.", "They never took the King's deer."],
        why: ["\"no one ever came to jolly Robin for help in time of need and went away again with an empty fist\"", "The passage sets this against the fact that they were outlaws living apart from other men."],
      },
      {
        q: "What does \"fain would I draw a string\" mean?",
        answer: "I would gladly shoot.",
        wrong: ["I must repair my bow.", "I refuse to compete.", "I will play music.", "I would rather stay at home."],
        why: ["\"fain would I draw a string for the bright eyes of my lass and a butt of good October brewing\"", "Drawing the string is pulling back the bow, so it means taking part in the shooting match."],
      },
      {
        q: "Which TWO things did Robin take with him to Nottingham?",
        answers: ["his good stout yew bow", "a score or more of broad clothyard arrows"],
        wrong: ["a butt of October ale", "a stout oak cudgel", "a gray goose"],
        why: ["\"took his good stout yew bow and a score or more of broad clothyard arrows\"", "The ale is the prize he hopes to win, not something he carries there."],
      },
      {
        q: "What is the effect of the long description of the Maytime countryside?",
        answer: "It makes the world feel bright and safe just before Robin falls foul of the law.",
        wrong: ["It shows the journey took several days.", "It explains why the match was held in May.", "It proves the story is set in England.", "It tells the reader how far Nottingham was."],
        why: ["\"when hedgerows are green and flowers bedeck the meadows\"", "The narrator has just said he will tell how Robin fell afoul of the law, so the sweetness is deliberately placed."],
      },
      {
        q: "What prize did the Sheriff offer?",
        answer: "A butt of ale.",
        wrong: ["A purse of gold.", "A yew bow.", "A place among his own archers.", "A pardon for any outlaw."],
        why: ["\"offered a prize of a butt of ale to whosoever should shoot the best shaft in Nottinghamshire\"", "A butt is a large barrel, which is why it is worth the journey."],
      },
    ],
  },
  {
    id: "candle",
    title: "The chemical history of a candle",
    source: "from The Chemical History of a Candle by Michael Faraday, 1861",
    paragraphs: [
      "I purpose, in return for the honour you do us by coming to see what are our proceedings here, to bring before you, in the course of these lectures, the Chemical History of a Candle. I have taken this subject on a former occasion; and were it left to my own will, I should prefer to repeat it almost every year, so abundant is the interest that attaches itself to the subject, so wonderful are the varieties of outlet which it offers into the various departments of philosophy. There is not a law under which any part of this universe is governed which does not come into play, and is touched upon in these phenomena. There is no better, there is no more open door by which you can enter into the study of natural philosophy, than by considering the physical phenomena of a candle. I trust, therefore, I shall not disappoint you in choosing this for my subject rather than any newer topic, which could not be better, were it even so good.",
      "And before proceeding, let me say this also, that though our subject be so great, and our intention that of treating it honestly, seriously, and philosophically, yet I mean to pass away from all those who are seniors amongst us. I claim the privilege of speaking to juveniles as a juvenile myself. I have done so on former occasions, and, if you please, I shall do so again. And though I stand here with the knowledge of having the words I utter given to the world, yet that shall not deter me from speaking in the same familiar way to those whom I esteem nearest to me on this occasion.",
      "And now, my boys and girls, I must first tell you of what candles are made. Some are great curiosities. I have here some bits of timber, branches of trees particularly famous for their burning. And here you see a piece of that very curious substance taken out of some of the bogs in Ireland, called candle-wood, a hard, strong, excellent wood, evidently fitted for good work as a resister of force, and yet withal burning so well that where it is found they make splinters of it, and torches, since it burns like a candle, and gives a very good light indeed. And in this wood we have one of the most beautiful illustrations of the general nature of a candle that I can possibly give. The fuel provided, the means of bringing that fuel to the place of chemical action, the regular and gradual supply of air to that place of action, heat and light, all produced by a little piece of wood of this kind, forming, in fact, a natural candle.",
    ],
    questions: [
      {
        q: "What subject has Faraday chosen for his lectures?",
        answer: "The chemical history of a candle.",
        wrong: ["The history of the Irish bogs.", "The chemistry of burning wood.", "The physics of light and heat.", "The making of torches and splinters."],
        why: ["\"to bring before you, in the course of these lectures, the Chemical History of a Candle\"", "He says he would prefer to repeat this same subject almost every year."],
      },
      {
        q: "Why would Faraday gladly repeat this subject every year?",
        answer: "The interest in it is endless and it opens into every part of science.",
        wrong: ["He has not had time to prepare anything else.", "His audience asks for it each year.", "Candles are cheaper than other equipment.", "It is the only subject he has studied."],
        why: ["\"so abundant is the interest that attaches itself to the subject, so wonderful are the varieties of outlet which it offers\"", "He adds that there is not a law governing the universe which does not come into play in it."],
      },
      {
        q: "What does Faraday mean by claiming \"the privilege of speaking to juveniles as a juvenile myself\"?",
        answer: "He wants to talk to the young people as an equal, not talk down to them.",
        wrong: ["He is younger than most of his audience.", "He has never lectured before.", "He will use no scientific words at all.", "He wants the adults to leave the room."],
        why: ["\"I claim the privilege of speaking to juveniles as a juvenile myself.\"", "He says he means to pass away from all those who are seniors amongst us, so the choice is deliberate."],
      },
      {
        q: "What does Faraday say is the best way into the study of natural philosophy?",
        answer: "Considering the physical phenomena of a candle.",
        wrong: ["Reading the works of earlier scientists.", "Watching a fire burn in a grate.", "Studying the bogs of Ireland.", "Learning the laws of the universe by heart."],
        why: ["\"There is no better, there is no more open door by which you can enter into the study of natural philosophy, than by considering the physical phenomena of a candle.\"", "He calls the candle the door you enter by, so the answer is the candle itself."],
      },
      {
        q: "Where does the candle-wood come from?",
        answer: "Bogs in Ireland.",
        wrong: ["Forests in Scotland.", "The docks of London.", "Trees grown in the Royal Institution garden.", "Mines in Wales."],
        why: ["\"a piece of that very curious substance taken out of some of the bogs in Ireland\"", "He calls it a curiosity, which is why he has brought a piece to show."],
      },
      {
        q: "Which THREE things does Faraday say a piece of burning candle-wood provides?",
        answers: ["the fuel", "a supply of air to the place of action", "heat and light"],
        wrong: ["a wick of cotton thread", "a glass shade to steady the flame"],
        why: ["\"The fuel provided, the means of bringing that fuel to the place of chemical action, the regular and gradual supply of air to that place of action, heat and light.\"", "He calls the result a natural candle, made of one piece of wood."],
      },
      {
        q: "Why does Faraday call the candle \"an open door\"?",
        answer: "One simple object lets a beginner into the whole of science.",
        wrong: ["Candles were used to light doorways.", "He wants the audience to leave if they are bored.", "A candle must be kept out of a draught.", "It is the first experiment he ever did."],
        why: ["\"There is no better, there is no more open door by which you can enter into the study of natural philosophy.\"", "He offers it in place of a newer topic, saying the newer one could not be better."],
      },
      {
        q: "Why is candle-wood a surprising thing to burn?",
        answer: "It is a hard, strong wood that would be useful for building, yet it burns beautifully.",
        wrong: ["It is far too wet to catch light.", "It is the only wood found in bogs.", "It burns without giving any light.", "It has to be soaked in oil first."],
        why: ["\"a hard, strong, excellent wood, evidently fitted for good work as a resister of force, and yet withal burning so well\"", "The and yet is doing the work: the two qualities are not ones you expect together."],
      },
    ],
  },
  {
    id: "lobo",
    title: "The king of Currumpaw",
    source: "from Wild Animals I Have Known by Ernest Thompson Seton, 1898",
    paragraphs: [
      "CURRUMPAW is a vast cattle range in northern New Mexico. It is a land of rich pastures and teeming flocks and herds, a land of rolling mesas and precious running waters that at length unite in the Currumpaw River, from which the whole region is named. And the king whose despotic power was felt over its entire extent was an old gray wolf.",
      "Old Lobo, or the king, as the Mexicans called him, was the gigantic leader of a remarkable pack of gray wolves, that had ravaged the Currumpaw Valley for a number of years. All the shepherds and ranchmen knew him well, and, wherever he appeared with his trusty band, terror reigned supreme among the cattle, and wrath and despair among their owners. Old Lobo was a giant among wolves, and was cunning and strong in proportion to his size. His voice at night was well-known and easily distinguished from that of any of his fellows. An ordinary wolf might howl half the night about the herdsman's bivouac without attracting more than a passing notice, but when the deep roar of the old king came booming down the canon, the watcher bestirred himself and prepared to learn in the morning that fresh and serious inroads had been made among the herds.",
      "Old Lobo's band was but a small one. This I never quite understood, for usually, when a wolf rises to the position and power that he had, he attracts a numerous following. It may be that he had as many as he desired, or perhaps his ferocious temper prevented the increase of his pack. Certain is it that Lobo had only five followers during the latter part of his reign. Each of these, however, was a wolf of renown, most of them were above the ordinary size, one in particular, the second in command, was a veritable giant, but even he was far below the leader in size and prowess. Several of the band, besides the two leaders, were especially noted. One of those was a beautiful white wolf, that the Mexicans called Blanca; this was supposed to be a female, possibly Lobo's mate. Another was a yellow wolf of remarkable swiftness, which, according to current stories had, on several occasions, captured an antelope for the pack.",
    ],
    questions: [
      {
        q: "Where is Currumpaw?",
        answer: "In northern New Mexico.",
        wrong: ["In northern Mexico.", "In southern Texas.", "In the Rocky Mountains of Canada.", "In southern California."],
        why: ["\"CURRUMPAW is a vast cattle range in northern New Mexico.\"", "The river of the same name is what gives the whole region its name."],
      },
      {
        q: "Which word does the passage use for the kind of power Lobo held?",
        answer: "despotic",
        wrong: ["remarkable", "supreme", "ordinary", "gigantic"],
        why: ["\"the king whose despotic power was felt over its entire extent was an old gray wolf\"", "A despot rules absolutely and answers to nobody, which is the picture being built."],
      },
      {
        q: "How could the herdsmen tell Lobo's howl from any other wolf's?",
        answer: "His voice was far deeper and carried much further.",
        wrong: ["He howled only at midnight.", "He howled three times in a row.", "He never howled near the herds.", "He howled only when the pack had eaten."],
        why: ["\"His voice at night was well-known and easily distinguished from that of any of his fellows.\"", "\"when the deep roar of the old king came booming down\""],
      },
      {
        q: "Why does the author keep calling Lobo a king?",
        answer: "It turns him from a large animal into a ruler with subjects.",
        wrong: ["It was the only name the ranchmen knew.", "Wolves always have a king.", "It shows he was the oldest wolf alive.", "It is a translation of the word Currumpaw."],
        why: ["\"Old Lobo, or the king, as the Mexicans called him, was the gigantic leader of a remarkable pack.\"", "The passage speaks of his reign and his followers, which keeps the same idea running."],
      },
      {
        q: "How many wolves followed Lobo in the last part of his reign?",
        answer: "Five.",
        wrong: ["Two.", "Six.", "Twelve.", "More than twenty."],
        why: ["\"Certain is it that Lobo had only five followers during the latter part of his reign.\"", "The passage says this was small for a wolf of his power, which is why it is worth noticing."],
      },
      {
        q: "Which TWO reasons does the author suggest for the pack being so small?",
        answers: ["he had as many followers as he wanted", "his fierce temper kept others away"],
        wrong: ["the ranchmen had shot the rest", "there were few wolves in the valley", "he had only just become the leader"],
        why: ["\"It may be that he had as many as he desired, or perhaps his ferocious temper prevented the increase of his pack.\"", "The author admits he never quite understood it, so both are guesses."],
      },
      {
        q: "What was Blanca?",
        answer: "A beautiful white wolf, thought to be Lobo's mate.",
        wrong: ["A yellow wolf of remarkable swiftness.", "The second in command, a veritable giant.", "A ranchman's dog.", "The name of the Currumpaw River."],
        why: ["\"One of those was a beautiful white wolf, that the Mexicans called Blanca.\"", "The giant second in command and the swift yellow wolf are two different animals."],
      },
      {
        q: "What does \"ravaged\" mean in the passage?",
        answer: "attacked and damaged again and again",
        wrong: ["travelled across quickly", "hunted in secret", "frightened without harming", "lived quietly in"],
        why: ["\"a remarkable pack of gray wolves, that had ravaged the Currumpaw Valley for a number of years\"", "The result each morning was that fresh and serious inroads had been made among the herds."],
      },
    ],
  },
];
