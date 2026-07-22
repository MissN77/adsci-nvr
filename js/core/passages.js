// ── Reading passages and their questions ──────────────────────────────────
//
// Quest's English paper puts a reading passage at the front, then asks twenty
// questions about it. Six of their twelve comprehension items ask about the
// EFFECT of a choice the author made, not about what happened, so the mix
// here leans the same way.
//
// The passages are genuinely out of copyright, taken from Project Gutenberg:
//
//   The Wind in the Willows,  Kenneth Grahame,            1908, died 1932
//   Black Beauty,             Anna Sewell,                1877, died 1878
//   Alice's Adventures in Wonderland, Lewis Carroll,      1865, died 1898
//   A Christmas Carol,        Charles Dickens,            1843, died 1870
//   The Railway Children,     E. Nesbit,                  1906, died 1924
//   The Secret Garden,        Frances Hodgson Burnett,    1911, died 1924
//
// Both are far past life of the author plus seventy years, so they are in the
// public domain in the UK. The text is the author's, not Gutenberg's, and
// none of Gutenberg's own boilerplate is reproduced.
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
        q: 'Which word in the last paragraph shows that the master valued the narrator\'s mother?',
        answer: 'Pet',
        wrong: ['Duchess', 'advice', 'wise', 'often'],
        why: ['A working horse given an affectionate nickname is a horse the master is fond of.',
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
        q: "Which TWO of these does the passage say nobody ever did to Scrooge in the street?",
        answers: ["stopped him to ask how he was", "asked him what the time was"],
        wrong: ["offered to shake his hand", "wished him a happy birthday", "asked to borrow money from him"],
        why: ["\"Nobody ever stopped him in the street to say... how are you?\" and \"no children asked him what it was o'clock\".", "The other three are not mentioned anywhere, so they cannot be right however likely they sound."],
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
        wrong: ["She was the cleverest of the three.", "She was always very well behaved.", "She was often unwell.", "She was the eldest of the children."],
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
        wrong: ["She is afraid the robin will fly away.", "Somebody has told her to keep quiet.", "She has hurt her throat climbing in.", "She is hiding from a gardener nearby."],
        why: ["She also steps softly \"as if she were afraid of awakening someone\", so the whisper is part of the same feeling.", "Nobody else is there. The hush comes from the place, not from any danger."],
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
];
