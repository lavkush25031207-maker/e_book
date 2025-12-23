var thumbnail = document.getElementById("thumbnail");
var container = document.getElementById("thumb-parent");
var closebtn = document.getElementById("thumb-close");

// open thumbnail panel
thumbnail.addEventListener("click", () => {
     container.classList.toggle("show");
});

// close thumbnail panel
closebtn.addEventListener("click", (e) => {
    e.stopPropagation(); // important
    container.classList.remove("show");
});
