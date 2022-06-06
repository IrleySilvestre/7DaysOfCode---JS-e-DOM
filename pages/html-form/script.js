const elemForm = document.getElementById("form");
const elemName = document.getElementById("nome");
const elemBirthDate = document.getElementById("birth-date");
const elemTblBirth = document.getElementById("tblBirth");

const listBirth = [
    { name: "Isadora", dtBirth: "2018/02/04" },
    { name: "Emily", dtBirth: "2018/02/04" },
];

const list = elemTblBirth.innerHTML;
console.log(list);

listBirth.forEach((elem, key) => {
    let newList =
        list +
        `
  <tr>
    <td>${elem.name}</td>
    <td>${elem.dtBirth}</td>
  <td>
      <button>Editar</button>
      <button>Remover</button>
  </td>
</tr>`;

    elemTblBirth.innerHTML = newList;
});

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

elemName.onblur = () => {
    checkRequired([elemName, elemBirthDate]);
    checkLength(elemName, 3, 10);
};
elemBirthDate.onblur = () => {
    checkRequired([elemName, elemBirthDate]);
};

elemForm.addEventListener("submit", function(e) {
    e.preventDefault();

    checkRequired([elemName, elemBirthDate]);

    checkLength(elemName, 3, 10);
});