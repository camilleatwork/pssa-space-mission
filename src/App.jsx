import { useState, useEffect, useCallback, useRef } from "react";

const READING_PASSAGES = [
  {
    id: "p1",
    title: "The Moon Garden",
    text: "Luna loved her grandmother's garden. Every evening, they would walk between the rows of flowers together. \"Some flowers only bloom at night,\" Grandma explained. She pointed to a tall white flower. \"That's a moonflower. It opens when the sun goes down.\"\n\nLuna watched as the petals slowly unfolded. \"Why does it do that?\" she asked.\n\n\"Some plants have adapted to attract moths instead of bees,\" Grandma said. \"Moths come out at night, so the flower opens at night. The white petals help moths see it in the dark.\"\n\nLuna thought about this. \"So the flower is being smart about finding helpers?\"\n\nGrandma smiled. \"Exactly. Every living thing finds its own way to survive. That's what makes nature so wonderful.\"\n\nFrom that night on, Luna visited the garden every evening. She started a journal to draw the moonflowers and write about what she observed. She noticed that the flowers closed again each morning and opened again each night, like tiny white umbrellas.",
    type: "fiction"
  },
  {
    id: "p2",
    title: "How Robots Help Doctors",
    text: "Did you know that robots can help doctors during surgery? These special robots don't work on their own. A doctor controls them using a computer. The robot's arms can make very tiny, careful movements that human hands sometimes cannot.\n\nOne type of surgical robot has four arms. Each arm holds a different tool. The doctor sits at a computer screen nearby and uses hand controls to move the robot's arms. A tiny camera on one arm shows the doctor a close-up view of what's happening.\n\nWhy would a doctor want to use a robot? One reason is that robots can reach small spaces inside the body more easily. Another reason is that the cuts made by robots are often smaller than cuts made by hand. Smaller cuts mean patients heal faster and feel less pain.\n\nSurgical robots are used in hospitals all around the world. Scientists are working to make them even better. In the future, a doctor in one city might use a robot to help a patient in another city far away.",
    type: "nonfiction"
  },
  {
    id: "p3",
    title: "The Kite Contest",
    text: "Marco and his sister Ava wanted to win the town kite contest. The rules were simple: build a kite from materials at home, and the kite that flies the highest wins.\n\n\"Let's use this big garbage bag,\" Marco said. \"It's light and won't rip easily.\"\n\n\"Good idea,\" said Ava. \"But we need a strong frame. What about these wooden sticks from the garden?\"\n\nThey worked all afternoon. Marco cut the garbage bag into a diamond shape. Ava tied the sticks together to make a cross for the frame. They taped the bag to the sticks and added a long tail made from strips of old fabric.\n\nOn contest day, the wind was perfect. Some kids had fancy store-bought kites that looked amazing. Marco felt nervous. \"Ours looks plain,\" he whispered.\n\n\"It doesn't matter how it looks,\" Ava said. \"It matters how it flies.\"\n\nWhen the judge said \"Go!\" all the kites went up. Some of the fancy kites were too heavy and wobbled. Marco and Ava's kite shot up fast because it was so light. It climbed higher and higher.\n\n\"We have a winner!\" the judge announced, pointing at their kite sailing above all the rest.\n\nMarco and Ava high-fived. They learned that a good design doesn't have to be the prettiest - it has to work the best.",
    type: "fiction"
  },
  {
    id: "p4",
    title: "Amazing Animal Disguises",
    text: "Many animals use camouflage to hide from predators or to sneak up on prey. Camouflage means blending in with the surroundings so that other animals cannot easily see you.\n\nThe Arctic fox changes color with the seasons. In winter, its fur turns white to match the snow. In summer, its fur turns brown to blend in with rocks and dirt. This helps the fox hide from larger animals that might want to eat it.\n\nThe walking stick insect looks exactly like a small twig. It is long, thin, and brown. When it stays still on a branch, it is nearly impossible to spot. Birds that eat insects will walk right past it without noticing.\n\nThe octopus may be the best disguise artist of all. It can change both its color and the texture of its skin in less than a second. An octopus resting on a bumpy coral reef can make its skin look bumpy and the same color as the coral. If it swims to a sandy area, it quickly becomes smooth and sandy-colored.\n\nScientists study these animals to learn how their camouflage works. Some researchers are even trying to create materials for people that can change color, inspired by the octopus.",
    type: "nonfiction"
  },
  {
    id: "p5",
    title: "Jasmine's Star Map",
    text: "Jasmine had always been curious about the night sky. For her birthday, her dad gave her a telescope and a book about constellations. A constellation is a group of stars that forms a pattern or shape in the sky.\n\n\"Let's find the Big Dipper first,\" Dad said. \"It's one of the easiest to spot.\" He pointed to seven bright stars that looked like a giant cup with a handle.\n\n\"I see it!\" Jasmine shouted. She looked through the telescope. The stars seemed so much closer. \"Can we find more?\"\n\nDad showed her how to use the two stars at the end of the Big Dipper to find the North Star. \"The North Star is special because it stays in almost the same spot all year,\" he explained. \"Travelers used to use it to find their way.\"\n\nJasmine decided to make her own star map. Every clear night, she went outside with her telescope and her notebook. She drew the stars she could see and labeled the constellations. After a month, she noticed something surprising - the constellations had shifted position slightly.\n\n\"That's because Earth is moving around the Sun,\" Dad explained. \"As we move, we see different parts of the sky.\"\n\nJasmine added arrows to her map to show how the constellations moved. Her teacher was so impressed that she asked Jasmine to present her star map to the whole class.",
    type: "fiction"
  }
];

