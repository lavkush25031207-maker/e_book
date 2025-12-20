$(document).ready(function () {
  $('.btn_answer').attr('disabled', true)
  let audioIsPlayed = false
  $('body').append(`
        <div class="welldone" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000;">
          <img src="./assets/images/welldone.gif" alt="Well done!">
        </div>
        <div class="tryagain" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000;">
          <img src="./assets/images/tryagain.png" alt="Try Again!" style="width: 300px;">
        </div>
    `)

  const titleBox = $('<div class="titlebox"><h2><span></span></h2></div>')
  $('.subheading').before(titleBox) // Insert titlebox before subheading

  // Set the content of the titlebox
  $('.titlebox h2 span').text(DB.TITLE)

  // Ensure subheading is defined
  const subheading = DB.SUBHEADING || '' // Default to an empty string if SUBHEADING is undefined
  $('.subheading p').html(subheading)

  $('.totalmarks').text(DB.TOTSCORE)
  $('.narratorbox').css('opacity', '0')

  const narratorImages = DB.NARRATOR
  const correctAudioFiles = DB.CORRECT
  const wrongAudioFiles = DB.WRONG
  const conclusionAudioFile = DB.CONCLUSION.audio
  const conclusionText = DB.CONCLUSION.text

  let audio = null
  let correctAnswersCount = 0

  const frame = $('.frame')
  const questionSelections = {} // To track if each question has at least one selected option

  // Disable the submit button initially
  $('.btn_submit').prop('disabled', true)

  function updateSubmitButtonState () {
    const allAnswered =
      Object.keys(questionSelections).length === DB.ALLQUESTIONS.length &&
      Object.values(questionSelections).every(val => val)
    $('.btn_submit').prop('disabled', !allAnswered) // Enable only if all questions are answered
  }

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

  function displayConclusion () {
    var Conclusion = new Audio(conclusionAudioFile)
    Conclusion.play()
    $('.narratorbox img').attr('src', './assets/images/' + narratorImages[1])
    $('.chattext').text(conclusionText) // Set the conclusion text here
    $('.chattext').css('opacity', '1')
    // Show scorebox
  }

  function displayAllQuestions () {
    frame.empty() // Clear the frame

    const ul = $('<ul>').addClass('q_list') // Create a single global list container
    frame.append(ul) // Append the global list container to the frame

    DB.ALLQUESTIONS.forEach((questionObj, index) => {
      const questionNumber = index + 1 // Question number
      const questionFontStyle = {
        'font-family': questionObj.font,
        'font-size': questionObj.fontSize
      }

      // Create question heading with a span for the question text
      const questionHeading = $('<li>').addClass('question-heading')
      const questionSpan = $('<span>')
        .html(`${questionNumber}. ${questionObj.heading}`)
        .css(questionFontStyle)
      questionHeading.append(questionSpan)
      ul.append(questionHeading)

      // Add options as children of the question heading
      questionObj.options.forEach((option, optIndex) => {
        const input = $('<input>').attr({
          type: 'checkbox', // Using checkbox but ensuring radio behavior
          name: `question${index}`, // Unique name per question for grouping
          value: optIndex
        })

        // Sequence labels: a, b, c, d
        const sequenceLabel = String.fromCharCode(97 + optIndex) // 97 is the ASCII code for 'a'

        // Track user selections and enable/disable global submit button
        input.on('change', function () {
          // Ensure only one sibling is selected
          $(this)
            .closest('.question-heading')
            .find('input[name="question' + index + '"]')
            .not(this)
            .prop('checked', false)

          // Mark the current question as answered if at least one input is selected
          questionSelections[index] = !!$(
            `input[name="question${index}"]:checked`
          ).length
          updateSubmitButtonState() // Check and update submit button state
        })

        const optionDiv = $('<div>').addClass('option-item') // Create a div for the option

        // Create span for sequence label
        const labelSpan = $('<span>')
          .addClass('option-label')
          .text(sequenceLabel + '. ') // Add the label with a period
          .css({
            'margin-right': '5px' // Add spacing
          })

        const optionSpan = $('<span>') // Style for options text
          .html(option)
          .css({
            'font-family': questionObj.font,
            'font-size': `${parseInt(questionObj.fontSize) - 3}px`
          })

        // Append label span, option text, and input to the option div
        optionDiv.append(labelSpan).append(optionSpan).append(input)
        questionHeading.append(optionDiv) // Append option div to the question heading
      })
    })
  }

  function handleGlobalSubmit () {
    score = 0 // Reset score for each submission
    correctAnswersCount = 0 // Reset correct answers count

    // Calculate total marks dynamically based on the number of questions
    const totalQuestions = $('li.question-heading').length
    const totalMarks = totalQuestions // Assuming each question carries 1 mark

    DB.ALLQUESTIONS.forEach((questionObj, index) => {
      const selectedValues = $(`input[name="question${index}"]:checked`)
        .map(function () {
          return parseInt($(this).val(), 10)
        })
        .get()

      const correctAnswer = questionObj.ans
      const isCorrect =
        correctAnswer.every(val => selectedValues.includes(val)) &&
        correctAnswer.length === selectedValues.length

      if (isCorrect) {
        // Increment score by 1 for each correct answer
        score++
        correctAnswersCount++

        // Show tick mark for correct answers
        $(`input[name="question${index}"]:checked`).each(function () {
          const parentOption = $(this).closest('.option-item')
          parentOption.prepend('<div class="tickimage">&#10003;</div>')
        })
      } else {
        // Show cross mark for incorrectly selected answers
        $(`input[name="question${index}"]:checked`).each(function () {
          const parentOption = $(this).closest('.option-item')
          parentOption.prepend('<div class="crossimage">&#10060;</div>')
        })

        // Delay showing correct answers until "Show Answer" button is clicked
        $(`input[name="question${index}"]`).data(
          'correct-answers',
          correctAnswer
        )
      }

      // Disable inputs after submission
      $(`input[name="question${index}"]`).attr('disabled', true)
    })
    $('.score').css('opacity', '1')
    $('.score').css('z-index', '9999')
    // Update the score display dynamically
    $('#mtf-user-score').text(`${score}`)
    $('#mtf-total-marks').text(`${totalMarks}`)

    // Disable the global submit button after submission
    $('.btn_submit').attr('disabled', true)

    // Show result or feedback
    if (correctAnswersCount === totalQuestions) {
      $('.welldone').css('display', 'flex')
      const randomIndex = Math.floor(Math.random() * correctAudioFiles.length)
      playAudio(correctAudioFiles[randomIndex], displayConclusion)
    } else {
      $('.tryagain').css('display', 'flex')
      const randomIndex = Math.floor(Math.random() * wrongAudioFiles.length)
      playAudio(wrongAudioFiles[randomIndex], displayConclusion)
      $('.btn_answer').attr('disabled', false)
    }
  }

  // Attach event listener for "Show Answer" button
  $('.btn_answer').on('click', function () {
    $('.score').css('opacity', '0')
    DB.ALLQUESTIONS.forEach((questionObj, index) => {
      const correctAnswers = questionObj.ans // Retrieve correct answers for this question

      if (correctAnswers) {
        // Remove any existing cross images
        $(`input[name="question${index}"]`)
          .closest('.option-item')
          .find('.crossimage')
          .remove()

        // Deselect all selected inputs
        $(`input[name="question${index}"]`).prop('checked', false)

        // Highlight correct answers with tick marks and select them
        correctAnswers.forEach(correctValue => {
          const correctInput = $(
            `input[name="question${index}"][value="${correctValue}"]`
          )
          correctInput.prop('checked', true) // Select the correct input box
          correctInput
            .closest('.option-item')
            .prepend('<div class="tickimage">&#10003;</div>')
        })
      }
    })
    $('.btn_answer').attr('disabled', true)
    // Hide the "Show Answer" button after use
    // $(this).css('display', 'none');
    $('.tryagain').css('display', 'none')
  })

  displayAllQuestions()

  // Attach global submit button click handler
  $('.btn_submit').on('click', handleGlobalSubmit)

  $('.btn_reset').on('click', function () {
    window.location.reload(true) // Restart the quiz
  })

  $('.btn').on('click', function () {
    $('.playbtnbox').css('display', 'none')
  })
})
