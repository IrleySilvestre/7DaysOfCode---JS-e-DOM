const elemForm = document.getElementById("form");
const elemName = document.getElementById("nome");
const elemBirthDate = document.getElementById("birth-date");
const elemTblBirth = document.getElementById("tblBirth");
const elemTblEdite = document.getElementById("btn-edite");
const elemBtnSubmit = document.getElementById("btn-submit");

function showError(input, message) {
  const elemFormControl = input.parentElement;
  elemFormControl.className = "form-control error";
  const elemSmall = elemFormControl.querySelector("small");
  elemSmall.innerText = message;
}

function showSuccess(input) {
  const elemFormControl = input.parentElement;
  elemFormControl.className = "form-control success";
}

function removeSuccess(inputArray) {
  inputArray.forEach((elem) => {
    const elemFormControl = elem.parentElement;
    elemFormControl.className = "form-control";
  });
}

function enableBtn(inputArray) {
  const qtdFild = inputArray.length;
  let qtdSuccess = 0;
  inputArray.forEach((elem) => {
    const elemFormControl = elem.parentElement;
    if (elemFormControl.className === "form-control success") {
      qtdSuccess++;
    }
  });

  if (qtdFild === qtdSuccess) {
    elemBtnSubmit.removeAttribute("disabled");
    elemBtnSubmit.className = "btn enable";
  } else {
    elemBtnSubmit.setAttribute("disabled", "");
    elemBtnSubmit.className = "btn";
  }
}

function checkRequired(inputArr) {
  inputArr.forEach((elem) => {
    if (elem.value.trim() === "") {
      showError(elem, ` Campo obrigtório`);
    } else {
      showSuccess(elem);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `Campo deve ter mais  ${min} caracteres`);
  } else if (input.value.length > max) {
    showError(input, `Campo nao pode ser maior que  ${max} caracteres`);
  } else {
    showSuccess(input);
  }
}

function addBirth() {
  const list = elemTblBirth.innerHTML;

  const listBirth = [];

  const data = new Date(elemBirthDate.value);

  const dt = `${data.getUTCDate().toString().padStart(2, "0")}/${(
    data.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${data.getUTCFullYear()}`;

  const birthdayPerson = {
    name: elemName.value,
    dtBirth: dt,
  };

  listBirth.push(birthdayPerson);

  elemName.value = "";
  elemBirthDate.value = "";

  removeSuccess([elemName, elemBirthDate]);

  elemBtnSubmit.setAttribute("disabled", "");
  elemBtnSubmit.className = "btn";

  listBirth.forEach((elem) => {
    let newList =
      list +
      `<tr>
                <td>${elem.name}</td>
                <td>${elem.dtBirth}</td>
                <td>
                    <button id="btn-edite" >Editar</button>
                    <button id="btn-remove" >Remover</button>
                </td>
            </tr>`;
    elemTblBirth.innerHTML = newList;
  });

  addEventBtn();
}

function addEventBtn() {
  const td = document.querySelectorAll("#btn-edite");

  td.forEach((elem) => {
    elem.addEventListener("click", edite);
  });
}

function edite(e) {
  const tr = e.target.parentElement.parentElement.children;
  elemName.value = tr[0].innerHTML;
  elemBirthDate.value = tr[1].innerHTML;
}

elemName.onblur = () => {
  checkRequired([elemName, elemBirthDate]);
  checkLength(elemName, 3, 10);
  enableBtn([elemName, elemBirthDate]);
};
elemBirthDate.onblur = () => {
  checkRequired([elemName, elemBirthDate]);
  enableBtn([elemName, elemBirthDate]);
};

elemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([elemName, elemBirthDate]);

  checkLength(elemName, 3, 10);

  addBirth();
});
