var container = document.getElementById("flipbook");
var zoom_in = document.getElementById("zoom_in");
var zoom_out = document.getElementById("zoom_out");

let zoom = 1;
const step = 0.1;   // zoom speed
const minZoom = 0.5;
const maxZoom = 2;

/* smooth effect */
container.style.transition = "transform 0.3s ease";
container.style.transformOrigin = "center center";

zoom_in.onclick = () => {
    if (zoom < maxZoom) {
        zoom += step;
        container.style.transform = `scale(${zoom})`;
    }
};

zoom_out.onclick = () => {
    if (zoom > minZoom) {
        zoom -= step;
        container.style.transform = `scale(${zoom})`;
    }
};



var full_screen = document.getElementById("full_screen");
var header = document.getElementsByTagName("header")[0];
var footer = document.getElementsByTagName("footer")[0];
var book = document.getElementsByClassName("main-continer")[0];
var gthome = document.getElementsByClassName("gthome")[0]; // <-- add [0]

full_screen.onclick = () => {
    full_screen.style.position = "relative"
    header.style.display = "none";
    footer.style.display = "none";
    book.style.height = "90vh";
    gthome.style.display = "block";  // now works
    gthome.style.zIndex = "9999999";
};



gthome.onclick = () => {
    header.style.display = "";
    footer.style.display = "";
    book.style.height = "";
    gthome.style.display = "none";
}



//  mode single page and and double page

var mode = document.getElementById("mode");
// var main_container = document.getElementsByClassName("main-continer")[0];
var double_page = document.getElementById("double_page");
var flipbook = document.getElementById("flipbook")
var $flipbook = $("#flipbook");

let isDouble = true; // default mode

mode.onclick = () => {

    // container width adjust
    flipbook.style.width = isDouble ? "500px" : "1000px";

    if (isDouble) {
        // 🔹 Single Page Mode
        $flipbook.turn("display", "single");
        double_page.src = "img/footer-icons/3b.png";
        isDouble = false;
    } else {
        // 🔹 Double Page Mode
        $flipbook.turn("display", "double");
        double_page.src = "img/footer-icons/3a.png";
        isDouble = true;
    }

};
