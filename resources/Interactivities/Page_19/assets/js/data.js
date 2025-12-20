const DB = {
  TESTING: 'false',
  QUESTIONSCREEN: 1,
  NO: 5,
  TITLE: '',
  SUBHEADING: 'Fill in the blanks with the different types of nouns.',

  ALLQUESTIONS: [
    {
      options: [`The  ______________ slept peacefully on the windowsill.`],
      ans: ['cat']
    },
    {
      options: [`We visited ______________ and saw many famous landmarks.`],
      ans: ['Paris']
    },
    {
      options: [`The ______________ flew over the lake at sunset.`],
      ans: ['bird']
    },
    {
      options: [`She found an old ______________ in the attic filled with treasures.`],
      ans: ['chest']
    },
    {
      options: [`It takes a lot of ______________ to stand up for what is right.`],
      ans: ['courage']
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
