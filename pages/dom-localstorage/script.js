const elemSelectMovie = document.getElementById("selectMovie");
const elemListSeatSelected = document.getElementById("listSeatSelected");
const elemListSeat = document.getElementById("listSeat");
const elemSumPurchase = document.getElementById("sumPurchase");
const elemSumTicket = document.getElementById("sumTicket");
const elemNameMovie = document.getElementById("nameMovie");
const elemListSeats = document.getElementById("listSeat");

const elemSeats = elemListSeats.children;

const car = {
  id: "",
  movie: "",
  totalPurchase: 0,
  seatSelected: [],
  totalTickets: 0,
};

window.onload = addEventeOnSeat();

elemSelectMovie.addEventListener("change", (e) => {
  const movie = e.target.children;
  for (const key in movie) {
    if (movie[key].selected) {
      if (movie[key].label != "") {
        elemListSeat.className = "container-seat";
        elemNameMovie.innerHTML = `Filme Selecionado: ${movie[key].label}`;
        car.movie = movie[key].label;
        car.id = movie[key].id;
        getMovie(car.id);
      } else {
        elemListSeat.className = "container-seat inative";
      }
    }
  }
});

function save() {
  if (JSON.parse(localStorage.getItem(car.id))) {
    let mv = JSON.parse(localStorage.getItem(car.id));
    car.seatSelected = car.seatSelected.concat(mv.seatSelected);
  }
  localStorage.setItem(`${car.id}`, JSON.stringify(car));

  elemSelectMovie.firstElementChild.setAttribute("selected", "");
  //   elemSelectMovie.firstElementChild.label = "";
  car.seatSelected = [];
  car.totalTickets = 0;
  car.totalPurchase = 0;
  elemListSeat.className = "container-seat inative";
  elemNameMovie.innerHTML = `Filme Selecionado: `;
  elemSumTicket.innerHTML = `Total de Ingressos:`;
  elemSumPurchase.innerHTML = `Total Compra:`;
  elemListSeatSelected.innerHTML = `Assentos: `;
}

function getMovie(key) {
  if (JSON.parse(localStorage.getItem(key))) {
    for (const key in elemSeats) {
      elemSeats[key].className = "seatFree";
    }
    let stMovie = JSON.parse(localStorage.getItem(key));
    stMovie.seatSelected.forEach((element) => {
      for (const key in elemSeats) {
        if (element === elemSeats[key].innerText) {
          elemSeats[key].className = "seatOccupied";
        }
      }
    });
  } else {
    for (const key in elemSeats) {
      elemSeats[key].className = "seatFree";
    }
  }
}

function addEventeOnSeat() {
  for (const key in elemSeats) {
    if (Object.hasOwnProperty.call(elemSeats, key)) {
      const element = elemSeats[key];
      element.addEventListener("click", (e) => {
        new selectSeat(e);
      });
    }
  }
}

class selectSeat {
  constructor(e) {
    this.addTickets(e);
  }

  addTickets(e) {
    if (e.target.className === "seatOccupied") {
      return;
    } else if (e.target.className === "seatFree") {
      e.target.className = "seatSelect";
      car.totalTickets = car.totalTickets + 1;
      car.seatSelected.push(e.target.textContent);
    } else {
      let vl = e.target.textContent;
      car.seatSelected.forEach((element, key) => {
        if (element === vl) {
          car.seatSelected.splice(key, 1);
          return;
        }
      });
      elemListSeatSelected.innerHTML = `Assentos: ${car.seatSelected}`;
      e.target.className = "seatFree";
      car.totalTickets = car.totalTickets - 1;
    }
    if (car.totalTickets > 0) {
      elemSumTicket.innerHTML = `Total de Ingressos: ${car.totalTickets}`;
      elemListSeatSelected.innerHTML = `Assentos: ${car.seatSelected}`;

      const valueTickt = parseInt(
        elemSelectMovie.children[elemSelectMovie.selectedIndex].value
      );

      elemSumPurchase.innerHTML = `Total Compra: R$ ${(
        valueTickt * car.totalTickets
      ).toFixed(2)}`;
    } else {
      elemSumTicket.innerHTML = `Total de Ingressos:`;
      elemSumPurchase.innerHTML = `Total Compra:`;
    }
  }
}
