// const calendar = document.createElement("calendar");
const NUM_OF_BOXES = 42;
const calendar = document.getElementById("calendar");
const nextMonthButton = document.getElementById("next");
const previousMonthButton = document.getElementById("previous");
const menu = document.getElementById("task-menu");
const grid = document.querySelector(".grid");
const container = document.querySelector(".container");
const span = document.getElementById("exit");

// const input = document.getElementById("task-input");
// const menu = document.getElementById("task-menu");
let month = 0;
let date = new Date();
loadCalendar(date);

function loadCalendar(date) {
  // let date = getMonth();
  // let date = Date;
  let month = date.toLocaleString("default", { month: "long" });
  let year = date.getFullYear();
  let h1 = document.getElementById("month");

  h1.innerHTML = month + " " + year;
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
    day.setAttribute("id", month + "-" + (i + 1).toString());
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
}

nextMonthButton.addEventListener("click", function (event) {
  month += 1;
  let date = new Date();
  let nextMonth = new Date(date.getFullYear(), date.getMonth() + month);
  loadCalendar(nextMonth);
});
previousMonthButton.addEventListener("click", function (event) {
  month -= 1;
  let date = new Date();
  let previousMonth = new Date(date.getFullYear(), date.getMonth() + month);
  loadCalendar(previousMonth);
});

calendar.addEventListener("click", function (event) {
  if (
    document.getElementById("task-menu") !== null ||
    event.target.id === "exit"
  ) {
    return;
  }
  // } else if (document.getElementById(event.target.parentElement) === null) {
  //   return;
  // }
  let task = document.createElement("div");
  const taskLength = event.target.children.length;
  task.setAttribute("class", "task");
  task.setAttribute("id", event.target.id + "-task-" + (taskLength + 1));
  console.log(event.target.children.length);
  // console.log(event.target.previousElementSibling);
  let day = document.getElementById(event.target.id);
  day.appendChild(task);
  taskMenu(event, day, task);
});

function taskMenu(event, day, task) {
  // console.log(event.target.children.length);
  let menu = document.createElement("div");
  menu.setAttribute("id", "task-menu");
  let input = document.createElement("input");
  let span = document.createElement("span");
  span.setAttribute("id", "exit");
  span.innerHTML = "\u00d7";
  menu.appendChild(span);
  menu.setAttribute("id", "task-menu");
  input.setAttribute("id", "task-input");
  input.setAttribute("type", "text");
  input.setAttribute("onkeyup", "getInput()");
  day.append(menu);
  menu.append(input);

  span.addEventListener("click", function (event) {
    menu.remove();
    if (task.textContent === "") {
      task.remove();
    }
  });
}

function getInput() {
  const input = document.getElementById("task-input");
  input.addEventListener("keyup", function (event) {
    if (event.code === "Enter" && input.value !== "") {
      const taskCount =
        event.target.parentElement.parentElement.children.length - 1;
      // console.log(event.target.parentElement.previousElementSibling.id);
      console.log(taskCount);
      let task = document.getElementById(
        event.target.parentElement.previousElementSibling.id
      );
      console.log(
        event.target.parentElement.previousElementSibling.id + " " + taskCount
      );
      const menu = document.getElementById("task-menu");
      const p = document.createElement("p");
      p.innerHTML = input.value;
      task.appendChild(p);
      task.innerHTML = input.value;
      console.log(p);
      console.log(event.target);
      input.value = "";
      document.getElementById("task-menu").remove();
    }
  });
}