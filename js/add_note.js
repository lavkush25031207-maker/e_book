// ---------- ELEMENTS ----------
const addNoteBtns = document.querySelectorAll("#addnode, .add_note");
const container = document.querySelector(".add-container");
const closeBtns = document.querySelectorAll("#close, #close1");
const saveBtn = document.getElementById("save_button");
const textarea = document.querySelector(".add-container textarea");
const pageSelect = document.querySelector(".add-container select");
const notesCount = document.getElementById("notes");

// ---------- LOAD NOTES COUNT ON PAGE LOAD ----------
function updateNotesCount() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notesCount.innerText = notes.length;
}
updateNotesCount();

// ---------- OPEN ADD NOTE POPUP ----------
addNoteBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    container.classList.add("show");
  });
});

// ---------- CLOSE POPUP ----------
closeBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    container.classList.remove("show");
  });
});

// ---------- SAVE NOTE ----------
saveBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  const noteText = textarea.value.trim();
  const page = pageSelect.value;

  if (noteText === "") {
    alert("Please write something before saving!");
    return;
  }

  const noteData = {
    page: page,
    text: noteText,
    time: new Date().toLocaleString()
  };

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(noteData);
  localStorage.setItem("notes", JSON.stringify(notes));

  // reset
  textarea.value = "";

  // update counter
  updateNotesCount();

  // close popup
  container.classList.remove("show");

  alert("Note saved successfully ✅");
});
