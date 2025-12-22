function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(); // Safari
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen(); // IE
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}



var book_only = document.getElementById("book_only");
var header = document.getElementsByTagName("header")[0];
var footer = document.getElementsByTagName("footer")[0];
var book = document.getElementsByClassName("main-continer")[0];
var gthome = document.getElementsByClassName("gthome")[0]; // <-- add [0]

book_only.onclick = () => {
    openFullscreen()
    full_screen.style.position = "relative"
    header.style.display = "none";
    footer.style.display = "none";
    book.style.height = "90vh";
    gthome.style.display = "block";  // now works
    gthome.style.zIndex = "9999999";
};



gthome.onclick = () => {
    closeFullscreen()
    header.style.display = "";
    footer.style.display = "";
    book.style.height = "";
    gthome.style.display = "none";
}