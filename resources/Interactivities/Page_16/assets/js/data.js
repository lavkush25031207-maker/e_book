const DB = {
  TESTING:'false',
  QUESTIONSCREEN: 1,
  NO: 5,
  TITLE: "",

  SUBHEADING: 'Tick ( <span>&#10003;</span>) the correct options.',
 ALLQUESTIONS: [
    {
      heading: `Roald Dahl’s sister was ___________ years old.`, 
      options: [
        `nine`,
        `twelve`,
        `eighteen`,
        `twenty-one`
      ],
      ans: [1]
    },
    {
      heading: `Roald Dahl had seen his ___________ suffer from an attack of appendicitis.`, 
      options: [
        `mother`,
        `Nanny`,
        `sister`,
        `friend`
      ],
      ans: [2]
    },
    {
      heading: `Nanny said appendicitis was caused by ___________.`, 
      options: [
        `God’s mysterious ways`,
        `swallowing toothbrush bristles`,
        `using German toothbrushes`,
        `using old toothbrushes`
      ],
      ans: [1]
    },
    {
      heading: `Then I slipped in the clincher. The clincher was that ___________ .`, 
      options: [
        `he had a pain in the right-hand side of the stomach`,
        `he had been sick all morning`,
        `he was unable to walk properly`,
        `he had not eaten anything for a week`
      ],
      ans: [1]
    },
    {
      heading: `Dr Dunbar could see through the trick as ___________.`, 
      options: [
        `Roald Dahl’s stomach was soft and perfectly normal`,
        `he knew Roald Dahl well and could make out he was faking`,
        `Roald Dahl’s stomach was hard and rigid`,
        `he had operated on Roald Dahl’s sister`
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
