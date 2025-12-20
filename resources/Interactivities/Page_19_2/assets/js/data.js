const DB = {
  TESTING: 'false',
  QUESTIONSCREEN: 1,
  NO: 5,
  TITLE: '',
  SUBHEADING: 'Fill in the blanks with pronouns.',

  ALLQUESTIONS: [
    {
      options: [`The boy felt extremely homesick and ______________ wanted to go home.`],
      ans: ['he']
    },
    {
      options: [`When ______________ saw his sister undergo surgery, ______________ decided to fake an illness.`],
      ans: ['he','he']
    },
    {
      options: [`The Matron didn’t believe ______________ at first.`],
      ans: ['him']
    },
    {
      options: [`After a thorough check-up, the doctor realised that ______________ was pretending to be sick.`],
      ans: ['he']
    },
    {
      options: [`After getting caught, the boy learned an important lesson and promised to keep this learning with ______________ for the rest of his life.`],
      ans: ['him']
    },
  ],
  ONLOADAUDIO: './assets/audio/sfx.mp3',
  CORRECT: [
    { audio: './assets/audio/Feedback/Correct1.mp3', text: '' }
  ],
  WRONG: [
    { audio: './assets/audio/Feedback/Wrong1.mp3', text: '' }
  ],
  CONCLUSION: {
    audio: '',
    text: ''
  },
  NARRATOR: [
    'animAppear.gif',
    'static.png',
    'speaking.gif',
    'thinking.gif',
    'right.gif',
    'wrong.gif',
    'animDisappear.gif'
  ],

  SCORE: 40,
  TOTSCORE: 200
}
