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




const mediaQuery = window.matchMedia("(max-width: 768px)");
function handleMobile(e) {
    if (e.matches) {
        // ✅ Mobile / Tablet (<=768px)
        console.log("Screen 768px ya usse chhoti hai");
        
        // yaha mobile wala JS likho
    } else {
        // ✅ Desktop (>768px)
        console.log("Screen 768px se badi hai");
        
        // yaha desktop wala JS
    }
}

// Page load par check
handleMobile(mediaQuery);

// Screen resize par check
mediaQuery.addEventListener("change", handleMobile);



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
    book.style.height = "690px";
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