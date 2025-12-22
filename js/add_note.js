var closebtn = document.querySelectorAll("#close, #close1");
var container = document.querySelector(".container");

if (container && closebtn.length) {
    closebtn.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            // UI pehle hide ho jaye (better UX)
            container.style.display = "none";

            // chhota delay taaki hide effect dikhe
            setTimeout(() => {
                window.location.replace("index.html"); // back without extra history
            }, 50);
        });
    });
}