const QUESTIONS = {
  ela_reading: [
    { id: "er1", passageId: "p1", question: "Why do moonflowers open at night?", options: ["They are afraid of the sun", "They attract moths that come out at night", "They need rain to open", "Grandma opens them by hand"], correct: 1, explanation: "The passage says moonflowers attract moths instead of bees. Since moths come out at night, the flower opens at night. Always look for the answer IN the passage!", category: "Reading Comprehension", difficulty: 1 },
    { id: "er2", passageId: "p1", question: "What did Luna start doing after learning about moonflowers?", options: ["She planted her own garden", "She started a journal to draw and write about them", "She stopped visiting the garden", "She caught moths"], correct: 1, explanation: "The passage says Luna started a journal to draw the moonflowers and write about what she observed. When a question asks what happened, go back and find the exact sentence!", category: "Reading Comprehension", difficulty: 1 },
    { id: "er3", passageId: "p1", question: "What does Luna compare the moonflowers to?", options: ["Stars in the sky", "Tiny white umbrellas", "Butterflies", "Snowflakes"], correct: 1, explanation: "Luna noticed the flowers opened again each night, like tiny white umbrellas. This is a comparison called a simile. Look for the word 'like' to find comparisons!", category: "Reading Comprehension", difficulty: 2 },
    { id: "er4", passageId: "p2", question: "Who controls the surgical robot during an operation?", options: ["The robot works by itself", "A computer program", "A doctor using hand controls", "A nurse"], correct: 2, explanation: "The passage says a doctor controls them using a computer and uses hand controls to move the robot's arms. This is a detail question. The answer is right there in the text!", category: "Reading Comprehension", difficulty: 1 },
    { id: "er5", passageId: "p2", question: "According to the passage, what is one benefit of using surgical robots?", options: ["They are cheaper than doctors", "They make smaller cuts so patients heal faster", "They can work without electricity", "They never make mistakes"], correct: 1, explanation: "The passage states that cuts made by robots are often smaller and smaller cuts mean patients heal faster. Be careful - the passage does NOT say robots are cheaper or never make mistakes!", category: "Reading Comprehension", difficulty: 1 },
    { id: "er6", passageId: "p2", question: "What might happen in the future with surgical robots?", options: ["Robots will replace all doctors", "A doctor in one city might help a patient far away using a robot", "Robots will become too expensive", "Hospitals will stop using robots"], correct: 1, explanation: "The last paragraph says a doctor in one city might use a robot to help a patient in another city far away. Look at the LAST paragraph when questions ask about the future!", category: "Evidence-Based", difficulty: 2, isEBSR: true, part2: { question: "Which sentence from the passage BEST supports your answer?", options: ["These special robots don't work on their own.", "Surgical robots are used in hospitals all around the world.", "In the future, a doctor in one city might use a robot to help a patient in another city far away.", "One type of surgical robot has four arms."], correct: 2, explanation: "The best evidence is the sentence that directly states what could happen in the future. In two-part questions, Part 2 asks you to find the PROOF for your Part 1 answer!" } },
    { id: "er7", passageId: "p3", question: "Why did Marco feel nervous on contest day?", options: ["He forgot his kite at home", "Their kite looked plain compared to the fancy ones", "The wind was too strong", "He didn't know the rules"], correct: 1, explanation: "Marco whispered 'Ours looks plain' - he was comparing their homemade kite to the fancy store-bought ones. Look for clues about how characters feel in what they SAY and DO!", category: "Reading Comprehension", difficulty: 1 },
    { id: "er8", passageId: "p3", question: "What is the MAIN lesson of this story?", options: ["Always buy the most expensive kite", "Working together is important but not enough", "A good design works well even if it is not the prettiest", "Contests are not fair"], correct: 2, explanation: "The last line says a good design doesn't have to be the prettiest - it has to work the best. MAIN lesson questions ask about the BIG idea, not small details.", category: "Reading Comprehension", difficulty: 2 },
    { id: "er9", passageId: "p3", question: "Why did Marco and Ava's kite fly the highest?", options: ["It was the biggest kite", "It had the longest tail", "It was very light", "They threw it the hardest"], correct: 2, explanation: "The passage says their kite shot up fast because it was so light. The word 'because' is a big clue - it tells you the REASON!", category: "Reading Comprehension", difficulty: 1 },
    { id: "er10", passageId: "p4", question: "What does 'camouflage' mean based on the passage?", options: ["Running away from danger", "Blending in with surroundings so others cannot see you", "Making loud noises to scare predators", "Hiding underground"], correct: 1, explanation: "The passage directly defines it: Camouflage means blending in with the surroundings. When a passage defines a word for you, that is a gift - use it!", category: "Vocabulary", difficulty: 1 },
    { id: "er11", passageId: "p4", question: "Which animal can change BOTH its color and skin texture?", options: ["Arctic fox", "Walking stick insect", "Octopus", "All of the above"], correct: 2, explanation: "The passage says the octopus can change both its color and the texture of its skin. The fox only changes color and the walking stick doesn't change at all.", category: "Evidence-Based", difficulty: 2, isEBSR: true, part2: { question: "Which detail from the passage BEST supports your answer?", options: ["In winter, its fur turns white to match the snow.", "It is long, thin, and brown.", "It can change both its color and the texture of its skin in less than a second.", "Scientists study these animals."], correct: 2, explanation: "The sentence about changing both its color and the texture of its skin directly proves the octopus can change both. Always pick the sentence that MOST DIRECTLY answers the question!" } },
    { id: "er12", passageId: "p5", question: "What is a constellation?", options: ["A type of telescope", "A planet in the solar system", "A group of stars that forms a pattern in the sky", "A map of the Earth"], correct: 2, explanation: "The passage defines it: A constellation is a group of stars that forms a pattern or shape in the sky. The author told you exactly what it means!", category: "Vocabulary", difficulty: 1 },
    { id: "er13", passageId: "p5", question: "Why did the constellations shift position after a month?", options: ["The stars moved to new places", "Jasmine's telescope was broken", "Earth moves around the Sun so we see different parts of the sky", "The weather changed"], correct: 2, explanation: "Dad explained that Earth is moving around the Sun and as we move, we see different parts of the sky. The answer comes from what a character EXPLAINS!", category: "Reading Comprehension", difficulty: 2 },
    { id: "er14", passageId: "p5", question: "What made Jasmine's star map special enough for her teacher to notice?", options: ["It was very colorful", "She added arrows to show how constellations moved over time", "She used a computer to make it", "Her dad helped her draw it"], correct: 1, explanation: "Jasmine added arrows to her map to show how the constellations moved and then her teacher was impressed. She went beyond just drawing - she showed CHANGE over time!", category: "Reading Comprehension", difficulty: 2 },
  ],
  ela_conventions: [
    { id: "ec1", question: "Read the sentence:\n\nThe astronaut __________ very excited when she saw the stars.\n\nWhich word correctly completes the sentence?", options: ["was", "were", "is", "are"], correct: 0, explanation: "Since we are talking about ONE astronaut (she) and it already happened (saw), we need 'was.' Remember: one person = was, more than one = were.", category: "Grammar", difficulty: 1 },
    { id: "ec2", question: "Which sentence uses commas correctly?", options: ["I packed a sandwich, an apple and juice.", "I packed a sandwich an apple, and juice.", "I packed, a sandwich an apple and juice.", "I packed a sandwich, an apple, and juice."], correct: 3, explanation: "When listing three or more things, put a comma after each item. Sandwich COMMA apple COMMA and juice. Think of commas as tiny pauses between items!", category: "Grammar", difficulty: 1 },
    { id: "ec3", question: "Read the sentence:\n\nThe two __________ played together in the park.\n\nWhich word correctly completes the sentence?", options: ["puppys", "puppyes", "puppies", "puppy's"], correct: 2, explanation: "When a word ends in consonant + y (like puppy), change the y to i and add es. Puppy becomes puppies! The word puppy's with an apostrophe means something BELONGS to the puppy.", category: "Grammar", difficulty: 1 },
    { id: "ec4", question: "Which sentence is written correctly?", options: ["him and me went to the store.", "Him and I went to the store.", "He and I went to the store.", "He and me went to the store."], correct: 2, explanation: "When talking about yourself and someone else doing something, use He (not Him) and I (not me). A trick: take the other person out - you would say I went to the store, not me went to the store.", category: "Grammar", difficulty: 2 },
    { id: "ec5", question: "Read the sentence:\n\nThe rocket launched into space it flew past the Moon.\n\nWhat is the BEST way to fix this sentence?", options: ["The rocket launched into space, it flew past the Moon.", "The rocket launched into space. It flew past the Moon.", "The rocket, launched into space it flew past the Moon.", "The rocket launched, into space it flew past the Moon."], correct: 1, explanation: "This is a run-on sentence - two complete thoughts stuck together. The best fix is to split them into two sentences with a period. Each sentence should have its own subject and verb!", category: "Grammar", difficulty: 2 },
    { id: "ec6", question: "Which word in this sentence should be capitalized?\n\nWe visited the museum on saturday with our class.", options: ["museum", "saturday", "visited", "class"], correct: 1, explanation: "Days of the week are ALWAYS capitalized: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday! Names of specific places, days, and months all get capital letters.", category: "Grammar", difficulty: 1 },
    { id: "ec7", question: "Read the sentences:\n\nMaria looked up at the sky. She saw __________ amazing rainbow.\n\nWhich word best fills in the blank?", options: ["a", "an", "the", "this"], correct: 1, explanation: "Use 'an' before words that start with a vowel SOUND. Amazing starts with the vowel a, so we say an amazing rainbow. Use a before consonant sounds and an before vowel sounds!", category: "Grammar", difficulty: 1 },
    { id: "ec8", question: "Which sentence uses quotation marks correctly?", options: ["\"Let's go outside, said Mom.\"", "Let's go outside, \"said Mom.\"", "\"Let's go outside,\" said Mom.", "Let's \"go outside,\" said Mom."], correct: 2, explanation: "Quotation marks go around the exact words someone SAYS. The comma goes INSIDE the quotation marks, before said Mom. Think of it like a speech bubble!", category: "Grammar", difficulty: 2 },
    { id: "ec9", question: "Read the sentence:\n\nThe children __________ playing outside when it started to rain.\n\nWhich word correctly completes the sentence?", options: ["was", "is", "were", "are"], correct: 2, explanation: "Children is more than one person (plural), so we use were. One child WAS playing, but the children WERE playing. Match the verb to how many!", category: "Grammar", difficulty: 1 },
    { id: "ec10", question: "Which word is spelled correctly?", options: ["becuz", "becaus", "because", "becuse"], correct: 2, explanation: "Because is the correct spelling. This is a word you will use a lot in writing, especially on the PSSA when they ask you to explain your answer!", category: "Grammar", difficulty: 1 },
  ],
  ela_short_answer: [
    { id: "esa1", passageId: "p1", question: "Based on the passage, explain ONE thing Luna learned from her grandmother about moonflowers. Use details from the passage to support your answer.", sampleAnswer: "Luna learned that moonflowers open at night to attract moths. Her grandmother explained that since moths come out at night, the flowers adapted to open when the sun goes down, and their white petals help moths find them in the dark.", tips: "For short answer questions:\n- Start by restating part of the question\n- Use specific details from the passage\n- Write at least 2-3 sentences\n- Check your spelling and punctuation", category: "Short Answer", difficulty: 2 },
    { id: "esa2", passageId: "p3", question: "What lesson did Marco and Ava learn from the kite contest? Use details from the story to support your answer.", sampleAnswer: "Marco and Ava learned that a good design does not have to look the prettiest. It has to work the best. Their kite was made from a garbage bag and looked plain, but it was light and flew higher than all the fancy store-bought kites.", tips: "Remember the writing checklist:\n- Did I answer the EXACT question asked?\n- Did I include details from the passage?\n- Did I write in complete sentences?\n- Did I check for capital letters and periods?", category: "Short Answer", difficulty: 2 },
    { id: "esa3", passageId: "p4", question: "Choose ONE animal from the passage and explain how it uses camouflage. Use details from the passage in your answer.", sampleAnswer: "The Arctic fox uses camouflage by changing the color of its fur with the seasons. In winter, its fur turns white to match the snow, and in summer, its fur turns brown to blend in with rocks and dirt. This helps the fox hide from larger animals that want to eat it.", tips: "When the question says choose ONE, pick the one you remember the most about! Then use details straight from the passage.", category: "Short Answer", difficulty: 2 },
  ],
  math: [
    { id: "m1", question: "What is 456 rounded to the nearest hundred?", options: ["400", "450", "460", "500"], correct: 3, explanation: "Look at the tens digit (5). Since 5 or more means round UP, 456 rounds up to 500. Remember: look at the digit to the RIGHT of the place you are rounding to!", category: "Numbers & Operations", difficulty: 1 },
    { id: "m2", question: "Sara has 347 stickers. She gets 285 more stickers. How many stickers does Sara have now?", options: ["532", "622", "632", "732"], correct: 2, explanation: "347 + 285 = 632. Line up the numbers by place value: 7+5=12 (write 2, carry 1), 4+8+1=13 (write 3, carry 1), 3+2+1=6. Sara has 632 stickers!", category: "Numbers & Operations", difficulty: 1 },
    { id: "m3", question: "Which number sentence is in the same fact family as 6 x 4 = 24?", options: ["6 + 4 = 10", "24 - 6 = 18", "24 / 4 = 6", "4 + 24 = 28"], correct: 2, explanation: "A fact family uses the SAME three numbers. 6, 4, and 24 are a family: 6x4=24, 4x6=24, 24/4=6, 24/6=4. Addition and subtraction are a DIFFERENT family!", category: "Numbers & Operations", difficulty: 1 },
    { id: "m4", question: "The fraction 3/4 would be found where on a number line from 0 to 1?", options: ["Closer to 0", "Exactly at the middle", "Between the middle and 1", "Exactly at 1"], correct: 2, explanation: "3/4 means 3 out of 4 equal parts. The middle of 0 and 1 is 2/4 (or 1/2). Since 3/4 is more than 2/4 but less than 4/4, it is between the middle and 1!", category: "Fractions", difficulty: 2 },
    { id: "m5", question: "A rectangle has a length of 7 inches and a width of 3 inches. What is the PERIMETER of the rectangle?", options: ["10 inches", "20 inches", "21 inches", "24 inches"], correct: 1, explanation: "Perimeter means the distance ALL the way around. A rectangle has 2 lengths and 2 widths: 7 + 3 + 7 + 3 = 20 inches. Or use the shortcut: (7 + 3) x 2 = 20!", category: "Geometry", difficulty: 2 },
    { id: "m6", question: "Marcus has 5 bags of marbles. Each bag has 8 marbles. How many marbles does Marcus have in all?", options: ["13", "35", "40", "45"], correct: 2, explanation: "5 bags x 8 marbles in each = 40 marbles total. When you have EQUAL groups, multiply! 5 x 8 = 40. You could also count by 8s: 8, 16, 24, 32, 40.", category: "Numbers & Operations", difficulty: 1 },
    { id: "m7", question: "What time does the clock show if the hour hand is between 2 and 3, and the minute hand points to 6?", options: ["2:06", "2:30", "6:02", "6:10"], correct: 1, explanation: "When the minute hand points to 6, it means 30 minutes (6 x 5 = 30). The hour hand is between 2 and 3, so it is 2:30. Remember: each number on the clock = 5 minutes!", category: "Measurement", difficulty: 1 },
    { id: "m8", question: "Which fraction is GREATER than 1/2?", options: ["1/3", "1/4", "2/6", "3/4"], correct: 3, explanation: "3/4 is greater than 1/2. Here is how to check: 1/2 = 2/4, and 3/4 is bigger than 2/4. The others are all LESS than 1/2.", category: "Fractions", difficulty: 2 },
    { id: "m9", question: "A store sells juice boxes in packs of 3. Mom buys 7 packs. How many juice boxes does she buy?", options: ["10", "14", "18", "21"], correct: 3, explanation: "7 packs x 3 juice boxes in each = 21. You can count by 3s: 3, 6, 9, 12, 15, 18, 21. That is 7 groups of 3!", category: "Numbers & Operations", difficulty: 1 },
    { id: "m10", question: "What is 803 - 457?", options: ["346", "354", "446", "456"], correct: 0, explanation: "803 - 457: Start from the right. 3 minus 7? Can not do it, so borrow. 13-7=6. Then you need to borrow again from the 8. Work carefully and you get 346!", category: "Numbers & Operations", difficulty: 2 },
    { id: "m11", question: "A square has sides that are each 5 cm long. What is the AREA of the square?", options: ["10 sq cm", "15 sq cm", "20 sq cm", "25 sq cm"], correct: 3, explanation: "Area of a square = side x side = 5 x 5 = 25 square cm. Perimeter is AROUND (add the sides), but AREA is INSIDE (multiply length x width)!", category: "Geometry", difficulty: 2 },
    { id: "m12", question: "Ali read 12 books. Ben read 8 books. Cara read 15 books. How many MORE books did Cara read than Ben?", options: ["3", "5", "7", "23"], correct: 2, explanation: "MORE means subtract to find the difference: 15 - 8 = 7 books. Cara read 7 more books than Ben. Watch out for the word MORE - it usually means find the difference!", category: "Measurement & Data", difficulty: 1 },
    { id: "m13", question: "Which shape has exactly 6 faces, 8 corners, and 12 edges?", options: ["Sphere", "Cone", "Rectangular prism (box shape)", "Cylinder"], correct: 2, explanation: "A rectangular prism (like a cereal box) has 6 flat faces, 8 corners, and 12 edges. Think of a cereal box! A sphere has 0 of each.", category: "Geometry", difficulty: 2 },
    { id: "m14", question: "What number makes this equation true?\n\n___ x 9 = 36", options: ["3", "4", "5", "6"], correct: 1, explanation: "4 x 9 = 36. If you do not remember, count by 9s: 9, 18, 27, 36. That is four 9s! You can also think: 36 divided by 9 = 4.", category: "Numbers & Operations", difficulty: 1 },
    { id: "m15", question: "A pencil is 19 centimeters long. What is 19 rounded to the nearest ten?", options: ["10", "15", "19", "20"], correct: 3, explanation: "19 rounded to the nearest ten: look at the ones digit (9). Since 9 is 5 or more, round UP. 19 rounds to 20!", category: "Numbers & Operations", difficulty: 1 },
    { id: "m16", question: "A fish tank holds 4 liters of water. How many milliliters is that?\n(1 liter = 1,000 milliliters)", options: ["40 mL", "400 mL", "4,000 mL", "40,000 mL"], correct: 2, explanation: "4 liters x 1,000 milliliters per liter = 4,000 mL. When converting liters to milliliters, multiply by 1,000 (just add three zeros)!", category: "Measurement", difficulty: 2 },
    { id: "m17", question: "Which pair of fractions are equal?", options: ["1/2 and 1/3", "2/4 and 1/2", "1/4 and 1/2", "3/4 and 2/3"], correct: 1, explanation: "2/4 = 1/2 because if you divide both the top and bottom of 2/4 by 2, you get 1/2. These are called equivalent fractions - they look different but show the same amount!", category: "Fractions", difficulty: 2 },
    { id: "m18", question: "Matthew has $5.00. He buys a notebook for $2.75. How much money does he have left?", options: ["$2.15", "$2.25", "$2.35", "$3.25"], correct: 1, explanation: "$5.00 - $2.75 = $2.25. Line up the decimal points! Always line up the dots when working with money!", category: "Numbers & Operations", difficulty: 2 },
  ]
};

