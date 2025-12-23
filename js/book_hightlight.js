// ---------- VARIABLES ----------
var flipbook = $("#flipbook");

var bookmarkBtn = document.getElementById("bookmark_node");
var highlightBtn = document.getElementById("highlight_node");

var bookmarkCount = document.getElementById("bookmarks");
var highlightCount = document.getElementById("highlights");

// store pages
var bookmarksSet = new Set();
var highlightsSet = new Set();

// ---------- GET CURRENT PAGE ----------
function getCurrentPage() {
    return flipbook.turn("page");
}

// ---------- BOOKMARK ----------
bookmarkBtn.addEventListener("click", () => {

    let page = getCurrentPage();

    // cover bhi allow hai
    if (!bookmarksSet.has(page)) {
        bookmarksSet.add(page);
        bookmarkCount.innerText = bookmarksSet.size;
    }
});

// ---------- HIGHLIGHT ----------
highlightBtn.addEventListener("click", () => {

    let page = getCurrentPage();

    if (!highlightsSet.has(page)) {
        highlightsSet.add(page);
        highlightCount.innerText = highlightsSet.size;
    }
});
