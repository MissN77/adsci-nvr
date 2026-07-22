// ── Reading passages and their questions ──────────────────────────────────
//
// Quest's English paper puts a reading passage at the front, then asks twenty
// questions about it. Six of their twelve comprehension items ask about the
// EFFECT of a choice the author made, not about what happened, so the mix
// here leans the same way.
//
// The passages are genuinely out of copyright, taken from Project Gutenberg:
//
//   The Wind in the Willows, Kenneth Grahame, 1908. Grahame died in 1932.
//   Black Beauty, Anna Sewell, 1877. Sewell died in 1878.
//
// Both are far past life of the author plus seventy years, so they are in the
// public domain in the UK. The text is the author's, not Gutenberg's, and
// none of Gutenberg's own boilerplate is reproduced.
//
// One passage was considered and rejected: the opening of The Secret Garden.
// It is the obvious choice, and it is public domain, but it describes Indian
// servants in the language of 1911. Authentic, and in plenty of anthologies,
// but not something to put in front of a ten year old without a teacher in
// the room to talk about it.
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
      '"Hold up!" said an elderly rabbit at the gap. "Sixpence for the privilege of passing by the private road!" He was bowled over in an instant by the impatient and contemptuous Mole, who trotted along the side of the hedge chaffing the other rabbits as they peeped hurriedly from their holes to see what the row was about. "Onion-sauce! Onion-sauce!" he remarked jeeringly, and was gone before they could think of a thoroughly satisfactory reply. Then they all started grumbling at each other. "How stupid you are! Why didn\'t you tell him, , " "Well, why didn\'t you say, , " "You might have reminded him, , " and so on, in the usual way; but, of course, it was then much too late.',
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
];
