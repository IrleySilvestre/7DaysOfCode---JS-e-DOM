const elemBtnToogle = document.getElementById("toggle");
const elemBtnSignUp = document.getElementById("btn-signup");
const elemBtnClose = document.getElementById("btn-close");
const elemModal = document.getElementById("modal");

// Toggle nav

elemBtnToogle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

//show modal

elemBtnSignUp.addEventListener("click", () => {
  elemModal.classList.add("show-modal");
});

elemBtnClose.addEventListener("click", () => {
  elemModal.classList.remove("show-modal");
});

//hide modal on outside click
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