const WEEK_SCHEDULE = {
  1: { focus: "Foundations", elaPerDay: 2, mathPerDay: 2, description: "Getting started! Learn the test strategies." },
  2: { focus: "Foundations", elaPerDay: 3, mathPerDay: 2, description: "Building confidence with the basics." },
  3: { focus: "ELA Deep Dive", elaPerDay: 4, mathPerDay: 1, description: "Focus on reading passages this week!" },
  4: { focus: "ELA Deep Dive", elaPerDay: 4, mathPerDay: 1, description: "More reading practice - find the evidence!" },
  5: { focus: "Math + Grammar", elaPerDay: 2, mathPerDay: 3, description: "Math word problems and grammar rules!" },
  6: { focus: "Math + Grammar", elaPerDay: 2, mathPerDay: 3, description: "Keep practicing - you are getting stronger!" },
  7: { focus: "Writing Practice", elaPerDay: 3, mathPerDay: 2, description: "Practice writing answers with evidence." },
  8: { focus: "Review", elaPerDay: 2, mathPerDay: 2, description: "Mini practice test this week!" },
  9: { focus: "Confidence Week", elaPerDay: 2, mathPerDay: 1, description: "You are ready! Light practice and rest." },
};

const BADGES = [
  { name: "First Launch", icon: "\u{1F680}", req: "Complete your first practice" },
  { name: "Streak Explorer", icon: "\u2B50", req: "3-day streak" },
  { name: "Constellation Maker", icon: "\u{1F31F}", req: "5-day streak" },
  { name: "Galaxy Brain", icon: "\u{1F9E0}", req: "Get 5 in a row correct" },
  { name: "Reading Rocket", icon: "\u{1F4DA}", req: "Complete 10 ELA questions" },
  { name: "Math Meteor", icon: "\u{1F522}", req: "Complete 10 Math questions" },
  { name: "Super Nova", icon: "\u{1F4AB}", req: "Score 100% on a daily practice" },
  { name: "Moon Walker", icon: "\u{1F319}", req: "7-day streak" },
  { name: "Star Captain", icon: "\u{1F468}\u200D\u{1F680}", req: "Complete 50 total questions" },
  { name: "Mission Commander", icon: "\u{1F3C6}", req: "Complete 100 total questions" },
];

