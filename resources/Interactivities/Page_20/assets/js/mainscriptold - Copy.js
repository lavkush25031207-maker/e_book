$(document).ready(function () {
  let audioIsPlayed = false
  $('body').append(`
        <div class="welldone" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000;">
          <img src="./assets/images/welldone.gif" alt="Well done!" style="width: 300px;">
        </div>
        <div class="tryagain" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000;">
          <img src="./assets/images/tryagain.png" alt="Try Again!" style="width: 300px;">
        </div>
    `)

  const title = DB.TITLE
  const subheading = DB.SUBHEADING
  let button = true
  let next = false
  let submitClicked = false
  $('.btn_submit').attr('disabled', 'true')
  $('.totalmarks').text(DB.TOTSCORE)
  $('.narratorbox').css('opacity', '0')

  let score = 0 // Initialize score to 0
  const totalQuestions = DB.ALLQUESTIONS.length // Total number of questions
  const changeBtnText = ['Submit', 'Next']
  const narratorImages = DB.NARRATOR
  const correctAudioFiles = DB.CORRECT
  const wrongAudioFiles = DB.WRONG
  const conclusionAudioFile = DB.CONCLUSION.audio
  const conclusionText = DB.CONCLUSION.text

  let audio = null // Variable to track the currently playing audio
  let correctAnswersCount = 0 // Track the number of correct answers
  let askedQuestions = [] // Keep track of asked questions

  function playAudio (audioFile, callback) {
    if (audio) {
      audio.onended = null // Remove the previous onended event
      audio.pause() // Pause the current audio
    }
    audio = new Audio(audioFile.audio)
    audio.play()
    audio.onplay = function () {
      $('.chatbox').css('opacity', '1') // Make sure chatbox is visible
    }
    audio.onended = callback // Set the callback for when the audio ends
  }

  $('.btn').on('click', function () {
    $('.playbtnbox').css('display', 'none')
  })

  const titleBox = $('<div class="titlebox"><h2><span></span></h2></div>')
  $('.subheading').before(titleBox) // Insert titlebox before subheading

  // Set the content of the titlebox
  $('.titlebox h2 span').text(DB.TITLE)
  $('.subheading p').html(subheading)

  const frame = $('.frame')

  function showButtons (topBtnsDiv, randomIndex) {
    $(topBtnsDiv).empty()

    if (button) {
      if (!next) {
        $('.btn_submit').text(changeBtnText[0])

        $('.btn_submit')
          .off('click')
          .on('click', function () {
            $('.btn_submit').css('opacity', '0')
            $('.btn_submit').attr('disabled', true)
            submitClicked = true

            let selectedValues = $('input[type="checkbox"]:checked')
              .map(function () {
                return parseInt($(this).val(), 10)
              })
              .get()

            if (selectedValues.length > 0) {
              $('input[type="checkbox"]').attr('disabled', true)
              const currentQuestion = DB.ALLQUESTIONS[randomIndex]
              const correctAnswer = currentQuestion.ans

              const isCorrect =
                correctAnswer.every(val => selectedValues.includes(val)) &&
                correctAnswer.length === selectedValues.length

              if (isCorrect) {
                correctAnswersCount++ // Increment the correct answers count
                $('input[type="checkbox"]:checked').each(function () {
                  const parentLi = $(this).closest('li')
                  parentLi.prepend('<div class="tickimage">&#10003;</div>')
                  $('.tickimage').css('opacity', '1')
                })
              } else {
                $('input[type="checkbox"]:checked').each(function () {
                  const parentLi = $(this).closest('li')
                  parentLi.prepend('<div class="crossimage">&#10060;</div>')
                  $('.crossimage').css('opacity', '1')
                  $(`input[type="checkbox"][value="${correctAnswer[0]}"]`)
                    .closest('li')
                    .prepend('<div class="tickimage">&#10003;</div>')
                  $('.tickimage').css('opacity', '1')
                })
              }

              const playNextAudio = function () {
                if (askedQuestions.length === totalQuestions) {
                  audioIsPlayed = true // Prevent further feedback audio
                  $('.btn_reset').css('opacity', '1')

                  // Display final score
                  $('#mtf-user-score').html(correctAnswersCount)
                  $('#mtf-total-marks').html(totalQuestions)
                  $('.score').css('opacity', '1') // Display user score
                  $('.scorebox').css('opacity', '1')

                  // All questions have been asked
                  if (correctAnswersCount === totalQuestions) {
                    $('.welldone').css('display', 'flex')
                    // All answers were correct
                    const randomIndex = Math.floor(
                      Math.random() * correctAudioFiles.length
                    )
                    playAudio(correctAudioFiles[randomIndex], displayConclusion)
                  } else {
                    $('.tryagain').css('display', 'flex')
                    // Not all answers were correct
                    const randomIndex = Math.floor(
                      Math.random() * wrongAudioFiles.length
                    )
                    playAudio(wrongAudioFiles[randomIndex], displayConclusion)
                  }
                } else {
                  if (!audioIsPlayed) {
                    // Play feedback audio for the current question
                    const feedbackAudio = isCorrect
                      ? './assets/audio/Feedback/pos1.mp3'
                      : './assets/audio/Feedback/neg1.mp3'
                    const feedback = new Audio(feedbackAudio)
                    feedback.play()
                  }
                  showNextButton()
                }
              }

              // Call playNextAudio here after evaluating the answer
              playNextAudio()
            }
          })
      }
    }
  }

  function showNextButton () {
    $('.btn_next').css({
      opacity: '1', // Fade in Next button
      'pointer-events': 'auto' // Enable Next button
    })
    $('.btn_next').text(changeBtnText[1])

    $('.btn_next')
      .off('click')
      .on('click', function () {
        $('.btn_submit').attr('disabled', 'true')
        next = false
        randomIndex++;
        displayRandomQuestion()
        $('.narratorbox img').attr(
          'src',
          './assets/images/' + narratorImages[6]
        )
        $('.tickimage').css('opacity', '0')
        $('.crossimage').css('opacity', '0')
        $('.btn_submit').css({
          opacity: '1', // Fade in Submit button
          'pointer-events': 'auto' // Enable Submit button
        })
        $('.btn_next').css({
          opacity: '0', // Fade out Next button
          'pointer-events': 'none' // Disable Next button
        })
      })
  }
  let currentQuestionNumber = 1 // Initialize the question number
  let randomIndex = 0
  function displayRandomQuestion () {
    frame.empty()
   
    
    

    askedQuestions.push(randomIndex)

    const questionObj = DB.ALLQUESTIONS[randomIndex]
    const questionFontSize = parseInt(questionObj.fontSize) - 3 // Calculate adjusted font size for options
    const questionFontStyle = {
      'font-family': questionObj.font,
      'font-size': questionObj.fontSize
    }

    // Prepend the question number to the question text
    $('.question')
      .html(`${currentQuestionNumber}. ${questionObj.heading}`)
      .css(questionFontStyle)

    const ul = $('<ul>').addClass('q_list')

    const optionsList = questionObj.options.map(function (option, optIndex) {
      const inputType = 'checkbox'
      const input = $('<input>').attr({
        type: inputType,
        name: `question${randomIndex}`,
        value: optIndex
      })

      input.on('change', function () {
        $('input[type="checkbox"]').not(this).prop('checked', false) // Deselect other checkboxes
        $('.btn_submit').removeAttr('disabled') // Enable submit button
      })

      const li = $('<li>')
      const optionSpan = $('<span>')
        .html(option)
        .css({
          'font-family': questionObj.font,
          'font-size': questionFontSize + 'px' // Apply adjusted font size to each option span
        })

      li.append(optionSpan).append(input)
      return li
    })

    ul.append(optionsList)

    // // Apply custom styles if the question index is 0
    // if (randomIndex === 0) {
    //   ul.css({
    //     width: '50%'
    //   })
    //   ul.find('li').css({
    //     width: '100%',
    //     left: '70%'
    //   })
    // }

    const topBtnsDiv = $('<div>').addClass('top_btns')
    frame.append(ul)
    showButtons(topBtnsDiv, randomIndex)

    

    currentQuestionNumber++ // Increment the question number for the next question
  }

  function displayConclusion () {
    var Conclusion = new Audio(conclusionAudioFile)
    Conclusion.play()
    $('.narratorbox img').attr('src', './assets/images/' + narratorImages[1])
    $('.chattext').text(conclusionText) // Set the conclusion text here
    $('.chattext').css('opacity', '1')
    // Show scorebox
  }

  if (DB.TESTING === 'false') {
    const overlay = $('<div>')
      .css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        zIndex: 9999,
        pointerEvents: 'none' // Initially disable pointer events
      })
      .appendTo('body')

    $('.btn').on('click', function () {
      const onloadAudioSrc = DB.ONLOADAUDIO // Path to the onload audio from DB
      const onloadAudioElement = new Audio(onloadAudioSrc)

      overlay.css('pointer-events', 'auto')

      onloadAudioElement.play()
      $('.playbtnbox').css('opacity', '0')

      onloadAudioElement.onended = function () {
        overlay.css('pointer-events', 'none')
        setTimeout(() => {
          $('.narratorbox').css('opacity', '1')

          $('.narratorbox img').attr(
            'src',
            './assets/images/' + narratorImages[6]
          )
        }, 400)
        $('.narratorbox').css('opacity', '1')
        $('.narratorbox img').attr(
          'src',
          './assets/images/' + narratorImages[0]
        )
      }
    })
  } else {
    $('.btn').on('click', function () {
      $('.playbtnbox').css('opacity', '0')
    })
  }

  displayRandomQuestion()

  const initialNarratorImg = $('<img>').attr({
    src: './assets/images/' + narratorImages[6],
    alt: 'Narrator'
  })
  $('.narratorbox').append(initialNarratorImg)
  $('.scorebox').css('opacity', '0')
  $('.chatbox').css('opacity', '0')

  $('.btn_reset').on('click', function () {
    window.location.reload('true') // Hide chatbox on restart
  })
})
