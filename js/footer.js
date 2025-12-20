document.addEventListener("DOMContentLoaded", function () {
    const home = document.getElementById("home");
    const nav = document.getElementById("nav");

    home.addEventListener("click", function () {
        nav.classList.toggle("hide");
        nav.classList.toggle("show");
        console.log("hi");
        
    });
});


var drop_rows = document.querySelectorAll(".drop-row");

drop_rows.forEach((row) => {
    row.addEventListener("click", () => {
        // Get the next sibling drop-box of the clicked row
        var drop_box = row.nextElementSibling;
        var drop_down = row.querySelector(".drop-down");

        if (drop_box) {
            drop_box.classList.toggle("hide");
            drop_box.classList.toggle("show");
        }

        if (drop_down) {
            drop_down.classList.toggle("active");
        }
    });
});