const getKey = (p) => "pssa_" + p;

const loadP = (player) => {
  try {
    const s = localStorage.getItem(getKey(player));
    if (s) return JSON.parse(s);
  } catch (e) { /* ignore */ }
  return { totalCorrect: 0, totalAnswered: 0, elaCorrect: 0, elaAnswered: 0, mathCorrect: 0, mathAnswered: 0, streak: 0, bestStreak: 0, lastDate: null, answered: [], badges: [], history: [], catStats: {} };
};

const saveP = (player, p) => {
  try { localStorage.setItem(getKey(player), JSON.stringify(p)); } catch(e) { /* ignore */ }
};

function Stars() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let w, h, stars, raf;
    const init = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3, sp: Math.random() * 0.25 + 0.05,
        tw: Math.random() * 6.28
      }));
    };
    init();
    const draw = () => {
      ctx.fillStyle = "#080b1c";
      ctx.fillRect(0, 0, w, h);
      for (const s of stars) {
        s.tw += 0.02;
        const a = 0.4 + Math.sin(s.tw) * 0.35;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.28);
        ctx.fillStyle = "rgba(255,255,255," + a + ")";
        ctx.fill();
        s.y += s.sp;
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }} />;
}

function StrategyTip({ type, onGo }) {
  const data = {
    ela: { icon: "\u{1F4D6}", title: "Reading Mission Checklist", items: ["Read ALL the answer choices before picking one", "Look for key words: NOT, BEST, MOST, MAIN", "You can ALWAYS go back to the passage!", "Cross out answers you KNOW are wrong"] },
    math: { icon: "\u{1F522}", title: "Math Mission Checklist", items: ["Read the WHOLE problem - don't rush!", "Underline what the question is ASKING", "Show your work on scratch paper", "Check: Does your answer make SENSE?"] },
  };
  const d = data[type] || data.ela;
  return (
    <div style={{ background: "linear-gradient(135deg, rgba(30,40,80,0.95), rgba(20,25,60,0.95))", borderRadius: 20, padding: 28, maxWidth: 480, margin: "0 auto", border: "2px solid rgba(100,140,255,0.3)" }}>
      <div style={{ fontSize: 48, textAlign: "center", marginBottom: 8 }}>{d.icon}</div>
      <h3 style={{ color: "#8fb8ff", textAlign: "center", fontFamily: "'Fredoka', sans-serif", fontSize: 20, marginBottom: 16 }}>{d.title}</h3>
      {d.items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, color: "#c8d8f8", fontSize: 15, fontFamily: "'Nunito', sans-serif" }}>
          <span style={{ color: "#ffd700" }}>★</span>
          <span>{item}</span>
        </div>
      ))}
      <button onClick={onGo} style={{ display: "block", width: "100%", marginTop: 20, padding: 14, background: "linear-gradient(135deg, #4a7aff, #6c5ce7)", color: "#fff", border: "none", borderRadius: 12, fontSize: 17, fontFamily: "'Fredoka', sans-serif", cursor: "pointer", fontWeight: 600 }}>
        I'm Ready! Let's Go! 🚀
      </button>
    </div>
  );
}

