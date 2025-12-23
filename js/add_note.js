// Elements
const addNote = document.querySelector(".add_note");
const container = document.querySelector(".add-container");
const closeBtns = document.querySelectorAll("#close, #close1");
const saveBtn = document.getElementById("save_button");
const textarea = document.querySelector(".add-container textarea");
const pageSelect = document.querySelector(".add-container select");

// Add Note → OPEN
addNote.addEventListener("click", () => {
  container.classList.add("show");
});

// Close buttons → CLOSE
closeBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    container.classList.remove("show");
  });
});

// Save button → SAVE + CLOSE
saveBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  const noteText = textarea.value.trim();
  const page = pageSelect.value;

  if (noteText === "") {
    alert("Please write something before saving!");
    return;
  }

  // Note object
  const noteData = {
    page: page,
    text: noteText,
    time: new Date().toLocaleString()
  };

  // Get existing notes
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Save note
  notes.push(noteData);
  localStorage.setItem("notes", JSON.stringify(notes));

  // Reset textarea
  textarea.value = "";

  // Close container
  container.classList.remove("show");

  alert("Note saved successfully ✅");
});
