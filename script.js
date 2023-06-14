// const calendar = document.createElement("calendar");
const NUM_OF_BOXES = 42;
const calendar = document.getElementById("calendar");
const nextMonthButton = document.getElementById("next");
const previousMonthButton = document.getElementById("previous");
const grid = document.querySelector(".grid");
let month = 0;
let date = new Date();
loadCalendar(date);

function loadCalendar(date) {
  // let date = getMonth();
  // let date = Date;
  if (calendar.innerHTML !== null) {
    calendar.innerHTML = "";
  }
  let firstDay = new Date(date.getFullYear(), date.getMonth()).getDay();
  let thisMonthDayCount = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  let lastMonthDayCount = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  let paddedSquareCount = 0;
  for (let i = firstDay; i > 0; i--) {
    let paddedSquare = document.createElement("div");
    paddedSquareCount++;
    paddedSquare.setAttribute("class", "padded-square-previous");
    paddedSquare.setAttribute("id", "pad" + paddedSquareCount.toString());
    paddedSquare.innerHTML = lastMonthDayCount - i + 1;

    calendar.appendChild(paddedSquare);
  }
  for (let i = 0; i < thisMonthDayCount; i++) {
    let day = document.createElement("div");
    day.innerHTML = i + 1;
    day.setAttribute("class", "this-month");
    day.setAttribute("id", i.toString());
    calendar.appendChild(day);
  }

  if (firstDay + 1 + thisMonthDayCount < NUM_OF_BOXES) {
    for (let i = 0; i < NUM_OF_BOXES - (firstDay + thisMonthDayCount); i++) {
      paddedSquareCount++;
      let paddedSquare = document.createElement("div");
      paddedSquare.setAttribute("class", "padded-square-next");
      paddedSquare.setAttribute("id", "pad" + paddedSquareCount.toString());
      paddedSquare.innerHTML = i + 1;
      calendar.appendChild(paddedSquare);
    }
  }
  let month = date.toLocaleString("default", { month: "long" });
  let year = date.getFullYear();
  let h1 = document.getElementById("month");

  h1.innerHTML = month + " " + year;
  console.log(firstDay);
  console.log(thisMonthDayCount);
}

nextMonthButton.addEventListener("click", function (event) {
  month += 1;
  let date = new Date();
  let nextMonth = new Date(date.getFullYear(), date.getMonth() + month);
  console.log(nextMonth);
  loadCalendar(nextMonth);
});
previousMonthButton.addEventListener("click", function (event) {
  month -= 1;
  let date = new Date();
  let previousMonth = new Date(date.getFullYear(), date.getMonth() + month);
  console.log(previousMonth);
  loadCalendar(previousMonth);
});
calendar.addEventListener("click", function (event) {
  // if(event.)
  let task = document.createElement("div");
  task.setAttribute("class", "task");
  let square = document.getElementById(event.target.id);
  console.log(event.target.id);
  square.append(task);
  taskMenu(event);
});

function taskMenu(event) {
  let menu = document.createElement("div");
  menu.setAttribute("id", "task-menu");
  event.clientY;
  event.clientX;
  grid.append(menu);
  menu.ce;

  // calendar.append(menu);
}