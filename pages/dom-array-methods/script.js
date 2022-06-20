const elemBtnAddUser = document.getElementById("add-user");
const elemBtnDouble = document.getElementById("double");
const elemBtnShowMillionaries = document.getElementById("show-millionaires");
const elemBtnSort = document.getElementById("sort");
const elemBtnCalculate = document.getElementById("calculate-wealth");
const elemMain = document.getElementById("main");

var data = [];
var sumPatrimony = 0;

//Feth random user and add money

async function getRandomUser() {
  try {
    const res = await fetch("https://randomuser.me/api");
    let data = await res.json();
    const user = data.results[0];
    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };
    addData(newUser);
  } catch (error) {
    console.log(error);
  }
}

function addData(obj) {
  data.push(obj);

  updateDom();
}

function updateDom(provideData = data) {
  elemMain.innerHTML = "<h2><strong>Nome</strong> Patrimonio</h2>";
  provideData.forEach((item) => {
    const elem = document.createElement("div");
    elem.classList.add("person");
    elem.innerHTML = `<strong>${item.name}</strong>${formatNumber(item.money)}`;
    elemMain.appendChild(elem);
  });
  if (sumPatrimony > 0) {
    sumAll();
  }
}

function sortNumbers() {
  data = data.sort((a, b) => {
    return b.money - a.money;
  });
  if (sumPatrimony > 0) {
    sumAll();
  }
  updateDom();
}
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  if (sumPatrimony > 0) {
    sumAll();
  }
  updateDom();
}

function showMillion() {
  data = data.filter((item) => {
    return item.money > 999999.99;
  });
  if (sumPatrimony > 0) {
    sumAll();
  }
  updateDom();
}

function sumAll() {
  sumPatrimony = data.reduce((acc, user) => (acc += user.money), 0);

  const elem = document.createElement("div");
  elem.classList.add("total");
  elem.innerHTML = `<strong>${formatNumber(sumPatrimony)}</strong>`;
  elemMain.appendChild(elem);
}

function formatNumber(nr) {
  return nr.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

elemBtnAddUser.addEventListener("click", getRandomUser);

elemBtnDouble.addEventListener("click", doubleMoney);

elemBtnSort.addEventListener("click", sortNumbers);

elemBtnShowMillionaries.addEventListener("click", showMillion);

elemBtnCalculate.addEventListener("click", sumAll);
