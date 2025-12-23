var container = document.getElementById("thumb-parent");
var closebtn = document.getElementById("thumb-close");

// close button
closebtn.addEventListener("click", function (e) {
    e.stopPropagation();
    container.classList.remove("show");
});

// thumbnail click
document.querySelectorAll(".thumb-slide").forEach(function (slide, index) {
    slide.addEventListener("click", function (e) {
        e.stopPropagation();

        // 🔥 IMPORTANT:
        // flipbook pages start from 1
        // +2 because COVER + first image
        var pageNumber = index + 3;

        $("#flipbook").turn("page", pageNumber);
    });
});


//---------------------------------------------------------------------------------------------------------------
// ---------- INIT FLIPBOOK ----------
$("#flipbook").turn({
    width: 800,
    height: 500,
    autoCenter: true
});

// ---------- VARIABLES ----------
var pageInput = document.getElementById("index");
var flipbook = $("#flipbook");
var totalPages = flipbook.turn("pages");

// ---------- PAGE CHANGE → UPDATE PLACEHOLDER ----------
flipbook.bind("turned", function (event, page) {
    if (page === 1) {
        pageInput.placeholder = "Cover";
    } else {
        pageInput.placeholder = page;
    }
});

// ---------- INPUT → OPEN PAGE ----------
function goToPage() {
    var value = pageInput.value.trim();
    if (value === "") return;

    if (value.toLowerCase() === "cover") {
        flipbook.turn("page", 1);
        pageInput.value = "";
        return;
    }

    var pageNumber = parseInt(value);

    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
        alert("Invalid page number");
        pageInput.value = "";
        return;
    }

    flipbook.turn("page", pageNumber);
    pageInput.value = "";
}

pageInput?.addEventListener("keydown", function (e) {
    if (e.key === "Enter") goToPage();
});

// ---------- ✅ THUMB SLIDE FIX ----------
document.querySelectorAll(".thumb-slide").forEach((thumb, index) => {

    thumb.addEventListener("click", () => {

        let targetPage;

        // ✅ cover
        if (index === 0) {
            targetPage = 1;
        } 
        // ✅ other pages
        else {
            targetPage = index + 1;
        }

        flipbook.turn("page", targetPage);
    });

});
