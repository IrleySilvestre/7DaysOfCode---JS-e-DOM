const elemForm = document.getElementById('form')
const elemName = document.getElementById('nome')
const elemBirthDate = document.getElementById('birth-date')

function checkRequired(inputArr){
  inputArr.forEach(elem => {
      console.log(elem.value);
    });
}

elemForm.addEventListener('submit', function(e){
  e.preventDefault()


  checkRequired([elemName, elemBirthDate])
})

