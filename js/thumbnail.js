var thumbnail = document.getElementById("thumbnail");
var container = document.getElementById("thumb-parent");
var closebtn = document.getElementById("thumb-close");
var slides = document.querySelectorAll(".thumb-slide");

// open thumbnail panel
thumbnail.addEventListener("click", () => {
    container.classList.toggle("show");
    // container.classList.toggle()
});

// close thumbnail panel (ONLY close button)
closebtn.addEventListener("click", (e) => {
    e.stopPropagation(); // stop bubbling
    container.classList.remove("show");
});

// prevent closing when clicking on thumbnails
slides.forEach(slide => {
    slide.addEventListener("click", (e) => {
        e.stopPropagation();
    });
});