function Question({ q, passage, onAnswer, num, total }) {
  const [sel, setSel] = useState(null);
  const [shown, setShown] = useState(false);
  const [p2Sel, setP2Sel] = useState(null);
  const [p2Shown, setP2Shown] = useState(false);
  const [inP2, setInP2] = useState(false);
  const [text, setText] = useState("");
  const [sampleShown, setSampleShown] = useState(false);
  const isSA = !!q.sampleAnswer;

  const submit = () => {
    if (isSA) { setSampleShown(true); return; }
    if (sel === null) return;
    setShown(true);
  };
  const submitP2 = () => { if (p2Sel === null) return; setP2Shown(true); };
  const next = () => {
    if (isSA) { onAnswer(text.trim().length > 10); return; }
    if (q.isEBSR && shown && !inP2) { setInP2(true); return; }
    if (q.isEBSR && p2Shown) { onAnswer(sel === q.correct && p2Sel === q.part2.correct); return; }
    onAnswer(sel === q.correct);
  };

  const ok = sel === q.correct;
  const p2ok = p2Sel === (q.part2 || {}).correct;
  const opts = inP2 ? q.part2.options : q.options;
  const curSel = inP2 ? p2Sel : sel;
  const curShown = inP2 ? p2Shown : shown;
  const curCorrect = inP2 ? q.part2.correct : q.correct;
  const curOk = inP2 ? p2ok : ok;
  const curExpl = inP2 ? q.part2.explanation : q.explanation;

  return (
    <div style={{ background: "linear-gradient(145deg, rgba(25,32,65,0.97), rgba(15,20,50,0.97))", borderRadius: 24, padding: "24px 24px", maxWidth: 620, margin: "0 auto", border: "1px solid rgba(100,140,255,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ color: "#8fb8ff", fontFamily: "'Nunito', sans-serif", fontSize: 13 }}>Question {num} of {total}</span>
        <span style={{ color: "#a0a8c0", fontSize: 12 }}>{q.category}</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, marginBottom: 18, overflow: "hidden" }}>
        <div style={{ height: "100%", width: (num / total * 100) + "%", background: "linear-gradient(90deg,#4a7aff,#a855f7)", borderRadius: 3, transition: "width 0.5s" }} />
      </div>

      {passage && (
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "14px 18px", marginBottom: 18, border: "1px solid rgba(255,255,255,0.08)", maxHeight: 200, overflowY: "auto" }}>
          <div style={{ color: "#ffd700", fontSize: 13, fontFamily: "'Fredoka', sans-serif", marginBottom: 6 }}>
            {"📖 " + passage.title + (passage.type === "nonfiction" ? " (Nonfiction)" : " (Fiction)")}
          </div>
          <p style={{ color: "#d0d8e8", fontSize: 14, lineHeight: 1.75, fontFamily: "'Nunito', sans-serif", margin: 0, whiteSpace: "pre-line" }}>{passage.text}</p>
        </div>
      )}

      <h3 style={{ color: "#e8f0ff", fontFamily: "'Fredoka', sans-serif", fontSize: 17, lineHeight: 1.5, marginBottom: 16, whiteSpace: "pre-line" }}>
        {inP2 ? q.part2.question : q.question}
      </h3>

      {isSA && !sampleShown && (
        <div>
          <div style={{ background: "rgba(255,215,0,0.08)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, border: "1px solid rgba(255,215,0,0.15)" }}>
            <p style={{ color: "#ffd700", fontSize: 13, fontFamily: "'Nunito', sans-serif", margin: 0, whiteSpace: "pre-line" }}>{q.tips}</p>
          </div>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write your answer here..."
            style={{ width: "100%", minHeight: 110, padding: 12, borderRadius: 12, border: "2px solid rgba(100,140,255,0.3)", background: "rgba(255,255,255,0.06)", color: "#e0e8f0", fontSize: 15, fontFamily: "'Nunito', sans-serif", resize: "vertical", boxSizing: "border-box", outline: "none" }} />
          <button onClick={submit} disabled={text.trim().length < 5}
            style={{ display: "block", width: "100%", marginTop: 12, padding: 14, background: text.trim().length < 5 ? "rgba(100,100,140,0.3)" : "linear-gradient(135deg, #4a7aff, #6c5ce7)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontFamily: "'Fredoka', sans-serif", cursor: text.trim().length < 5 ? "not-allowed" : "pointer", fontWeight: 600 }}>
            Check My Answer
          </button>
        </div>
      )}

      {isSA && sampleShown && (
        <div>
          <div style={{ background: "rgba(255,215,0,0.1)", borderRadius: 14, padding: "14px 18px", marginBottom: 12, border: "1px solid rgba(255,215,0,0.2)" }}>
            <p style={{ color: "#ffd700", fontSize: 14, fontFamily: "'Fredoka', sans-serif", marginBottom: 6 }}>Great effort! Here is an example of a strong answer:</p>
            <p style={{ color: "#d0d8e8", fontSize: 14, lineHeight: 1.6, fontFamily: "'Nunito', sans-serif", margin: 0 }}>{q.sampleAnswer}</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "10px 14px", marginBottom: 12 }}>
            <p style={{ color: "#a0b0d0", fontSize: 12, marginBottom: 4 }}>Your answer:</p>
            <p style={{ color: "#c8d4e8", fontSize: 14, fontFamily: "'Nunito', sans-serif", margin: 0 }}>{text}</p>
          </div>
          <button onClick={next} style={{ display: "block", width: "100%", padding: 14, background: "linear-gradient(135deg, #4a7aff, #6c5ce7)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontFamily: "'Fredoka', sans-serif", cursor: "pointer", fontWeight: 600 }}>Continue →</button>
        </div>
      )}

      {!isSA && (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
            {opts.map((opt, i) => {
              let bg = "rgba(255,255,255,0.06)";
              let bdr = "1px solid rgba(255,255,255,0.1)";
              if (curSel === i && !curShown) { bg = "rgba(74,122,255,0.2)"; bdr = "2px solid #4a7aff"; }
              if (curShown && i === curCorrect) { bg = "rgba(46,204,113,0.15)"; bdr = "2px solid #2ecc71"; }
              if (curShown && curSel === i && i !== curCorrect) { bg = "rgba(231,76,60,0.15)"; bdr = "2px solid #e74c3c"; }
              return (
                <button key={i} onClick={() => { if (!curShown) { inP2 ? setP2Sel(i) : setSel(i); } }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", background: bg, border: bdr, borderRadius: 12, cursor: curShown ? "default" : "pointer", textAlign: "left", color: "#d8e0f0", fontSize: 15, fontFamily: "'Nunito', sans-serif", transition: "all 0.2s" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 28, height: 28, borderRadius: 8, fontSize: 13, fontWeight: 700, background: curSel === i ? "rgba(74,122,255,0.3)" : "rgba(255,255,255,0.08)", color: curSel === i ? "#8fb8ff" : "#8898b8", fontFamily: "'Fredoka', sans-serif" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ paddingTop: 3, lineHeight: 1.5 }}>{opt}</span>
                </button>
              );
            })}
          </div>

          {curShown && (
            <div style={{ background: curOk ? "rgba(46,204,113,0.1)" : "rgba(231,76,60,0.1)", borderRadius: 14, padding: "14px 18px", marginBottom: 12, border: "1px solid " + (curOk ? "rgba(46,204,113,0.3)" : "rgba(231,76,60,0.3)") }}>
              <p style={{ color: curOk ? "#2ecc71" : "#e74c3c", fontSize: 16, fontFamily: "'Fredoka', sans-serif", marginBottom: 6 }}>
                {curOk ? "🌟 Correct! Great job, Space Explorer!" : "Not quite - but that's how we learn! 🚀"}
              </p>
              <p style={{ color: "#c8d4e8", fontSize: 14, lineHeight: 1.6, fontFamily: "'Nunito', sans-serif", margin: 0 }}>{curExpl}</p>
            </div>
          )}

          {!shown && !inP2 && (
            <button onClick={submit} disabled={sel === null}
              style={{ display: "block", width: "100%", padding: 14, background: sel === null ? "rgba(100,100,140,0.3)" : "linear-gradient(135deg, #4a7aff, #6c5ce7)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontFamily: "'Fredoka', sans-serif", cursor: sel === null ? "not-allowed" : "pointer", fontWeight: 600 }}>
              Check My Answer
            </button>
          )}
          {shown && !inP2 && !q.isEBSR && (
            <button onClick={next} style={{ display: "block", width: "100%", padding: 14, background: "linear-gradient(135deg, #4a7aff, #6c5ce7)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontFamily: "'Fredoka', sans-serif", cursor: "pointer", fontWeight: 600 }}>
              {ok ? "Next Question →" : "Got It - Next Question →"}
            </button>
          )}
          {shown && !inP2 && q.isEBSR && (
            <button onClick={next} style={{ display: "block", width: "100%", padding: 14, background: "linear-gradient(135deg, #4a7aff, #6c5ce7)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontFamily: "'Fredoka', sans-serif", cursor: "pointer", fontWeight: 600 }}>
              Now answer Part 2 →
            </button>
          )}
          {inP2 && !p2Shown && (
            <button onClick={submitP2} disabled={p2Sel === null}
              style={{ display: "block", width: "100%", padding: 14, background: p2Sel === null ? "rgba(100,100,140,0.3)" : "linear-gradient(135deg, #4a7aff, #6c5ce7)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontFamily: "'Fredoka', sans-serif", cursor: p2Sel === null ? "not-allowed" : "pointer", fontWeight: 600 }}>
              Check Part 2
            </button>
          )}
          {p2Shown && (
            <button onClick={next} style={{ display: "block", width: "100%", padding: 14, background: "linear-gradient(135deg, #4a7aff, #6c5ce7)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontFamily: "'Fredoka', sans-serif", cursor: "pointer", fontWeight: 600 }}>
              Next Question →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Results({ results, progress, onDone }) {
  const correct = results.filter(r => r.ok).length;
  const total = results.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const perfect = pct === 100;
  return (
    <div style={{ background: "linear-gradient(145deg, rgba(25,32,65,0.97), rgba(15,20,50,0.97))", borderRadius: 24, padding: 28, maxWidth: 500, margin: "0 auto", border: "1px solid rgba(100,140,255,0.2)", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 12 }}>{perfect ? "🌟" : pct >= 70 ? "🚀" : "💪"}</div>
      <h2 style={{ color: "#e8f0ff", fontFamily: "'Fredoka', sans-serif", fontSize: 26, marginBottom: 6 }}>
        {perfect ? "PERFECT SCORE!" : pct >= 70 ? "Great Job!" : "Keep Practicing!"}
      </h2>
      <p style={{ color: "#8fb8ff", fontFamily: "'Nunito', sans-serif", fontSize: 18, marginBottom: 20 }}>
        You got {correct} out of {total} correct! ({pct}%)
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 20 }}>
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "14px 20px" }}>
          <div style={{ color: "#ffd700", fontSize: 26, fontFamily: "'Fredoka', sans-serif" }}>{progress.streak}</div>
          <div style={{ color: "#8898b8", fontSize: 12 }}>Day Streak 🔥</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "14px 20px" }}>
          <div style={{ color: "#2ecc71", fontSize: 26, fontFamily: "'Fredoka', sans-serif" }}>{progress.totalAnswered}</div>
          <div style={{ color: "#8898b8", fontSize: 12 }}>Total Done ⭐</div>
        </div>
      </div>
      {results.some(r => !r.ok) && (
        <div style={{ textAlign: "left", marginBottom: 16 }}>
          <p style={{ color: "#ffd700", fontFamily: "'Fredoka', sans-serif", fontSize: 14, marginBottom: 8 }}>Review what you missed:</p>
          {results.filter(r => !r.ok).map((r, i) => (
            <div key={i} style={{ background: "rgba(231,76,60,0.08)", borderRadius: 10, padding: "8px 12px", marginBottom: 6, border: "1px solid rgba(231,76,60,0.15)" }}>
              <p style={{ color: "#e8d0d0", fontSize: 13, fontFamily: "'Nunito', sans-serif", margin: 0 }}>{r.qText}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={onDone} style={{ padding: "14px 36px", background: "linear-gradient(135deg, #4a7aff, #6c5ce7)", color: "#fff", border: "none", borderRadius: 12, fontSize: 17, fontFamily: "'Fredoka', sans-serif", cursor: "pointer", fontWeight: 600 }}>
        Back to Mission Control 🏠
      </button>
    </div>
  );
}

function Dashboard({ onBack }) {
  const mP = loadP("Player 1");
  const dP = loadP("Player 2");

  const Card = ({ name, p, emoji }) => {
    const eP = p.elaAnswered > 0 ? Math.round((p.elaCorrect / p.elaAnswered) * 100) : 0;
    const mPct = p.mathAnswered > 0 ? Math.round((p.mathCorrect / p.mathAnswered) * 100) : 0;
    const oP = p.totalAnswered > 0 ? Math.round((p.totalCorrect / p.totalAnswered) * 100) : 0;
    return (
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 18, padding: 22, marginBottom: 18, border: "1px solid rgba(100,140,255,0.15)" }}>
        <h3 style={{ color: "#e8f0ff", fontFamily: "'Fredoka', sans-serif", fontSize: 20, marginBottom: 14 }}>{emoji} {name}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 14 }}>
          {[{ l: "Overall", v: oP + "%", c: oP >= 70 ? "#2ecc71" : "#e67e22" }, { l: "ELA", v: eP + "%", c: eP >= 70 ? "#2ecc71" : "#e67e22" }, { l: "Math", v: mPct + "%", c: mPct >= 70 ? "#2ecc71" : "#e67e22" }, { l: "Streak", v: p.streak + "d", c: "#ffd700" }, { l: "Best Streak", v: p.bestStreak + "d", c: "#a855f7" }, { l: "Total Done", v: p.totalAnswered, c: "#8fb8ff" }].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ color: s.c, fontSize: 22, fontFamily: "'Fredoka', sans-serif", fontWeight: 700 }}>{s.v}</div>
              <div style={{ color: "#8898b8", fontSize: 11, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
        {Object.keys(p.catStats || {}).length > 0 && (
          <div>
            <p style={{ color: "#8fb8ff", fontFamily: "'Fredoka', sans-serif", fontSize: 13, marginBottom: 6 }}>By Category:</p>
            {Object.entries(p.catStats).map(([cat, st]) => {
              const pc = st.answered > 0 ? Math.round((st.correct / st.answered) * 100) : 0;
              return (
                <div key={cat} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: "#c8d4e8", fontSize: 12, minWidth: 140 }}>{cat}</span>
                  <div style={{ flex: 1, height: 7, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: pc + "%", background: pc >= 70 ? "#2ecc71" : pc >= 50 ? "#e67e22" : "#e74c3c", borderRadius: 4 }} />
                  </div>
                  <span style={{ color: "#a0a8c0", fontSize: 11, minWidth: 50, textAlign: "right" }}>{pc}% ({st.answered})</span>
                </div>
              );
            })}
          </div>
        )}
        {(p.badges || []).length > 0 && (
          <div style={{ marginTop: 12 }}>
            <p style={{ color: "#ffd700", fontFamily: "'Fredoka', sans-serif", fontSize: 13, marginBottom: 6 }}>Badges:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.badges.map((b, i) => {
                const bd = BADGES.find(x => x.name === b);
                return <span key={i} style={{ background: "rgba(255,215,0,0.1)", borderRadius: 8, padding: "5px 10px", fontSize: 12, color: "#ffd700" }}>{bd ? bd.icon : ""} {b}</span>;
              })}
            </div>
          </div>
        )}
        {p.totalAnswered === 0 && <p style={{ color: "#8898b8", fontSize: 14, textAlign: "center", marginTop: 16 }}>No practice yet. Time to launch! 🚀</p>}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 650, margin: "0 auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#e8f0ff", fontFamily: "'Fredoka', sans-serif", fontSize: 22, margin: 0 }}>📊 Parent Dashboard</h2>
        <button onClick={onBack} style={{ padding: "8px 18px", background: "rgba(255,255,255,0.08)", color: "#8fb8ff", border: "1px solid rgba(100,140,255,0.2)", borderRadius: 10, fontSize: 13, fontFamily: "'Fredoka', sans-serif", cursor: "pointer" }}>← Back</button>
      </div>
      <div style={{ background: "rgba(255,215,0,0.06)", borderRadius: 14, padding: "14px 18px", marginBottom: 18, border: "1px solid rgba(255,215,0,0.15)" }}>
        <p style={{ color: "#ffd700", fontFamily: "'Fredoka', sans-serif", fontSize: 14, marginBottom: 4 }}>📅 PSSA Test Dates</p>
        <p style={{ color: "#c8d4e8", fontSize: 13, margin: 0, lineHeight: 1.6 }}>ELA: April 22-24, 2026 &nbsp;|&nbsp; Math: April 29-30, 2026</p>
        <p style={{ color: "#a0a8c0", fontSize: 12, margin: "4px 0 0" }}>Spring break (off): March 27 - April 3</p>
      </div>
      <Card name="Player 1" p={mP} emoji="👩🏾‍🚀" />
      <Card name="Player 2" p={dP} emoji="👩🏾‍🚀" />
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 18, border: "1px solid rgba(100,140,255,0.1)" }}>
        <h4 style={{ color: "#8fb8ff", fontFamily: "'Fredoka', sans-serif", fontSize: 15, marginBottom: 10 }}>💡 Tips for Parents</h4>
        <div style={{ color: "#c8d4e8", fontFamily: "'Nunito', sans-serif", fontSize: 13, lineHeight: 1.8 }}>
          <p style={{ margin: "0 0 6px" }}>• Aim for 15-20 minutes of practice per day, 5 days a week</p>
          <p style={{ margin: "0 0 6px" }}>• Celebrate effort, not just correct answers</p>
          <p style={{ margin: "0 0 6px" }}>• If a category is below 60%, spend extra time reviewing</p>
          <p style={{ margin: "0 0 6px" }}>• The PSSA is untimed - remind them they can take their time</p>
          <p style={{ margin: 0 }}>• Practice the PA online tools trainer: wbte.drcedirect.com/PA</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("select");
  const [player, setPlayer] = useState(null);
  const [progress, setProgress] = useState(null);
  const [qs, setQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [results, setResults] = useState([]);
  const [mode, setMode] = useState(null);

  const getWeek = () => {
    const start = new Date("2026-02-16");
    const now = new Date();
    const diff = Math.floor((now - start) / 86400000);
    return Math.min(9, Math.max(1, Math.ceil((diff + 1) / 7)));
  };

  const pick = (name) => {
    setPlayer(name);
    setProgress(loadP(name));
    setScreen("home");
  };

  const buildQs = useCallback((m) => {
    const week = getWeek();
    const sch = WEEK_SCHEDULE[week] || WEEK_SCHEDULE[1];
    const done = (progress || {}).answered || [];
    const avail = (pool) => pool.filter(q => !done.includes(q.id));

    let list = [];
    if (m === "ela" || m === "mixed") {
      const rPool = avail(QUESTIONS.ela_reading).sort(() => Math.random() - 0.5);
      const cPool = avail(QUESTIONS.ela_conventions).sort(() => Math.random() - 0.5);
      const saPool = avail(QUESTIONS.ela_short_answer).sort(() => Math.random() - 0.5);
      const n = m === "mixed" ? sch.elaPerDay : sch.elaPerDay + sch.mathPerDay;
      list.push(...rPool.slice(0, Math.ceil(n * 0.6)));
      list.push(...cPool.slice(0, Math.ceil(n * 0.3)));
      if (week >= 7) list.push(...saPool.slice(0, 1));
    }
    if (m === "math" || m === "mixed") {
      const mPool = avail(QUESTIONS.math).sort(() => Math.random() - 0.5);
      const n = m === "mixed" ? sch.mathPerDay : sch.elaPerDay + sch.mathPerDay;
      list.push(...mPool.slice(0, n));
    }
    list = list.sort(() => Math.random() - 0.5);
    if (list.length === 0) {
      const all = m === "math" ? QUESTIONS.math : m === "ela" ? [...QUESTIONS.ela_reading, ...QUESTIONS.ela_conventions] : [...QUESTIONS.ela_reading, ...QUESTIONS.ela_conventions, ...QUESTIONS.math];
      list = all.sort(() => Math.random() - 0.5).slice(0, 5);
    }
    return list.slice(0, Math.max(4, Math.min(6, list.length)));
  }, [progress]);

  const start = (m) => {
    setMode(m);
    const q = buildQs(m);
    setQs(q);
    setQi(0);
    setResults([]);
    setScreen("strategy");
  };

  const handleAns = (correct) => {
    const q = qs[qi];
    const isMath = QUESTIONS.math.some(x => x.id === q.id);
    const np = { ...progress };
    np.totalAnswered += 1;
    if (correct) np.totalCorrect += 1;
    if (isMath) { np.mathAnswered += 1; if (correct) np.mathCorrect += 1; }
    else { np.elaAnswered += 1; if (correct) np.elaCorrect += 1; }
    np.answered = [...(np.answered || []), q.id];

    const cat = q.category || "Other";
    if (!np.catStats) np.catStats = {};
    if (!np.catStats[cat]) np.catStats[cat] = { correct: 0, answered: 0 };
    np.catStats[cat].answered += 1;
    if (correct) np.catStats[cat].correct += 1;

    const today = new Date().toDateString();
    if (np.lastDate !== today) {
      const yday = new Date(Date.now() - 86400000).toDateString();
      np.streak = (np.lastDate === yday || !np.lastDate) ? (np.streak || 0) + 1 : 1;
      np.lastDate = today;
      if (np.streak > (np.bestStreak || 0)) np.bestStreak = np.streak;
    }

    if (!np.badges) np.badges = [];
    const earn = (n) => { if (!np.badges.includes(n)) np.badges.push(n); };
    if (np.totalAnswered >= 1) earn("First Launch");
    if (np.streak >= 3) earn("Streak Explorer");
    if (np.streak >= 5) earn("Constellation Maker");
    if (np.streak >= 7) earn("Moon Walker");
    if (np.elaAnswered >= 10) earn("Reading Rocket");
    if (np.mathAnswered >= 10) earn("Math Meteor");
    if (np.totalAnswered >= 50) earn("Star Captain");
    if (np.totalAnswered >= 100) earn("Mission Commander");

    const nr = [...results, { ok: correct, qText: (q.question || "").substring(0, 80) }];

    if (qi + 1 >= qs.length) {
      if (nr.every(r => r.ok)) earn("Super Nova");
      const last5 = nr.slice(-5);
      if (last5.length >= 5 && last5.every(r => r.ok)) earn("Galaxy Brain");
    }

    setResults(nr);
    setProgress(np);
    saveP(player, np);

    if (qi + 1 >= qs.length) {
      setScreen("results");
    } else {
      setQi(qi + 1);
    }
  };

  const week = getWeek();
  const sch = WEEK_SCHEDULE[week] || WEEK_SCHEDULE[1];
  const curQ = qs[qi];
  const passage = curQ && curQ.passageId ? READING_PASSAGES.find(p => p.id === curQ.passageId) : null;

  const btnBase = { border: "none", borderRadius: 12, fontFamily: "'Fredoka', sans-serif", cursor: "pointer", fontWeight: 600, transition: "all 0.2s" };

  return (
    <>
      <Stars />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        button:hover { filter: brightness(1.08); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(100,140,255,0.3); border-radius: 3px; }
        textarea:focus { border-color: #4a7aff !important; }
      `}</style>
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", padding: "20px 16px", fontFamily: "'Nunito', sans-serif" }}>

        {screen === "select" && (
          <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center", paddingTop: "10vh" }}>
            <div style={{ fontSize: 72, marginBottom: 12 }}>🚀</div>
            <h1 style={{ color: "#e8f0ff", fontFamily: "'Fredoka', sans-serif", fontSize: 30, marginBottom: 4 }}>PSSA Space Mission</h1>
            <p style={{ color: "#8fb8ff", fontSize: 16, marginBottom: 36 }}>Choose your astronaut to begin!</p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              {[{ n: "Player 1", e: "👩🏾‍🚀", c: "#4a7aff" }, { n: "Player 2", e: "👩🏾‍🚀", c: "#a855f7" }].map(pl => {
                const pr = loadP(pl.n);
                return (
                  <button key={pl.n} onClick={() => pick(pl.n)}
                    style={{ background: "linear-gradient(145deg, rgba(25,32,65,0.95), rgba(15,20,50,0.95))", border: "2px solid " + pl.c + "50", borderRadius: 24, padding: "28px 32px", cursor: "pointer", minWidth: 170, boxShadow: "0 0 30px " + pl.c + "20" }}>
                    <div style={{ fontSize: 52, marginBottom: 10 }}>{pl.e}</div>
                    <div style={{ color: "#e8f0ff", fontFamily: "'Fredoka', sans-serif", fontSize: 21, marginBottom: 4 }}>{pl.n}</div>
                    <div style={{ color: "#8898b8", fontSize: 13 }}>{pr.totalAnswered > 0 ? pr.totalAnswered + " questions done" : "Ready to launch!"}</div>
                    {pr.streak > 0 && <div style={{ color: "#ffd700", fontSize: 13, marginTop: 4 }}>🔥 {pr.streak} day streak</div>}
                  </button>
                );
              })}
            </div>
            <button onClick={() => setScreen("dashboard")} style={{ marginTop: 36, padding: "10px 24px", background: "rgba(255,255,255,0.06)", color: "#8898b8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 14, fontFamily: "'Fredoka', sans-serif", cursor: "pointer" }}>
              📊 Parent Dashboard
            </button>
          </div>
        )}

        {screen === "dashboard" && <Dashboard onBack={() => { setScreen("select"); setPlayer(null); }} />}

        {screen === "home" && player && (
          <div style={{ maxWidth: 540, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <button onClick={() => { setPlayer(null); setScreen("select"); }} style={{ padding: "7px 14px", background: "rgba(255,255,255,0.06)", color: "#8898b8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>← Switch</button>
              <button onClick={() => setScreen("dashboard")} style={{ padding: "7px 14px", background: "rgba(255,255,255,0.06)", color: "#8898b8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>📊 Dashboard</button>
            </div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 6 }}>{player === "Player 1" ? "👩🏾‍🚀" : "👩🏾‍🚀"}</div>
              <h2 style={{ color: "#e8f0ff", fontFamily: "'Fredoka', sans-serif", fontSize: 24, marginBottom: 2 }}>Welcome, {player}!</h2>
              <p style={{ color: "#8fb8ff", fontSize: 14 }}>Week {week}: {sch.focus}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
              {[{ l: "Streak", v: (progress || {}).streak + "🔥", c: "#ffd700" }, { l: "Total", v: (progress || {}).totalAnswered, c: "#8fb8ff" }, { l: "Accuracy", v: (progress || {}).totalAnswered > 0 ? Math.round(((progress || {}).totalCorrect / (progress || {}).totalAnswered) * 100) + "%" : "—", c: "#2ecc71" }].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "10px 18px", textAlign: "center", minWidth: 85 }}>
                  <div style={{ color: s.c, fontSize: 20, fontFamily: "'Fredoka', sans-serif", fontWeight: 700 }}>{s.v}</div>
                  <div style={{ color: "#8898b8", fontSize: 11, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(255,215,0,0.06)", borderRadius: 14, padding: "12px 16px", marginBottom: 20, border: "1px solid rgba(255,215,0,0.12)" }}>
              <p style={{ color: "#ffd700", fontFamily: "'Fredoka', sans-serif", fontSize: 14, marginBottom: 2 }}>🎯 This Week's Mission</p>
              <p style={{ color: "#c8d4e8", fontSize: 14, margin: 0 }}>{sch.description}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[{ m: "mixed", l: "🚀 Daily Practice (Mixed)", d: sch.elaPerDay + " ELA + " + sch.mathPerDay + " Math questions", c: "#4a7aff" },
                { m: "ela", l: "📚 ELA Practice", d: "Reading, comprehension & grammar", c: "#2ecc71" },
                { m: "math", l: "🔢 Math Practice", d: "Numbers, fractions, geometry & more", c: "#a855f7" }
              ].map(({ m, l, d, c }) => (
                <button key={m} onClick={() => start(m)}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", background: "linear-gradient(145deg, rgba(25,32,65,0.95), rgba(15,20,50,0.95))", border: "1px solid " + c + "30", borderRadius: 16, cursor: "pointer", textAlign: "left" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#e8f0ff", fontFamily: "'Fredoka', sans-serif", fontSize: 16, marginBottom: 2 }}>{l}</div>
                    <div style={{ color: "#8898b8", fontSize: 13 }}>{d}</div>
                  </div>
                  <div style={{ color: c, fontSize: 20 }}>→</div>
                </button>
              ))}
            </div>
            {(progress || {}).badges && progress.badges.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <p style={{ color: "#ffd700", fontFamily: "'Fredoka', sans-serif", fontSize: 14, marginBottom: 8 }}>🏅 Your Badges</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {progress.badges.map((b, i) => {
                    const bd = BADGES.find(x => x.name === b);
                    return <div key={i} style={{ background: "rgba(255,215,0,0.08)", borderRadius: 10, padding: "6px 12px", border: "1px solid rgba(255,215,0,0.15)" }}>
                      <span style={{ fontSize: 16, marginRight: 4 }}>{bd ? bd.icon : ""}</span>
                      <span style={{ color: "#ffd700", fontSize: 12, fontFamily: "'Fredoka', sans-serif" }}>{b}</span>
                    </div>;
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {screen === "strategy" && (
          <div style={{ paddingTop: "5vh" }}>
            <StrategyTip type={mode === "math" ? "math" : "ela"} onGo={() => setScreen("practice")} />
          </div>
        )}

        {screen === "practice" && curQ && (
          <div style={{ paddingTop: 10 }}>
            <Question key={curQ.id + "-" + qi} q={curQ} passage={passage} onAnswer={handleAns} num={qi + 1} total={qs.length} />
          </div>
        )}

        {screen === "results" && (
          <div style={{ paddingTop: "5vh" }}>
            <Results results={results} progress={progress} onDone={() => setScreen("home")} />
          </div>
        )}
      </div>
    </>
  );
}
