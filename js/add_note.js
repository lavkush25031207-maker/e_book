var closebtn = document.querySelectorAll("#close, #close1");
var container = document.querySelector(".container");

closebtn.forEach(btn => {
    btn.addEventListener("click", () => {
        container.style.display = "none";
        window.history.back();   // pichhle page par wapas
    });
});
