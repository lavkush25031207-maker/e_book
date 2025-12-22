var pen = document.getElementById("pen");
var highlighter = document.getElementById("hightlighter");
var tools_panel = document.getElementsByClassName("tools-panel")[0];
var close_btn = document.getElementsByClassName("close-btn")[0];
var tools = document.getElementsByClassName("tools")[0];
var closebutton = document.getElementsByClassName("close")[0];


pen.onclick = () => {
    tools_panel.classList.toggle("show");
    tools_panel.classList.toggle("hide");
};
close_btn.onclick = () => {
    tools_panel.classList.toggle("show");
}

highlighter.onclick = () => {
    tools.classList.toggle("show");
    tools.classList.toggle("hide");
};
closebutton.onclick = () => {
    tools.classList.toggle("show")
}


var overlay = document.getElementById("overlay")
var close_overlay = document.getElementsByClassName("close-x")[0];
var spootlight = document.getElementById("spootlight");
var overlay_close = document.getElementById("overlay_close")

spootlight.onclick = () =>{
    overlay.classList.toggle("show")
    overlay.classList.toggle("hide")
}

close_overlay.onclick = () => {
    overlay.classList.toggle("show")
}

overlay_close.onclick = () => {
    overlay.classList.toggle("show")
}