function valida() {
  document.getElementById("name").oninvalid = function () {
    this.setCustomValidity("");
    if (!this.validity.valid) {
      this.setCustomValidity("Nome está inválido");
    }
  };

  document.getElementById("birth-date").oninvalid = function () {
    this.setCustomValidity("");
    if (!this.validity.valid) {
      this.setCustomValidity("Data de nascimento está inválido");
    }
  };
}

document.getElementById("btn-submit").addEventListener("click", (event) => {
  let elemName = document.getElementById("name");

  let elemBirthDate = document.getElementById("birth-date");

  event.preventDefault();
  console.log(elemName.value, elemBirthDate.value);
  if (elemName.textContent.length == 0) {
    valida();
    console.log("name vazio");
  }
  if (elemBirthDate.textContent.length == 0) {
    console.log("aniversaio vazio");
  }
});

// function validateForm() {
//   document.getElementById("name").oninvalid = () => {
//     this.setCustomValidity("");
//     if (!this.ValidityState.valid) {
//       this.setCustomValidity("Nome está inválido");
//     }
//   };
//}
