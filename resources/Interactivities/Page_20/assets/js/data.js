const DB = {
  TESTING:'false',
  QUESTIONSCREEN: 1,
  NO: 5,
  TITLE: "",

  SUBHEADING: 'You will listen to a passage about Gopal Krishna Gokhale, an eminent writer and freedom fighter. As you listen to your teacher, complete these sentences.',
 ALLQUESTIONS: [
    {
      heading: `The teachers asked the boys to ___________ for homework.`, 
      options: [
        `write an essay`,
        `learn a speech`
      ],
      ans: [0]
    },
    {
      heading: `Gopal knew the answers to ___________ .`, 
      options: [
        `all the questions`,
        `nine questions`
      ],
      ans: [1]
    },
    {
      heading: `Gopal went to ___________ for help.  `, 
      options: [
        `his teacher`,
        `a senior`
      ],
      ans: [1]
    },
    {
      heading: `The teacher was happy with Gopal because he had ___________ .`, 
      options: [
        `all answers correct`,
        `not asked anyone for help `
      ],
      ans: [0]
    },
    {
      heading: `The teacher gave the prize to Gopal for his ___________.`, 
      options: [
        `honesty`,
        `pride`
      ],
      ans: [0]
    }
   
    
  ],
  ONLOADAUDIO: './assets/audio/sfx.mp3',
  CORRECT: [
    { audio: './assets/audio/Feedback/Correct1.mp3', text: 'oÉWÒûiÉ AcNåû!' }
    
  ],
  WRONG: [
    { audio: './assets/audio/Feedback/Wrong1.mp3', text: 'aÉsÉiÉ!' }
   
  ],
  CONCLUSION: {
    audio: '',
    text: ''
  },
  NARRATOR: [
    'animAppear.gif',
    'Talking.gif',
    'Thinking.gif',
    'Right.gif',
    'Wrong.gif',
    'animDisappear.gif',
    'static.png'
  ],
  RADIOBTN: 'true',
  CHECKBOX: 'false',
  SCORE: 40,
  TOTSCORE: 200
}
