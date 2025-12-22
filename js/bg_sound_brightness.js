function playFlipSound() {
    if (bgmusice) {
        bgmusice.currentTime = 0;
        bgmusice.play().catch(e => console.log("Audio Error:", e));
    }
}

var bgmusice = document.getElementById("bgmusice");
var musice_btn = document.getElementById("musice_btn");

musice_btn.onclick = () => {
    if (bgmusice.paused) {
        bgmusice.play();
    } else {
        bgmusice.pause();
    }
};

