$(document).ready(function() {
    const sound = document.getElementById("slideSound");
    const $flipbook = $("#flipbook");

    // 1. Flipbook ko Initialize karein (Agar pehle nahi kiya hai)
    if (!$flipbook.data().done) {
        $flipbook.turn({
            width: 1000,
            height: 600,
            autoCenter: true,
            acceleration: true,
            // Mobile ke liye display check
            display: window.innerWidth < 768 ? 'single' : 'double'
        });
    }

    // 🔊 Sound play function
    function playFlipSound() {
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Audio Error:", e));
        }
    }

    // 👉 NEXT Button: Sound + Turn Page
    $("#next").on("click", function(e) {
        e.stopPropagation(); // Event ko page par bhatakne se rokein
        playFlipSound();
        $flipbook.turn("next"); 
    });

    // 👈 PREVIOUS Button: Sound + Turn Page
    $("#previous").on("click", function(e) {
        e.stopPropagation();
        playFlipSound();
        $flipbook.turn("previous");
    });

    // 📖 Direct Slide Click (Page ke beech mein click karne par sound)
    $flipbook.on("turning", function(event, page, view) {
        playFlipSound();
    });
});