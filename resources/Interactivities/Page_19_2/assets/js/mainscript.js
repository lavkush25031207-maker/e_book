  let id = 0
  let correctDrops = 0

  $(document).ready(function () {

    $('body').append(`
      <div class="welldone" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000;">
        <img src="./assets/images/welldone.gif" alt="Well done!" style="width: 300px;">
      </div>
      <div class="tryagain" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000;">
        <img src="./assets/images/tryagain.png" alt="Try Again!" style="width: 300px;">
      </div>
    `);

    let title = DB.TITLE
    let subTitle = DB.SUBHEADING

    $('.btn_submit').prop('disabled', true)
    $('.btn_answer').prop('disabled', true)

    $('.note').html(title)
    $('.subtext').html(subTitle)

    let audio

    function playAudio (audioFile, callback) {
      if (audio) {
        audio.onended = null
        audio.pause()
      }
      audio = new Audio(audioFile)
      audio.play()
      audio.onended = callback
      console.log('Playing audio: ' + audioFile)
    }

    function setNarratorImage (imageSrc, altText = '') {
      $('.narrator img').attr('src', './assets/images/' + imageSrc)
      if (altText) {
        $('.narrator img').attr('alt', altText)
      }
    }

    $('.btn').on('click', function () {
      $('.playbtnbox').css('display', 'none')

      const onloadAudioSrc = DB.ONLOADAUDIO

      // Play onload audio and set the narrator image during playback
      playAudio(onloadAudioSrc, function () {
        // Audio ended callback
        setNarratorImage(DB.NARRATOR[1]) // Final image after audio ends
      })

      // Set the initial narrator images with timing adjustments
      setNarratorImage(DB.NARRATOR[0]) // Initial image
      setTimeout(() => {
        setNarratorImage(DB.NARRATOR[2])
        $('.narratorbox').css('opacity', '1')
      }, 1000)

      // Set narrator image to DB.NARRATOR[2] while the audio is playing
      setTimeout(() => {
        // Ensure audio is still playing before changing the image
        if (!audio.paused) {
          setNarratorImage(DB.NARRATOR[2])
        }
      }, 800)
    })

    function checkIfAllDropped () {
      if ($('.dragclassbox .item').length === 0) {
        $('.btn_submit').prop('disabled', false)
      }
    }

    let totalScore = 0 // Add total score variable

    $('.btn_submit').on('click', function () {
      $('.btn_submit').prop('disabled', true)
      $('.tickclass, .wrongclass').css('opacity', '1')
      $('.score').css('opacity', '1')
      let allCorrect = true
      let score = 0 // Initialize the score for this attempt

      $('.dropbox-1').each(function () {
        const dropbox = $(this)
        const droppedItem = dropbox.find('.item')
        let isCorrect = dropbox.find('.tickclass').length > 0

        if (droppedItem.length === 0 || !isCorrect) {
          allCorrect = false
        } else {
          score++ // Increment score for each correct drop
        }
      })

      totalScore += score // Update total score

      // Display the score
      console.log('Score for this attempt: ' + score)
      console.log('Total Score: ' + totalScore)
      $('#mtf-user-score').html(totalScore)
      let total = $('.dropbox-1').length;
      $('#mtf-total-marks').html(total)
      // Display score in a score-box element

      if (allCorrect) {
        playCorrectFeedback()
        $('.welldone').css('display','flex');
      } else {
        $('.tryagain').css('display','flex');
        // If not all drops are correct, enable the answer button
        $('.btn_answer').prop('disabled', false)
        // Disable the submit button to prevent re-submitting
        $('.btn_submit').prop('disabled', true)

        let number = Math.floor(Math.random() * DB.WRONG.length)
        let wrongAudio = DB.WRONG[number].audio
        playAudio(wrongAudio, function () {
          playConclusionAudio()
        })
        console.log('Wrong audio: ' + wrongAudio)
        $('.chatbox').css('opacity', '1')
        $('.chattext').html(DB.WRONG[number].text)
        setTimeout(() => {
          setNarratorImage(DB.NARRATOR[1])
          $('.chatbox').css('opacity', '0')
        }, 1500)
        setNarratorImage(DB.NARRATOR[5])
      }
    })

    $('.btn_answer').on('click', function () {
      $('.tryagain').css('display','none');
      $('.btn_answer').prop('disabled', true)
      $('.dropbox-1').each(function () {
        const droptarget = $(this)
        let questionId = Number(droptarget.attr('data-question-id'))
        let answerIndex = droptarget.data('answer-index')
        let correctAnswer =
          DB.ALLQUESTIONS[questionId - 1].ans[answerIndex].trim()

        // If the droptarget already has a child, replace the content with the correct answer
        if (droptarget.children().length > 0) {
          droptarget.children().first().text(correctAnswer)
        } else {
          // Otherwise, just add the correct answer directly
          droptarget.html(
            '<span class="correct-answer">' + correctAnswer + '</span>'
          )
        }
      })

      // Set opacity of tickclass and wrongclass to 0
      $('.tickclass, .wrongclass').css('opacity', '0')
    })

    $('.btn_reset').on('click', function () {
      location.reload()
    })

    // Shuffle an array using the Fisher-Yates algorithm
    function shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }

    // Extract the answers (draggables) from ALLQUESTIONS
    let draggables = DB.ALLQUESTIONS.flatMap(question => question.ans)

    // Shuffle the draggables array to randomize the order
    let randomizedDraggables = shuffleArray([...draggables])

    // Clear existing content in .dragclassbox
    $('.dragclassbox').empty()

    // Append items to .dragclassbox with IDs in sequence but in randomized order
    randomizedDraggables.forEach(function (item, index) {
      $('.dragclassbox').append(
        '<span id="drag' +
          (index + 1) +
          '" class="dragdrop back item" draggable="true">' +
          item +
          '</span>'
      )
    })

    // Initialize draggable behavior on the .item class
    $('.item').draggable({
      revert: 'invalid',
      revertDuration: 1000
    })

    /// Populate the q_list with ALLQUESTIONS options
    let allQuestions = DB.ALLQUESTIONS
    $('.q_list').empty()

    let dropboxCounter = 1

    allQuestions.forEach(function (questionObj, index) {
      let optionsHTML = '<li>'
      questionObj.options.forEach(function (option) {
        let matches = option.match(/______________/g)
        if (matches) {
          matches.forEach((match, matchIndex) => {
            let uniqueId = 'drop' + dropboxCounter++

            let dropboxHTML = `
                      <div id="${uniqueId}" 
                          class="dropbox-1" 
                          data-question-id="${index + 1}" 
                          data-answer-index="${matchIndex}">
                      </div>`

            option = option.replace('______________', dropboxHTML)
          })
        }
        optionsHTML += option
      })
      optionsHTML += '</li>'
      $('.q_list').append(optionsHTML)

      $('.dropbox-1').droppable({
        accept: '.item',
        drop: function (evt, ui) {
          const droptarget = $(this)
          const draggable = ui.draggable

          let questionId = Number(droptarget.attr('data-question-id'))
          let answerIndex = droptarget.data('answer-index')
          let correctAnswer =
            DB.ALLQUESTIONS[questionId - 1].ans[answerIndex].trim()
          let droppedText = draggable.text().trim()

          // Check if the drop is correct
          if (correctAnswer === droppedText) {
            // Move draggable to droptarget
            draggable.appendTo(droptarget).draggable('destroy')

            // Set CSS to relative to keep it in the document flow
            draggable.css({
              position: 'relative', // Change to relative
              top: '0', // Reset top
              left: '0', // Reset left
              border: 'none' // Remove border
            })

            $('<div class="tickclass">&#10004;</div>').appendTo(droptarget)
            droptarget.droppable('disable')
            console.log('Correct drop')
            correctDrops++
          } else {
            // If incorrect drop, still append but without destruction
            draggable.appendTo(droptarget).draggable('destroy')

            // Set CSS to relative to keep it in the document flow
            draggable.css({
              position: 'relative', // Change to relative
              top: '0', // Reset top
              left: '0', // Reset left
              border: 'none' // Remove border
            })

            $('<div class="wrongclass">&#10060;</div>').appendTo(droptarget)
            droptarget.droppable('disable')
            console.log('Incorrect drop')
          }

          checkIfAllDropped()
          let totalRequiredDrops = DB.ALLQUESTIONS.reduce(
            (sum, q) => sum + q.ans.length,
            0
          )
          if (correctDrops === totalRequiredDrops) {
            handleAllDropsFinished()
          }
        }
      })
    })

    function playCorrectFeedback (callback) {
      let number = Math.floor(Math.random() * DB.CORRECT.length)
      let correctAudio = DB.CORRECT[number].audio
      console.log('Correct audio: ' + correctAudio)
      playAudio(correctAudio, function () {
        if (
          correctDrops ===
          DB.ALLQUESTIONS.reduce((sum, q) => sum + q.ans.length, 0)
        ) {
          playConclusionAudio()
    
        }
        if (callback) callback()
      })
      setTimeout(() => {
        setNarratorImage(DB.NARRATOR[1])
        $('.chatbox').css('opacity', '0')
      }, 1000)
      setNarratorImage(DB.NARRATOR[4])
      $('.chatbox').css('opacity', '1')
      $('.chattext').html(DB.CORRECT[number].text)
    }

    function playConclusionAudio () {
      let conclusionAudio = new Audio(DB.CONCLUSION.audio)
      conclusionAudio.play()
      $('.chatbox').css('opacity', '1')
      $('.chattext').html(DB.CONCLUSION.text)

      conclusionAudio.onplay = function () {
        setNarratorImage(DB.NARRATOR[2])
      }

      conclusionAudio.onended = function () {
        setNarratorImage(DB.NARRATOR[6])
        setTimeout(() => {
          $('.narratorbox').css('opacity', '0')
        }, 800)
      }
    }

    
  })
